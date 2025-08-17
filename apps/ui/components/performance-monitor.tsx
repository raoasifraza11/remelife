"use client"

import React, { useEffect, useRef } from 'react'

interface PerformanceMetrics {
  fcp?: number
  lcp?: number
  fid?: number
  cls?: number
  ttfb?: number
  renderCount: number
}

export function PerformanceMonitor() {
  const renderCountRef = useRef(0)
  const lastRenderTime = useRef(Date.now())

  // Track component re-renders
  useEffect(() => {
    renderCountRef.current += 1
    const now = Date.now()
    const timeSinceLastRender = now - lastRenderTime.current
    
    if (timeSinceLastRender < 100) { // Less than 100ms between renders
      console.warn(`🚨 Potential excessive re-rendering detected! Render #${renderCountRef.current} after ${timeSinceLastRender}ms`)
    }
    
    lastRenderTime.current = now
    
    // Log render info in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔄 Component rendered #${renderCountRef.current} times`)
    }
  })

  useEffect(() => {
    // Only run in production and if performance API is available
    if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined') {
      return
    }

    const metrics: PerformanceMetrics = {
      renderCount: 0
    }

    // Core Web Vitals monitoring
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              metrics.fcp = entry.startTime
              console.log(`🎨 First Contentful Paint: ${entry.startTime.toFixed(2)}ms`)
            }
            break
          case 'largest-contentful-paint':
            metrics.lcp = entry.startTime
            console.log(`🖼️ Largest Contentful Paint: ${entry.startTime.toFixed(2)}ms`)
            break
          case 'first-input':
            metrics.fid = (entry as any).processingStart - entry.startTime
            console.log(`⚡ First Input Delay: ${metrics.fid.toFixed(2)}ms`)
            break
          case 'layout-shift':
            if (!(entry as any).hadRecentInput) {
              metrics.cls = (metrics.cls || 0) + (entry as any).value
              console.log(`📐 Cumulative Layout Shift: ${metrics.cls?.toFixed(4) || 0}`)
            }
            break
        }
      }
    })

    // Observe Core Web Vitals
    try {
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] })
    } catch (e) {
      // Fallback for browsers that don't support all entry types
      console.log('Performance monitoring partially supported')
    }

    // Navigation timing
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navigationEntry) {
      metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart
      console.log(`🌐 Time to First Byte: ${metrics.ttfb.toFixed(2)}ms`)
    }

    // Memory usage monitoring
    if ('memory' in performance) {
      const memory = (performance as any).memory
      console.log(`💾 Memory Usage: ${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB / ${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)}MB`)
    }

    // Monitor for excessive re-renders
    let renderCount = 0
    const originalRender = React.Component.prototype.render
    
    // This is a development-only feature
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Performance monitoring enabled - watching for excessive re-renders')
    }

    return () => {
      try {
        observer.disconnect()
      } catch (e) {
        // Ignore disconnect errors
      }
    }
  }, [])

  // Don't render anything visible
  return null
}
