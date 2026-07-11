import React from 'react';

import type { StudentCourse } from '@/features/courses/types/course.types';
import { ContextualMiniChat } from '@/features/questions/components/ContextualMiniChat';

type CourseMiniChatProps = {
  userId: number;
  courseItem: StudentCourse;
};

export function CourseMiniChat({
  userId,
  courseItem,
}: CourseMiniChatProps): React.JSX.Element {
  const courseCode = courseItem.course.course_code;
  const courseName = courseItem.course.course_name;

  return (
    <ContextualMiniChat
      userId={userId}
      title="Chat IA del curso"
      description="Realiza preguntas puntuales sobre el curso seleccionado."
      emptyMessage="Puedes consultar el docente, horario, aula, modalidad o solicitar una orientación de estudio."
      loadingMessage="Chatzitho está revisando el curso..."
      placeholder="Pregunta sobre este curso..."
      questionPrefix={`Consulta del curso ${courseName} (${courseCode})`}
    />
  );
}