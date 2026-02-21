import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle, Clock, Target } from 'lucide-react';

const painPoints = [
  {
    icon: Clock,
    iconColor: 'text-orange-400',
    title: 'The Analysis Paralysis',
    description: 'Spending months researching instead of building. Your idea deserves better than a graveyard of bookmarks.',
    delay: 0.1
  },
  {
    icon: AlertCircle,
    iconColor: 'text-red-400',
    title: 'Validation Roadblocks',
    description: "Unsure if anyone actually wants what you're building? Stop guessing and start validating with AI-backed insights.",
    delay: 0.2
  },
  {
    icon: Target,
    iconColor: 'text-yellow-400',
    title: 'Slow Execution',
    description: 'Traditional MVP development takes weeks. We help you move from concept to launch-ready in hours.',
    delay: 0.3
  }
];

export const ProblemSection: React.FC = () => {
  return (
    <section id="features" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight text-white mb-6">
              Startup Life is <span className="text-red-500">Hard.</span> <br />
              {"Don't Build in the Dark."}
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed">
              90% of startups fail due to poor validation. We bridge the gap between
              your raw idea and a market-ready product.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: point.delay }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="glass-card p-8 rounded-3xl relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform">
                  <Icon className={point.iconColor} size={24} />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-4 italic">
                  {point.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-red-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/10 blur-[100px] rounded-full pointer-events-none" />
    </section>
  );
};
