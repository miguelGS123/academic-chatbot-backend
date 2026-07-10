import React from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import type { PaymentHistoryItem } from '@/features/payments/types/payment.types';
import {
  AppText,
  Badge,
  EmptyState,
  InfoItem,
} from '@/shared/components';
import { colors, radius, spacing } from '@/shared/theme';

type PaymentHistoryModalProps = {
  visible: boolean;
  items: PaymentHistoryItem[];
  onClose: () => void;
};

function formatMoney(value: number | string): string {
  return `S/ ${Number(value).toFixed(2)}`;
}

function formatDate(value: string): string {
  return value.slice(0, 10);
}

export function PaymentHistoryModal({
  visible,
  items,
  onClose,
}: PaymentHistoryModalProps): React.JSX.Element {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable onPress={onClose} style={styles.backdrop} />

        <View style={styles.sheet}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <View style={styles.titleBlock}>
              <AppText variant="sectionTitle">Historial de pagos</AppText>

              <AppText color={colors.text.secondary} variant="caption">
                Operaciones registradas en tu cuenta.
              </AppText>
            </View>

            <Pressable onPress={onClose} style={styles.closeButton}>
              <AppText variant="caption">Cerrar</AppText>
            </Pressable>
          </View>

          {items.length === 0 ? (
            <EmptyState
              title="Sin operaciones"
              message="Todavía no tienes pagos registrados."
            />
          ) : (
            <ScrollView
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
            >
              {items.map((item) => (
                <View key={item.id} style={styles.historyItem}>
                  <View style={styles.itemHeader}>
                    <AppText variant="body">
                      {item.operation_code ?? 'Operación sin código'}
                    </AppText>

                    <Badge label="Pagado" variant="success" />
                  </View>

                  <View style={styles.infoGrid}>
                    <InfoItem
                      label="Monto"
                      value={formatMoney(item.amount_paid)}
                    />

                    <InfoItem
                      label="Fecha"
                      value={formatDate(item.paid_at)}
                    />

                    <InfoItem
                      label="Método"
                      value={item.payment_method ?? 'No registrado'}
                    />

                    <InfoItem
                      label="Comprobante"
                      value={
                        item.receipt_url
                          ? 'Disponible'
                          : 'Código de operación'
                      }
                    />
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
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

  sheet: {
    maxHeight: '82%',
    gap: spacing.md,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border.strong,
    backgroundColor: colors.background.primary,
    padding: spacing.lg,
  },

  handle: {
    alignSelf: 'center',
    width: 48,
    height: 5,
    borderRadius: radius.full,
    backgroundColor: colors.border.strong,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },

  titleBlock: {
    flex: 1,
    gap: spacing.xs,
  },

  closeButton: {
    alignSelf: 'flex-start',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.strong,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },

  list: {
    gap: spacing.sm,
    paddingBottom: spacing.md,
  },

  historyItem: {
    gap: spacing.sm,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.secondary,
    padding: spacing.md,
  },

  itemHeader: {
    gap: spacing.sm,
  },

  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});