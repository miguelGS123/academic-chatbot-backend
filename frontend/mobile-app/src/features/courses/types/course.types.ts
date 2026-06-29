export type Course = {
  id: number;
  course_code: string;
  course_name: string;
  career: string;
  cycle: number;
  credits?: number | null;
  description?: string | null;
};

export type CourseSection = {
  id: number;
  course_id: number;
  section_code: string;
  academic_period: string;
  teacher_name?: string | null;
  modality?: string | null;
  campus?: string | null;
  is_active?: boolean | null;
};

export type CourseSchedule = {
  id: number;
  course_id: number;
  course_section_id?: number | null;
  day_of_week: string;
  start_time: string;
  end_time: string;
  classroom?: string | null;
  modality?: string | null;
};

export type StudentCourse = {
  id: number;
  user_id: number;
  course_id: number;
  course_section_id?: number | null;
  academic_period?: string | null;
  status?: string | null;
  final_grade?: string | null;
  attendance_percentage?: string | null;
  course: Course;
  section?: CourseSection | null;
  schedules: CourseSchedule[];
};