"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const MotionImage = motion.create(Image)

interface DigitalCareToolkitSectionProps {}

export function DigitalCareToolkitSection({}: DigitalCareToolkitSectionProps) {
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in-view")
            ;(entry.target as HTMLElement).style.transitionDelay = `${i * 100}ms`
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll(".scroll-reveal")
    elements.forEach((el) => observer.observe(el))

    return () => elements.forEach((el) => observer.unobserve(el))
  }, [])

  const features = [
    {
      name: "RemindMecare",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/remindmecare%202-mTaSs6H1gRS1Zql8GJaHUk02Pmn3dv.png",
    },
    { name: "Activity Library", icon: "/activity-library-icon.webp" },
    {
      name: "Forums",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Forum%202-nsMJW5gTBQV1atzYwRSTPukx9IKSZS.png",
    },
    {
      name: "Market",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/market%201-AM5uWu7nkKXwimit5ozxhvJ3y6H0lW.png",
    },
    { name: "Games & Apps", icon: "/games-apps-icon.webp" },
    {
      name: "News",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/News-VCK8Gdae72hSolefOlYtZWsUzUOwuE.png",
    },
    { name: "Video Room", icon: "/video-room-icon.webp" },
    { name: "Rewards", icon: "/rewards-icon.webp" },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
        <h2 className="text-h2 text-center mb-16 scroll-reveal">
          Explore Your{" "}
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
            Digital Care Toolkit
          </span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12">
          {features.map((feature, index) => (
            <div
              key={feature.name}
              className="scroll-reveal group flex flex-col items-center text-center gap-4"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <MotionImage
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                src={feature.icon || "/placeholder.svg"}
                alt={feature.name}
                width={192}
                height={192}
                className="object-contain transition-all duration-300 cursor-pointer group-hover:drop-shadow-icon-glow w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
                loading="lazy"
              />
              <h3 className="text-lg sm:text-xl font-semibold text-heading group-hover:text-primary-accent transition-colors duration-300">
                {feature.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
