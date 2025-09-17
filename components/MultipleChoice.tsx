import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  question: string;
  options: string[];
  onSelect: (answer: string) => void;
}

export function MultipleChoice({ question, options, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <Text
        style={styles.question}
        accessibilityRole="header"
        accessibilityLabel={`Question: ${question}`}
      >
        {question}
      </Text>

      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.option}
          onPress={() => onSelect(option)}
          accessibilityLabel={`Option ${index + 1}: ${option}`}
          accessibilityRole="button"
          accessibilityHint="Tap to select this answer"
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 32,
    textAlign: 'center',
  },
  option: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});