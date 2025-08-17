"use client"

import React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MessageCircle, Calendar } from "lucide-react"
import Image from "next/image"

const forumTopics = [
  {
    title: "My personal opinion on game of thrones series",
    author: "Goldbear",
    category: "My personal opinion on game of thrones series",
    voices: 1,
    posts: 7,
    lastPost: "2 days, 8 hours ago",
    lastPoster: "ZW",
  },
  {
    title: "Musiala's Injury — Can Bayern Cope Without Him This Season?",
    author: "Patrick",
    category: "Sports and recreation",
    voices: 0,
    posts: 1,
    lastPost: "1 week, 2 days ago",
    lastPoster: "Patrick",
  },
  {
    title: "Why Are Government Tech Systems Always So Outdated?",
    author: "Cole",
    category: "Care homes",
    voices: 0,
    posts: 1,
    lastPost: "1 week, 2 days ago",
    lastPoster: "Cole",
  },
  {
    title: "I've Been Feeling Lightheaded Lately — Has Anyone Dealt With This?",
    author: "Giovanni",
    category: "Care services",
    voices: 0,
    posts: 1,
    lastPost: "1 week, 3 days ago",
    lastPoster: "Giovanni",
  },
  {
    title: "How Did You First Notice a Loved One's Dementia — and What Helped You Cope?",
    author: "Sarah",
    category: "Dementia",
    voices: 0,
    posts: 1,
    lastPost: "1 week, 3 days ago",
    lastPoster: "Sarah",
  },
  {
    title: "Should Governments Have the Right to Kill Access to Certain Technologies?",
    author: "Mark",
    category: "Politics",
    voices: 0,
    posts: 1,
    lastPost: "1 week, 3 days ago",
    lastPoster: "Mark",
  },
  {
    title: "What Health Issues Have You or a Loved One Faced — and What Helped?",
    author: "Leah",
    category: "Care services",
    voices: 0,
    posts: 1,
    lastPost: "1 week, 4 days ago",
    lastPoster: "Leah",
  },
  {
    title: "Can Blockchain Really Support a Universal Basic Income for Caregivers?",
    author: "Tech4care",
    category: "Tech",
    voices: 0,
    posts: 1,
    lastPost: "1 week, 4 days ago",
    lastPoster: "Tech4care",
  },
  {
    title: "Aliens",
    author: "simonghooper",
    category: "Chat",
    voices: 1,
    posts: 1,
    lastPost: "2 weeks ago",
    lastPoster: "simonghooper",
  },
  {
    title: "Should health tech be subsidized for elderly care?",
    author: "Kira",
    category: "Care services",
    voices: 0,
    posts: 1,
    lastPost: "2 weeks ago",
    lastPoster: "Kira",
  },
  {
    title: "Care home",
    author: "Pel",
    category: "Care services",
    voices: 0,
    posts: 1,
    lastPost: "2 weeks ago",
    lastPoster: "Pel",
  },
  {
    title: "Tech Recommendations for My Elderly Mum's Back Pain Relief?",
    author: "Kate",
    category: "Tech",
    voices: 0,
    posts: 1,
    lastPost: "2 weeks, 2 days ago",
    lastPoster: "Kate",
  },
  {
    title: "Curious about your first-time experience as acaregiver",
    author: "Glen",
    category: "Care in the community",
    voices: 0,
    posts: 1,
    lastPost: "2 weeks, 3 days ago",
    lastPoster: "Glen",
  },
  {
    title: "Health care home",
    author: "Pel",
    category: "Care services",
    voices: 0,
    posts: 1,
    lastPost: "2 weeks, 6 days ago",
    lastPoster: "Pel",
  },
  {
    title: "God or dog",
    author: "Sanchez",
    category: "Chat",
    voices: 0,
    posts: 1,
    lastPost: "4 months, 4 weeks ago",
    lastPoster: "Sanchez",
  },
]

const sidebarAds = [
  {
    title: "REHABILITY",
    date: "May 5, 2020",
    image: "/placeholder.svg?height=100&width=150&text=Rehability",
  },
  {
    title: "Dyslexia Shop",
    date: "January 31, 2020",
    image: "/placeholder.svg?height=100&width=150&text=Dyslexia",
  },
  {
    title: "MindForYou – Supported Holidays for People with Dementia",
    date: "December 5, 2018",
    image: "/placeholder.svg?height=100&width=150&text=MindForYou",
  },
  {
    title: "Dementia pathfinders",
    date: "May 15, 2018",
    image: "/placeholder.svg?height=100&width=150&text=Dementia+Pathfinders",
  },
  {
    title: "The Tiger Health Monitoring Watch",
    date: "May 13, 2019",
    image: "/placeholder.svg?height=100&width=150&text=Tiger+Watch",
  },
]

