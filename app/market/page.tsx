"use client"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Search, ShoppingCart } from "lucide-react"
import Image from "next/image"

const categories = [
  "Books",
  "Confectionery",
  "Daily Living Aids",
  "Employment",
  "Entertainment & Events",
  "Fashion & Beauty",
  "Financial Products",
  "Flowers",
  "Food & Drink",
  "Games",
  "General Products",
  "Health & Fitness",
  "Home & Gardens",
  "Pets & Animals",
  "ReMeLife",
  "Tech & Gadgets",
  "Travel",
]

const sidebarAds = [
  { src: "/placeholder.svg?height=200&width=150", alt: "MindForYou Holidays" },
  { src: "/placeholder.svg?height=200&width=150", alt: "Pingbit Smart Watch" },
  { src: "/placeholder.svg?height=200&width=150", alt: "Dementia Pathfinders" },
  { src: "/placeholder.svg?height=200&width=150", alt: "Gymguyz Personal Training" },
  { src: "/placeholder.svg?height=200&width=150", alt: "Retro Drinks" },
]

const featuredProducts: Array<{
  image: string;
  title: string;
  price: string;
  seller: string;
  buttonType: "read-more" | "buy-product" | "add-to-cart";
}> = [
  {
    image: "/placeholder.svg?height=250&width=250",
    title: "BetterYou D3000+K2 Vitamin D+K2 Daily Oral Spray",
    price: "£9.95",
    seller: "Revital",
    buttonType: "read-more",
  },
  {
    image: "/placeholder.svg?height=250&width=250",
    title: "Acer Discount",
    price: "UP TO £200 OFF",
    seller: "Acer",
    buttonType: "buy-product",
  },
  {
    image: "/placeholder.svg?height=250&width=250",
    title: "Btmorrell SmartBuds Auto Pairing Wireless Bluetooth in Ear Headphones",
    price: "£19.99",
    seller: "Btmorrell",
    buttonType: "read-more",
  },
]

const recentProducts: Array<{
  image: string;
  title: string;
  price: string;
  seller: string;
  buttonType: "read-more" | "buy-product" | "add-to-cart";
}> = [
  {
    image: "/placeholder.svg?height=250&width=250",
    title: "Affiliate product title",
    price: "Prices are inclusive of VAT",
    seller: "Affiliate member store",
    buttonType: "buy-product",
  },
  {
    image: "/placeholder.svg?height=250&width=250",
    title: "100% Pure Canned Pumpkin",
    price: "£4.69",
    seller: "British Corner Shop",
    buttonType: "add-to-cart",
  },
  {
    image: "/placeholder.svg?height=250&width=250",
    title: "12 PERSONAL TRAINING SESSION PACKAGE (COUPLE)",
    price: "£900.00",
    seller: "GYMGUYZ Kingston",
    buttonType: "add-to-cart",
  },
  {
    image: "/placeholder.svg?height=250&width=250",
    title: "12 PERSONAL TRAINING SESSION PACKAGES (INDIVIDUAL)",
    price: "£660.00",
    seller: "GYMGUYZ Kingston",
    buttonType: "add-to-cart",
  },
  {
    image: "/placeholder.svg?height=250&width=250",
    title: "12 PERSONAL TRAINING SESSION PACKAGES (FAMILIES MAXIMUM 4 PEOPLE)",
    price: "£990.00",
    seller: "GYMGUYZ Kingston",
    buttonType: "add-to-cart",
  },
  {
    image: "/placeholder.svg?height=250&width=250",
    title: "12 Red Rose Hand-tied",
    price: "£48.00",
    seller: "Interflora",
    buttonType: "read-more",
  },
  {
    image: "/placeholder.svg?height=250&width=250",
    title: "20ct Rose Gold Plated Lifestone Opal Ring Size Variation (4 sizes, 5pcs per size)",
    price: "Prices are inclusive of VAT",
    seller: "UK.SELLER.GCJ0052",
    buttonType: "add-to-cart",
  },
  {
    image: "/placeholder.svg?height=250&width=250",
    title: "24 PERSONAL TRAINING SESSION PACKAGE (COUPLE)",
    price: "Prices are inclusive of VAT",
    seller: "GYMGUYZ Kingston",
    buttonType: "add-to-cart",
  },
  {
    image: "/placeholder.svg?height=250&width=250",
    title: "30 Belgian Chocolates Selection",
    price: "£27.95",
    seller: "Amelie chocolates",
    buttonType: "read-more",
  },
]

