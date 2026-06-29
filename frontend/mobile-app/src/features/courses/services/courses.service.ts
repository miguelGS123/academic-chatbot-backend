import { endpoints } from '@/config/endpoints';
import { apiClient } from '@/shared/services/api-client';

import type { StudentCourse } from '@/features/courses/types/course.types';

export async function getStudentCourses(
  userId: number,
): Promise<StudentCourse[]> {
  return apiClient.get<StudentCourse[]>(endpoints.courses.myCourses(userId));
}