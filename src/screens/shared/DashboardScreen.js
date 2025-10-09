import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useAppTheme } from '../../../theme/AppTheme';
import CustomHeader from '../../components/CustomHeader';

const DashboardScreen = ({ navigation }) => {
  const { currentWeek, dueDate } = useSelector((state) => state.pregnancy);
  const { babyProfile } = useSelector((state) => state.baby);

  const dashboardCards = [
    {
      title: 'Pregnancy Progress',
      subtitle: `Week ${currentWeek}`,
      icon: 'heart',
      color: '#FF6B9D',
      onPress: () => navigation.navigate('Pregnancy'),
    },
    {
      title: 'Baby Care',
      subtitle: babyProfile ? 'Track Activities' : 'Set Up Profile',
      icon: 'baby',
      color: '#4ECDC4',
      onPress: () => navigation.navigate('Baby'),
    },
    {
      title: 'Reports',
      subtitle: 'View & Upload',
      icon: 'document-text',
      color: '#45B7D1',
      onPress: () => navigation.navigate('Reports'),
    },
    {
      title: 'Reminders',
      subtitle: 'Medicines & Vaccines',
      icon: 'alarm',
      color: '#96CEB4',
      onPress: () => navigation.navigate('Reminders'),
    },
  ];

  const renderCard = (card, index) => (
    <TouchableOpacity
      key={index}
      style={[styles.card, { borderLeftColor: card.color }]}
      onPress={card.onPress}
    >
      <View style={styles.cardContent}>
        <View style={[styles.iconContainer, { backgroundColor: card.color }]}>
          <Ionicons name={card.icon} size={24} color="#fff" />
        </View>
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>{card.title}</Text>
          <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </View>
    </TouchableOpacity>
  );

  const theme = useAppTheme();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundPrimary }]}>
      <CustomHeader/>

      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome back!</Text>
          <Text style={styles.subtitle}>Track your pregnancy and baby care journey</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{currentWeek}</Text>
            <Text style={styles.statLabel}>Weeks</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {dueDate ? Math.ceil((new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24)) : '--'}
            </Text>
            <Text style={styles.statLabel}>Days to Due</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {babyProfile ? '1' : '0'}
            </Text>
            <Text style={styles.statLabel}>Babies</Text>
          </View>
        </View>

        {/* Dashboard Cards */}
        <View style={styles.cardsContainer}>
          {dashboardCards.map((card, index) => renderCard(card, index))}
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <Text style={styles.activityText}>No recent activity</Text>
            <Text style={styles.activitySubtext}>Start logging your daily activities</Text>
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
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  cardsContainer: {
    padding: 20,
  },
  card: {
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
  activitySection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  activityCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  activityText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  activitySubtext: {
    fontSize: 14,
    color: '#999',
  },
});

export default DashboardScreen;
