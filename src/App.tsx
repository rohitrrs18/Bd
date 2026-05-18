import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SplashScreen from './components/Layer0_SplashScreen'
import HeartfeltMessage from './components/Layer1_HeartfeltMessage'
import FrameWall from './components/Layer2_FrameWall'
import Carousel from './components/Layer3_Carousel'
import ThreeDCake from './components/Layer4_3DCake'
import GiftExplosion from './components/Layer5_GiftExplosion'
import TaskDay from './components/Layer6_TaskDay'
import MemoryTimeline from './components/Layer7_MemoryTimeline'

function App() {
  const [currentLayer, setCurrentLayer] = useState(0)
  const totalLayers = 8

  const nextLayer = () => {
    if (currentLayer < totalLayers - 1) {
      setCurrentLayer(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevLayer = () => {
    if (currentLayer > 0) {
      setCurrentLayer(prev => prev - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Background music (auto-start after user interaction)
  useEffect(() => {
    const handleFirstClick = () => {
      const audio = new Audio('/music/birthday-song.mp3')  // ← Change this path
      audio.loop = true
      audio.volume = 0.3
      audio.play().catch(e => console.log('Audio needs user interaction'))
      document.removeEventListener('click', handleFirstClick)
    }
    document.addEventListener('click', handleFirstClick)
    return () => document.removeEventListener('click', handleFirstClick)
  }, [])

  const layers = [
    { component: SplashScreen, name: '✨ Welcome ✨', bg: 'from-pink-100 to-rose-200' },
    { component: HeartfeltMessage, name: '💌 Heartfelt Words 💌', bg: 'from-amber-50 to-pink-100' },
    { component: FrameWall, name: '🖼️ Beautiful Memories 🖼️', bg: 'from-rose-50 to-orange-100' },
    { component: Carousel, name: '🎠 Magical Moments 🎠', bg: 'from-fuchsia-50 to-pink-100' },
    { component: ThreeDCake, name: '🎂 Birthday Cake 🎂', bg: 'from-yellow-50 to-orange-100' },
    { component: GiftExplosion, name: '🎁 Surprise Gift 🎁', bg: 'from-purple-50 to-pink-100' },
    { component: TaskDay, name: '📋 Special Tasks 📋', bg: 'from-blue-50 to-cyan-100' },
    { component: MemoryTimeline, name: '⏰ Journey Together ⏰', bg: 'from-indigo-50 to-purple-100' },
  ]

  const CurrentComponent = layers[currentLayer].component

  return (
    <div className={`min-h-screen bg-gradient-to-br ${layers[currentLayer].bg} transition-all duration-700`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLayer}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <CurrentComponent onNext={nextLayer} onPrev={prevLayer} currentLayer={currentLayer} totalLayers={totalLayers} />
        </motion.div>
      </AnimatePresence>
      
      {/* Layer Indicator */}
 
    </div>
  )
}

export default App