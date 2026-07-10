export const endpoints = {
  auth: {
    login: '/api/v1/auth/users/login',
    register: '/api/v1/auth/users/register',
    me: '/api/v1/auth/users/me',
  },

  questions: {
    ask: '/api/v1/questions/ask',

    sessionsByUser: (userId: number) =>
      `/api/v1/questions/sessions/${userId}`,

    messagesBySession: (sessionId: number) =>
      `/api/v1/questions/sessions/${sessionId}/messages`,
  },

  study: {
    health: '/api/v1/study/health',
    nextCycle: (userId: number) => `/api/v1/study/next-cycle/${userId}`,
    learningPlatforms: '/api/v1/study/learning-platforms',
  },

  courses: {
    myCourses: (userId: number) => `/api/v1/courses/my-courses/${userId}`,
  },

  payments: {
    summary: (userId: number) => `/api/v1/payments/summary/${userId}`,
    pay: (paymentId: number) => `/api/v1/payments/pay/${paymentId}`,
  },

  teachers: {
    myTeachers: (userId: number) =>
      `/api/v1/teachers/my-teachers/${userId}?academic_period=202601`,
  },
} as const;