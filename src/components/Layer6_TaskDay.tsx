import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface LayerProps {
  onNext: () => void
  onPrev: () => void
  currentLayer: number
  totalLayers: number
}

export default function TaskDay({ onNext, onPrev }: LayerProps) {
  const [checkedTasks, setCheckedTasks] = useState<number[]>([])
  const [showMessage, setShowMessage] = useState(false)

  const tasks = [
    { 
      task: "Be your Go to person 📚", 
      description: "Motivation whenever you need it",
      icon: "🌙",
      color: "from-purple-400 to-indigo-400"
    },
    { 
      task: "Listen to you vent about college stress 🎧", 
      description: "No judgment, just a shoulder to lean on",
      icon: "💬",
      color: "from-rose-400 to-pink-400"
    },
    { 
      task: "Share my lunch with you every day 🍱", 
      description: "Because sharing food = sharing love",
      icon: "🍱",
      color: "from-amber-400 to-orange-400"
    },
    { 
      task: "Be your biggest cheerleader 📣", 
      description: "Celebrating every small victory together",
      icon: "🎉",
      color: "from-emerald-400 to-teal-400"
    },
 

  ]

  const handleTaskClick = (idx: number) => {
    if (checkedTasks.includes(idx)) {
      setCheckedTasks(checkedTasks.filter(i => i !== idx))
    } else {
      setCheckedTasks([...checkedTasks, idx])
    }
  }

  const allTasksCompleted = checkedTasks.length === tasks.length

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl" />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xl opacity-20"
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
            {['💜', '✨', '📚', '🎓', '💫', '🌸'][Math.floor(Math.random() * 6)]}
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
      <div className="fixed top-6 left-6 z-20 flex gap-3">
        <motion.button
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPrev}
          className="px-5 py-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-md text-purple-600 font-medium hover:bg-white transition-all border border-purple-200"
        >
          ← Back
        </motion.button>
      </div>

      <div className="fixed top-6 right-6 z-20">
        <motion.button
          whileHover={{ scale: 1.05, x: 2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="px-5 py-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-md text-purple-600 font-medium hover:bg-white transition-all border border-purple-200"
        >
          Next →
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            👭
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
            A Promise to My Akka
          </h1>
          <div className="flex justify-center gap-2 mt-3">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-purple-400" />
            <span className="text-purple-400">✦</span>
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-purple-400" />
          </div>
          <p className="text-gray-600 mt-3 italic">
            Prachi, you're not just my sister - you're my everything 💜
          </p>
        </motion.div>

        {/* Personal Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-purple-100"
        >
          <div className="flex items-center gap-3 justify-center mb-3">
            <span className="text-3xl">💌</span>
            <h2 className="text-xl font-semibold text-purple-700">From your college sister to another</h2>
            <span className="text-3xl">💌</span>
          </div>
          <p className="text-center text-gray-700 leading-relaxed">
            Through lectures, assignments, coffee breaks, and late-night chats, 
            you've become family to me. Here's my promise to always be there for you, 
            just like a real sister would 💕
          </p>
        </motion.div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {tasks.map((task, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              onClick={() => handleTaskClick(idx)}
              className={`cursor-pointer transition-all duration-300 ${
                checkedTasks.includes(idx) ? 'opacity-60' : ''
              }`}
            >
              <div className={`relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all border-l-4 ${
                checkedTasks.includes(idx) ? 'border-green-400' : `border-${task.color.split('-')[1]}-400`
              }`}>
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`text-3xl ${checkedTasks.includes(idx) ? 'opacity-50' : ''}`}>
                      {checkedTasks.includes(idx) ? '✅' : task.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold text-gray-800 mb-1 ${checkedTasks.includes(idx) ? 'line-through' : ''}`}>
                        {task.task}
                      </h3>
                      <p className="text-sm text-gray-500">{task.description}</p>
                    </div>
                  </div>
                </div>
                {/* Progress gradient */}
                <div className={`h-1 bg-gradient-to-r ${task.color} transition-all duration-500 ${
                  checkedTasks.includes(idx) ? 'w-full' : 'w-0'
                }`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Completion Message */}
        <AnimatePresence>
          {allTasksCompleted && !showMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMessage(true)}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
              >
                See Your Special Message 💌
              </motion.button>
            </motion.div>
          )}

          {showMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 text-center shadow-xl border border-purple-200"
            >
              <div className="text-6xl mb-4">💜</div>
              <h3 className="text-2xl font-serif font-bold text-purple-800 mb-3">
                To My Dearest Akka,
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Thank you for being the sister I never had. Through all the college chaos, 
                heart-to-heart conversations - 
                you've made my college life unforgettable. 
              </p>
              <p className="text-purple-600 font-semibold italic">
                "Some relations are written in the stars, but ours is written in heart." 
              </p>
              <div className="flex justify-center gap-2 mt-6">
                <span className="text-2xl">💕</span>
                <span className="text-2xl">👭</span>
                <span className="text-2xl">💕</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="mt-6 px-8 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all"
              >
                Continue Our Journey →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Indicator */}
        {!allTasksCompleted && (
          <div className="text-center mt-6">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
              <span className="text-sm text-purple-600">
                {checkedTasks.length} of {tasks.length} promises made 💜
              </span>
              <div className="w-24 h-1.5 bg-purple-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(checkedTasks.length / tasks.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Footer note */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-gray-400 mt-8"
        >
          * Each promise is a commitment from my heart to yours. Click to seal them with love! 💫
        </motion.p>
      </div>
    </div>
  )
}