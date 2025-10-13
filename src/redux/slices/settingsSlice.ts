import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define interfaces for settings
export interface NotificationSettings {
  meals: boolean;
  medicines: boolean;
  vaccines: boolean;
  reports: boolean;
  sleep: boolean;
  appointments: boolean;
  general: boolean;
}

export interface UnitSettings {
  weight: 'kg' | 'lbs';
  height: 'cm' | 'ft';
  temperature: 'celsius' | 'fahrenheit';
  volume: 'ml' | 'oz';
}

export interface SettingsState {
  theme: 'light' | 'dark';
  notifications: NotificationSettings;
  language: string;
  units: UnitSettings;
  soundEnabled: boolean;
  hapticEnabled: boolean;
  isPremium: boolean;
  lastSyncDate?: string;
  autoBackup: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: SettingsState = {
  theme: 'light',
  notifications: {
    meals: true,
    medicines: true,
    vaccines: true,
    reports: true,
    sleep: true,
    appointments: true,
    general: true,
  },
  language: 'en',
  units: {
    weight: 'kg',
    height: 'cm',
    temperature: 'celsius',
    volume: 'ml',
  },
  soundEnabled: true,
  hapticEnabled: true,
  isPremium: false,
  autoBackup: false,
  isLoading: false,
  error: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    updateNotificationSettings: (state, action: PayloadAction<Partial<NotificationSettings>>) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    toggleNotification: (state, action: PayloadAction<keyof NotificationSettings>) => {
      const key = action.payload;
      state.notifications[key] = !state.notifications[key];
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    updateUnits: (state, action: PayloadAction<Partial<UnitSettings>>) => {
      state.units = { ...state.units, ...action.payload };
    },
    setSoundEnabled: (state, action: PayloadAction<boolean>) => {
      state.soundEnabled = action.payload;
    },
    setHapticEnabled: (state, action: PayloadAction<boolean>) => {
      state.hapticEnabled = action.payload;
    },
    setPremiumStatus: (state, action: PayloadAction<boolean>) => {
      state.isPremium = action.payload;
    },
    setAutoBackup: (state, action: PayloadAction<boolean>) => {
      state.autoBackup = action.payload;
    },
    setLastSyncDate: (state, action: PayloadAction<string>) => {
      state.lastSyncDate = action.payload;
    },
    resetSettings: (state) => {
      // Reset to default settings but keep premium status
      const isPremium = state.isPremium;
      return {
        ...initialState,
        isPremium,
      };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setTheme,
  toggleTheme,
  updateNotificationSettings,
  toggleNotification,
  setLanguage,
  updateUnits,
  setSoundEnabled,
  setHapticEnabled,
  setPremiumStatus,
  setAutoBackup,
  setLastSyncDate,
  resetSettings,
  setLoading,
  setError,
  clearError,
} = settingsSlice.actions;

export default settingsSlice.reducer;
