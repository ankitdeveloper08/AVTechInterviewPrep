import React, { useState } from 'react';
import {
  Copy,
  Check,
  Edit,
  Bookmark,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Printer,
  Sparkles
} from 'lucide-react';
import { InterviewQuestion } from '../types';
import { DiagramRenderer } from './DiagramRenderer';

interface QuestionDetailProps {
  question: InterviewQuestion;
  onEdit: (question: InterviewQuestion) => void;
  onToggleBookmark: (id: number) => void;
  onToggleMastered: (id: number) => void;
  onPrevQuestion: () => void;
  onNextQuestion: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  canManageQuestions: boolean;
}

export const QuestionDetail: React.FC<QuestionDetailProps> = ({
  question,
  onEdit,
  onToggleBookmark,
  onToggleMastered,
  onPrevQuestion,
  onNextQuestion,
  hasPrev,
  hasNext,
  canManageQuestions,
}) => {
  const [copied, setCopied] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const images = question.images || (question.screenshot
    ? [{ id: `legacy-${question.id}`, dataUrl: question.screenshot }]
    : []);

  const handleCopyAnswer = () => {
    const textToCopy = `${question.title}\n\n` +
      question.detailedPoints.join('\n\n') +
      (question.codeSnippet ? `\n\nCode Example:\n${question.codeSnippet.code}` : '');
    
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCode = () => {
    if (!question.codeSnippet) return;
    navigator.clipboard.writeText(question.codeSnippet.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50/50 p-4 sm:p-8 lg:p-10">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Top Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Category Badge matching image.png */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1 text-xs font-bold text-blue-700">
            <span>{question.category}</span>
            {question.difficulty && (
              <span className="rounded bg-blue-200/70 px-1.5 py-0.2 text-[10px] font-semibold text-blue-900">
                {question.difficulty}
              </span>
            )}
          </div>

          {/* Action buttons matching image.png */}
          <div className="flex items-center gap-2">
            {/* Mark as Mastered */}
            <button
              onClick={() => onToggleMastered(question.id)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                question.status === 'mastered'
                  ? 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-400'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
              title="Mark question as mastered"
            >
              <CheckCircle2 className={`h-4 w-4 ${question.status === 'mastered' ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>{question.status === 'mastered' ? 'Mastered' : 'Mark Mastered'}</span>
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(question.id)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                question.isBookmarked
                  ? 'border-amber-300 bg-amber-50 text-amber-900'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
              title="Bookmark question"
            >
              <Bookmark className={`h-4 w-4 ${question.isBookmarked ? 'fill-amber-400 text-amber-500' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">Save</span>
            </button>

            {canManageQuestions && (
              <button
                onClick={() => onEdit(question)}
                className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-emerald-700 active:scale-98"
              >
                <Edit className="h-3.5 w-3.5" />
                <span>Edit</span>
              </button>
            )}
          </div>
        </div>

        {/* Question Header: Number Box + Uppercase Bold Title (exact match to image.png) */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-xl font-black text-white shadow-xs">
            {question.questionNumber}
          </div>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900 leading-snug">
            {question.title}
          </h2>
        </div>

        {question.screenshot && !question.images && (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <img
              src={question.screenshot}
              alt={`Screenshot for ${question.title}`}
              className="max-h-[34rem] w-full rounded-xl object-contain"
            />
          </div>
        )}

        {/* DETAILED ANSWER CARD (exact green container matching image.png) */}
        <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm ring-1 ring-slate-900/5">
          {/* Card Accent Header */}
          <div className="flex items-center justify-between border-b border-emerald-100 bg-emerald-50/50 px-6 py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                {question.questionNumber}
              </div>
              <span className="text-xs font-extrabold tracking-wider text-emerald-800 uppercase">
                DETAILED ANSWER
              </span>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopyAnswer}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-2xs hover:bg-slate-50 transition-all active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-slate-500" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Answer Points Content - formatted as styled green-tinted boxes matching image.png */}
          <div className="p-6 sm:p-8 space-y-4">
            {question.detailedPoints.map((point, index) => {
              const imageMarker = point.match(/^\[\[IMAGE:(.+)\]\]$/);
              if (imageMarker) {
                const image = images.find((item) => item.id === imageMarker[1]);
                if (!image) return null;
                return (
                  <div key={index} className="overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
                    <img src={image.src || image.dataUrl} alt={`Reference image ${index + 1}`} className="max-h-[34rem] w-full rounded-lg object-contain" />
                  </div>
                );
              }

              // Highlight major headings or lines
              const isHeading = point.startsWith('CLASS') || point.startsWith('OBJECT') || point.startsWith('Here are') || point.startsWith('Key Differences:');
              return (
                <div
                  key={index}
                  className={`rounded-xl border p-4 text-sm leading-relaxed transition-all ${
                    isHeading
                      ? 'border-emerald-200 bg-emerald-50/70 font-semibold text-emerald-950 shadow-2xs'
                      : 'border-emerald-100/70 bg-emerald-50/30 text-slate-800 hover:bg-emerald-50/50'
                  }`}
                >
                  {point}
                </div>
              );
            })}

            {images.some((image) => !question.detailedPoints.includes(`[[IMAGE:${image.id}]]`)) && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {images
                  .filter((image) => !question.detailedPoints.includes(`[[IMAGE:${image.id}]]`))
                  .map((image, index) => (
                    <div key={image.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
                      <img src={image.src || image.dataUrl} alt={`Reference image ${index + 1}`} className="max-h-[28rem] w-full rounded-lg object-contain" />
                    </div>
                  ))}
              </div>
            )}

            {/* Visual Concept Diagram if present */}
            {question.diagram && <DiagramRenderer diagram={question.diagram} />}

            {/* Code Snippet Box */}
            {question.codeSnippet && (
              <div className="mt-6 overflow-hidden rounded-xl border border-slate-800 bg-slate-900 text-slate-100 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 py-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500/80"></span>
                    <span className="flex h-2.5 w-2.5 rounded-full bg-amber-500/80"></span>
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500/80"></span>
                    <span className="ml-2 font-mono text-[11px] text-slate-400 uppercase tracking-wider">
                      {question.codeSnippet.language}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 rounded bg-slate-800 px-2 py-1 text-[11px] font-medium text-slate-300 hover:bg-slate-700 transition-colors"
                  >
                    {copiedCode ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>

                <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed">
                  <pre className="text-emerald-300">
                    <code>{question.codeSnippet.code}</code>
                  </pre>
                </div>

                {question.codeSnippet.explanation && (
                  <div className="border-t border-slate-800 bg-slate-950/40 p-3 text-xs text-slate-400">
                    💡 <span className="font-semibold text-slate-300">Code Note:</span> {question.codeSnippet.explanation}
                  </div>
                )}
              </div>
            )}

            {/* Key Takeaways Card */}
            {question.keyTakeaways && question.keyTakeaways.length > 0 && (
              <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/40 p-5">
                <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  Key Takeaways for Interviews
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {question.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0"></span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Interviewer Pro Tip / Follow-up */}
            {question.interviewTips && (
              <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 text-xs sm:text-sm text-amber-900">
                <span className="font-bold text-amber-950">🔥 Common Follow-Up Question: </span>
                {question.interviewTips}
              </div>
            )}

            {/* Companies asking this question */}
            {question.companyTags && question.companyTags.length > 0 && (
              <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                <span className="font-medium text-slate-600">Frequently Asked At:</span>
                {question.companyTags.map((company) => (
                  <span
                    key={company}
                    className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-700 shadow-2xs"
                  >
                    {company}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Pagination Controls */}
        <div className="flex items-center justify-between border-t border-slate-200 pt-6">
          <button
            onClick={onPrevQuestion}
            disabled={!hasPrev}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all ${
              hasPrev
                ? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50 shadow-2xs'
                : 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous Question</span>
          </button>

          <button
            onClick={onNextQuestion}
            disabled={!hasNext}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all ${
              hasNext
                ? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700 shadow-xs'
                : 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>Next Question</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
