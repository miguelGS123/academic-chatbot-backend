import React from 'react';
import { StyleSheet, View } from 'react-native';

import type {
  PaymentItem,
  PaymentSummary,
} from '@/features/payments/types/payment.types';
import {
  AppButton,
  AppText,
  Badge,
  InfoItem,
  MetricCard,
  SectionCard,
} from '@/shared/components';
import { colors, radius, spacing } from '@/shared/theme';

type PaymentSummaryCardProps = {
  summary: PaymentSummary;
  onPayPress: (payment: PaymentItem) => void;
};

function formatMoney(value?: number | string | null): string {
  return `S/ ${Number(value ?? 0).toFixed(2)}`;
}

function formatDate(value?: string | null): string {
  if (!value) return 'N/R';

  return value.slice(0, 10);
}

export function PaymentSummaryCard({
  summary,
  onPayPress,
}: PaymentSummaryCardProps): React.JSX.Element {
  const nextPayablePayment =
    summary.overdue_payments[0] ?? summary.pending_payments[0] ?? null;

  return (
    <>
      <SectionCard title="Resumen financiero">
        <View style={styles.metricsGrid}>
          <MetricCard label="Total" value={formatMoney(summary.cycle_total_amount)} />
          <MetricCard label="Pagado" value={formatMoney(summary.total_paid)} />
          <MetricCard label="Pendiente" value={formatMoney(summary.total_pending)} />
          <MetricCard label="Vencido" value={formatMoney(summary.total_overdue)} />
        </View>

        <AppText color={colors.text.secondary} variant="caption">
          {summary.financial_status}
        </AppText>
      </SectionCard>

      <SectionCard title="Centro de pagos">
        {nextPayablePayment ? (
          <View style={styles.paymentItem}>
            <View style={styles.paymentHeader}>
              <AppText color={colors.text.primary} variant="body">
                {nextPayablePayment.concept}
              </AppText>

              <Badge
                label={
                  nextPayablePayment.calculated_status === 'overdue'
                    ? 'Vencido'
                    : 'Pendiente'
                }
                variant={
                  nextPayablePayment.calculated_status === 'overdue'
                    ? 'error'
                    : 'warning'
                }
              />
            </View>

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

            <AppButton
              title="Pagar ahora"
              onPress={() => onPayPress(nextPayablePayment)}
            />
          </View>
        ) : (
          <View style={styles.upToDateBox}>
            <Badge label="Al día" variant="success" />

            <AppText color={colors.text.primary} variant="body">
              No tienes deudas pendientes.
            </AppText>

            <AppText color={colors.text.secondary} variant="caption">
              Todos tus pagos del periodo {summary.academic_period_name ?? 'actual'} están registrados.
            </AppText>
          </View>
        )}
      </SectionCard>

      <SectionCard title="Pagos pendientes">
        {summary.pending_payments.length > 0 ? (
          <View style={styles.list}>
            {summary.pending_payments.map((payment) => (
              <View key={payment.id} style={styles.paymentItem}>
                <View style={styles.paymentHeader}>
                  <AppText color={colors.text.primary} variant="body">
                    {payment.concept}
                  </AppText>

                  <Badge label="Pendiente" variant="warning" />
                </View>

                <View style={styles.infoGrid}>
                  <InfoItem label="Monto" value={formatMoney(payment.amount)} />
                  <InfoItem label="Vence" value={formatDate(payment.due_date)} />
                </View>

                <AppButton title="Pagar" onPress={() => onPayPress(payment)} />
              </View>
            ))}
          </View>
        ) : (
          <AppText color={colors.text.muted} variant="caption">
            No tienes pagos pendientes.
          </AppText>
        )}
      </SectionCard>

      <SectionCard title="Pagos vencidos">
        {summary.overdue_payments.length > 0 ? (
          <View style={styles.list}>
            {summary.overdue_payments.map((payment) => (
              <View key={payment.id} style={styles.paymentItem}>
                <View style={styles.paymentHeader}>
                  <AppText color={colors.text.primary} variant="body">
                    {payment.concept}
                  </AppText>

                  <Badge label="Vencido" variant="error" />
                </View>

                <View style={styles.infoGrid}>
                  <InfoItem label="Monto" value={formatMoney(payment.amount)} />
                  <InfoItem label="Venció" value={formatDate(payment.due_date)} />
                </View>

                <AppButton title="Pagar deuda" onPress={() => onPayPress(payment)} />
              </View>
            ))}
          </View>
        ) : (
          <AppText color={colors.text.muted} variant="caption">
            No tienes pagos vencidos.
          </AppText>
        )}
      </SectionCard>

      <SectionCard title="Historial y boletas">
        {summary.payment_history.length > 0 ? (
          <View style={styles.list}>
            {summary.payment_history.map((payment) => (
              <View key={payment.id} style={styles.paymentItem}>
                <View style={styles.paymentHeader}>
                  <AppText color={colors.text.primary} variant="body">
                    Operación {payment.operation_code ?? 'N/R'}
                  </AppText>

                  <Badge label="Pagado" variant="success" />
                </View>

                <View style={styles.infoGrid}>
                  <InfoItem label="Monto" value={formatMoney(payment.amount_paid)} />
                  <InfoItem label="Fecha" value={formatDate(payment.paid_at)} />
                  <InfoItem
                    label="Método"
                    value={payment.payment_method ?? 'No registrado'}
                  />
                  <InfoItem
                    label="Boleta"
                    value={payment.receipt_url ? 'Disponible' : 'Sin PDF'}
                  />
                </View>
              </View>
            ))}
          </View>
        ) : (
          <AppText color={colors.text.muted} variant="caption">
            Aún no tienes pagos registrados.
          </AppText>
        )}
      </SectionCard>
    </>
  );
}

const styles = StyleSheet.create({
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },

  list: {
    gap: spacing.sm,
  },

  paymentItem: {
    gap: spacing.sm,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.secondary,
    padding: spacing.md,
  },

  paymentHeader: {
    gap: spacing.sm,
  },

  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },

  upToDateBox: {
    gap: spacing.sm,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.status.success,
    backgroundColor: colors.background.secondary,
    padding: spacing.md,
  },
});