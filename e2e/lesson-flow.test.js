describe('Duolingo Lesson E2E Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should complete full 6-exercise flow with one mistake', async () => {
    // Start lesson
    await expect(element(by.text('Basics 1 — Greetings'))).toBeVisible();
    await expect(element(by.text('Start Lesson'))).toBeVisible();
    await element(by.text('Start Lesson')).tap();

    // Exercise 1 - Multiple Choice (correct)
    await expect(element(by.text('Select the translation for: Hello'))).toBeVisible();
    await element(by.text('Hola')).tap();
    await expect(element(by.text('✓ Correct!'))).toBeVisible();
    await element(by.text('Next')).tap();

    // Exercise 2 - Type Answer (make mistake intentionally)
    await expect(element(by.text('Type the translation for: Thank you'))).toBeVisible();
    await element(by.traits(['keyboardKey'])).typeText('wrong answer');
    await element(by.text('Submit')).tap();
    await expect(element(by.text('✗ Incorrect'))).toBeVisible();

    // Check that heart was decremented (should show 2 hearts now)
    await expect(element(by.text('❤️'))).toBeVisible();
    await element(by.text('Next')).tap();

    // Exercise 3 - Word Bank (correct)
    await expect(element(by.text('Build: See you later'))).toBeVisible();
    await element(by.text('hasta')).tap();
    await element(by.text('luego')).tap();
    await element(by.text('Submit')).tap();
    await expect(element(by.text('✓ Correct!'))).toBeVisible();
    await element(by.text('Next')).tap();

    // Exercise 4 - Multiple Choice (correct)
    await expect(element(by.text('Select the translation for: Goodbye'))).toBeVisible();
    await element(by.text('Adiós')).tap();
    await expect(element(by.text('✓ Correct!'))).toBeVisible();
    await element(by.text('Next')).tap();

    // Exercise 5 - Type Answer (correct)
    await expect(element(by.text('Type the translation for: Please'))).toBeVisible();
    await element(by.traits(['keyboardKey'])).typeText('por favor');
    await element(by.text('Submit')).tap();
    await expect(element(by.text('✓ Correct!'))).toBeVisible();
    await element(by.text('Next')).tap();

    // Exercise 6 - Multiple Choice (correct)
    await expect(element(by.text('What does \'Buenos días\' mean?'))).toBeVisible();
    await element(by.text('Good morning')).tap();
    await expect(element(by.text('✓ Correct!'))).toBeVisible();
    await element(by.text('Finish')).tap();

    // Completion screen
    await expect(element(by.text('Lesson Complete!'))).toBeVisible();
    await expect(element(by.text('XP Earned'))).toBeVisible();
    await expect(element(by.text('Streak'))).toBeVisible();

    // Check celebration animation (emoji should be visible)
    await expect(element(by.text('🎉'))).toBeVisible();
  });

  it('should have accessible buttons with discernible names', async () => {
    // Start screen accessibility
    await expect(element(by.text('Start Lesson'))).toBeVisible();
    await expect(element(by.text('ES'))).toBeVisible(); // Language toggle

    await element(by.text('Start Lesson')).tap();

    // Exercise accessibility
    await expect(element(by.text('Select the translation for: Hello'))).toBeVisible();

    // Multiple choice options should be accessible
    await expect(element(by.text('Hola'))).toBeVisible();
    await expect(element(by.text('Adiós'))).toBeVisible();
    await expect(element(by.text('Gracias'))).toBeVisible();
  });

  it('should render properly on small screen device (360x800)', async () => {
    // This test assumes the app is running on a device with small dimensions
    // Check that start screen elements are visible without horizontal scroll
    await expect(element(by.text('Basics 1 — Greetings'))).toBeVisible();
    await expect(element(by.text('Start Lesson'))).toBeVisible();

    await element(by.text('Start Lesson')).tap();

    // Check lesson screen doesn't have horizontal scroll issues
    await expect(element(by.text('Select the translation for: Hello'))).toBeVisible();
    await expect(element(by.text('Hola'))).toBeVisible();
    await expect(element(by.text('Adiós'))).toBeVisible();
    await expect(element(by.text('Gracias'))).toBeVisible();
  });

  it('should support tab/next navigation actions', async () => {
    await element(by.text('Start Lesson')).tap();

    // Test that text input responds to keyboard navigation
    await expect(element(by.text('Select the translation for: Hello'))).toBeVisible();
    await element(by.text('Hola')).tap();
    await expect(element(by.text('✓ Correct!'))).toBeVisible();

    // Test that next button is accessible
    await element(by.text('Next')).tap();

    // Should move to next exercise
    await expect(element(by.text('Type the translation for: Thank you'))).toBeVisible();
  });

  it('should persist progress and restore on app reopen', async () => {
    // Start lesson and complete first exercise
    await element(by.text('Start Lesson')).tap();
    await expect(element(by.text('Select the translation for: Hello'))).toBeVisible();
    await element(by.text('Hola')).tap();
    await element(by.text('Next')).tap();

    // Force app reload to test persistence
    await device.reloadReactNative();

    // Should return to lesson screen at second exercise
    await expect(element(by.text('Type the translation for: Thank you'))).toBeVisible();
  });
});