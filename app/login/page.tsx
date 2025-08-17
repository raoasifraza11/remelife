"use client"

import type React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { User, Lock, ArrowRight } from "lucide-react"

export default function LoginPage() {
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

      <main className="flex items-center justify-center min-h-[calc(100vh-160px)] py-16">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md mx-4"
        >
          <div className="glass-pane rounded-3xl p-8 md:p-12 shadow-soft-layer">
            <div className="text-center mb-8">
              <h1 className="text-h2 mb-2">
                Welcome{" "}
                <span
                  className="rainbow-text animate-vibrant-glow"
                  style={{ "--glow-color": "hsl(262 89% 70%)" } as React.CSSProperties}
                >
                  Back
                </span>
              </h1>
              <p className="text-body text-soft-text/80">Log in to access your ReMeLife dashboard.</p>
            </div>

            <form className="space-y-6">
              {/* Email/Username Input */}
              <div className="relative">
                <label htmlFor="email" className="sr-only">
                  Email or Username
                </label>
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email or Username"
                  required
                  className="w-full bg-slate-800/80 border border-glass-stroke rounded-xl py-3 pl-12 pr-4 text-soft-text placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-accent transition-all"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full bg-slate-800/80 border border-glass-stroke rounded-xl py-3 pl-12 pr-4 text-soft-text placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-accent transition-all"
                />
              </div>

              <div className="text-right">
                <a href="#" className="text-sm text-primary-accent hover:underline">
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button type="submit" className="w-full btn-primary btn-shine py-3.5 text-lg font-bold">
                Log In
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-glass-stroke"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-glass-fill text-soft-text/80">OR</span>
              </div>
            </div>

            {/* Register Prompt */}
            <div className="text-center">
              <p className="text-body mb-4">Don't have an account?</p>
              <Link href="/register">
                <button className="w-full btn-secondary btn-shine py-3 text-base flex items-center justify-center gap-2">
                  Register Now <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
