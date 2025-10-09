import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import SettingsScreen from '../../screens/settings/SettingsScreen';
import ProfileScreen from '../../screens/shared/ProfileScreen';
import TabNavigator from '../tabs/TabNavigator';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 280,
        },
      }}
    >
      <Drawer.Screen 
        name="MainTabs" 
        component={TabNavigator} 
        options={{
          drawerLabel: 'Home',
        }}
      />
      <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          drawerLabel: 'Settings',
        }}
      />
      <Drawer.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          drawerLabel: 'Profile',
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainNavigator;
