/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TELEMETRY_QUESTIONS } from '../data/questions';
import { soundFx } from '../utils/audio';
import { 
  HelpCircle, 
  CheckCircle2, 
  Download, 
  Copy, 
  RotateCcw, 
  Sparkles,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuestionsScreenProps {
  answers: Record<number, string>;
  onSaveAnswer: (id: number, text: string) => void;
  onClearAnswers: () => void;
}

export const QuestionsScreen: React.FC<QuestionsScreenProps> = ({
  answers,
  onSaveAnswer,
  onClearAnswers
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [copied, setCopied] = useState(false);

  const categories = ['ALL', 'MILESTONE', 'VELOCITY', 'ASPHALT', 'GARAGE', 'CREW', 'HORSEPOWER', 'NIGHT RUN', 'CORE ENGINE', 'LAUNCH'];

  const answeredCount = Object.values(answers).filter((val): val is string => typeof val === 'string' && val.trim().length > 0).length;
  const progressPercent = Math.round((answeredCount / TELEMETRY_QUESTIONS.length) * 100);

  const filteredQuestions = activeCategory === 'ALL'
    ? TELEMETRY_QUESTIONS
    : TELEMETRY_QUESTIONS.filter(q => q.category === activeCategory);

  const handleTextChange = (id: number, val: string) => {
    onSaveAnswer(id, val);
    if (val.trim().length > 0 && !answers[id]) {
      soundFx.playClick(1000, 0.03);
    }
  };

  const handleExport = () => {
    soundFx.playClick();
    const exportContent = TELEMETRY_QUESTIONS.map(q => {
      return `Q${q.id} [${q.category}]: ${q.question}\nANSWER: ${answers[q.id] || '(Unanswered)'}\n\n`;
    }).join('');

    const blob = new Blob([`MOI / 20 — 20 QUESTIONS TELEMETRY REPORT\nGenerated on Birthday Edition 2026\n=========================================\n\n${exportContent}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MOI_20_Telemetry_Questions_Report.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    soundFx.playClick();
    const exportContent = TELEMETRY_QUESTIONS.map(q => {
      return `Q${q.id}: ${q.question}\nA: ${answers[q.id] || '-'}\n`;
    }).join('\n');

    navigator.clipboard.writeText(`MOI / 20 TELEMETRY LOG:\n\n${exportContent}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Header section matching Image 9 */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-mono text-zinc-400 uppercase tracking-widest mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>03 // REFLECTIONS & CALIBRATION</span>
          </div>
          <h1 className="font-speed font-black text-4xl sm:text-5xl text-white tracking-tight uppercase">
            20 QUESTIONS
          </h1>
          <p className="text-sm font-sans text-zinc-400 mt-1 max-w-xl">
            Answer all 20 before the night ends. No skips. Deep reflections on mindset, horsepower, dream machines, and the road ahead.
          </p>
        </div>

        {/* Progress Tracker Card */}
        <div className="w-full md:w-80 rounded-2xl bg-zinc-900/90 border border-zinc-800 p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400">TELEMETRY PROGRESS</span>
            <span className="font-bold text-white">{answeredCount} / 20 COMPLETED</span>
          </div>
          <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
            <motion.div 
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-400"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] font-mono text-zinc-400">{progressPercent}% LOGGED</span>
            <div className="flex items-center gap-2">
              <button
                id="btn-copy-questions"
                onClick={handleCopy}
                title="Copy answers to clipboard"
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono flex items-center gap-1 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'COPIED' : 'COPY'}</span>
              </button>
              <button
                id="btn-export-questions"
                onClick={handleExport}
                title="Download report file"
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono flex items-center gap-1 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 max-w-full">
          {categories.slice(0, 6).map(cat => (
            <button
              key={cat}
              onClick={() => { soundFx.playClick(); setActiveCategory(cat); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all shrink-0 ${
                activeCategory === cat 
                  ? 'bg-zinc-100 text-zinc-950 font-bold' 
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {answeredCount > 0 && (
          <button
            onClick={() => {
              if (confirm("Reset all 20 question answers?")) {
                onClearAnswers();
              }
            }}
            className="text-[11px] font-mono text-zinc-400 hover:text-red-400 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>RESET ANSWERS</span>
          </button>
        )}
      </div>

      {/* 20 Questions Grid matching Screenshot Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredQuestions.map((q) => {
          const isAnswered = Boolean(answers[q.id] && answers[q.id].trim().length > 0);
          return (
            <div
              key={q.id}
              id={`question-card-${q.id}`}
              className={`rounded-2xl border p-5 space-y-3.5 transition-all duration-200 ${
                isAnswered 
                  ? 'bg-zinc-900/80 border-zinc-700 shadow-md' 
                  : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              {/* Question Top Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-speed font-bold text-sm text-zinc-400">
                    #{q.id < 10 ? `0${q.id}` : q.id}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 uppercase tracking-wider">
                    {q.category}
                  </span>
                </div>

                {isAnswered ? (
                  <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>RECORDED</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-zinc-400">
                    PENDING
                  </span>
                )}
              </div>

              {/* Question Text */}
              <h3 className="text-sm sm:text-base font-mono font-medium text-white leading-snug">
                {q.question}
              </h3>

              {/* Input Area */}
              <div className="space-y-1.5 pt-1">
                <textarea
                  id={`input-q-${q.id}`}
                  rows={2}
                  value={answers[q.id] || ''}
                  onChange={(e) => handleTextChange(q.id, e.target.value)}
                  placeholder={q.suggestedPlaceholder || "Type your reflection here..."}
                  className="w-full rounded-xl bg-zinc-950/80 border border-zinc-800 focus:border-zinc-500 focus:outline-none px-3.5 py-2.5 text-xs font-mono text-zinc-100 placeholder:text-zinc-400 transition-colors resize-none"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
