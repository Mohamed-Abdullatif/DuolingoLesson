#!/bin/bash

# Build signed APK script for Duolingo Lesson App
# This script provides multiple options for building the APK

echo "🚀 Building Duolingo Lesson App APK..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: This script must be run from the project root directory"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "Choose build method:"
echo "1. EAS Build (Recommended - creates signed APK)"
echo "2. Local Development Build (Unsigned APK for testing)"
echo ""
read -p "Enter your choice (1 or 2): " choice

case $choice in
    1)
        echo "🔨 Building with EAS (requires Expo account)..."
        echo ""
        echo "Steps to complete:"
        echo "1. Log in to your Expo account: eas login"
        echo "2. Build production APK: eas build --platform android --profile production"
        echo "3. Download APK from the provided link after build completes"
        echo ""
        echo "Running EAS build now..."

        # Check if logged in
        if ! eas whoami > /dev/null 2>&1; then
            echo "📱 Please log in to your Expo account:"
            eas login
        fi

        # Start the build
        eas build --platform android --profile production

        echo ""
        echo "✅ Build initiated! Check your Expo dashboard for progress."
        echo "📱 You'll receive an email with the download link when ready."
        ;;

    2)
        echo "🔨 Building local development APK..."
        echo ""

        # Check if Android SDK is available
        if ! command -v adb &> /dev/null; then
            echo "⚠️  Android SDK not found. Please ensure Android Studio is installed."
            echo "   Or use EAS build (option 1) instead."
            exit 1
        fi

        echo "📱 Starting local build..."
        npx expo run:android --variant debug

        APK_PATH="android/app/build/outputs/apk/debug/app-debug.apk"

        if [ -f "$APK_PATH" ]; then
            echo ""
            echo "✅ APK built successfully!"
            echo "📍 Location: $APK_PATH"
            echo "📦 File size: $(ls -lh $APK_PATH | awk '{print $5}')"
            echo ""
            echo "⚠️  Note: This is an unsigned debug APK for testing only."
            echo "   For production, use EAS build (option 1)."
        else
            echo "❌ Build failed. Check the error messages above."
        fi
        ;;

    *)
        echo "❌ Invalid choice. Please run the script again and choose 1 or 2."
        exit 1
        ;;
esac

echo ""
echo "🎉 Build process completed!"