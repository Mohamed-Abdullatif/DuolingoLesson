import { create } from 'zustand'

interface LessonState {
    progress: number
    score: number
    hearts: number
    correctAnswers: number
    totalQuestions: number
    setProgress: (progress: number) => void
    incrementScore: () => void
    decrementHearts: () => void
    incrementCorrectAnswers: () => void
    setTotalQuestions: (total: number) => void
    resetLesson: () => void
}

export const useLessonStore = create<LessonState>((set) => ({
    progress: 0,
    score: 0,
    hearts: 3,
    correctAnswers: 0,
    totalQuestions: 0,

    setProgress: (progress) => set({ progress }),

    incrementScore: () => set((state) => ({
        score: state.score + 1
    })),

    decrementHearts: () => set((state) => ({
        hearts: Math.max(0, state.hearts - 1)
    })),

    incrementCorrectAnswers: () => set((state) => ({
        correctAnswers: state.correctAnswers + 1
    })),

    setTotalQuestions: (total) => set({
        totalQuestions: total
    }),

    resetLesson: () => set({
        progress: 0,
        score: 0,
        hearts: 3,
        correctAnswers: 0,
        totalQuestions: 0
    })
}))