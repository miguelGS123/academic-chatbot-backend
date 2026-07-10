import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import { PaymentCheckoutCard } from '@/features/payments/components/PaymentCheckoutCard';
import type {
  PayPaymentResponse,
  PaymentItem,
} from '@/features/payments/types/payment.types';
import { colors } from '@/shared/theme';

type PaymentCheckoutModalProps = {
  payment: PaymentItem | null;
  onClose: () => void;
  onSuccess: (response: PayPaymentResponse) => void;
};

export function PaymentCheckoutModal({
  payment,
  onClose,
  onSuccess,
}: PaymentCheckoutModalProps): React.JSX.Element {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={payment !== null}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable onPress={onClose} style={styles.backdrop} />

        <View style={styles.content}>
          {payment ? (
            <PaymentCheckoutCard
              payment={payment}
              onCancel={onClose}
              onSuccess={onSuccess}
            />
          ) : null}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },

  content: {
    maxHeight: '90%',
    backgroundColor: colors.background.primary,
  },
});