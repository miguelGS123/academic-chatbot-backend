import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { ConversationHistoryModal } from '@/features/questions/components/ConversationHistoryModal';
import {
  GlobalChat,
  type GlobalChatRef,
} from '@/features/questions/components/GlobalChat';
import { useQuestionHistory } from '@/features/questions/hooks/useQuestionHistory';
import {
  AppScreen,
  AppText,
  EmptyState,
  ErrorState,
  LoadingState,
  ModuleHeader,
} from '@/shared/components';
import { colors, radius, spacing } from '@/shared/theme';

export default function QuestionsScreen(): React.JSX.Element {
  const { user } = useAuth();

  const chatRef = useRef<GlobalChatRef>(null);

  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  const {
    sessions,
    selectedSessionId,
    selectedMessages,
    isLoadingSessions,
    isLoadingMessages,
    error,
    selectSession,
    startNewConversation,
    registerCreatedSession,
    refetch,
  } = useQuestionHistory(user?.id);

  function handleStartNewConversation(): void {
    startNewConversation();
    chatRef.current?.startNewConversation();
  }

  if (!user?.id) {
    return (
      <AppScreen>
        <ModuleHeader
          title="Preguntas"
          subtitle="Asistente académico global de Chatzitho."
        />

        <EmptyState
          title="Usuario no disponible"
          message="No se pudo identificar el usuario autenticado."
        />
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <ModuleHeader
        title="Preguntas"
        subtitle="Consulta cualquier información académica desde un solo lugar."
      />

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          onPress={() => setIsHistoryVisible(true)}
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed ? styles.buttonPressed : null,
          ]}
        >
          <AppText color={colors.text.primary} variant="body">
            Historial
          </AppText>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={handleStartNewConversation}
          style={({ pressed }) => [
            styles.primaryButton,
            pressed ? styles.buttonPressed : null,
          ]}
        >
          <AppText color={colors.text.inverse} variant="body">
            Nueva conversación
          </AppText>
        </Pressable>
      </View>

      {error ? (
        <ErrorState
          message={error}
          onRetry={() => {
            void refetch();
          }}
        />
      ) : null}

      {isLoadingMessages ? (
        <LoadingState message="Cargando conversación..." />
      ) : (
        <GlobalChat
          ref={chatRef}
          initialMessages={selectedMessages}
          initialSessionId={selectedSessionId}
          userId={user.id}
          onNewConversation={startNewConversation}
          onSessionCreated={(sessionId) => {
            void registerCreatedSession(sessionId);
          }}
        />
      )}

      <ConversationHistoryModal
        error={error}
        isLoading={isLoadingSessions}
        selectedSessionId={selectedSessionId}
        sessions={sessions}
        visible={isHistoryVisible}
        onClose={() => setIsHistoryVisible(false)}
        onNewConversation={handleStartNewConversation}
        onRetry={refetch}
        onSelectSession={selectSession}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },

  primaryButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.lg,
    backgroundColor: colors.brand.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },

  secondaryButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.strong,
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },

  buttonPressed: {
    opacity: 0.75,
  },
});