import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const CustomDrawerContent = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isPremium } = useSelector((state) => state.settings);

  const handleLogout = () => {
    dispatch(logout());
  };

  const menuItems = [
    { name: 'Home', icon: 'home-outline', route: 'MainTabs' },
    { name: 'Settings', icon: 'settings-outline', route: 'Settings' },
    { name: 'Profile', icon: 'person-outline', route: 'Profile' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle" size={60} color="#4A90E2" />
          </View>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
          {isPremium && (
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumText}>Premium</Text>
            </View>
          )}
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.name}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.route)}
            >
              <Ionicons name={item.icon} size={24} color="#333" />
              <Text style={styles.menuText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#FF6B6B" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  premiumBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  premiumText: {
    color: '#333',
    fontSize: 12,
    fontWeight: '600',
  },
  menuContainer: {
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  logoutText: {
    fontSize: 16,
    color: '#FF6B6B',
    marginLeft: 15,
  },
});

export default CustomDrawerContent;
