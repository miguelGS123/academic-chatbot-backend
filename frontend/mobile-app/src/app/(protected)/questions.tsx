import React from 'react';

import { AppScreen, AppText } from '@/shared/components';

export default function QuestionsScreen(): React.JSX.Element {
  return (
    <AppScreen>
      <AppText variant="title">Preguntas</AppText>
      <AppText variant="subtitle">
        Chat global con IA para consultar información académica.
      </AppText>
    </AppScreen>
  );
}