"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Eye, Image as ImageIcon, AlertCircle, X } from "lucide-react"

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
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)

  // Process image URL to handle uploaded images
  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl || imageUrl.trim() === '') {
      return null
    }
    
    // If it's already a full URL, use it as is
    if (imageUrl.startsWith('http')) {
      return imageUrl
    }
    
    // If it's a relative path (uploaded image), make it absolute
    if (imageUrl.startsWith('/uploads/') || imageUrl.startsWith('uploads/')) {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      return imageUrl.startsWith('/') ? `${baseUrl}${imageUrl}` : `${baseUrl}/${imageUrl}`
    }
    
    // If it's a relative path, assume it's from the same domain
    return imageUrl
  }

  const processedImageUrl = getImageUrl(article.image)

  // Check if image is from our uploads
  const isUploadedImage = processedImageUrl && (
    processedImageUrl.includes('/uploads/') || 
    processedImageUrl.includes('uploads/')
  )

  const handleImageClick = () => {
    if (processedImageUrl && !imageError) {
      setShowImageModal(true)
    }
  }

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showImageModal) {
        setShowImageModal(false)
      }
    }

    if (showImageModal) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [showImageModal])

  const renderImageContent = () => {
    if (imageError || !processedImageUrl) {
      return (
        <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex flex-col items-center justify-center text-slate-400">
          <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
          <span className="text-xs text-center">No Image</span>
        </div>
      )
    }

    return (
      <>
        <Image
          src={processedImageUrl}
          alt={article.title}
          fill
          className={`object-cover transition-all duration-300 ${
            imageLoading ? 'scale-110 blur-sm' : 'group-hover:scale-105'
          }`}
          onLoad={() => setImageLoading(false)}
          onError={() => {
            setImageError(true)
            setImageLoading(false)
          }}
        />
        {imageLoading && (
          <div className="absolute inset-0 bg-slate-800/50 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary-accent/30 border-t-primary-accent rounded-full animate-spin" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Image overlay info */}
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {isUploadedImage ? '📤 Uploaded' : '📷 Click to view'}
        </div>
      </>
    )
  }

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="bg-[#211D35] rounded-2xl overflow-hidden group cursor-pointer border border-transparent hover:border-primary-accent/50 flex flex-col card-shadow"
      >
        <div 
          className="relative w-full aspect-[16/10] cursor-pointer"
          onClick={handleImageClick}
        >
          {renderImageContent()}
        </div>
        
        <div className="p-4 text-left flex flex-col flex-grow">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs px-2 py-1 bg-primary-accent/20 text-primary-accent rounded-full font-medium">
              {article.category}
            </span>
          </div>
          
          <h3 className="font-bold text-heading-text text-base leading-tight mb-2 group-hover:drop-shadow-text-enhanced transition-all duration-300">
            {article.title}
          </h3>
          
          <p className="text-soft-text/80 text-xs mb-4 flex-grow">
            {article.description}
          </p>
          
          <div className="flex justify-between items-center mt-auto">
            <div className="flex items-center gap-2 text-xs text-soft-text/60">
              <Eye className="w-3 h-3" />
              <span>View Article</span>
            </div>
            
            <div className="w-7 h-7 rounded-full bg-yellow-400/20 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <span className="text-yellow-400 text-xs font-bold drop-shadow-sm">R</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Image Modal */}
      {showImageModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setShowImageModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-4xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-primary-accent transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="relative w-full h-full">
              <Image
                src={processedImageUrl!}
                alt={article.title}
                width={800}
                height={600}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 rounded-b-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-1 bg-primary-accent/80 text-white rounded-full font-medium">
                  {article.category}
                </span>
                {isUploadedImage && (
                  <span className="text-xs px-2 py-1 bg-green-500/80 text-white rounded-full font-medium">
                    📤 Uploaded
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-lg mb-1">{article.title}</h3>
              <p className="text-sm text-gray-300">{article.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
