const mysql = require('mysql2/promise');
require('dotenv').config({ path: './env' });

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'remelife_news',
  port: process.env.DB_PORT || 3306,
  socketPath: process.env.DB_SOCKET || '/tmp/mysql.sock',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

// Initialize database tables
const initializeDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    
    // Create news_articles table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS news_articles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        content LONGTEXT NOT NULL,
        image VARCHAR(500) DEFAULT '/placeholder.svg?height=200&width=300',
        category VARCHAR(100) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
        featured BOOLEAN DEFAULT FALSE,
        views INT DEFAULT 0,
        author VARCHAR(100) DEFAULT 'Superadmin',
        author_id INT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_category (category),
        INDEX idx_status (status),
        INDEX idx_featured (featured),
        INDEX idx_slug (slug),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Create users table for authentication
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('user', 'admin', 'superadmin') DEFAULT 'user',
        email VARCHAR(255) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_username (username),
        INDEX idx_role (role)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Create categories table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        description TEXT,
        slug VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_slug (slug)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Insert default categories if they don't exist
    const defaultCategories = [
      'Health & Social Care',
      'Mind, Body & Spirit',
      'World News',
      'Entertainment',
      'Leisure & Lifestyle',
      'Technology',
      'Money & Business',
      'Culture',
      'Food, Fashion & Beauty',
      'Travel'
    ];

    for (const categoryName of defaultCategories) {
      const slug = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      await connection.execute(`
        INSERT IGNORE INTO categories (name, description, slug) 
        VALUES (?, ?, ?)
      `, [categoryName, `Articles about ${categoryName}`, slug]);
    }

    // Insert default superadmin user if it doesn't exist
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('remelife2024!', 10);
    
    await connection.execute(`
      INSERT IGNORE INTO users (username, password, role, email) 
      VALUES (?, ?, ?, ?)
    `, ['superadmin', hashedPassword, 'superadmin', 'admin@remelife.com']);

    // Insert sample articles if they don't exist
    const sampleArticles = [
      {
        title: "When Heroes get sick",
        description: "The entertainment industry has long been a source of inspiration...",
        content: "The entertainment industry has long been a source of inspiration for people around the world. From actors and musicians to athletes and public figures, these heroes often seem larger than life. However, when they face health challenges, it reminds us that they are human too...",
        category: "Entertainment",
        slug: "when-heroes-get-sick",
        featured: true
      },
      {
        title: "What you need to know about finding a care home",
        description: "Finding the right care home is a significant decision for families...",
        content: "Finding the right care home is a significant decision for families and individuals. It involves careful consideration of various factors including location, quality of care, cost, and the specific needs of the person requiring care...",
        category: "Health & Social Care",
        slug: "what-you-need-to-know-about-finding-a-care-home",
        featured: true
      },
      {
        title: "23 year old SpaceX intern deciphers Herculaneum Scrolls",
        description: "Based on reports from TechCrunch, Luke Farritor, a 23-year-old...",
        content: "Based on reports from TechCrunch, Luke Farritor, a 23-year-old former SpaceX intern, has made a breakthrough in deciphering the ancient Herculaneum scrolls using artificial intelligence...",
        category: "Technology",
        slug: "23-year-old-spacex-intern-deciphers-herculaneum-scrolls",
        featured: true
      }
    ];

    for (const article of sampleArticles) {
      await connection.execute(`
        INSERT IGNORE INTO news_articles (title, description, content, category, slug, featured, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [article.title, article.description, article.content, article.category, article.slug, article.featured, 'published']);
    }

    connection.release();
    console.log('✅ Database tables initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    return false;
  }
};

module.exports = {
  pool,
  testConnection,
  initializeDatabase
};
