"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LinkIcon } from "lucide-react"

const MotionImage = motion.create(Image)

export default function RegisterPage() {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    howDidYouHear: "",
    introducerEmail: "",
    permissions: false,
    lumiAi: false,
    referralUrl: "https://example.com",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted:", formData)
  }

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in-view")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll(".scroll-reveal")
    elements.forEach((el) => observer.observe(el))

    return () => elements.forEach((el) => observer.unobserve(el))
  }, [])

  // Auto-play video when component mounts
  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error)
      })
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-background-end">
        <motion.div
          className="absolute -top-1/4 -left-1/4 w-full h-full"
          style={{
            background: "radial-gradient(circle, rgba(199, 21, 133, 0.6) 0%, transparent 50%)",
          }}
          animate={{
            x: [-100, 100, -100],
            y: [-100, 100, -100],
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 w-full h-full"
          style={{
            background: "radial-gradient(circle, rgba(199, 21, 133, 0.5) 0%, transparent 50%)",
          }}
          animate={{
            x: [100, -100, 100],
            y: [100, -100, 100],
            scale: [1.2, 1, 1.2],
            opacity: [0.8, 0.4, 0.8],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 5,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background-start/50 via-background-start/80 to-background-end" />
      </div>

      <Header />

      <main className="pt-16 pb-24">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
          {/* Page Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-h2 mb-4 font-bold">
              Become a{" "}
              <span className="rainbow-text animate-vibrant-glow" style={{ "--glow-color": "hsl(262 89% 70%)" } as React.CSSProperties}>
                ReMe
              </span>
              <span className="text-green-300">Life</span>{" "}
              member
            </h1>
            <p className="text-body text-soft-text/90">It's free and takes 1 minute. Complete both steps together.</p>
            <p className="text-xl font-bold text-heading-text mt-2">OK. Let's fly...</p>
          </motion.div>

          {/* Main Registration Container */}
          <motion.div
            className="glass-pane rounded-3xl p-8 md:p-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            {/* Lumi AI Section */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12 border-b border-glass-stroke pb-12">
              <motion.div
                className="flex-shrink-0 relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-primary-accent/20 to-secondary-accent/20 p-1 shadow-soft-glow">
                  <div className="w-full h-full rounded-full overflow-hidden bg-black/20 backdrop-blur-sm border border-glass-stroke">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                    >
                      <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Lumi%20Orb-sRoAxXyaKT93wBoGOF6XEaT2dZ6k36.mp4" type="video/mp4" />
                      <Image
                        src="/lumi-ai-character.png"
                        alt="Ori AI Character"
                        width={120}
                        height={120}
                        className="w-full h-full object-cover"
                      />
                    </video>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-accent/10 to-secondary-accent/10 animate-pulse"></div>
                </div>
              </motion.div>

              <div className="text-center md:text-left">
                <h2
                  className="text-3xl font-bold bg-clip-text text-transparent mb-2"
                  style={{
                    backgroundImage: "linear-gradient(to right, #f0f0f0, #ffffff, #f0f0f0)",
                    backgroundSize: "200% auto",
                    animation: "shine-subtle 3s linear infinite",
                  }}
                >
                  LUKi AI
                </h2>
                <p className="text-body text-primary-accent font-semibold mb-2">
                  The first AI person-centred care agent on chain
                </p>
                <p className="text-sm text-soft-text/80">
                  LUKi AI is launching soon. Sign up to become an early user and support us bring AI to care.
                </p>
              </div>
            </div>

            {/* Steps Section */}
            <div className="grid lg:grid-cols-2 gap-x-12 gap-y-8 items-start">
              {/* Step 1: Form */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-block bg-primary-accent/20 text-primary-accent font-bold px-4 py-2 rounded-full mb-2">
                    Step 1
                  </div>
                  <h3 className="text-2xl font-bold text-heading-text">Register as a Member</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-soft-text mb-1.5">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        required
                        className="w-full bg-slate-800/80 border border-glass-stroke rounded-lg py-2.5 px-4 text-soft-text placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-soft-text mb-1.5">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        required
                        className="w-full bg-slate-800/80 border border-glass-stroke rounded-lg py-2.5 px-4 text-soft-text placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-accent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-soft-text mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      className="w-full bg-slate-800/80 border border-glass-stroke rounded-lg py-2.5 px-4 text-soft-text placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-soft-text mb-1.5">How did you hear about us</label>
                    <select
                      name="howDidYouHear"
                      className="w-full bg-slate-800/80 border border-glass-stroke rounded-lg py-2.5 px-4 text-soft-text focus:outline-none focus:ring-2 focus:ring-primary-accent"
                    >
                      <option>Select</option>
                      <option>Social Media</option>
                      <option>Friend or Family</option>
                      <option>Advertisement</option>
                      <option>Search Engine</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-soft-text mb-1.5">
                      Email of introducer (optional)
                    </label>
                    <input
                      type="email"
                      name="introducerEmail"
                      placeholder="Email of introducer"
                      className="w-full bg-slate-800/80 border border-glass-stroke rounded-lg py-2.5 px-4 text-soft-text placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-accent"
                    />
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="permissions"
                        name="permissions"
                        required
                        className="mt-1 w-4 h-4 text-primary-accent bg-slate-800/80 border-glass-stroke rounded focus:ring-primary-accent"
                      />
                      <label htmlFor="permissions" className="text-sm text-soft-text">
                        Permissions <span className="text-red-500">*</span>: Keep me updated
                      </label>
                    </div>
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="lumiAi"
                        name="lumiAi"
                        className="mt-1 w-4 h-4 text-primary-accent bg-slate-800/80 border-glass-stroke rounded focus:ring-primary-accent"
                      />
                      <label htmlFor="lumiAi" className="text-sm text-soft-text">
                        LUKi AI user registration: Register as early user
                      </label>
                    </div>
                  </div>

                  <p className="text-xs text-soft-text/70">
                    After clicking Submit, proceed to STEP2 to access your wallet. Allow emails from @remelife.com &
                    @remindmecare.com
                  </p>

                  <div className="bg-slate-800/50 border border-glass-stroke rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-soft-text text-sm">I'm not a robot</span>
                      <div className="ml-auto text-xs text-soft-text/50">reCAPTCHA</div>
                    </div>
                  </div>

                  <button type="submit" className="w-full btn-primary btn-shine py-3.5 text-lg">
                    Submit
                  </button>
                </form>
              </div>

              {/* Step 2: Wallet & Referral */}
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-block bg-secondary-accent/20 text-secondary-accent font-bold px-4 py-2 rounded-full mb-2">
                    Step 2
                  </div>
                  <h3 className="text-2xl font-bold text-heading-text">Get your Wallet & Rewards Management Panel</h3>
                </div>

                <div className="flex justify-center">
                  <Image
                    src="/register-step2-apps-new.webp"
                    alt="ReMeLife Apps - Community Builder, Agency & DEFI, Market, and Ori AI"
                    width={400}
                    height={600}
                    className="w-full max-w-sm object-contain"
                  />
                </div>

                <div className="space-y-8 pt-4">
                  <div>
                    <p className="text-body mb-3 text-center">If you've been given a Referral URL, enter it below</p>
                    <div className="relative">
                      <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        name="referralUrl"
                        value={formData.referralUrl}
                        onChange={handleInputChange}
                        className="w-full text-center bg-slate-800/80 border border-glass-stroke rounded-xl px-12 py-3 text-soft-text focus:outline-none focus:ring-2 focus:ring-primary-accent"
                      />
                    </div>
                    <button className="mt-3 w-full btn-secondary btn-shine py-3 text-base">Proceed</button>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-glass-stroke"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-glass-fill text-soft-text">OR</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-body mb-3 text-center">Don't have a Referral URL?</p>
                    <button className="w-full btn-secondary btn-shine py-3 text-base">Click Here</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
