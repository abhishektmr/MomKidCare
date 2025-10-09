import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useSelector } from 'react-redux';
import { AppBackground, ThemeProvider } from '../../theme/AppTheme';
import MainNavigator from './drawer/MainNavigator';
import AuthNavigator from './stack/AuthNavigator';

const AppNavigator = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
  };

  return (
    <ThemeProvider>
      <AppBackground>
        <NavigationContainer theme={navTheme}>
          {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </AppBackground>
    </ThemeProvider>
  );
};

export default AppNavigator;
