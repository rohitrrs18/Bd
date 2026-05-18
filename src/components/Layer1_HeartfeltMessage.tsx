import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

// Import background image
import bgImage from '../assets/images/prachi5.jpg'

interface LayerProps {
  onNext: () => void
  onPrev: () => void
  currentLayer: number
  totalLayers: number
}

export default function HeartfeltMessage({ onNext, onPrev }: LayerProps) {
  const [unfolded, setUnfolded] = useState(false)
  const [showExtraMessage, setShowExtraMessage] = useState(false)

  useEffect(() => {
    if (unfolded) {
      const extraTimer = setTimeout(() => setShowExtraMessage(true), 4000)
      return () => clearTimeout(extraTimer)
    }
  }, [unfolded])

  const messages = [
    { 
      name: "Akka", 
      message: "From my first memory to this very moment, you've been my guiding star. Do you remember how you'd help me to recover from my past trauma when I was at my worst position- I never said it enough, but I noticed it all. You're not just my elder sister; you're the reason I believe in unconditional love. Thank you for being my protector, my teacher, and my mother.",
      icon: "👑",
      color: "from-amber-500 to-orange-500"
    },
    { 
      name: "Didi", 
      message: "They say you can choose your friends but not your family. But if I could choose, I'd still choose you. Every single time. Through fights and laughter, tears and celebrations - you've been my constant. The late-night talks, the shared secrets, the way you always know exactly what to say when I'm down - these moments are my treasures. You made growing up feel less lonely. You made my world less scary. For that and so much more, my heart overflows with gratitude.",
      icon: "💫",
      color: "from-violet-500 to-purple-500"
    },
    { 
      name: "Tai", 
      message: "There's a quiet strength in you that I've always admired. The way you handle everything with such grace, the wisdom in your words, the warmth in your embrace - you've shaped who I am today. Every piece of advice you've given, every time you've stood up for me, every moment you've put my needs before yours - I carry all of it in my heart. You taught me what it means to be strong and kind at the same time. You are my role model, and I pray I can be even half the person you are. I pray that i could be your real brother in next all life",
      icon: "🌸",
      color: "from-rose-500 to-pink-500"
    },
    { 
      name: "Mother", 
      message: "When I think of love, I think of you. Your scolding have healed my deepest wounds and improper behaviours. Your prayers have carried me through my darkest days. The way you love without conditions, give without expecting, and care without limits - it's the purest form of love I've ever known. You've held me like your own brother love me from bottom of your heart. Every success of mine has your fingerprints all over it. Every good thing in me came from you. You are not just a mother figure - you are the definition of home. Thank you for being my safe place, always.",
      icon: "💜",
      color: "from-rose-600 to-purple-600"
    }
  ]

  const emotionalQuote = "Some angels don't have wings - they have your name, your smile, and your heart. Thank you for being my angel, Akka."

  const handleClose = () => {
    setUnfolded(false)
    setShowExtraMessage(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 md:p-8 relative overflow-hidden">
      {/* Background Image with blur and overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bgImage} 
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Soft overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-white/80 to-purple-50/80 backdrop-blur-[2px]" />
      </div>

      {/* Decorative floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`float-${i}`}
            className="absolute text-2xl opacity-20"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: -50
            }}
            animate={{ 
              y: window.innerHeight + 50,
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth
              ],
              rotate: 360
            }}
            transition={{
              duration: 20 + Math.random() * 15,
              repeat: Infinity,
              delay: Math.random() * 20,
              ease: "linear"
            }}
          >
            {['💜', '✨', '🌸', '⭐', '💝', '🦋', '🌹'][Math.floor(Math.random() * 7)]}
          </motion.div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <motion.button
        whileHover={{ scale: 1.05, x: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPrev}
        className="absolute top-6 left-6 z-30 px-6 py-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg text-purple-700 font-medium hover:bg-white transition-all border border-purple-200 flex items-center gap-2"
      >
        <span>←</span> Back
      </motion.button>

      <div className="max-w-4xl mx-auto text-center relative z-20 w-full px-4">
        {/* Title Section with animation */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10"
        >
          <div className="inline-block">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-5xl mb-3"
            >
              💌
            </motion.div>
          </div>
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3"
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #db2777 50%, #f59e0b 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent"
            }}
          >
            A Letter From My Heart
          </h1>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto my-4" />
          <p className="text-gray-600 text-base font-light">To the one who means everything to me...</p>
        </motion.div>

        {/* Message Card */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {!unfolded ? (
            // Envelope - Enhanced
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setUnfolded(true)}
              className="cursor-pointer group"
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-12 border border-purple-100 transition-all hover:shadow-3xl">
                <motion.div
                  animate={{ 
                    y: [0, -5, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-center"
                >
                  <div className="text-8xl mb-6">💌</div>
                  <h3 className="text-3xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                    Open When You Need to Feel Loved
                  </h3>
                  <p className="text-gray-500 text-lg">This letter holds everything I've never said...</p>
                  <div className="mt-8 flex items-center justify-center gap-2 text-purple-400">
                    <span className="text-sm">Tap to open</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      👆
                    </motion.span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            // Unfolded message - Enhanced layout
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-100 relative max-h-[70vh] overflow-y-auto"
              >
                {/* Decorative header */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-t-2xl" />
                
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-all z-20 flex items-center justify-center"
                >
                  ✕
                </button>

                <div className="p-6 md:p-8 pr-4">
                  {/* Header with date */}
                  <div className="text-center mb-6 pb-4 border-b border-gray-200">
                    <p className="text-gray-400 text-sm">My Dearest Akka</p>
                    <p className="text-gray-400 text-xs mt-1">A birthday letter from my heart</p>
                  </div>

                  <div className="space-y-6">
                    {messages.map((msg, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.15 }}
                        className="border-b border-gray-100 last:border-0 pb-5 last:pb-0 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-transparent transition-all rounded-lg p-2"
                      >
                        <div className="flex items-start gap-4">
                          <motion.div 
                            className="text-4xl"
                            whileHover={{ scale: 1.1, rotate: 10 }}
                          >
                            {msg.icon}
                          </motion.div>
                          <div className="flex-1 text-left">
                            <h3 className={`text-xl md:text-2xl font-semibold mb-3 bg-gradient-to-r ${msg.color} bg-clip-text text-transparent`}>
                              My {msg.name}
                            </h3>
                            <p className="text-gray-700 text-base leading-relaxed">
                              {msg.message}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Quote Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-center pt-4 mt-2"
                    >
                      <div className="text-5xl mb-4">💝</div>
                      <p className="text-lg md:text-xl font-medium text-purple-800 italic">
                        "{emotionalQuote}"
                      </p>

                      {/* Extra message */}
                      {showExtraMessage && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="mt-6 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl"
                        >
                          <p className="text-purple-800 font-semibold text-lg">
                            I love you more than words can ever say. ❤️
                          </p>
                          <p className="text-purple-600 mt-2">
                            Today and every day, I'm grateful you're my sister.
                          </p>
                          <div className="flex justify-center gap-3 mt-3 text-2xl">
                            <span>✨</span>
                            <span>💕</span>
                            <span>✨</span>
                          </div>
                        </motion.div>
                      )}

                      <div className="text-4xl mt-6 space-x-3">
                        🎂 ✨ 💜 🎁
                      </div>
                    </motion.div>
                  </div>

                  {/* Signature */}
                  <div className="text-center mt-6 pt-4 border-t border-gray-200">
                    <p className="text-gray-500 text-sm">Forever yours,</p>
                    <p className="text-purple-600 font-semibold">Your Loving Sibling</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>

        {/* Continue Button */}
        <AnimatePresence>
          {unfolded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onNext}
                className="group relative px-10 py-3.5 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <span className="relative flex items-center gap-3">
                  Continue with a love overflowing from my heart 
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-xl"
                  >
                    🤗
                  </motion.span>
                  <span>→</span>
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute bottom-6 left-6 text-purple-300/30 text-2xl z-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          💫
        </motion.div>
      </div>
      <div className="absolute top-6 right-6 text-pink-300/30 text-2xl z-10">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          ✨
        </motion.div>
      </div>
    </div>
  )
}