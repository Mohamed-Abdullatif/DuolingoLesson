# 📱 Building Signed APK - Complete Guide

This guide provides step-by-step instructions for generating a signed APK for the Duolingo Lesson App.

## 🚀 Quick Start

### Option 1: Automated Script (Recommended)
```bash
# Run the automated build script
./scripts/build-apk.sh
```

### Option 2: Manual EAS Build
```bash
# 1. Log in to Expo
eas login

# 2. Build signed APK
eas build --platform android --profile production

# 3. Download from the link provided
```

## 📋 Detailed Instructions

### Prerequisites

1. **Expo Account**: Create account at [expo.dev](https://expo.dev)
2. **EAS CLI**: Should already be installed
   ```bash
   npm install -g @expo/cli
   ```

### Method 1: EAS Build (Production Signed APK)

**Step 1: Login to Expo**
```bash
eas login
```
- Enter your Expo account credentials
- This creates the signing certificates automatically

**Step 2: Start Production Build**
```bash
eas build --platform android --profile production
```

**What happens:**
- ✅ Expo automatically generates signing certificates
- ✅ Builds the APK on Expo's servers
- ✅ APK is signed and ready for distribution
- ✅ You'll get an email with download link

**Step 3: Download APK**
- Check your email for build completion notification
- Or visit [expo.dev](https://expo.dev) → Your account → Builds
- Download the APK file (typically ~15-30MB)

**Build Configuration Used:**
```json
{
  "production": {
    "android": {
      "buildType": "apk"
    }
  }
}
```

### Method 2: Local Development Build

⚠️ **Note**: Creates unsigned APK for testing only

**Prerequisites:**
- Android Studio with SDK installed
- Android emulator or connected device

**Steps:**
```bash
# Build local debug APK
npx expo run:android --variant debug

# APK location:
# android/app/build/outputs/apk/debug/app-debug.apk
```

## 🔧 Build Configurations

### Current EAS Build Profiles

```json
{
  "preview": {
    "distribution": "internal",
    "android": { "buildType": "apk" }
  },
  "production": {
    "android": { "buildType": "apk" }
  },
  "production-aab": {
    "android": { "buildType": "app-bundle" }
  }
}
```

### App Configuration

**Package Details:**
- Package Name: `com.duolingolesson.app`
- Version: `1.0.0`
- Version Code: `1`
- Target SDK: Android 13 (API 33)
- Min SDK: Android 6.0 (API 23)

**Permissions:**
- `android.permission.VIBRATE` (for haptic feedback)

## 📱 APK Details

**Expected Output:**
- **File Size**: ~15-30MB (depending on build type)
- **Architecture**: Universal (ARM64 + x86_64)
- **Signed**: Yes (production builds via EAS)
- **Installable**: Yes on Android 6.0+ devices

## 🔍 Verification Steps

After building the APK:

1. **Check File Size**
   ```bash
   ls -lh *.apk
   ```

2. **Verify APK Contents** (optional)
   ```bash
   aapt dump badging app-production-*.apk
   ```

3. **Test Installation**
   ```bash
   adb install app-production-*.apk
   ```

## 📤 Distribution Options

### For Testing
- Share APK file directly
- Install via `adb install`
- Use file sharing services (Google Drive, Dropbox)

### For Production
- Upload to Google Play Console
- Use internal testing with Play Console
- Distribute via Firebase App Distribution

## 🚨 Troubleshooting

### Common Issues

**"Not logged in" Error**
```bash
eas login
# Enter your credentials
```

**"Android SDK not found" (Local builds)**
```bash
# Install Android Studio
# Set ANDROID_HOME environment variable
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

**Build Fails**
1. Check internet connection
2. Ensure all dependencies are installed: `npm install`
3. Try clearing cache: `npx expo install --fix`
4. Check Expo status: [status.expo.dev](https://status.expo.dev)

### Build Time Expectations

- **EAS Build**: 5-15 minutes (server-side build)
- **Local Build**: 3-10 minutes (depending on machine)

## 📋 Checklist

Before building APK:

- [ ] All tests passing (`npm test`)
- [ ] App runs properly (`npm start`)
- [ ] Updated version in app.json
- [ ] Logged into Expo account
- [ ] Internet connection stable

## 🎯 Final Result

After successful build:

✅ **Production-ready APK**
✅ **Digitally signed**
✅ **Installable on Android devices**
✅ **Ready for distribution**

---

**Need Help?** Check the [README.md](./README.md) or open an issue in the repository.