import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { setHapticEnabled, setSoundEnabled, setTheme, updateNotificationSettings } from '../../store/slices/settingsSlice';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const { theme, notifications, soundEnabled, hapticEnabled, isPremium } = useSelector((state) => state.settings);

  const settingSections = [
    {
      title: 'Appearance',
      items: [
        {
          type: 'toggle',
          title: 'Dark Mode',
          subtitle: 'Switch between light and dark themes',
          value: theme === 'dark',
          onToggle: (value) => dispatch(setTheme(value ? 'dark' : 'light')),
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          type: 'toggle',
          title: 'Meal Reminders',
          subtitle: 'Get reminded to log your meals',
          value: notifications.meals,
          onToggle: (value) => dispatch(updateNotificationSettings({ meals: value })),
        },
        {
          type: 'toggle',
          title: 'Medicine Alerts',
          subtitle: 'Reminders for medicines and supplements',
          value: notifications.medicines,
          onToggle: (value) => dispatch(updateNotificationSettings({ medicines: value })),
        },
        {
          type: 'toggle',
          title: 'Vaccination Alerts',
          subtitle: 'Important vaccine reminders',
          value: notifications.vaccines,
          onToggle: (value) => dispatch(updateNotificationSettings({ vaccines: value })),
        },
        {
          type: 'toggle',
          title: 'Report Reminders',
          subtitle: 'Reminders to upload medical reports',
          value: notifications.reports,
          onToggle: (value) => dispatch(updateNotificationSettings({ reports: value })),
        },
        {
          type: 'toggle',
          title: 'Sleep Tracking',
          subtitle: 'Reminders to log sleep patterns',
          value: notifications.sleep,
          onToggle: (value) => dispatch(updateNotificationSettings({ sleep: value })),
        },
      ],
    },
    {
      title: 'Sounds & Haptics',
      items: [
        {
          type: 'toggle',
          title: 'Sound Effects',
          subtitle: 'Play sounds for interactions',
          value: soundEnabled,
          onToggle: (value) => dispatch(setSoundEnabled(value)),
        },
        {
          type: 'toggle',
          title: 'Haptic Feedback',
          subtitle: 'Vibrate on touch interactions',
          value: hapticEnabled,
          onToggle: (value) => dispatch(setHapticEnabled(value)),
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          type: 'navigate',
          title: 'Profile Settings',
          subtitle: 'Update your personal information',
          icon: 'person-outline',
          onPress: () => console.log('Navigate to Profile Settings'),
        },
        {
          type: 'navigate',
          title: 'Data & Privacy',
          subtitle: 'Manage your data and privacy settings',
          icon: 'shield-outline',
          onPress: () => console.log('Navigate to Data & Privacy'),
        },
        {
          type: 'navigate',
          title: 'Backup & Sync',
          subtitle: 'Manage cloud backup and synchronization',
          icon: 'cloud-outline',
          onPress: () => console.log('Navigate to Backup & Sync'),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          type: 'navigate',
          title: 'Help Center',
          subtitle: 'Get help and support',
          icon: 'help-circle-outline',
          onPress: () => console.log('Navigate to Help Center'),
        },
        {
          type: 'navigate',
          title: 'Contact Us',
          subtitle: 'Send feedback or report issues',
          icon: 'mail-outline',
          onPress: () => console.log('Navigate to Contact Us'),
        },
        {
          type: 'navigate',
          title: 'About',
          subtitle: 'App version and information',
          icon: 'information-circle-outline',
          onPress: () => console.log('Navigate to About'),
        },
      ],
    },
  ];

  const renderSettingItem = (item, index) => {
    if (item.type === 'toggle') {
      return (
        <View key={index} style={styles.settingItem}>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>{item.title}</Text>
            <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
          </View>
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            trackColor={{ false: '#E0E0E0', true: '#4A90E2' }}
            thumbColor={item.value ? '#fff' : '#f4f3f4'}
          />
        </View>
      );
    }

    if (item.type === 'navigate') {
      return (
        <TouchableOpacity key={index} style={styles.settingItem} onPress={item.onPress}>
          <View style={styles.settingContent}>
            <View style={styles.settingHeader}>
              <Ionicons name={item.icon} size={20} color="#4A90E2" />
              <Text style={styles.settingTitle}>{item.title}</Text>
            </View>
            <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Customize your app experience</Text>
        </View>

        {/* Premium Banner */}
        {!isPremium && (
          <View style={styles.premiumBanner}>
            <View style={styles.premiumContent}>
              <View style={styles.premiumIcon}>
                <Ionicons name="star" size={24} color="#FFD700" />
              </View>
              <View style={styles.premiumText}>
                <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
                <Text style={styles.premiumSubtitle}>
                  Unlock AI features, advanced analytics, and more
                </Text>
              </View>
              <TouchableOpacity style={styles.premiumButton}>
                <Text style={styles.premiumButtonText}>Upgrade</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Settings Sections */}
        {settingSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => renderSettingItem(item, itemIndex))}
            </View>
          </View>
        ))}

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>MomKidCare v1.0.0</Text>
          <Text style={styles.versionSubtext}>Made with ❤️ for mothers and babies</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  premiumBanner: {
    margin: 20,
    marginBottom: 10,
  },
  premiumContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  premiumIcon: {
    marginRight: 15,
  },
  premiumText: {
    flex: 1,
  },
  premiumTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  premiumSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  premiumButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  premiumButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  sectionContent: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingContent: {
    flex: 1,
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginLeft: 10,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
    marginLeft: 30,
  },
  versionContainer: {
    padding: 30,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginBottom: 5,
  },
  versionSubtext: {
    fontSize: 14,
    color: '#999',
  },
});

export default SettingsScreen;
