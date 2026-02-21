import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CatMascotProps {
  isGenerating: boolean;
  reaction?: 'happy' | 'thinking' | 'surprised';
  soundEnabled: boolean;
}

export const CatMascot: React.FC<CatMascotProps> = ({ isGenerating, reaction, soundEnabled }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (soundEnabled && !audioRef.current) {
      audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/951/951-preview.mp3'); // Short cute meow
    }
  }, [soundEnabled]);

  const playMeow = () => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <>
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/40 backdrop-blur-sm flex items-center justify-center pointer-events-none"
          >
            <motion.div
              animate={{
                y: [0, -40, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex flex-col items-center gap-6"
            >
              <CatSVG className="w-48 h-48 text-indigo-600 drop-shadow-2xl" />
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="bg-indigo-600 text-white px-8 py-3 rounded-full font-black text-xl shadow-xl"
              >
                MEOW-LATING... 🐾
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-8 right-8 z-[110]">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={playMeow}
          className="relative cursor-pointer group pointer-events-auto"
        >
          <motion.div
            animate={!isGenerating ? {
              y: [0, -10, 0],
            } : {}}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="bg-white p-5 rounded-[2rem] shadow-2xl border-4 border-indigo-50 flex items-center justify-center relative overflow-hidden"
          >
            <CatSVG className={isGenerating ? "text-slate-200" : "text-indigo-600 group-hover:rotate-12 transition-transform duration-300"} size={60} />
            
            {/* Reaction Bubbles */}
            <AnimatePresence>
              {reaction === 'happy' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: 0 }}
                  animate={{ opacity: 1, scale: 1, y: -80 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute bg-emerald-500 text-white px-4 py-2 rounded-2xl text-sm font-black shadow-xl whitespace-nowrap"
                >
                  PURR-FECT! ✨
                </motion.div>
              )}
              {reaction === 'surprised' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: 0 }}
                  animate={{ opacity: 1, scale: 1, y: -80 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute bg-rose-500 text-white px-4 py-2 rounded-2xl text-sm font-black shadow-xl whitespace-nowrap"
                >
                  HISS! ERROR 🙀
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

const CatSVG = ({ className, size = 48 }: { className?: string; size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.45.44.12.58.58.44 1.02-.23.78-.64 1.58-1.13 2.35C21.25 7.67 22 9.75 22 12c0 5.52-4.48 10-10 10S2 17.52 2 12c0-2.25.75-4.33 2.27-5.82-.49-.77-.9-1.57-1.13-2.35-.14-.44 0-.9.44-1.02 1.39-.39 4.64.45 6.42 2.45.65-.17 1.33-.26 2-.26z" />
    <circle cx="9" cy="12" r="1" fill="currentColor" />
    <circle cx="15" cy="12" r="1" fill="currentColor" />
    <path d="M12 16c-1 0-2-.5-2-1.5" />
    <path d="M12 16c1 0 2-.5 2-1.5" />
  </svg>
);
