import React from 'react';

import { ContextualMiniChat } from '@/features/questions/components/ContextualMiniChat';

type StudyMiniChatProps = {
  userId: number;
};

export function StudyMiniChat({
  userId,
}: StudyMiniChatProps): React.JSX.Element {
  return (
    <ContextualMiniChat
      userId={userId}
      title="Asistente de estudio"
      description="Consulta tu avance académico, malla curricular, próximo ciclo, prerrequisitos o certificaciones."
      emptyMessage="Puedes preguntar qué deberías reforzar, qué certificación seguir o cómo orientar tu perfil profesional."
      placeholder="Pregunta sobre tu formación..."
      questionPrefix="Consulta sobre estudio, avance académico, malla curricular, próximo ciclo, prerrequisitos y certificaciones"
      loadingMessage="Chatzitho está revisando tu información académica..."
    />
  );
}