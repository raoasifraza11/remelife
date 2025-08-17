"use client"

import React, { Suspense, lazy } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useScroll } from "framer-motion"
import { Play, Layers, FlaskConical, Wallet, Brain } from "lucide-react"
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

export default function HomePage() {
  const ref = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const testimonials = [
    {
      quote:
        "The RemindMeCare dementia app has made such a difference to the people living here in such a short space of time... particularly helping us engage with people living with dementia.",
      author: "CQC Inspector Report",
      title: "Oaklands Care Home",
    },
    {
      quote:
        "People ask, 'How should I talk to someone with dementia'? RemindMeCare's elderly care and dementia app can be used to break the ice.",
      author: "Alison Wingfield",
      title: "Manager Sam & Annie Cohen Centre",
    },
    {
      quote:
        "In future care homes, laughter, engagement and self-esteem should be apparent. RemindMeCare's app offers that potential.",
      author: "Amina Memon",
      title: "Prof of Psychology, UCL",
    },
    {
      quote: "REME enables wards improve person centred care and develop acute care strategies for dementia care.",
      author: "Carol Munt",
      title: "Patient Partner R. Berkshire Hospital NHS Trust",
    },
    {
      quote:
        "We do believe that tech solutions like REME have an important role to play in improving the patient pathway and patient experience for those living with dementia.",
      author: "Olivia Frimpong",
      title: "Service Improvement Lead Dementia and Delirium Kingston Hospital NHS Foundation Trust",
    },
    {
      quote:
        "RemindMeCare's packed with tools that really help both care and management. And it's fun! We see it working with learning disabilities too.",
      author: "Sue Hodder",
      title: "Homelink Day Care Centre",
    },
    {
      quote:
        "As well as celebrating a persons life, RemindMeCare's portability is really useful for everyone, whether elderly or with dementia.",
      author: "Sam Mauger",
      title: "CEO AgeUK London",
    },
    {
      quote: "RemindMeCare's dementia app bought back so many fond memories. It's been inspiring.",
      author: "Deidre O'Day",
      title: "client, Kensington Chelsea & Westminster Memory Service",
    },
    {
      quote: "RemindMeCare's such a cost effective way to get carers using tablets to get to know service users.",
      author: "A. Asimeng-Cann",
      title: "Manager, Median Road Day Centre",
    },
    {
      quote: "I have to say ReMeLife is brilliant - filling the gaps where there's no other software available.",
      author: "Bradford",
      title: "Greenview care home",
    },
    {
      quote: "RemindMeCare connects me with my family more easily, when with them or when they're away.",
      author: "Derek Davis",
      title: "living at home with dementia, Chelsea",
    },
    {
      quote: "We use RemindMeCare with clients that don't have dementia. it's fun for anyone.",
      author: "Amanda Brinn",
      title: "Activity Coordinator, Among Friends in Wallington",
    },
    {
      quote:
        "We use RemindMecare for activities that are really about the person, so we really get to know them. And they get to know us!",
      author: "Lisa-Marie Ortiz",
      title: "Signature Lifestyle care homes",
    },
    {
      quote: "Treating people as individuals must be at the heart of person centred care.",
      author: "Prof Dawn Brooker",
      title: "University of Worcester",
    },
    {
      quote:
        "We can use reminiscence as a way to remind people of past feelings of self-esteem, confidence and competence. By valuing their memories from the past, we show them that they are valued in the present.",
      author: "Pam Schweitzer, MBE",
      title: "",
    },
    {
      quote:
        "Caring is just like life - the more you know me, the more you'll care about me.. For there's more to me than meets the eye.",
      author: "Resident at Orion House",
      title: "",
    },
  ]

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

  const whyReMeLifePoints = [
    "Connect easily with your care circle",
    "Enjoy easy video chats and stay socially close",
    "Build a personal memory library and profile",
    "Access fun activities and bespoke entertainment",
    "Manage care with smart scheduling",
    "Earn rewards for caring and shared data",
    "Get cashback from your online purchases",
    "Share in ReMeLife's growing community value",
    "Discover new ways to turn everyday actions into lasting impact",
    "Take part in shaping the future of community-driven care",
  ]

  const [activeTestimonial, setActiveTestimonial] = React.useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false)
  const videoRef = React.useRef<HTMLVideoElement>(null)

  React.useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 7000) // Change testimonial every 7 seconds

    return () => {
      clearInterval(testimonialInterval)
    }
  }, [testimonials.length])

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

  const partnerLogos = [
    { src: "/logos/daa-logo.png", alt: "Dementia Action Alliance" },
    { src: "/logos/pingbit-logo.webp", alt: "Pingbit" },
    { src: "/logos/antier-logo.webp", alt: "Antier" },
    { src: "/logos/age-uk-logo.webp", alt: "Age UK" },
    { src: "/logos/g-cloud-logo.webp", alt: "G-Cloud Supplier" },
    { src: "/logos/kings-college-logo.png", alt: "King's College London" },
    { src: "/logos/idealondon-logo.png", alt: "IDEALondon" },
    { src: "/logos/convex-logo.png", alt: "Convex" },
    { src: "/logos/limechain-logo.png", alt: "LimeChain" },
    { src: "/logos/cisco-logo.png", alt: "Cisco" },
    { src: "/logos/amazon-logo.png", alt: "Amazon" },
  ]

  return (
    <div ref={ref} className="min-h-screen overflow-x-hidden">
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
        <motion.div
          className="absolute top-1/2 left-1/2 w-3/4 h-3/4 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            background: "radial-gradient(circle, rgba(199, 21, 133, 0.3) 0%, transparent 60%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 10,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background-start/50 via-background-start/80 to-background-end" />
      </div>

      <Header />

      <main className="overflow-x-hidden">
        {/* New Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-start text-center pt-20 md:pt-28 overflow-hidden">
          {/* Particle Field Background */}
          <ParticleField
            className="opacity-60"
            particleCount={60}
            connectionDistance={100}
            enableConnections={true}
            colors={[
              "rgba(168, 85, 247, 0.4)",
              "rgba(99, 102, 241, 0.3)",
              "rgba(236, 72, 153, 0.2)",
              "rgba(34, 197, 94, 0.2)",
            ]}
            speed={0.3}
            enablePulse={true}
          />

          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-6xl xs:text-7xl sm:text-8xl md:text-7xl lg:text-8xl xl:text-9xl font-bold font-satoshi tracking-tighter mb-6 md:mb-4 text-shadow-lg leading-tight"
            >
              A new way to{" "}
              <span
                className="rainbow-text animate-vibrant-glow block sm:inline"
                style={{ "--glow-color": "hsl(262 89% 70%)" } as React.CSSProperties}
              >
                care,
              </span>
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="text-5xl xs:text-6xl sm:text-7xl md:text-6xl lg:text-7xl xl:text-8xl font-light font-satoshi tracking-tighter mb-8 sm:mb-12 md:mb-12 text-shadow-lg leading-tight"
            >
              a new way to{" "}
              <span
                className="rainbow-text-alt animate-vibrant-glow block sm:inline"
                style={{ "--glow-color": "hsl(170 89% 60%)" } as React.CSSProperties}
              >
                share.
              </span>
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

            {/* Slick Info Box */}
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
          </div>
        </section>

        {/* Relocated Icons Section */}
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
              {[
                {
                  name: "RemindMecare",
                  icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/remindmecare%202-mTaSs6H1gRS1Zql8GJaHUk02Pmn3dv.png",
                },
                { name: "Activity Library", icon: "/activity-library-icon.png" },
                {
                  name: "Forums",
                  icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Forum%202-nsMJW5gTBQV1atzYwRSTPukx9IKSZS.png",
                },
                {
                  name: "Market",
                  icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/market%201-AM5uWu7nkKXwimit5ozxhvJ3y6H0lW.png",
                },
                { name: "Games & Apps", icon: "/games-apps-icon.png" },
                {
                  name: "News",
                  icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/News-VCK8Gdae72hSolefOlYtZWsUzUOwuE.png",
                },
                { name: "Video Room", icon: "/video-room-icon.png" },
                { name: "Rewards", icon: "/rewards-icon.png" },
              ].map((feature, index) => (
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
                    className={`object-contain transition-all duration-300 cursor-pointer group-hover:drop-shadow-icon-glow ${
                      feature.name === "RemindMecare"
                        ? "h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 scale-110"
                        : "h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48"
                    }`}
                  />
                  <div className="title-bubble">
                    <h3 className="text-heading-text font-semibold text-sm sm:text-base">{feature.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Side-by-Side Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="scroll-reveal flex flex-col">
                <h2 className="text-h2 mb-8">
                  Get{" "}
                  <span
                    className="rainbow-text animate-vibrant-glow"
                    style={{ "--glow-color": "hsl(262 89% 70%)" } as React.CSSProperties}
                  >
                    rewarded
                  </span>{" "}
                  for your daily care actions.
                </h2>
                <div className="w-full max-w-2xl">
                  <div className="relative rounded-xl overflow-hidden group">
                    <video
                      ref={videoRef}
                      className="w-full h-auto object-contain"
                      controls
                      preload="metadata"
                      poster="/video-thumbnail.png"
                      playsInline
                      onPlay={handleVideoPlay}
                      onPause={handleVideoPause}
                      onEnded={handleVideoPause}
                    >
                      <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Final%20version-D2GPnfYGtvW2FQBSRZlfuz0sY1ttIU.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    {!isVideoPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-all duration-300">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handlePlayButtonClick}
                          className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300"
                        >
                          <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white ml-1" />
                        </motion.button>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
              </div>

              <div className="scroll-reveal flex items-center justify-center">
                <MotionImage
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  src="/digitalcareecosystem.png"
                  alt="Digital Care Ecosystem Features"
                  width={600}
                  height={600}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why ReMeLife Section */}
        <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
          {/* Circular Video Background */}
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <motion.div
              className="glass-pane rounded-full overflow-hidden w-[768px] h-[768px] md:w-[1000px] md:h-[1000px] lg:w-[1100px] lg:h-[1100px]"
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <video
                src="/new-orb.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover scale-[1.4]" // Scale the video to make the orb fit the circle
              />
            </motion.div>
          </div>

          {/* Text Content */}
          <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
            <div className="relative z-10 text-center">
              <div className="mb-12 scroll-reveal">
                <div
                  className="inline-block glass-pane rounded-full px-8 py-4 sm:px-10 sm:py-5"
                  style={{ boxShadow: "0 0 40px rgba(255, 255, 255, 0.8), 0 0 80px rgba(255, 255, 255, 0.4)" }}
                >
                  <h2 className="text-h2 welcome-aura">Why ReMeLife?</h2>
                </div>
              </div>
              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {whyReMeLifePoints.map((point, i) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
                    className="flex items-start gap-3 text-left"
                  >
                    <div className="w-1.5 h-1.5 bg-secondary-accent rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-body leading-relaxed [text-shadow:0_0_12px_rgba(255,255,255,0.8)]">{point}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 lg:py-32">
          <div className="max-w-screen-lg mx-auto px-4 sm:px-8 text-center">
            <h2 className="scroll-reveal text-h2 mb-8">Start Today. Register Here.</h2>
            <div className="scroll-reveal flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/register">
                <button className="btn-primary btn-shine text-base sm:text-lg font-bold py-3 px-6 sm:py-4 sm:px-8">
                  REGISTER NOW
                </button>
              </Link>
              <div className="relative">
                <button className="btn-secondary btn-shine text-base sm:text-lg font-bold py-3 px-6 sm:py-4 sm:px-8">
                  GET IT ON Google Play
                </button>
                <div className="absolute -top-2 -right-2 bg-primary-accent text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg border border-glass-stroke">
                  COMING SOON
                </div>
              </div>
            </div>

            <div className="scroll-reveal glass-pane rounded-2xl p-6 sm:p-8 mb-12 min-h-[320px] flex flex-col justify-center">
              <h3 className="text-lg sm:text-xl font-semibold text-heading-text mb-6 text-center">
                Testimonials from clients and partners
              </h3>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="text-center"
                >
                  <blockquote className="text-body italic text-base sm:text-lg leading-relaxed mb-6">
                    &quot;{testimonials[activeTestimonial].quote}&quot;
                  </blockquote>
                  <div className="text-soft-text">
                    <div className="font-semibold text-heading-text">{testimonials[activeTestimonial].author}</div>
                    {testimonials[activeTestimonial].title && (
                      <div className="text-sm">{testimonials[activeTestimonial].title}</div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="scroll-reveal">
              <h4 className="text-soft-text text-base mb-8 text-center">Compliance and those we&apos;ve worked with</h4>
              <LogoCarousel logos={partnerLogos} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
