import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MultipleChoice } from '../components/MultipleChoice';

describe('MultipleChoice Component', () => {
  const mockOnSelect = jest.fn();
  const defaultProps = {
    question: 'What is the translation for "Hello"?',
    options: ['Hola', 'Adiós', 'Gracias'],
    onSelect: mockOnSelect
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders question and all options', () => {
    const { getByText } = render(<MultipleChoice {...defaultProps} />);

    expect(getByText('What is the translation for "Hello"?')).toBeTruthy();
    expect(getByText('Hola')).toBeTruthy();
    expect(getByText('Adiós')).toBeTruthy();
    expect(getByText('Gracias')).toBeTruthy();
  });

  it('calls onSelect with correct option when option is pressed', () => {
    const { getByText } = render(<MultipleChoice {...defaultProps} />);

    const correctOption = getByText('Hola');
    fireEvent.press(correctOption);

    expect(mockOnSelect).toHaveBeenCalledWith('Hola');
  });

  it('calls onSelect with different options when pressed', () => {
    const { getByText } = render(<MultipleChoice {...defaultProps} />);

    const wrongOption = getByText('Adiós');
    fireEvent.press(wrongOption);

    expect(mockOnSelect).toHaveBeenCalledWith('Adiós');
  });

  it('has proper accessibility labels', () => {
    const { getByLabelText } = render(<MultipleChoice {...defaultProps} />);

    expect(getByLabelText('Question: What is the translation for "Hello"?')).toBeTruthy();
    expect(getByLabelText('Option 1: Hola')).toBeTruthy();
    expect(getByLabelText('Option 2: Adiós')).toBeTruthy();
    expect(getByLabelText('Option 3: Gracias')).toBeTruthy();
  });

  it('handles empty options array', () => {
    const { getByText, queryByText } = render(
      <MultipleChoice {...defaultProps} options={[]} />
    );

    expect(getByText('What is the translation for "Hello"?')).toBeTruthy();
    expect(queryByText('Hola')).toBeNull();
  });

  it('handles single option', () => {
    const { getByText } = render(
      <MultipleChoice {...defaultProps} options={['Only Option']} />
    );

    expect(getByText('Only Option')).toBeTruthy();

    fireEvent.press(getByText('Only Option'));
    expect(mockOnSelect).toHaveBeenCalledWith('Only Option');
  });
});