import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface LayerProps {
  onPrev: () => void
  currentLayer: number
  totalLayers: number
}

export default function FinalMessage({ onPrev }: LayerProps) {
  const [showMessages, setShowMessages] = useState(false)

  useEffect(() => {
    // Show messages after a short delay
    setTimeout(() => setShowMessages(true), 500)
  }, [])

  const loveMessages = [
    "I Love You",
    "You're My World",
    "My Chosen Sister",
    "Forever Grateful",
    "You Complete Me",
    "My Best Friend",
    "My Everything",
    "Forever & Always"
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100">
      
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
            'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
            'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
            'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              y: -100,
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1.2, 0],
              rotate: [0, 10, -10, 20, -20, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {['💜', '💝', '💕', '💖', '💗', '💓', '💘'][Math.floor(Math.random() * 7)]}
          </motion.div>
        ))}
      </div>

      {/* Falling sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-2xl"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: -50,
              opacity: 0
            }}
            animate={{ 
              y: window.innerHeight + 50,
              opacity: [0, 1, 0],
              rotate: 360
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* Navigation - Only Back button */}
      <div className="fixed top-6 left-6 z-20">
        <motion.button
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPrev}
          className="px-5 py-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-md text-rose-600 font-medium hover:bg-white transition-all border border-rose-200"
        >
          ← Back
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        
        {/* Animated text that appears */}
        <AnimatePresence>
          {showMessages && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Giant pulsing heart */}
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-9xl md:text-9xl mb-6"
              >
                💜
              </motion.div>

              {/* Main message */}
              <motion.h1 
                className="text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                I Love You
              </motion.h1>
              
              <motion.h2 
                className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, delay: 0.5, repeat: Infinity }}
              >
                Akka! 💜
              </motion.h2>

              {/* Divider with hearts */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex justify-center gap-3 my-6"
              >
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-3xl">💜</span>
                ))}
              </motion.div>

              {/* Love messages grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8"
              >
                {loveMessages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.4 + idx * 0.1, type: "spring" }}
                    className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md"
                  >
                    <span className="text-gray-700 font-medium">{msg}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Heart rain - lots of hearts */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="flex flex-wrap justify-center gap-2 my-6"
              >
                {[...Array(30)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 2 + i * 0.03, type: "spring" }}
                    className="text-2xl md:text-3xl inline-block"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    {['💜', '💝', '💕', '💖', '💗', '💓', '💘'][Math.floor(Math.random() * 7)]}
                  </motion.span>
                ))}
              </motion.div>

              {/* Special heartfelt message */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2.5, type: "spring" }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-2xl mx-auto"
              >
                <p className="text-xl md:text-2xl text-purple-800 font-serif italic leading-relaxed">
                  "From the first day we met, you became my sister, my confidant, my forever friend. 
                  Thank you for choosing me, for loving me, for being you. 
                  You'll always have a special place in my heart, Akka."
                </p>
                <div className="flex justify-center gap-3 mt-6">
                  <span className="text-3xl">💜</span>
                  <span className="text-3xl">✨</span>
                  <span className="text-3xl">💜</span>
                  <span className="text-3xl">✨</span>
                  <span className="text-3xl">💜</span>
                </div>
              </motion.div>

              {/* Final closing */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
                className="pt-8"
              >
                <div className="flex justify-center gap-3">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        y: [0, -15, 0],
                        rotate: [0, 360]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: i * 0.2,
                        rotate: { duration: 4, repeat: Infinity }
                      }}
                      className="text-4xl"
                    >
                      💫
                    </motion.div>
                  ))}
                </div>
                
                <motion.p 
                  className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600 mt-8"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Forever and Always
                </motion.p>
                
                <p className="text-xl text-purple-600 font-semibold mt-3">
                  Your Loving Sibling 💜
                </p>
                
                <p className="text-8xl mt-6">
                  💜
                </p>
                
                <p className="text-gray-400 text-sm mt-8">
                  Thank you for everything, Prachi 💕
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pulsing heart corners */}
      <div className="fixed bottom-6 left-6 z-20">
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-5xl"
        >
          💜
        </motion.div>
      </div>
      <div className="fixed top-6 right-6 z-20">
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1, delay: 0.3, repeat: Infinity }}
          className="text-5xl"
        >
          💕
        </motion.div>
      </div>
      <div className="fixed bottom-6 right-6 z-20">
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1, delay: 0.6, repeat: Infinity }}
          className="text-5xl"
        >
          💖
        </motion.div>
      </div>
      <div className="fixed top-6 left-6 z-20">
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1, delay: 0.9, repeat: Infinity }}
          className="text-5xl"
        >
          💝
        </motion.div>
      </div>
    </div>
  )
}