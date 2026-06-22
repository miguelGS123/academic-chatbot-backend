import { router, type Href } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useAuth } from '@/features/auth/hooks/useAuth';

import {
  HomeModulesGrid,
  ProfileMenu,
  UniversityHeader,
} from '@/features/home/components';

import {
  formatCycle,
  formatRole,
  getInitials,
  getUniversityIdByName,
} from '@/features/home/utils/home-formatters';

import { AppScreen, AppText } from '@/shared/components';

import { getUniversityLogoById } from '@/shared/constants/university-assets';

import { colors, spacing } from '@/shared/theme';

const loginRoute = '/(auth)/login' as Href;

export default function HomeScreen(): React.JSX.Element {
  const { user, isAuthenticated, isLoading, signOut } = useAuth();

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(loginRoute);
    }
  }, [isAuthenticated, isLoading]);

  const displayName = user?.full_name ?? '';
  const universityName = user?.university ?? 'Universidad no identificada';

  const email = user?.email ?? '';
  const career = user?.career ?? 'No registrada';
  const role = formatRole(user?.role);
  const cycle = formatCycle(user?.cycle);

  const universityId = getUniversityIdByName(user?.university);

  const universityLogo = getUniversityLogoById(universityId);

  const initials = useMemo(() => getInitials(displayName), [displayName]);

  async function handleLogout(): Promise<void> {
    setIsMenuVisible(false);

    await signOut();

    router.replace(loginRoute);
  }

  if (isLoading) {
    return (
      <AppScreen contentStyle={styles.loadingContainer} scrollable={false}>
        <ActivityIndicator color={colors.brand.primary} size="large" />

        <AppText variant="caption">Cargando sesión...</AppText>
      </AppScreen>
    );
  }

  if (!user) {
    return (
      <AppScreen contentStyle={styles.loadingContainer} scrollable={false}>
        <ActivityIndicator color={colors.brand.primary} size="large" />

        <AppText variant="caption">Redirigiendo al login...</AppText>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <UniversityHeader
        initials={initials}
        universityLogo={universityLogo}
        universityName={universityName}
        onOpenMenu={() => setIsMenuVisible(true)}
      />

      <View style={styles.header}>
        <AppText variant="title">Hola, {displayName}</AppText>

        <AppText variant="subtitle">
          Elige un módulo para continuar con tu gestión académica.
        </AppText>
      </View>

      <HomeModulesGrid />

      <ProfileMenu
        career={career}
        cycle={cycle}
        displayName={displayName}
        email={email}
        initials={initials}
        role={role}
        universityName={universityName}
        visible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
        onLogout={handleLogout}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },

  header: {
    gap: spacing.md,
  },
});