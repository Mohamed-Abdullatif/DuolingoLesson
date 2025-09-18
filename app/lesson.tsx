import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { useLocale } from '../context/LocaleContext';
import { ProgressBar } from '../components/ProgressBar';
import { Score } from '../components/Score';
import { Hearts } from '../components/Hearts';
import { MultipleChoice } from '../components/MultipleChoice';
import { TextInputExercise } from '../components/TextInput';
import { WordBank } from '../components/WordBank';
import { AudioFallback } from '../components/AudioFallback';
import { Exercise, Progress } from '../types/simple';
import lessonData from '../assets/lesson.json';

export default function LessonScreen() {
  const router = useRouter();
  const { t } = useLocale();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentExercise = lessonData.exercises[currentIndex] as Exercise;
  const isLastExercise = currentIndex === lessonData.exercises.length - 1;

  useEffect(() => {
    loadProgress();
  }, []);

  useEffect(() => {
    saveProgress();
  }, [currentIndex, score, hearts, xp, streak]);

  const loadProgress = async () => {
    try {
      const saved = await AsyncStorage.getItem('lessonProgress');
      if (saved) {
        const progress: Progress = JSON.parse(saved);
        if (!progress.completed) {
          setCurrentIndex(progress.currentIndex);
          setScore(progress.score);
          setHearts(progress.hearts);
          setXp(progress.xp);
          setStreak(progress.streak);
        }
      }
    } catch (error) {
      console.log('Error loading progress:', error);
    }
  };

  const saveProgress = async () => {
    try {
      const progress: Progress = {
        currentIndex,
        score,
        hearts,
        xp,
        streak,
        completed: false
      };
      await AsyncStorage.setItem('lessonProgress', JSON.stringify(progress));
    } catch (error) {
      console.log('Error saving progress:', error);
    }
  };

  const clearProgress = async () => {
    try {
      await AsyncStorage.removeItem('lessonProgress');
    } catch (error) {
      console.log('Error clearing progress:', error);
    }
  };

  const handleAnswer = (answer: string | string[]) => {
    let correct = false;

    if (Array.isArray(currentExercise.answer)) {
      const userAnswer = Array.isArray(answer) ? answer : [answer];
      correct = JSON.stringify(userAnswer) === JSON.stringify(currentExercise.answer);
    } else {
      const userAnswer = Array.isArray(answer) ? answer.join(' ') : answer;
      correct = userAnswer.toLowerCase().trim() === currentExercise.answer.toLowerCase().trim();
    }

    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(score + 1);
      setXp(xp + lessonData.xp_per_correct);
      if (isLastExercise) {
        setStreak(streak + lessonData.streak_increment);
      }
      // Success haptic feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      if (hearts > 0) {
        setHearts(hearts - 1);
      }
      // Error haptic feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const handleNext = async () => {
    if (isLastExercise) {
      await clearProgress();
      const finalProgress: Progress = {
        currentIndex: lessonData.exercises.length,
        score,
        hearts,
        xp,
        streak,
        completed: true
      };
      await AsyncStorage.setItem('completedLesson', JSON.stringify(finalProgress));
      router.push('/completion');
    } else {
      setCurrentIndex(currentIndex + 1);
      setShowResult(false);
    }
  };

  return (
    <View style={styles.container}>
      <ProgressBar current={currentIndex + 1} total={lessonData.exercises.length} />
      <Hearts hearts={hearts} streak={streak} />
      <Score score={score} />

      {currentExercise.type === 'multiple_choice' ? (
        <MultipleChoice
          question={currentExercise.prompt}
          options={currentExercise.choices || []}
          onSelect={handleAnswer}
        />
      ) : currentExercise.type === 'type_answer' ? (
        <TextInputExercise
          question={currentExercise.prompt}
          onSubmit={handleAnswer}
        />
      ) : currentExercise.type === 'listening' ? (
        <View style={styles.listeningContainer}>
          <AudioFallback
            text={currentExercise.audio_text || currentExercise.prompt}
            visible={true}
          />
          <TextInputExercise
            question="What did you hear?"
            onSubmit={handleAnswer}
          />
        </View>
      ) : (
        <WordBank
          prompt={currentExercise.prompt}
          bank={currentExercise.bank || []}
          onSubmit={handleAnswer}
        />
      )}

      {showResult && (
        <View style={[styles.result, isCorrect ? styles.correct : styles.incorrect]}>
          <Text style={styles.resultText}>
            {isCorrect ? t.lesson.correct : t.lesson.incorrect}
          </Text>
          <Text style={styles.explanationText}>{currentExercise.explanation}</Text>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {isLastExercise ? t.lesson.finish : t.lesson.next}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 50,
  },
  listeningContainer: {
    padding: 24,
  },
  result: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    alignItems: 'center',
  },
  correct: {
    backgroundColor: '#D7FFB8',
  },
  incorrect: {
    backgroundColor: '#FFDFE0',
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 16,
    marginBottom: 16,
  },
  nextButton: {
    backgroundColor: '#58CC02',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});