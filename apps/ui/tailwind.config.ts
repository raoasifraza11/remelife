import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Satoshi", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
        satoshi: ["Satoshi", "sans-serif"], // Added Satoshi
      },
      colors: {
        /* --- Custom Palette --- */
        "background-start": "#000000",
        "background-end": "#000000",
        "primary-accent": "#A855F7", // vibrant purple
        "secondary-accent": "#6366F1", // vibrant indigo
        "glass-stroke": "rgba(255, 255, 255, 0.1)",
        "glass-fill": "rgba(22, 19, 38, 0.4)",
        "soft-text": "#F9FAFB", // even lighter grey
        "heading-text": "#FFFFFF",

        /* keep shadcn-ui compatibility */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      /* --- Animations & Keyframes --- */
      keyframes: {
        "shine-pulse": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "vibrant-glow": {
          "0%,100%": { filter: "drop-shadow(0 0 6px var(--glow-color))" },
          "50%": { filter: "drop-shadow(0 0 20px var(--glow-color))" },
        },
      },
      animation: {
        "shine-pulse": "shine-pulse 2s linear infinite",
        "infinite-scroll": "infinite-scroll 35s linear infinite",
        "vibrant-glow": "vibrant-glow 3.5s ease-in-out infinite",
      },

      boxShadow: {
        "soft-glow": "0 0 80px -10px var(--glow-color, #A855F7), 0 0 40px -5px var(--glow-color, #A855F7)",
        "soft-layer": "0 8px 32px rgba(168, 85, 247, 0.15), 0 4px 16px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)",
        "button-glow": "0 0 40px -5px var(--glow-color, #A855F7), 0 0 20px -2px var(--glow-color, #A855F7)",
        "card-elevated": "0 12px 48px rgba(168, 85, 247, 0.2), 0 6px 24px rgba(0, 0, 0, 0.5)",
        "text-glow": "0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.4)",
      },
      dropShadow: {
        "icon-glow": [
          "0 0 20px rgba(168, 85, 247, 0.8)",
          "0 0 40px rgba(168, 85, 247, 0.4)",
          "0 4px 8px rgba(0, 0, 0, 0.3)",
        ],
        "text-enhanced": ["0 0 10px rgba(255, 255, 255, 0.8)", "0 2px 4px rgba(0, 0, 0, 0.5)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")],
}

export default config
