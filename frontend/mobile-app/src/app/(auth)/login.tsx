import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';

import {
  AppButton,
  AppCard,
  AppInput,
  AppScreen,
  AppText,
} from '@/shared/components';
import { universities } from '@/shared/constants/universities';
import { colors, radius, spacing, typography } from '@/shared/theme';

type LoginForm = {
  university: string;
  email: string;
  password: string;
};

type LoginErrors = Partial<Record<keyof LoginForm, string>>;

const defaultUniversity = universities.find((university) => university.enabled);

const initialForm: LoginForm = {
  university: defaultUniversity?.name ?? '',
  email: '',
  password: '',
};

export default function LoginScreen(): React.JSX.Element {
  const [form, setForm] = useState<LoginForm>(initialForm);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isUniversitySelectorOpen, setIsUniversitySelectorOpen] =
    useState(false);

  const availableUniversities = universities.filter(
    (university) => university.enabled && university.name !== form.university,
  );

  function updateField(field: keyof LoginForm, value: string): void {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));
  }

  function selectUniversity(universityName: string): void {
    updateField('university', universityName);
    setIsUniversitySelectorOpen(false);
  }

  function validateForm(): boolean {
    const nextErrors: LoginErrors = {};

    if (!form.university.trim()) {
      nextErrors.university = 'Selecciona una universidad.';
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Ingresa tu correo institucional.';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = 'Ingresa un correo válido.';
    }

    if (!form.password.trim()) {
      nextErrors.password = 'Ingresa tu contraseña.';
    } else if (form.password.length < 6) {
      nextErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function handleLogin(): void {
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      Alert.alert(
        'Login listo',
        'Luego conectaremos este flujo con FastAPI, JWT y rutas protegidas.',
      );
    }, 900);
  }

  function handlePasswordRecovery(): void {
    Alert.alert(
      'Recuperación de contraseña',
      'Luego conectaremos este flujo para enviar una contraseña temporal de un solo uso por correo.',
    );
  }

  return (
    <AppScreen contentStyle={styles.content}>
      <View style={styles.brandContainer}>
        <AppText style={styles.brandTitle}>Chatzitho</AppText>
        <AppText variant="caption" style={styles.brandSubtitle}>
          Tu asistente académico inteligente
        </AppText>
      </View>

      <AppCard>
        <View style={styles.form}>
          <View style={styles.fieldGroup}>
            <AppText variant="caption">Universidad</AppText>

            <Pressable
              style={styles.selector}
              onPress={() =>
                setIsUniversitySelectorOpen((currentValue) => !currentValue)
              }
            >
              <AppText color={colors.text.primary}>
                {form.university || 'Selecciona tu universidad'}
              </AppText>

              <AppText variant="caption">
                {isUniversitySelectorOpen ? '▲' : '▼'}
              </AppText>
            </Pressable>

            {errors.university ? (
              <AppText color={colors.status.error} variant="caption">
                {errors.university}
              </AppText>
            ) : null}

            {isUniversitySelectorOpen ? (
              <View style={styles.selectorMenu}>
                {availableUniversities.map((university) => (
                  <Pressable
                    key={university.id}
                    style={styles.selectorOption}
                    onPress={() => selectUniversity(university.name)}
                  >
                    <AppText color={colors.text.primary}>
                      {university.name}
                    </AppText>
                  </Pressable>
                ))}

                <View style={styles.comingSoonOption}>
                  <AppText color={colors.text.muted}>Próximamente</AppText>
                </View>
              </View>
            ) : null}
          </View>

          <AppInput
            autoCapitalize="none"
            autoCorrect={false}
            error={errors.email}
            keyboardType="email-address"
            label="Correo institucional"
            placeholder="usuario@autonoma.edu.pe"
            value={form.email}
            onChangeText={(value) => updateField('email', value)}
          />

          <AppInput
            error={errors.password}
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            secureTextEntry
            value={form.password}
            onChangeText={(value) => updateField('password', value)}
          />

          <Pressable onPress={handlePasswordRecovery}>
            <AppText color={colors.brand.primary} style={styles.recoveryText}>
              ¿Olvidaste o necesitas actualizar tu contraseña?
            </AppText>
          </Pressable>

          <AppButton
            loading={isLoading}
            title="Ingresar"
            onPress={handleLogin}
          />
        </View>
      </AppCard>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    flexGrow: 1,
    gap: spacing.xl,
  },

  brandContainer: {
    alignItems: 'center',
    gap: spacing.xs,
  },

  brandTitle: {
    color: colors.text.primary,
    fontSize: 36,
    fontWeight: typography.weight.bold,
    letterSpacing: 0.4,
    lineHeight: 44,
  },

  brandSubtitle: {
    textAlign: 'center',
  },

  form: {
    gap: spacing.lg,
  },

  fieldGroup: {
    gap: spacing.sm,
  },

  selector: {
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

  selectorMenu: {
    overflow: 'hidden',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.secondary,
  },

  selectorOption: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },

  comingSoonOption: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },

  recoveryText: {
    textAlign: 'right',
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
  },
});