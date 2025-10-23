import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useAppTheme } from '../../../theme/AppTheme';

const BabyScreen = () => {
  const { babyProfile, feeding, sleep, potty, growth, vaccinations } = useSelector((state) => state.baby);

  const babyFeatures = [
    {
      title: 'Daily Routine',
      subtitle: 'Feeding, Sleep, Potty, Playtime',
      icon: 'calendar',
      color: '#4ECDC4',
      screen: 'DailyRoutine',
    },
    {
      title: 'Growth Monitoring',
      subtitle: 'Weight, Height, Head Circumference',
      icon: 'trending-up',
      color: '#45B7D1',
      screen: 'GrowthMonitoring',
    },
    {
      title: 'Vaccination Alerts',
      subtitle: 'Never miss important vaccines',
      icon: 'medical',
      color: '#96CEB4',
      screen: 'Vaccinations',
    },
    {
      title: 'Feeding Tracker',
      subtitle: 'Breastfeeding & Bottle feeding',
      icon: 'restaurant',
      color: '#FECA57',
      screen: 'FeedingTracker',
    },
    {
      title: 'Sleep Tracker',
      subtitle: 'Monitor sleep patterns',
      icon: 'bed',
      color: '#FF9FF3',
      screen: 'SleepTracker',
    },
    {
      title: 'Development Milestones',
      subtitle: 'Track baby\'s progress',
      icon: 'star',
      color: '#FF6B9D',
      screen: 'Milestones',
    },
  ];

  const renderFeatureCard = (feature, index) => (
    <TouchableOpacity
      key={index}
      style={[styles.featureCard, { borderLeftColor: feature.color }]}
      onPress={() => {
        // Navigate to specific feature screen
        console.log(`Navigate to ${feature.screen}`);
      }}
    >
      <View style={styles.cardContent}>
        <View style={[styles.iconContainer, { backgroundColor: feature.color }]}>
          <Ionicons name={feature.icon} size={24} color="#fff" />
        </View>
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>{feature.title}</Text>
          <Text style={styles.cardSubtitle}>{feature.subtitle}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </View>
    </TouchableOpacity>
  );

  const getBabyAge = () => {
    if (!babyProfile || !babyProfile.birthDate) return 'Not set';
    const birthDate = new Date(babyProfile.birthDate);
    const today = new Date();
    const diffTime = Math.abs(today - birthDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) return `${diffDays} days old`;
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      const days = diffDays % 30;
      return `${months} months ${days} days old`;
    }
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    return `${years} years ${months} months old`;
  };

  const getNextVaccination = () => {
    const upcoming = vaccinations.filter(v => v.status === 'upcoming');
    return upcoming.length > 0 ? upcoming[0] : null;
  };

  const theme = useAppTheme();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.headerBackground }]}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Baby Care</Text>
          <Text style={styles.subtitle}>
            {babyProfile ? `Track ${babyProfile.name || 'your baby'}'s care` : 'Set up baby profile to get started'}
          </Text>
        </View>

        {/* Baby Profile Summary */}
        {babyProfile ? (
          <View style={styles.profileContainer}>
            <View style={styles.profileCard}>
              <View style={styles.profileHeader}>
                <View style={styles.avatarContainer}>
                  <Ionicons name="baby" size={40} color="#4ECDC4" />
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.babyName}>{babyProfile.name}</Text>
                  <Text style={styles.babyAge}>{getBabyAge()}</Text>
                  <Text style={styles.babyGender}>
                    {babyProfile.gender === 'male' ? '👶 Boy' : babyProfile.gender === 'female' ? '👧 Girl' : '👶 Baby'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.setupContainer}>
            <View style={styles.setupCard}>
              <Ionicons name="person-add" size={50} color="#4ECDC4" />
              <Text style={styles.setupTitle}>Set Up Baby Profile</Text>
              <Text style={styles.setupSubtitle}>
                Add your baby's information to start tracking their care
              </Text>
              <TouchableOpacity style={styles.setupButton}>
                <Text style={styles.setupButtonText}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Quick Stats */}
        {babyProfile && (
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{feeding.length}</Text>
              <Text style={styles.statLabel}>Feedings Today</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {sleep.length > 0 ? `${Math.round(sleep.reduce((acc, s) => acc + s.duration, 0) / sleep.length)}h` : '--'}
              </Text>
              <Text style={styles.statLabel}>Avg Sleep</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{potty.length}</Text>
              <Text style={styles.statLabel}>Diaper Changes</Text>
            </View>
          </View>
        )}

        {/* Features Grid */}
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Baby Care Features</Text>
          {babyFeatures.map((feature, index) => renderFeatureCard(feature, index))}
        </View>

        {/* Vaccination Alert */}
        {babyProfile && getNextVaccination() && (
          <View style={styles.vaccinationAlert}>
            <View style={styles.alertCard}>
              <View style={styles.alertIcon}>
                <Ionicons name="medical" size={24} color="#FF6B6B" />
              </View>
              <View style={styles.alertContent}>
                <Text style={styles.alertTitle}>Upcoming Vaccination</Text>
                <Text style={styles.alertSubtitle}>
                  {getNextVaccination().name} - {getNextVaccination().dueDate}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionButton}>
              <Ionicons name="restaurant" size={24} color="#4A90E2" />
              <Text style={styles.quickActionText}>Log Feeding</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Ionicons name="bed" size={24} color="#4A90E2" />
              <Text style={styles.quickActionText}>Sleep Log</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Ionicons name="water" size={24} color="#4A90E2" />
              <Text style={styles.quickActionText}>Diaper Change</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // background set from theme at usage site
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
  profileContainer: {
    padding: 20,
  },
  profileCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8F8F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  babyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  babyAge: {
    fontSize: 16,
    color: '#4ECDC4',
    marginBottom: 3,
  },
  babyGender: {
    fontSize: 14,
    color: '#666',
  },
  setupContainer: {
    padding: 20,
  },
  setupCard: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  setupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  setupSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  setupButton: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  setupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4ECDC4',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  featuresContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  featureCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    flex: 1,
    marginLeft: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  vaccinationAlert: {
    padding: 20,
  },
  alertCard: {
    backgroundColor: '#FFF5F5',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
  },
  alertIcon: {
    marginRight: 15,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
    marginBottom: 2,
  },
  alertSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  quickActionsContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quickActionText: {
    fontSize: 12,
    color: '#4A90E2',
    marginTop: 5,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default BabyScreen;
