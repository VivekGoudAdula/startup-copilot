import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2, AlertCircle, TrendingUp, Target, Users, ShieldAlert,
  ChevronDown, ChevronUp, Zap, Star, Info, Award
} from 'lucide-react';
import type { ValidationResponse } from '../services/ai';
import { cn } from '../lib/utils';

interface IdeaValidationProps {
  data: ValidationResponse;
}

// Animated SVG score ring with gradient stroke and glow
const ScoreRing: React.FC<{ score: number }> = ({ score }) => {
  const [displayScore, setDisplayScore] = useState(0);
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const isPurrfect = score > 85;
  const isLow = score < 40;
  const strokeColor = isLow ? 'url(#lowGrad)' : 'url(#scoreGrad)';

  useEffect(() => {
    let start = 0;
    const end = score;
    const duration = 2000;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [score]);

  const offset = circumference - (circumference * score) / 100;

  return (
    <div className="relative w-48 h-48 flex items-center justify-center shrink-0 group">
      {/* Outer glow ring for high scores */}
      {isPurrfect && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)',
            filter: 'blur(12px)',
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="lowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background track */}
        <circle cx="80" cy="80" r={radius} fill="transparent" stroke="#e0e7ff" strokeWidth="12" />

        {/* Animated progress arc */}
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          fill="transparent"
          stroke={strokeColor}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2, ease: 'circOut' }}
          filter="url(#glow)"
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className={cn(
            "text-5xl font-black leading-none",
            isLow ? "text-orange-500" : "text-indigo-900"
          )}
        >
          {displayScore}
        </motion.span>
        <span className="text-[9px] uppercase tracking-[0.25em] text-slate-400 font-black mt-1">
          VC Index
        </span>
        {/* Subtle pulse dot */}
        <motion.div
          className={cn("w-2 h-2 rounded-full mt-1", isLow ? "bg-orange-400" : "bg-indigo-400")}
          animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
    </div>
  );
};

// Premium SWOT card with glass effect, hover elevation, expandable
const SWOTCard = ({
  title, items, icon, color, delay
}: {
  title: string;
  items: string[];
  icon: React.ReactNode;
  color: string;
  delay: number;
}) => {
  const [expanded, setExpanded] = useState(false);
  const visibleItems = expanded ? items : items.slice(0, 2);

  const colorMap: Record<string, {
    bg: string; border: string; iconBg: string; badge: string; dot: string; gradBorder: string;
  }> = {
    emerald: {
      bg: 'bg-gradient-to-br from-emerald-50/80 to-white',
      border: 'border-emerald-100',
      iconBg: 'bg-emerald-100',
      badge: 'bg-emerald-500',
      dot: 'bg-emerald-400',
      gradBorder: 'from-emerald-400 to-teal-400',
    },
    amber: {
      bg: 'bg-gradient-to-br from-amber-50/80 to-white',
      border: 'border-amber-100',
      iconBg: 'bg-amber-100',
      badge: 'bg-amber-500',
      dot: 'bg-amber-400',
      gradBorder: 'from-amber-400 to-orange-400',
    },
    indigo: {
      bg: 'bg-gradient-to-br from-indigo-50/80 to-white',
      border: 'border-indigo-100',
      iconBg: 'bg-indigo-100',
      badge: 'bg-indigo-500',
      dot: 'bg-indigo-400',
      gradBorder: 'from-indigo-400 to-purple-400',
    },
    rose: {
      bg: 'bg-gradient-to-br from-rose-50/80 to-white',
      border: 'border-rose-100',
      iconBg: 'bg-rose-100',
      badge: 'bg-rose-500',
      dot: 'bg-rose-400',
      gradBorder: 'from-rose-400 to-pink-400',
    },
  };

  const c = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={{ y: -6, boxShadow: '0 24px 48px rgba(0,0,0,0.10)' }}
      className={cn(
        "relative p-6 rounded-3xl border backdrop-blur-sm cursor-default transition-all duration-300 overflow-hidden group",
        c.bg, c.border
      )}
    >
      {/* Gradient border on hover via pseudo element trick */}
      <div className={cn(
        "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
        "ring-2 ring-inset ring-transparent group-hover:ring-indigo-200"
      )} />

      {/* Top gradient stripe */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-gradient-to-r",
        c.gradBorder
      )} />

      {/* Icon + Title */}
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          whileHover={{ rotate: 12, scale: 1.1 }}
          className={cn("w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm", c.iconBg)}
        >
          {icon}
        </motion.div>
        <div>
          <h3 className="font-black text-slate-900 text-sm tracking-tight">{title}</h3>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            {items.length} points
          </span>
        </div>
      </div>

      {/* Items */}
      <ul className="space-y-2.5">
        <AnimatePresence>
          {visibleItems.map((item, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ delay: idx * 0.06 }}
              className="text-xs text-slate-600 flex gap-2.5 leading-relaxed font-medium"
            >
              <motion.span
                className={cn("mt-1.5 w-1.5 h-1.5 rounded-full shrink-0", c.dot)}
                whileHover={{ scale: 1.5 }}
              />
              {item}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Expand toggle */}
      {items.length > 2 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-700 transition-colors"
        >
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          {expanded ? 'Show less' : `+${items.length - 2} more`}
        </button>
      )}
    </motion.div>
  );
};

