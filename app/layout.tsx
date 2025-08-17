import React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { ScrollToTop } from "@/components/scroll-to-top"
import { PerformanceMonitor } from "@/components/performance-monitor"

export const metadata: Metadata = {
  title: "ReMeLife - A New Way to Care",
  description: "Welcome to the community that cares. Get rewarded for your daily care actions with ReMeLife.",
  icons: {
    icon: [
      {
        url: "/favicons/favicon-used-in-browser-tabs-normal-modern-40x40.webp",
        sizes: "40x40",
        type: "image/webp",
      },
      {
        url: "/favicons/favicon-used-as-windows-shortcut-icon-48x48.webp",
        sizes: "48x48",
        type: "image/webp",
      },
    ],
    apple: [
      {
        url: "/favicons/favicon-used-for-iphone-home-screen-shortcut-180x180.webp",
        sizes: "180x180",
        type: "image/webp",
      },
    ],
    other: [
      {
        rel: "icon",
        url: "/favicons/favicon-used-in-browser-tabs-normal-modern-40x40.webp",
        sizes: "40x40",
        type: "image/webp",
      },
      {
        rel: "icon",
        url: "/favicons/favicon-used-as-windows-shortcut-icon-48x48.webp",
        sizes: "48x48",
        type: "image/webp",
      },
      {
        rel: "apple-touch-icon",
        url: "/favicons/favicon-used-for-iphone-home-screen-shortcut-180x180.webp",
        sizes: "180x180",
        type: "image/webp",
      },
      {
        rel: "icon",
        url: "/favicons/favicon-used-for-android-home-screen-shortcut-192x192.webp",
        sizes: "192x192",
        type: "image/webp",
      },
      {
        rel: "icon",
        url: "/favicons/favicon-used-for-pwa-or-large-display-512x512.webp",
        sizes: "512x512",
        type: "image/webp",
      },
    ],
  },
  // Add meta visuals for social sharing later
  // openGraph: {
  //   title: 'ReMeLife - A New Way to Care',
  //   description: 'Welcome to the community that cares.',
  //   images: [
  //     {
  //       url: '/og-image.png',
  //       width: 1200,
  //       height: 630,
  //       alt: 'ReMeLife Platform',
  //     },
  //   ],
  // },
  generator: 'v0.dev'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

const RootLayout = React.memo(({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  // Memoize the head content to prevent unnecessary re-renders
  const headContent = React.useMemo(() => {
    const version = Date.now(); // Cache busting
    return (
      <>
        {/* Critical resource preloading for performance */}
        {/* Preload critical images */}
        <link rel="preload" href="/remelife-logo.webp" as="image" type="image/webp" />
        <link rel="preload" href="/favicons/favicon-used-in-browser-tabs-normal-modern-40x40.webp" as="image" type="image/webp" />
        
        {/* Additional favicon links for better browser compatibility */}
        <link rel="icon" type="image/webp" sizes="40x40" href={`/favicons/favicon-used-in-browser-tabs-normal-modern-40x40.webp?v=${version}`} />
        <link rel="icon" type="image/webp" sizes="48x48" href={`/favicons/favicon-used-as-windows-shortcut-icon-48x48.webp?v=${version}`} />
        <link rel="apple-touch-icon" type="image/webp" sizes="180x180" href={`/favicons/favicon-used-for-iphone-home-screen-shortcut-180x180.webp?v=${version}`} />
        <link rel="icon" type="image/webp" sizes="192x192" href={`/favicons/favicon-used-for-android-home-screen-shortcut-192x192.webp?v=${version}`} />
        <link rel="icon" type="image/webp" sizes="512x512" href={`/favicons/favicon-used-for-pwa-or-large-display-512x512.webp?v=${version}`} />
        
        {/* Legacy favicon support and cache busting */}
        <link rel="shortcut icon" href={`/favicons/favicon-used-in-browser-tabs-normal-modern-40x40.webp?v=${version}`} />
        <link rel="icon" href={`/favicons/favicon-used-in-browser-tabs-normal-modern-40x40.webp?v=${version}`} />
        
        {/* Prevent caching of old favicon files */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        
        <link rel="manifest" href="/manifest.json" />
      </>
    );
  }, [])

  return (
    <html lang="en" className="dark">
      <head>
        {headContent}
      </head>
      <body className={`font-sans antialiased`}>
        <PerformanceMonitor />
        <ScrollToTop />
        {children}
      </body>
    </html>
  )
})

RootLayout.displayName = 'RootLayout'

export default RootLayout
