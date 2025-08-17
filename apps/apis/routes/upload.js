const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Authentication middleware for superadmin
const authenticateSuperadmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    
    if (decoded.role !== 'superadmin') {
      return res.status(403).json({ error: 'Superadmin access required' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'public/uploads';
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'news-' + uniqueSuffix + ext);
  }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  // Check file type
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
});

// Upload single image
router.post('/image', authenticateSuperadmin, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Generate the URL for the uploaded image
    const imageUrl = `/uploads/${req.file.filename}`;
    
    res.json({
      success: true,
      message: 'Image uploaded successfully',
      image: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        url: imageUrl,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Upload multiple images
router.post('/images', authenticateSuperadmin, upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No image files provided' });
    }

    const uploadedImages = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      url: `/uploads/${file.filename}`,
      size: file.size,
      mimetype: file.mimetype
    }));

    res.json({
      success: true,
      message: `${uploadedImages.length} images uploaded successfully`,
      images: uploadedImages
    });
  } catch (error) {
    console.error('Multiple images upload error:', error);
    res.status(500).json({ error: 'Failed to upload images' });
  }
});

// Delete uploaded image
router.delete('/image/:filename', authenticateSuperadmin, async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join('public/uploads', filename);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Image not found' });
    }
    
    // Delete file
    fs.unlinkSync(filePath);
    
    res.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    console.error('Image deletion error:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

// Get list of uploaded images
router.get('/images', authenticateSuperadmin, async (req, res) => {
  try {
    const uploadDir = 'public/uploads';
    
    if (!fs.existsSync(uploadDir)) {
      return res.json({ images: [] });
    }
    
    const files = fs.readdirSync(uploadDir);
    const images = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
      })
      .map(file => {
        const filePath = path.join(uploadDir, file);
        const stats = fs.statSync(filePath);
        return {
          filename: file,
          url: `/uploads/${file}`,
          size: stats.size,
          uploadedAt: stats.mtime
        };
      })
      .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
    
    res.json({ images });
  } catch (error) {
    console.error('Get images error:', error);
    res.status(500).json({ error: 'Failed to get images list' });
  }
});

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: 'Too many files. Maximum is 10 files.' });
    }
    return res.status(400).json({ error: error.message });
  }
  
  if (error.message === 'Only image files are allowed!') {
    return res.status(400).json({ error: error.message });
  }
  
  next(error);
});

module.exports = router;
