"use client"

import { motion } from "framer-motion"

const svgVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
}

const iconVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
}

const hoverVariants = {
  hover: {
    scale: 1.1,
    filter: "drop-shadow(0 0 8px rgba(200, 115, 242, 0.7))",
    transition: { duration: 0.3 },
  },
}

export function AnimatedCommunicationSVG() {
  return (
    <motion.div
      className="w-full h-full flex items-center justify-center p-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={svgVariants}
    >
      <motion.svg width="100%" height="100%" viewBox="0 0 256 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M64 80H104"
          stroke="#6A67F3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path
          d="M152 80H192"
          stroke="#6A67F3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
        />

        {/* Left Icon: Chat */}
        <motion.g variants={iconVariants} whileHover="hover">
          <motion.g variants={hoverVariants}>
            <rect x="16" y="56" width="48" height="48" rx="24" fill="#161326" />
            <path
              d="M31 74.8C31 72.5909 32.7909 70.8 35 70.8H41C43.2091 70.8 45 72.5909 45 74.8V74.8C45 77.0091 43.2091 78.8 41 78.8H35C32.7909 78.8 31 77.0091 31 74.8V74.8Z"
              fill="#C873F2"
            />
            <path d="M31 81.2H37" stroke="#A19CB0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </motion.g>
        </motion.g>

        {/* Center Icon: Video */}
        <motion.g variants={iconVariants} whileHover="hover">
          <motion.g variants={hoverVariants}>
            <rect x="104" y="56" width="48" height="48" rx="24" fill="#161326" />
            <path
              d="M118 74L125 70V86L118 82"
              stroke="#C873F2"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M131 74L138 70V86L131 82"
              stroke="#C873F2"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.g>
        </motion.g>

        {/* Right Icon: Phone */}
        <motion.g variants={iconVariants} whileHover="hover">
          <motion.g variants={hoverVariants}>
            <rect x="192" y="56" width="48" height="48" rx="24" fill="#161326" />
            <path
              d="M219.941 82.059C219.941 82.059 217.471 84.529 216 83.059C214.529 81.588 212.059 76.647 212.059 76.647C212.059 76.647 210.588 74.176 209.118 75.647C207.647 77.118 205.176 80.588 205.176 80.588L204.706 81.059C204.706 81.059 202.235 83.529 203.706 85C205.176 86.471 210.118 89.941 210.118 89.941C210.118 89.941 215.059 91.412 216.529 89.941C218 88.471 219.471 86.0001 219.471 86.0001L219.941 85.529C219.941 85.529 221.412 83.529 219.941 82.059Z"
              fill="#C873F2"
            />
          </motion.g>
        </motion.g>
      </motion.svg>
    </motion.div>
  )
}
