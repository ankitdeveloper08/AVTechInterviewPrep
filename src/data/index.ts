import { InterviewQuestion } from '../types';
import { questionsPart1 } from './questionsPart1';
import { questionsPart2 } from './questionsPart2';
import { questionsPart3 } from './questionsPart3';
import { questionsPart4 } from './questionsPart4';

export const INITIAL_QUESTIONS: InterviewQuestion[] = [
  ...questionsPart1,
  ...questionsPart2,
  ...questionsPart3,
  ...questionsPart4,
].sort((a, b) => a.questionNumber - b.questionNumber);

const STORAGE_KEY = 'tech_interview_questions_v1';
const BOOKMARKS_KEY = 'tech_interview_bookmarks_v1';
const MASTERED_KEY = 'tech_interview_mastered_v1';

export function loadQuestions(): InterviewQuestion[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const bookmarks = getBookmarks();
    const mastered = getMastered();

      const parsed = saved ? JSON.parse(saved) : null;
      const list: InterviewQuestion[] = Array.isArray(parsed) ? parsed : INITIAL_QUESTIONS;

    // Synchronize bookmarks and mastered state
      return list
        .map(q => ({
          ...q,
          isBookmarked: bookmarks.includes(q.id),
          status: mastered.includes(q.id) ? 'mastered' : q.status || 'unviewed'
        }))
        .sort((a, b) => a.questionNumber - b.questionNumber);
  } catch {
    return INITIAL_QUESTIONS;
  }
}

export function saveQuestions(questions: InterviewQuestion[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  } catch (e) {
    console.error('Failed to save questions to local storage', e);
  }

  void fetch('/api/questions', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(questions),
  }).catch(() => {
    // Local storage remains the fallback when the API is unavailable.
  });
}

export async function loadQuestionsFromServer(
  localQuestions: InterviewQuestion[]
): Promise<InterviewQuestion[]> {
  try {
    const response = await fetch('/api/questions');
    if (!response.ok) return localQuestions;

    const payload = await response.json() as {
      questions?: InterviewQuestion[];
      persisted?: boolean;
    };

    if (!payload.persisted) {
      saveQuestions(localQuestions);
      return localQuestions;
    }

    return Array.isArray(payload.questions) ? payload.questions : localQuestions;
  } catch {
    return localQuestions;
  }
}

export function getBookmarks(): number[] {
  try {
    const data = localStorage.getItem(BOOKMARKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function toggleBookmarkStorage(id: number): boolean {
  try {
    const current = getBookmarks();
    const exists = current.includes(id);
    const updated = exists ? current.filter(x => x !== id) : [...current, id];
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
    return !exists;
  } catch {
    return false;
  }
}

export function getMastered(): number[] {
  try {
    const data = localStorage.getItem(MASTERED_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function toggleMasteredStorage(id: number): boolean {
  try {
    const current = getMastered();
    const exists = current.includes(id);
    const updated = exists ? current.filter(x => x !== id) : [...current, id];
    localStorage.setItem(MASTERED_KEY, JSON.stringify(updated));
    return !exists;
  } catch {
    return false;
  }
}

export function resetQuestionsToDefault(): InterviewQuestion[] {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
  return INITIAL_QUESTIONS;
}
