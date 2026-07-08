import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { payPayment } from '@/features/payments/services/payments.service';
import type {
  PayPaymentResponse,
  PaymentItem,
} from '@/features/payments/types/payment.types';
import { AppButton, AppText, InfoItem, SectionCard } from '@/shared/components';
import { colors, radius, spacing } from '@/shared/theme';

type PaymentCheckoutCardProps = {
  payment: PaymentItem;
  onCancel: () => void;
  onSuccess: (response: PayPaymentResponse) => void;
};

function formatMoney(value: number | string): string {
  return `S/ ${Number(value).toFixed(2)}`;
}

export function PaymentCheckoutCard({
  payment,
  onCancel,
  onSuccess,
}: PaymentCheckoutCardProps): React.JSX.Element {
  const [cardHolder, setCardHolder] = useState('');
  const [cardLastFour, setCardLastFour] = useState('');
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canPay =
    cardHolder.trim().length >= 3 &&
    cardLastFour.trim().length === 4 &&
    !isPaying;

  async function handlePay(): Promise<void> {
    try {
      setIsPaying(true);
      setError(null);

      const response = await payPayment(payment.id, {
        payment_method_code: 'card',
        card_holder: cardHolder.trim(),
        card_last_four: cardLastFour.trim(),
        confirmation_note: 'Pago registrado desde Chatzitho',
      });

      onSuccess(response);
    } catch {
      setError(
        'No se pudo registrar el pago. Verifica los datos e inténtalo nuevamente.',
      );
    } finally {
      setIsPaying(false);
    }
  }

  return (
    <SectionCard title="Validar pago">
      <View style={styles.infoGrid}>
        <InfoItem label="Concepto" value={payment.concept} />

        <InfoItem label="Monto" value={formatMoney(payment.amount)} />
      </View>

      <TextInput
        placeholder="Nombre del titular"
        placeholderTextColor={colors.text.muted}
        style={styles.input}
        value={cardHolder}
        onChangeText={setCardHolder}
      />

      <TextInput
        keyboardType="number-pad"
        maxLength={4}
        placeholder="Últimos 4 dígitos"
        placeholderTextColor={colors.text.muted}
        style={styles.input}
        value={cardLastFour}
        onChangeText={setCardLastFour}
      />

      {error ? (
        <AppText color={colors.status.error} variant="caption">
          {error}
        </AppText>
      ) : null}

      <View style={styles.actions}>
        <Pressable onPress={onCancel} style={styles.cancelButton}>
          <AppText color={colors.text.primary} variant="caption">
            Cancelar
          </AppText>
        </Pressable>

        <AppButton
          disabled={!canPay}
          title={isPaying ? 'Procesando...' : 'Pagar ahora'}
          onPress={() => {
            void handlePay();
          }}
        />
      </View>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },

  input: {
    minHeight: 48,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.secondary,
    color: colors.text.primary,
    paddingHorizontal: spacing.md,
  },

  actions: {
    gap: spacing.sm,
  },

  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.strong,
    backgroundColor: colors.background.secondary,
    padding: spacing.md,
  },
});