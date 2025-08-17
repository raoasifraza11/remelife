"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  opacity: number
  pulsePhase: number
}

interface ParticleFieldProps {
  className?: string
  particleCount?: number
  connectionDistance?: number
  enableConnections?: boolean
  colors?: string[]
  speed?: number
  enablePulse?: boolean
}

export function ParticleField({
  className = "",
  particleCount = 50,
  connectionDistance = 120,
  enableConnections = true,
  colors = ["rgba(168, 85, 247, 0.4)", "rgba(99, 102, 241, 0.3)", "rgba(236, 72, 153, 0.2)"],
  speed = 0.5,
  enablePulse = false,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          size: Math.random() * 3 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.5 + 0.2,
          pulsePhase: Math.random() * Math.PI * 2,
        })
      }
    }

    const updateParticles = () => {
      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        if (enablePulse) {
          particle.pulsePhase += 0.02
        }
      })
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)

        let opacity = particle.opacity
        if (enablePulse) {
          opacity *= 0.5 + 0.5 * Math.sin(particle.pulsePhase)
        }

        ctx.fillStyle = particle.color.replace(/[\d.]+\)$/g, `${opacity})`)
        ctx.fill()
      })

      if (enableConnections) {
        particlesRef.current.forEach((particle, i) => {
          particlesRef.current.slice(i + 1).forEach((otherParticle) => {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < connectionDistance) {
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              const opacity = (1 - distance / connectionDistance) * 0.2
              ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`
              ctx.lineWidth = 1
              ctx.stroke()
            }
          })
        })
      }
    }

    const animate = () => {
      updateParticles()
      drawParticles()
      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initParticles()
    animate()

    window.addEventListener("resize", () => {
      resizeCanvas()
      initParticles()
    })

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [particleCount, connectionDistance, enableConnections, colors, speed, enablePulse])

  return <canvas ref={canvasRef} className={`fixed inset-0 pointer-events-none ${className}`} style={{ zIndex: -1 }} />
}
