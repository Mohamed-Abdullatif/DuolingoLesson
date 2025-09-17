import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLessonStore } from '../store/lessonStore';

export function ProgressBar() {
  const progress = useLessonStore((state) => state.progress);
  const totalQuestions = useLessonStore((state) => state.totalQuestions);
  const progressPercentage = totalQuestions > 0 ? (progress / totalQuestions) * 100 : 0;

  return (
    <View style={styles.container}>
      <View style={[styles.fill, { width: `${progressPercentage}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    marginVertical: 16,
  },
  fill: {
    height: '100%',
    backgroundColor: '#58CC02',
    borderRadius: 4,
  },
});