"use client"

import React from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArticleCard } from "@/components/article-card"
import { Search, ChevronUp, Rss, X } from "lucide-react"
import { AnimatePresence } from "framer-motion"

// Expanded mock data for articles
const articles = {
  featured: [
    {
      title: "When Heroes get sick",
      description: "The entertainment industry has long been a source of inspiration...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Entertainment",
    },
    {
      title: "What you need to know about finding a care home",
      description: "Finding the right care home is a significant decision for families...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Health & Social Care",
    },
    {
      title: "23 year old SpaceX intern deciphers Herculaneum Scrolls",
      description: "Based on reports from TechCrunch, Luke Farritor, a 23-year-old...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Technology",
    },
    {
      title: "Reconfigurable Intelligent Surfaces: Watching You in Ways You Can't Imagine.",
      description: "In an age of ever-advancing technology, our privacy is under...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Technology",
    },
    {
      title: "A New Era for Social Care: The UK Dementia Care",
      description: "The UK government has recently announced a groundbreaking initiative to...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Health & Social Care",
    },
    {
      title: "Navigating the Cryptocurrency Markets: A Comprehensive Guide",
      description: "In the ever-evolving landscape of cryptocurrencies, choosing where and how...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Money & Business",
    },
    {
      title: "How2Invest: Step-by-Step Guide on The Basics of Cryptocurrency",
      description: "In the world of investment, understanding how2invest and the fundamentals...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Money & Business",
    },
    {
      title: "Unmasking the Underworld of Crypto Scams",
      description: "In the ever-evolving world of cryptocurrency, where innovation and opportunity...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Money & Business",
    },
  ],
  "Health & Social Care": [
    {
      title: "What are Red Vegetables? Health Benefits, and 4 Delicious and...",
      description: "You are probably familiar with the mommy expression “eat your...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Health & Social Care",
    },
    {
      title: "Digital Healthcare Activities: An Innovative Concept for Fun and Engaging",
      description: "As technology continues to evolve, digital healthcare activities have emerged...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Health & Social Care",
    },
    {
      title: "What is Autism Spectrum Disorder? A Guide on How",
      description: "As a parent or caregiver, understanding Autism Spectrum Disorder (ASD)...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Health & Social Care",
    },
    {
      title: "What is a Tongue and Lip Tie? Symptoms and",
      description: "Have you been experiencing pain while breastfeeding? Or you probably...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Health & Social Care",
    },
  ],
  "Mind, Body & Spirit": [
    {
      title: "Unlocking the Power of Mind, Body, and Spirit",
      description: "A journey to Wellness Wellness is a holistic concept that...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Mind, Body & Spirit",
    },
    {
      title: "Healing Mind, Body, and Spirit: A Journey to Wholeness",
      description: "Healing is the process of becoming whole again, by addressing...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Mind, Body & Spirit",
    },
    {
      title: "Transform Your Life: Harnessing the Power of Mind, Body &",
      description: "Transformation is the process of change and personal growth. By...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Mind, Body & Spirit",
    },
    {
      title: "What is Stoicism and How Can We Apply it to",
      description: "In the ever-evolving era of constant change, chaos, and uncertainty...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Mind, Body & Spirit",
    },
  ],
  "World News": [
    {
      title: "23 year old SpaceX intern deciphers Herculaneum Scrolls",
      description: "Based on reports from TechCrunch, Luke Farritor, a 23-year-old...",
      image: "/placeholder.svg?height=200&width=300",
      category: "World News",
    },
    {
      title: "Will Flying Cars Really Become a Reality or Not?",
      description: "Are flying cars coming soon? This question has been on...",
      image: "/placeholder.svg?height=200&width=300",
      category: "World News",
    },
    {
      title: "How will AI impact our lives and our care needs",
      description: "Predict the implications of AI systems on society in the...",
      image: "/placeholder.svg?height=200&width=300",
      category: "World News",
    },
    {
      title: "US improves first new Alzheimer's drug in 20 years",
      description: "The first new treatment for Alzheimer's disease for...",
      image: "/placeholder.svg?height=200&width=300",
      category: "World News",
    },
  ],
  Entertainment: [
    {
      title: "Why are musicals taking over London theatreland?",
      description: "Why are musicals taking over London theatreland Musicals have been...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Entertainment",
    },
    {
      title: "The Rise of Social Commentators and Podcasts",
      description: "Joe Rogan Had the Most Popular Podcast on Spotify in...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Entertainment",
    },
    {
      title: "New Year Resolutions in 2023 Based on Star Sign",
      description: "As we head into the New Year, thoughts turn to...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Entertainment",
    },
    {
      title: "Early TV Game Shows",
      description: "If your family were lucky enough to have a television...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Entertainment",
    },
  ],
  "Leisure & Lifestyle": [
    {
      title: "Sanitation Towel: The Complete Guide and DIY Hacks",
      description: "Health, they say, is wealth. And one of the important...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Leisure & Lifestyle",
    },
    {
      title: "Waxing vs Shaving: Which is the Right Method for You?",
      description: "Taking off your body hair is strictly a personal choice...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Leisure & Lifestyle",
    },
    {
      title: "Embracing Fitness and Wellness: A Guide to Achieving Physical Health",
      description: "Embracing fitness and wellness is an important aspect of leading...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Leisure & Lifestyle",
    },
    {
      title: "What has the metaverse got to do with fashion?",
      description: "Introduction NFTs, or non-fungible tokens, have been gaining...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Leisure & Lifestyle",
    },
  ],
  Technology: [
    {
      title: "Reconfigurable Intelligent Surfaces: Watching You in Ways You Can't Imagine.",
      description: "In an age of ever-advancing technology, our privacy is under...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Technology",
    },
    {
      title: "Navigating the Cryptocurrency Markets: A Comprehensive Guide to Top Exchanges",
      description: "In the ever-evolving landscape of cryptocurrencies, choosing where and how...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Technology",
    },
    {
      title: "How2invest: Step-by-Step Guide on The Basics of Cryptocurrency Investment.",
      description: "In the world of investment, understanding how2invest and the fundamentals...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Technology",
    },
    {
      title: "Unmasking the Underworld of Crypto Scams: From BitConnect to HareKing",
      description: "In the ever-evolving world of cryptocurrency, where innovation and opportunity...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Technology",
    },
  ],
  Culture: [
    {
      title: "23 year old SpaceX intern deciphers Herculaneum Scrolls",
      description: "Based on reports from TechCrunch, Luke Farritor, a 23-year old former...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Culture",
    },
    {
      title: "Are these fabulous archaeological sites disappearing?",
      description: "There are many archaeological sites around the world that are...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Culture",
    },
    {
      title: "The importance of art in the time of war",
      description: "Introduction Art has the power to evoke emotion, tell stories,...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Culture",
    },
    {
      title: "5 of our favourite all-time comedy double acts",
      description: "A double act or comedy duo is a form of...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Culture",
    },
  ],
  "Food, Fashion & Beauty": [
    {
      title: "What are Red Vegetables? Health Benefits, and 4 Delicious and...",
      description: "You are probably familiar with the mommy expression “eat your...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Food, Fashion & Beauty",
    },
    {
      title: "10 Delicious and Healthy Meal Prep Ideas for Busy Weekdays",
      description: "Meal prepping can be a lifesaver for busy weekdays. Not...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Food, Fashion & Beauty",
    },
    {
      title: "How to Find Your Passion: A Journey to Discovering Your",
      description: "Finding your passion can be a challenging and exciting journey,...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Food, Fashion & Beauty",
    },
    {
      title: "Food for Fitness: Recipes for a Balanced Diet",
      description: "Eating a balanced diet is essential for maintaining a healthy...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Food, Fashion & Beauty",
    },
  ],
  "Money & Business": [
    {
      title: "How to earn money online using today's tech...",
      description: "My son asked: 'How can I earn £10k per month...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Money & Business",
    },
    {
      title: "The biggest Ponzi ever was ....",
      description: "Scams have been around for ever. And one of the...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Money & Business",
    },
    {
      title: "What to do with my finances in a recession?",
      description: "Introduction A recession is a period of economic downturn characterized...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Money & Business",
    },
    {
      title: "Are NFTs Art or a Scam?",
      description: "Introduction Non-Fungible Tokens (NFTs)...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Money & Business",
    },
  ],
  Travel: [
    {
      title: "The rise of tourism in the Middle East",
      description: "Discuss which countries have become the most popular tourist destinations...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Travel",
    },
    {
      title: "What are the 10 top festival events around the world?",
      description: "What are the biggest and most famous festivals around the...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Travel",
    },
    {
      title: "What are the worlds most dangerous places to travel to?",
      description: "There are many activities that are considered dangerous for tourists...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Travel",
    },
    {
      title: "What are the most popular retirement destinations?",
      description: "Retirement is a time when many people choose to relocate...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Travel",
    },
  ],
}

