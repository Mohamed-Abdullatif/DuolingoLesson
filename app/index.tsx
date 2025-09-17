import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useLocale } from '../context/LocaleContext';
import lessonData from '../assets/lesson.json';

export default function StartScreen() {
  const router = useRouter();
  const { locale, setLocale, t } = useLocale();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.languageButton}
        onPress={() => setLocale(locale === 'en' ? 'es' : 'en')}
      >
        <Text style={styles.languageText}>{locale === 'en' ? 'ES' : 'EN'}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{lessonData.title}</Text>
      <Text style={styles.subtitle}>
        {lessonData.exercises.length} {t.startScreen.exercises}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/lesson')}
      >
        <Text style={styles.buttonText}>{t.startScreen.startLesson}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFF',
  },
  languageButton: {
    position: 'absolute',
    top: 60,
    right: 24,
    backgroundColor: '#E5E5E5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  languageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 48,
  },
  button: {
    backgroundColor: '#58CC02',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});