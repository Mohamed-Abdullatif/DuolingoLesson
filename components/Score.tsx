import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLessonStore } from '../store/lessonStore';

export function Score() {
  const score = useLessonStore((state) => state.score);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Score: {score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#58CC02',
  },
});