import { router, type Href } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { loginWithCredentials } from '@/features/auth/services/auth.service';

import {
  AppButton,
  AppCard,
  AppInput,
  AppScreen,
  AppSelect,
  AppText,
  type AppSelectOption,
} from '@/shared/components';

import { universities } from '@/shared/constants/universities';
import { colors, spacing, typography } from '@/shared/theme';

type LoginForm = {
  university: string;
  email: string;
  password: string;
};

type LoginErrors = Partial<Record<keyof LoginForm, string>>;

const universityOptions: AppSelectOption[] = universities.map((university) => ({
  label: university.enabled
    ? university.name
    : `${university.name} — Próximamente`,
  value: university.name,
  disabled: !university.enabled,
}));

const defaultUniversity = universities.find((university) => university.enabled);

const initialForm: LoginForm = {
  university: defaultUniversity?.name ?? '',
  email: '',
  password: '',
};

const homeRoute = '/(protected)/home' as Href;
const registerRoute = '/(auth)/register' as Href;

export default function LoginScreen(): React.JSX.Element {
  const [form, setForm] = useState<LoginForm>(initialForm);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();

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

  function validateForm(): boolean {
    const nextErrors: LoginErrors = {};

    if (!form.university.trim()) {
      nextErrors.university = 'Selecciona una universidad.';
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Ingresa tu correo institucional.';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
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

  async function handleLogin(): Promise<void> {
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      setIsLoading(true);

      const response = await loginWithCredentials({
        email: form.email,
        password: form.password,
      });

      await signIn(response.access_token);

      router.replace(homeRoute);
    } catch {
      Alert.alert(
        'No se pudo iniciar sesión',
        'El login fue recibido, pero no se pudo validar el usuario autenticado. Borra los datos de Expo Go y vuelve a iniciar sesión.',
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handlePasswordRecovery(): void {
    Alert.alert(
      'Recuperación de contraseña',
      'Luego conectaremos este flujo para enviar una contraseña temporal de un solo uso por correo.',
    );
  }

  return (
    <AppScreen contentStyle={styles.content}>
      {/* Orbes de neón de fondo para dar profundidad ambiental */}
      <View style={styles.neonOrb1} />
      <View style={styles.neonOrb2} />

      <View style={styles.brandContainer}>
        <AppText style={styles.brandTitle}>Chatzitho</AppText>

        <AppText style={styles.brandSubtitle} variant="caption">
          Tu asistente académico inteligente
        </AppText>
      </View>

      {/* Envoltorio de cristal esmerilado con borde espejo y resplandor neón */}
      <View style={styles.glassWrapper}>
        <AppCard>
          <View style={styles.form}>
            <AppSelect
              disabled={isLoading}
              error={errors.university}
              label="Universidad"
              options={universityOptions}
              placeholder="-- Seleccione --"
              value={form.university}
              onChange={(value) => updateField('university', value)}
            />

            <AppInput
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
              error={errors.email}
              keyboardType="email-address"
              label="Correo institucional"
              placeholder="usuario@autonoma.edu.pe"
              value={form.email}
              onChangeText={(value) => updateField('email', value)}
            />

            <AppInput
              editable={!isLoading}
              error={errors.password}
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              secureTextEntry
              value={form.password}
              onChangeText={(value) => updateField('password', value)}
            />

            <Pressable disabled={isLoading} onPress={handlePasswordRecovery}>
              <AppText color={colors.brand.primary} style={styles.recoveryText}>
                ¿Olvidaste o necesitas actualizar tu contraseña?
              </AppText>
            </Pressable>

            <AppButton
              loading={isLoading}
              title="Ingresar"
              onPress={() => {
                void handleLogin();
              }}
            />

            <Pressable
              disabled={isLoading}
              style={styles.registerLinkContainer}
              onPress={() => router.push(registerRoute)}
            >
              <AppText color={colors.text.muted} variant="caption">
                ¿No tienes cuenta?{' '}
                <AppText color={colors.brand.primary} variant="caption">
                  Regístrate
                </AppText>
              </AppText>
            </Pressable>
          </View>
        </AppCard>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'center',
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

  recoveryText: {
    textAlign: 'right',
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
  },

  registerLinkContainer: {
    alignItems: 'center',
  },

  /* --- NUEVOS ESTILOS AGREGADOS PARA EL EFECTO VISUAL --- */
  glassWrapper: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)', // Reflejo brillante tipo canto de vidrio
    padding: 1,
    // Efecto de aura / resplandor neón exterior (Glow)
    shadowColor: colors.brand.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 6, // Soporte de relieve para Android
  },

  neonOrb1: {
    position: 'absolute',
    top: '10%',
    left: '-25%',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: colors.brand.primary,
    opacity: 0.18, // Destello celeste suave difuminado por software
  },

  neonOrb2: {
    position: 'absolute',
    bottom: '5%',
    right: '-20%',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: '#7c3aed', // Contraste violeta neón espectacular
    opacity: 0.12,
  },
});