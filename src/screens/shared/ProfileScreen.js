import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const ProfileScreen = () => {
  const { user } = useSelector((state) => state.auth);
  const { isPremium } = useSelector((state) => state.settings);

  const profileSections = [
    {
      title: 'Personal Information',
      items: [
        {
          label: 'Full Name',
          value: user?.name || 'Not set',
          icon: 'person-outline',
          editable: true,
        },
        {
          label: 'Email',
          value: user?.email || 'Not set',
          icon: 'mail-outline',
          editable: true,
        },
        {
          label: 'Phone Number',
          value: user?.phone || 'Not set',
          icon: 'call-outline',
          editable: true,
        },
        {
          label: 'Date of Birth',
          value: user?.dateOfBirth || 'Not set',
          icon: 'calendar-outline',
          editable: true,
        },
      ],
    },
    {
      title: 'Pregnancy Information',
      items: [
        {
          label: 'Due Date',
          value: user?.dueDate || 'Not set',
          icon: 'heart-outline',
          editable: true,
        },
        {
          label: 'Current Week',
          value: user?.currentWeek ? `Week ${user.currentWeek}` : 'Not set',
          icon: 'time-outline',
          editable: false,
        },
        {
          label: 'Pregnancy Type',
          value: user?.pregnancyType || 'Not set',
          icon: 'medical-outline',
          editable: true,
        },
      ],
    },
    {
      title: 'Baby Information',
      items: [
        {
          label: 'Baby Name',
          value: user?.babyName || 'Not set',
          icon: 'baby-outline',
          editable: true,
        },
        {
          label: 'Birth Date',
          value: user?.babyBirthDate || 'Not set',
          icon: 'calendar-outline',
          editable: true,
        },
        {
          label: 'Gender',
          value: user?.babyGender || 'Not set',
          icon: 'people-outline',
          editable: true,
        },
      ],
    },
  ];

  const renderProfileItem = (item, index) => (
    <View key={index} style={styles.profileItem}>
      <View style={styles.profileItemContent}>
        <View style={styles.profileItemHeader}>
          <Ionicons name={item.icon} size={20} color="#4A90E2" />
          <Text style={styles.profileLabel}>{item.label}</Text>
        </View>
        <Text style={styles.profileValue}>{item.value}</Text>
      </View>
      {item.editable && (
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil" size={16} color="#4A90E2" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.subtitle}>Manage your personal information</Text>
        </View>

        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle" size={80} color="#4A90E2" />
          </View>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
          {isPremium && (
            <View style={styles.premiumBadge}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.premiumText}>Premium Member</Text>
            </View>
          )}
        </View>

        {/* Profile Sections */}
        {profileSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => renderProfileItem(item, itemIndex))}
            </View>
          </View>
        ))}

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download-outline" size={20} color="#4A90E2" />
            <Text style={styles.actionButtonText}>Export Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
            <Text style={[styles.actionButtonText, { color: '#FF6B6B' }]}>Delete Account</Text>
          </TouchableOpacity>
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
  profileHeader: {
    backgroundColor: '#fff',
    padding: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatarContainer: {
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  premiumText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
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
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  profileItemContent: {
    flex: 1,
  },
  profileItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  profileLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginLeft: 10,
  },
  profileValue: {
    fontSize: 16,
    color: '#333',
    marginLeft: 30,
  },
  editButton: {
    padding: 8,
  },
  actionsContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4A90E2',
    marginLeft: 10,
  },
});

export default ProfileScreen;
