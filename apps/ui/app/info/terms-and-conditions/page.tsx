"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FileText } from "lucide-react"

export default function TermsAndConditionsPage() {
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
                  <FileText className="w-10 h-10 text-primary-accent" />
                  <h1 className="text-h2">Terms and Conditions</h1>
                </div>
                <p className="text-sm text-muted-foreground">Last Updated: July 16, 2025</p>
              </div>

              <div className="prose prose-invert max-w-none text-soft-text prose-headings:text-heading-text prose-a:text-primary-accent hover:prose-a:text-secondary-accent prose-strong:text-heading-text">
                <h2>The Agreement</h2>
                <h3>Terms of Service</h3>
                <ul>
                  <li>
                    ReMeLife (“we”, “us” or “our”) offers the use of RemindMeCare services and content (“Content”) on
                    our website at remelife.com (“Site”) and associated websites including but not limited to
                    remindmecare.com, and from our applications available to download onto PCs, tablets and mobile
                    phones (“Apps”) (collectively, the “Services”). Please read the following terms and conditions
                    (“Terms of Use”) carefully before using the Services.
                  </li>
                  <li>
                    These Terms of Use govern your access to and use of the Services and constitute a binding legal
                    agreement between you and ReMeLife.
                  </li>
                  <li>
                    You acknowledge and agree that, by clicking on the “I agree” or “I accept” button, or by accessing
                    or using the Services you are indicating that you have read, understand and agree to be bound by
                    these Terms of Use, whether or not you have registered with the Site. If you do not agree to these
                    Terms of Use you must not register or use the Services.
                  </li>
                  <li>
                    These Terms of Use, or any part of them, may be terminated by ReMeLife without notice at any time,
                    for any reason. The provisions relating to Copyrights, Trademark, Disclaimer, Limitation of
                    Liability, Indemnification and Governing Law, shall survive any termination.
                  </li>
                  <li>
                    If we modify these Terms of Use, we will post the modification on the Site or provide you with
                    notice of the modification. We will also update the “Last Updated Date” at the top of the home page
                    of the Site. By continuing to access or use the Services after we have posted a modification on the
                    Site or have provided you with notice of a modification, you are indicating that you agree to be
                    bound by the modified Terms of Use. If the modified Terms of Use are not acceptable to you, your
                    only recourse is to cease using the Services.
                  </li>
                  <li>
                    Certain access to or use of certain Services may have different terms and conditions posted or may
                    require you to agree with and accept additional terms and conditions. If there is a conflict between
                    these Terms of Use and terms and conditions posted for a specific area of the Services, the latter
                    terms and conditions shall take precedence with respect to your use of or access to that area of the
                    Site, Services or Content.
                  </li>
                  <li>
                    For details of our cookie policy and the way in which we process your personal information please
                    refer to our Privacy Policy.
                  </li>
                </ul>

                <h3>Eligibility and Account Registration</h3>
                <ul>
                  <li>
                    In order to access certain features of the Services and to post any Content on or through the
                    Services, you must register to create an account (“Account”). You must be at least 18 years old and
                    any registration by anyone under 18 is void. By completing the registration process to create an
                    Account, you represent and warrant that you are 18 or older.
                  </li>
                  <li>
                    You are responsible for safeguarding your password. You agree not to disclose your password to any
                    third party and to take sole responsibility for any activities or actions under your Account,
                    whether or not you have authorized such activities or actions.
                  </li>
                  <li>You will immediately notify us of any unauthorized use of your Account.</li>
                  <li>
                    During the registration process, you will be asked to provide certain information and you will
                    establish a username and a password. You agree to provide accurate, current and complete information
                    during the registration process and to update such information to keep it accurate, current and
                    complete.
                  </li>
                  <li>
                    We reserve the right to suspend or terminate your Account if any information provided during the
                    registration process or thereafter proves to be inaccurate, not current or incomplete.
                  </li>
                </ul>

                <h3>Accounts and Paid Features</h3>
                <ul>
                  <li>
                    We offer a free Account (no fees) and the option to enhance your Account with paid features (“Paid
                    Features“). A description of our Paid Features and subscription plans is available at the Site. You
                    may change your account options at any time.
                  </li>
                  <li>
                    When you select to take advantage of the Paid Features, you will be required to provide billing
                    information such as name, billing address, and payment information and select a subscription plan.
                  </li>
                  <li>
                    Some of the Paid Features utilise third party service providers. All purchases made through these
                    third party service providers are subject to their respective terms and conditions of use and these
                    Terms of Use do not affect your rights in respect of such purchases. We are not responsible and have
                    no liability whatsoever for goods or services you obtain through our third party service providers
                    or other web sites or web pages and we expressly exclude from these Terms of Use, to the fullest
                    extent permitted by law, all express or implied warranties, terms, conditions and representations in
                    relation to the goods and services obtained from third party service providers. We encourage you to
                    make whatever investigation you feel necessary or appropriate before proceeding with any purchase.
                  </li>
                  <li>
                    You agree to pay the applicable fees and any taxes and other fees that may accrue in relation to
                    your use of the Services, if any, and any Paid Features you may elect. All fees are non-refundable
                    and non-transferable except as expressly provided in these Terms of Use.
                  </li>
                  <li>
                    In the event we terminate these Terms of Use for your breach, you will remain liable for all amounts
                    due hereunder.
                  </li>
                  <li>
                    If you access the Services as part of a free trial you agree that all the terms and conditions of
                    these Terms of Use apply to your use during that period except any obligation to pay for access to
                    the Services. You acknowledge that full access to and/or some of the functionality of the Services
                    may be restricted as part of a free trial. We may terminate the free trial at any time without
                    notice. Once the free trial period has ended if you wish to continue to access the Services you will
                    need to subscribe for use of the Services on a paid for basis.
                  </li>
                </ul>

                <h3>Intellectual Property</h3>
                <ul>
                  <li>
                    The copyright and all other intellectual property rights in the Services is owned by us and our
                    licensors.
                  </li>
                  <li>
                    All of our trademarks (including ‘RemindMeCare’ and ‘ReMeLife’), service marks, logos, trade names
                    and any other proprietary designations used herein are trademarks or registered trademarks of us.
                    Any other trademarks, service marks, logos, trade names and any other proprietary designations are
                    the trademarks or registered trademarks of their respective parties.
                  </li>
                  <li>
                    If you become aware of any material included as part of the Services that you believe infringes your
                    or any other person’s copyright, please report this by email to{" "}
                    <a href="mailto:team@remelife.com">team@remelife.com</a>.
                  </li>
                </ul>

                <h3>Permitted Use</h3>
                <ul>
                  <li>
                    We hereby grants you a personal, limited, revocable and non-transferable licence (without the right
                    to sub-license) to electronically copy and print hard copy portions of the Services solely for your
                    personal and non-commercial use. Any other copying of any part of the Services, including but not
                    limited to the reproduction, distribution, display or transmission of the Content of the Site is
                    strictly prohibited, unless authorised by us.
                  </li>
                  <li>
                    You may request additional permissions to that expressed in the licence expressed herein by writing
                    to us at the address indicated on the Site.
                  </li>
                  <li>
                    You further agree not to change or delete any proprietary notices from materials downloaded from the
                    Site.
                  </li>
                  <li>
                    For the avoidance of doubt, unless otherwise expressed, you must not:
                    <ul>
                      <li>
                        adapt, edit, change, transform, publish, republish, distribute, redistribute, broadcast,
                        rebroadcast or show or play in public the Services (in any form or media) without the prior
                        written permission of us; or
                      </li>
                      <li>
                        disassemble, decompile, reverse engineer or otherwise modify the Services to the extent that you
                        cannot be prevented from doing so under applicable law.
                      </li>
                    </ul>
                  </li>
                  <li>
                    If you become aware of any use of our copyright materials, or any of our other intellectual property
                    rights, that contravenes or may contravene the licence above, please report this by email to{" "}
                    <a href="mailto:team@remelife.com">team@remelife.com</a> or by post to 32 Admiralty Way, Teddington,
                    TW11 0NL
                  </li>
                  <li>
                    Access to certain areas of the Services is restricted. We reserve the right to restrict access to
                    areas of the Services at our sole discretion.
                  </li>
                  <li>
                    We may disable your user ID and password in our sole discretion without notice or explanation.
                  </li>
                </ul>

                <h3>Unacceptable Use</h3>
                <ul>
                  <li>
                    You must not use the Services in any way that causes, or may cause, damage to the Services or
                    impairment of the availability or accessibility of the Services, or in any way which is unlawful,
                    illegal, fraudulent or harmful, or in connection with any unlawful, illegal, fraudulent or harmful
                    purpose or activity.
                  </li>
                  <li>
                    You must not use the Services to copy, store, host, transmit, send, use, publish or distribute any
                    material which consists of (or is linked to) any spyware, computer virus, Trojan horse, worm,
                    keystroke logger, rootkit or other malicious computer software.
                  </li>
                  <li>
                    You must not conduct any systematic or automated data collection activities (including without
                    limitation scraping, data mining, data extraction and data harvesting) on or in relation to the
                    Services without our prior written consent.
                  </li>
                  <li>
                    Without prejudice to our other rights under these Terms of Use, if you breach these Terms of Use in
                    any way or if we believe that you are using or have used your Account directly or indirectly in a
                    way not permitted under these Terms of Use, we may take such action as we deem appropriate to deal
                    with the breach, including suspending your access to the Services, suspending or terminating your
                    Account, blocking computers using your IP address from accessing the Services, contacting your
                    internet service provider to request that it blocks your access to the Services and/or bringing
                    court proceedings against you.
                  </li>
                  <li>
                    The failure of us to enforce any right or provision of these Terms of Use will not constitute a
                    waiver of future enforcement of that right or provision. The waiver of any such right or provision
                    will be effective only if in writing and signed by a duly authorized representative of us. Except as
                    expressly set forth in these Terms of Use, the exercise by either party of any of its remedies under
                    these Terms of Use will be without prejudice to its other remedies under these Terms of Use or
                    otherwise. If for any reason, a court of competent jurisdiction finds any provision of these Terms
                    of Use invalid or unenforceable, that provision will be enforced to the maximum extent permissible
                    and the other provisions of these Terms of Use will remain in full force and effect.
                  </li>
                </ul>

                <h3>User Content</h3>
                <ul>
                  <li>
                    Service users may post, upload, publish, submit or transmit text, graphics, images, music, software,
                    audio, video, information or other materials to be made available through the Services (“User
                    Content“).
                  </li>
                  <li>
                    If you choose to upload images or video you grant us a limited, non-exclusive, license to access,
                    view and display these images to you in connection with your use of the Services. We do not claim
                    any ownership rights in any such User Content and nothing in these Terms of Use will be deemed to
                    restrict any rights that you may have to use and exploit any such User Content
                  </li>
                  <li>
                    You warrant that your User Content is not illegal or unlawful, and does not infringe any third
                    party’s legal rights, and that it is not be capable of giving rise to legal action whether against
                    you or us or a third party (in each case under any applicable law).
                  </li>
                  <li>
                    You must not submit any User Content to the Services that is or has ever been the subject of any
                    threatened or actual legal proceedings or other similar complaint.
                  </li>
                  <li>We reserve the right to edit or remove any User Content from the Site without notice.</li>
                  <li>
                    You acknowledge and agree that you are solely responsible for all User Content that you make
                    available through the Services. Accordingly, you represent and warrant that: (i) you either are the
                    sole and exclusive owner of all User Content that you make available through the Services or you
                    have all rights, licenses, consents and releases that are necessary to grant to us the rights in
                    such User Content, as contemplated under these Terms of Use; and (ii) neither the User Content nor
                    your posting, uploading, publication, submission or transmittal of the User Content or our use of
                    the User Content (or any portion thereof) on, through or by means of the Services will infringe,
                    misappropriate or violate a third party’s patent, copyright, trademark, trade secret, moral rights
                    or other intellectual property rights, or rights of publicity or privacy, or result in the violation
                    of any applicable law or regulation.
                  </li>
                </ul>

                <h3>Warranty</h3>
                <ul>
                  <li>
                    The Services are provided ‘as is‘, without warranties of any kind, whether express or implied,
                    including, but not limited to, implied warranties of merchantability and fitness for a particular
                    purpose, to the fullest extent permitted by law.
                  </li>
                  <li>
                    Without prejudice to the generality of the foregoing paragraph, we do not warrant that:
                    <ul>
                      <li>
                        the Services will be constantly available, or available at all, or error-free or free from
                        viruses; or
                      </li>
                      <li>
                        the Content (including any medical information) is complete, true, accurate or non-misleading.
                      </li>
                    </ul>
                  </li>
                  <li>
                    The information (including any medical information) on the Services is provided “as is” without any
                    representations or warranties, express or implied. We make no representations or warranties in
                    relation to the medical information on the Services. Nothing in the Services constitutes, or is
                    meant to constitute, medical advice of any kind. If you require advice in relation to any medical
                    matter you should consult an appropriate medical professional.
                  </li>
                  <li>
                    You must not rely on the information on the Services as an alternative to medical advice from your
                    doctor or other professional healthcare provider.
                  </li>
                  <li>
                    If you have any specific questions about any medical matter you should consult your doctor or other
                    professional healthcare provider.
                  </li>
                  <li>
                    If you think you may be suffering from any medical condition you should seek immediate medical
                    attention.
                  </li>
                  <li>
                    You should never delay seeking medical advice, disregard medical advice, or discontinue medical
                    treatment because of information on this Site.
                  </li>
                  <li>
                    The Services may at times contain links to other websites. We are not responsible for the privacy
                    policies or practices of any third party.
                  </li>
                </ul>

                <h3>Limitation of Liability</h3>
                <ul>
                  <li>
                    We will not be liable to you (whether under contract, tort (including negligence), for breach of
                    statutory duty or otherwise) in relation to the Services:
                    <ul>
                      <li>to the extent that the Services are provided free-of-charge, for any direct loss;</li>
                      <li>for any indirect, special or consequential loss; or</li>
                      <li>
                        for any loss of business, loss of revenue, income, profits or anticipated savings, loss of
                        contracts or business relationships, loss of reputation or goodwill, or loss or corruption of
                        information or data.
                      </li>
                    </ul>
                  </li>
                  <li>
                    These limitations of liability apply even if we had knowledge of, or had been expressly advised of,
                    the potential loss in advance.
                  </li>
                  <li>
                    Subject to clause 5, if you have paid for access to the Services our total liability in respect of
                    these Terms of Use (including under contract, tort (including negligence), for breach of statutory
                    duty or otherwise) shall be limited to the charges paid and payable by you in the twelve-month
                    period prior to the relevant cause of action arising.
                  </li>
                  <li>
                    Subject to clause 5, to the extent that you are accessing the Services free of charge our total
                    liability in contract, tort (including negligence), for breach of statutory duty or otherwise
                    howsoever arising) shall be zero. Your sole remedy shall be to discontinue your use of the Services.
                  </li>
                  <li>
                    Nothing in these Terms of Use will limit any of our liabilities:
                    <ul>
                      <li>for death or personal injury caused by our negligence;</li>
                      <li>for fraud or fraudulent misrepresentation; or</li>
                      <li>
                        in respect of any matter which it would be illegal or unlawful for us to exclude or limit, or to
                        attempt or purport to exclude or limit.
                      </li>
                    </ul>
                  </li>
                  <li>
                    By using the Services, you agree that the exclusions and limitations of liability set out in these
                    Terms of Use are reasonable. If you do not think they are reasonable, you must not use the Services.
                  </li>
                  <li>
                    You agree that you will not bring any claim personally against our officers or employees in respect
                    of any losses you suffer in connection with the Services.
                  </li>
                  <li>
                    Any cause of action or claim you may have with respect to the Services (including but not limited to
                    the purchase of our products or services) must be commenced within one year of the cause of action
                    arising.
                  </li>
                </ul>

                <h3>Indemnity</h3>
                <ul>
                  <li>
                    You agree to indemnify, defend, and hold harmless us, our officers, directors, employees, agents,
                    licensor and suppliers (collectively the “Service Providers”) from and against all losses, expenses,
                    damages and costs, including reasonable legal and accounting fees, resulting from any violation of
                    these Terms of Use or any activity relating to your User Content and/or Account (including
                    negligence or wrongful conduct) by you or any other person accessing the Site and/or arising out of,
                    or in any way connected with, your access to or use of the Services.
                  </li>
                </ul>

                <h3>Assignment</h3>
                <ul>
                  <li>
                    We may transfer, sub-contract or otherwise deal with our rights and/or obligations under these Terms
                    of Use without notifying you or obtaining your consent.
                  </li>
                  <li>
                    You may not transfer, sub-contract or otherwise deal with your rights and/or obligations under these
                    Terms of Use.
                  </li>
                </ul>

                <h3>Severability</h3>
                <ul>
                  <li>
                    If a provision of these Terms of Use is determined by any court or other competent authority to be
                    unlawful and/or unenforceable, the other provisions will continue in effect. If any unlawful and/or
                    unenforceable provision would be lawful or enforceable if part of it were deleted, that part will be
                    deemed to be deleted, and the rest of the provision will continue in effect
                  </li>
                </ul>

                <h3>Entire Agreement</h3>
                <ul>
                  <li>
                    These Terms of Use, and any updates thereof, and any other terms posted on the Site from time to
                    time, constitute the entire agreement between you and us in relation to your use of the Services and
                    supersedes all previous agreements in respect of your use of the Services.
                  </li>
                </ul>

                <h3>Links and Communication</h3>
                <ul>
                  <li>
                    The Services may contain links to, or direct you to, third-party websites or resources. You
                    acknowledge and agree that we are not responsible or liable for: (i) the availability, quality,
                    delivery or accuracy of such websites or resources; or (ii) the content, products, or services on or
                    available from such websites or resources. Links to such websites or resources do not imply any
                    endorsement by us of such websites or resources or the content, products, or services available from
                    such websites or resources. You acknowledge sole responsibility for and assume all risk arising from
                    your use of any such websites or resources. We will under no circumstances be liable for any direct,
                    indirect, incidental or special loss or other damage, whether arising from negligence, breach of
                    contract, defamation, infringement of copyright or other intellectual property rights, caused by the
                    exhibition, distribution or exploitation of any information or content contained within these third
                    party websites.
                  </li>
                  <li>
                    You are solely responsible for all of your communications and interactions with other users of the
                    Services and with other persons with whom you communicate or interact as a result of your use of the
                    Services. You understand that we do not screen or inquire into the background of any users of the
                    Services, nor do we make any attempt to verify the statements of users of the Services. We make no
                    representations or warranties as to the conduct of users of the Services or their compatibility with
                    any current or future users of the Services. You agree to take reasonable precautions in all
                    communications and interactions with other users of the Services and with other persons with whom
                    you communicate or interact as a result of your use of the Services, particularly if you decide to
                    meet offline or in person.
                  </li>
                </ul>

                <h3>Notices</h3>
                <ul>
                  <li>
                    You consent to the use of: (i) electronic means to complete these Terms of Use and to deliver any
                    notices or other communications permitted or required hereunder; and (ii) electronic records to
                    store information related to these Terms of Use or your use of the Services. Any notices or other
                    communications permitted or required hereunder, including those regarding modifications to these
                    Terms of Use, will be in writing and given: (x) by us via email (in each case to the address that
                    you provide) or (y) by posting to the Site. For notices made by e-mail, the date of receipt will be
                    deemed the date on which such notice is transmitted.
                  </li>
                </ul>

                <h3>Governing Law and Jurisdiction</h3>
                <ul>
                  <li>
                    These Terms of Use and any action related thereto will be governed by the laws of the England and
                    Wales without regard to its conflict of laws provisions and each of the parties hereto consent to
                    the exclusive jurisdiction of the English courts.
                  </li>
                </ul>

                <h3>Feedback and questions</h3>
                <ul>
                  <li>
                    We welcome and encourage you to provide feedback, comments and suggestions for improvements to the
                    Services (“Feedback“). You may submit Feedback, or questions relating to these Terms of Use, by
                    emailing us at <a href="mailto:team@remelife.com">team@remelife.com</a>. You acknowledge and agree
                    that all Feedback will be the sole and exclusive property of us and you hereby irrevocably assign to
                    us and agree to irrevocably assign to us all of your right, title, and interest in and to all
                    Feedback, including without limitation all worldwide patent rights, copyright rights, trade secret
                    rights, and other proprietary or intellectual property rights therein. At our request and expense,
                    you will execute documents and take such further acts as we may reasonably request to assist us to
                    acquire, perfect, and maintain its intellectual property rights and other legal protections for the
                    Feedback.
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
