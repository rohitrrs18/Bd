import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface LayerProps {
  onNext: () => void
  onPrev: () => void
  currentLayer: number
  totalLayers: number
}

// Import background image
import bgImage from '../assets/images/prachi9.jpg'

export default function SplashScreen({ onNext }: LayerProps) {
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Image with blur effect only */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bgImage} 
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Just blur overlay - no pink/purple effects */}
        <div className="absolute inset-0 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden z-10">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/60 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{
              scale: [0, 2, 0],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`float-${i}`}
            className="absolute text-3xl opacity-30"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: -100
            }}
            animate={{ 
              y: window.innerHeight + 100,
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth
              ],
              rotate: 360
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 15,
              ease: "linear"
            }}
          >
            {['✨', '💫', '⭐', '🌟', '💜', '🌸', '🦋', '🌹', '💝', '🎀'][Math.floor(Math.random() * 10)]}
          </motion.div>
        ))}
      </div>

      {/* Glowing orb effect */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 z-10"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, -100, 0],
          y: [0, -50, 50, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)"
        }}
      />

      {/* Main content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        className="text-center z-20 px-4 max-w-4xl mx-auto"
      >
        {/* Decorative ring */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative mb-8"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 rounded-full border-2 border-white/30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute w-40 h-40 rounded-full border border-white/20"
            />
          </div>
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative text-8xl md:text-9xl"
          >
            💜
          </motion.div>
        </motion.div>

        {/* Name with glow effect */}
        <motion.h1 
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            background: "linear-gradient(135deg, #fff 0%, #f0f0f0 50%, #fff 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            textShadow: "0 0 30px rgba(255,255,255,0.3)",
            fontFamily: "'Playfair Display', serif"
          }}
        >
          Prachi
        </motion.h1>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-6"
        />

        {/* Subtitle */}
        <motion.p 
          className="text-xl md:text-2xl text-white/90 mb-4 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          A Celebration of Love & Light
        </motion.p>

        {/* Main content that appears after delay */}
        <AnimatePresence>
          {showText && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="space-y-8 mt-8"
            >
              {/* Badges */}
              <div className="flex flex-wrap gap-3 justify-center">
                {['Beloved Sister', 'Precious Daughter', 'Dear Friend', 'Akka'].map((title, idx) => (
                  <motion.span
                    key={title}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1 + idx * 0.1, type: "spring" }}
                    className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm md:text-base font-medium border border-white/30 shadow-lg"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {title}
                  </motion.span>
                ))}
              </div>

              {/* Heartfelt quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="space-y-2"
              >
                <div className="flex justify-center gap-1 text-2xl">
                  <span className="text-white/50">“</span>
                  <span className="text-white/50">“</span>
                </div>
                <p className="text-lg md:text-xl text-white/90 font-light italic max-w-2xl mx-auto leading-relaxed">
                  My World, My Lovely Sis - You make every day brighter just by being you
                </p>
                <div className="flex justify-center gap-1 text-2xl">
                  <span className="text-white/50">”</span>
                  <span className="text-white/50">”</span>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="group relative mt-8 px-10 py-4 bg-white rounded-full font-semibold text-purple-600 shadow-2xl transition-all duration-300 text-lg overflow-hidden"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {/* Button background animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative flex items-center gap-2">
                  Begin the Journey
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    ✨
                  </motion.span>
                </span>
              </motion.button>

              {/* Decorative footer text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.6 }}
                className="text-white/40 text-sm mt-8"
              >
                A special tribute to someone extraordinary
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute bottom-8 left-8 text-white/30 text-xl z-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          💫
        </motion.div>
      </div>
      <div className="absolute top-8 right-8 text-white/30 text-xl z-20">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          ✨
        </motion.div>
      </div>
      <div className="absolute bottom-8 right-8 text-white/20 text-sm z-20">
        🌸
      </div>
      <div className="absolute top-8 left-8 text-white/20 text-sm z-20">
        💜
      </div>
    </div>
  )
}