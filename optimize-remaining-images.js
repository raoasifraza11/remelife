const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration for remaining large images
const PUBLIC_DIR = './public';
const TARGET_SIZE_KB = 200;
const TARGET_SIZE_BYTES = TARGET_SIZE_KB * 1024;

// Specific files that still need optimization
const REMAINING_LARGE_FILES = [
  'NEW.png',
  'market-new-icon.png', 
  'remelife-app-interface.png',
  'remelife-logo.png',
  'rewards-icon.png',
  'video-room-icon.png',
  'video-thumbnail.png'
];

// Quality settings based on file importance and size
const getQualityForFile = (filename, sizeBytes) => {
  // Hero/critical images get higher quality
  if (filename.includes('remelife-logo') || filename.includes('video-thumbnail')) {
    return 70;
  }
  
  // Large interface images can be compressed more aggressively
  if (sizeBytes > 1024 * 1024) return 40; // >1MB: aggressive
  if (sizeBytes > 512 * 1024) return 50;  // >500KB: moderate
  if (sizeBytes > TARGET_SIZE_BYTES) return 60; // >200KB: light
  return 70; // <200KB: minimal
};

// Process with retry logic for Windows
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
const optimizeRemainingImages = async () => {
  console.log('🚀 Phase 3: Optimizing remaining large images...\n');
  
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let processedCount = 0;
  
  for (const filename of REMAINING_LARGE_FILES) {
    const fullPath = path.join(PUBLIC_DIR, filename);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  File not found: ${filename}`);
      continue;
    }
    
    const stat = fs.statSync(fullPath);
    const originalSize = stat.size;
    const quality = getQualityForFile(filename, originalSize);
    
    console.log(`📸 Processing: ${filename}`);
    console.log(`   Original size: ${(originalSize / 1024).toFixed(1)}KB`);
    console.log(`   Target quality: ${quality}%`);
    
    // Convert to WebP
    const webpPath = fullPath.replace(/\.png$/i, '.webp');
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
  
  if (processedCount > 0) {
    const totalSavings = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
    
    console.log('🎉 Phase 3 Image Optimization Complete!');
    console.log(`📊 Statistics:`);
    console.log(`   Files processed: ${processedCount}`);
    console.log(`   Original total: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   Optimized total: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   Total savings: ${totalSavings}%`);
    console.log(`   Average file size: ${(totalOptimizedSize / processedCount / 1024).toFixed(1)}KB`);
  } else {
    console.log('ℹ️  No files were processed. They may already be optimized.');
  }
};

// Check if Sharp is installed and run
try {
  require.resolve('sharp');
  optimizeRemainingImages();
} catch (error) {
  console.log('📦 Sharp not found. Run: pnpm add sharp --save-dev');
  console.log('Then run: node optimize-remaining-images.js');
}
