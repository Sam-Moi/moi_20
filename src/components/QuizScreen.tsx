/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QUIZ_DATA } from '../data/quiz';
import { soundFx } from '../utils/audio';
import { Zap, CheckCircle2, XCircle, Trophy, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuizScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQ = QUIZ_DATA[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      soundFx.playUnlock();
      setScore(prev => prev + 1);
    } else {
      soundFx.playClick(400, 0.1);
    }
  };

  const handleNext = () => {
    soundFx.playClick();
    if (currentIndex + 1 < QUIZ_DATA.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    soundFx.playClick();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Header section matching Image 22 */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-mono text-zinc-400 uppercase tracking-widest mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
            <span>06 // BIRTHDAY TRIVIA TELEMETRY</span>
          </div>
          <h1 className="font-speed font-black text-4xl sm:text-5xl text-white tracking-tight uppercase">
            MOI 20 TRIVIA
          </h1>
          <p className="text-sm font-sans text-zinc-400 mt-1 max-w-xl">
            Test your knowledge on the 20-year telemetry specs, dream machines, and milestones.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-white font-bold">
          SCORE: {score} / {QUIZ_DATA.length}
        </div>
      </div>

      {!showResult ? (
        <div className="rounded-3xl bg-zinc-900/70 border border-zinc-800 p-6 sm:p-10 space-y-8 shadow-xl">
          {/* Question Counter */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">
              QUESTION {currentIndex + 1} OF {QUIZ_DATA.length}
            </span>
            <div className="flex gap-1.5">
              {QUIZ_DATA.map((_, i) => (
                <span
                  key={i}
                  className={`w-5 h-1.5 rounded-full transition-colors ${
                    i === currentIndex 
                      ? 'bg-amber-400' 
                      : i < currentIndex 
                      ? 'bg-emerald-500' 
                      : 'bg-zinc-800'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question Text */}
          <h2 className="text-xl sm:text-2xl font-mono font-bold text-white leading-relaxed">
            {currentQ.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let style = "bg-zinc-950/80 border-zinc-800 text-zinc-200 hover:border-zinc-600";
              if (isAnswered) {
                if (isCorrect) {
                  style = "bg-emerald-950/80 border-emerald-500 text-white shadow-lg shadow-emerald-950/50";
                } else if (isSelected) {
                  style = "bg-red-950/80 border-red-500 text-white shadow-lg shadow-red-950/50";
                } else {
                  style = "bg-zinc-950/40 border-zinc-900 text-zinc-400 opacity-60";
                }
              }

              return (
                <button
                  key={idx}
                  id={`quiz-option-${idx}`}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-2xl border font-mono text-xs sm:text-sm text-left flex items-center justify-between transition-all duration-200 ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation banner if answered */}
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300 space-y-1"
            >
              <div className="text-[10px] text-zinc-400 uppercase font-bold">TELEMETRY DEBRIEF:</div>
              <p>{currentQ.explanation}</p>
            </motion.div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                id="btn-quiz-next"
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-mono font-bold text-xs tracking-wider flex items-center gap-2 transition-transform active:scale-95 shadow-lg"
              >
                <span>{currentIndex + 1 === QUIZ_DATA.length ? 'VIEW FINAL REPORT' : 'NEXT TELEMETRY QUESTION'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Result Screen */
        <div className="rounded-3xl bg-zinc-900/90 border border-zinc-800 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-800/60 text-amber-400 inline-block">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="font-speed font-black text-3xl sm:text-4xl text-white uppercase">
            TRIVIA COMPLETE
          </h2>

          <p className="text-base font-mono text-zinc-300">
            You scored <span className="text-emerald-400 font-bold text-xl">{score} / {QUIZ_DATA.length}</span> on the MOI 20 telemetry test!
          </p>

          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 max-w-md mx-auto text-xs font-mono text-zinc-400">
            {score === QUIZ_DATA.length 
              ? "Flawless Score! You are officially calibrated with MOI 2.0 telemetry standards." 
              : "Great run! You have locked down key insights into the 2026 birthday edition."}
          </div>

          <div className="pt-4 flex justify-center">
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-mono font-bold text-xs tracking-wider flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RESTART QUIZ</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
