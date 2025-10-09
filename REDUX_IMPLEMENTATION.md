# Redux Toolkit Implementation Guide

## Overview
This document describes the complete Redux Toolkit implementation for the MomKidCare app, including TypeScript integration, type safety, and best practices.

## File Structure

```
src/store/
├── index.ts                    # Store configuration and root types
├── hooks.ts                    # Typed Redux hooks
└── slices/
    ├── authSlice.ts           # Authentication state management
    ├── pregnancySlice.ts      # Pregnancy tracking state
    ├── babySlice.ts           # Baby care state
    └── settingsSlice.ts       # App settings and preferences
```

## Store Configuration (`src/store/index.ts`)

### Features
- ✅ **TypeScript Integration**: Full type safety with inferred types
- ✅ **Middleware Configuration**: Optimized serialization checks
- ✅ **DevTools Support**: Redux DevTools enabled in development
- ✅ **Type Exports**: `RootState` and `AppDispatch` types for type safety

### Usage
```typescript
import { store, RootState, AppDispatch } from './store/index';
```

## Typed Hooks (`src/store/hooks.ts`)

### Available Hooks
```typescript
// Generic typed hooks
useAppDispatch()     // Typed dispatch function
useAppSelector()     // Typed selector hook

// Slice-specific hooks
useAuth()            // Auth state
usePregnancy()       // Pregnancy state  
useBaby()            // Baby state
useSettings()        // Settings state

// Specific data hooks
useIsAuthenticated() // Boolean authentication status
useUser()            // User object
useCurrentWeek()     // Current pregnancy week
useBabyProfile()     // Baby profile data
useTheme()           // App theme
useIsPremium()       // Premium status
```

### Usage Example
```typescript
import { useAppDispatch, useAppSelector, useCurrentWeek } from '../store/hooks';
import { addWeightEntry } from '../store/slices/pregnancySlice';

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const currentWeek = useCurrentWeek();
  const weightEntries = useAppSelector(state => state.pregnancy.weight);

  const handleAddWeight = (weight: WeightEntry) => {
    dispatch(addWeightEntry(weight));
  };

  return (
    // Component JSX
  );
};
```

## Slice Implementations

### 1. Auth Slice (`authSlice.ts`)

#### State Structure
```typescript
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  dateOfBirth: string;
  dueDate: string;
  currentWeek: number;
  pregnancyType: string;
  babyName?: string;
  babyBirthDate?: string;
  babyGender?: 'male' | 'female' | null;
}
```

#### Available Actions
- `loginStart()` - Start login process
- `loginSuccess(user)` - Login successful
- `loginFailure(error)` - Login failed
- `logout()` - Clear auth state
- `clearError()` - Clear error message
- `updateUser(userData)` - Update user information

### 2. Pregnancy Slice (`pregnancySlice.ts`)

#### State Structure
```typescript
interface PregnancyState {
  currentWeek: number;
  dueDate: string | null;
  weight: WeightEntry[];
  meals: MealEntry[];
  waterIntake: WaterEntry[];
  sleep: SleepEntry[];
  exercise: ExerciseEntry[];
  medicines: MedicineEntry[];
  reports: ReportEntry[];
  hospitalBagChecklist: HospitalBagItem[];
  isLoading: boolean;
  error: string | null;
}
```

#### Key Data Types
- **WeightEntry**: Weight tracking with date, weight, notes
- **MealEntry**: Meal logging with type, food, calories
- **WaterEntry**: Water intake tracking
- **SleepEntry**: Sleep patterns with quality ratings
- **ExerciseEntry**: Exercise logging with intensity
- **MedicineEntry**: Medicine reminders with schedules
- **ReportEntry**: Medical reports with images
- **HospitalBagItem**: Delivery preparation checklist

#### Available Actions
- `setPregnancyData({currentWeek, dueDate})` - Set pregnancy timeline
- `addWeightEntry(entry)` - Add weight measurement
- `addMealEntry(entry)` - Log meal
- `addWaterEntry(entry)` - Log water intake
- `addSleepEntry(entry)` - Log sleep
- `addExerciseEntry(entry)` - Log exercise
- `addMedicineEntry(entry)` - Add medicine reminder
- `addReportEntry(entry)` - Upload medical report
- `updateHospitalBagItem({name, checked})` - Update checklist

### 3. Baby Slice (`babySlice.ts`)

#### State Structure
```typescript
interface BabyState {
  babyProfile: BabyProfile | null;
  feeding: FeedingEntry[];
  sleep: SleepEntry[];
  potty: PottyEntry[];
  playtime: PlaytimeEntry[];
  growth: GrowthEntry[];
  vaccinations: VaccinationEntry[];
  isLoading: boolean;
  error: string | null;
}
```

