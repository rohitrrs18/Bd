import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

// Import local images
import img1 from '../assets/images/prachi1.jpg'
import img2 from '../assets/images/prachi2.jpg'
import img3 from '../assets/images/prachi3.jpg'
import img4 from '../assets/images/prachi10.jpg'
import img5 from '../assets/images/prachi5.jpg'
import img6 from '../assets/images/prachi6.jpg'
import bgImage from '../assets/images/prachi11.jpg'

interface LayerProps {
  onNext: () => void
  onPrev: () => void
  currentLayer: number
  totalLayers: number
}

const memories = [
  {
    url: img1,
    caption: "The day you smiled and made my world brighter",
    year: "First apperance",
    memory: "You were my first friend, my first teacher, and my first hero.",
    color: "from-rose-400 to-pink-300",
    icon: "🌸"
  },
  {
    url: img2,
    caption: "Growing up with you was the greatest gift",
    year: "Growing Up",
    memory: "Through every season of life, you were my constant, my anchor, my safe harbor. You held my hand through stormy days and celebrated with me on sunny ones. Growing up beside you shaped me into who I am today.",
    color: "from-amber-400 to-orange-300",
    icon: "🌻"
  },
  {
    url: img3,
    caption: "Your strength and grace inspire me every day",
    year: "Our Journey",
    memory: "You taught me that being soft doesn't mean being weak - that kindness is the greatest strength. Your resilience in the face of challenges has always amazed me. You're not just my sister; you're my inspiration.",
    color: "from-emerald-400 to-teal-300",
    icon: "🦋"
  },
  {
    url: img4,
    caption: "Creating beautiful moments, one memory at a time",
    year: "Precious Times",
    memory: "Each moment with you is a treasure I hold close to my heart, forever grateful. From lazy Sunday mornings to late-night conversations, every second spent with you is a gift I'll always cherish.",
    color: "from-purple-400 to-fuchsia-300",
    icon: "💫"
  },
  {
    url: img5,
    caption: "Your presence makes every day feel like a celebration",
    year: "Celebrations",
    memory: "You turned ordinary days into extraordinary memories with your magic touch. Your ability to find joy in the little things and spread happiness wherever you go is truly special.",
    color: "from-blue-400 to-cyan-300",
    icon: "🎉"
  },
  {
    url: img6,
    caption: "Thank you for being my guiding light",
    year: "Forever Grateful",
    memory: "I'm who I am because of your love, your wisdom, and your endless support. You've shaped my world in countless ways, and I'll spend a lifetime trying to be half as wonderful as you are.",
    color: "from-indigo-400 to-violet-300",
    icon: "✨"
  }
]

