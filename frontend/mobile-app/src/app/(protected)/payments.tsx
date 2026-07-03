import React from 'react';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { PaymentMiniChat } from '@/features/payments/components/PaymentMiniChat';
import { PaymentSummaryCard } from '@/features/payments/components/PaymentSummaryCard';
import { usePaymentsSummary } from '@/features/payments/hooks/usePaymentsSummary';
import {
  AppScreen,
  EmptyState,
  ErrorState,
  LoadingState,
  ModuleHeader,
} from '@/shared/components';

export default function PaymentsScreen(): React.JSX.Element {
  const { user } = useAuth();

  const { summary, isLoading, error, refetch } = usePaymentsSummary(user?.id);

  if (isLoading) {
    return (
      <AppScreen>
        <ModuleHeader
          title="Pagos"
          subtitle="Consulta tus cuotas, pagos pendientes y estado financiero."
        />

        <LoadingState message="Cargando información financiera..." />
      </AppScreen>
    );
  }

  if (error) {
    return (
      <AppScreen>
        <ModuleHeader
          title="Pagos"
          subtitle="Consulta tus cuotas, pagos pendientes y estado financiero."
        />

        <ErrorState message={error} onRetry={refetch} />
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <ModuleHeader
        title="Pagos"
        subtitle="Consulta tus cuotas, pagos pendientes y estado financiero."
      />

      {summary ? (
        <>
          <PaymentSummaryCard summary={summary} />

          {user?.id ? (
            <PaymentMiniChat userId={user.id} summary={summary} />
          ) : null}
        </>
      ) : (
        <EmptyState
          title="Sin información financiera"
          message="No hay información de pagos registrada para tu usuario."
        />
      )}
    </AppScreen>
  );
}