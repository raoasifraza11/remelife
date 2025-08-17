"use client"

import React, { Suspense, lazy, useMemo, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useScroll } from "framer-motion"
import { Play, Layers, FlaskConical, Wallet, Brain, Monitor, MessageSquare, ShoppingBag, Newspaper } from "lucide-react"
import { LogoCarousel } from "@/components/logo-carousel"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ParticleField } from "@/components/particle-field"
import { SectionSkeleton } from "@/components/section-skeleton"

// Lazy load sections for code splitting
const HeroSection = lazy(() => import("@/components/sections/hero-section").then(module => ({ default: module.HeroSection })))
const DigitalCareToolkitSection = lazy(() => import("@/components/sections/digital-care-toolkit-section").then(module => ({ default: module.DigitalCareToolkitSection })))
const TestimonialsSection = lazy(() => import("@/components/sections/testimonials-section").then(module => ({ default: module.TestimonialsSection })))

const MotionImage = motion.create(Image)

const HomePage = React.memo(() => {
  const ref = React.useRef(null)
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false)

  // Memoize handlers to prevent unnecessary re-renders
  const handleVideoPlay = useCallback(() => {
    setIsVideoPlaying(true)
  }, [])

  const handleVideoPause = useCallback(() => {
    setIsVideoPlaying(false)
  }, [])

  // Memoize the partner logos data
  const partnerLogos = useMemo(() => [
    { src: "/logos/age-uk-logo.webp", alt: "Age UK" },
    { src: "/logos/amazon-logo.webp", alt: "Amazon" },
    { src: "/logos/antier-logo.webp", alt: "Antier" },
    { src: "/logos/cisco-logo.webp", alt: "Cisco" },
    { src: "/logos/convex-logo.webp", alt: "Convex" },
    { src: "/logos/daa-logo.webp", alt: "Dementia Action Alliance" },
    { src: "/logos/g-cloud-logo.webp", alt: "G-Cloud" },
    { src: "/logos/idealondon-logo.webp", alt: "IDEALondon" },
    { src: "/logos/kings-college-logo.webp", alt: "King's College London" },
    { src: "/logos/limechain-logo.webp", alt: "LimeChain" },
    { src: "/logos/pingbit-logo.webp", alt: "PingBit" },
  ], [])

  // Memoize the app features data
  const appFeatures = useMemo(() => [
    {
      icon: Monitor,
      title: "RemindMeCare",
      description: "Person-centred care activities and companionship app",
      iconUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/remindmecare%202-mTaSs6H1gRS1Zql8GJaHUk02Pmn3dv.png",
      href: "/info/remindmecare",
    },
    {
      icon: MessageSquare,
      title: "Forums",
      description: "Community discussions and support",
      iconUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Forum%202-nsMJWgTBQV1atzYwRSTPukx9IKSZS.png",
      href: "/forum",
    },
    {
      icon: ShoppingBag,
      title: "Market",
      description: "Online marketplace for care community",
      iconUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/market%201-AM5uWu7nkKXwimit5ozxhvJ3y6H0lW.png",
      href: "/market",
    },
    {
      icon: Newspaper,
      title: "News",
      description: "Latest articles and updates",
      iconUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/News-VCK8Gdae72hSolefOlYtZWsUzUOwuE.png",
      href: "/news",
    },
  ], [])

  // Memoize testimonials data
  const testimonials = useMemo(() => [
    {
      quote: "The RemindMeCare dementia app has made such a difference to the people living here in such a short space of time... particularly helping us engage with people living with dementia.",
      author: "CQC Inspector Report",
      title: "Oaklands Care Home",
    },
    {
      quote: "People ask, 'How should I talk to someone with dementia'? RemindMeCare's elderly care and dementia app can be used to break the ice.",
      author: "Alison Wingfield",
      title: "Manager Sam & Annie Cohen Centre",
    },
    {
      quote: "In future care homes, laughter, engagement and self-esteem should be apparent. RemindMeCare's app offers that potential.",
      author: "Amina Memon",
      title: "Prof of Psychology, UCL",
    },
  ], [])

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      
      {/* Hero Section - Critical, load immediately */}
      <Suspense fallback={<SectionSkeleton />}>
        <HeroSection />
      </Suspense>

      {/* Digital Care Toolkit Section - Below fold, lazy load */}
      <Suspense fallback={<SectionSkeleton />}>
        <DigitalCareToolkitSection />
      </Suspense>

      {/* Testimonials Section - Below fold, lazy load */}
      <Suspense fallback={<SectionSkeleton />}>
        <TestimonialsSection testimonials={testimonials} />
      </Suspense>

      {/* Partner Logos Section - Static, keep inline */}
      <section className="py-16 md:py-24">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
          <div className="scroll-reveal">
            <h4 className="text-soft-text text-base mb-8 text-center">
              Compliance and those we&apos;ve worked with
            </h4>
            <LogoCarousel logos={partnerLogos} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
})

HomePage.displayName = 'HomePage'

export default HomePage