export default function FrameWall({ onNext, onPrev }: LayerProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Background Image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bgImage} 
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Soft overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-white/80 to-amber-50/80 backdrop-blur-[2px]" />
      </div>
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-amber-200/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-rose-200/20 to-transparent rounded-full blur-3xl" />
      
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
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
              duration: 25 + Math.random() * 20,
              repeat: Infinity,
              delay: Math.random() * 15,
              ease: "linear"
            }}
          >
            {['💜', '✨', '🌸', '⭐', '💝', '🦋', '🌹', '🎀'][Math.floor(Math.random() * 8)]}
          </motion.div>
        ))}
      </div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 10 L35 20 L45 22 L38 30 L40 40 L30 35 L20 40 L22 30 L15 22 L25 20 Z' fill='none' stroke='%23fcd34d' stroke-width='0.5' opacity='0.15'/%3E%3C/svg%3E')] pointer-events-none" />

      <div className="relative z-10">
        {/* Navigation Header */}
        <div className="flex justify-between items-center mb-16 px-6">
          <motion.button
            whileHover={{ scale: 1.02, x: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onPrev}
            className="group relative px-6 py-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg text-amber-700 font-medium hover:bg-white transition-all border border-amber-200/50 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">← Back</span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-rose-100 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-amber-700 via-rose-600 to-amber-700 bg-clip-text text-transparent tracking-wide">
              Our Beautiful Journey
            </h1>
            <div className="flex justify-center gap-2 mt-3">
              <span className="w-12 h-px bg-gradient-to-r from-transparent to-amber-400" />
              <span className="text-amber-400">✦</span>
              <span className="w-12 h-px bg-gradient-to-l from-transparent to-amber-400" />
            </div>
            <p className="text-stone-500 text-sm mt-2 italic">Click on any frame to relive the moment ✨</p>
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.02, x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            className="group relative px-6 py-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg text-amber-700 font-medium hover:bg-white transition-all border border-amber-200/50 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">Next →</span>
            <div className="absolute inset-0 bg-gradient-to-l from-amber-100 to-rose-100 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        </div>

        {/* Gallery Grid */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {memories.map((memory, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40, rotateZ: idx % 2 === 0 ? -2 : 2 }}
                animate={{ opacity: 1, y: 0, rotateZ: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5, type: "spring" }}
                className="relative group cursor-pointer"
                onClick={() => setSelectedImage(idx)}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Decorative hanging string */}
                <motion.div 
                  className="absolute left-1/2 -top-8 w-px h-8 bg-gradient-to-b from-amber-400/80 to-amber-400/20"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: idx * 0.1 }}
                />
                <motion.div 
                  className="absolute left-1/2 -top-10 w-2 h-2 rounded-full bg-amber-400"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                />
                
                {/* Frame Container */}
                <div className="relative">
                  {/* Shadow */}
                  <div className="absolute -bottom-4 left-4 right-4 h-6 bg-black/15 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Main Frame */}
                  <motion.div 
                    className="relative"
                    animate={{ 
                      rotateZ: hoveredIndex === idx ? 0 : (idx % 2 === 0 ? -0.5 : 0.5),
                      y: hoveredIndex === idx ? -8 : 0
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Ornate Frame Border */}
                    <div className="relative p-3 bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 rounded-lg shadow-2xl">
                      <div className="relative p-1.5 bg-gradient-to-br from-amber-100 to-amber-50 rounded-md">
                        <div className="relative overflow-hidden rounded-md">
                          <img 
                            src={memory.url} 
                            alt={`Memory ${idx + 1}`}
                            className="w-full h-72 object-cover transition-all duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          
                          {/* Overlay gradient on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                          
                          {/* Hover info */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <div className="bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg">
                              <span className="text-amber-700 font-medium flex items-center gap-2">
                                {memory.icon} Click to read 💫
                              </span>
                            </div>
                          </div>
                          
                          {/* Corner decorations */}
                          <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-300/60" />
                          <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-300/60" />
                          <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-300/60" />
                          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-300/60" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Year Badge with icon */}
                    <motion.div 
                      className="absolute -top-4 -right-3 bg-gradient-to-r from-amber-500 to-rose-500 text-white px-3 py-1 rounded-full shadow-lg flex items-center gap-1"
                      animate={{ rotate: hoveredIndex === idx ? 5 : 0 }}
                    >
                      <span className="text-xs">{memory.icon}</span>
                      <span className="text-xs font-semibold tracking-wide">{memory.year}</span>
                    </motion.div>
                    
                    {/* Caption */}
                    <div className="mt-5 text-center px-2">
                      <p className="text-stone-600 text-sm italic leading-relaxed font-serif line-clamp-2">
                        "{memory.caption}"
                      </p>
                      <div className="mt-2 flex justify-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${memory.color} opacity-60`} />
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${memory.color} opacity-40`} />
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${memory.color} opacity-20`} />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-20 pt-8 border-t border-amber-200/50 max-w-2xl mx-auto"
        >
          <div className="flex justify-center gap-3 mb-4">
            <motion.span 
              className="text-3xl"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💝
            </motion.span>
            <motion.span 
              className="text-3xl"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
            >
              ✨
            </motion.span>
            <motion.span 
              className="text-3xl"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, delay: 0.6, repeat: Infinity }}
            >
              🌸
            </motion.span>
          </div>
          <p className="text-lg text-stone-600 font-serif italic">
            "Every picture tells a story, but ours is my favorite."
          </p>
          <p className="text-amber-500/80 mt-3 text-sm tracking-wide flex items-center justify-center gap-2">
            <span>💜</span> Each memory, a treasure forever <span>💜</span>
          </p>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="max-w-4xl w-full bg-gradient-to-br from-white to-amber-50 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header with gradient */}
              <div className={`relative bg-gradient-to-r ${memories[selectedImage].color} p-2`}>
                <div className="bg-white/95 backdrop-blur-sm m-2 rounded-xl overflow-hidden">
                  <img 
                    src={memories[selectedImage].url} 
                    alt="Memory"
                    className="w-full h-auto max-h-[50vh] object-contain bg-gradient-to-br from-amber-50 to-stone-50"
                  />
                </div>
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 text-amber-700 hover:bg-white hover:scale-110 transition-all flex items-center justify-center shadow-lg"
                >
                  ✕
                </button>
              </div>
              
              {/* Modal Content */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-1 h-8 rounded-full bg-gradient-to-b ${memories[selectedImage].color}`} />
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{memories[selectedImage].icon}</span>
                    <h3 className="text-2xl font-serif font-bold bg-gradient-to-r from-amber-800 to-rose-700 bg-clip-text text-transparent">
                      {memories[selectedImage].year}
                    </h3>
                  </div>
                </div>
                
                <p className="text-stone-700 text-lg italic leading-relaxed mb-4 border-l-4 border-amber-400 pl-4">
                  "{memories[selectedImage].caption}"
                </p>
                
                <p className="text-stone-600 leading-relaxed">
                  {memories[selectedImage].memory}
                </p>
                
                <div className="mt-6 pt-4 border-t border-amber-200 flex items-center justify-between">
                  <div className="flex gap-1">
                    <span className="text-amber-400 text-2xl animate-pulse">✦</span>
                    <span className="text-amber-400 text-2xl animate-pulse" style={{ animationDelay: '0.2s' }}>✦</span>
                    <span className="text-amber-400 text-2xl animate-pulse" style={{ animationDelay: '0.4s' }}>✦</span>
                  </div>
                  <p className="text-rose-500 text-sm font-serif">Forever in my heart 💜</p>
                  <div className="flex gap-1">
                    <span className="text-amber-400 text-2xl animate-pulse" style={{ animationDelay: '0.6s' }}>✦</span>
                    <span className="text-amber-400 text-2xl animate-pulse" style={{ animationDelay: '0.8s' }}>✦</span>
                    <span className="text-amber-400 text-2xl animate-pulse" style={{ animationDelay: '1s' }}>✦</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}