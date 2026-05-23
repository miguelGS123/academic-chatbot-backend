import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '@/shared/theme';

type AppScreenProps = {
  children: React.ReactNode;
  scrollable?: boolean;
  contentStyle?: ViewStyle;
};

export function AppScreen({
  children,
  scrollable = true,
  contentStyle,
}: AppScreenProps): React.JSX.Element {
  if (scrollable) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={[styles.content, contentStyle]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.content, styles.flexContent, contentStyle]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },

  content: {
    padding: spacing.xl,
    gap: spacing.xl,
  },

  flexContent: {
    flex: 1,
  },
});
