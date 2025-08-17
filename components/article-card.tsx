"use client"

import Image from "next/image"
import { motion } from "framer-motion"

type Article = {
  title: string
  description: string
  image: string
  category: string
}

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-[#211D35] rounded-2xl overflow-hidden group cursor-pointer border border-transparent hover:border-primary-accent/50 flex flex-col card-shadow"
    >
      <div className="relative w-full aspect-[16/10]">
        <Image
          src={article.image || "/placeholder.svg"}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4 text-left flex flex-col flex-grow">
        <h3 className="font-bold text-heading-text text-base leading-tight mb-2 group-hover:drop-shadow-text-enhanced transition-all duration-300">
          {article.title}
        </h3>
        <p className="text-soft-text/80 text-xs mb-4 flex-grow">{article.description}</p>
        <div className="flex justify-end mt-auto">
          <div className="w-7 h-7 rounded-full bg-yellow-400/20 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
            <span className="text-yellow-400 text-xs font-bold drop-shadow-sm">R</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
