export type LearningPlatform = {
  id: number;
  name: string;
  provider: string;
  base_url: string;
  areas: string[];
  description: string;
  certificate_info: string;
  search_hint: string;
  recommended_cycle_min: number;
  recommended_cycle_max: number;
  is_free: boolean;
  has_certificate: boolean;
};

export type NextCycleCourse = {
  course_code: string;
  course_name: string;
  cycle: number;
  credits?: number | null;
  modality?: string | null;
  type?: string | null;
  prerequisites?: string[] | null;
};

export type NextCycleResponse = {
  user_id?: number;
  current_cycle?: number;
  next_cycle?: number;
  courses?: NextCycleCourse[];
  message?: string;
  detail?: string;
};