# RemeLife News API

Simple Express.js backend for the RemeLife news functionality with MySQL database integration.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- MySQL 5.7+ or MariaDB 10.2+
- MySQL user with CREATE privileges

### Installation

```bash
# Install dependencies
npm install

# Setup database (creates tables and sample data)
npm run db:setup

# Start development server
npm run dev

# Start production server
npm start
```

## 🗄️ Database Setup

The API automatically creates the following database structure:

### Tables
- **`news_articles`** - News articles with full content
- **`users`** - User authentication (superadmin, admin, user roles)
- **`categories`** - Article categories

### Default Data
- 10 predefined categories
- Superadmin user: `superadmin` / `remelife2024!`
- Sample articles for testing

## 🔧 Environment Configuration

Create an `env` file with your database settings:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,https://remelife.com

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=remelife_news
DB_PORT=3306

# Security
SESSION_SECRET=your-super-secret-session-key-here
JWT_SECRET=your-jwt-secret-key-here

# News API Configuration
NEWS_PER_PAGE=10
MAX_ARTICLES_PER_REQUEST=50
```

## 📡 API Endpoints

### Public Endpoints
- `GET /health` - Health check
- `GET /api/news` - Get all published articles
- `GET /api/news/categories/all` - Get all categories
- `GET /api/news/featured/all` - Get featured articles
- `GET /api/news/category/:category` - Get articles by category
- `GET /api/news/:slug` - Get article by slug

### Superadmin Endpoints
- `POST /api/news/login` - Superadmin login
- `POST /api/news` - Create article
- `PUT /api/news/:id` - Update article
- `DELETE /api/news/:id` - Delete article
- `GET /api/news/admin/all` - Get all articles (including drafts)

## 🔐 Authentication

### Superadmin Login
```bash
POST /api/news/login
{
  "username": "superadmin",
  "password": "remelife2024!"
}
```

### Using JWT Token
Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 📊 Database Schema

### news_articles
```sql
CREATE TABLE news_articles (
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
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🛠️ Troubleshooting

### Database Connection Issues
1. Ensure MySQL is running
2. Check database credentials in `env` file
3. Verify user has CREATE privileges
4. Check if database exists

### Common Errors
- **Connection refused**: MySQL not running or wrong port
- **Access denied**: Wrong username/password
- **Table doesn't exist**: Run `npm run db:setup`

## 🔄 Development

```bash
# Watch for changes
npm run dev

# Test database connection
node config/database.js

# Reset database
npm run db:setup
```

## 🚀 Production Deployment

1. Set `NODE_ENV=production` in your `env` file
2. Use a process manager like PM2
3. Set up proper MySQL user with limited privileges
4. Configure CORS origins for production domains
