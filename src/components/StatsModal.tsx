import React from 'react';
import { X, Trophy, CheckCircle2, Bookmark, RotateCcw } from 'lucide-react';
import { InterviewQuestion, QuestionCategory } from '../types';
import { CATEGORIES } from '../data/categories';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: InterviewQuestion[];
  onResetDefaults: () => void;
  onSelectCategory: (cat: QuestionCategory) => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose,
  questions,
  onResetDefaults,
  onSelectCategory,
}) => {
  if (!isOpen) return null;

  const total = questions.length;
  const masteredCount = questions.filter((q) => q.status === 'mastered').length;
  const bookmarkedCount = questions.filter((q) => q.isBookmarked).length;
  const percentMastered = total > 0 ? Math.round((masteredCount / total) * 100) : 0;

  const categoryStats = CATEGORIES.filter((c) => c.id !== 'All Topics').map((cat) => {
    const catQuestions = questions.filter((q) => q.category === cat.id);
    const catMastered = catQuestions.filter((q) => q.status === 'mastered').length;
    return {
      category: cat.id,
      label: cat.label,
      total: catQuestions.length,
      mastered: catMastered,
      pct: catQuestions.length > 0 ? Math.round((catMastered / catQuestions.length) * 100) : 0,
    };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="flex max-h-[90vh] w-full max-w-xl flex-col rounded-2xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <Trophy className="h-5 w-5 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900">Your Interview Preparation Progress</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Summary Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 text-center">
              <span className="text-xs font-semibold text-blue-800 uppercase tracking-tight">Total Questions</span>
              <div className="mt-1 text-2xl font-black text-blue-900">{total}</div>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 text-center">
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-tight">Mastered</span>
              <div className="mt-1 text-2xl font-black text-emerald-900">{masteredCount}</div>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 text-center">
              <span className="text-xs font-semibold text-amber-800 uppercase tracking-tight">Saved</span>
              <div className="mt-1 text-2xl font-black text-amber-900">{bookmarkedCount}</div>
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Overall Readiness</span>
              <span>{percentMastered}% Complete</span>
            </div>
            <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-linear-to-r from-blue-500 to-emerald-500 transition-all duration-500"
                style={{ width: `${percentMastered}%` }}
              ></div>
            </div>
          </div>

          {/* Breakdown by Topic */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Progress by Topic
            </h4>
            <div className="space-y-2.5">
              {categoryStats.map((stat) => (
                <div
                  key={stat.category}
                  onClick={() => {
                    onSelectCategory(stat.category);
                    onClose();
                  }}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <div className="min-w-0 flex-1 pr-4">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-800 mb-1">
                      <span className="truncate">{stat.label}</span>
                      <span className="text-slate-500 text-[11px]">
                        {stat.mastered} / {stat.total}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${stat.pct}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-600">{stat.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reset / Restore default questions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500">Need to restore original questions?</span>
            <button
              onClick={() => {
                if (window.confirm('Reset all questions to default book set?')) {
                  onResetDefaults();
                  onClose();
                }
              }}
              className="flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Restore Default Questions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
