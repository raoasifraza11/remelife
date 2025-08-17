const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const PUBLIC_DIR = './public';
const TARGET_SIZE_KB = 200;
const TARGET_SIZE_BYTES = TARGET_SIZE_KB * 1024;

// Quality settings based on file size
const getQualityForSize = (sizeBytes) => {
  if (sizeBytes > 1024 * 1024) return 40; // >1MB: aggressive compression
  if (sizeBytes > 512 * 1024) return 50;  // >500KB: moderate compression
  if (sizeBytes > TARGET_SIZE_BYTES) return 60; // >200KB: light compression
  return 70; // <200KB: minimal compression
};

// Retry logic for Windows file system
const processImageWithRetry = async (filePath, outputPath, quality, maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const tempPath = `${outputPath}.tmp`;
      
      await sharp(filePath)
        .webp({ quality, effort: 6 })
        .toFile(tempPath);
      
      // Replace original with optimized version
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }
      fs.renameSync(tempPath, outputPath);
      
      return true;
    } catch (error) {
      console.log(`Attempt ${attempt} failed for ${path.basename(filePath)}: ${error.message}`);
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
  return false;
};

// Main optimization function
const optimizeImages = async () => {
  console.log('🚀 Starting image optimization...\n');
  
  const imageExtensions = ['.png', '.jpg', '.jpeg'];
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let processedCount = 0;
  
  const processDirectory = async (dir) => {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        await processDirectory(fullPath);
      } else if (imageExtensions.includes(path.extname(item).toLowerCase())) {
        const originalSize = stat.size;
        const quality = getQualityForSize(originalSize);
        
        console.log(`📸 Processing: ${path.relative(PUBLIC_DIR, fullPath)}`);
        console.log(`   Original size: ${(originalSize / 1024).toFixed(1)}KB`);
        console.log(`   Target quality: ${quality}%`);
        
        // Convert to WebP
        const webpPath = fullPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
        const success = await processImageWithRetry(fullPath, webpPath, quality);
        
        if (success) {
          const optimizedSize = fs.statSync(webpPath).size;
          const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
          
          console.log(`   ✅ Optimized: ${(optimizedSize / 1024).toFixed(1)}KB (${savings}% reduction)`);
          
          totalOriginalSize += originalSize;
          totalOptimizedSize += optimizedSize;
          processedCount++;
          
          // Remove original if optimization was successful and significant
          if (optimizedSize < originalSize * 0.8) {
            fs.unlinkSync(fullPath);
            console.log(`   🗑️  Removed original file`);
          }
        } else {
          console.log(`   ❌ Failed to optimize after 3 attempts`);
        }
        
        console.log('');
      }
    }
  };
  
  try {
    await processDirectory(PUBLIC_DIR);
    
    const totalSavings = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
    
    console.log('🎉 Optimization Complete!');
    console.log(`📊 Statistics:`);
    console.log(`   Files processed: ${processedCount}`);
    console.log(`   Original total: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   Optimized total: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   Total savings: ${totalSavings}%`);
    console.log(`   Average file size: ${(totalOptimizedSize / processedCount / 1024).toFixed(1)}KB`);
    
  } catch (error) {
    console.error('❌ Optimization failed:', error.message);
    process.exit(1);
  }
};

// Check if Sharp is installed
try {
  require.resolve('sharp');
  optimizeImages();
} catch (error) {
  console.log('📦 Sharp not found. Installing...');
  console.log('Run: npm install sharp --save-dev');
  console.log('Then run: node optimize-images.js');
}
