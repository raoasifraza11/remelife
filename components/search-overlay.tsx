"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

interface SearchResult {
  title: string
  content: string
  url: string
  type: "page" | "section" | "external"
}

// Predefined search data for the website
const searchData: SearchResult[] = [
  // Homepage content
  {
    title: "Home - Welcome",
    content: "Welcome to the community that cares. A new way to care. Get rewarded for your daily care actions.",
    url: "/",
    type: "page",
  },
  {
    title: "Home - Features",
    content: "Remindmecare Activity Library Forums Market Games Apps News Video Room Rewards",
    url: "/",
    type: "page",
  },
  {
    title: "Home - Why ReMeLife",
    content:
      "Address loneliness self-care Share content with care circle Easy video chats social connectivity Create memory library personal profile Access activities entertainment Monitoring scheduling Alexa care skills Get rewards from care actions data Earn from online purchases Share in the value of ReMeLife",
    url: "/",
    type: "page",
  },

  // News page
  {
    title: "News & Articles",
    content: "Latest news articles health social care technology entertainment world news mind body spirit",
    url: "/news",
    type: "page",
  },
  {
    title: "News - Health & Social Care",
    content: "Health social care articles red vegetables digital healthcare autism spectrum disorder tongue lip tie",
    url: "/news",
    type: "section",
  },
  {
    title: "News - Technology",
    content:
      "Technology articles cryptocurrency blockchain AI artificial intelligence reconfigurable intelligent surfaces",
    url: "/news",
    type: "section",
  },
  {
    title: "News - Entertainment",
    content: "Entertainment articles musicals London theatreland social commentators podcasts game shows",
    url: "/news",
    type: "section",
  },

  // Forum page
  {
    title: "Forum",
    content: "Community forum discussions care topics health technology entertainment create new topic",
    url: "/forum",
    type: "page",
  },
  {
    title: "Forum - Topics",
    content:
      "Game of thrones Musiala injury Bayern government tech systems lightheaded dementia loved one blockchain caregivers",
    url: "/forum",
    type: "section",
  },

  // Market page
  {
    title: "ReMe Market",
    content: "Online marketplace products services care community affiliate marketing passive income",
    url: "/market",
    type: "page",
  },
  {
    title: "Market - Categories",
    content:
      "Books confectionery daily living aids employment entertainment events fashion beauty financial products flowers food drink games general products health fitness home gardens pets animals tech gadgets travel",
    url: "/market",
    type: "section",
  },

  // Rewards page
  {
    title: "Rewards",
    content:
      "Get rewarded for daily care actions care 2 earn ReMeLife rewards wallet passive income RUBI universal basic income",
    url: "/rewards",
    type: "page",
  },
  {
    title: "Rewards - How to Earn",
    content: "Forum posts news sharing care actions market clicks referrals community network",
    url: "/rewards",
    type: "section",
  },

  // Info pages
  {
    title: "Overview",
    content:
      "Free apps rewarded care improving your care suite of care apps shared ownership mission manifesto decentralised care community",
    url: "/info/overview",
    type: "page",
  },
  {
    title: "Support & Contact",
    content: "Contact support help care providers partners advertisers team email phone",
    url: "/info/support",
    type: "page",
  },

  // Business pages
  {
    title: "Care Businesses",
    content: "Care providers service providers product sales supporting care sector partnerships",
    url: "/business/care-businesses",
    type: "page",
  },

  // Register page
  {
    title: "Register",
    content: "LUKi AI person-centred care agent referral URL wallet rewards",
    url: "/register",
    type: "page",
  },
  {
    title: "Register - Step 1",
    content: "LUKi AI care agent personal assistant artificial intelligence care support digital companion",
    url: "/register",
    type: "section",
  },
  {
    title: "Register - Step 2",
    content: "Community builder ReMeLife agency DEFI market LUKI AI apps ecosystem digital platform",
    url: "/register",
    type: "section",
  },

  // Blog page
  {
    title: "Blog",
    content:
      "Post your blog ReMeLife content informative engaging personal experiences stories memories health care expert",
    url: "/blog",
    type: "page",
  },

  // External links
  {
    title: "RemindMeCare App",
    content: "RemindMeCare care management app iOS Android",
    url: "https://remindmecare.com",
    type: "external",
  },
  {
    title: "Tokenomics",
    content: "ReMeLife tokenomics blockchain cryptocurrency REME tokens",
    url: "https://remelife.io",
    type: "external",
  },
]

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([])
  const [highlightedIndex, setHighlightedIndex] = React.useState(0)
  const router = useRouter()
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Focus input when overlay opens
  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Handle search
  React.useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([])
      return
    }

    const query = searchQuery.toLowerCase()
    const results = searchData
      .filter((item) => item.title.toLowerCase().includes(query) || item.content.toLowerCase().includes(query))
      .slice(0, 8) // Limit to 8 results

    setSearchResults(results)
    setHighlightedIndex(0)
  }, [searchQuery])

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return

      switch (event.key) {
        case "Escape":
          onClose()
          break
        case "ArrowDown":
          event.preventDefault()
          setHighlightedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : prev))
          break
        case "ArrowUp":
          event.preventDefault()
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev))
          break
        case "Enter":
          event.preventDefault()
          if (searchResults[highlightedIndex]) {
            handleResultClick(searchResults[highlightedIndex])
          }
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, searchResults, highlightedIndex, onClose])

  // Handle result click
  const handleResultClick = (result: SearchResult) => {
    if (result.type === "external") {
      window.open(result.url, "_blank", "noopener,noreferrer")
    } else {
      router.push(result.url)
    }
    onClose()
    setSearchQuery("")
  }

  // Highlight search terms in text
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-300 text-black px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Search Overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl mx-4"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-4 p-4 border-b border-gray-200/50">
                <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search ReMeLife..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none text-lg"
                />
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Search Results */}
              {searchQuery.trim() && (
                <div className="max-h-96 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <div className="p-2">
                      {searchResults.map((result, index) => (
                        <motion.button
                          key={`${result.url}-${index}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                          onClick={() => handleResultClick(result)}
                          className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
                            index === highlightedIndex
                              ? "bg-primary-accent/10 border border-primary-accent/20"
                              : "hover:bg-gray-100/80"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-gray-800 truncate">
                                  {highlightText(result.title, searchQuery)}
                                </h4>
                                {result.type === "external" && (
                                  <ExternalLink className="w-3 h-3 text-gray-400 flex-shrink-0" />
                                )}
                              </div>
                              <p className="text-sm text-gray-600 line-clamp-2">
                                {highlightText(result.content, searchQuery)}
                              </p>
                              <p className="text-xs text-gray-400 mt-1 truncate">{result.url}</p>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-gray-500">No results found for "{searchQuery}"</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Try searching for care, rewards, forum, news, or market
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Search Tips */}
              {!searchQuery.trim() && (
                <div className="p-6 text-center">
                  <p className="text-gray-600 mb-4">Search across ReMeLife</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {["care", "rewards", "forum", "news", "market"].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-4">Use ↑↓ to navigate, Enter to select, Esc to close</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
