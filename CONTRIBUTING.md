# Contributing to Duolingo Lesson App

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/your-feature-name`

## Development Workflow

### Before Making Changes

1. Run tests to ensure everything works: `npm test`
2. Start the development server: `npm start`
3. Test on both iOS and Android if possible

### Making Changes

1. Follow the existing code style and patterns
2. Add tests for new functionality
3. Update documentation if needed
4. Ensure all tests pass: `npm test`
5. Run linting: `npm run lint`

### Exercise Types to Implement

If you want to add the missing exercise types:

**Match Pairs Exercise:**
- Create `components/MatchPairs.tsx`
- Implement drag-and-drop or tap-to-match functionality
- Add tests in `__tests__/MatchPairs.test.tsx`

**Audio Exercise:**
- Replace `AudioFallback.tsx` with real audio playback
- Use `expo-av` for audio functionality
- Add audio files to assets
- Implement play/pause controls

### Testing Guidelines

- Unit tests: Test component behavior and props
- Integration tests: Test component interactions
- E2E tests: Test complete user flows
- Coverage: Aim for >80% code coverage

### Code Style

- Use TypeScript for type safety
- Follow React Native best practices
- Use functional components with hooks
- Keep components small and focused
- Add accessibility labels for all interactive elements

## Pull Request Process

1. Ensure your code passes all tests
2. Update README.md if needed
3. Add screenshots for UI changes
4. Write a clear pull request description
5. Link any related issues

### PR Title Format

- `feat: add match pairs exercise type`
- `fix: resolve heart counter bug`
- `docs: update setup instructions`
- `test: add word bank component tests`

## Issue Reporting

When reporting issues, please include:

- Device and OS version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Console errors if any

## Questions?

Feel free to open an issue for questions or discussion about:

- New exercise type implementations
- UI/UX improvements
- Performance optimizations
- Testing strategies

---

Thank you for contributing! 🚀