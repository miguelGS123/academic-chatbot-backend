export type AskQuestionPayload = {
  user_id: number;
  question: string;
  session_id?: number | null;
};

export type AskQuestionResponse = {
  session_id: number;
  user_id: number;
  question: string;
  answer: string;
};

export type ChatSession = {
  id: number;
  user_id: number;
  title?: string | null;
  created_at?: string | null;
};

export type ChatMessage = {
  id: number;
  session_id: number;
  user_id: number;
  role: 'user' | 'assistant';
  message: string;
  created_at?: string | null;
};