import React from 'react';

import { AppScreen, AppText } from '@/shared/components';

export default function StudyScreen(): React.JSX.Element {
  return (
    <AppScreen>
      <AppText variant="title">Estudio</AppText>
      <AppText variant="subtitle">
        Aquí verás tu malla, próximo ciclo, prerrequisitos y certificaciones.
      </AppText>
    </AppScreen>
  );
}