# RemeLife News Management System

A complete news management system with CRUD operations, authentication, and a beautiful admin interface.

## 🚀 Features

- **Complete CRUD Operations**: Create, Read, Update, Delete news articles
- **Admin Authentication**: Secure login system with JWT tokens
- **Modern UI**: Professional Shadcn UI design system with Tailwind CSS
- **Public News Viewer**: Clean, searchable news display
- **Category Management**: Organize articles by categories
- **Featured Articles**: Mark and display featured content
- **Search & Filtering**: Find articles by category, search terms, or featured status
- **Pagination**: Efficient browsing of large article collections
- **View Tracking**: Monitor article popularity
- **Image Management**: Upload, preview, and manage article images

## 📁 File Structure

```
apps/apis/
├── public/
│   ├── admin.html          # Modern admin dashboard (Shadcn UI)
│   ├── login.html          # Professional login interface (Shadcn UI)
│   ├── news.html           # Public news viewer
│   ├── backup/             # Backup of previous versions
│   └── uploads/            # Image upload storage
├── routes/
│   ├── news.js             # News API endpoints
│   └── upload.js            # Image upload endpoints
├── scripts/
│   ├── setup-database.js   # Database setup
│   └── create-admin-user.js # Create default admin
├── config/
│   └── database.js         # Database configuration
├── server.js               # Main server file
└── env                     # Environment configuration
```

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
cd apps/apis
npm install
```

### 2. Configure Environment
Copy the `env` file and update the database credentials:
```bash
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=remelife_news
DB_PORT=3306

# Security
JWT_SECRET=your-super-secret-jwt-key
SESSION_SECRET=your-super-secret-session-key
```

### 3. Setup Database
```bash
npm run db:setup
```

### 4. Create Admin User
```bash
npm run create-admin
```

**Default Admin Credentials:**
- Username: `admin` (or `superadmin`)
- Password: `admin123`

⚠️ **Important**: Change the default password after first login!

### 5. Start the Server
```bash
npm run dev    # Development mode with auto-reload
# or
npm start      # Production mode
```

## 🌐 Access URLs

- **Root Page**: `http://localhost:3001/` - Automatically redirects based on authentication
- **Admin Login**: `http://localhost:3001/login.html`
- **Admin Dashboard**: `http://localhost:3001/admin.html`
- **Public News**: `http://localhost:3001/news.html`
- **API Health Check**: `http://localhost:3001/health`

### **🔄 Smart Root Redirect**

The root page (`/`) now automatically redirects users:

- **Authenticated Users** → Redirected to `/admin.html` (Admin Panel)
- **Unauthenticated Users** → Redirected to `/login.html` (Login Page)
- **Manual Override** → Users can still manually navigate to any page

## 🎨 UI Design System

The admin interface now uses **Shadcn UI** design principles with **Tailwind CSS**:

- **Modern Components**: Professional button, input, card, and modal designs
- **Responsive Layout**: Mobile-first design that works on all devices
- **Smooth Animations**: Subtle transitions and hover effects
- **Consistent Spacing**: Unified design system with proper visual hierarchy
- **Professional Appearance**: Clean, modern interface that builds user trust
- **Accessibility**: Proper focus states, labels, and semantic HTML

## 🔐 Authentication

The system uses JWT (JSON Web Tokens) for authentication:

1. **Login**: POST `/api/news/login`
2. **Token Storage**: Automatically stored in localStorage
3. **Protected Routes**: All admin operations require valid JWT token
4. **Token Expiry**: 24 hours (configurable in env)

## 📰 API Endpoints

### Public Endpoints (No Authentication Required)
- `GET /api/news` - Get all published articles
- `GET /api/news/:slug` - Get article by slug
- `GET /api/news/categories/all` - Get all categories
- `GET /api/news/featured/all` - Get featured articles
- `GET /api/news/category/:category` - Get articles by category

### Admin Endpoints (Authentication Required)
- `POST /api/news/login` - Admin login
- `POST /api/news` - Create new article
- `PUT /api/news/:id` - Update article
- `DELETE /api/news/:id` - Delete article
- `GET /api/news/admin/all` - Get all articles (including drafts)

### Image Upload Endpoints (Authentication Required)
- `POST /api/upload/image` - Upload single image
- `POST /api/upload/images` - Upload multiple images
- `GET /api/upload/images` - Get list of uploaded images
- `DELETE /api/upload/image/:filename` - Delete uploaded image

## 🎨 Admin Interface Features

### News Management
- **Create Articles**: Full form with title, description, content, category, slug, image, and featured status
- **Edit Articles**: Click edit button to populate form with existing data
- **Delete Articles**: Confirmation dialog before deletion
- **Auto-slug Generation**: Automatically generates URL-friendly slugs from titles

