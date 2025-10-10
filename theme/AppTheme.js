import React, { createContext, useContext, useMemo } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';

const LightTheme = {
  mode: 'light',
  // Soft gradient-inspired solids for background layers
  backgroundPrimary: '#f8ad9d', // pastel lavender
  backgroundSecondary: 'red', // blush pink tint
  card: '#FFFFFF',
  border: '#E8E6EE',
  text: '#2C2C2E',
  mutedText: '#6B7280',
  accent: '#9D7BD8', // gentle lavender
};

const DarkTheme = {
  mode: 'dark',
  // Softer dark with warm tint for comfort at night
  backgroundPrimary: '#ffe5ec',
  backgroundSecondary: '#ffc8dd',
  card: '#0077b6',
  border: '#2E2E37',
  text: '#F3F4F6',
  mutedText: '#A1A1AA',
  accent: '#B399F0',
};

/*
createContext is a React function that lets you share values (like colors, themes, or user data) across your app without manually passing props down through every component.
You can think of it as a global variable for React, but safer and scoped to a certain provider.
*/
const ThemeContext = createContext(LightTheme);

export const useAppTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // const colorScheme = Appearance.getColorScheme();
  const colorScheme = useColorScheme();
  const theme = useMemo(() => (colorScheme === 'dark' ? DarkTheme : LightTheme), [colorScheme]);
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

// A wrapper view that paints the global soothing background color across the app
export const AppBackground = ({ children }) => {
  const theme = useAppTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundPrimary }]}>
      {/* Optional subtle overlay to emulate a soft gradient feel */}
      <View style={[styles.overlay, { backgroundColor: theme.backgroundSecondary }]} />
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Large, faint overlay to add a gentle warmth without heavy gradients
  overlay: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 200,
    opacity: 0.07,
  },
  content: {
    flex: 1,
  },
});

export default ThemeProvider;


