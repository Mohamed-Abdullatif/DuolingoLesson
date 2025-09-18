# Duolingo Lesson App

A React Native mobile app that replicates a Duolingo-style language learning lesson experience. Built with Expo, TypeScript, and comprehensive testing.

![App Demo](https://img.shields.io/badge/Platform-iOS%20%7C%20Android-blue) ![Tests](https://img.shields.io/badge/Tests-Unit%20%7C%20E2E-green) ![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)

## ✨ Features

### Core Functionality
- **6-Exercise Lesson Flow**: Multiple choice, type answer, and word bank exercises
- **Progress Tracking**: Real-time progress bar with hearts system (start with 3 hearts)
- **Immediate Feedback**: Correct/incorrect responses with explanations
- **State Persistence**: Auto-save progress using AsyncStorage
- **Completion Celebration**: XP rewards, streak tracking, and animations
- **Internationalization**: English and Spanish language support

### UX Polish
- **Haptic Feedback**: Success/error vibrations on iOS/Android
- **Smooth Animations**: Celebration effects and transitions
- **Responsive Design**: Optimized for mobile devices (≥360px width)
- **Accessibility**: Full screen reader support with proper labels
- **Audio Fallback**: Visible text fallback for listening exercises

## 🚀 Quick Start

### Prerequisites

```bash
# Install Node.js (v18+)
node --version

# Install Expo CLI
npm install -g @expo/cli

# Install dependencies
npm install
```

### Development Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd DuolingoLesson

# Install dependencies
npm install

# Start development server
npm start

# Run on specific platforms
npm run ios      # iOS Simulator
npm run android  # Android Emulator
npm run web      # Web browser
```

### Device Setup

**iOS Simulator:**
```bash
# Requires Xcode on macOS
xcode-select --install
npm run ios
```

**Android Emulator:**
```bash
# Requires Android Studio
# Create AVD: Pixel 3a API 30+
npm run android
```

**Physical Device:**
1. Install Expo Go app from App Store/Play Store
2. Scan QR code from `npm start`

## 🧪 Running Tests

### Unit Tests
```bash
# Run all unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

**Test Coverage:**
- ✅ StartScreen: Navigation and rendering
- ✅ MultipleChoice: Selection and heart mechanics
- ✅ TextInput: Input normalization and validation
- ✅ WordBank: Word ordering and sequence validation
- ✅ AsyncStorage: Progress persistence and restoration
- ✅ Hearts: Display and streak functionality

### End-to-End Tests
```bash
# Install Detox (first time)
npm install -g detox-cli

# Build and run E2E tests
npm run e2e:build
npm run e2e

# iOS specific
npm run e2e:ios
```

**E2E Test Scenarios:**
- Complete 6-exercise flow with mistake handling
- Heart decrementation on wrong answers
- XP and streak display on completion
- Accessibility button checks
- Responsive design validation
- Progress persistence across app reloads

## 📱 Building APK

### Development Build
```bash
# Install EAS CLI
npm install -g @expo/cli

# Configure EAS
eas build:configure

# Build APK for Android
eas build --platform android --profile development

# Build for iOS (requires Apple Developer account)
eas build --platform ios --profile development
```

### Production Build
```bash
# Build production APK
eas build --platform android --profile production

# The APK will be available in your Expo dashboard
# Download link will be provided after build completion
```

### Local APK Generation
```bash
# Generate local development build
expo run:android --variant debug

# APK location:
# android/app/build/outputs/apk/debug/app-debug.apk
```

**Build Configuration:**
- Target SDK: Android 13 (API level 33)
- Minimum SDK: Android 6.0 (API level 23)
- Architecture: ARM64 + x86_64 universal APK

## 🏗️ Architecture

### Project Structure
```
DuolingoLesson/
├── app/                    # Expo Router screens
│   ├── index.tsx          # Start screen
│   ├── lesson.tsx         # Main lesson flow
│   ├── completion.tsx     # Results screen
│   └── _layout.tsx        # Navigation layout
├── components/            # Reusable components
│   ├── MultipleChoice.tsx
│   ├── TextInput.tsx
│   ├── WordBank.tsx
│   ├── AudioFallback.tsx
│   ├── ProgressBar.tsx
│   └── Hearts.tsx
├── context/               # React context
│   └── LocaleContext.tsx  # Internationalization
├── locales/               # Translation files
│   ├── en.ts
│   └── es.ts
├── assets/                # Static assets
│   └── lesson.json        # Lesson data
├── __tests__/             # Unit tests
└── e2e/                   # End-to-end tests
```

### Tech Stack
- **Framework**: React Native 0.81.4 + Expo SDK 54
- **Language**: TypeScript 5.9.2
- **Navigation**: Expo Router (file-based routing)
- **State Management**: React useState + Zustand (minimal store)
- **Storage**: AsyncStorage for persistence
- **Testing**: Jest + React Native Testing Library + Detox
- **Internationalization**: Custom context with locale switching

### Component Design
- **Minimum Required Components**: 7/7 implemented
- **Exercise Types**: 3/5 types (MCQ, Type Answer, Word Bank)
- **Missing Types**: Match Pairs, Audio (fallback implemented)
- **State Flow**: Local component state → AsyncStorage persistence
- **Error Handling**: Graceful fallbacks for storage and missing data

## ⚖️ Trade-offs & Decisions

### 4-6 Hour Timebox Constraints

**✅ Prioritized (High Impact):**
- Complete core lesson flow with 3 exercise types
- Full state persistence and restoration
- Comprehensive unit test coverage (6 test files)
- Internationalization support (EN/ES)
- Haptic feedback and animations
- Accessibility compliance

**⚠️ Simplified (Time Constraints):**
- E2E tests: Basic Detox setup (may need device-specific config)
- Exercise types: 3/5 implemented (sufficient for demo)
- Audio: Fallback component instead of real audio playback
- Responsive design: Basic mobile optimization (not desktop)
- Error handling: Basic try/catch, no advanced retry mechanisms

**❌ Deferred (Out of Scope):**
- Backend integration (static JSON as specified)
- Advanced animations and micro-interactions
- Offline-first sync strategies
- Performance optimization for large lesson sets
- Advanced accessibility features (voice navigation)

### Technical Decisions

**State Management:**
- **Choice**: React useState + minimal Zustand store
- **Rationale**: Simple app scope doesn't justify Redux complexity
- **Trade-off**: Less scalable but faster development

**Testing Strategy:**
- **Choice**: Jest + RNTL for units, Detox for E2E
- **Rationale**: Industry standard with good Expo support
- **Trade-off**: E2E setup complexity vs comprehensive coverage

**Navigation:**
- **Choice**: Expo Router over React Navigation
- **Rationale**: Simpler file-based routing for linear flow
- **Trade-off**: Less navigation flexibility vs development speed

**Internationalization:**
- **Choice**: Custom context vs libraries like i18next
- **Rationale**: Simple string replacement sufficient for demo
- **Trade-off**: Limited pluralization/formatting vs faster implementation

## 🔧 Development Notes

### Key Commands
```bash
npm start           # Start development server
npm test            # Run unit tests
npm run e2e         # Run E2E tests
npm run lint        # Lint code
npm run ios         # iOS development
npm run android     # Android development
```

### Environment Setup
- **Node.js**: v18+ required
- **Expo CLI**: Latest version
- **iOS**: Xcode 14+ (macOS only)
- **Android**: Android Studio with API 30+ AVD

### Known Issues
- E2E tests may require device-specific configuration
- Web platform has limited mobile gesture support
- AsyncStorage mocking in tests needs manual setup

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-exercise-type`)
3. Commit changes (`git commit -m 'Add match pairs exercise'`)
4. Push to branch (`git push origin feature/new-exercise-type`)
5. Open a Pull Request

---

**Built with ❤️ using React Native + Expo**
