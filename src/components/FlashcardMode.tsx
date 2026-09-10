import React, { useState } from 'react';
import { Eye, CheckCircle2, RotateCcw, ChevronLeft, ChevronRight, X, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { InterviewQuestion } from '../types';

interface FlashcardModeProps {
  questions: InterviewQuestion[];
  onClose: () => void;
  onMarkMastered: (id: number) => void;
}

export const FlashcardMode: React.FC<FlashcardModeProps> = ({
  questions,
  onClose,
  onMarkMastered,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  if (!questions || questions.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-slate-600 font-medium">No questions available in this category.</p>
          <button
            onClick={onClose}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white"
          >
            Return to Questions
          </button>
        </div>
      </div>
    );
  }

  const current = questions[currentIndex];

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsRevealed(false);
    } else {
      setSessionCompleted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsRevealed(false);
    }
  };

  const handleMarkAndNext = () => {
    onMarkMastered(current.id);
    handleNext();
  };

  if (sessionCompleted) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
        <div className="max-w-md w-full rounded-2xl bg-white p-8 text-center shadow-lg border border-slate-200">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 mb-4">
            <Trophy className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Session Complete!</h3>
          <p className="mt-2 text-xs text-slate-600">
            You reviewed all {questions.length} questions in this deck. Consistency is key to acing technical interviews!
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setIsRevealed(false);
                setSessionCompleted(false);
              }}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <RotateCcw className="h-4 w-4" /> Practice Again
            </button>
            <button
              onClick={onClose}
              className="rounded-lg bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-700"
            >
              Back to Reader
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-100/70 p-4 sm:p-8 overflow-y-auto">
      {/* Top Controls */}
      <div className="mx-auto max-w-3xl w-full flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-blue-600 px-2.5 py-1 text-xs font-bold text-white">
            Flashcard {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-xs font-medium text-slate-500">({current.category})</span>
        </div>
        <button
          onClick={onClose}
          className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          <X className="h-4 w-4" /> Exit Mode
        </button>
      </div>

      {/* Flashcard Card */}
      <div className="mx-auto max-w-3xl w-full flex-1 flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
        <div>
          {/* Category */}
          <div className="mb-4 inline-block rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-bold text-blue-700 uppercase">
            Q{current.questionNumber} • {current.category}
          </div>

          {/* Question Title */}
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900 leading-snug">
            {current.title}
          </h2>

          {/* Reveal Button or Answer */}
          {!isRevealed ? (
            <div className="mt-12 mb-8 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
              <p className="text-xs text-slate-500 mb-3">Think through your answer before revealing</p>
              <button
                onClick={() => setIsRevealed(true)}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-xs font-bold text-white shadow-sm hover:bg-blue-700 active:scale-98 transition-all"
              >
                <Eye className="h-4 w-4" />
                <span>Reveal Detailed Answer</span>
              </button>
            </div>
          ) : (
            <div className="mt-6 space-y-3 rounded-xl border border-emerald-100 bg-emerald-50/40 p-5 animate-in fade-in duration-200">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Correct Answer Breakdown:
              </div>
              {current.detailedPoints.map((point, idx) => (
                <p key={idx} className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                  {point}
                </p>
              ))}

              {current.codeSnippet && (
                <div className="mt-4 rounded-lg bg-slate-900 p-3 text-xs font-mono text-emerald-300 overflow-x-auto">
                  <pre>{current.codeSnippet.code}</pre>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Navigation & Mastery Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`flex items-center gap-1 rounded-lg border px-3 py-2 text-xs font-semibold ${
                currentIndex === 0
                  ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleNext}
              className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-900 hover:bg-amber-100"
            >
              Needs Review
            </button>
            <button
              onClick={handleMarkAndNext}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-700"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Mark as Mastered</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
