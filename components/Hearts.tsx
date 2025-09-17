import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLessonStore } from '../store/lessonStore';

interface Props {
  streak: number;
}

export function Hearts({ streak }: Props) {
  const hearts = useLessonStore((state) => state.hearts);
  const renderHearts = () => {
    const heartIcons = [];
    for (let i = 0; i < 3; i++) {
      heartIcons.push(
        <Text key={i} style={styles.heart}>
          {i < hearts ? '❤️' : '🤍'}
        </Text>
      );
    }
    return heartIcons;
  };

  return (
    <View style={styles.container}>
      <View style={styles.hearts}>
        {renderHearts()}
      </View>
      <View style={styles.streak}>
        <Text style={styles.streakText}>🔥 {streak}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  hearts: {
    flexDirection: 'row',
  },
  heart: {
    fontSize: 20,
    marginRight: 4,
  },
  streak: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B00',
  },
});