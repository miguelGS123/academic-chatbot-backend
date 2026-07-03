import { useCallback, useEffect, useState } from 'react';

import { getMyTeachers } from '@/features/teachers/services/teachers.service';
import type { TeacherCourse } from '@/features/teachers/types/teacher.types';

type UseMyTeachersResult = {
  teachers: TeacherCourse[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export function useMyTeachers(userId?: number): UseMyTeachersResult {
  const [teachers, setTeachers] = useState<TeacherCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTeachers = useCallback(async () => {
    if (!userId) {
      setTeachers([]);
      setIsLoading(false);
      setError('No se encontró el usuario autenticado.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const data = await getMyTeachers(userId);

      setTeachers(data);
    } catch {
      setError('No se pudieron cargar tus docentes.');
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    void loadTeachers();
  }, [loadTeachers]);

  return {
    teachers,
    isLoading,
    error,
    refetch: loadTeachers,
  };
}