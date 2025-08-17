"use client"

import { motion } from "framer-motion"
import { Facebook, Linkedin } from "lucide-react"
import Image from "next/image"

export function Footer() {
  const apps = [
    { name: "ReMeLife app", icon: "/remindmecare-balloon.png" },
    { name: "Remindmecare app (Android)", icon: "/remindmecare-android.png" },
    { name: "Remindmecare app (iOS)", icon: "/remindmecare-ios-rapp.png" },
    { name: "RAPP app", icon: "/remindmecare-ios-rapp.png" },
  ]

  return (
    <footer className="bg-black/20 border-t border-glass-stroke mt-16">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          <div className="space-y-8">
            <h4 className="font-semibold text-heading-text text-sm mb-4">Get the Apps</h4>
            <div className="space-y-3">
              {apps.map((app) => (
                <div
                  key={app.name}
                  className="flex items-center gap-3 group text-soft-text hover:text-white transition-colors duration-200 cursor-not-allowed opacity-75"
                >
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <Image
                      src={app.icon || "/placeholder.svg"}
                      alt={`${app.name} icon`}
                      width={32}
                      height={32}
                      className="rounded-lg"
                    />
                  </div>
                  <span className="text-sm">{app.name}</span>
                  <div className="bg-primary-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm border border-glass-stroke ml-1">
                    COMING SOON
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <h4 className="font-semibold text-heading-text text-sm mb-4">Advertisers & Partners</h4>
            <p className="text-soft-text text-sm mb-4 leading-relaxed">
              Click{" "}
              <a
                href="https://remelife.com/wp-content/uploads/2023/06/ReMeLife-Advertisers-Media-Pack-03.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-accent hover:underline"
              >
                here
              </a>{" "}
              to access our advertiser Media Pack.
            </p>
            <div>
              <p className="font-semibold text-heading-text text-sm mb-2">Want to get involved?</p>
              <p className="text-soft-text text-sm leading-relaxed">
                Send a Story or Post a Blog{" "}
                <a href="/blog" className="text-secondary-accent hover:underline">
                  here
                </a>
                .
              </p>
            </div>
          </div>
          <div className="space-y-8">
            <h4 className="font-semibold text-heading-text text-sm mb-4">Legal</h4>
            <div className="space-y-3 mb-6">
              <a
                href="/info/terms-and-conditions"
                className="block text-soft-text hover:text-white text-sm transition-colors duration-200"
              >
                Terms and Conditions
              </a>
              <a
                href="/info/privacy-policy"
                className="block text-soft-text hover:text-white text-sm transition-colors duration-200"
              >
                Privacy Policy
              </a>
            </div>
            <p className="text-soft-text text-xs sm:text-sm mb-4 leading-relaxed">
              © 2024 ReMeLife (Registered in England). ReMeLife is a registered trademark.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="https://www.facebook.com/ReMeLife/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: "white" }}
              >
                <Facebook className="w-5 h-5 text-soft-text transition-colors duration-200" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/company/remelife/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: "white" }}
              >
                <Linkedin className="w-5 h-5 text-soft-text transition-colors duration-200" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
