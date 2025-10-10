import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useAppTheme } from '../../../theme/AppTheme';

const PregnancyScreen = () => {
  const { currentWeek, dueDate } = useSelector((state) => state.pregnancy);

  const pregnancyFeatures = [
    {
      title: 'Timeline Tracker',
      subtitle: `Week ${currentWeek} of 40`,
      icon: 'calendar',
      color: '#FF6B9D',
      screen: 'PregnancyTimeline',
    },
    {
      title: 'Lifestyle Logging',
      subtitle: 'Meals, Water, Sleep, Exercise',
      icon: 'fitness',
      color: '#4ECDC4',
      screen: 'LifestyleLogging',
    },
    {
      title: 'Medicines & Supplements',
      subtitle: 'Iron, Calcium, Folic Acid',
      icon: 'medical',
      color: '#45B7D1',
      screen: 'Medicines',
    },
    {
      title: 'Weight Tracking',
      subtitle: 'Monitor your progress',
      icon: 'scale',
      color: '#96CEB4',
      screen: 'WeightTracking',
    },
    {
      title: 'Hospital Bag',
      subtitle: 'Checklist for delivery',
      icon: 'bag',
      color: '#FECA57',
      screen: 'HospitalBag',
    },
    {
      title: 'Reports',
      subtitle: 'Upload test results',
      icon: 'document-text',
      color: '#FF9FF3',
      screen: 'Reports',
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

  const getPregnancyPhase = (week) => {
    if (week <= 12) return 'First Trimester';
    if (week <= 27) return 'Second Trimester';
    return 'Third Trimester';
  };

  const getBabySize = (week) => {
    const sizes = [
      'Poppy seed', 'Sesame seed', 'Pumpkin seed', 'Pea', 'Blueberry', 'Raspberry',
      'Cherry', 'Strawberry', 'Grape', 'Kumquat', 'Fig', 'Lime', 'Peach', 'Lemon',
      'Apple', 'Avocado', 'Banana', 'Sweet potato', 'Mango', 'Papaya', 'Carrot',
      'Pineapple', 'Corn', 'Cantaloupe', 'Cauliflower', 'Eggplant', 'Butternut squash',
      'Cabbage', 'Coconut', 'Cucumber', 'Pineapple', 'Honeydew', 'Cantaloupe',
      'Romaine lettuce', 'Melon', 'Watermelon', 'Leek', 'Swiss chard', 'Pumpkin',
      'Watermelon'
    ];
    return sizes[week - 1] || 'Watermelon';
  };

  const theme = useAppTheme();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundPrimary }]}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Pregnancy Tracker</Text>
          <Text style={styles.subtitle}>
            {getPregnancyPhase(currentWeek)} • Week {currentWeek}
          </Text>
        </View>

        {/* Pregnancy Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Your Progress</Text>
              <Text style={styles.progressWeek}>Week {currentWeek}</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(currentWeek / 40) * 100}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {Math.round((currentWeek / 40) * 100)}% Complete
            </Text>
          </View>

          <View style={styles.babyInfoCard}>
            <Text style={styles.babyInfoTitle}>Baby Size</Text>
            <Text style={styles.babySize}>{getBabySize(currentWeek)}</Text>
            <Text style={styles.babyInfoSubtext}>About the size of a {getBabySize(currentWeek).toLowerCase()}</Text>
          </View>
        </View>

        {/* Features Grid */}
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Track Your Journey</Text>
          {pregnancyFeatures.map((feature, index) => renderFeatureCard(feature, index))}
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
  progressContainer: {
    padding: 20,
  },
  progressCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  progressWeek: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  babyInfoCard: {
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
  babyInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  babySize: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B9D',
    marginBottom: 5,
  },
  babyInfoSubtext: {
    fontSize: 14,
    color: '#666',
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
  }
});

export default PregnancyScreen;
