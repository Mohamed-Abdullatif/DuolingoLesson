import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createJSONStorage, persist } from 'zustand/middleware'

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

export const useLessonStore = create<LessonState>()(
    persist(
        (set) => ({
            progress: 0,
            score: 0,
            hearts: 3,
            correctAnswers: 0,
            totalQuestions: 0,

            setProgress: (progress: number) => set({ progress }),

            incrementScore: () => set((state) => ({
                score: state.score + 1
            })),

            decrementHearts: () => set((state) => ({
                hearts: Math.max(0, state.hearts - 1)
            })),

            incrementCorrectAnswers: () => set((state) => ({
                correctAnswers: state.correctAnswers + 1
            })),

            setTotalQuestions: (total: number) => set({
                totalQuestions: total
            }),

            resetLesson: () => set({
                progress: 0,
                score: 0,
                hearts: 3,
                correctAnswers: 0,
                totalQuestions: 0
            })
        }),
        {
            name: 'lesson-storage',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
)