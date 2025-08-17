"use client"

import React, { Suspense, lazy } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LogoCarousel } from "@/components/logo-carousel"
import { SectionSkeleton } from "@/components/section-skeleton"

// Lazy load sections for code splitting
const HeroSection = lazy(() => import("@/components/sections/hero-section").then(module => ({ default: module.HeroSection })))
const DigitalCareToolkitSection = lazy(() => import("@/components/sections/digital-care-toolkit-section").then(module => ({ default: module.DigitalCareToolkitSection })))
const TestimonialsSection = lazy(() => import("@/components/sections/testimonials-section").then(module => ({ default: module.TestimonialsSection })))

export default function HomePage() {
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
}
