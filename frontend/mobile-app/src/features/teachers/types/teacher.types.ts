export type TeacherCourse = {
  teacher_id: number;
  teacher_name: string;
  teacher_email: string;
  course_id: number;
  course_code: string;
  course_name: string;
  section_code?: string | null;
  academic_period: string;
  role?: string | null;
};