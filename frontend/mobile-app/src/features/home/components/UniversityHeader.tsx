import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  View,
  type ImageSourcePropType,
} from 'react-native';

import { AppText } from '@/shared/components';
import { colors, radius, spacing } from '@/shared/theme';

type UniversityHeaderProps = {
  universityName: string;
  universityLogo: ImageSourcePropType | null;
  initials: string;
  onOpenMenu: () => void;
};

export function UniversityHeader({
  universityName,
  universityLogo,
  initials,
  onOpenMenu,
}: UniversityHeaderProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.universityContainer}>
        {universityLogo ? (
          <Image
            resizeMode="contain"
            source={universityLogo}
            style={styles.universityLogo}
          />
        ) : null}

        <AppText
          color={colors.text.primary}
          numberOfLines={2}
          style={styles.universityName}
          variant="badge"
        >
          {universityName}
        </AppText>
      </View>

      <Pressable style={styles.profileButton} onPress={onOpenMenu}>
        <AppText color={colors.text.primary} variant="badge">
          {initials}
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },

  universityContainer: {
    flex: 1,
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.background.elevated,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },

  universityLogo: {
    width: 38,
    height: 38,
    borderRadius: radius.full,
  },

  universityName: {
    flex: 1,
    flexShrink: 1,
    lineHeight: 20,
  },

  profileButton: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
    backgroundColor: colors.background.elevated,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
});