import React from 'react'
import { motion } from 'framer-motion'

const suggestedPrompts = [
  "A futuristic cityscape at night",
  "A serene forest with a hidden waterfall",
  "An abstract representation of love",
  "A steampunk-inspired flying machine",
  "A magical library with floating books",
]

interface SuggestedPromptsProps {
  setPrompt: (prompt: string) => void
}

const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ setPrompt }) => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Try these prompts:</h3>
      <div className="flex flex-wrap justify-center gap-2">
        {suggestedPrompts.map((prompt, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium py-1 px-2 rounded-full transition duration-200"
            onClick={() => setPrompt(prompt)}
          >
            {prompt}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default SuggestedPrompts

