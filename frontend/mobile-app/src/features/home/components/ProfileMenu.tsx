import React from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {
  AppButton,
  AppText,
} from '@/shared/components';

import { colors, radius, spacing } from '@/shared/theme';

type ProfileMenuProps = {
  visible: boolean;
  displayName: string;
  initials: string;
  universityName: string;
  email: string;
  career: string;
  cycle: string;
  role: string;
  onClose: () => void;
  onLogout: () => void;
};

export function ProfileMenu({
  visible,
  displayName,
  initials,
  universityName,
  email,
  career,
  cycle,
  role,
  onClose,
  onLogout,
}: ProfileMenuProps): React.JSX.Element {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.card}>
          <View style={styles.header}>
            <View style={styles.identity}>
              <View style={styles.avatar}>
                <AppText color={colors.text.primary} variant="badge">
                  {initials}
                </AppText>
              </View>

              <View style={styles.identityText}>
                <AppText variant="sectionTitle">{displayName}</AppText>
                <AppText variant="caption">{universityName}</AppText>
              </View>
            </View>

            <Pressable onPress={onClose}>
              <AppText color={colors.brand.primary} variant="caption">
                Cerrar
              </AppText>
            </Pressable>
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.section}>
              <AppText variant="sectionTitle">Mi información</AppText>

              <View style={styles.infoGrid}>
                <InfoItem label="Correo" value={email} />
                <InfoItem label="Carrera" value={career} />
                <InfoItem label="Ciclo" value={cycle} />
                <InfoItem label="Rol" value={role} />
              </View>
            </View>

            <View style={styles.section}>
              <AppText variant="sectionTitle">Opciones</AppText>

              <MenuDisabledOption
                label="Resumen académico"
                subtitle="Próximamente"
              />

              <MenuDisabledOption
                label="Cambiar contraseña"
                subtitle="Próximamente"
              />

              <MenuDisabledOption
                label="Ajustes"
                subtitle="Próximamente"
              />
            </View>
          </ScrollView>

          <AppButton title="Cerrar sesión" onPress={onLogout} />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

type InfoItemProps = {
  label: string;
  value: string;
};

function InfoItem({
  label,
  value,
}: InfoItemProps): React.JSX.Element {
  return (
    <View style={styles.infoItem}>
      <AppText variant="caption">{label}</AppText>
      <AppText color={colors.text.primary}>{value}</AppText>
    </View>
  );
}

type MenuDisabledOptionProps = {
  label: string;
  subtitle: string;
};

function MenuDisabledOption({
  label,
  subtitle,
}: MenuDisabledOptionProps): React.JSX.Element {
  return (
    <View style={styles.disabledOption}>
      <AppText color={colors.text.primary}>{label}</AppText>
      <AppText variant="caption">{subtitle}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    padding: spacing.lg,
  },

  card: {
    maxHeight: '88%',
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.elevated,
    padding: spacing.lg,
    gap: spacing.lg,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },

  identity: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },

  avatar: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },

  identityText: {
    flex: 1,
    gap: spacing.xs,
  },

  scrollContent: {
    gap: spacing.lg,
  },

  section: {
    gap: spacing.md,
  },

  infoGrid: {
    gap: spacing.sm,
  },

  infoItem: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.secondary,
    padding: spacing.lg,
    gap: spacing.xs,
  },

  disabledOption: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.secondary,
    padding: spacing.lg,
    gap: spacing.xs,
    opacity: 0.75,
  },
});