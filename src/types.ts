export type QuestionCategory =
  | 'All Topics'
  | 'C# / OOPS'
  | '.NET Framework'
  | '.NET Core'
  | 'Web API'
  | 'SQL'
  | 'JavaScript'
  | 'Design Patterns'
  | 'React'
  | 'Azure'
  | 'General';

export interface VisualDiagram {
  type:
    | 'oops-concepts'
    | 'inheritance-types'
    | 'sql-joins'
    | 'boxing-unboxing'
    | 'middleware-pipeline'
    | 'gc-generations'
    | 'jwt-anatomy'
    | 'mvc-lifecycle'
    | 'solid-principles'
    | 'service-lifetimes'
    | 'custom';
  title?: string;
  data?: any;
}

export interface InterviewQuestion {
  id: number;
  questionNumber: number;
  category: QuestionCategory;
  title: string;
  shortSummary?: string;
  detailedPoints: string[];
  codeSnippet?: {
    language: string;
    code: string;
    explanation?: string;
    annotations?: { line: number; text: string }[];
  };
  diagram?: VisualDiagram;
  keyTakeaways?: string[];
  interviewTips?: string;
  companyTags?: string[]; // e.g. ['Microsoft', 'Infosys', 'TCS', 'Accenture']
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  isBookmarked?: boolean;
  status?: 'unviewed' | 'learning' | 'mastered';
}
