import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ForgotPasswordScreen from '../../screens/auth/ForgotPasswordScreen';
import LoginScreen from '../../screens/auth/LoginScreen';
import OnboardingScreen from '../../screens/auth/OnboardingScreen';
import RegisterScreen from '../../screens/auth/RegisterScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