const categories = [
  "Health & Social Care",
  "Mind, Body & Spirit",
  "World News",
  "Entertainment",
  "Leisure & Lifestyle",
  "Technology",
  "Money & Business",
  "Culture",
  "Food, Fashion & Beauty",
  "Travel",
]

export default function NewsPage() {
  const [showScroll, setShowScroll] = React.useState(false)
  const [activeCategory, setActiveCategory] = React.useState("Health & Social Care")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [searchResults, setSearchResults] = React.useState<any[]>([])

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

  // Search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setSearchResults([])
      return
    }

    const allArticles = [
      ...articles.featured,
      ...Object.values(articles)
        .flat()
        .filter((_, index, arr) => arr.findIndex((article) => article.title === _.title) === index),
    ]

    const filtered = allArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.description.toLowerCase().includes(query.toLowerCase()) ||
        article.category.toLowerCase().includes(query.toLowerCase()),
    )

    setSearchResults(filtered)
  }

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
  }, [])

  React.useEffect(() => {
    window.addEventListener("scroll", checkScrollTop)
    return () => window.removeEventListener("scroll", checkScrollTop)
  }, [showScroll])

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
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
                placeholder="Search Page"
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
              {searchResults.length > 0 ? (
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
          {!searchQuery && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {articles.featured.map((article, i) => (
                  <ArticleCard key={i} article={article} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-2 mb-24">
                {["1", "2", "3", "4", "5"].map((page) => (
                  <button
                    key={page}
                    className={`w-10 h-10 rounded-md text-sm font-medium transition-colors ${
                      page === "1"
                        ? "bg-primary-accent text-white"
                        : "bg-slate-800/80 text-soft-text hover:bg-slate-700/60"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-4 h-10 rounded-md text-sm font-medium bg-slate-800/80 text-soft-text hover:bg-slate-700/60">
                  Next »
                </button>
              </div>
            </>
          )}

          {/* Category Sections - only show when not searching */}
          {!searchQuery &&
            Object.entries(articles)
              .filter(([key]) => key !== "featured")
              .map(([category, items]) => (
                <div
                  key={category}
                  id={category.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}
                  className="mb-24 scroll-mt-32"
                >
                  <h2 className="text-h3 mb-8">{category}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {items.map((article, i) => (
                      <ArticleCard key={i} article={article} />
                    ))}
                  </div>
                  <div className="text-center mt-12">
                    <button className="text-primary-accent font-semibold hover:underline">View More</button>
                  </div>
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
