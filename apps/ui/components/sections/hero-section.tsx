"use client"

import React from "react"
import { motion } from "framer-motion"
import { Play, Layers, FlaskConical, Wallet, Brain } from "lucide-react"
import { ParticleField } from "@/components/particle-field"

interface HeroSectionProps {}

export function HeroSection({}: HeroSectionProps) {
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false)
  const videoRef = React.useRef<HTMLVideoElement>(null)

  const handlePlayButtonClick = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsVideoPlaying(true)
    }
  }

  const handleVideoPlay = () => {
    setIsVideoPlaying(true)
  }

  const handleVideoPause = () => {
    setIsVideoPlaying(false)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with particles */}
      <div className="absolute inset-0 -z-10">
        <ParticleField />
        <motion.div
          className="absolute -top-1/4 -left-1/4 w-full h-full"
          style={{
            background: "radial-gradient(circle, rgba(199, 21, 133, 0.6) 0%, transparent 50%)",
          }}
          animate={{
            x: [-100, 100, -100],
            y: [-100, 100, -100],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 w-full h-full"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 50%)",
          }}
          animate={{
            x: [100, -100, 100],
            y: [100, -100, 100],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-8 text-center">
        {/* Hero Content */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-h1 mb-6 sm:mb-8 md:mb-10 leading-tight"
        >
          Welcome to{" "}
          <span
            className="rainbow-text animate-vibrant-glow"
            style={
              {
                "--glow-color": "hsl(280 89% 70%)",
                background:
                  "linear-gradient(135deg, #8b5cf6 0%, #a855f7 25%, #c084fc 50%, #d8b4fe 75%, #e9d5ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              } as React.CSSProperties
            }
          >
            ReMeLife
          </span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="text-h2 mb-8 sm:mb-12 md:mb-16 text-soft-text"
        >
          A New Way to Care
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <div
            className="inline-block glass-pane rounded-full px-6 py-3 sm:px-8 sm:py-4 lg:px-8 lg:py-4 max-w-[90vw]"
            style={{ boxShadow: "0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.4)" }}
          >
            <p className="text-lg sm:text-xl lg:text-lg text-body tracking-wide welcome-aura">
              The everything platform, where digital value meets human care
            </p>
          </div>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-14 px-2"
        >
          <div className="glass-pane rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 lg:px-4 lg:py-2.5 xl:px-5 xl:py-3 flex items-center gap-2 text-sm sm:text-base lg:text-base shadow-soft-layer text-soft-text/80 hover:text-white transition-colors">
            <Layers className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 text-primary-accent flex-shrink-0" />
            <span className="font-medium whitespace-nowrap">Powered by Web3</span>
          </div>
          <div className="glass-pane rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 lg:px-4 lg:py-2.5 xl:px-5 xl:py-3 flex items-center gap-2 text-sm sm:text-base lg:text-base shadow-soft-layer text-soft-text/80 hover:text-white transition-colors">
            <FlaskConical className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 text-green-400 flex-shrink-0" />
            <span className="font-medium whitespace-nowrap">Beta testing</span>
          </div>
          <div className="glass-pane rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 lg:px-4 lg:py-2.5 xl:px-5 xl:py-3 flex items-center gap-2 text-sm sm:text-base lg:text-base shadow-soft-layer text-soft-text/80 hover:text-white transition-colors">
            <Wallet className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 text-yellow-400 flex-shrink-0" />
            <span className="font-medium whitespace-nowrap">Care2Earn Wallet</span>
          </div>
          <div className="glass-pane rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 lg:px-4 lg:py-2.5 xl:px-5 xl:py-3 flex items-center gap-2 text-sm sm:text-base lg:text-base shadow-soft-layer text-soft-text/80 hover:text-white transition-colors">
            <Brain className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 text-blue-400 flex-shrink-0" />
            <span className="font-medium whitespace-nowrap">AI suite</span>
          </div>
        </motion.div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.6 }}
          className="mt-16 sm:mt-20 md:mt-24 relative max-w-4xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <video
              ref={videoRef}
              className="w-full h-auto"
              poster="/video-thumbnail.webp"
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
              controls={isVideoPlaying}
            >
              <source src="/new-orb.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {!isVideoPlaying && (
              <button
                onClick={handlePlayButtonClick}
                className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group"
                aria-label="Play video"
              >
                <div className="bg-white/90 hover:bg-white rounded-full p-6 group-hover:scale-110 transition-transform">
                  <Play className="w-12 h-12 text-gray-900 ml-1" fill="currentColor" />
                </div>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
