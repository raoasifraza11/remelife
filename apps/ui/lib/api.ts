// API service for news endpoints

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

// Types
export type Article = {
  title: string
  description: string
  image: string
  category: string
}

export type ApiResponse<T> = {
  articles: T[]
  pagination?: {
    currentPage: number
    totalPages: number
    totalArticles: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export type CategoryResponse = {
  categories: string[]
}

// API functions
export const newsApi = {
  // Get all categories
  async getCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/news/categories/all`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: CategoryResponse = await response.json()
      return data.categories
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw new Error('Failed to fetch categories')
    }
  },

  // Get featured articles
  async getFeaturedArticles(): Promise<Article[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/news/featured/all`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: ApiResponse<Article> = await response.json()
      return data.articles
    } catch (error) {
      console.error('Error fetching featured articles:', error)
      throw new Error('Failed to fetch featured articles')
    }
  },

  // Get articles by category
  async getArticlesByCategory(category: string, page: number = 1, limit: number = 10): Promise<ApiResponse<Article>> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/news/category/${encodeURIComponent(category)}?page=${page}&limit=${limit}`
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: ApiResponse<Article> = await response.json()
      return data
    } catch (error) {
      console.error(`Error fetching articles for ${category}:`, error)
      throw new Error(`Failed to fetch articles for ${category}`)
    }
  },

  // Search articles
  async searchArticles(query: string, page: number = 1, limit: number = 20): Promise<ApiResponse<Article>> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/news?search=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: ApiResponse<Article> = await response.json()
      return data
    } catch (error) {
      console.error('Error searching articles:', error)
      throw new Error('Search failed')
    }
  },

  // Get article by slug
  async getArticleBySlug(slug: string): Promise<Article> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/news/${slug}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      return data.article
    } catch (error) {
      console.error(`Error fetching article ${slug}:`, error)
      throw new Error('Failed to fetch article')
    }
  },

  // Superadmin login
  async login(username: string, password: string): Promise<{ user: any; token: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/news/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Login error:', error)
      throw new Error('Login failed')
    }
  },

  // Create new article (superadmin only)
  async createArticle(articleData: {
    username: string
    password: string
    title: string
    description: string
    category: string
    content?: string
    status?: string
    featured?: boolean
  }): Promise<Article> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      return data.article
    } catch (error) {
      console.error('Error creating article:', error)
      throw new Error('Failed to create article')
    }
  }
}

// Utility function to check if API is available
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`)
    return response.ok
  } catch {
    return false
  }
}
