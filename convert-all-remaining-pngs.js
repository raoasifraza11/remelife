const fs = require('fs');
const path = require('path');

// Check if Sharp is available
let sharp;
try {
  sharp = require('sharp');
} catch (error) {
  console.log('📦 Sharp not found. Run: pnpm add sharp --save-dev');
  console.log('Then run: node convert-all-remaining-pngs.js');
  process.exit(1);
}

const PUBLIC_DIR = path.join(__dirname, 'public');

// Files to exclude from conversion (app icons, etc.)
const EXCLUDE_FILES = [
  'remindmecare-android.png',
  'remindmecare-balloon.png', 
  'remindmecare-ios-rapp.png',
  'remindmecare-logo.png',
  'placeholder-logo.png'
];

// Function to get all PNG files recursively
const getAllPngFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllPngFiles(filePath, fileList);
    } else if (file.toLowerCase().endsWith('.png')) {
      const relativePath = path.relative(PUBLIC_DIR, filePath);
      if (!EXCLUDE_FILES.includes(file)) {
        fileList.push(relativePath);
      }
    }
  });
  
  return fileList;
};

// Convert PNG to WebP with quality based on file size
const convertToWebP = async (pngPath) => {
  const fullPath = path.join(PUBLIC_DIR, pngPath);
  const webpPath = fullPath.replace(/\.png$/i, '.webp');
  
  if (fs.existsSync(webpPath)) {
    console.log(`⏭️  Skipping ${pngPath} - WebP already exists`);
    return false;
  }
  
  try {
    const stat = fs.statSync(fullPath);
    const sizeKB = stat.size / 1024;
    
    // Determine quality based on file size
    let quality = 80;
    if (sizeKB > 1000) quality = 60;      // Large files: more compression
    else if (sizeKB > 500) quality = 70;  // Medium files: moderate compression
    else if (sizeKB > 100) quality = 80;  // Small files: light compression
    else quality = 85;                    // Very small files: minimal compression
    
    console.log(`🔄 Converting: ${pngPath} (${sizeKB.toFixed(1)}KB) at ${quality}% quality`);
    
    await sharp(fullPath)
      .webp({ quality, effort: 6 })
      .toFile(webpPath);
    
    const newStat = fs.statSync(webpPath);
    const newSizeKB = newStat.size / 1024;
    const savings = ((stat.size - newStat.size) / stat.size * 100).toFixed(1);
    
    console.log(`✅ Created: ${path.basename(webpPath)} (${newSizeKB.toFixed(1)}KB, ${savings}% smaller)`);
    
    // Remove original PNG if WebP is significantly smaller
    if (newStat.size < stat.size * 0.9) {
      fs.unlinkSync(fullPath);
      console.log(`🗑️  Removed original PNG`);
      return true;
    } else {
      console.log(`📋 Kept original PNG (WebP not significantly smaller)`);
      return false;
    }
    
  } catch (error) {
    console.log(`❌ Failed to convert ${pngPath}: ${error.message}`);
    return false;
  }
};

// Main conversion function
const convertAllRemainingPngs = async () => {
  console.log('🚀 Converting all remaining PNG files to WebP...\n');
  
  const pngFiles = getAllPngFiles(PUBLIC_DIR);
  
  if (pngFiles.length === 0) {
    console.log('✨ No PNG files found to convert!');
    return;
  }
  
  console.log(`📋 Found ${pngFiles.length} PNG files to process:\n`);
  pngFiles.forEach(file => console.log(`   - ${file}`));
  console.log('');
  
  let converted = 0;
  let removed = 0;
  
  for (const pngFile of pngFiles) {
    const wasRemoved = await convertToWebP(pngFile);
    converted++;
    if (wasRemoved) removed++;
    console.log('');
  }
  
  console.log('🎉 Conversion complete!');
  console.log(`📊 Summary:`);
  console.log(`   - Files processed: ${converted}`);
  console.log(`   - Original PNGs removed: ${removed}`);
  console.log(`   - Original PNGs kept: ${converted - removed}`);
  console.log('');
  console.log('🔧 Next step: Update code references to use .webp extensions');
};

// Run the conversion
convertAllRemainingPngs().catch(console.error);
