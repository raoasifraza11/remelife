"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Search, HelpCircle, Menu, X } from "lucide-react"
import { AppsMenu } from "./apps-menu"
import { SearchOverlay } from "./search-overlay"

const MotionImage = motion.create(Image)

interface DropdownItem {
  name: string
  href: string
  external: boolean
}

interface NavItemWithDropdown {
  name: string
  href: string
  dropdown: DropdownItem[]
}

interface NavItemWithoutDropdown {
  name: string
  href: string
}

type NavItem = NavItemWithDropdown | NavItemWithoutDropdown

const navItems: NavItem[] = [
  {
    name: "Info",
    href: "#",
    dropdown: [
      { name: "Overview", href: "/info/overview", external: false },
      { name: "RemindMecare", href: "/info/remindmecare", external: false },
      { name: "Support", href: "/info/support", external: false },
    ],
  },
  { name: "News", href: "/news" },
  { name: "Forum", href: "/forum" },
  { name: "Market", href: "/market" },
  { name: "Rewards", href: "/rewards" },
  {
    name: "Business",
    href: "#",
    dropdown: [
      { name: "Apps for Care Providers", href: "https://remindmecare.com", external: true },
      {
        name: "Advertiser Media Pack",
        href: "https://remelife.com/wp-content/uploads/2023/06/ReMeLife-Advertisers-Media-Pack-03.pdf",
        external: true,
      },
      { name: "Tokenomics", href: "https://remelife.io", external: true },
    ],
  },
]

// Type guard to check if nav item has dropdown
const hasDropdown = (item: NavItem): item is NavItemWithDropdown => {
  return 'dropdown' in item
}

const dropdownVariants: any = {
  hidden: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    pointerEvents: "none" as const,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    pointerEvents: "auto" as const,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
}

const Header = React.memo(() => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)

  // Memoize handlers to prevent unnecessary re-renders
  const handleMenuToggle = React.useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  const handleDropdownToggle = React.useCallback((itemName: string) => {
    setOpenDropdown(prev => prev === itemName ? null : itemName)
  }, [])

  const handleSearchToggle = React.useCallback(() => {
    setIsSearchOpen(prev => !prev)
  }, [])

  const handleKeyDown = React.useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsMenuOpen(false)
      setOpenDropdown(null)
      setIsSearchOpen(false)
    }
  }, [])

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  // Memoize the header styles to prevent recalculation
  const headerStyles = React.useMemo(() => ({
    background: "rgba(0, 0, 0, 0.95)",
    backdropFilter: "blur(24px) saturate(120%)",
    WebkitBackdropFilter: "blur(24px) saturate(120%)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow:
      "0 8px 32px rgba(168, 85, 247, 0.15), 0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
  }), [])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-[100] w-full"
        style={headerStyles}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3 group cursor-pointer">
              <Link href="/" className="flex items-center gap-3">
                <MotionImage
                  whileHover={{ scale: 1.1, rotate: -10 }}
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/remelife-logo-txeTDiKJ76SNNyRi1stAlCwPxWrMSA.png"
                  alt="REMELIFE Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
                <h1 className="text-lg font-bold tracking-tight">
                  <span
                    className="rainbow-text animate-vibrant-glow"
                    style={{ "--glow-color": "hsl(262 89% 70%)" } as React.CSSProperties}
                  >
                    ReMe
                  </span>
                  <span className="text-green-300">Life</span>
                </h1>
              </Link>
            </div>

            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm absolute left-1/2 transform -translate-x-1/2">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  {hasDropdown(item) ? (
                    <div className="relative">
                      <button
                        onClick={() => handleDropdownToggle(item.name)}
                        className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                      >
                        <span>{item.name}</span>
                        <motion.div
                          animate={{
                            rotate: openDropdown === item.name ? 180 : 0,
                            color: openDropdown === item.name ? "#A855F7" : "currentColor",
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={16} />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {openDropdown === item.name && (
                          <motion.div
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="absolute top-full left-0 mt-2 w-64 bg-black/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl overflow-hidden z-50"
                          >
                            {item.dropdown.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                target={dropdownItem.external ? "_blank" : undefined}
                                rel={dropdownItem.external ? "noopener noreferrer" : undefined}
                                className="block px-4 py-3 text-sm hover:bg-white/10 transition-colors duration-200 border-b border-white/5 last:border-b-0"
                              >
                                {dropdownItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href!}
                      className="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSearchToggle}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
              >
                <Search size={20} />
              </button>

              <Link
                href="/info/support"
                className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
              >
                <HelpCircle size={20} />
              </Link>

              <button
                onClick={handleMenuToggle}
                className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {hasDropdown(item) ? (
                      <div>
                        <button
                          onClick={() => handleDropdownToggle(item.name)}
                          className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                        >
                          <span>{item.name}</span>
                          <motion.div
                            animate={{
                              rotate: openDropdown === item.name ? 180 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown size={16} />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {openDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="ml-4 mt-2 space-y-2"
                            >
                              {item.dropdown.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.name}
                                  href={dropdownItem.href}
                                  target={dropdownItem.external ? "_blank" : undefined}
                                  rel={dropdownItem.external ? "noopener noreferrer" : undefined}
                                  className="block px-3 py-2 text-sm rounded-lg hover:bg-white/10 transition-colors duration-200"
                                >
                                  {dropdownItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href!}
                        className="block px-3 py-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />}
      </AnimatePresence>

      {/* Apps Menu */}
      <AppsMenu isOpen={false} onClose={() => {}} />
    </>
  )
})

Header.displayName = 'Header'

export { Header }
