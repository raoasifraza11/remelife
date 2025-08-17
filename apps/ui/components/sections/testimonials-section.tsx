"use client"

import React from "react"
import { motion } from "framer-motion"

interface Testimonial {
  quote: string
  author: string
  title: string
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [activeTestimonial, setActiveTestimonial] = React.useState(0)

  React.useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 7000) // Change testimonial every 7 seconds

    return () => {
      clearInterval(testimonialInterval)
    }
  }, [testimonials.length])

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background-start to-background-end relative overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-h2 text-center mb-16 scroll-reveal"
        >
          What Our{" "}
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
            Community
          </span>{" "}
          Says
        </motion.h2>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={activeTestimonial}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <blockquote className="text-xl md:text-2xl text-body mb-8 leading-relaxed">
              "{testimonials[activeTestimonial]?.quote}"
            </blockquote>
            <div className="text-soft-text">
              <p className="font-semibold text-lg">
                {testimonials[activeTestimonial]?.author}
              </p>
              {testimonials[activeTestimonial]?.title && (
                <p className="text-sm opacity-80">
                  {testimonials[activeTestimonial]?.title}
                </p>
              )}
            </div>
          </motion.div>

          {/* Testimonial indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeTestimonial
                    ? "bg-primary-accent scale-110"
                    : "bg-soft-text/30 hover:bg-soft-text/50"
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
