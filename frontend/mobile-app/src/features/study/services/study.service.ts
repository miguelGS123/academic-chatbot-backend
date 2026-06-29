import { buildApiUrl } from '@/config/api';
import { endpoints } from '@/config/endpoints';
import { apiClient } from '@/shared/services/api-client';

import type {
  LearningPlatform,
  NextCycleResponse,
} from '@/features/study/types/study.types';

export async function getLearningPlatforms(): Promise<LearningPlatform[]> {
  return apiClient.get<LearningPlatform[]>(endpoints.study.learningPlatforms);
}

export async function getNextCycle(
  userId: number,
): Promise<NextCycleResponse> {
  const response = await fetch(buildApiUrl(endpoints.study.nextCycle(userId)), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  const data = (await response.json()) as NextCycleResponse;

  if (!response.ok) {
    return {
      detail:
        data.detail ??
        'No se pudo obtener la información del próximo ciclo.',
    };
  }

  return data;
}