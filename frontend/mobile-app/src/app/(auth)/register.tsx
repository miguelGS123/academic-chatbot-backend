import React, { useMemo, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { env } from '@/config/env';
import {
  AppButton,
  AppCard,
  AppInput,
  AppScreen,
  AppText,
} from '@/shared/components';
import { colors, spacing } from '@/shared/theme';

type RegisterForm = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initialForm: RegisterForm = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function RegisterScreen(): React.JSX.Element {
  const [form, setForm] = useState<RegisterForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = useMemo(() => {
    const fullName = form.fullName.trim();
    const email = form.email.trim().toLowerCase();

    return (
      fullName.length >= 3 &&
      email.endsWith('@autonoma.edu.pe') &&
      form.password.length >= 6 &&
      form.password === form.confirmPassword
    );
  }, [form]);

  function updateField<K extends keyof RegisterForm>(
    field: K,
    value: RegisterForm[K],
  ): void {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  async function handleRegister(): Promise<void> {
    if (!isFormValid) {
      Alert.alert(
        'Datos inválidos',
        'Verifica tu nombre, correo institucional y contraseña.',
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(
        `${env.apiBaseUrl}/api/v1/users/users/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            full_name: form.fullName.trim(),
            email: form.email.trim().toLowerCase(),
            password: form.password,
          }),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();

        console.error('Register error:', errorText);

        throw new Error('Register failed');
      }

      Alert.alert(
        'Cuenta creada',
        'Tu cuenta fue creada correctamente. Ahora puedes iniciar sesión.',
        [
          {
            text: 'Ir al login',
            onPress: () => router.replace('/(auth)/login'),
          },
        ],
      );
    } catch {
      Alert.alert(
        'Error de registro',
        'No se pudo crear la cuenta. Verifica si el correo ya está registrado.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AppScreen
      contentStyle={styles.content}
      scrollable
    >
      <View style={styles.header}>
        <AppText variant="badge">Chatzitho</AppText>

        <View style={styles.titleGroup}>
          <AppText variant="title">Crear cuenta</AppText>

          <AppText variant="subtitle">
            Regístrate con tu correo institucional para acceder al ecosistema
            académico.
          </AppText>
        </View>
      </View>

      <AppCard>
        <AppInput
          autoCapitalize="words"
          autoCorrect={false}
          editable={!isSubmitting}
          label="Nombre completo"
          placeholder="Miguel Gamarra"
          value={form.fullName}
          onChangeText={(value) => updateField('fullName', value)}
        />

        <AppInput
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isSubmitting}
          keyboardType="email-address"
          label="Correo institucional"
          placeholder="usuario@autonoma.edu.pe"
          value={form.email}
          onChangeText={(value) => updateField('email', value)}
        />

        <AppInput
          editable={!isSubmitting}
          label="Contraseña"
          placeholder="Mínimo 6 caracteres"
          secureTextEntry
          value={form.password}
          onChangeText={(value) => updateField('password', value)}
        />

        <AppInput
          editable={!isSubmitting}
          label="Confirmar contraseña"
          placeholder="Repite tu contraseña"
          secureTextEntry
          value={form.confirmPassword}
          onChangeText={(value) => updateField('confirmPassword', value)}
        />

        <AppButton
          disabled={!isFormValid}
          loading={isSubmitting}
          title="Crear cuenta"
          onPress={() => {
            void handleRegister();
          }}
        />

        <AppText
          color={colors.text.muted}
          style={styles.loginLink}
          variant="caption"
          onPress={() => router.replace('/(auth)/login')}
        >
          Ya tengo una cuenta
        </AppText>
      </AppCard>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  header: {
    gap: spacing.md,
  },

  titleGroup: {
    gap: spacing.sm,
  },

  loginLink: {
    textAlign: 'center',
  },
});