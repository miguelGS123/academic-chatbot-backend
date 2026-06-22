import React, { useMemo, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { router, type Href } from 'expo-router';

import { registerUser } from '@/features/auth/services/auth.service';

import {
  AppButton,
  AppCard,
  AppInput,
  AppScreen,
  AppSelect,
  AppText,
  type AppSelectOption,
} from '@/shared/components';

import { colors, spacing } from '@/shared/theme';

type RegisterForm = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  career: string;
  cycle: string;
};

type RegisterErrors = Partial<Record<keyof RegisterForm, string>>;

const loginRoute = '/(auth)/login' as Href;

const careerOptions: AppSelectOption[] = [
  {
    label: 'Ingeniería de Sistemas',
    value: 'Ingeniería de Sistemas',
  },
  {
    label: 'Administración',
    value: 'Administración',
  },
  {
    label: 'Derecho',
    value: 'Derecho',
  },
  {
    label: 'Psicología',
    value: 'Psicología',
  },
  {
    label: 'Contabilidad',
    value: 'Contabilidad',
  },
];

const cycleOptions: AppSelectOption[] = [
  {
    label: 'I Ciclo',
    value: '1',
  },
  {
    label: 'II Ciclo',
    value: '2',
  },
  {
    label: 'III Ciclo',
    value: '3',
  },
  {
    label: 'IV Ciclo',
    value: '4',
  },
  {
    label: 'V Ciclo',
    value: '5',
  },
  {
    label: 'VI Ciclo',
    value: '6',
  },
  {
    label: 'VII Ciclo',
    value: '7',
  },
  {
    label: 'VIII Ciclo',
    value: '8',
  },
  {
    label: 'IX Ciclo',
    value: '9',
  },
  {
    label: 'X Ciclo',
    value: '10',
  },
];

const initialForm: RegisterForm = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  career: '',
  cycle: '',
};

export default function RegisterScreen(): React.JSX.Element {
  const [form, setForm] = useState<RegisterForm>(initialForm);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = useMemo(() => {
    const fullName = form.fullName.trim();
    const email = form.email.trim().toLowerCase();
    const selectedCycle = Number(form.cycle);

    return (
      fullName.length >= 3 &&
      email.endsWith('@autonoma.edu.pe') &&
      form.password.length >= 6 &&
      form.password === form.confirmPassword &&
      form.career.trim().length > 0 &&
      Number.isInteger(selectedCycle) &&
      selectedCycle >= 1 &&
      selectedCycle <= 10
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

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));
  }

  function validateForm(): boolean {
    const nextErrors: RegisterErrors = {};
    const email = form.email.trim().toLowerCase();
    const selectedCycle = Number(form.cycle);

    if (form.fullName.trim().length < 3) {
      nextErrors.fullName = 'Ingresa un nombre válido.';
    }

    if (!email) {
      nextErrors.email = 'Ingresa tu correo institucional.';
    } else if (!email.endsWith('@autonoma.edu.pe')) {
      nextErrors.email = 'Usa tu correo institucional @autonoma.edu.pe.';
    }

    if (!form.career.trim()) {
      nextErrors.career = 'Selecciona tu carrera.';
    }

    if (
      !Number.isInteger(selectedCycle) ||
      selectedCycle < 1 ||
      selectedCycle > 10
    ) {
      nextErrors.cycle = 'Selecciona tu ciclo académico.';
    }

    if (form.password.length < 6) {
      nextErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  async function handleRegister(): Promise<void> {
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      setIsSubmitting(true);

      await registerUser({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        career: form.career,
        cycle: Number(form.cycle),
      });

      Alert.alert(
        'Cuenta creada',
        'Tu cuenta fue creada correctamente. Ahora puedes iniciar sesión.',
        [
          {
            text: 'Ir al login',
            onPress: () => router.replace(loginRoute),
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
    <AppScreen contentStyle={styles.content} scrollable>
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
          error={errors.fullName}
          label="Nombre completo"
          placeholder="Usuario Demo"
          value={form.fullName}
          onChangeText={(value) => updateField('fullName', value)}
        />

        <AppInput
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isSubmitting}
          error={errors.email}
          keyboardType="email-address"
          label="Correo institucional"
          placeholder="usuario@autonoma.edu.pe"
          value={form.email}
          onChangeText={(value) => updateField('email', value)}
        />

        <AppSelect
          disabled={isSubmitting}
          error={errors.career}
          label="Carrera"
          options={careerOptions}
          placeholder="-- Seleccione --"
          value={form.career}
          onChange={(value) => updateField('career', value)}
        />

        <AppSelect
          disabled={isSubmitting}
          error={errors.cycle}
          label="Ciclo académico"
          options={cycleOptions}
          placeholder="-- Seleccione --"
          value={form.cycle}
          onChange={(value) => updateField('cycle', value)}
        />

        <AppInput
          editable={!isSubmitting}
          error={errors.password}
          label="Contraseña"
          placeholder="Mínimo 6 caracteres"
          secureTextEntry
          value={form.password}
          onChangeText={(value) => updateField('password', value)}
        />

        <AppInput
          editable={!isSubmitting}
          error={errors.confirmPassword}
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
          onPress={() => router.replace(loginRoute)}
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