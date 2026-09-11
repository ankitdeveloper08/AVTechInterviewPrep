import React, { useState, useEffect, useMemo } from 'react';
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
  toggleBookmarkStorage,
  toggleMasteredStorage,
  resetQuestionsToDefault,
} from './data';
import { InterviewQuestion, QuestionCategory } from './types';

export default function App() {
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
    loadQuestionsFromServer(loadQuestions()).then((storedQuestions) => {
      if (!isMounted) return;
      setQuestions(storedQuestions);
      setIsStorageReady(true);
    });

    return () => {
      isMounted = false;
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
    if (isStorageReady) saveQuestions(questions);
  }, [questions, isStorageReady]);

  // Handle Save Question (Add or Edit)
  const handleSaveQuestion = (savedQ: InterviewQuestion) => {
    const existsIndex = questions.findIndex((q) => q.id === savedQ.id);
    const updated = existsIndex >= 0
      ? questions.map((q, index) => (index === existsIndex ? savedQ : q))
      : [...questions, savedQ].sort((a, b) => a.questionNumber - b.questionNumber);

    saveQuestions(updated);
    setQuestions(updated);
    setSelectedQuestionId(savedQ.id);
  };

  // Toggle Bookmark
  const handleToggleBookmark = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const newStatus = toggleBookmarkStorage(id);
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, isBookmarked: newStatus } : q))
    );
  };

  // Toggle Mastered
  const handleToggleMastered = (id: number) => {
    const newStatus = toggleMasteredStorage(id);
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, status: newStatus ? 'mastered' : 'unviewed' } : q
      )
    );
  };

  // Reset to default
  const handleResetDefaults = () => {
    const defaults = resetQuestionsToDefault();
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
