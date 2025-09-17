export interface Exercise {
  id: string;
  type: 'multiple_choice' | 'type_answer' | 'word_bank';
  prompt: string;
  answer: string | string[];
  choices?: string[];
  bank?: string[];
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  xp_per_correct: number;
  streak_increment: number;
  exercises: Exercise[];
}

export interface Progress {
  currentIndex: number;
  score: number;
  hearts: number;
  xp: number;
  streak: number;
  completed: boolean;
}