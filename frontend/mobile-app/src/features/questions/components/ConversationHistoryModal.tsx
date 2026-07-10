import React from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { ConversationCard } from '@/features/questions/components/ConversationCard';
import type { ChatSession } from '@/features/questions/types/question.types';
import {
  AppText,
  EmptyState,
  ErrorState,
  LoadingState,
} from '@/shared/components';
import { colors, radius, spacing } from '@/shared/theme';

type ConversationHistoryModalProps = {
  visible: boolean;
  sessions: ChatSession[];
  selectedSessionId: number | null;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
  onRetry: () => Promise<void>;
  onSelectSession: (sessionId: number) => void;
  onNewConversation: () => void;
};

export function ConversationHistoryModal({
  visible,
  sessions,
  selectedSessionId,
  isLoading,
  error,
  onClose,
  onRetry,
  onSelectSession,
  onNewConversation,
}: ConversationHistoryModalProps): React.JSX.Element {
  function handleSelectSession(sessionId: number): void {
    onSelectSession(sessionId);
    onClose();
  }

  function handleNewConversation(): void {
    onNewConversation();
    onClose();
  }

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable
          accessibilityLabel="Cerrar historial"
          onPress={onClose}
          style={styles.backdrop}
        />

        <View style={styles.sheet}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <View style={styles.titleBlock}>
              <AppText variant="sectionTitle">
                Historial de conversaciones
              </AppText>

              <AppText color={colors.text.secondary} variant="caption">
                Selecciona una conversación para continuarla.
              </AppText>
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={onClose}
              style={({ pressed }) => [
                styles.closeButton,
                pressed ? styles.pressed : null,
              ]}
            >
              <AppText color={colors.text.primary} variant="body">
                Cerrar
              </AppText>
            </Pressable>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={handleNewConversation}
            style={({ pressed }) => [
              styles.newConversationButton,
              pressed ? styles.pressed : null,
            ]}
          >
            <AppText color={colors.text.inverse} variant="body">
              + Nueva conversación
            </AppText>
          </Pressable>

          {error ? (
            <ErrorState
              message={error}
              onRetry={() => {
                void onRetry();
              }}
            />
          ) : null}

          {isLoading ? (
            <LoadingState message="Cargando historial..." />
          ) : null}

          {!isLoading && !error && sessions.length === 0 ? (
            <EmptyState
              title="Sin conversaciones"
              message="Todavía no tienes conversaciones guardadas."
            />
          ) : null}

          {!isLoading && !error && sessions.length > 0 ? (
            <ScrollView
              contentContainerStyle={styles.sessionsContent}
              showsVerticalScrollIndicator={false}
              style={styles.sessionsScroll}
            >
              {sessions.map((session) => (
                <ConversationCard
                  key={session.id}
                  item={session}
                  selected={session.id === selectedSessionId}
                  onPress={() => handleSelectSession(session.id)}
                />
              ))}
            </ScrollView>
          ) : null}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },

  sheet: {
    maxHeight: '82%',
    gap: spacing.md,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border.strong,
    backgroundColor: colors.background.primary,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
  },

  handle: {
    alignSelf: 'center',
    width: 48,
    height: 5,
    borderRadius: radius.full,
    backgroundColor: colors.border.strong,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },

  titleBlock: {
    flex: 1,
    gap: spacing.xs,
  },

  closeButton: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.strong,
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },

  newConversationButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.lg,
    backgroundColor: colors.brand.primary,
    padding: spacing.md,
  },

  sessionsScroll: {
    flexGrow: 0,
  },

  sessionsContent: {
    gap: spacing.sm,
    paddingBottom: spacing.md,
  },

  pressed: {
    opacity: 0.75,
  },
});