import React from 'react';

import { AppScreen, AppText } from '@/shared/components';

export default function PaymentsScreen(): React.JSX.Element {
  return (
    <AppScreen>
      <AppText variant="title">Pagos</AppText>
      <AppText variant="subtitle">
        Aquí verás tus cuotas, pagos pendientes y estado financiero.
      </AppText>
    </AppScreen>
  );
}