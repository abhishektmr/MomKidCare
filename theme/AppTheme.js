import React, { createContext, useContext } from 'react';
import { StyleSheet, View } from 'react-native';

const LightTheme = {
  mode: 'light',
  //f8f7ff
  // Softer dark with warm tint for comfort at night
  primaryColor: '#ffa6c1',
  secondaryColor: "#edf2fb",
  textColor: "#6a4c93",
  textLightColor: "#9a8c98",
  iconColor: "#6a4c93",
  borderColor: '#E0E0E0',
  btnColor: '#E0EBFF',
  accent: '#B399F0',
};

/*
createContext is a React function that lets you share values (like colors, themes, or user data) across your app without manually passing props down through every component.
You can think of it as a global variable for React, but safer and scoped to a certain provider.
*/
const ThemeContext = createContext(LightTheme);

export const useAppTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  return <ThemeContext.Provider value={LightTheme}>{children}</ThemeContext.Provider>;
};

// A wrapper view that paints the global soothing background color across the app
export const AppBackground = ({ children }) => {
  const theme = useAppTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.primaryColor }]}>
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


