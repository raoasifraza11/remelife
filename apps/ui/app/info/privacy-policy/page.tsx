"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ShieldCheck } from "lucide-react"

export default function PrivacyPolicyPage() {
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
                <div className="inline-flex items-center gap-4 mb-4">
                  <ShieldCheck className="w-10 h-10 text-primary-accent" />
                  <h1 className="text-h2">Privacy Policy</h1>
                </div>
                <p className="text-sm text-muted-foreground">Last Updated: July 16, 2025</p>
              </div>

              <div className="prose prose-invert max-w-none text-soft-text prose-headings:text-heading-text prose-a:text-primary-accent hover:prose-a:text-secondary-accent prose-strong:text-heading-text">
                <p>ReMeLife (“we“) are committed to protecting and respecting your privacy.</p>
                <p>
                  Collectively, our “Services” include the websites www.RemindMeCare.com, www.ReMeLife.com and
                  www.ReMe.Care our “Sites“, our applications available to download onto tablets and mobile phones
                  “Apps“, and other products or services offered by us through the Site and/or the Apps.
                </p>
                <p>
                  This Privacy Policy (together with our Terms of Use) sets out the basis on which we will process any
                  personal data we collect about you in connection with our Services.
                </p>
                <p>
                  By visiting and continuing to use this Service, you are accepting and consenting to the practices
                  described in this Privacy Policy.
                </p>

                <h2>Information we may collect and process</h2>
                <h3>Data you provide</h3>
                <ul>
                  <li>
                    When registering to use our Services, data may include: names, nickname, gender, date of birth,
                    e-mail address, local time zone
                  </li>
                  <li>
                    When building a record of personal history, data collected may include: preferred language, place of
                    birth, religion, terms you search for and related notes, photos and video that you upload
                  </li>
                  <li>
                    When building a record of special personal needs data collected may include: dietary preferences,
                    routines, physical and mental conditions
                  </li>
                  <li>
                    When inviting others to join our Services, data collected may include: contact information for
                    family members, friends, health professionals and care organisations
                  </li>
                </ul>
                <h3>Data automatically collected about your usage</h3>
                <ul>
                  <li>Areas, topics and pages you view on our Services</li>
                  <li>
                    Methods used to browse to, through and from our Sites, including the full address (URL) of pages
                    displayed. See also our Cookie policy
                  </li>
                  <li>Details of any transactions you make when visiting our Sites or using our Apps</li>
                  <li>Any phone number used to call our customer services</li>
                </ul>
                <h3>Data we receive from other sources</h3>
                <ul>
                  <li>
                    We work closely with third parties (including, for example, technical and payment and delivery
                    services, advertising networks, analytics providers and search information providers). We may
                    receive information about you from them and may combine this with information you give to us and
                    information we collect about you
                  </li>
                </ul>

                <h2>How we use your information</h2>
                <p>We may use information held about you in the following ways:</p>
                <ul>
                  <li>
                    to enable you, your Family members, friends and (if relevant) your formal carers to use our Services
                  </li>
                  <li>
                    to provide you with access to images and video similar to those that you have already saved or
                    searched for
                  </li>
                  <li>
                    to ensure that content from our Services are presented in the most effective manner for you and for
                    your computer
                  </li>
                  <li>to notify you about changes to our Services</li>
                  <li>to process transactions to which you are a party</li>
                  <li>as part of our efforts to keep our Services safe and secure</li>
                  <li>
                    for internal operations, including troubleshooting, data analysis, testing, research, statistical
                    and survey purposes
                  </li>
                </ul>
                <p>
                  <strong>If and when you give us your explicit permission</strong> we may also use your data:
                </p>
                <ul>
                  <li>
                    to provide you, or permit selected third parties to provide you, with information about goods or
                    services we feel may interest you
                  </li>
                </ul>

                <h2>Disclosure of Your Information</h2>
                <p>
                  We will not share your information with third parties without your explicit consent, these third
                  parties could include:
                </p>
                <ul>
                  <li>Users and organisations that you invite to access our Service on your behalf</li>
                  <li>
                    Medical research organisations studying conditions relating to physical and cognitive impairment
                    associated with aging, learning disabilities and acquired brain damage
                  </li>
                  <li>
                    Analytics and search engine providers that assist us in the improvement and optimisation of our
                    Services
                  </li>
                  <li>
                    Business partners, suppliers and sub-contractors for the performance of any contract we enter with
                    you
                  </li>
                  <li>
                    Advertisers and advertising networks that request anonymised information or data to select and serve
                    relevant tailored adverts to you and others
                  </li>
                </ul>

                <h2>Your Rights</h2>
                <p>Under the General Data Protection Regulation (GDPR) 2018, you have the rights to:</p>
                <ul>
                  <li>see the information we hold about you</li>
                  <li>change and amend or correct the information we hold about you</li>
                  <li>delete all or some of the information we hold about you</li>
                  <li>tell us not to process your personal data for marketing or another purpose</li>
                  <li>
                    refuse, or give us, your permission to give or sell your anonymised information to any third party
                  </li>
                </ul>
                <p>
                  You can exercise your right to permit such processing by only ticking/checking certain boxes on the
                  forms we use to collect your data. You can also exercise the right at any time by contacting us at{" "}
                  <a href="mailto:team@remelife.com">team@remelife.com</a>
                </p>

                <h2>Complaints</h2>
                <p>
                  You can make a complaint to us if things go wrong and you are not satisfied with our service by
                  contacting us at <a href="mailto:team@remelife.com">team@remelife.com</a>. We will look into
                  complaints made to us and make a written response
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
