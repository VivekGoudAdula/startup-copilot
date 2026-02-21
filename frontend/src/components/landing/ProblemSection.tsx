import React from 'react';
import { motion } from 'motion/react';
import Lottie from 'lottie-react';
import catAnimation from '../../public/animations/Cat Animation.json';

const painPoints = [
  { text: 'No idea if market exists', delay: 0.3 },
  { text: 'Competitor confusion', delay: 0.45 },
  { text: 'No clear MVP roadmap', delay: 0.6 },
  { text: 'Wasted building costs', delay: 0.75 }
];

export const ProblemSection: React.FC = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/8 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-accent/8 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Two-column layout - headline is in right column, cat on left */}
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Left: Lottie Cat Animation - taller, no box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="flex items-center justify-center"
          >
            <div className="flex items-center justify-center overflow-hidden" style={{ height: '100%', maxHeight: '650px' }}>
              <Lottie
                animationData={catAnimation}
                loop={true}
                autoplay={true}
                style={{ width: '100%', maxWidth: '750px', height: '650px', objectFit: 'contain' }}
              />
            </div>
          </motion.div>

          {/* Right: Headline + Pain points list */}
          <div>
            {/* Headline moved to right column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-12"
            >
              <h2 className="text-5xl md:text-6xl font-display font-black tracking-tight text-white leading-[1.05]">
                Great Ideas die in{' '}
                <span className="text-red-500 italic">uncertainty.</span>
              </h2>
            </motion.div>

            {/* Pain points */}
            <div className="space-y-6">
              {painPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: point.delay }}
                  className="flex items-center gap-4 group"
                >
                  <motion.div
                    className="flex-shrink-0 w-2 h-2 rounded-full bg-red-500"
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.4 }}
                  />
                  <p className="text-lg md:text-xl text-slate-300 font-medium group-hover:text-white transition-colors duration-200">
                    {point.text}
                  </p>
                </motion.div>
              ))}

              {/* Solution tagline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="mt-10 pt-10 border-t border-white/10"
              >
                <p className="text-slate-500 text-sm uppercase tracking-widest font-medium mb-3">
                  The solution
                </p>
                <p className="text-2xl font-display font-bold text-white">
                  Your AI Co-Founder validates before you build.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};



