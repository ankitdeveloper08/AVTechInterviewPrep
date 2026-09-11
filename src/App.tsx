import React, { useState, useEffect, useMemo } from 'react';
import { BookOpen, LogIn } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { QuestionDetail } from './components/QuestionDetail';
import { AddEditQuestionModal } from './components/AddEditQuestionModal';
import { FlashcardMode } from './components/FlashcardMode';
import { StatsModal } from './components/StatsModal';
import {
  loadQuestions,
  loadQuestionsFromServer,
  saveQuestions,
  resetQuestionsToDefault,
} from './data';
import { AuthUser, InterviewQuestion, QuestionCategory } from './types';

export default function App() {
  const questionManagerEmail = 'ankitdeveloper08@gmail.com';
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [questions, setQuestions] = useState<InterviewQuestion[]>(() => loadQuestions());
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(1);
  const [activeCategory, setActiveCategory] = useState<QuestionCategory>('All Topics');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<InterviewQuestion | null>(null);
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [isStorageReady, setIsStorageReady] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8000);

    fetch('/api/auth/me', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Auth check failed');
        return response.json();
      })
      .then((payload: { user?: AuthUser | null }) => {
        if (!isMounted) return;
        setUser(payload.user || null);
        if (payload.user) {
          const userQuestions = loadQuestions(payload.user.id);
          return loadQuestionsFromServer(userQuestions, payload.user.id).then((storedQuestions) => {
            if (!isMounted) return;
            setQuestions(storedQuestions);
            setIsStorageReady(true);
          });
        }
      })
      .catch(() => {
        if (isMounted) setUser(null);
      })
      .finally(() => {
        window.clearTimeout(timeout);
        if (isMounted) setAuthLoading(false);
      });

    return () => {
      isMounted = false;
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, []);

  // Filter questions based on Category, Search Query, and Bookmark status
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      // Category filter
      if (activeCategory !== 'All Topics' && q.category !== activeCategory) {
        return false;
      }
      // Bookmark filter
      if (showOnlyBookmarked && !q.isBookmarked) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = q.title.toLowerCase().includes(query);
        const matchesSummary = q.shortSummary?.toLowerCase().includes(query);
        const matchesPoints = q.detailedPoints.some((p) => p.toLowerCase().includes(query));
        const matchesCode = q.codeSnippet?.code.toLowerCase().includes(query);
        const matchesNum = q.questionNumber.toString().includes(query);
        return matchesTitle || matchesSummary || matchesPoints || matchesCode || matchesNum;
      }
      return true;
    });
  }, [questions, activeCategory, showOnlyBookmarked, searchQuery]);

  // Current selected question
  const currentQuestion = useMemo(() => {
    const found = questions.find((q) => q.id === selectedQuestionId);
    if (found) return found;
    return filteredQuestions[0] || questions[0];
  }, [questions, selectedQuestionId, filteredQuestions]);

  // When filtered list changes and current question is not in it, select first available
  useEffect(() => {
    if (filteredQuestions.length > 0) {
      const exists = filteredQuestions.some((q) => q.id === selectedQuestionId);
      if (!exists) {
        setSelectedQuestionId(filteredQuestions[0].id);
      }
    }
  }, [filteredQuestions, selectedQuestionId]);

  useEffect(() => {
    if (isStorageReady && user) saveQuestions(questions, user.id);
  }, [questions, isStorageReady, user]);

  if (authLoading) return <div className="flex h-screen items-center justify-center bg-slate-50 text-sm text-slate-500">Checking your sign-in...</div>;

  if (!user) return (
    <div className="flex h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white"><BookOpen className="h-6 w-6" /></div>
        <h1 className="text-xl font-bold text-slate-900">Tech Interview Prep</h1>
        <p className="mt-2 text-sm text-slate-500">Sign in to save your questions, bookmarks, and progress.</p>
        <a href="/api/auth/google" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"><LogIn className="h-4 w-4" /> Continue with Google</a>
      </div>
    </div>
  );

  // Handle Save Question (Add or Edit)
  const handleSaveQuestion = (savedQ: InterviewQuestion) => {
    const existsIndex = questions.findIndex((q) => q.id === savedQ.id);
    const updated = existsIndex >= 0
      ? questions.map((q, index) => (index === existsIndex ? savedQ : q))
      : [...questions, savedQ].sort((a, b) => a.questionNumber - b.questionNumber);

    saveQuestions(updated, user.id);
    setQuestions(updated);
    setSelectedQuestionId(savedQ.id);
  };

  // Toggle Bookmark
  const handleToggleBookmark = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, isBookmarked: !q.isBookmarked } : q))
    );
  };

  // Toggle Mastered
  const handleToggleMastered = (id: number) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, status: q.status === 'mastered' ? 'unviewed' : 'mastered' } : q
      )
    );
  };

  // Reset to default
  const handleResetDefaults = () => {
    const defaults = resetQuestionsToDefault(user.id);
    setQuestions(defaults);
    setSelectedQuestionId(1);
    setActiveCategory('All Topics');
  };

  // Next / Previous Navigation
  const currentIndexInFiltered = filteredQuestions.findIndex(
    (q) => q.id === currentQuestion?.id
  );
  const hasPrev = currentIndexInFiltered > 0;
  const hasNext = currentIndexInFiltered >= 0 && currentIndexInFiltered < filteredQuestions.length - 1;

  const handlePrevQuestion = () => {
    if (hasPrev) {
      setSelectedQuestionId(filteredQuestions[currentIndexInFiltered - 1].id);
    }
  };

  const handleNextQuestion = () => {
    if (hasNext) {
      setSelectedQuestionId(filteredQuestions[currentIndexInFiltered + 1].id);
    }
  };

  const bookmarkedCount = questions.filter((q) => q.isBookmarked).length;
  const nextQuestionNum =
    questions.length > 0 ? Math.max(...questions.map((q) => q.questionNumber)) + 1 : 1;
  const canManageQuestions = user.email.toLowerCase() === questionManagerEmail;

  return (
    <div className="flex h-screen flex-col bg-white text-slate-900 font-sans selection:bg-blue-500 selection:text-white antialiased">
      {/* Top Navigation Bar */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSearchQuery('');
        }}
        onOpenAddModal={() => {
          setEditingQuestion(null);
          setIsAddModalOpen(true);
        }}
        onOpenStatsModal={() => setIsStatsModalOpen(true)}
        isStudyMode={isStudyMode}
        onToggleStudyMode={() => setIsStudyMode((prev) => !prev)}
        bookmarkedCount={bookmarkedCount}
        showOnlyBookmarked={showOnlyBookmarked}
        onToggleShowBookmarked={() => setShowOnlyBookmarked((prev) => !prev)}
        totalQuestions={questions.length}
        user={user}
        canManageQuestions={canManageQuestions}
        onLogout={async () => {
          await fetch('/api/auth/logout', { method: 'POST' });
          window.location.reload();
        }}
      />

      {/* Main Workspace Area */}
      <div className="flex flex-1 overflow-hidden">
        {isStudyMode ? (
          <FlashcardMode
            questions={filteredQuestions}
            onClose={() => setIsStudyMode(false)}
            onMarkMastered={handleToggleMastered}
          />
        ) : (
          <>
            {/* Left Sidebar */}
            <Sidebar
              questions={filteredQuestions}
              selectedQuestionId={selectedQuestionId}
              onSelectQuestion={(q) => setSelectedQuestionId(q.id)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              isCollapsed={isSidebarCollapsed}
              onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
              onToggleBookmark={handleToggleBookmark}
            />

            {/* Right Question Detail Area */}
            {currentQuestion ? (
              <QuestionDetail
                question={currentQuestion}
                onEdit={(q) => {
                  setEditingQuestion(q);
                  setIsAddModalOpen(true);
                }}
                onToggleBookmark={handleToggleBookmark}
                onToggleMastered={handleToggleMastered}
                onPrevQuestion={handlePrevQuestion}
                onNextQuestion={handleNextQuestion}
                hasPrev={hasPrev}
                hasNext={hasNext}
                canManageQuestions={canManageQuestions}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center p-8 text-slate-500">
                Select or add a question to begin.
              </div>
            )}
          </>
        )}
      </div>

      {/* Add / Edit Question Modal */}
      <AddEditQuestionModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingQuestion(null);
        }}
        onSave={handleSaveQuestion}
        editingQuestion={editingQuestion}
        nextQuestionNumber={nextQuestionNum}
      />

      {/* Stats Progress Modal */}
      <StatsModal
        isOpen={isStatsModalOpen}
        onClose={() => setIsStatsModalOpen(false)}
        questions={questions}
        onResetDefaults={handleResetDefaults}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setShowOnlyBookmarked(false);
        }}
      />
    </div>
  );
}
