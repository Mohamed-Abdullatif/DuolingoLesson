import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { useLocale } from '../context/LocaleContext';
import { Progress } from '../types/simple';

export default function CompletionScreen() {
  const router = useRouter();
  const { t } = useLocale();
  const [progress, setProgress] = useState<Progress | null>(null);
  const celebrationAnim = new Animated.Value(0);

  useEffect(() => {
    loadCompletionData();
    startCelebration();
  }, []);

  const loadCompletionData = async () => {
    try {
      const saved = await AsyncStorage.getItem('completedLesson');
      if (saved) {
        setProgress(JSON.parse(saved));
      }
    } catch (error) {
      console.log('Error loading completion data:', error);
    }
  };

  const startCelebration = () => {
    // Celebration haptic feedback
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    Animated.sequence([
      Animated.timing(celebrationAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(celebrationAnim, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const resetLesson = async () => {
    await AsyncStorage.removeItem('completedLesson');
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.celebration, { transform: [{ scale: celebrationAnim }] }]}>
        <Text style={styles.emoji}>🎉</Text>
      </Animated.View>

      <Text style={styles.title}>{t.completion.title}</Text>
      <Text style={styles.subtitle}>{t.completion.subtitle}</Text>

      {progress && (
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>+{progress.xp}</Text>
            <Text style={styles.statLabel}>{t.completion.xpEarned}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{progress.streak}</Text>
            <Text style={styles.statLabel}>🔥 {t.completion.streak}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{progress.score}/{6}</Text>
            <Text style={styles.statLabel}>{t.completion.correct}</Text>
          </View>
        </View>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={resetLesson}
      >
        <Text style={styles.buttonText}>{t.completion.startAgain}</Text>
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
  celebration: {
    marginBottom: 24,
  },
  emoji: {
    fontSize: 64,
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
    marginBottom: 32,
    textAlign: 'center',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 48,
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#58CC02',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
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