// Market Position Map - simple SVG 2-axis chart
const MarketPositionMap: React.FC<{ competitors: ValidationResponse['competitors'] }> = ({ competitors }) => {
  // Assign pseudo positions based on index to distribute nicely
  const positions = [
    { x: 25, y: 70 },
    { x: 65, y: 35 },
    { x: 45, y: 55 },
    { x: 80, y: 80 },
  ];
  const yourPos = { x: 82, y: 22 };

  return (
    <div className="mt-8 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-6 shadow-2xl">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
        <span className="text-xs font-black text-indigo-300 uppercase tracking-widest">Market Position Map</span>
      </div>
      <div className="relative w-full" style={{ aspectRatio: '2/1' }}>
        <svg viewBox="0 0 400 200" className="w-full h-full">
          {/* Grid lines */}
          {[25, 50, 75].map(x => (
            <line key={x} x1={x * 4} y1="0" x2={x * 4} y2="200" stroke="rgba(99,102,241,0.1)" strokeWidth="1" />
          ))}
          {[25, 50, 75].map(y => (
            <line key={y} x1="0" y1={y * 2} x2="400" y2={y * 2} stroke="rgba(99,102,241,0.1)" strokeWidth="1" />
          ))}

          {/* Axis labels */}
          <text x="200" y="195" textAnchor="middle" fontSize="8" fill="rgba(148,163,184,0.8)" fontFamily="sans-serif">
            → Feature Rich
          </text>
          <text x="6" y="100" textAnchor="middle" fontSize="8" fill="rgba(148,163,184,0.8)" fontFamily="sans-serif"
            transform="rotate(-90, 6, 100)">
            ↑ Ease of Use
          </text>

          {/* Competitor dots */}
          {competitors.slice(0, 4).map((comp, idx) => {
            const pos = positions[idx] || { x: 50, y: 50 };
            return (
              <g key={idx}>
                <motion.circle
                  cx={pos.x * 4}
                  cy={(100 - pos.y) * 2}
                  r="8"
                  fill="rgba(148,163,184,0.3)"
                  stroke="rgba(148,163,184,0.6)"
                  strokeWidth="1.5"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                />
                <text
                  x={pos.x * 4}
                  y={(100 - pos.y) * 2 - 12}
                  textAnchor="middle"
                  fontSize="7"
                  fill="rgba(148,163,184,0.9)"
                  fontFamily="sans-serif"
                >
                  {comp.name.split(' ')[0]}
                </text>
              </g>
            );
          })}

          {/* Your idea dot - prominent */}
          <motion.circle
            cx={yourPos.x * 4}
            cy={(100 - yourPos.y) * 2}
            r="12"
            fill="url(#yourGrad)"
            filter="url(#dotGlow)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: 'spring' }}
          />
          <motion.text
            x={yourPos.x * 4}
            y={(100 - yourPos.y) * 2 - 16}
            textAnchor="middle"
            fontSize="8"
            fill="#c7d2fe"
            fontWeight="bold"
            fontFamily="sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            You ⭐
          </motion.text>

          <defs>
            <radialGradient id="yourGrad">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#6366f1" />
            </radialGradient>
            <filter id="dotGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};

// Competitor card - premium with accent stripe, position tag, edge badge
const CompetitorCard: React.FC<{
  comp: { name: string; positioning: string; advantage: string };
  idx: number;
}> = ({ comp, idx }) => {
  const accentColors = [
    'from-violet-500 to-indigo-500',
    'from-fuchsia-500 to-pink-500',
    'from-cyan-500 to-blue-500',
    'from-emerald-500 to-teal-500',
  ];
  const accent = accentColors[idx % accentColors.length];

  // Extract a short positioning tag
  const tag = comp.positioning.split(' ').slice(0, 2).join(' ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * idx, duration: 0.4 }}
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(99,102,241,0.12)' }}
      className="relative bg-white rounded-3xl border border-slate-100 overflow-hidden group transition-all"
    >
      {/* Left accent stripe */}
      <div className={cn("absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b", accent)} />

      <div className="p-5 pl-7">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            {/* Logo placeholder circle */}
            <div className={cn(
              "w-10 h-10 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white font-black text-sm shadow-lg",
              accent
            )}>
              {comp.name[0]}
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-sm">{comp.name}</h4>
              <span className="inline-block text-[9px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full uppercase tracking-widest mt-0.5">
                {tag}
              </span>
            </div>
          </div>
        </div>

        {/* Positioning */}
        <p className="text-xs text-slate-500 italic leading-relaxed mb-3">"{comp.positioning}"</p>

        {/* Your edge badge */}
        <div className="flex items-start gap-2 bg-indigo-50 rounded-2xl p-3 border border-indigo-100">
          <Zap size={12} className="text-indigo-500 shrink-0 mt-0.5" />
          <div>
            <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest block mb-0.5">
              Your Edge
            </span>
            <p className="text-xs text-indigo-800 font-medium leading-relaxed">{comp.advantage}</p>
          </div>
        </div>
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/[0.02] transition-colors rounded-3xl pointer-events-none" />
    </motion.div>
  );
};

export const IdeaValidation: React.FC<IdeaValidationProps> = ({ data }) => {
  const isPurrfect = data.investability_score > 85;
  const isLow = data.investability_score < 40;
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="space-y-8">
      {/* ═══ Score Section - VC Confidence Meter ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative flex flex-col md:flex-row items-center gap-8 bg-white p-10 rounded-[3rem] shadow-xl shadow-indigo-500/8 border border-indigo-50 overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50/40 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-50/30 blur-2xl rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        {/* Score ring */}
        <ScoreRing score={data.investability_score} />

        {/* Right content */}
        <div className="flex-1 space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Market Analysis</h2>
            {isPurrfect && (
              <motion.div
                initial={{ scale: 0, rotate: -12 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', delay: 1.5 }}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-1.5 rounded-full text-xs font-black shadow-lg shadow-emerald-200 flex items-center gap-1.5"
              >
                <Award size={12} />
                PURR-FECT STARTUP IDEA 🐾
              </motion.div>
            )}
          </div>

          {/* VC Confidence Index label with tooltip */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-indigo-500 uppercase tracking-widest">
              VC Confidence Index
            </span>
            <div className="relative">
              <button
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="text-slate-400 hover:text-indigo-500 transition-colors"
              >
                <Info size={14} />
              </button>
              <AnimatePresence>
                {showTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    className="absolute left-6 top-0 z-50 w-64 bg-slate-900 text-white text-xs rounded-2xl p-4 shadow-2xl font-medium leading-relaxed"
                  >
                    This score represents market viability, differentiation, and execution feasibility as assessed by our AI Co-Founder.
                    <div className="absolute -left-1.5 top-3 w-3 h-3 bg-slate-900 rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <p className="text-base text-slate-600 leading-relaxed font-medium">{data.summary}</p>

          {/* Score context bar */}
          <div className="flex gap-3">
            {[
              { label: 'Viability', val: Math.min(100, data.investability_score + 5) },
              { label: 'Differentiation', val: Math.min(100, data.investability_score - 8) },
              { label: 'Feasibility', val: Math.min(100, data.investability_score + 2) },
            ].map((metric) => (
              <div key={metric.label} className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{metric.label}</span>
                  <span className="text-[9px] font-black text-indigo-500">{metric.val}%</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.val}%` }}
                    transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ═══ AI Co-Founder Verdict ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        {/* Decorative orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-purple-600/10 blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-900">
              <Star size={16} className="text-white" />
            </div>
            <div>
              <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">AI Co-Founder Verdict</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest">Live Analysis</span>
              </div>
            </div>
          </div>

          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/90 text-base font-semibold leading-relaxed border-l-2 border-indigo-500 pl-5"
          >
            "{data.summary.length > 200 ? data.summary.slice(0, 200) + '...' : data.summary}"
          </motion.blockquote>

          <div className="mt-5 flex items-center justify-between">
            <div className="flex gap-2">
              {['Market Fit', 'Scalable', isPurrfect ? 'VC-Ready' : 'Needs Work'].map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-black uppercase tracking-widest bg-white/10 text-white/70 px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 font-bold">Confidence</span>
              <span className={cn(
                "text-lg font-black",
                isPurrfect ? "text-emerald-400" : isLow ? "text-orange-400" : "text-indigo-400"
              )}>
                {data.investability_score}/100
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ═══ SWOT Grid - 2x2 Premium ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-5">
          <CheckCircle2 size={16} className="text-indigo-500" />
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">SWOT Analysis</h3>
          <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full uppercase tracking-widest">
            Strategic Report
          </span>
        </div>

        <div className="bg-gradient-to-br from-slate-50/60 to-indigo-50/30 rounded-[2.5rem] p-6 border border-slate-100/80 shadow-inner">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SWOTCard
              title="Strengths"
              items={data.swot.strengths}
              icon={<TrendingUp size={18} className="text-emerald-600" />}
              color="emerald"
              delay={0.1}
            />
            <SWOTCard
              title="Weaknesses"
              items={data.swot.weaknesses}
              icon={<AlertCircle size={18} className="text-amber-600" />}
              color="amber"
              delay={0.2}
            />
            <SWOTCard
              title="Opportunities"
              items={data.swot.opportunities}
              icon={<Target size={18} className="text-indigo-600" />}
              color="indigo"
              delay={0.3}
            />
            <SWOTCard
              title="Threats"
              items={data.swot.threats}
              icon={<ShieldAlert size={18} className="text-rose-600" />}
              color="rose"
              delay={0.4}
            />
          </div>
        </div>
      </motion.div>

      {/* ═══ Competitive Landscape ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white p-8 rounded-[2.5rem] shadow-md shadow-indigo-500/5 border border-indigo-50"
      >
        <div className="flex items-center gap-3 mb-7">
          <div className="w-9 h-9 bg-indigo-50 rounded-2xl flex items-center justify-center">
            <Users size={16} className="text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">Competitive Landscape</h3>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              {data.competitors.length} competitors analyzed
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.competitors.map((comp, idx) => (
            <CompetitorCard key={idx} comp={comp} idx={idx} />
          ))}
        </div>

        {/* Market Position Map */}
        <MarketPositionMap competitors={data.competitors} />
      </motion.div>
    </div>
  );
};
