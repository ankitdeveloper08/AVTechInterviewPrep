import React from 'react';
import { BookOpen, Plus, Sparkles, BarChart2, Bookmark, LogIn, LogOut } from 'lucide-react';
import { AuthUser, QuestionCategory } from '../types';
import { CATEGORIES } from '../data/categories';

interface NavbarProps {
  activeCategory: QuestionCategory;
  onSelectCategory: (category: QuestionCategory) => void;
  onOpenAddModal: () => void;
  onOpenStatsModal: () => void;
  isStudyMode: boolean;
  onToggleStudyMode: () => void;
  bookmarkedCount: number;
  showOnlyBookmarked: boolean;
  onToggleShowBookmarked: () => void;
  totalQuestions: number;
  user: AuthUser;
  onLogout: () => void;
  canManageQuestions: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenAddModal,
  onOpenStatsModal,
  isStudyMode,
  onToggleStudyMode,
  bookmarkedCount,
  showOnlyBookmarked,
  onToggleShowBookmarked,
  totalQuestions,
  user,
  onLogout,
  canManageQuestions
}) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-xs">
      {/* Top Header Row */}
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
            <BookOpen className="h-5 w-5 stroke-[2.2]" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900">Tech Interview Prep</h1>
            <p className="hidden text-xs text-slate-500 sm:block">Top 500 .NET & Full-Stack Questions</p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 border-r border-slate-200 pr-3 sm:flex">
            {user.picture ? <img src={user.picture} alt="" className="h-8 w-8 rounded-full" /> : <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">{user.name.slice(0, 1).toUpperCase()}</div>}
            <div className="max-w-32">
              <p className="truncate text-xs font-semibold text-slate-800">{user.name}</p>
              <p className="truncate text-[10px] text-slate-500">{user.email}</p>
            </div>
            <button onClick={onLogout} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900" title="Sign out"><LogOut className="h-4 w-4" /></button>
          </div>
          {/* Bookmark filter toggle */}
          <button
            onClick={onToggleShowBookmarked}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
              showOnlyBookmarked
                ? 'bg-amber-100 text-amber-900 ring-1 ring-amber-400'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
            title="Filter saved bookmarks"
          >
            <Bookmark className={`h-4 w-4 ${showOnlyBookmarked ? 'fill-amber-500 text-amber-600' : 'text-slate-500'}`} />
            <span className="hidden sm:inline">Saved</span>
            <span className="ml-0.5 rounded-full bg-slate-200/80 px-1.5 py-0.2 text-[10px] font-bold text-slate-700">
              {bookmarkedCount}
            </span>
          </button>

          {/* Flashcard / Study Mode Toggle */}
          <button
            onClick={onToggleStudyMode}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
              isStudyMode
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
            title="Toggle Flashcard Self-Testing Mode"
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">{isStudyMode ? 'Exit Study Mode' : 'Quiz & Flashcards'}</span>
          </button>

          {/* Stats Progress Modal */}
          <button
            onClick={onOpenStatsModal}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            title="View Preparation Progress"
          >
            <BarChart2 className="h-4 w-4 text-slate-500" />
            <span className="hidden md:inline">Progress</span>
          </button>

          {canManageQuestions && (
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-blue-700 active:scale-98"
            >
              <Plus className="h-4 w-4 stroke-[2.5]" />
              <span>Add Question</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Bar - Scrollable horizontal pills */}
      <div className="border-t border-slate-100 px-4 py-2.5 sm:px-6">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id && !showOnlyBookmarked;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (showOnlyBookmarked) onToggleShowBookmarked();
                  onSelectCategory(cat.id);
                }}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