#### Key Data Types
- **BabyProfile**: Baby information (name, birth date, gender, measurements)
- **FeedingEntry**: Feeding logs (breastfeeding, bottle, solid food)
- **SleepEntry**: Sleep tracking with quality ratings
- **PottyEntry**: Diaper change logs
- **PlaytimeEntry**: Activity and playtime logs
- **GrowthEntry**: Growth measurements (weight, height, head circumference)
- **VaccinationEntry**: Vaccination schedule with status tracking

#### Available Actions
- `setBabyProfile(profile)` - Set baby information
- `addFeedingEntry(entry)` - Log feeding
- `addSleepEntry(entry)` - Log sleep
- `addPottyEntry(entry)` - Log diaper change
- `addPlaytimeEntry(entry)` - Log playtime
- `addGrowthEntry(entry)` - Log growth measurement
- `updateVaccinationStatus({vaccineId, status})` - Update vaccine status

### 4. Settings Slice (`settingsSlice.ts`)

#### State Structure
```typescript
interface SettingsState {
  theme: 'light' | 'dark';
  notifications: NotificationSettings;
  language: string;
  units: UnitSettings;
  soundEnabled: boolean;
  hapticEnabled: boolean;
  isPremium: boolean;
  autoBackup: boolean;
  lastSyncDate?: string;
  isLoading: boolean;
  error: string | null;
}
```

#### Available Actions
- `setTheme(theme)` - Set app theme
- `toggleTheme()` - Toggle between light/dark
- `updateNotificationSettings(settings)` - Update notification preferences
- `setLanguage(language)` - Set app language
- `updateUnits(units)` - Update measurement units
- `setSoundEnabled(enabled)` - Toggle sound effects
- `setHapticEnabled(enabled)` - Toggle haptic feedback
- `setPremiumStatus(status)` - Update premium status
- `resetSettings()` - Reset to defaults

## Type Safety Features

### 1. **Inferred Types**
```typescript
// Automatically inferred from store configuration
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 2. **Typed Hooks**
```typescript
// Fully typed selectors and dispatch
const user = useAppSelector(state => state.auth.user); // User | null
const dispatch = useAppDispatch(); // AppDispatch type
```

### 3. **Payload Actions**
```typescript
// All actions are properly typed with PayloadAction
loginSuccess: (state, action: PayloadAction<User>) => {
  // action.payload is typed as User
}
```

### 4. **Interface Definitions**
All data structures are properly typed with TypeScript interfaces for compile-time type checking.

## Best Practices Implemented

### 1. **Immutable Updates**
- All reducers use Immer under the hood for immutable updates
- Direct state mutations are safe and automatically converted

### 2. **Action Creators**
- Redux Toolkit automatically generates action creators
- No need to manually define action types

### 3. **Serialization Checks**
- Configured to ignore non-serializable data like dates and functions
- Prevents common Redux serialization warnings

### 4. **Error Handling**
- Each slice has consistent error handling
- Loading states for async operations

### 5. **Type Safety**
- Full TypeScript integration
- Compile-time type checking
- IntelliSense support in IDEs

## Usage Examples

### Basic Component with Redux
```typescript
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addMealEntry } from '../store/slices/pregnancySlice';

const MealTracker = () => {
  const dispatch = useAppDispatch();
  const meals = useAppSelector(state => state.pregnancy.meals);
  const currentWeek = useAppSelector(state => state.pregnancy.currentWeek);

  const handleAddMeal = () => {
    const newMeal: MealEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      type: 'breakfast',
      food: 'Oatmeal',
      calories: 300,
    };
    dispatch(addMealEntry(newMeal));
  };

  return (
    <View>
      <Text>Week {currentWeek} - Meals Today: {meals.length}</Text>
      <TouchableOpacity onPress={handleAddMeal}>
        <Text>Add Meal</Text>
      </TouchableOpacity>
    </View>
  );
};
```

### Async Operations
```typescript
// In a service file
export const loginUser = async (email: string, password: string) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

// In a component
const handleLogin = async () => {
  dispatch(loginStart());
  try {
    const userData = await loginUser(email, password);
    dispatch(loginSuccess(userData));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};
```

## Development Tools

### Redux DevTools
- Automatically enabled in development mode
- Time-travel debugging
- Action replay and inspection
- State diff visualization

### TypeScript Integration
- Full type safety across the application
- IntelliSense support for all Redux operations
- Compile-time error detection

## Migration from JavaScript

The Redux implementation has been fully migrated from JavaScript to TypeScript with the following improvements:

1. **Type Safety**: All state, actions, and selectors are properly typed
2. **Better DX**: Enhanced developer experience with IntelliSense
3. **Error Prevention**: Compile-time error detection
4. **Documentation**: Self-documenting code with type definitions
5. **Refactoring Safety**: Safe refactoring with type checking

## Performance Considerations

1. **Selective Re-renders**: Components only re-render when their selected state changes
2. **Memoization**: Use `useMemo` and `useCallback` for expensive computations
3. **Normalized State**: Consider normalizing complex nested data
4. **Lazy Loading**: Implement lazy loading for large datasets

This Redux implementation provides a robust, type-safe foundation for state management in the MomKidCare app.
