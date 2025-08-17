"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const MotionImage = motion.create(Image)

export default function RewardsPage() {
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

      <main>
        <header className="min-h-[80vh] flex items-center justify-center text-center">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
            <h1 className="text-h1 mb-6">
              How to{" "}
              <span
                className="rainbow-text-alt animate-vibrant-glow"
                style={{ "--glow-color": "hsl(170 89% 60%)" } as React.CSSProperties}
              >
                share
              </span>{" "}
              in the{" "}
              <span
                className="animate-vibrant-glow"
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
                value
              </span>{" "}
              of your daily{" "}
              <span
                className="rainbow-text animate-vibrant-glow"
                style={{ "--glow-color": "hsl(262 89% 70%)" } as React.CSSProperties}
              >
                care
              </span>
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            >
              <div
                className="inline-block glass-pane rounded-full px-6 py-3 sm:px-8 sm:py-4"
                style={{ boxShadow: "0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.4)" }}
              >
                <p className="text-base sm:text-lg text-body tracking-wide welcome-aura">
                  An introduction to how ReMeLife rewards you for your contributions to the care community.
                </p>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Section 1: Care 2 Earn */}
        <section className="min-h-screen flex items-center py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
            <div className="glass-pane rounded-3xl p-8 md:p-12">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div className="scroll-reveal">
                  <div className="relative aspect-video rounded-xl overflow-hidden group">
                    <Image
                      src="/rewards/wallet-1-dashboard.webp"
                      alt="ReMeLife wallet dashboard showing total CAPS earned"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                </div>
                <div className="scroll-reveal">
                  <h2 className="text-h2 mb-6">Rewards based care - 'Care 2 Earn'</h2>
                  <div className="space-y-6 text-lg leading-relaxed">
                    <p>
                      Caring should be rewarding, not only emotionally but financially. We should all share in the value
                      of our daily digital care actions. ReMeLife makes this possible.
                    </p>
                    <p>
                      Earning rewards is easy. You simply use ReMeLife's features and watch the rewards accumulate in
                      your wallet. You'll soon be passively capturing the value in your daily digital care actions, and
                      helping our partners in the care sector.
                    </p>
                    <Link href="/register" className="font-bold text-primary-accent hover:underline text-xl">
                      Register to get your wallet
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Rewards & Wallet */}
        <section className="min-h-screen flex items-center py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
            <div className="glass-pane rounded-3xl p-8 md:p-12">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div className="scroll-reveal order-2 lg:order-1">
                  <h2 className="text-h2 mb-6">ReMeLife rewards & wallet</h2>
                  <div className="space-y-6 text-lg leading-relaxed">
                    <p>
                      Caring should be rewarding, not only emotionally but financially. We should all share in the value
                      of our daily digital care actions. ReMeLife makes this possible.
                    </p>
                    <p>
                      Earning rewards is easy. You simply use ReMeLife's features and watch the rewards accumulate in
                      your wallet. You'll soon be passively capturing the value in your daily digital care actions, and
                      helping our partners in the care sector.
                    </p>
                  </div>
                </div>
                <div className="scroll-reveal order-1 lg:order-2 flex justify-center">
                  <MotionImage
                    src="/rewards/wallet-2-balances.webp"
                    alt="ReMeLife wallet balances for CAPS and REME tokens"
                    width={1153}
                    height={559}
                    className="w-full max-w-2xl h-auto object-contain rounded-2xl"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: How you earn */}
        <section className="min-h-screen flex items-center py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
            <div className="glass-pane rounded-3xl p-8 md:p-12">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div className="scroll-reveal flex justify-center">
                  <MotionImage
                    src="/rewards/wallet-3-explore.webp"
                    alt="Explore More section of the ReMeLife wallet"
                    width={1153}
                    height={915}
                    className="w-full max-w-2xl h-auto object-contain rounded-2xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                </div>
                <div className="scroll-reveal">
                  <h2 className="text-h2 mb-6">How you earn reward tokens</h2>
                  <div className="space-y-4 text-lg leading-relaxed">
                    <p>Here's how it works. You'll earn rewards when you do the following.</p>
                    <ul className="space-y-4">
                      <li>
                        <strong className="text-heading-text">FORUM:</strong> When you make a post.
                      </li>
                      <li>
                        <strong className="text-heading-text">NEWS:</strong> When you share a news item with your care
                        circle.
                      </li>
                      <li>
                        <strong className="text-heading-text">CARE ACTIONS:</strong> When you use ReMeLife's apps, such
                        as RemindMecare to support those you care for.
                      </li>
                      <li>
                        <strong className="text-heading-text">MARKET:</strong> When click to view a vendors products.
                      </li>
                      <li>
                        <strong className="text-heading-text">REFERRALS:</strong> When you and those in your care
                        circle, community and social network invite others to join ReMeLife.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Community Network */}
        <section className="min-h-screen flex items-center py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
            <div className="glass-pane rounded-3xl p-8 md:p-12">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div className="scroll-reveal order-2 lg:order-1">
                  <h2 className="text-h2 mb-6">Your community network</h2>
                  <div className="space-y-6 text-lg leading-relaxed">
                    <p>
                      When you introduce someone to join ReMeLife you provide them with a link to sign up and they
                      become part of your rewards earning network.
                    </p>
                    <p>And when they do the same, they also become part of your rewards generating community.</p>
                  </div>
                </div>
                <div className="scroll-reveal order-1 lg:order-2 flex justify-center">
                  <MotionImage
                    src="/rewards/wallet-4-community.webp"
                    alt="ReMeLife Community Builder dashboard"
                    width={1153}
                    height={699}
                    className="w-full max-w-2xl h-auto object-contain rounded-2xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Passive Income */}
        <section className="min-h-screen flex items-center py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
            <div className="glass-pane rounded-3xl p-8 md:p-12">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div className="scroll-reveal flex justify-center">
                  <MotionImage
                    src="/rewards/wallet-5-referrals-updated.webp"
                    alt="ReMeLife referral system showing multi-level rewards structure and referral link"
                    width={1153}
                    height={1109}
                    className="w-full max-w-2xl h-auto object-contain rounded-2xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                </div>
                <div className="scroll-reveal">
                  <h2 className="text-h2 mb-6">Creating passive income</h2>
                  <div className="space-y-6 text-lg leading-relaxed">
                    <p>
                      You'll soon find that you are passively earning reward tokens and that your wallet is filling up.
                      This will become your monthly ReMeLife Universal Basic Income (RUBI).
                    </p>
                    <p>So, in summary, the more you care, the more you earn from your digital care actions.</p>
                    <a href="#" className="font-bold text-primary-accent hover:underline mt-4 inline-block text-xl">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
