import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cat, Sparkles, Laptop } from 'lucide-react';

export type CatState = 'idle' | 'thinking' | 'generating' | 'success' | 'lowScore';

interface AnimatedCatProps {
  state?: CatState;
  className?: string;
}

export const AnimatedCat: React.FC<AnimatedCatProps> = ({ state = 'idle', className = '' }) => {
  const variants = {
    idle: {
      y: [0, -10, 0],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    thinking: {
      y: [0, -5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    generating: {
      scale: [1, 1.05, 1],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        ease: "linear"
      }
    },
    success: {
      y: [0, -40, 0],
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 300
      }
    },
    lowScore: {
      rotate: [0, 15, 0],
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <motion.div
        variants={variants}
        animate={state}
        className="relative z-10"
      >
        <Cat
          size={120}
          className={`transition-colors duration-500 ${state === 'success' ? 'text-emerald-400' :
              state === 'lowScore' ? 'text-amber-400' :
                'text-accent'
            }`}
        />

        {/* Tail animation (CSS based for simplicity in SVG) */}
        <div className="absolute -bottom-2 -right-4">
          {/* Placeholder for complex SVG tail if needed, using simple motion for now */}
        </div>

        {/* State specific overlays */}
        <AnimatePresence>
          {state === 'thinking' && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-8 -right-8 bg-card p-2 rounded-xl border border-border-subtle shadow-xl"
            >
              <Laptop size={24} className="text-accent animate-pulse" />
            </motion.div>
          )}

          {state === 'generating' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: (Math.random() - 0.5) * 100,
                    y: (Math.random() - 0.5) * 100
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                  className="absolute left-1/2 top-1/2"
                >
                  <Sparkles size={16} className="text-glow" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating shadow */}
      <motion.div
        animate={{
          scale: state === 'idle' ? [1, 0.8, 1] : 1,
          opacity: state === 'idle' ? [0.2, 0.1, 0.2] : 0.2
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-24 h-4 bg-black/40 blur-md rounded-full mt-4"
      />
    </div>
  );
};
