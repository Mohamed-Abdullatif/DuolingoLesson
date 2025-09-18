import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useRouter } from 'expo-router';
import StartScreen from '../app/index';
import { useLocale } from '../context/LocaleContext';

jest.mock('expo-router', () => ({
  useRouter: jest.fn()
}));

jest.mock('../context/LocaleContext', () => ({
  useLocale: jest.fn()
}));

jest.mock('../assets/lesson.json', () => ({
  title: 'Test Lesson',
  exercises: [
    { id: 'ex1', type: 'multiple_choice' },
    { id: 'ex2', type: 'type_answer' },
    { id: 'ex3', type: 'word_bank' }
  ]
}));

describe('StartScreen Component', () => {
  const mockPush = jest.fn();
  const mockSetLocale = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush
    });
    (useLocale as jest.Mock).mockReturnValue({
      locale: 'en',
      setLocale: mockSetLocale,
      t: {
        startScreen: {
          exercises: 'exercises',
          startLesson: 'Start Lesson',
          estimatedTime: 'Estimated time'
        }
      }
    });
  });

  it('renders lesson title and exercise count', () => {
    const { getByText } = render(<StartScreen />);

    expect(getByText('Test Lesson')).toBeTruthy();
    expect(getByText('3 exercises')).toBeTruthy();
  });

  it('navigates to lesson screen when Start Lesson is pressed', () => {
    const { getByText } = render(<StartScreen />);

    const startButton = getByText('Start Lesson');
    fireEvent.press(startButton);

    expect(mockPush).toHaveBeenCalledWith('/lesson');
  });

  it('toggles language when language button is pressed', () => {
    const { getByText } = render(<StartScreen />);

    const languageButton = getByText('ES');
    fireEvent.press(languageButton);

    expect(mockSetLocale).toHaveBeenCalledWith('es');
  });

  it('shows correct language toggle text based on current locale', () => {
    (useLocale as jest.Mock).mockReturnValue({
      locale: 'es',
      setLocale: mockSetLocale,
      t: {
        startScreen: {
          exercises: 'ejercicios',
          startLesson: 'Comenzar Lección',
          estimatedTime: 'Tiempo estimado'
        }
      }
    });

    const { getByText } = render(<StartScreen />);
    expect(getByText('EN')).toBeTruthy();
  });
});