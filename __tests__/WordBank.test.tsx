import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { WordBank } from '../components/WordBank';

describe('WordBank Component', () => {
  const mockOnSubmit = jest.fn();
  const defaultProps = {
    prompt: 'Build: See you later',
    bank: ['te', 'veo', 'más', 'tarde', 'hasta', 'luego'],
    onSubmit: mockOnSubmit
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders prompt and all bank words', () => {
    const { getByText } = render(<WordBank {...defaultProps} />);

    expect(getByText('Build: See you later')).toBeTruthy();
    expect(getByText('te')).toBeTruthy();
    expect(getByText('veo')).toBeTruthy();
    expect(getByText('más')).toBeTruthy();
    expect(getByText('tarde')).toBeTruthy();
    expect(getByText('hasta')).toBeTruthy();
    expect(getByText('luego')).toBeTruthy();
  });

  it('moves words from bank to selected area when clicked', () => {
    const { getByText, getByLabelText } = render(<WordBank {...defaultProps} />);

    const wordButton = getByText('hasta');
    fireEvent.press(wordButton);

    // Word should now be in selected area
    const selectedArea = getByLabelText('Selected words area');
    expect(selectedArea.props.children).toBeTruthy();
  });

  it('removes words from selected area when clicked', () => {
    const { getByText } = render(<WordBank {...defaultProps} />);

    // Select a word first
    const wordButton = getByText('hasta');
    fireEvent.press(wordButton);

    // Now click on the selected word to remove it
    const selectedWord = getByText('hasta');
    fireEvent.press(selectedWord);

    // Word should be back in bank area (available words)
    expect(getByText('hasta')).toBeTruthy();
  });

  it('maintains word order in selected area', () => {
    const { getByText } = render(<WordBank {...defaultProps} />);

    // Select words in specific order
    fireEvent.press(getByText('hasta'));
    fireEvent.press(getByText('luego'));

    // Submit to check order
    const submitButton = getByText('Submit');
    fireEvent.press(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith(['hasta', 'luego']);
  });

  it('enables submit button only when words are selected', () => {
    const { getByText } = render(<WordBank {...defaultProps} />);

    const submitButton = getByText('Submit');

    // Initially disabled
    expect(submitButton.props.accessibilityState.disabled).toBe(true);

    // Select a word
    fireEvent.press(getByText('hasta'));

    // Should be enabled now
    expect(submitButton.props.accessibilityState.disabled).toBe(false);
  });

  it('submits selected words in correct order', () => {
    const { getByText } = render(<WordBank {...defaultProps} />);

    // Select words in specific order
    fireEvent.press(getByText('hasta'));
    fireEvent.press(getByText('luego'));
    fireEvent.press(getByText('tarde'));

    const submitButton = getByText('Submit');
    fireEvent.press(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith(['hasta', 'luego', 'tarde']);
  });

  it('handles word deselection and reselection correctly', () => {
    const { getByText } = render(<WordBank {...defaultProps} />);

    // Select words
    fireEvent.press(getByText('hasta'));
    fireEvent.press(getByText('luego'));

    // Remove middle word (hasta is first, so it's at index 0)
    const selectedWords = getByText('hasta');
    fireEvent.press(selectedWords);

    // Add it back
    fireEvent.press(getByText('hasta'));

    // Submit to check final order
    const submitButton = getByText('Submit');
    fireEvent.press(submitButton);

    // Should be ['luego', 'hasta'] since hasta was removed and re-added
    expect(mockOnSubmit).toHaveBeenCalledWith(['luego', 'hasta']);
  });

  it('does not submit when no words are selected', () => {
    const { getByText } = render(<WordBank {...defaultProps} />);

    const submitButton = getByText('Submit');
    fireEvent.press(submitButton);

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('has proper accessibility labels', () => {
    const { getByLabelText } = render(<WordBank {...defaultProps} />);

    expect(getByLabelText('Question: Build: See you later')).toBeTruthy();
    expect(getByLabelText('Selected words area')).toBeTruthy();
    expect(getByLabelText('Available words')).toBeTruthy();
    expect(getByLabelText('Submit answer')).toBeTruthy();
  });

  it('handles empty bank array', () => {
    const { getByText, queryByText } = render(
      <WordBank {...defaultProps} bank={[]} />
    );

    expect(getByText('Build: See you later')).toBeTruthy();
    expect(queryByText('hasta')).toBeNull();
  });
});