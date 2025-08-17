import Image from "next/image"
import { cn } from "@/lib/utils"

type Logo = {
  src: string
  alt: string
}

interface LogoCarouselProps {
  logos: Logo[]
  className?: string
}

/**
 * A seamless, infinite scrolling carousel of logos.
 * It duplicates the logo set and animates the container using transform for a smooth, continuous loop.
 */
export function LogoCarousel({ logos, className }: LogoCarouselProps) {
  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden whitespace-nowrap [mask-image:_linear-gradient(to_right,transparent_0,_black_48px,_black_calc(100%-48px),transparent_100%)] sm:[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]",
        className,
      )}
    >
      {/* The seamless scrolling track, achieved by duplicating the logos */}
      <div className="flex w-max animate-infinite-scroll group-hover:[animation-play-state:paused] will-change-transform">
        {/* Render the logos twice */}
        {[...logos, ...logos].map((logo, idx) => (
          <div key={`${logo.alt}-${idx}`} className="flex-shrink-0 w-auto mx-4 sm:mx-8">
            <Image
              src={logo.src || "/placeholder.svg"}
              alt={logo.alt}
              width={160}
              height={80}
              className="h-16 w-auto object-contain transition-opacity duration-300 opacity-80 group-hover:opacity-100"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
