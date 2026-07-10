import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { PaymentCheckoutModal } from '@/features/payments/components/PaymentCheckoutModal';
import { PaymentHistoryModal } from '@/features/payments/components/PaymentHistoryModal';
import { PaymentMiniChat } from '@/features/payments/components/PaymentMiniChat';
import { usePaymentsSummary } from '@/features/payments/hooks/usePaymentsSummary';
import type {
  PayPaymentResponse,
  PaymentItem,
} from '@/features/payments/types/payment.types';
import {
  AppScreen,
  AppText,
  Badge,
  EmptyState,
  ErrorState,
  InfoItem,
  LoadingState,
  ModuleHeader,
  SectionCard,
} from '@/shared/components';
import { colors, radius, spacing } from '@/shared/theme';

function formatMoney(value?: number | string | null): string {
  return `S/ ${Number(value ?? 0).toFixed(2)}`;
}

function formatDate(value?: string | null): string {
  return value?.slice(0, 10) ?? 'No registrada';
}

export default function PaymentsScreen(): React.JSX.Element {
  const { user } = useAuth();

  const [selectedPayment, setSelectedPayment] =
    useState<PaymentItem | null>(null);

  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  const [lastReceipt, setLastReceipt] =
    useState<PayPaymentResponse | null>(null);

  const { summary, isLoading, error, refetch } =
    usePaymentsSummary(user?.id);

  const nextPayablePayment = useMemo(() => {
    if (!summary) {
      return null;
    }

    return (
      summary.overdue_payments[0] ??
      summary.pending_payments[0] ??
      null
    );
  }, [summary]);

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
          subtitle="Consulta y gestiona tus obligaciones financieras."
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
          subtitle="Consulta y gestiona tus obligaciones financieras."
        />

        <ErrorState message={error} onRetry={refetch} />
      </AppScreen>
    );
  }

  if (!summary) {
    return (
      <AppScreen>
        <ModuleHeader
          title="Pagos"
          subtitle="Consulta y gestiona tus obligaciones financieras."
        />

        <EmptyState
          title="Sin información financiera"
          message="No hay información de pagos para tu usuario."
        />
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <ModuleHeader
        title="Pagos"
        subtitle="Consulta y gestiona tus obligaciones financieras."
      />

      <SectionCard title="Estado actual">
        <View style={styles.statusHeader}>
          <Badge
            label={
              Number(summary.total_overdue) > 0
                ? 'Con deuda vencida'
                : Number(summary.total_pending) > 0
                  ? 'Pago pendiente'
                  : 'Al día'
            }
            variant={
              Number(summary.total_overdue) > 0
                ? 'error'
                : Number(summary.total_pending) > 0
                  ? 'warning'
                  : 'success'
            }
          />

          <AppText color={colors.text.secondary} variant="caption">
            {summary.financial_status}
          </AppText>
        </View>

        <View style={styles.infoGrid}>
          <InfoItem
            label="Pagado"
            value={formatMoney(summary.total_paid)}
          />

          <InfoItem
            label="Pendiente"
            value={formatMoney(summary.total_pending)}
          />

          <InfoItem
            label="Vencido"
            value={formatMoney(summary.total_overdue)}
          />
        </View>
      </SectionCard>

      <SectionCard title="Centro de pagos">
        {nextPayablePayment ? (
          <View style={styles.paymentBlock}>
            <AppText variant="body">{nextPayablePayment.concept}</AppText>

            <View style={styles.infoGrid}>
              <InfoItem
                label="Monto"
                value={formatMoney(nextPayablePayment.amount)}
              />

              <InfoItem
                label="Vencimiento"
                value={formatDate(nextPayablePayment.due_date)}
              />
            </View>

            <Pressable
              onPress={() => setSelectedPayment(nextPayablePayment)}
              style={styles.primaryButton}
            >
              <AppText color={colors.text.inverse} variant="body">
                Pagar ahora
              </AppText>
            </Pressable>
          </View>
        ) : (
          <View style={styles.upToDateBlock}>
            <AppText variant="body">No tienes cuotas pendientes.</AppText>

            <AppText color={colors.text.secondary} variant="caption">
              Todos los pagos del periodo{' '}
              {summary.academic_period_name ?? 'actual'} están registrados.
            </AppText>
          </View>
        )}

        <Pressable
          onPress={() => setIsHistoryVisible(true)}
          style={styles.secondaryButton}
        >
          <AppText color={colors.text.primary} variant="body">
            Ver historial de pagos
          </AppText>
        </Pressable>
      </SectionCard>

      {lastReceipt ? (
        <SectionCard title="Última operación">
          <AppText color={colors.status.success} variant="body">
            Pago registrado correctamente.
          </AppText>

          <InfoItem
            label="Código"
            value={lastReceipt.operation_code}
          />

          <InfoItem
            label="Monto"
            value={formatMoney(lastReceipt.amount_paid)}
          />
        </SectionCard>
      ) : null}

      {user?.id ? (
        <PaymentMiniChat userId={user.id} summary={summary} />
      ) : null}

      <PaymentCheckoutModal
        payment={selectedPayment}
        onClose={() => setSelectedPayment(null)}
        onSuccess={(response) => {
          void handlePaymentSuccess(response);
        }}
      />

      <PaymentHistoryModal
        items={summary.payment_history}
        visible={isHistoryVisible}
        onClose={() => setIsHistoryVisible(false)}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  statusHeader: {
    gap: spacing.sm,
  },

  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },

  paymentBlock: {
    gap: spacing.md,
  },

  upToDateBlock: {
    gap: spacing.sm,
  },

  primaryButton: {
    alignItems: 'center',
    borderRadius: radius.lg,
    backgroundColor: colors.brand.primary,
    padding: spacing.md,
  },

  secondaryButton: {
    alignItems: 'center',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.strong,
    backgroundColor: colors.background.secondary,
    padding: spacing.md,
  },
});