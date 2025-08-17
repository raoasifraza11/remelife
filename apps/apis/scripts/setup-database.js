#!/usr/bin/env node

/**
 * Database Setup Script for RemeLife News API
 * This script initializes the MySQL database and creates all necessary tables
 */

const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../env' });

async function setupDatabase() {
  console.log('🚀 Setting up RemeLife News Database...\n');

  // First, connect without database to create it if it doesn't exist
  const connectionConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT || 3306
  };

  let connection;
  
  try {
    // Connect to MySQL server
    connection = await mysql.createConnection(connectionConfig);
    console.log('✅ Connected to MySQL server');

    // Create database if it doesn't exist
    const dbName = process.env.DB_NAME || 'remelife_news';
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log(`✅ Database '${dbName}' created/verified`);

    // Use the database
    await connection.execute(`USE \`${dbName}\``);
    console.log(`✅ Using database '${dbName}'`);

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
    console.log('✅ news_articles table created/verified');

    // Create users table
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
    console.log('✅ users table created/verified');

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
    console.log('✅ categories table created/verified');

    // Insert default categories
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
    console.log('✅ Default categories inserted');

    // Insert default superadmin user
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('remelife2024!', 10);
    
    await connection.execute(`
      INSERT IGNORE INTO users (username, password, role, email) 
      VALUES (?, ?, ?, ?)
    `, ['superadmin', hashedPassword, 'superadmin', 'admin@remelife.com']);
    console.log('✅ Default superadmin user created');

    // Insert sample articles
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
      },
      {
        title: "Reconfigurable Intelligent Surfaces: Watching You in Ways You Can't Imagine",
        description: "In an age of ever-advancing technology, our privacy is under...",
        content: "In an age of ever-advancing technology, our privacy is under constant threat from new surveillance methods. Reconfigurable Intelligent Surfaces represent the latest frontier in this ongoing battle...",
        category: "Technology",
        slug: "reconfigurable-intelligent-surfaces-watching-you",
        featured: true
      },
      {
        title: "A New Era for Social Care: The UK Dementia Care",
        description: "The UK government has recently announced a groundbreaking initiative to...",
        content: "The UK government has recently announced a groundbreaking initiative to revolutionize dementia care across the country. This comprehensive plan aims to provide better support for both patients and caregivers...",
        category: "Health & Social Care",
        slug: "new-era-for-social-care-uk-dementia-care",
        featured: true
      }
    ];

    for (const article of sampleArticles) {
      await connection.execute(`
        INSERT IGNORE INTO news_articles (title, description, content, category, slug, featured, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [article.title, article.description, article.content, article.category, article.slug, article.featured, 'published']);
    }
    console.log('✅ Sample articles inserted');

    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📊 Database Summary:');
    console.log(`   Database: ${dbName}`);
    console.log(`   Tables: news_articles, users, categories`);
    console.log(`   Categories: ${defaultCategories.length}`);
    console.log(`   Sample Articles: ${sampleArticles.length}`);
    console.log(`   Superadmin: superadmin / remelife2024!`);
    
    console.log('\n🚀 You can now start the API server with:');
    console.log('   npm start');

  } catch (error) {
    console.error('\n❌ Database setup failed:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('   1. Make sure MySQL is running');
    console.error('   2. Check your database credentials in the env file');
    console.error('   3. Ensure the database user has CREATE privileges');
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the setup
setupDatabase();
