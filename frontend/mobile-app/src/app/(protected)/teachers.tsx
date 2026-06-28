import React from 'react';

import { AppScreen, AppText } from '@/shared/components';

export default function TeachersScreen(): React.JSX.Element {
  return (
    <AppScreen>
      <AppText variant="title">Docentes</AppText>
      <AppText variant="subtitle">
        Aquí verás tus docentes, correos institucionales y cursos asignados.
      </AppText>
    </AppScreen>
  );
}