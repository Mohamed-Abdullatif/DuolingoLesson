import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  question: string;
  onSubmit: (answer: string) => void;
}

export function TextInputExercise({ question, onSubmit }: Props) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmit(answer.trim().toLowerCase());
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={styles.question}
        accessibilityRole="header"
        accessibilityLabel={`Question: ${question}`}
      >
        {question}
      </Text>

      <TextInput
        style={styles.input}
        value={answer}
        onChangeText={setAnswer}
        placeholder="Type your answer..."
        autoCapitalize="none"
        onSubmitEditing={handleSubmit}
        accessibilityLabel="Answer input field"
        accessibilityHint="Type your answer here"
      />

      <TouchableOpacity
        style={[styles.button, !answer.trim() && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!answer.trim()}
        accessibilityLabel="Submit answer"
        accessibilityRole="button"
        accessibilityState={{ disabled: !answer.trim() }}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
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
  input: {
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1CB0F6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#E5E5E5',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});