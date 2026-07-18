import { router, type Href } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 

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

const displayName = user?.full_name ?? (user as any)?.name ?? '';
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

  if (isLoading || !user) {
    return (
      <AppScreen contentStyle={styles.loadingContainer} scrollable={false}>
        <ActivityIndicator color={colors.brand.primary} size="large" />
        <AppText variant="caption">Cargando sesión...</AppText>
      </AppScreen>
    );
  }

  return (
    // Volvemos transparente la pantalla base para liberar el degradado trasero
    <AppScreen style={styles.screen} contentStyle={styles.screenContent} scrollable={false}>
      <LinearGradient
        colors={['#060919', '#1b0a2b', '#040209']} 
        style={styles.mainGradient}
      >
        <UniversityHeader
          initials={initials}
          universityLogo={universityLogo}
          universityName={universityName}
          onOpenMenu={() => setIsMenuVisible(true)}
        />

        <View style={styles.header}>
          <AppText variant="title" style={styles.welcomeText}>Hola, {displayName}</AppText>
          <AppText variant="subtitle" style={styles.subtitleText}>
            Elige un módulo para continuar con tu gestión académica.
          </AppText>
        </View>

        {/* grilla original limpia y organizada */}
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
      </LinearGradient>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justify: 'center',
    gap: spacing.md,
  },
  screen: {
    backgroundColor: 'transparent', 
    flex: 1,
  },
  screenContent: {
    flex: 1,
    padding: 0, 
  },
  mainGradient: {
    flex: 1,
    padding: spacing.md,
    gap: spacing.lg,
  },
  header: {
    gap: spacing.xs,
    backgroundColor: 'transparent',
  },
  welcomeText: {
    color: '#ffffff',
    textShadowColor: 'rgba(0, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  subtitleText: {
    color: '#94a3b8',
  },
});