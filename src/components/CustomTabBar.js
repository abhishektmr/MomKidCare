import { useAppTheme } from '@/theme/AppTheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const ICONS = {
  Dashboard: { active: 'home', inactive: 'home-outline' },
  Pregnancy: { active: 'heart', inactive: 'heart-outline' },
  Baby: { active: 'baby', inactive: 'baby-outline' },
  Reports: { active: 'document-text', inactive: 'document-text-outline' },
};

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  const theme = useAppTheme();
  // Ensure we don't overlap hardware nav buttons and respect safe areas
  const bottomInset = Math.max(insets.bottom, Platform.OS === 'android' ? 8 : 0);

  return (
    <SafeAreaView pointerEvents="box-none" style={styles.safeArea} edges={['bottom']}>
      <View style={[styles.container, {borderColor: theme.backgroundSecondary}]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const iconSet = ICONS[route.name] || { active: 'ellipse', inactive: 'ellipse-outline' };
          const iconName = isFocused ? iconSet.active : iconSet.inactive;
          const color = isFocused ? '#4A90E2' : 'gray';

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}
              activeOpacity={0.8}
            >
              <Ionicons name={iconName} size={24} color={color} style={styles.icon} />
              <Text style={[styles.label, isFocused ? styles.labelActive : styles.labelInactive]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    // pointerEvents inherited, keep container tappable
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 40,
    paddingHorizontal: 1,
    borderRadius: 28,
    backgroundColor: '#fff',
    borderWidth: 4,
    // Shadow iOS (make more prominent)
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.9,
        shadowRadius: 14,
      },
      android: {},
      default: {},
    }),
    // Elevation Android
    elevation: 6,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  icon: {
    textAlign: 'center',
  },
  label: {
    marginTop: 2,
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '500',
  },
  labelActive: {
    color: '#4A90E2',
  },
  labelInactive: {
    color: 'gray',
  },
});

export default CustomTabBar;


