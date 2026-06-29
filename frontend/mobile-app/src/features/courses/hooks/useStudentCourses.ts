import { useCallback, useEffect, useState } from 'react';

import { getStudentCourses } from '@/features/courses/services/courses.service';
import type { StudentCourse } from '@/features/courses/types/course.types';

type UseStudentCoursesResult = {
  courses: StudentCourse[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export function useStudentCourses(
  userId?: number,
): UseStudentCoursesResult {
  const [courses, setCourses] = useState<StudentCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCourses = useCallback(async () => {
    if (!userId) {
      setCourses([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const data = await getStudentCourses(userId);

      setCourses(data);
    } catch {
      setError('No se pudieron cargar tus cursos.');
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    void loadCourses();
  }, [loadCourses]);

  return {
    courses,
    isLoading,
    error,
    refetch: loadCourses,
  };
}