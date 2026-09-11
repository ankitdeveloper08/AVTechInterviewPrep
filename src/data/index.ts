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

export function loadQuestions(userId?: string): InterviewQuestion[] {
  void userId;
  return INITIAL_QUESTIONS;
}

export function saveQuestions(questions: InterviewQuestion[], userId?: string): void {
  void fetch('/api/questions', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(questions),
  }).catch(() => {
    // The server file is the source of truth; failed requests are not persisted locally.
  });
}

export async function loadQuestionsFromServer(
  localQuestions: InterviewQuestion[],
  userId?: string,
): Promise<InterviewQuestion[]> {
  try {
    const response = await fetch('/api/questions');
    if (!response.ok) return localQuestions;

    const payload = await response.json() as {
      questions?: InterviewQuestion[];
      persisted?: boolean;
    };

    if (!payload.persisted) {
      saveQuestions(localQuestions, userId);
      return localQuestions;
    }

    return Array.isArray(payload.questions) ? payload.questions : localQuestions;
  } catch {
    return localQuestions;
  }
}

export function resetQuestionsToDefault(userId?: string): InterviewQuestion[] {
  void userId;
  return INITIAL_QUESTIONS;
}