export default function MarketPage() {
  return (
    <div className="min-h-screen bg-background-end">
      <Header />
      <main>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 py-8">
          {/* Market Header */}
          <div className="text-center py-8 md:py-12">
            <div className="inline-flex items-center gap-4 mb-4">
              <ShoppingCart className="w-10 h-10 text-primary-accent" />
              <h1 className="text-h2 font-bold">
                REME
                <span
                  className="text-primary-accent"
                  style={{ textShadow: "0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.4)" }}
                >
                  Market
                </span>
              </h1>
            </div>
            <p className="text-body text-soft-text/80">Supporting care, through your online purchasing</p>
          </div>

          {/* Search and Actions */}
          <div className="bg-black/80 border border-gray-800 rounded-xl p-4 mb-8 flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-grow w-full">
              <input
                type="text"
                placeholder="Search for product, service or store"
                className="w-full bg-[#161326] border border-glass-stroke rounded-lg py-3 pl-5 pr-12 text-soft-text placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-accent"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-primary-accent rounded-md hover:bg-primary-accent/80 transition-colors">
                <Search className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button className="btn-secondary px-6 py-2.5 text-sm">Back</button>
              <button className="btn-secondary px-6 py-2.5 text-sm">Register</button>
              <button className="btn-primary px-6 py-2.5 text-sm">Login</button>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-3 space-y-8">
              <div className="bg-black/80 border border-gray-800 rounded-xl p-1">
                <div className="bg-black/90 rounded-lg p-4">
                  <h2 className="text-2xl font-bold text-heading-text mb-4">Categories</h2>
                  <ul className="space-y-1">
                    {categories.map((cat) => (
                      <li key={cat}>
                        <a
                          href="#"
                          className="block text-soft-text/90 hover:text-white hover:bg-white/5 p-2 rounded-md transition-colors duration-200 text-sm"
                        >
                          {cat}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-4 hidden lg:block">
                {sidebarAds.map((ad, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Image
                      src={ad.src || "/placeholder.svg"}
                      alt={ad.alt}
                      width={300}
                      height={400}
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </motion.div>
                ))}
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-9 space-y-12">
              {/* Mission Statement */}
              <div className="bg-black/80 border border-gray-800 rounded-xl p-6 text-center md:text-left">
                <p className="text-body leading-relaxed">
                  <strong className="text-primary-accent">ReMeLife has a mission:</strong> REME Market is unique. For a
                  slice of every sale goes to the Member that introduced the vendor, providing them with a passive
                  income. Whether cared for, carers, or family, they receive a commission for your purchase. For sharing
                  is caring. Click{" "}
                  <a href="#" className="font-bold text-secondary-accent hover:underline">
                    register
                  </a>{" "}
                  to learn more.
                </p>
              </div>

              {/* Featured Products */}
              <section>
                <div className="flex justify-between items-baseline mb-6">
                  <h2 className="text-h3">Featured Products & Services</h2>
                  <p className="text-sm text-soft-text/70 whitespace-nowrap">
                    All categories (10,643,630 results with Ads)
                  </p>
                </div>
                <div className="bg-black/70 border border-gray-800 rounded-xl p-4 md:p-8">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredProducts.map((product, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      >
                        <ProductCard {...product} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Recent Products */}
              <section>
                <h2 className="text-h3 mb-6">Recent Products</h2>
                <div className="bg-black/70 border border-gray-800 rounded-xl p-4 md:p-8">
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {recentProducts.map((product, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                      >
                        <ProductCard {...product} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
