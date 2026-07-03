import React from 'react';
import { StyleSheet, View } from 'react-native';

import type { PaymentSummary } from '@/features/payments/types/payment.types';
import {
  AppText,
  Badge,
  InfoItem,
  MetricCard,
  SectionCard,
} from '@/shared/components';
import { colors, radius, spacing } from '@/shared/theme';

type PaymentSummaryCardProps = {
  summary: PaymentSummary;
};

function formatMoney(value?: number | string): string {
  const numericValue = Number(value ?? 0);

  return `S/ ${numericValue.toFixed(2)}`;
}

function normalizeStatus(status?: string | null): string {
  if (!status) return 'Pendiente';

  const labels: Record<string, string> = {
    pending: 'Pendiente',
    paid: 'Pagado',
    overdue: 'Vencido',
    cancelled: 'Cancelado',
  };

  return labels[status.toLowerCase()] ?? status;
}

export function PaymentSummaryCard({
  summary,
}: PaymentSummaryCardProps): React.JSX.Element {
  const pendingPayments = summary.pending_payments ?? [];
  const paidPayments = summary.paid_payments ?? [];
  const overduePayments = summary.overdue_payments ?? [];

  return (
    <>
      <SectionCard title="Resumen financiero">
        <View style={styles.metricsGrid}>
          <MetricCard
            label="Total"
            value={formatMoney(summary.total_amount)}
            helper="Monto del periodo"
          />

          <MetricCard
            label="Pagado"
            value={formatMoney(summary.paid_amount)}
            helper="Pagos registrados"
          />

          <MetricCard
            label="Pendiente"
            value={formatMoney(summary.pending_amount)}
            helper="Por cancelar"
          />

          <MetricCard
            label="Vencido"
            value={formatMoney(summary.overdue_amount)}
            helper="Fuera de fecha"
          />
        </View>
      </SectionCard>

      <SectionCard title="Pagos pendientes">
        {pendingPayments.length > 0 ? (
          <View style={styles.list}>
            {pendingPayments.map((payment, index) => (
              <View key={`${payment.concept}-${index}`} style={styles.paymentItem}>
                <View style={styles.paymentHeader}>
                  <AppText color={colors.text.primary} variant="body">
                    {payment.concept ?? 'Concepto no registrado'}
                  </AppText>

                  <Badge label={normalizeStatus(payment.status)} variant="warning" />
                </View>

                <View style={styles.infoGrid}>
                  <InfoItem label="Monto" value={formatMoney(payment.amount)} />
                  <InfoItem label="Vence" value={payment.due_date ?? 'N/R'} />
                </View>
              </View>
            ))}
          </View>
        ) : (
          <AppText color={colors.text.muted} variant="caption">
            No tienes pagos pendientes registrados.
          </AppText>
        )}
      </SectionCard>

      <SectionCard title="Pagos vencidos">
        {overduePayments.length > 0 ? (
          <View style={styles.list}>
            {overduePayments.map((payment, index) => (
              <View key={`${payment.concept}-${index}`} style={styles.paymentItem}>
                <View style={styles.paymentHeader}>
                  <AppText color={colors.text.primary} variant="body">
                    {payment.concept ?? 'Concepto no registrado'}
                  </AppText>

                  <Badge label={normalizeStatus(payment.status)} variant="error" />
                </View>

                <View style={styles.infoGrid}>
                  <InfoItem label="Monto" value={formatMoney(payment.amount)} />
                  <InfoItem label="Vence" value={payment.due_date ?? 'N/R'} />
                </View>
              </View>
            ))}
          </View>
        ) : (
          <AppText color={colors.text.muted} variant="caption">
            No tienes pagos vencidos.
          </AppText>
        )}
      </SectionCard>

      <SectionCard title="Historial de pagos">
        {paidPayments.length > 0 ? (
          <View style={styles.list}>
            {paidPayments.map((payment, index) => (
              <View key={`${payment.concept}-${index}`} style={styles.paymentItem}>
                <View style={styles.paymentHeader}>
                  <AppText color={colors.text.primary} variant="body">
                    {payment.concept ?? 'Concepto no registrado'}
                  </AppText>

                  <Badge label={normalizeStatus(payment.status)} variant="success" />
                </View>

                <View style={styles.infoGrid}>
                  <InfoItem label="Monto" value={formatMoney(payment.amount)} />
                  <InfoItem label="Fecha" value={payment.due_date ?? 'N/R'} />
                </View>
              </View>
            ))}
          </View>
        ) : (
          <AppText color={colors.text.muted} variant="caption">
            Aún no hay pagos registrados como cancelados.
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
});