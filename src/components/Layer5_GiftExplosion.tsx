import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

// Import local images
import img1 from '../assets/images/prachi13.jpg'
import img2 from '../assets/images/prachi12.jpg'
import img3 from '../assets/images/prachi3.jpg'
import img4 from '../assets/images/prachi4.jpg'
import img5 from '../assets/images/prachi5.jpg'
import img6 from '../assets/images/prachi6.jpg'

interface LayerProps {
  onNext: () => void
  onPrev: () => void
  currentLayer: number
  totalLayers: number
}

export default function GiftExplosion({ onNext, onPrev, currentLayer, totalLayers }: LayerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([])
  const [showSparkles, setShowSparkles] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const allPhotos = [img1, img2, img3, img4, img5, img6]

  const messages = [
    "Every memory with you is a treasure 💎",
    "You make my world brighter ✨",
    "Grateful for you every single day 💝",
    "Sisters by heart, friends forever 💜"
  ]

  const handleOpen = () => {
    setIsOpen(true)
    setShowSparkles(true)
    
    // Randomly select 4 photos for the gift
    const shuffled = [...allPhotos].sort(() => 0.5 - Math.random())
    setSelectedPhotos(shuffled.slice(0, 4))
    
    // Show sparkles for 2 seconds
    setTimeout(() => setShowSparkles(false), 2000)
    
    // Show message after photos appear
    setTimeout(() => setShowMessage(true), 800)
  }

  // Auto-rotate through photos
  useEffect(() => {
    if (isOpen && selectedPhotos.length > 0) {
      const interval = setInterval(() => {
        setCurrentPhotoIndex((prev) => (prev + 1) % selectedPhotos.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isOpen, selectedPhotos])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50">
      
      {/* Elegant background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #9b59b6 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Floating hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: -50
            }}
            animate={{ 
              y: window.innerHeight + 50,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
          >
            {['💜', '💝', '💕', '💖', '💗', '💓'][Math.floor(Math.random() * 6)]}
          </motion.div>
        ))}
      </div>

      {/* Progress & Navigation */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-4 bg-white/80 backdrop-blur-md rounded-full px-6 py-2 shadow-lg">
        <div className="text-sm font-medium text-rose-600">
          {currentLayer} of {totalLayers}
        </div>
        <div className="w-32 h-1.5 bg-rose-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full"
            initial={{ width: `${(currentLayer / totalLayers) * 100}%` }}
            animate={{ width: `${(currentLayer / totalLayers) * 100}%` }}
          />
        </div>
      </div>

      <button 
        onClick={onPrev} 
        className="fixed top-6 left-6 z-20 px-5 py-2 bg-white/80 backdrop-blur-md rounded-full shadow-md text-rose-600 font-medium hover:bg-white transition-all border border-rose-200"
      >
        ← Back
      </button>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          // Elegant Gift Box
          <motion.div
            key="gift"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleOpen}
            className="cursor-pointer text-center group"
          >
            <div className="relative inline-block">
              {/* Subtle glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-400 rounded-2xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              
              {/* Gift Box */}
              <motion.div 
                className="relative"
                animate={{ 
                  y: [0, -8, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-48 h-48 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl shadow-2xl relative overflow-hidden">
                  {/* Ribbon horizontal */}
                  <div className="absolute top-1/2 left-0 w-full h-6 bg-rose-300 transform -translate-y-1/2" />
                  {/* Ribbon vertical */}
                  <div className="absolute left-1/2 top-0 w-6 h-full bg-rose-300 transform -translate-x-1/2" />
                  {/* Ribbon bow */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-12 h-8 bg-rose-400 rounded-t-full -rotate-12 absolute -left-6" />
                    <div className="w-12 h-8 bg-rose-400 rounded-t-full rotate-12 absolute -right-6" />
                    <div className="w-5 h-5 bg-rose-500 rounded-full absolute top-1 left-1/2 transform -translate-x-1/2" />
                  </div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6"
              >
                <h2 className="text-2xl font-serif font-bold text-rose-700 mb-2">
                  A Gift For You
                </h2>
                <p className="text-gray-500 text-sm">Tap to open ✨</p>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          // Beautiful Memories Display
          <motion.div
            key="memories"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto text-center"
          >
            {/* Title */}
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-10"
            >
              <h1 className="text-5xl md:text-6xl font-serif font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 bg-clip-text text-transparent">
                Beautiful Memories
              </h1>
              <div className="flex justify-center gap-2 mt-3">
                <span className="text-rose-400">✦</span>
                <span className="text-rose-400">✦</span>
                <span className="text-rose-400">✦</span>
              </div>
            </motion.div>

            {/* Featured Photo - Elegant Frame */}
            {selectedPhotos.length > 0 && (
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="relative mb-8 inline-block"
              >
                <div className="relative">
                  {/* Ornate frame */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-rose-200 via-amber-200 to-pink-200 rounded-2xl blur-sm" />
                  <div className="relative bg-white p-3 rounded-xl shadow-2xl">
                    <img
                      src={selectedPhotos[currentPhotoIndex]}
                      alt="Featured memory"
                      className="w-80 h-80 md:w-96 md:h-96 object-cover rounded-lg"
                    />
                    {/* Corner decorations */}
                    <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-rose-400" />
                    <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-rose-400" />
                    <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-rose-400" />
                    <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-rose-400" />
                  </div>
                </div>
                
                {/* Photo counter */}
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-rose-600 shadow-md">
                  {currentPhotoIndex + 1} / {selectedPhotos.length}
                </div>
              </motion.div>
            )}

            {/* Thumbnail gallery */}
            {selectedPhotos.length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center gap-3 mb-8"
              >
                {selectedPhotos.map((photo, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPhotoIndex(idx)}
                    className={`relative transition-all duration-300 ${
                      currentPhotoIndex === idx ? 'ring-2 ring-rose-400 ring-offset-2' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={photo}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Heartfelt Message */}
            <AnimatePresence>
              {showMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-6"
                >
                  <div className="inline-block bg-white/80 backdrop-blur-md rounded-2xl px-8 py-4 shadow-lg border border-rose-100">
                    <p className="text-xl md:text-2xl text-rose-700 font-serif italic">
                      "{messages[currentPhotoIndex % messages.length]}"
                    </p>
                  </div>

                  {/* Continue button */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onNext}
                      className="px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Continue to Next Chapter →
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading indicator while message appears */}
            {!showMessage && (
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-rose-400 text-sm"
              >
                ✨ Your memories are unfolding... ✨
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sparkle effect when opening */}
      <AnimatePresence>
        {showSparkles && (
          <div className="fixed inset-0 pointer-events-none z-30">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                animate={{ 
                  scale: [0, 1.5, 0],
                  x: (Math.random() - 0.5) * 200,
                  y: (Math.random() - 0.5) * 200,
                  opacity: [1, 0.5, 0]
                }}
                transition={{ duration: 1.5 }}
                className="absolute left-1/2 top-1/2"
              >
                <div className="text-3xl">✨</div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}