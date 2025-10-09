# MomKidCare - Project Structure

## Overview
MomKidCare is a React Native pregnancy and baby tracking app built with Expo, Redux Toolkit, and React Navigation.

## Project Structure

```
src/
├── App.js                          # Main app entry point
├── navigation/                     # Navigation configuration
│   ├── AppNavigator.js            # Root navigator
│   ├── stack/
│   │   └── AuthNavigator.js       # Authentication flow
│   ├── tabs/
│   │   └── TabNavigator.js        # Bottom tab navigation
│   └── drawer/
│       ├── MainNavigator.js       # Drawer navigation
│       └── CustomDrawerContent.js # Custom drawer component
├── screens/                        # Screen components
│   ├── auth/                      # Authentication screens
│   │   ├── OnboardingScreen.js
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   └── ForgotPasswordScreen.js
│   ├── pregnancy/                 # Pregnancy tracking screens
│   │   └── PregnancyScreen.js
│   ├── baby/                      # Baby care screens
│   │   └── BabyScreen.js
│   ├── settings/                  # Settings screens
│   │   └── SettingsScreen.js
│   └── shared/                    # Shared screens
│       ├── DashboardScreen.js
│       ├── ProfileScreen.js
│       └── ReportsScreen.js
├── store/                         # Redux store configuration
│   ├── index.js                   # Store setup
│   └── slices/                    # Redux slices
│       ├── authSlice.js           # Authentication state
│       ├── pregnancySlice.js      # Pregnancy tracking state
│       ├── babySlice.js           # Baby care state
│       └── settingsSlice.js       # App settings state
├── components/                    # Reusable components
│   ├── common/                    # Common UI components
│   ├── forms/                     # Form components
│   └── charts/                    # Chart components
├── utils/                         # Utility functions
├── services/                      # API services
├── types/                         # TypeScript type definitions
└── assets/                        # Static assets
    ├── images/                    # Image assets
    ├── icons/                     # Icon assets
    └── fonts/                     # Font assets
```

## Navigation Structure

### Authentication Flow
- **OnboardingScreen** → Introduction slides
- **LoginScreen** → User login
- **RegisterScreen** → User registration
- **ForgotPasswordScreen** → Password reset

### Main App Flow
- **Drawer Navigation** (MainNavigator)
  - **Tab Navigation** (TabNavigator)
    - **Dashboard** → Home screen with quick stats
    - **Pregnancy** → Pregnancy tracking features
    - **Baby** → Baby care features
    - **Reports** → Medical reports management
  - **Settings** → App settings
  - **Profile** → User profile management

## Redux Store Structure

### Auth Slice
- `isAuthenticated`: Boolean
- `user`: User object
- `isLoading`: Loading state
- `error`: Error messages

### Pregnancy Slice
- `currentWeek`: Current pregnancy week
- `dueDate`: Due date
- `weight`: Weight tracking entries
- `meals`: Meal logging entries
- `waterIntake`: Water intake entries
- `sleep`: Sleep tracking entries
- `exercise`: Exercise logging entries
- `medicines`: Medicine reminders
- `reports`: Medical reports
- `hospitalBagChecklist`: Hospital bag items

### Baby Slice
- `babyProfile`: Baby information
- `feeding`: Feeding logs
- `sleep`: Sleep logs
- `potty`: Diaper change logs
- `playtime`: Playtime logs
- `growth`: Growth measurements
- `vaccinations`: Vaccination schedule

### Settings Slice
- `theme`: App theme (light/dark)
- `notifications`: Notification settings
- `language`: App language
- `units`: Measurement units
- `soundEnabled`: Sound effects
- `hapticEnabled`: Haptic feedback
- `isPremium`: Premium status

## Features Implemented

### Phase 1 (Free/MVP)
- ✅ User authentication (login/register/forgot password)
- ✅ Onboarding flow
- ✅ Pregnancy timeline tracker
- ✅ Lifestyle logging (meals, water, sleep, exercise)
- ✅ Medicine reminders
- ✅ Weight tracking
- ✅ Hospital bag checklist
- ✅ Report uploads
- ✅ Baby care logging (feeding, sleep, potty, playtime)
- ✅ Growth monitoring
- ✅ Vaccination alerts
- ✅ Settings management
- ✅ Dark mode support
- ✅ Multiple profiles support

### Phase 2 (Premium) - Planned
- 🔄 AI report analysis
- 🔄 AI chat assistant
- 🔄 Brain development activities
- 🔄 AI health assistant
- 🔄 Growth prediction insights
- 🔄 Cloud backup & sync
- 🔄 Advanced analytics
- 🔄 Relaxation mode
- 🔄 Payment integration
- 🔄 Custom themes

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run on specific platforms:
   ```bash
   npm run android  # Android
   npm run ios      # iOS
   npm run web      # Web
   ```

## Technology Stack

- **Framework**: React Native (Expo)
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation v7
- **UI Components**: React Native built-in components
- **Icons**: Expo Vector Icons
- **Styling**: React Native StyleSheet
- **Platform Support**: iOS, Android, Web

## Development Guidelines

- Use functional components with React hooks
- Follow camelCase naming conventions
- Use StyleSheet.create() for all styling
- Implement proper error handling
- Add loading states for async operations
- Use Redux for state management
- Follow accessibility best practices
- Implement offline-first data handling
