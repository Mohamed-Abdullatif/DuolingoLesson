import React from 'react';
import { render } from '@testing-library/react-native';
import { Hearts } from '../components/Hearts';
import { useLessonStore } from '../store/lessonStore';

jest.mock('../store/lessonStore', () => ({
    useLessonStore: jest.fn()
}));

describe('Hearts Component', () => {
    beforeEach(() => {
        (useLessonStore as unknown as jest.Mock).mockImplementation((selector) => selector({
            hearts: 3
        }));
    });

    it('renders correct number of hearts', () => {
        const { getAllByText } = render(<Hearts streak={0} />);
        const hearts = getAllByText('❤️');
        expect(hearts).toHaveLength(3); // Default is 3 hearts
    });

    it('shows streak when greater than 0', () => {
        const { getByText } = render(<Hearts streak={5} />);
        const streakElement = getByText('🔥 5');
        expect(streakElement).toBeTruthy();
    });
});