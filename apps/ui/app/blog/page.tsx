"use client"

import React from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PenTool, Mail, Award, Users } from "lucide-react"

export default function BlogPage() {
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

      <main className="pt-8">
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="glass-pane rounded-3xl p-8 md:p-12 shadow-soft-layer"
            >
              {/* Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary-accent rounded-full flex items-center justify-center shadow-lg">
                    <PenTool className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-h2 font-bold">POST YOUR BLOG ON REMELIFE</h1>
                </div>
              </div>

              {/* Main Content */}
              <div className="space-y-8">
                {/* Introduction */}
                <div className="scroll-reveal">
                  <div className="flex items-start gap-4 p-6 bg-black/10 rounded-2xl border border-glass-stroke">
                    <Users className="w-6 h-6 text-primary-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-body leading-relaxed mb-4">
                        We're always looking for content that's informative and engaging. Do you have views, news or
                        knowledge? We're especially interested in personal experiences, stories and memories. ReMeLife
                        is the ideal platform, if you're a health/care expert, blogger or journalist – or one of our
                        Members simply wishing to reach our vibrant community.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submission Guidelines */}
                <div className="scroll-reveal">
                  <div className="flex items-start gap-4 p-6 bg-black/10 rounded-2xl border border-glass-stroke">
                    <Mail className="w-6 h-6 text-secondary-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-body leading-relaxed">
                        Simply email us 500+ words, a title, a little about yourself and any photos/videos you wish
                        included. We'll advise when your blog is to be posted. All posts will be entered into our yearly
                        competition and be rewarded with REME tokens.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Competition Info */}
                <div className="scroll-reveal">
                  <div className="flex items-start gap-4 p-6 bg-black/10 rounded-2xl border border-glass-stroke">
                    <Award className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-body leading-relaxed mb-4">
                        <strong className="text-heading-text">Note:</strong> We cannot respond to all requests so
                        forgive us, but we'll only be able to reply to you if your blog is to be run.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="scroll-reveal text-center">
                  <div className="bg-primary-accent/10 rounded-2xl p-8 border border-primary-accent/20">
                    <h3 className="text-2xl font-bold text-heading-text mb-4">Ready to Share Your Story?</h3>
                    <p className="text-body mb-6">Email your post to:</p>
                    <a
                      href="mailto:simon@remelife.com"
                      className="inline-flex items-center gap-3 bg-primary-accent hover:bg-primary-accent/80 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <Mail className="w-5 h-5" />
                      simon@remelife.com
                    </a>
                  </div>
                </div>

                {/* Additional Guidelines */}
                <div className="scroll-reveal">
                  <div className="bg-black/5 rounded-2xl p-6 border border-glass-stroke/50">
                    <h4 className="text-lg font-semibold text-heading-text mb-4">Submission Guidelines:</h4>
                    <ul className="space-y-3 text-body">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary-accent rounded-full mt-2 flex-shrink-0"></div>
                        <span>Minimum 500 words</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary-accent rounded-full mt-2 flex-shrink-0"></div>
                        <span>Include a compelling title</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary-accent rounded-full mt-2 flex-shrink-0"></div>
                        <span>Brief author bio</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary-accent rounded-full mt-2 flex-shrink-0"></div>
                        <span>Optional photos/videos</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary-accent rounded-full mt-2 flex-shrink-0"></div>
                        <span>All submissions enter yearly competition</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary-accent rounded-full mt-2 flex-shrink-0"></div>
                        <span>Earn REME tokens for published posts</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
