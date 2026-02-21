import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Rocket, Milestone, Cpu, ShieldAlert, Copy, Check } from 'lucide-react';
import type { RoadmapResponse } from '../services/ai';
import { cn } from '../lib/utils';

interface RoadmapGeneratorProps {
  data: RoadmapResponse;
}

export const RoadmapGenerator: React.FC<RoadmapGeneratorProps> = ({ data }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Rocket className="text-indigo-600" />
          MVP Launch Roadmap
        </h2>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm"
        >
          {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
          {copied ? 'Copied!' : 'Copy Roadmap'}
        </button>
      </div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-indigo-100 -translate-x-1/2 hidden md:block" />

        <div className="space-y-12">
          <TimelineItem 
            title="Week 1: Foundation" 
            data={data.week_1} 
            icon={<Calendar className="text-indigo-600" />} 
            side="left"
          />
          <TimelineItem 
            title="Month 1: Core Product" 
            data={data.month_1} 
            icon={<Milestone className="text-indigo-600" />} 
            side="right"
          />
          <TimelineItem 
            title="Quarter 1: Growth" 
            data={data.quarter_1} 
            icon={<Rocket className="text-indigo-600" />} 
            side="left"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-indigo-50">
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="text-indigo-600" />
            <h3 className="font-bold text-slate-900">Suggested Tech Stack</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.suggested_tech_stack.map((tech, idx) => (
              <span key={idx} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold border border-indigo-100">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-rose-50">
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert className="text-rose-600" />
            <h3 className="font-bold text-slate-900">Risks to Watch</h3>
          </div>
          <ul className="space-y-2">
            {data.risks_to_watch.map((risk, idx) => (
              <li key={idx} className="text-sm text-slate-600 flex gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                {risk}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const TimelineItem = ({ title, data, icon, side }: { title: string, data: any, icon: React.ReactNode, side: 'left' | 'right' }) => {
  return (
    <div className={cn(
      "relative flex flex-col md:flex-row items-center gap-8",
      side === 'right' ? "md:flex-row-reverse" : ""
    )}>
      {/* Icon Node */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-indigo-100 z-10 hidden md:flex items-center justify-center shadow-sm">
        <div className="w-2 h-2 rounded-full bg-indigo-600" />
      </div>

      <div className="w-full md:w-1/2 pl-12 md:pl-0">
        <motion.div
          initial={{ opacity: 0, x: side === 'left' ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:border-indigo-200 transition-colors"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-50 rounded-xl">
              {icon}
            </div>
            <h3 className="font-bold text-lg text-slate-900">{title}</h3>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-indigo-500 block mb-2">Goals</span>
              <ul className="space-y-1">
                {data.goals.map((goal: string, idx: number) => (
                  <li key={idx} className="text-sm text-slate-600 flex gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-indigo-300 shrink-0" />
                    {goal}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-500 block mb-2">Key Features</span>
              <div className="flex flex-wrap gap-2">
                {data.features.map((feat: string, idx: number) => (
                  <span key={idx} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-bold border border-emerald-100">
                    {feat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="hidden md:block w-1/2" />
    </div>
  );
};
