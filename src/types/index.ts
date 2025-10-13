import { AuthState } from '../redux/slices/authSlice';
import { BabyState } from '../redux/slices/babySlice';
import { PregnancyState } from '../redux/slices/pregnancyTrackerSlice';
import { SettingsState } from '../redux/slices/settingsSlice';

// Re-export all types from slices for easy access
export type { AuthState, User } from '../redux/slices/authSlice';
export type {
  BabyProfile, SleepEntry as BabySleepEntry, BabyState, FeedingEntry, GrowthEntry, PlaytimeEntry, PottyEntry, VaccinationEntry
} from '../redux/slices/babySlice';
export type {
  ExerciseEntry, HospitalBagItem, MealEntry, MedicineEntry, PregnancyState, ReportEntry, SleepEntry, WaterEntry, WeightEntry
} from '../redux/slices/pregnancyTrackerSlice';
export type {
  NotificationSettings, SettingsState, UnitSettings
} from '../redux/slices/settingsSlice';

// Navigation types
export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  MainTabs: undefined;
  Settings: undefined;
  Profile: undefined;
  PregnancyTimeline: undefined;
  LifestyleLogging: undefined;
  Medicines: undefined;
  WeightTracking: undefined;
  HospitalBag: undefined;
  DailyRoutine: undefined;
  GrowthMonitoring: undefined;
  Vaccinations: undefined;
  FeedingTracker: undefined;
  SleepTracker: undefined;
  Milestones: undefined;
};

// Common utility types
export interface BaseEntry {
  id: string;
  date: string;
  notes?: string;
}

export interface TimeEntry extends BaseEntry {
  time: string;
}

export interface DurationEntry extends BaseEntry {
  duration: number;
}

// Form validation types
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Date range types
export interface DateRange {
  startDate: string;
  endDate: string;
}

// Chart data types
export interface ChartDataPoint {
  x: string | number;
  y: number;
  label?: string;
}

export interface ChartData {
  data: ChartDataPoint[];
  title: string;
  color: string;
}

// Notification types
export interface NotificationData {
  id: string;
  title: string;
  body: string;
  type: 'reminder' | 'alert' | 'info';
  scheduledTime: string;
  isRead: boolean;
}

// Search and filter types
export interface SearchFilters {
  dateRange?: DateRange;
  category?: string;
  searchTerm?: string;
}

// Export/Import types  
export interface ExportData {
  auth: AuthState;
  pregnancy: PregnancyState;
  baby: BabyState;
  settings: SettingsState;
  exportDate: string;
  version: string;
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  loadingMessage?: string;
}

// Modal types
export interface ModalConfig {
  isVisible: boolean;
  title?: string;
  content?: React.ReactNode;
  onClose?: () => void;
  onConfirm?: () => void;
}

// Theme types
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
  info: string;
}

export interface Theme {
  colors: ThemeColors;
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  typography: {
    h1: object;
    h2: object;
    h3: object;
    body: object;
    caption: object;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
  };
}
