import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Heart, Sparkles, Star, ArrowLeft, ArrowRight, Play, Pause, ImageIcon, Loader } from 'lucide-react'

interface LayerProps {
  onNext: () => void
  onPrev: () => void
  currentLayer: number
  totalLayers: number
}

const carouselImages = [
  '/src/assets/images/prachi9.jpg',
  '/src/assets/images/prachi2.jpg',
  '/src/assets/images/prachi7.jpg',
  '/src/assets/images/prachi10.jpg'
]

const messages = [
  {
    title: "A Sister Like No Other",
    message: "From first day memories until now, you've been my constant source of joy and inspiration. Every moment with you is a treasure I hold close to my heart.",
    quote: "Having you as my sister makes every day brighter",
    icon: Heart,
    gradient: "from-pink-500 to-rose-500"
  },
  {
    title: "Your Strength Shines Bright",
    message: "I've watched you face every challenge with grace and courage. Your resilience and determination make me incredibly proud to call you my sister.",
    quote: "Strong, brave, and absolutely unstoppable",
    icon: Star,
    gradient: "from-purple-500 to-indigo-500"
  },
  {
    title: "Making the World Better",
    message: "Your kindness touches everyone you meet. The way you care, love, and support others makes this world a more beautiful place.",
    quote: "A heart of gold wrapped in beautiful smiles",
    icon: Sparkles,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Forever By Your Side",
    message: "No matter where life takes us, remember that I'll always be your biggest cheerleader. Together, we can achieve anything!",
    quote: "Sisters by blood, best friends by choice forever",
    icon: Heart,
    gradient: "from-emerald-500 to-teal-500"
  }
]

export default function Carousel({ onNext, onPrev }: LayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [imageLoaded, setImageLoaded] = useState<boolean[]>(new Array(carouselImages.length).fill(false))

  useEffect(() => {
    // Preload images
    carouselImages.forEach((src, index) => {
      const img = new Image()
      img.onload = () => {
        setImageLoaded(prev => {
          const newState = [...prev]
          newState[index] = true
          return newState
        })
      }
      img.src = src
    })
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  const CurrentIcon = messages[currentIndex].icon

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-900 to-black">
      {/* Navigation buttons */}
      <div className="absolute top-6 left-6 z-30 flex gap-3">
        <button 
          onClick={onPrev} 
          className="px-5 py-2.5 bg-black/30 backdrop-blur-md rounded-full shadow-lg hover:bg-black/50 transition-all duration-300 flex items-center gap-2 text-white font-medium border border-white/20"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button 
          onClick={onNext} 
          className="px-5 py-2.5 bg-black/30 backdrop-blur-md rounded-full shadow-lg hover:bg-black/50 transition-all duration-300 flex items-center gap-2 text-white font-medium border border-white/20"
        >
          Next <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Controls */}
      <div className="absolute top-6 right-6 z-30 flex gap-3">
        <button 
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="p-2.5 bg-black/30 backdrop-blur-md rounded-full shadow-lg hover:bg-black/50 transition-all duration-300 text-white border border-white/20"
        >
          {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <div className="bg-black/30 backdrop-blur-md px-5 py-2.5 rounded-full font-semibold text-white border border-white/20">
          {currentIndex + 1} / {carouselImages.length}
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
        {carouselImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex 
                ? 'w-16 h-1.5 bg-gradient-to-r from-pink-500 to-rose-500' 
                : 'w-2 h-1.5 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Main carousel */}
      <div className="relative w-full h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Background with gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${messages[currentIndex].gradient} opacity-90`} />
            
            {/* Background Image with loader */}
            {!imageLoaded[currentIndex] && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <Loader className="w-12 h-12 text-white animate-spin" />
              </div>
            )}
            
            <div 
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
                imageLoaded[currentIndex] ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${carouselImages[currentIndex]})` }}
            />
            
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="relative z-20 flex items-center justify-center min-h-screen">
              <div className="max-w-4xl mx-auto px-6 text-center">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="mb-8"
                >
                  <div className="inline-flex p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <CurrentIcon className="w-10 h-10 text-white" />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif"
                >
                  {messages[currentIndex].title}
                </motion.h2>

                {/* Main message */}
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 max-w-3xl mx-auto"
                >
                  {messages[currentIndex].message}
                </motion.p>

                {/* Quote */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="space-y-4"
                >
                  <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto" />
                  <p className="text-lg md:text-xl text-pink-200 italic">
                    "{messages[currentIndex].quote}"
                  </p>
                  <div className="flex justify-center gap-2">
                    {[...Array(3)].map((_, i) => (
                      <Sparkles key={i} className="w-5 h-5 text-yellow-300 animate-pulse" />
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}