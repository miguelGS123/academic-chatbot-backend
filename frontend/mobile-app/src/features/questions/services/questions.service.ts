import { endpoints } from '@/config/endpoints';
import { apiClient } from '@/shared/services/api-client';

import type {
  AskQuestionPayload,
  AskQuestionResponse,
} from '@/features/questions/types/question.types';

export async function askQuestion(
  payload: AskQuestionPayload,
): Promise<AskQuestionResponse> {
  return apiClient.post<AskQuestionResponse>(endpoints.questions.ask, {
    user_id: payload.user_id,
    question: payload.question,
    session_id: payload.session_id ?? null,
  });
}