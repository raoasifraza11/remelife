"use client"

import React, { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArticleCard } from "@/components/article-card"
import { Search, ChevronUp, Rss, X, Loader2 } from "lucide-react"
import { AnimatePresence } from "framer-motion"
import { newsApi, type Article } from "@/lib/api"

export default function NewsPage() {
  const [showScroll, setShowScroll] = React.useState(false)
  const [activeCategory, setActiveCategory] = React.useState("Health & Social Care")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [searchResults, setSearchResults] = React.useState<Article[]>([])
  
  // API data states
  const [articles, setArticles] = React.useState<{ [key: string]: Article[] }>({})
  const [featuredArticles, setFeaturedArticles] = React.useState<Article[]>([])
  const [categories, setCategories] = React.useState<string[]>([])
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const categoriesData = await newsApi.getCategories()
      setCategories(categoriesData)
      
      // Set default active category
      if (categoriesData.length > 0) {
        setActiveCategory(categoriesData[0])
      }
    } catch (err) {
      console.error('Error fetching categories:', err)
      setError('Failed to load categories')
    }
  }

  // Fetch featured articles from API
  const fetchFeaturedArticles = async () => {
    try {
      const featuredData = await newsApi.getFeaturedArticles()
      setFeaturedArticles(featuredData)
    } catch (err) {
      console.error('Error fetching featured articles:', err)
      setError('Failed to load featured articles')
    }
  }

  // Fetch articles by category from API
  const fetchArticlesByCategory = async (category: string) => {
    try {
      setIsLoading(true)
      const data = await newsApi.getArticlesByCategory(category)
      
      setArticles(prev => ({
        ...prev,
        [category]: data.articles
      }))
    } catch (err) {
      console.error(`Error fetching articles for ${category}:`, err)
      setError(`Failed to load articles for ${category}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Search articles using API
  const searchArticles = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    try {
      setIsSearching(true)
      const data = await newsApi.searchArticles(query)
      setSearchResults(data.articles)
    } catch (err) {
      console.error('Search error:', err)
      setError('Search failed')
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  // Initialize data on component mount
  React.useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(true)
        await Promise.all([
          fetchCategories(),
          fetchFeaturedArticles()
        ])
      } catch (err) {
        console.error('Error initializing data:', err)
        setError('Failed to initialize news data')
      } finally {
        setIsLoading(false)
      }
    }

    initializeData()
  }, [])

  // Fetch articles when active category changes
  React.useEffect(() => {
    if (activeCategory && !articles[activeCategory]) {
      fetchArticlesByCategory(activeCategory)
    }
  }, [activeCategory, articles])

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false)
    }
  }

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Search functionality with debouncing
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    
    if (query.trim() === "") {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    const timeoutId = setTimeout(() => {
      searchArticles(query)
    }, 300) // 300ms debounce

    return () => clearTimeout(timeoutId)
  }, [])

  // Category navigation
  const scrollToCategory = (category: string) => {
    const element = document.getElementById(category.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase())
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setActiveCategory(category)
    }
  }

  // Intersection Observer for active category tracking
  React.useEffect(() => {
    if (categories.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const categoryId = entry.target.id
            const categoryName = categoryId.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
            const matchedCategory = categories.find(
              (cat) => cat.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase() === categoryId,
            )
            if (matchedCategory) {
              setActiveCategory(matchedCategory)
            }
          }
        })
      },
      { threshold: 0.3, rootMargin: "-100px 0px -50% 0px" },
    )

    categories.forEach((category) => {
      const element = document.getElementById(category.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase())
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [categories])

  React.useEffect(() => {
    window.addEventListener("scroll", checkScrollTop)
    return () => window.removeEventListener("scroll", checkScrollTop)
  }, [showScroll])

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
    setIsSearching(false)
  }

  // Loading component
  if (isLoading && categories.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary-accent" />
          <p className="text-soft-text text-lg">Loading news...</p>
        </div>
      </div>
    )
  }

  // Error component
  if (error && categories.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="text-primary-accent hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-background-end" />

      <Header />

      <main className="pt-8">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 my-8 md:my-12">
            <div className="flex items-center gap-4">
              <Rss className="w-10 h-10 text-primary-accent" />
              <h1 className="text-h2">News & Articles</h1>
            </div>
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="bg-slate-800/80 border border-glass-stroke rounded-lg py-2.5 pl-4 pr-12 w-full md:w-72 text-soft-text placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-accent"
              />
              {searchQuery ? (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              ) : (
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              )}
            </div>
          </div>

          {/* Category Nav */}
          <div className="relative mb-12">
            <div className="w-full overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-primary-accent/50 scrollbar-track-transparent pb-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => scrollToCategory(cat)}
                  className={`relative inline-block text-sm transition-colors duration-200 px-4 py-2 rounded-full ${
                    activeCategory === cat ? "text-white" : "text-soft-text/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-accent"
                      layoutId="underline"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Search Results */}
          {searchQuery && (
            <div className="mb-12">
              <h2 className="text-h3 mb-8">
                Search Results for "{searchQuery}" ({searchResults.length} found)
              </h2>
              {isSearching ? (
                <div className="text-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary-accent" />
                  <p className="text-soft-text">Searching...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {searchResults.map((article, i) => (
                    <ArticleCard key={i} article={article} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-soft-text text-lg">No articles found matching your search.</p>
                  <button onClick={clearSearch} className="mt-4 text-primary-accent hover:underline">
                    Clear search to see all articles
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Featured Articles - only show when not searching */}
          {!searchQuery && featuredArticles.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {featuredArticles.map((article, i) => (
                  <ArticleCard key={i} article={article} />
                ))}
              </div>
            </>
          )}

          {/* Category Sections - only show when not searching */}
          {!searchQuery &&
            categories.map((category) => (
              <div
                key={category}
                id={category.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}
                className="mb-24 scroll-mt-32"
              >
                <h2 className="text-h3 mb-8">{category}</h2>
                
                {isLoading && !articles[category] ? (
                  <div className="text-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary-accent" />
                    <p className="text-soft-text">Loading articles...</p>
                  </div>
                ) : articles[category] && articles[category].length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {articles[category].map((article, i) => (
                      <ArticleCard key={i} article={article} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-soft-text text-lg">No articles found in this category.</p>
                  </div>
                )}
                
                {articles[category] && articles[category].length > 0 && (
                  <div className="text-center mt-12">
                    <button className="text-primary-accent font-semibold hover:underline">View More</button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </main>

      <Footer />

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            onClick={scrollTop}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-primary-accent/80 backdrop-blur-sm flex items-center justify-center text-white shadow-lg hover:bg-primary-accent transition-colors"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
