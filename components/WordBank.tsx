import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  prompt: string;
  bank: string[];
  onSubmit: (answer: string[]) => void;
}

export function WordBank({ prompt, bank, onSubmit }: Props) {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(bank);

  const selectWord = (word: string) => {
    setSelectedWords([...selectedWords, word]);
    setAvailableWords(availableWords.filter(w => w !== word));
  };

  const removeWord = (index: number) => {
    const word = selectedWords[index];
    setSelectedWords(selectedWords.filter((_, i) => i !== index));
    setAvailableWords([...availableWords, word]);
  };

  const handleSubmit = () => {
    if (selectedWords.length > 0) {
      onSubmit(selectedWords);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={styles.prompt}
        accessibilityRole="header"
        accessibilityLabel={`Question: ${prompt}`}
      >
        {prompt}
      </Text>

      <View
        style={styles.answerArea}
        accessibilityLabel="Selected words area"
        accessibilityHint="Tap on words to remove them"
      >
        {selectedWords.map((word, index) => (
          <TouchableOpacity
            key={`${word}-${index}`}
            style={styles.selectedWord}
            onPress={() => removeWord(index)}
            accessibilityLabel={`Selected word: ${word}`}
            accessibilityRole="button"
            accessibilityHint="Tap to remove this word"
          >
            <Text style={styles.selectedWordText}>{word}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View
        style={styles.bankArea}
        accessibilityLabel="Available words"
        accessibilityHint="Tap on words to select them"
      >
        {availableWords.map((word, index) => (
          <TouchableOpacity
            key={`${word}-${index}`}
            style={styles.bankWord}
            onPress={() => selectWord(word)}
            accessibilityLabel={`Available word: ${word}`}
            accessibilityRole="button"
            accessibilityHint="Tap to select this word"
          >
            <Text style={styles.bankWordText}>{word}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, selectedWords.length === 0 && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={selectedWords.length === 0}
        accessibilityLabel="Submit answer"
        accessibilityRole="button"
        accessibilityState={{ disabled: selectedWords.length === 0 }}
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
  prompt: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 32,
    textAlign: 'center',
  },
  answerArea: {
    minHeight: 60,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  selectedWord: {
    backgroundColor: '#58CC02',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedWordText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  bankArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  bankWord: {
    backgroundColor: '#E5E5E5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  bankWordText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
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