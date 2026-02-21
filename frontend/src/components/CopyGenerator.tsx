import React from 'react';
import { motion } from 'motion/react';
import { Layout, MessageSquare, Copy, Check, MousePointer2 } from 'lucide-react';
import type { CopyResponse } from '../services/ai';
import { cn } from '../lib/utils';

interface CopyGeneratorProps {
  data: CopyResponse;
}

export const CopyGenerator: React.FC<CopyGeneratorProps> = ({ data }) => {
  const [copied, setCopied] = React.useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Copy Sections */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <MessageSquare className="text-indigo-600" />
          Content Strategy
        </h2>

        <div className="space-y-6">
          <CopyBlock 
            label="Hero Headline" 
            content={data.hero_headline} 
            onCopy={() => handleCopy(data.hero_headline, 'headline')}
            isCopied={copied === 'headline'}
          />
          <CopyBlock 
            label="Subheadline" 
            content={data.subheadline} 
            onCopy={() => handleCopy(data.subheadline, 'sub')}
            isCopied={copied === 'sub'}
          />
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-indigo-500 block mb-3">Value Propositions</span>
            <ul className="space-y-3">
              {data.value_props.map((prop, idx) => (
                <li key={idx} className="flex items-start gap-3 group">
                  <div className="mt-1 p-1 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                    <Check size={12} className="text-indigo-600" />
                  </div>
                  <p className="text-sm text-slate-700">{prop}</p>
                </li>
              ))}
            </ul>
          </div>
          <CopyBlock 
            label="Elevator Pitch" 
            content={data.pitch_script} 
            onCopy={() => handleCopy(data.pitch_script, 'pitch')}
            isCopied={copied === 'pitch'}
            multiline
          />
        </div>
      </div>

      {/* Preview Mockup */}
      <div className="space-y-6">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Layout size={16} />
          Visual Preview
        </h3>
        
        <div className="sticky top-8 bg-slate-900 rounded-[2.5rem] p-4 shadow-2xl border-8 border-slate-800 aspect-[9/16] max-w-[320px] mx-auto overflow-hidden">
          <div className="bg-white h-full w-full rounded-[1.5rem] overflow-y-auto scrollbar-hide">
            {/* Browser Header */}
            <div className="h-6 bg-slate-100 flex items-center px-4 gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>

            {/* Mock Landing Content */}
            <div className="p-6 space-y-8 text-center pt-12">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h1 className="text-2xl font-black text-slate-900 leading-tight">
                  {data.hero_headline}
                </h1>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {data.subheadline}
                </p>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-indigo-200 flex items-center justify-center gap-2"
              >
                {data.cta}
                <MousePointer2 size={16} />
              </motion.button>

              <div className="space-y-4 pt-4">
                {data.value_props.slice(0, 3).map((prop, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-2xl text-left border border-slate-100">
                    <p className="text-xs font-medium text-slate-800">{prop}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CopyBlock = ({ label, content, onCopy, isCopied, multiline }: { label: string, content: string, onCopy: () => void, isCopied: boolean, multiline?: boolean }) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 group relative">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] uppercase font-bold text-indigo-500">{label}</span>
        <button
          onClick={onCopy}
          className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400 hover:text-indigo-600"
        >
          {isCopied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
        </button>
      </div>
      <p className={cn(
        "text-slate-800 font-medium",
        multiline ? "text-sm leading-relaxed" : "text-lg leading-tight"
      )}>
        {content}
      </p>
    </div>
  );
};
