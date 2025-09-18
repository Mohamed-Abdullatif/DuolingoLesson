import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TextInputExercise } from '../components/TextInput';

describe('TextInputExercise Component', () => {
  const mockOnSubmit = jest.fn();
  const defaultProps = {
    question: 'Type the translation for: Thank you',
    onSubmit: mockOnSubmit
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders question and input field', () => {
    const { getByText, getByPlaceholderText } = render(<TextInputExercise {...defaultProps} />);

    expect(getByText('Type the translation for: Thank you')).toBeTruthy();
    expect(getByPlaceholderText('Type your answer...')).toBeTruthy();
  });

  it('enables submit button when text is entered', () => {
    const { getByPlaceholderText, getByText } = render(<TextInputExercise {...defaultProps} />);

    const input = getByPlaceholderText('Type your answer...');
    const submitButton = getByText('Submit');

    // Initially disabled
    expect(submitButton.props.accessibilityState.disabled).toBe(true);

    // Enter text
    fireEvent.changeText(input, 'gracias');

    // Should be enabled now
    expect(submitButton.props.accessibilityState.disabled).toBe(false);
  });

  it('trims and lowercases input before submitting', () => {
    const { getByPlaceholderText, getByText } = render(<TextInputExercise {...defaultProps} />);

    const input = getByPlaceholderText('Type your answer...');
    const submitButton = getByText('Submit');

    fireEvent.changeText(input, '  GRACIAS  ');
    fireEvent.press(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith('gracias');
  });

  it('submits on Enter key press', () => {
    const { getByPlaceholderText } = render(<TextInputExercise {...defaultProps} />);

    const input = getByPlaceholderText('Type your answer...');

    fireEvent.changeText(input, 'gracias');
    fireEvent(input, 'submitEditing');

    expect(mockOnSubmit).toHaveBeenCalledWith('gracias');
  });

  it('does not submit if input is empty or only whitespace', () => {
    const { getByPlaceholderText, getByText } = render(<TextInputExercise {...defaultProps} />);

    const input = getByPlaceholderText('Type your answer...');
    const submitButton = getByText('Submit');

    // Test empty input
    fireEvent.changeText(input, '');
    fireEvent.press(submitButton);
    expect(mockOnSubmit).not.toHaveBeenCalled();

    // Test whitespace only
    fireEvent.changeText(input, '   ');
    fireEvent.press(submitButton);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('handles case normalization correctly', () => {
    const { getByPlaceholderText, getByText } = render(<TextInputExercise {...defaultProps} />);

    const input = getByPlaceholderText('Type your answer...');
    const submitButton = getByText('Submit');

    const testCases = [
      { input: 'Gracias', expected: 'gracias' },
      { input: 'GRACIAS', expected: 'gracias' },
      { input: 'grACiaS', expected: 'gracias' },
      { input: 'por favor', expected: 'por favor' }
    ];

    testCases.forEach(({ input: testInput, expected }) => {
      mockOnSubmit.mockClear();
      fireEvent.changeText(input, testInput);
      fireEvent.press(submitButton);
      expect(mockOnSubmit).toHaveBeenCalledWith(expected);
    });
  });

  it('has proper accessibility labels', () => {
    const { getByLabelText } = render(<TextInputExercise {...defaultProps} />);

    expect(getByLabelText('Question: Type the translation for: Thank you')).toBeTruthy();
    expect(getByLabelText('Answer input field')).toBeTruthy();
    expect(getByLabelText('Submit answer')).toBeTruthy();
  });
});