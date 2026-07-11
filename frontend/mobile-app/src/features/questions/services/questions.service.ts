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
  const cleanQuestion = payload.question.trim();

  if (!cleanQuestion) {
    throw new Error('La pregunta no puede estar vacía.');
  }

  return apiClient.post<AskQuestionResponse>(
    endpoints.questions.ask,
    {
      user_id: payload.user_id,
      question: cleanQuestion,
      session_id: payload.session_id ?? null,
      persist: payload.persist ?? true,
    },
  );
}

export async function getUserQuestionSessions(
  userId: number,
): Promise<ChatSession[]> {
  if (userId <= 0) {
    throw new Error('El identificador del usuario no es válido.');
  }

  return apiClient.get<ChatSession[]>(
    endpoints.questions.sessionsByUser(userId),
  );
}

export async function getQuestionSessionMessages(
  sessionId: number,
): Promise<ChatMessage[]> {
  if (sessionId <= 0) {
    throw new Error('El identificador de la sesión no es válido.');
  }

  return apiClient.get<ChatMessage[]>(
    endpoints.questions.messagesBySession(sessionId),
  );
}