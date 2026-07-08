import React, { useState } from 'react';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { PaymentCheckoutCard } from '@/features/payments/components/PaymentCheckoutCard';
import { PaymentMiniChat } from '@/features/payments/components/PaymentMiniChat';
import { PaymentSummaryCard } from '@/features/payments/components/PaymentSummaryCard';
import { usePaymentsSummary } from '@/features/payments/hooks/usePaymentsSummary';
import type {
  PayPaymentResponse,
  PaymentItem,
} from '@/features/payments/types/payment.types';
import {
  AppScreen,
  AppText,
  EmptyState,
  ErrorState,
  LoadingState,
  ModuleHeader,
  SectionCard,
} from '@/shared/components';
import { colors } from '@/shared/theme';

export default function PaymentsScreen(): React.JSX.Element {
  const { user } = useAuth();

  const [selectedPayment, setSelectedPayment] = useState<PaymentItem | null>(
    null,
  );

  const [lastReceipt, setLastReceipt] = useState<PayPaymentResponse | null>(
    null,
  );

  const { summary, isLoading, error, refetch } = usePaymentsSummary(user?.id);

  async function handlePaymentSuccess(
    response: PayPaymentResponse,
  ): Promise<void> {
    setLastReceipt(response);
    setSelectedPayment(null);
    await refetch();
  }

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

      {lastReceipt ? (
        <SectionCard title="Comprobante generado">
          <AppText color={colors.status.success} variant="body">
            Pago registrado correctamente.
          </AppText>

          <AppText color={colors.text.secondary} variant="caption">
            Operación: {lastReceipt.operation_code}
          </AppText>

          <AppText color={colors.text.secondary} variant="caption">
            Monto: S/ {Number(lastReceipt.amount_paid).toFixed(2)}
          </AppText>
        </SectionCard>
      ) : null}

      {selectedPayment ? (
        <PaymentCheckoutCard
          payment={selectedPayment}
          onCancel={() => setSelectedPayment(null)}
          onSuccess={(response) => {
            void handlePaymentSuccess(response);
          }}
        />
      ) : null}

      {summary ? (
        <>
          <PaymentSummaryCard
            summary={summary}
            onPayPress={setSelectedPayment}
          />

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