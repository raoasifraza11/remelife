"use client"
import Image from "next/image"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Heart, Users, Calendar, TrendingUp, ExternalLink } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function RemindMecarePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background-start via-background-mid to-background-end">
      <Header />

      <main className="relative">
        {/* Hero Section - Logo and Subheading */}
        <section className="relative pt-32 pb-96 px-4 sm:px-8 min-h-screen flex items-center">
          <div className="max-w-6xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center"
            >
              <div className="mb-10">
                <Image
                  src="/remindmecare-logo.png"
                  alt="RemindMecare Logo"
                  width={600}
                  height={150}
                  className="mx-auto max-w-full h-auto"
                  priority
                />
              </div>
              <div
                className="inline-block bg-black/80 backdrop-blur-sm rounded-full px-8 sm:px-10 py-4 sm:py-5 mx-4 max-w-[90vw]"
                style={{
                  boxShadow:
                    "0 0 30px rgba(255, 255, 255, 0.5), 0 0 60px rgba(255, 255, 255, 0.3), 0 0 90px rgba(255, 255, 255, 0.1)",
                }}
              >
                <p className="text-base sm:text-lg text-white max-w-4xl mx-auto leading-relaxed font-medium">
                  The leading person-centred care, bespoke care activities and companionship app, for care at home, the
                  elderly, dementia, learning disabilities and cognitive impairment.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content Sections */}
        <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-48 pb-48">
          {/* Section 1: Care Dashboard */}
          <motion.section variants={fadeInUp} className="px-4 sm:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="glass-pane p-8 sm:p-12 rounded-3xl">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h2
                      className="text-3xl sm:text-4xl font-bold text-heading-text"
                      style={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.3)" }}
                    >
                      Personalized Care Dashboard
                    </h2>
                    <p className="text-lg text-soft-text leading-relaxed">
                      RemindMecare is at the heart of ReMeLife, providing those involved with care with a broad range of
                      support tools. Whether you're the person cared for, a family member or a carer, you'll find that
                      RemindMecare addresses your needs, from person-centred care to remote connectivity, from therapy
                      to entertainment.
                    </p>
                    <div className="flex items-center gap-2 text-primary-accent">
                      <Heart className="w-5 h-5" />
                      <span className="font-medium">Person-centered approach</span>
                    </div>
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="relative">
                    <Image
                      src="/remindmecare/care-home-dashboard.webp"
                      alt="Care home dashboard showing personalized interface with upcoming world days, user profile, and colorful app tiles for chat, schedule, activities, care circle, music, and wellbeing"
                      width={600}
                      height={400}
                      className="w-full h-auto rounded-xl"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 2: Music Therapy */}
          <motion.section variants={fadeInUp} className="px-4 sm:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="glass-pane p-8 sm:p-12 rounded-3xl">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative lg:order-1"
                  >
                    <Image
                      src="/remindmecare/music-elderly-care.webp"
                      alt="Music for Elderly Care interface showing different decades of music from 1950s to 1980s"
                      width={600}
                      height={400}
                      className="w-full h-auto rounded-xl"
                    />
                  </motion.div>
                  <div className="space-y-6 lg:order-2">
                    <h2
                      className="text-3xl sm:text-4xl font-bold text-heading-text"
                      style={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.3)" }}
                    >
                      Common Interest Discovery
                    </h2>
                    <p className="text-lg text-soft-text leading-relaxed">
                      Memory-based activities help reveal personal interests by tapping into past experiences. This
                      supports more tailored engagement and strengthens emotional connections in care.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-secondary-accent">
                        <Users className="w-5 h-5" />
                        <span className="font-medium">Shared Interests</span>
                      </div>
                      <p className="text-soft-text ml-7">
                        By identifying mutual interests between the person and their carers or family, the platform
                        fosters stronger bonds and more meaningful interactions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 3: Video Communication */}
          <motion.section variants={fadeInUp} className="px-4 sm:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="glass-pane p-8 sm:p-12 rounded-3xl">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h2
                      className="text-3xl sm:text-4xl font-bold text-heading-text"
                      style={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.3)" }}
                    >
                      Remote Connectivity
                    </h2>
                    <p className="text-lg text-soft-text leading-relaxed">
                      Stay connected with loved ones through intuitive video calling features. Our platform makes it
                      easy for families and carers to maintain meaningful relationships, regardless of physical
                      distance.
                    </p>
                    <div className="flex items-center gap-2 text-primary-accent">
                      <ExternalLink className="w-5 h-5" />
                      <span className="font-medium">Easy-to-use interface</span>
                    </div>
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="relative">
                    <Image
                      src="/remindmecare/video-meeting.webp"
                      alt="Video Meeting interface with options to create, join, and manage meetings"
                      width={600}
                      height={400}
                      className="w-full h-auto rounded-xl"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 4: Activity Calendar */}
          <motion.section variants={fadeInUp} className="px-4 sm:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="glass-pane p-8 sm:p-12 rounded-3xl">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative lg:order-1"
                  >
                    <Image
                      src="/remindmecare/aviation-activities.webp"
                      alt="Activity Calendar showing various themed activities like International Aviation Day"
                      width={600}
                      height={400}
                      className="w-full h-auto rounded-xl"
                    />
                  </motion.div>
                  <div className="space-y-6 lg:order-2">
                    <h2
                      className="text-3xl sm:text-4xl font-bold text-heading-text"
                      style={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.3)" }}
                    >
                      Activity Calendar
                    </h2>
                    <p className="text-lg text-soft-text leading-relaxed">
                      A clear calendar tracks past and upcoming activities, helping carers stay organized and families
                      stay informed, while supporting consistent care.
                    </p>
                    <div className="flex items-center gap-2 text-secondary-accent">
                      <Calendar className="w-5 h-5" />
                      <span className="font-medium">Organized care scheduling</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 5: Well-Being Tracking */}
          <motion.section variants={fadeInUp} className="px-4 sm:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="glass-pane p-8 sm:p-12 rounded-3xl">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h2
                      className="text-3xl sm:text-4xl font-bold text-heading-text"
                      style={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.3)" }}
                    >
                      Well-Being Tracking
                    </h2>
                    <p className="text-lg text-soft-text leading-relaxed">
                      Monitoring activity engagement offers insights into emotional and cognitive health, enabling
                      timely care adjustments based on participation trends.
                    </p>
                    <div className="flex items-center gap-2 text-primary-accent">
                      <TrendingUp className="w-5 h-5" />
                      <span className="font-medium">Data-driven care insights</span>
                    </div>
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="relative">
                    <Image
                      src="/remindmecare/care-network.webp"
                      alt="Care Network diagram showing connections between family, friends, and responsible carers"
                      width={600}
                      height={400}
                      className="w-full h-auto rounded-xl"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>

        {/* Call to Action Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="px-4 sm:px-8 pb-24"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-pane p-8 sm:p-12 rounded-3xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-heading-text mb-6">Experience RemindMecare Today</h2>
              <p className="text-lg text-soft-text mb-8 max-w-2xl mx-auto">
                Join thousands of families and care providers who trust RemindMecare to deliver personalized,
                compassionate care solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://reme.care/users/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary btn-shine px-8 py-4 text-lg font-bold inline-flex items-center gap-2 justify-center"
                >
                  Visit RemindMecare.com
                  <ExternalLink className="w-5 h-5" />
                </a>
                <Link
                  href="/register"
                  className="btn-secondary btn-shine px-8 py-4 text-lg font-medium inline-flex items-center gap-2 justify-center"
                >
                  Join ReMeLife
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  )
}
