export type AskQuestionPayload = {
  user_id: number;
  question: string;
  session_id?: number | null;
  persist?: boolean;
};

export type AskQuestionResponse = {
  session_id: number | null;
  user_id: number;
  question: string;
  answer: string;
};

export type ChatSession = {
  id: number;
  user_id: number;
  title: string | null;
  created_at: string | null;
};

export type ChatMessageRole =
  | 'user'
  | 'assistant';

export type ChatMessage = {
  id: number;
  session_id: number;
  user_id: number;
  role: ChatMessageRole;
  message: string;
  created_at: string | null;
};