"use client"

import type React from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
}

const titleVariants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
}

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
}

export default function OverviewPage() {
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
        {/* Section 1: Free Apps and Rewarded Care */}
        <motion.section
          className="min-h-screen flex items-center py-24 md:py-32"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            <motion.div variants={titleVariants} className="text-center mb-12 md:mb-24">
              <h1 className="text-h1 font-bold">
                Free apps and{" "}
                <span
                  className="rainbow-text animate-vibrant-glow"
                  style={{ "--glow-color": "hsl(262 89% 70%)" } as React.CSSProperties}
                >
                  rewarded care
                </span>
              </h1>
            </motion.div>
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
              <motion.div variants={slideInLeft}>
                <Image
                  src="/overview/improving-your-care.webp"
                  alt="Diagram showing the support network for improving care, including family, friends, services, and community."
                  width={576}
                  height={408}
                  className="w-full h-auto"
                />
              </motion.div>
              <motion.div variants={slideInRight}>
                <h2 className="text-h3 font-bold mb-6">Improving your care</h2>
                <div className="space-y-4 text-body">
                  <p>
                    ReMeLife provides support to those struggling with daily life, whether with care, or cognitive or
                    emotional issues. We do this by providing a suite of apps that promotes digital care and enhances
                    family connectivity, activity, social engagement, and care management. A better quality of life for
                    everyone!
                  </p>
                  <p>
                    Critically, ReMeLife collects the knowledge of the person through digital care activities. It then
                    uses this data to improve their engagement with those in their care circles. Additionally, the data
                    will foster an increase in their ability to use today's technology.
                  </p>
                  <p>
                    What's more, ReMeLife members earn REME tokens as rewards for their daily care actions, content
                    sharing, and therapy. These are redeemable for discounted products and services in the ReMeLife
                    Market.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Section 2: A Growing Suite of Care Apps */}
        <motion.section
          className="min-h-screen flex items-center py-24 md:py-32 bg-black/10"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            <motion.div variants={titleVariants} className="text-center mb-12 md:mb-24">
              <h2 className="text-h1 font-bold">
                A growing suite of{" "}
                <span
                  className="rainbow-text animate-vibrant-glow"
                  style={{ "--glow-color": "hsl(262 89% 70%)" } as React.CSSProperties}
                >
                  care apps
                </span>
              </h2>
            </motion.div>
            <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">
              <motion.div variants={slideInLeft} className="lg:col-span-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-h3 font-bold text-heading-text mb-4">ReMeLife</h3>
                    <p className="text-body mb-6">
                      ReMeLife apps are used by all those involved in caring for someone. To get started download the
                      ReMeLife, RemindMecare, and RAPP apps to your phone, tablet or PC.
                    </p>
                    <motion.div
                      className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-base"
                      variants={{
                        visible: { transition: { staggerChildren: 0.1 } },
                      }}
                    >
                      <motion.p variants={fadeInUp}>
                        <strong className="text-heading-text">REMEMADES</strong> Readymade Activities for every day, and
                        for key events throughout the year, plus a library of content and music suited for care and
                        entertainment.
                      </motion.p>
                      <motion.p variants={fadeInUp}>
                        <strong className="text-heading-text">FORUM</strong> We all need to connect with like-minded
                        persons, share experiences and get answers. It's fun, supportive, and being rewarded for posting
                        stimulates participation.
                      </motion.p>
                      <motion.p variants={fadeInUp}>
                        <strong className="text-heading-text">ROOMS</strong> A virtual space designed for group or
                        one-to-one interactions between members, carers, family, or professionals. Rooms support video,
                        audio, and chat — enabling private conversations, shared activities, or guided support sessions.
                        It's your digital community centre.
                      </motion.p>
                      <motion.p variants={fadeInUp}>
                        <strong className="text-heading-text">MARKET</strong> A decentralised marketplace where members
                        can spend or earn rewards from actions, content, or services. The Market includes caregiving
                        tools, personal services, and digital goods, creating a unique economy for engagement and
                        support within the ReMeLife ecosystem.
                      </motion.p>
                      <motion.p variants={fadeInUp}>
                        <strong className="text-heading-text">WALLET</strong> The Members wallet holds and transacts the
                        rewards earned from care actions, data, social engagement and online purchasing. REME Wallet is
                        the gateway to a monthly passive income.
                      </motion.p>
                      <motion.p variants={fadeInUp}>
                        <strong className="text-heading-text">GAMES</strong> The ReMeLife App Playstore Portal (RAPP)
                        makes finding apps easy. Integrated with advanced care cognitive hardware, it's a multi-purpose
                        app.
                      </motion.p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              <motion.div variants={slideInRight} className="lg:col-span-4">
                <Image
                  src="/remelife-app-interface.webp"
                  alt="ReMeLife mobile app interface showing various care apps including RemindMecare, Rooms, Life Story, Activities, News, Market, Wallet, and Games"
                  width={500}
                  height={1000}
                  className="w-full max-w-lg h-auto"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Section 3: Your Decentralised Care Community */}
        <motion.section
          className="min-h-screen flex items-center py-24 md:py-32"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            <motion.div variants={titleVariants} className="text-center mb-12 md:mb-24">
              <h2 className="text-h1 font-bold">
                Your{" "}
                <span
                  className="rainbow-text animate-vibrant-glow"
                  style={{ "--glow-color": "hsl(262 89% 70%)" } as React.CSSProperties}
                >
                  Decentralised
                </span>{" "}
                Care Community
              </h2>
            </motion.div>
            <div className="max-w-4xl mx-auto">
              <motion.p variants={fadeInUp} className="text-body mb-6">
                We learnt from personal experience that more people are opting for home care. So we built ReMeLife to
                support better person-centred care and self-care management and to address isolation, loneliness, the
                lack of tach inclusion, and community engagement. Our six pillars illustrate the core foundations that
                underpin our mission.
              </motion.p>
              <motion.div
                className="space-y-3 text-body"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
              >
                <motion.p variants={fadeInUp}>
                  <strong
                    className="text-heading-text"
                    style={{
                      textShadow: "0 0 8px rgba(236, 72, 153, 0.8), 0 0 16px rgba(236, 72, 153, 0.4)",
                    }}
                  >
                    PERSON-CENTRED CARE
                  </strong>{" "}
                  Every person is an individual and care must be person centred. Online inclusivity should reach those
                  that are often currently ignored.
                </motion.p>
                <motion.p variants={fadeInUp}>
                  <strong
                    className="text-heading-text"
                    style={{
                      textShadow: "0 0 8px rgba(250, 204, 21, 0.8), 0 0 16px rgba(250, 204, 21, 0.4)",
                    }}
                  >
                    REWARDED CARE
                  </strong>{" "}
                  Caring is hard. People should get rewards for their commitment and support; the profits they generate
                  for others through their unremunerated work.
                </motion.p>
                <motion.p variants={fadeInUp}>
                  <strong
                    className="text-heading-text"
                    style={{
                      textShadow: "0 0 8px rgba(56, 189, 248, 0.8), 0 0 16px rgba(56, 189, 248, 0.4)",
                    }}
                  >
                    DATA OWNERSHIP
                  </strong>{" "}
                  Your data should be controlled by you. It should not only be secure and GDPR compliant but should work
                  and deliver returns for your efforts.
                </motion.p>
                <motion.p variants={fadeInUp}>
                  <strong
                    className="text-heading-text"
                    style={{
                      textShadow: "0 0 8px rgba(74, 222, 128, 0.8), 0 0 16px rgba(74, 222, 128, 0.4)",
                    }}
                  >
                    RETAIL SHARING
                  </strong>{" "}
                  Loyal customers should get rewards from the substantial retail margins available in online purchasing.
                  This will be for their work in finding, purchasing, and sharing products.
                </motion.p>
                <motion.p variants={fadeInUp}>
                  <strong
                    className="text-heading-text"
                    style={{
                      textShadow: "0 0 8px rgba(129, 140, 248, 0.8), 0 0 16px rgba(129, 140, 248, 0.4)",
                    }}
                  >
                    BUSINESS SHARING
                  </strong>{" "}
                  The success of a business should be shared with the employees and customers responsible for its growth
                  in an equitable and easily accessible manner.
                </motion.p>
                <motion.p variants={fadeInUp}>
                  <strong
                    className="text-heading-text"
                    style={{
                      textShadow: "0 0 8px rgba(192, 132, 252, 0.8), 0 0 16px rgba(192, 132, 252, 0.4)",
                    }}
                  >
                    CHARITY SHARING
                  </strong>{" "}
                  Every business should ensure they deliver an optimally positive social impact. They should also take
                  responsibility for those charities that support their customer base.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  )
}
