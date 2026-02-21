import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, AlertCircle, TrendingUp, Target, Users, ShieldAlert } from 'lucide-react';
import type { ValidationResponse } from '../services/ai';
import { cn } from '../lib/utils';

interface IdeaValidationProps {
  data: ValidationResponse;
}

export const IdeaValidation: React.FC<IdeaValidationProps> = ({ data }) => {
  const isPurrfect = data.investability_score > 85;

  return (
    <div className="space-y-8">
      {/* Score Header */}
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-10 rounded-[3rem] shadow-xl shadow-indigo-500/5 border border-indigo-50 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-100/50 transition-colors" />
        
        <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90 drop-shadow-lg">
            <circle
              cx="80"
              cy="80"
              r="72"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-indigo-50"
            />
            <motion.circle
              cx="80"
              cy="80"
              r="72"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={452.4}
              initial={{ strokeDashoffset: 452.4 }}
              animate={{ strokeDashoffset: 452.4 - (452.4 * data.investability_score) / 100 }}
              transition={{ duration: 2, ease: "circOut" }}
              className="text-indigo-600"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-black text-indigo-900">{data.investability_score}</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-indigo-400 font-black">Score</span>
          </div>
        </div>

        <div className="flex-1 space-y-6 relative z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Market Analysis</h2>
            {isPurrfect && (
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                className="bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-black shadow-lg shadow-emerald-200 flex items-center gap-2"
              >
                PURR-FECT IDEA! 🐾
              </motion.div>
            )}
          </div>
          <p className="text-lg text-slate-600 leading-relaxed font-medium">{data.summary}</p>
        </div>
      </div>

      {/* SWOT Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SWOTCard title="Strengths" items={data.swot.strengths} icon={<TrendingUp size={24} className="text-emerald-500" />} color="emerald" />
        <SWOTCard title="Weaknesses" items={data.swot.weaknesses} icon={<AlertCircle size={24} className="text-amber-500" />} color="amber" />
        <SWOTCard title="Opportunities" items={data.swot.opportunities} icon={<Target size={24} className="text-indigo-500" />} color="indigo" />
        <SWOTCard title="Threats" items={data.swot.threats} icon={<ShieldAlert size={24} className="text-rose-500" />} color="rose" />
      </div>

      {/* Competitors */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-indigo-50">
        <div className="flex items-center gap-2 mb-6">
          <Users className="text-indigo-600" />
          <h3 className="text-xl font-bold text-slate-900">Competitive Landscape</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.competitors.map((comp, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h4 className="font-bold text-slate-900">{comp.name}</h4>
              <p className="text-sm text-slate-500 italic">"{comp.positioning}"</p>
              <div className="pt-2">
                <span className="text-[10px] uppercase font-bold text-indigo-500 block mb-1">Your Advantage</span>
                <p className="text-sm text-slate-700">{comp.advantage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SWOTCard = ({ title, items, icon, color }: { title: string, items: string[], icon: React.ReactNode, color: string }) => {
  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-50 border-emerald-100",
    amber: "bg-amber-50 border-amber-100",
    indigo: "bg-indigo-50 border-indigo-100",
    rose: "bg-rose-50 border-rose-100"
  };

  return (
    <div className={cn("p-6 rounded-3xl border h-full", colorMap[color])}>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="font-bold text-slate-900">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="text-sm text-slate-600 flex gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current opacity-40 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
