import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppCard, AppScreen, AppText } from '@/shared/components';
import { colors, radius, spacing } from '@/shared/theme';

export default function LoginScreen(): React.JSX.Element {
  return (
    <AppScreen contentStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <AppText variant="badge">Academic Chatbot Platform</AppText>
        </View>

        <AppText variant="title">Bienvenido</AppText>

        <AppText variant="subtitle">
          Inicia sesión para acceder a tu plataforma universitaria inteligente.
        </AppText>
      </View>

      <AppCard>
        <AppText variant="sectionTitle">Login multiuniversidad</AppText>

        <AppText>
          En la siguiente fase conectaremos esta pantalla con el auth-service de
          FastAPI usando JWT.
        </AppText>
      </AppCard>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    flexGrow: 1,
  },

  header: {
    gap: spacing.md,
  },

  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.background.elevated,
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
});