import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: 'heart',
      title: 'Track Your Pregnancy',
      subtitle: 'Monitor your pregnancy journey week by week with personalized insights and tips.',
      color: '#FF6B9D',
    },
    {
      icon: 'baby',
      title: 'Baby Care Made Easy',
      subtitle: 'Log feeding, sleep, and growth patterns to ensure your baby\'s healthy development.',
      color: '#4ECDC4',
    },
    {
      icon: 'medical',
      title: 'Health & Reminders',
      subtitle: 'Never miss important appointments, medicines, or vaccinations with smart reminders.',
      color: '#45B7D1',
    },
    {
      icon: 'analytics',
      title: 'AI-Powered Insights',
      subtitle: 'Get personalized recommendations and health insights powered by advanced AI technology.',
      color: '#96CEB4',
    },
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigation.navigate('Login');
    }
  };

  const skipToLogin = () => {
    navigation.navigate('Login');
  };

  const renderSlide = (slide, index) => (
    <View key={index} style={styles.slide}>
      <View style={styles.iconContainer}>
        <View style={[styles.iconBackground, { backgroundColor: slide.color }]}>
          <Ionicons name={slide.icon} size={60} color="#fff" />
        </View>
      </View>
      <Text style={styles.slideTitle}>{slide.title}</Text>
      <Text style={styles.slideSubtitle}>{slide.subtitle}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentSlide(slideIndex);
        }}
        style={styles.scrollView}
      >
        {slides.map((slide, index) => renderSlide(slide, index))}
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Dots Indicator */}
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor: index === currentSlide ? '#4A90E2' : '#E0E0E0',
                  width: index === currentSlide ? 24 : 8,
                },
              ]}
            />
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.skipButton} onPress={skipToLogin}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={nextSlide}>
            <Text style={styles.nextButtonText}>
              {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width: width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 40,
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 34,
  },
  slideSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  skipButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  nextButton: {
    backgroundColor: '#4A90E2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});

export default OnboardingScreen;
