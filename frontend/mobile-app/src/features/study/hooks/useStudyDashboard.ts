import { useCallback, useEffect, useState } from 'react';

import {
  getLearningPlatforms,
  getNextCycle,
} from '@/features/study/services/study.service';

import type {
  LearningPlatform,
  NextCycleResponse,
} from '@/features/study/types/study.types';

type UseStudyDashboardResult = {
  platforms: LearningPlatform[];
  nextCycle: NextCycleResponse | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export function useStudyDashboard(
  userId?: number,
): UseStudyDashboardResult {
  const [platforms, setPlatforms] = useState<LearningPlatform[]>([]);
  const [nextCycle, setNextCycle] = useState<NextCycleResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    if (!userId) {
      setIsLoading(false);
      setError('No se encontró el usuario autenticado.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const [platformsData, nextCycleData] = await Promise.all([
        getLearningPlatforms(),
        getNextCycle(userId),
      ]);

      setPlatforms(platformsData);
      setNextCycle(nextCycleData);
    } catch {
      setError('No se pudo cargar la información de estudio.');
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  return {
    platforms,
    nextCycle,
    isLoading,
    error,
    refetch: loadDashboard,
  };
}