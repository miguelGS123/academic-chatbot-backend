import React from 'react';

import { AppScreen, AppText } from '@/shared/components';

export default function CoursesScreen(): React.JSX.Element {
  return (
    <AppScreen>
      <AppText variant="title">Cursos</AppText>
      <AppText variant="subtitle">
        Aquí verás tus cursos matriculados, horarios, docentes y sílabos.
      </AppText>
    </AppScreen>
  );
}