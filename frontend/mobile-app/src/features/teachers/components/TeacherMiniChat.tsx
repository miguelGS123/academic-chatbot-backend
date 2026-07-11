import React from 'react';

import { ContextualMiniChat } from '@/features/questions/components/ContextualMiniChat';

type TeacherMiniChatProps = {
  userId: number;
};

export function TeacherMiniChat({
  userId,
}: TeacherMiniChatProps): React.JSX.Element {
  return (
    <ContextualMiniChat
      userId={userId}
      title="Asistente de docentes"
      description="Consulta docentes asignados, cursos, secciones, correos, horarios y aulas disponibles."
      emptyMessage="Puedes preguntar quién dicta un curso, cuál es su correo o en qué aula tienes clase con determinado docente."
      placeholder="Pregunta sobre tus docentes..."
      questionPrefix="Consulta sobre docentes, profesores, cursos, secciones, correos institucionales, horarios y aulas"
      loadingMessage="Chatzitho está revisando tus docentes y cursos..."
    />
  );
}