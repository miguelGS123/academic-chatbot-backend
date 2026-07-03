import { endpoints } from '@/config/endpoints';
import { apiClient } from '@/shared/services/api-client';

import type { TeacherCourse } from '@/features/teachers/types/teacher.types';

export async function getMyTeachers(userId: number): Promise<TeacherCourse[]> {
  return apiClient.get<TeacherCourse[]>(endpoints.teachers.myTeachers(userId));
}