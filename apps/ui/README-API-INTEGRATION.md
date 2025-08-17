# RemeLife UI - API Integration Guide

This guide explains how the RemeLife UI has been integrated with the backend API for the news functionality.

## 🚀 **What's Been Integrated**

### **Frontend Changes:**
- ✅ **Replaced static mock data** with dynamic API calls
- ✅ **Added loading states** for better user experience
- ✅ **Added error handling** for API failures
- ✅ **Implemented search functionality** using the API
- ✅ **Added category-based article fetching**
- ✅ **Created reusable API service** for clean code organization

### **API Endpoints Used:**
- `GET /api/news/categories/all` - Fetch all news categories
- `GET /api/news/featured/all` - Fetch featured articles
- `GET /api/news/category/:category` - Fetch articles by category
- `GET /api/news?search=query` - Search articles
- `GET /api/news/:slug` - Get article by slug

## 🛠️ **Setup Instructions**

### **1. Backend Setup**
First, ensure your backend API is running:

```bash
cd apps/remelife-apis
npm install
npm start
```

The API should be running on `http://localhost:3001`

### **2. Frontend Environment Configuration**
Create a `.env.local` file in the `apps/remelife-ui` directory:

```bash
cd apps/remelife-ui
cp env.local.example .env.local
```

Edit `.env.local` with your API configuration:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# Environment
NODE_ENV=development
```

**Note:** For production, change the API URL to your production backend URL.

### **3. Start the Frontend**
```bash
cd apps/remelife-ui
npm install
npm run dev
```

The frontend should now be running on `http://localhost:3000`

## 🔧 **How It Works**

### **Data Flow:**
1. **Page Load**: Fetches categories and featured articles
2. **Category Selection**: Dynamically loads articles for selected category
3. **Search**: Real-time search with API calls
4. **Error Handling**: Graceful fallbacks for API failures

### **State Management:**
- `categories`: List of available news categories
- `featuredArticles`: Featured articles for the homepage
- `articles`: Articles organized by category (lazy-loaded)
- `searchResults`: Search results from API
- `isLoading`: Loading states for better UX
- `error`: Error handling and display

### **API Service (`lib/api.ts`):**
Centralized API calls with:
- Type safety with TypeScript
- Error handling and logging
- Consistent response formatting
- Easy to maintain and extend

## 📱 **User Experience Features**

### **Loading States:**
- Initial page load spinner
- Category-specific loading indicators
- Search loading states
- Smooth transitions

### **Error Handling:**
- API failure messages
- Retry functionality
- Graceful degradation
- User-friendly error messages

### **Performance:**
- Lazy loading of category articles
- Debounced search (300ms)
- Efficient state updates
- Minimal re-renders

## 🧪 **Testing the Integration**

### **1. Test Backend API:**
```bash
cd apps/remelife-apis
npm test
```

### **2. Test Frontend Integration:**
1. Open `http://localhost:3000/news`
2. Verify categories load from API
3. Test search functionality
4. Check category navigation
5. Verify loading states work

### **3. Test API Endpoints:**
```bash
# Test categories
curl http://localhost:3001/api/news/categories/all

# Test featured articles
curl http://localhost:3001/api/news/featured/all

# Test category articles
curl http://localhost:3001/api/news/category/Technology

# Test search
curl "http://localhost:3001/api/news?search=digital"
```

## 🔍 **Troubleshooting**

### **Common Issues:**

#### **1. API Connection Failed**
- Check if backend is running on port 3001
- Verify `.env.local` configuration
- Check browser console for CORS errors

#### **2. Categories Not Loading**
- Verify `/api/news/categories/all` endpoint works
- Check network tab in browser dev tools
- Verify API response format

#### **3. Search Not Working**
- Check search endpoint in network tab
- Verify search query encoding
- Check API error logs

#### **4. Loading States Not Showing**
- Check `isLoading` state management
- Verify loading conditions in JSX
- Check for state update issues

### **Debug Steps:**
1. **Check Browser Console**: Look for JavaScript errors
2. **Check Network Tab**: Verify API calls and responses
3. **Check Backend Logs**: Look for API errors
4. **Verify Environment**: Check `.env.local` configuration

## 🚀 **Production Deployment**

### **1. Backend Deployment:**
```bash
cd apps/remelife-apis
npm run build
# Deploy to your hosting provider
```

### **2. Frontend Environment:**
Update `.env.local` for production:

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
NODE_ENV=production
```

### **3. CORS Configuration:**
Ensure your backend allows requests from your frontend domain:

```env
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

## 📚 **API Documentation**

### **Response Formats:**

#### **Categories:**
```json
{
  "categories": [
    "Health & Social Care",
    "Technology",
    "Entertainment"
  ]
}
```

#### **Articles:**
```json
{
  "articles": [
    {
      "title": "Article Title",
      "description": "Article description...",
      "image": "/placeholder.svg?height=200&width=300",
      "category": "Technology"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalArticles": 50,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

## 🔮 **Future Enhancements**

### **Planned Features:**
- **Pagination**: Load more articles per category
- **Caching**: Implement client-side caching
- **Offline Support**: Service worker for offline reading
- **Real-time Updates**: WebSocket for live content updates
- **Admin Panel**: Superadmin article management interface

### **Performance Improvements:**
- **Image Optimization**: Next.js Image component optimization
- **Lazy Loading**: Intersection Observer for article cards
- **Bundle Splitting**: Code splitting for better performance
- **CDN Integration**: Static asset delivery optimization

## 📞 **Support**

For issues or questions:
1. Check this documentation
2. Review browser console errors
3. Check API endpoint responses
4. Verify environment configuration
5. Test with the provided test scripts

## 📄 **Files Modified**

- `app/news/page.tsx` - Main news page with API integration
- `lib/api.ts` - API service layer
- `env.local.example` - Environment configuration template
- `README-API-INTEGRATION.md` - This documentation

The integration is now complete and ready for production use! 🎉
