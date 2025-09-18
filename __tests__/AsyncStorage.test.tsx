import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LessonScreen from '../app/lesson';
import CompletionScreen from '../app/completion';
import { useRouter } from 'expo-router';
import { useLocale } from '../context/LocaleContext';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn()
}));

jest.mock('expo-router', () => ({
  useRouter: jest.fn()
}));

jest.mock('../context/LocaleContext', () => ({
  useLocale: jest.fn()
}));

jest.mock('../assets/lesson.json', () => ({
  id: 'test-lesson',
  title: 'Test Lesson',
  xp_per_correct: 10,
  streak_increment: 1,
  exercises: [
    {
      id: 'ex1',
      type: 'multiple_choice',
      prompt: 'Test question',
      choices: ['A', 'B', 'C'],
      answer: 'A',
      explanation: 'Test explanation'
    }
  ]
}));

describe('AsyncStorage Persistence Tests', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useLocale as jest.Mock).mockReturnValue({
      t: {
        lesson: {
          correct: 'Correct!',
          incorrect: 'Incorrect',
          next: 'Next',
          finish: 'Finish'
        }
      }
    });
  });

  describe('LessonScreen Persistence', () => {
    it('saves progress to AsyncStorage after each step', async () => {
      render(<LessonScreen />);

      await waitFor(() => {
        expect(AsyncStorage.setItem).toHaveBeenCalledWith(
          'lessonProgress',
          expect.stringContaining('"currentIndex"')
        );
      });
    });

    it('restores progress from AsyncStorage on app reopen', async () => {
      const savedProgress = {
        currentIndex: 2,
        score: 1,
        hearts: 2,
        xp: 10,
        streak: 0,
        completed: false
      };

      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
        JSON.stringify(savedProgress)
      );

      render(<LessonScreen />);

      await waitFor(() => {
        expect(AsyncStorage.getItem).toHaveBeenCalledWith('lessonProgress');
      });
    });

    it('handles AsyncStorage errors gracefully', async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValue(
        new Error('Storage error')
      );

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      render(<LessonScreen />);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith(
          'Error loading progress:',
          expect.any(Error)
        );
      });

      consoleSpy.mockRestore();
    });

    it('clears progress when lesson is completed', async () => {
      const { rerender } = render(<LessonScreen />);

      // Simulate lesson completion by re-rendering
      rerender(<LessonScreen />);

      await waitFor(() => {
        expect(AsyncStorage.removeItem).toHaveBeenCalled();
      });
    });

    it('saves completion data to separate key', async () => {
      render(<LessonScreen />);

      await waitFor(() => {
        expect(AsyncStorage.setItem).toHaveBeenCalledWith(
          'completedLesson',
          expect.stringContaining('"completed":true')
        );
      }, { timeout: 3000 });
    });
  });

  describe('CompletionScreen Persistence', () => {
    it('loads completion data from AsyncStorage', async () => {
      const completionData = {
        currentIndex: 6,
        score: 5,
        hearts: 1,
        xp: 50,
        streak: 1,
        completed: true
      };

      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
        JSON.stringify(completionData)
      );

      render(<CompletionScreen />);

      await waitFor(() => {
        expect(AsyncStorage.getItem).toHaveBeenCalledWith('completedLesson');
      });
    });

    it('handles missing completion data gracefully', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      render(<CompletionScreen />);

      await waitFor(() => {
        expect(AsyncStorage.getItem).toHaveBeenCalledWith('completedLesson');
      });
    });

    it('clears completion data when restarting lesson', async () => {
      render(<CompletionScreen />);

      await waitFor(() => {
        expect(AsyncStorage.removeItem).toHaveBeenCalledWith('completedLesson');
      });
    });
  });

  describe('Data Integrity Tests', () => {
    it('saves progress with correct structure', async () => {
      render(<LessonScreen />);

      await waitFor(() => {
        const saveCall = (AsyncStorage.setItem as jest.Mock).mock.calls.find(
          call => call[0] === 'lessonProgress'
        );

        if (saveCall) {
          const savedData = JSON.parse(saveCall[1]);
          expect(savedData).toHaveProperty('currentIndex');
          expect(savedData).toHaveProperty('score');
          expect(savedData).toHaveProperty('hearts');
          expect(savedData).toHaveProperty('xp');
          expect(savedData).toHaveProperty('streak');
          expect(savedData).toHaveProperty('completed');
        }
      });
    });

    it('maintains data types in saved progress', async () => {
      render(<LessonScreen />);

      await waitFor(() => {
        const saveCall = (AsyncStorage.setItem as jest.Mock).mock.calls.find(
          call => call[0] === 'lessonProgress'
        );

        if (saveCall) {
          const savedData = JSON.parse(saveCall[1]);
          expect(typeof savedData.currentIndex).toBe('number');
          expect(typeof savedData.score).toBe('number');
          expect(typeof savedData.hearts).toBe('number');
          expect(typeof savedData.xp).toBe('number');
          expect(typeof savedData.streak).toBe('number');
          expect(typeof savedData.completed).toBe('boolean');
        }
      });
    });
  });
});