import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface LayerProps {
  onNext: () => void
  onPrev: () => void
  currentLayer: number
  totalLayers: number
}

export default function ThreeDCake({ onNext, onPrev }: LayerProps) {
  const [isBlown, setIsBlown] = useState(false)
  const [showGift, setShowGift] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([])

  useEffect(() => {
    if (isBlown) {
      // Create elegant sparkles
      const newSparkles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 300 - 100,
      }))
      setSparkles(newSparkles)

      // Show message after blow
      setTimeout(() => setShowMessage(true), 500)
      // Show gift after message
      setTimeout(() => setShowGift(true), 2000)
    }
  }, [isBlown])

  const handleBlow = () => {
    if (!isBlown) {
      setIsBlown(true)
    }
  }

  const cakeLayers = [
    { color: 'from-rose-400 to-pink-500', height: 'h-20', delay: 0 },
    { color: 'from-amber-400 to-orange-500', height: 'h-16', delay: 0.1 },
    { color: 'from-purple-400 to-fuchsia-500', height: 'h-20', delay: 0.2 },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-slate-50 via-rose-50 to-amber-50">
      
      {/* Minimal floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xl opacity-10"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: -50
            }}
            animate={{ 
              y: window.innerHeight + 50,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
          >
            {['✨', '💫', '⭐', '🌸'][Math.floor(Math.random() * 4)]}
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
      <div className="absolute top-6 left-6 z-30">
        <motion.button
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPrev}
          className="px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-md text-rose-600 font-medium hover:bg-white transition-all border border-rose-200"
        >
          ← Back
        </motion.button>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* Cake Container */}
        <motion.div
          animate={{ y: isBlown ? [0, -10, 0] : 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          {/* Cake Shadow */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-64 h-4 bg-black/10 rounded-full blur-md" />

          {/* Cake Plate */}
          <div className="w-72 h-3 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-full mx-auto shadow-md mb-1" />

          {/* Cake Layers */}
          <div className="relative">
            {cakeLayers.map((layer, idx) => (
              <motion.div
                key={idx}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: layer.delay, duration: 0.4 }}
                className={`relative ${layer.height} w-56 bg-gradient-to-r ${layer.color} rounded-t-2xl shadow-lg mx-auto`}
                style={{ 
                  marginTop: idx > 0 ? '-4px' : 0,
                  borderRadius: idx === cakeLayers.length - 1 ? '16px 16px 0 0' : '16px 16px 0 0'
                }}
              >
                <div className="absolute inset-0 bg-white/10 rounded-t-2xl" />
              </motion.div>
            ))}

            {/* Icing */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-64 h-6 bg-gradient-to-r from-pink-200 via-rose-200 to-pink-200 rounded-full shadow-md"
            >
              <div className="absolute inset-0 bg-white/30 rounded-full" />
            </motion.div>

            {/* Candles */}
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 flex gap-4">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  {/* Candle */}
                  <div className="w-3 h-16 bg-gradient-to-r from-blue-300 to-cyan-400 rounded-t-md shadow-sm" />
                  <div className="w-5 h-2 bg-amber-600 rounded-full -mt-1 mx-auto" />
                  
                  {/* Flame */}
                  {!isBlown && (
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        y: [0, -2, 0]
                      }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="absolute -top-5 left-1/2 transform -translate-x-1/2"
                    >
                      <div className="w-3 h-5 bg-gradient-to-t from-orange-400 to-yellow-300 rounded-full" />
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1.5 h-3 bg-yellow-200 rounded-full" />
                    </motion.div>
                  )}

                  {/* Smoke */}
                  {isBlown && (
                    <motion.div
                      initial={{ opacity: 0.5, scale: 0.5 }}
                      animate={{ opacity: 0, scale: 2, y: -30 }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-400/30 rounded-full blur-sm"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600">
            Happy Birthday, Prachi
          </h1>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="text-rose-400">✦</span>
            <p className="text-gray-500 italic">Make a wish and blow out the candles</p>
            <span className="text-rose-400">✦</span>
          </div>
        </motion.div>

        {/* Action Button */}
        {!isBlown ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBlow}
            className="group relative px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              💨 Blow the Candles
            </span>
          </motion.button>
        ) : (
          <AnimatePresence mode="wait">
            {showMessage && !showGift && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="text-6xl">✨</div>
                <p className="text-2xl font-serif text-gray-700 italic">
                  "A wish upon a star for you..."
                </p>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl"
                >
                  💫
                </motion.div>
              </motion.div>
            )}

            {showGift && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="space-y-6"
              >
                {/* Gift Box */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative inline-block cursor-pointer group"
                  onClick={onNext}
                >
                  <div className="relative">
                    {/* Gift box shadow */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-3 bg-black/10 rounded-full blur-sm" />
                    
                    {/* Gift box body */}
                    <div className="w-32 h-32 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl shadow-lg relative overflow-hidden">
                      {/* Ribbon horizontal */}
                      <div className="absolute top-1/2 left-0 w-full h-4 bg-rose-200 transform -translate-y-1/2" />
                      {/* Ribbon vertical */}
                      <div className="absolute left-1/2 top-0 w-4 h-full bg-rose-200 transform -translate-x-1/2" />
                      {/* Ribbon bow */}
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <div className="w-8 h-6 bg-rose-300 rounded-t-full -rotate-12 absolute -left-3" />
                        <div className="w-8 h-6 bg-rose-300 rounded-t-full rotate-12 absolute -right-3" />
                        <div className="w-3 h-3 bg-rose-400 rounded-full absolute top-1 left-1/2 transform -translate-x-1/2" />
                      </div>
                    </div>
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <p className="mt-4 text-gray-600 font-medium group-hover:text-rose-600 transition-colors">
                    Open Your Gift →
                  </p>
                </motion.div>

                <p className="text-gray-500 text-sm">Something special awaits you...</p>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Sparkles after blow */}
        <AnimatePresence>
          {sparkles.map((sparkle) => (
            <motion.div
              key={sparkle.id}
              initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              animate={{ opacity: 0, scale: 0, x: sparkle.x, y: sparkle.y }}
              transition={{ duration: 1 }}
              className="fixed pointer-events-none"
              style={{ left: '50%', top: '50%' }}
            >
              <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-lg" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Floating balloons */}
      {!isBlown && (
        <>
          {[
            { left: '10%', bottom: '20%', delay: 0 },
            { left: '85%', bottom: '15%', delay: 0.5 },
            { left: '15%', top: '15%', delay: 1 },
            { left: '88%', top: '25%', delay: 1.5 },
          ].map((balloon, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: balloon.delay }}
              className="absolute text-4xl"
              style={balloon}
            >
              🎈
            </motion.div>
          ))}
        </>
      )}
    </div>
  )
}