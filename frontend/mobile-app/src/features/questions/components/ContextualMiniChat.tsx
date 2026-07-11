import React, { useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { askQuestion } from '@/features/questions/services/questions.service';
import { AppText, SectionCard } from '@/shared/components';
import { colors, radius, spacing } from '@/shared/theme';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

type ContextualMiniChatProps = {
  userId: number;
  title: string;
  description: string;
  emptyMessage: string;
  placeholder?: string;
  questionPrefix: string;
  loadingMessage?: string;
};

export function ContextualMiniChat({
  userId,
  title,
  description,
  emptyMessage,
  placeholder = 'Escribe tu consulta...',
  questionPrefix,
  loadingMessage = 'Chatzitho está revisando la información...',
}: ContextualMiniChatProps): React.JSX.Element {
  const scrollRef = useRef<ScrollView>(null);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);

  const cleanMessage = message.trim();
  const canSend = cleanMessage.length > 0 && !isSending;

  function scrollToEnd(): void {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({
        animated: true,
      });
    }, 120);
  }

  async function handleSend(): Promise<void> {
    if (!canSend) {
      return;
    }

    const currentMessage = cleanMessage;

    setMessages((current) => [
      ...current,
      {
        id: `${Date.now()}-user`,
        role: 'user',
        text: currentMessage,
      },
    ]);

    setMessage('');
    setIsSending(true);
    scrollToEnd();

    try {
      const response = await askQuestion({
        user_id: userId,
        question: `${questionPrefix}: ${currentMessage}`,
        session_id: null,
        persist: false,
      });

      setMessages((current) => [
        ...current,
        {
          id: `${Date.now()}-assistant`,
          role: 'assistant',
          text: response.answer,
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: `${Date.now()}-error`,
          role: 'assistant',
          text:
            'No pude responder en este momento. Verifica la conexión e inténtalo nuevamente.',
        },
      ]);
    } finally {
      setIsSending(false);
      scrollToEnd();
    }
  }

  return (
    <SectionCard title={title}>
      <AppText
        color={colors.text.secondary}
        variant="caption"
      >
        {description}
      </AppText>

      <ScrollView
        ref={scrollRef}
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={styles.messagesScroll}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.length === 0 ? (
          <View style={styles.emptyChat}>
            <AppText
              color={colors.text.muted}
              variant="caption"
            >
              {emptyMessage}
            </AppText>
          </View>
        ) : (
          messages.map((item) => (
            <View
              key={item.id}
              style={[
                styles.messageBubble,
                item.role === 'user'
                  ? styles.userBubble
                  : styles.assistantBubble,
              ]}
            >
              <AppText
                color={
                  item.role === 'user'
                    ? colors.text.inverse
                    : colors.text.primary
                }
                variant="caption"
              >
                {item.text}
              </AppText>
            </View>
          ))
        )}

        {isSending ? (
          <View
            style={[
              styles.messageBubble,
              styles.assistantBubble,
              styles.loadingBubble,
            ]}
          >
            <AppText
              color={colors.text.muted}
              variant="caption"
            >
              {loadingMessage}
            </AppText>
          </View>
        ) : null}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          editable={!isSending}
          maxLength={700}
          multiline
          placeholder={placeholder}
          placeholderTextColor={colors.text.muted}
          style={styles.input}
          value={message}
          onChangeText={setMessage}
        />

        <Pressable
          accessibilityRole="button"
          disabled={!canSend}
          onPress={() => {
            void handleSend();
          }}
          style={({ pressed }) => [
            styles.sendButton,
            !canSend ? styles.sendButtonDisabled : null,
            pressed && canSend ? styles.sendButtonPressed : null,
          ]}
        >
          <AppText
            color={colors.text.inverse}
            variant="body"
          >
            {isSending ? 'Procesando...' : 'Enviar'}
          </AppText>
        </Pressable>
      </View>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  messagesScroll: {
    maxHeight: 340,
  },

  messagesContent: {
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },

  emptyChat: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.secondary,
    padding: spacing.md,
  },

  messageBubble: {
    maxWidth: '92%',
    borderRadius: radius.lg,
    padding: spacing.md,
  },

  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: colors.brand.primary,
  },

  assistantBubble: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.secondary,
  },

  loadingBubble: {
    opacity: 0.8,
  },

  inputContainer: {
    gap: spacing.sm,
  },

  input: {
    minHeight: 72,
    maxHeight: 130,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.strong,
    backgroundColor: colors.background.secondary,
    color: colors.text.primary,
    padding: spacing.md,
    textAlignVertical: 'top',
  },

  sendButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.lg,
    backgroundColor: colors.brand.primary,
    padding: spacing.md,
  },

  sendButtonDisabled: {
    opacity: 0.45,
  },

  sendButtonPressed: {
    opacity: 0.8,
  },
});