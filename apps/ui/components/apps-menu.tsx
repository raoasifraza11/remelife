"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Monitor,
  Home,
  Upload,
  Calendar,
  BookOpen,
  Puzzle,
  Heart,
  MessageSquare,
  Newspaper,
  ShoppingBag,
  Wallet,
  Download,
  X,
} from "lucide-react"

interface AppsMenuProps {
  isOpen: boolean
  onClose: () => void
}

const appItems = [
  { name: "RemindMeCare", icon: Monitor, href: "https://reme.care/users/login" },
  { name: "Rooms", icon: Home, href: "https://reme.care/users/login" },
  { name: "Uploads", icon: Upload, href: "https://reme.care/users/login" },
  { name: "Calendar", icon: Calendar, href: "https://reme.care/users/login" },
  { name: "My Story", icon: BookOpen, href: "https://reme.care/users/login" },
  { name: "ReMeMades", icon: Puzzle, href: "https://reme.care/users/login" },
  { name: "Health Club", icon: Heart, href: "https://reme.care/users/login" },
  { name: "Forums", icon: MessageSquare, href: "/forum" },
  { name: "News", icon: Newspaper, href: "/news" },
  { name: "Market", icon: ShoppingBag, href: "/market" },
  { name: "Wallet", icon: Wallet, href: "/register" },
  { name: "Download App", icon: Download, href: "#", comingSoon: true },
]

export function AppsMenu({ isOpen, onClose }: AppsMenuProps) {
  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isOpen && !target.closest(".apps-menu-container") && !target.closest(".apps-menu-trigger")) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, onClose])

  // Close menu on escape key
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Apps Menu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="apps-menu-container fixed top-20 right-4 sm:right-8 z-50 w-80 sm:w-96"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200/50 bg-white/50">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-gray-800">Your Apps</h3>
                  <div className="bg-lime-500 text-white text-xs px-2 py-1 rounded-full font-bold">BETA</div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Apps Grid */}
              <div className="p-6">
                <div className="grid grid-cols-3 gap-6">
                  {appItems.map((app, index) => {
                    const IconComponent = app.icon
                    return (
                      <motion.a
                        key={app.name}
                        href={app.href}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="flex flex-col items-center gap-3 p-3 rounded-xl hover:bg-gray-100/80 transition-all duration-200 group relative"
                        onClick={(e) => {
                          if (app.href === "#") {
                            e.preventDefault()
                          } else if (app.href.startsWith("http")) {
                            window.open(app.href, "_blank", "noopener,noreferrer")
                            e.preventDefault()
                          }
                          onClose()
                        }}
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-accent/10 to-secondary-accent/10 flex items-center justify-center group-hover:from-primary-accent/20 group-hover:to-secondary-accent/20 transition-all duration-200 group-hover:scale-110">
                          <IconComponent className="w-6 h-6 text-primary-accent group-hover:text-primary-accent/80" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 text-center leading-tight group-hover:text-gray-900">
                          {app.name}
                        </span>
                        {app.comingSoon && (
                          <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
                            Coming Soon
                          </div>
                        )}
                      </motion.a>
                    )
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 pb-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-3">Access all your ReMeLife apps and features</p>
                  <button
                    onClick={onClose}
                    className="text-sm text-primary-accent hover:text-primary-accent/80 font-medium transition-colors"
                  >
                    Close Menu
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
