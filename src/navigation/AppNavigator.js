import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AppBackground, ThemeProvider } from '../../theme/AppTheme';
import { useAppSelector } from '../redux/hooks';
import WaterIntakeScreen from '../screens/cards/WaterIntakeScreen';
import MainNavigator from './drawer/MainNavigator';
import AuthNavigator from './stack/AuthNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
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
          <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isAuthenticated ? (
              <Stack.Screen name="Main" component={MainNavigator} />
            ) : (
              <Stack.Screen name="Auth" component={AuthNavigator} />
            )}

            {/* Screens outside Drawer/Tabs */}
            <Stack.Screen name="WaterIntake" component={WaterIntakeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppBackground>
    </ThemeProvider>
  );
};

export default AppNavigator;
