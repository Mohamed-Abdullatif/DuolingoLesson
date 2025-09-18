import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocale } from '../context/LocaleContext';

interface Props {
  text?: string;
  visible?: boolean;
}

export function AudioFallback({ text, visible = true }: Props) {
  const { t } = useLocale();

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.fallbackText}>
        🔇 {t.lesson.audioFallback}
      </Text>
      {text && (
        <Text style={styles.displayText}>
          "{text}"
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF3CD',
    borderColor: '#FFEAA7',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 14,
    color: '#856404',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 4,
  },
  displayText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },
});