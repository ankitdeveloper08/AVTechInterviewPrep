import React from 'react';
import { Search, ChevronsLeft, ChevronsRight, Bookmark, CheckCircle2, X } from 'lucide-react';
import { InterviewQuestion } from '../types';

interface SidebarProps {
  questions: InterviewQuestion[];
  selectedQuestionId: number;
  onSelectQuestion: (question: InterviewQuestion) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onToggleBookmark: (id: number, e: React.MouseEvent) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  questions,
  selectedQuestionId,
  onSelectQuestion,
  searchQuery,
  onSearchChange,
  isCollapsed,
  onToggleCollapse,
  onToggleBookmark,
}) => {
  if (isCollapsed) {
    return (
      <aside className="flex flex-col items-center border-r border-slate-200 bg-white py-4 px-2 w-14 shrink-0">
        <button
          onClick={onToggleCollapse}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
          title="Expand sidebar"
        >
          <ChevronsRight className="h-5 w-5" />
        </button>

        <div className="mt-6 flex flex-col items-center gap-2 overflow-y-auto w-full">
          {questions.slice(0, 30).map((q) => {
            const isSelected = q.id === selectedQuestionId;
            return (
              <button
                key={q.id}
                onClick={() => onSelectQuestion(q)}
                title={q.title}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {q.questionNumber}
              </button>
            );
          })}
        </div>
      </aside>
    );
  }

  return (
    <aside className="flex h-[calc(100vh-105px)] w-80 sm:w-96 flex-col border-r border-slate-200 bg-white shrink-0">
      {/* Search Header */}
      <div className="p-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search questions..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-1.5 pl-9 pr-8 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <button
            onClick={onToggleCollapse}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors shrink-0"
            title="Collapse sidebar"
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>
        </div>

        {/* Results summary */}
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 px-1">
          <span>{questions.length} questions available</span>
          {searchQuery && (
            <span className="text-blue-600 font-medium">Filtering by "{searchQuery}"</span>
          )}
        </div>
      </div>

      {/* Questions Scrollable List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
        {questions.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-500">
            No questions match your current search and filters.
          </div>
        ) : (
          questions.map((q) => {
            const isSelected = q.id === selectedQuestionId;
            return (
              <div
                key={q.id}
                onClick={() => onSelectQuestion(q)}
                className={`group relative flex items-start gap-3 p-3.5 cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-blue-50/80 border-l-4 border-blue-600 shadow-2xs'
                    : 'hover:bg-slate-50 border-l-4 border-transparent'
                }`}
              >
                {/* Number Circle */}
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                  }`}
                >
                  {q.questionNumber}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-block rounded bg-blue-100/70 px-1.5 py-0.5 text-[10px] font-semibold text-blue-800 uppercase tracking-tight">
                      {q.category}
                    </span>
                    {q.status === 'mastered' && (
                      <span className="flex items-center gap-0.5 text-[10px] font-medium text-emerald-600">
                        <CheckCircle2 className="h-3 w-3" /> Mastered
                      </span>
                    )}
                  </div>
                  <h3 className="line-clamp-2 text-xs font-bold leading-snug text-slate-800 uppercase">
                    {q.title}
                  </h3>
                </div>

                {/* Bookmark Toggle Icon */}
                <button
                  onClick={(e) => onToggleBookmark(q.id, e)}
                  className="p-1 text-slate-300 hover:text-amber-500 transition-colors shrink-0"
                  title={q.isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
                >
                  <Bookmark
                    className={`h-4 w-4 ${
                      q.isBookmarked ? 'fill-amber-400 text-amber-500' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </button>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};
