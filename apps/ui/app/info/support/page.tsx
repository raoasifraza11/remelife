"use client"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Mail, Phone, Users, Building } from "lucide-react"

export default function SupportPage() {
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
              <div className="text-center mb-12">
                <h1 className="text-h2 mb-4">Contact & Support</h1>
                <p className="text-body max-w-2xl mx-auto">
                  Whatever you need, we're here to help. Reach out to the appropriate team below, and we'll be in touch
                  as soon as possible.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                {/* General Contact */}
                <div className="flex flex-col items-center text-center p-6 bg-black/10 rounded-2xl border border-glass-stroke">
                  <div className="w-16 h-16 mb-6 bg-primary-accent rounded-full flex items-center justify-center shadow-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-heading-text mb-4">Contact Us</h2>
                  <p className="text-muted-foreground mb-6 text-sm">
                    Got a problem with a purchase? Difficulty setting up your store? Want to set up an affiliate based
                    store?
                  </p>
                  <div className="space-y-4 w-full flex flex-col items-center">
                    <a
                      href="mailto:support@remelife.com"
                      className="flex items-center gap-4 group text-soft-text hover:text-primary-accent transition-colors justify-center"
                    >
                      <Mail className="w-5 h-5 flex-shrink-0 text-primary-accent/80 group-hover:text-primary-accent transition-colors" />
                      <span>support@remelife.com</span>
                    </a>
                  </div>
                </div>

                {/* Partners & Advertisers */}
                <div className="flex flex-col items-center text-center p-6 bg-black/10 rounded-2xl border border-glass-stroke">
                  <div className="w-16 h-16 mb-6 bg-primary-accent rounded-full flex items-center justify-center shadow-lg">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-heading-text mb-4">For Partners & Advertisers</h2>
                  <p className="text-muted-foreground mb-6 text-sm">
                    Interested in partnership opportunities or advertising on our platform? Contact our business team.
                  </p>
                  <div className="space-y-4 w-full flex flex-col items-center">
                    <a
                      href="mailto:team@remelife.com"
                      className="flex items-center gap-4 group text-soft-text hover:text-primary-accent transition-colors justify-center"
                    >
                      <Mail className="w-5 h-5 flex-shrink-0 text-primary-accent/80 group-hover:text-primary-accent transition-colors" />
                      <span>team@remelife.com</span>
                    </a>
                    <a
                      href="tel:+442038840335"
                      className="flex items-center gap-4 group text-soft-text hover:text-primary-accent transition-colors justify-center"
                    >
                      <Phone className="w-5 h-5 flex-shrink-0 text-primary-accent/80 group-hover:text-primary-accent transition-colors" />
                      <span>+44 203 884 0335</span>
                    </a>
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