### Article Properties
- **Title**: Article headline
- **Slug**: URL-friendly identifier
- **Category**: Article classification (Technology, Health, Business, Lifestyle, Science)
- **Description**: Short summary for previews
- **Content**: Full article text
- **Image**: Article image (upload or URL)
- **Featured**: Mark as featured article
- **Status**: Draft or Published

### Image Management
- **Direct Upload**: Drag & drop or select image files
- **File Types**: JPG, PNG, GIF, WebP supported
- **File Size**: Maximum 5MB per image
- **Image Library**: Browse and reuse previously uploaded images
- **Preview**: Real-time image preview before saving
- **Auto-URL**: Automatically generates image URLs for articles

### Table View
- **Sortable Columns**: Title, Category, Status, Featured, Views, Created Date
- **Action Buttons**: Edit and Delete for each article
- **Status Badges**: Visual indicators for article status
- **Responsive Design**: Works on all device sizes

## 🔍 Public News Viewer Features

### Filtering & Search
- **Category Filter**: Browse articles by category
- **Search**: Find articles by title, description, or content
- **Featured Filter**: Show only featured articles
- **Real-time Search**: Instant results as you type

### Display
- **Grid Layout**: Responsive card-based design
- **Pagination**: Navigate through large article collections
- **View Counts**: Track article popularity
- **Featured Badges**: Highlight special content

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin', 'superadmin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### News Articles Table
```sql
CREATE TABLE news_articles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  content LONGTEXT,
  image VARCHAR(500),
  category VARCHAR(100),
  featured BOOLEAN DEFAULT FALSE,
  status ENUM('draft', 'published') DEFAULT 'draft',
  views INT DEFAULT 0,
  author_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Categories Table
```sql
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🚨 Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Protection**: Parameterized queries
- **CORS Configuration**: Controlled cross-origin access
- **Helmet Security**: HTTP security headers

## 🎯 Usage Examples

### Creating an Article
1. Login to admin panel
2. Fill out the article form
3. Set status to "published" for immediate visibility
4. Click "Save Article"

### Editing an Article
1. Find the article in the table
2. Click "Edit" button
3. Modify the form fields
4. Click "Save Article"

### Managing Categories
Categories are predefined but can be extended by modifying the database or admin interface.

## 🔧 Customization

### Adding New Categories
Update the category options in `admin.html` and `news.html`:
```html
<option value="NewCategory">New Category</option>
```

### Modifying Article Fields
Add new fields to the database schema and update the forms accordingly.

### Styling Changes
All styles are inline in the HTML files for easy customization.

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check MySQL service is running
   - Verify database credentials in `env` file
   - Ensure database exists

2. **Login Not Working**
   - Verify admin user was created: `npm run create-admin`
   - Check JWT_SECRET in environment
   - Clear browser localStorage

3. **Articles Not Displaying**
   - Check article status (must be "published")
   - Verify database has data
   - Check browser console for errors

### Debug Mode
Enable debug logging by setting `NODE_ENV=development` in the `env` file.

## 📱 Mobile Responsiveness

All interfaces are fully responsive and work on:
- Desktop computers
- Tablets
- Mobile phones
- Touch devices

## 🖼️ Image Upload System

The news system includes a comprehensive image management solution:

### **Upload Features**
- **Direct File Upload**: Select images from your device
- **Multiple Formats**: Supports JPG, PNG, GIF, and WebP
- **Size Limits**: Maximum 5MB per image
- **Unique Naming**: Automatic filename generation to prevent conflicts
- **Secure Storage**: Images stored in `public/uploads/` directory

### **Image Library**
- **Browse Existing**: View all previously uploaded images
- **Reuse Images**: Select from existing images for new articles
- **Image Info**: See file size, upload date, and filename
- **Quick Selection**: Click to instantly use an image

### **User Experience**
- **Real-time Preview**: See images before uploading
- **Drag & Drop**: Intuitive file selection
- **Progress Feedback**: Clear success/error messages
- **Modal Interface**: Clean, focused upload experience

### **Technical Details**
- **Multer Integration**: Robust file handling middleware
- **Authentication**: Only authenticated users can upload
- **File Validation**: Type and size checking
- **Error Handling**: Comprehensive error messages
- **Cleanup**: Automatic directory creation

## 🔄 Future Enhancements

Potential improvements for future versions:
- **Image Optimization**: Automatic resizing and compression
- **Cloud Storage**: Integration with AWS S3, Google Cloud
- **Image Editing**: Basic cropping and filters
- **Bulk Upload**: Multiple image upload at once
- **Rich Text Editor**: WYSIWYG content editing
- **User Roles**: Multiple admin levels
- **Analytics**: Detailed view statistics
- **SEO Tools**: Meta tags and optimization
- **Social Sharing**: Social media integration
- **Comments System**: User engagement features
- **Newsletter Integration**: Email distribution

## 📞 Support

For technical support or feature requests, please contact the development team.

---

**RemeLife News System** - Built with ❤️ for modern content management
