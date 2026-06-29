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