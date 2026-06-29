import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '@/shared/theme';

export function Divider(): React.JSX.Element {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: colors.border.subtle,
  },
});