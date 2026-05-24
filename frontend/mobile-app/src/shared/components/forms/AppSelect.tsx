import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { AppText } from '@/shared/components/typography/AppText';
import { colors, radius, spacing } from '@/shared/theme';

export type AppSelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type AppSelectProps = {
  label: string;
  placeholder: string;
  value: string;
  options: AppSelectOption[];
  error?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

export function AppSelect({
  label,
  placeholder,
  value,
  options,
  error,
  disabled = false,
  onChange,
}: AppSelectProps): React.JSX.Element {
  const [isVisible, setIsVisible] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  function openSelect(): void {
    if (!disabled) {
      setIsVisible(true);
    }
  }

  function closeSelect(): void {
    setIsVisible(false);
  }

  function handleSelect(nextValue: string): void {
    onChange(nextValue);
    closeSelect();
  }

  return (
    <View style={styles.container}>
      <AppText variant="caption">{label}</AppText>

      <Pressable
        disabled={disabled}
        style={[
          styles.trigger,
          error ? styles.triggerError : null,
          disabled ? styles.triggerDisabled : null,
        ]}
        onPress={openSelect}
      >
        <AppText
          color={selectedOption ? colors.text.primary : colors.text.muted}
        >
          {selectedOption?.label ?? placeholder}
        </AppText>

        <AppText color={colors.text.muted} variant="caption">
          ▼
        </AppText>
      </Pressable>

      {error ? (
        <AppText color={colors.status.error} variant="caption">
          {error}
        </AppText>
      ) : null}

      <Modal
        animationType="fade"
        transparent
        visible={isVisible}
        onRequestClose={closeSelect}
      >
        <Pressable style={styles.overlay} onPress={closeSelect}>
          <Pressable style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <AppText variant="sectionTitle">{label}</AppText>

              <Pressable onPress={closeSelect}>
                <AppText color={colors.brand.primary} variant="caption">
                  Cerrar
                </AppText>
              </Pressable>
            </View>

            <ScrollView
              contentContainerStyle={styles.optionList}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator
            >
              {options.map((option) => {
                const isSelected = option.value === value;

                return (
                  <Pressable
                    key={option.value}
                    disabled={option.disabled}
                    style={[
                      styles.option,
                      isSelected ? styles.optionSelected : null,
                      option.disabled ? styles.optionDisabled : null,
                    ]}
                    onPress={() => handleSelect(option.value)}
                  >
                    <AppText
                      color={
                        option.disabled
                          ? colors.text.muted
                          : colors.text.primary
                      }
                    >
                      {option.label}
                    </AppText>

                    {isSelected ? (
                      <AppText color={colors.brand.primary} variant="caption">
                        Seleccionado
                      </AppText>
                    ) : null}
                  </Pressable>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },

  trigger: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.lg,
  },

  triggerError: {
    borderColor: colors.status.error,
  },

  triggerDisabled: {
    opacity: 0.6,
  },

  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    padding: spacing.lg,
  },

  modalCard: {
    maxHeight: '70%',
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.elevated,
    padding: spacing.lg,
    gap: spacing.lg,
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  optionList: {
    gap: spacing.sm,
    paddingBottom: spacing.md,
  },

  option: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },

  optionSelected: {
    borderColor: colors.brand.primary,
    backgroundColor: colors.background.primary,
  },

  optionDisabled: {
    opacity: 0.5,
  },
});