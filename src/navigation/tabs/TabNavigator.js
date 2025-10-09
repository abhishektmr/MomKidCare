import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import CustomTabBar from '../../components/CustomTabBar';
import BabyScreen from '../../screens/baby/BabyScreen';
import PregnancyScreen from '../../screens/pregnancy/PregnancyScreen';
import DashboardScreen from '../../screens/shared/DashboardScreen';
import ReportsScreen from '../../screens/shared/ReportsScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Pregnancy') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Baby') {
            iconName = focused ? 'baby' : 'baby-outline';
          } else if (route.name === 'Reports') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4A90E2',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: { display: 'none' },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="Pregnancy" 
        component={PregnancyScreen}
        options={{
          tabBarLabel: 'Pregnancy',
        }}
      />
      <Tab.Screen 
        name="Baby" 
        component={BabyScreen}
        options={{
          tabBarLabel: 'Baby',
        }}
      />
      <Tab.Screen 
        name="Reports" 
        component={ReportsScreen}
        options={{
          tabBarLabel: 'Reports',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