export default function ForumPage() {
  const [showCreateForm, setShowCreateForm] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    website: "",
    title: "",
    content: "",
    forum: "",
    notifications: false,
  })

  const totalPages = 8
  const topicsPerPage = 10
  const startIndex = (currentPage - 1) * topicsPerPage
  const currentTopics = forumTopics.slice(startIndex, startIndex + topicsPerPage)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission
  }

  const renderPagination = () => (
    <div className="flex justify-center items-center gap-2 my-8">
      {[1, 2, 3, "...", 15, 16, 17, 18].map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && setCurrentPage(page)}
          className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
            page === currentPage
              ? "bg-primary-accent text-white"
              : page === "..."
                ? "text-soft-text cursor-default"
                : "bg-slate-800/50 text-soft-text hover:bg-slate-700/50"
          }`}
          disabled={page === "..."}
        >
          {page}
        </button>
      ))}
    </div>
  )

  if (showCreateForm) {
    return (
      <div className="min-h-screen">
        <div className="fixed inset-0 -z-10 overflow-hidden bg-background-end">
          <div className="absolute inset-0 bg-gradient-to-b from-background-start/50 via-background-start/80 to-background-end" />
        </div>

        <Header />

        <main className="pt-16 pb-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Create a new topic</h1>
              <div className="text-sm text-soft-text/70">
                <span className="text-primary-accent">ReMeLife</span> ›{" "}
                <span className="text-primary-accent">forums</span> › forum new
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="glass-pane rounded-2xl p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <fieldset className="border border-glass-stroke rounded-lg p-6">
                    <legend className="px-2 text-soft-text font-medium">Create New Topic</legend>

                    <fieldset className="border border-glass-stroke rounded-lg p-4 mt-4">
                      <legend className="px-2 text-soft-text text-sm">Your information:</legend>

                      <div className="space-y-4 mt-4">
                        <div>
                          <label className="block text-sm text-soft-text mb-1">Name (required):</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-slate-800/80 border border-glass-stroke rounded px-3 py-2 text-soft-text"
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-soft-text mb-1">
                            Mail (will not be published) (required):
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-slate-800/80 border border-glass-stroke rounded px-3 py-2 text-soft-text"
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-soft-text mb-1">Website:</label>
                          <input
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            className="w-full bg-slate-800/80 border border-glass-stroke rounded px-3 py-2 text-soft-text"
                          />
                        </div>
                      </div>
                    </fieldset>

                    <div className="mt-6">
                      <label className="block text-sm text-soft-text mb-1">Topic Title (Maximum Length: 80):</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        maxLength={80}
                        className="w-full bg-slate-800/80 border border-glass-stroke rounded px-3 py-2 text-soft-text"
                      />
                    </div>

                    <div className="mt-6">
                      <div className="bg-white rounded-t border border-gray-300">
                        <div className="flex items-center gap-2 p-2 border-b border-gray-300 text-sm">
                          <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded">
                            B
                          </button>
                          <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded">
                            I
                          </button>
                          <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded underline">
                            LINK
                          </button>
                          <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded">
                            B-QUOTE
                          </button>
                          <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded">
                            DEL
                          </button>
                          <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded">
                            IMG
                          </button>
                          <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded">
                            UL
                          </button>
                          <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded">
                            OL
                          </button>
                          <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded">
                            LI
                          </button>
                          <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded">
                            CODE
                          </button>
                          <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded">
                            CLOSE TAGS
                          </button>
                        </div>
                        <textarea
                          name="content"
                          value={formData.content}
                          onChange={handleInputChange}
                          rows={12}
                          className="w-full p-4 border-0 resize-none focus:outline-none text-gray-800"
                          placeholder="Enter your message here..."
                        />
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div>
                        <label className="block text-sm text-soft-text mb-1">Forum:</label>
                        <select
                          name="forum"
                          value={formData.forum}
                          onChange={handleInputChange}
                          className="bg-slate-800/80 border border-glass-stroke rounded px-3 py-2 text-soft-text"
                        >
                          <option value="">— No forum —</option>
                          <option value="general">General Discussion</option>
                          <option value="care">Care Services</option>
                          <option value="tech">Technology</option>
                          <option value="health">Health & Wellness</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="notifications"
                          name="notifications"
                          checked={formData.notifications}
                          onChange={handleInputChange}
                          className="w-4 h-4"
                        />
                        <label htmlFor="notifications" className="text-sm text-soft-text">
                          Notify me of follow-up replies via email
                        </label>
                      </div>

                      <div className="bg-gray-100 p-4 rounded border">
                        <div className="flex items-center gap-3">
                          <input type="checkbox" className="w-4 h-4" />
                          <span className="text-gray-700 text-sm">I'm not a robot</span>
                          <div className="ml-auto text-xs text-gray-500">reCAPTCHA</div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button type="submit" className="btn-primary px-6 py-2">
                          Submit
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowCreateForm(false)}
                          className="btn-secondary px-6 py-2"
                        >
                          Back to Forum
                        </button>
                      </div>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 -z-10 overflow-hidden bg-background-end">
        <div className="absolute inset-0 bg-gradient-to-b from-background-start/50 via-background-start/80 to-background-end" />
      </div>

      <Header />

      <main className="pt-16 pb-24">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8">
          {/* Forum Header */}
          <div className="flex items-center gap-4 mb-8">
            <MessageCircle className="w-8 h-8 text-primary-accent" />
            <h1 className="text-4xl font-bold">FORUM</h1>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Forum Content */}
            <div className="lg:col-span-3">
              {/* Hero Section with Images */}
              <div className="glass-pane rounded-2xl p-8 mb-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <Image
                    src="/placeholder.svg?height=120&width=160&text=Indiana+Jones"
                    alt="Indiana Jones"
                    width={160}
                    height={120}
                    className="rounded-lg object-cover"
                  />
                  <Image
                    src="/placeholder.svg?height=120&width=160&text=Vintage+Photo"
                    alt="Vintage Photo"
                    width={160}
                    height={120}
                    className="rounded-lg object-cover"
                  />
                  <Image
                    src="/placeholder.svg?height=120&width=160&text=Beatles"
                    alt="Beatles"
                    width={160}
                    height={120}
                    className="rounded-lg object-cover"
                  />
                  <Image
                    src="/placeholder.svg?height=120&width=160&text=GYMGUYZ"
                    alt="GYMGUYZ"
                    width={160}
                    height={120}
                    className="rounded-lg object-cover"
                  />
                </div>

                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-heading-text mb-4">
                    Here's a thought: my favourite job, memory or car....
                  </h2>
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="btn-primary px-6 py-3 flex items-center gap-2 mx-auto"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Create New Topic
                  </button>
                </div>

                <div className="text-center text-sm text-soft-text/70 mb-4">
                  <span className="text-primary-accent">ReMeLife</span> ›{" "}
                  <span className="text-primary-accent">forums</span> › Topics
                </div>

                {renderPagination()}
              </div>

              {/* Forum Topics Table */}
              <div className="glass-pane rounded-2xl overflow-hidden">
                <div className="bg-primary-accent/80 text-white p-4">
                  <div className="grid grid-cols-12 gap-4 font-semibold">
                    <div className="col-span-6">Topic</div>
                    <div className="col-span-2 text-center">Voices</div>
                    <div className="col-span-2 text-center">Posts</div>
                    <div className="col-span-2 text-center">Last Post</div>
                  </div>
                </div>

                <div className="divide-y divide-glass-stroke">
                  {currentTopics.map((topic, index) => (
                    <div key={index} className="p-4 hover:bg-glass-fill/50 transition-colors">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-6">
                          <h3 className="text-primary-accent font-medium mb-1 hover:underline cursor-pointer">
                            {topic.title}
                          </h3>
                          <div className="text-sm text-soft-text/70">
                            Started by: <span className="text-primary-accent">{topic.author}</span> in:{" "}
                            <span className="text-primary-accent">{topic.category}</span>
                          </div>
                        </div>
                        <div className="col-span-2 text-center text-soft-text">{topic.voices}</div>
                        <div className="col-span-2 text-center text-soft-text">{topic.posts}</div>
                        <div className="col-span-2 text-center">
                          <div className="text-sm text-orange-400">{topic.lastPost}</div>
                          <div className="text-xs text-soft-text/70">
                            by <span className="text-primary-accent">{topic.lastPoster}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {renderPagination()}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Parkinson's UK Ad */}
              <div className="glass-pane rounded-2xl p-4">
                <div className="bg-blue-600 text-white p-4 rounded-lg text-center">
                  <h3 className="font-bold text-lg mb-2">PARKINSON'S UK</h3>
                  <p className="text-sm mb-2">CHANGE ATTITUDES.</p>
                  <p className="text-sm mb-2">FIND A CURE.</p>
                  <p className="text-sm">JOIN US.</p>
                </div>
              </div>

              {/* Favourite Suppliers */}
              <div className="glass-pane rounded-2xl p-4">
                <div className="bg-blue-600 text-white p-3 rounded-t-lg">
                  <h3 className="font-bold">FAVOURITE SUPPLIERS</h3>
                </div>
                <div className="space-y-4 p-4">
                  {sidebarAds.map((ad, index) => (
                    <div key={index} className="flex gap-3">
                      <Image
                        src={ad.image || "/placeholder.svg"}
                        alt={ad.title}
                        width={60}
                        height={60}
                        className="rounded object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="text-xs text-primary-accent mb-1">Forum Adverts</div>
                        <h4 className="text-sm font-semibold text-heading-text mb-1">{ad.title}</h4>
                        <div className="text-xs text-soft-text/70 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {ad.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
