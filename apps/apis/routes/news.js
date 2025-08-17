const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

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

// Superadmin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const [users] = await pool.execute(
      'SELECT id, username, password, role FROM users WHERE username = ?',
      [username]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (user.role !== 'superadmin') {
      return res.status(403).json({ error: 'Superadmin access required' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    res.json({
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  // Get all news articles (public endpoint) - matches frontend structure
  router.get('/', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || parseInt(process.env.NEWS_PER_PAGE) || 10;
      const offset = (page - 1) * limit;
      const category = req.query.category;
      const search = req.query.search;
      const featured = req.query.featured;

    let whereClause = 'WHERE status = "published"';
    let params = [];

    if (category) {
      whereClause += ' AND category = ?';
      params.push(category);
    }

    if (search) {
      whereClause += ' AND (title LIKE ? OR description LIKE ? OR content LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    if (featured === 'true') {
      whereClause += ' AND featured = TRUE';
    }

    // Get total count
    const [countResult] = await pool.execute(
      `SELECT COUNT(*) as total FROM news_articles ${whereClause}`,
      params
    );
    const total = countResult[0].total;

    // Get articles
    const [articles] = await pool.query(
      `SELECT title, description, image, category, slug, featured, views, created_at 
       FROM news_articles ${whereClause} 
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    // Transform to match frontend structure
    const transformedResults = articles.map(article => ({
      title: article.title,
      description: article.description,
      image: article.image,
      category: article.category
    }));

    res.json({
      articles: transformedResults,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get articles error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get news article by slug (public endpoint)
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const [articles] = await pool.execute(
      'SELECT title, description, image, category, slug, content, views, created_at FROM news_articles WHERE slug = ? AND status = "published"',
      [slug]
    );

    if (articles.length === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }

    const article = articles[0];

    // Increment view count
    await pool.execute(
      'UPDATE news_articles SET views = views + 1 WHERE slug = ?',
      [slug]
    );

    // Transform to match frontend structure
    const transformedArticle = {
      title: article.title,
      description: article.description,
      image: article.image,
      category: article.category
    };

    res.json({ article: transformedArticle });
  } catch (error) {
    console.error('Get article error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get news categories (public endpoint) - matches frontend categories
router.get('/categories/all', async (req, res) => {
  try {
    const [categories] = await pool.execute(
      'SELECT name FROM categories ORDER BY name'
    );

    const categoryNames = categories.map(cat => cat.name);
    res.json({ categories: categoryNames });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get featured articles (public endpoint) - matches frontend structure
router.get('/featured/all', async (req, res) => {
  try {
    const [articles] = await pool.execute(
      'SELECT title, description, image, category FROM news_articles WHERE featured = TRUE AND status = "published" ORDER BY created_at DESC LIMIT 10'
    );

    res.json({ articles });
  } catch (error) {
    console.error('Get featured articles error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  // Get articles by category (public endpoint) - matches frontend structure
  router.get('/category/:category', async (req, res) => {
    try {
      const { category } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || parseInt(process.env.NEWS_PER_PAGE) || 10;
      const offset = (page - 1) * limit;

      // Get total count for this category
      const [countResult] = await pool.execute(
        'SELECT COUNT(*) as total FROM news_articles WHERE category = ? AND status = "published"',
        [category]
      );
      const total = countResult[0].total;

      // Get articles for this category
      const [articles] = await pool.query(
        'SELECT title, description, image, category FROM news_articles WHERE category = ? AND status = "published" ORDER BY created_at DESC LIMIT ? OFFSET ?',
        [category, limit, offset]
      );

    res.json({
      articles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get articles by category error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ===== SUPERADMIN ONLY ENDPOINTS =====

// Create new article (superadmin only)
router.post('/', authenticateSuperadmin, async (req, res) => {
  try {
    const { title, description, content, image, category, slug, featured } = req.body;

    if (!title || !description || !content || !category || !slug) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if slug already exists
    const [existing] = await pool.execute(
      'SELECT id FROM news_articles WHERE slug = ?',
      [slug]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: 'Slug already exists' });
    }

    // Insert new article
    const [result] = await pool.execute(
      'INSERT INTO news_articles (title, description, content, image, category, slug, featured, author_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description, content, image || '/placeholder.svg?height=200&width=300', category, slug, featured || false, req.user.id]
    );

    // Get the created article
    const [articles] = await pool.execute(
      'SELECT title, description, image, category, slug, content, featured, status FROM news_articles WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({ article: articles[0] });
  } catch (error) {
    console.error('Create article error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update article (superadmin only)
router.put('/:id', authenticateSuperadmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, content, image, category, slug, featured, status } = req.body;

    // Check if article exists
    const [existing] = await pool.execute(
      'SELECT id FROM news_articles WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Check if slug already exists (excluding current article)
    if (slug) {
      const [slugCheck] = await pool.execute(
        'SELECT id FROM news_articles WHERE slug = ? AND id != ?',
        [slug, id]
      );

      if (slugCheck.length > 0) {
        return res.status(400).json({ error: 'Slug already exists' });
      }
    }

    // Update article
    await pool.execute(
      'UPDATE news_articles SET title = ?, description = ?, content = ?, image = ?, category = ?, slug = ?, featured = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [title, description, content, image, category, slug, featured, status, id]
    );

    // Get the updated article
    const [articles] = await pool.execute(
      'SELECT title, description, image, category, slug, content, featured, status FROM news_articles WHERE id = ?',
      [id]
    );

    res.json({ article: articles[0] });
  } catch (error) {
    console.error('Update article error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete article (superadmin only)
router.delete('/:id', authenticateSuperadmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if article exists
    const [existing] = await pool.execute(
      'SELECT id FROM news_articles WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Delete article
    await pool.execute('DELETE FROM news_articles WHERE id = ?', [id]);

    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Delete article error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  // Get all articles for admin (superadmin only) - including drafts
  router.get('/admin/all', authenticateSuperadmin, async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || parseInt(process.env.MAX_ARTICLES_PER_REQUEST) || 50;
      const offset = (page - 1) * limit;

    // Get total count
    const [countResult] = await pool.execute(
      'SELECT COUNT(*) as total FROM news_articles'
    );
    const total = countResult[0].total;

    // Get all articles
    const [articles] = await pool.query(
      'SELECT id, title, description, image, category, slug, content, featured, status, views, author, created_at, updated_at FROM news_articles ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );

    res.json({
      articles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get admin articles error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
