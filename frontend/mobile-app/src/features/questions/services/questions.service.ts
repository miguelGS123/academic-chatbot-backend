import { endpoints } from '@/config/endpoints';

import type {
  AskQuestionPayload,
  AskQuestionResponse,
  ChatMessage,
  ChatSession,
} from '@/features/questions/types/question.types';

import { apiClient } from '@/shared/services/api-client';

export async function askQuestion(
  payload: AskQuestionPayload,
): Promise<AskQuestionResponse> {
  return apiClient.post<AskQuestionResponse>(endpoints.questions.ask, {
    user_id: payload.user_id,
    question: payload.question,
    session_id: payload.session_id ?? null,
  });
}

export async function getUserQuestionSessions(
  userId: number,
): Promise<ChatSession[]> {
  return apiClient.get<ChatSession[]>(
    endpoints.questions.sessionsByUser(userId),
  );
}

export async function getQuestionSessionMessages(
  sessionId: number,
): Promise<ChatMessage[]> {
  return apiClient.get<ChatMessage[]>(
    endpoints.questions.messagesBySession(sessionId),
  );
}