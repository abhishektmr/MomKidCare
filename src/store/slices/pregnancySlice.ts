import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define interfaces for pregnancy data
export interface WeightEntry {
  id: string;
  date: string;
  weight: number;
  notes?: string;
}

export interface MealEntry {
  id: string;
  date: string;
  time: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  food: string;
  calories?: number;
  notes?: string;
}

export interface WaterEntry {
  id: string;
  date: string;
  time: string;
  amount: number; // in ml
}

export interface SleepEntry {
  id: string;
  date: string;
  bedtime: string;
  wakeTime: string;
  duration: number; // in hours
  quality: 'poor' | 'fair' | 'good' | 'excellent';
  notes?: string;
}

export interface ExerciseEntry {
  id: string;
  date: string;
  time: string;
  type: string;
  duration: number; // in minutes
  intensity: 'light' | 'moderate' | 'vigorous';
  notes?: string;
}

export interface MedicineEntry {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  reminders: string[];
  notes?: string;
}

export interface ReportEntry {
  id: string;
  type: 'blood' | 'ultrasound' | 'urine' | 'other';
  date: string;
  title: string;
  summary?: string;
  imageUrl?: string;
  doctor?: string;
  notes?: string;
}

export interface HospitalBagItem {
  name: string;
  checked: boolean;
  category: 'clothing' | 'personal' | 'medical' | 'baby' | 'other';
}

export interface PregnancyState {
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

const initialState: PregnancyState = {
  currentWeek: 1,
  dueDate: null,
  weight: [],
  meals: [],
  waterIntake: [],
  sleep: [],
  exercise: [],
  medicines: [],
  reports: [],
  hospitalBagChecklist: [
    { name: 'Comfortable clothes', checked: false, category: 'clothing' },
    { name: 'Toiletries', checked: false, category: 'personal' },
    { name: 'Phone charger', checked: false, category: 'personal' },
    { name: 'Insurance cards', checked: false, category: 'medical' },
    { name: 'Baby clothes', checked: false, category: 'baby' },
    { name: 'Diapers', checked: false, category: 'baby' },
    { name: 'Car seat', checked: false, category: 'baby' },
    { name: 'Snacks', checked: false, category: 'other' },
  ],
  isLoading: false,
  error: null,
};

const pregnancySlice = createSlice({
  name: 'pregnancy',
  initialState,
  reducers: {
    setPregnancyData: (state, action: PayloadAction<{ currentWeek: number; dueDate: string }>) => {
      const { currentWeek, dueDate } = action.payload;
      state.currentWeek = currentWeek;
      state.dueDate = dueDate;
    },
    addWeightEntry: (state, action: PayloadAction<WeightEntry>) => {
      state.weight.push(action.payload);
    },
    updateWeightEntry: (state, action: PayloadAction<WeightEntry>) => {
      const index = state.weight.findIndex(entry => entry.id === action.payload.id);
      if (index !== -1) {
        state.weight[index] = action.payload;
      }
    },
    deleteWeightEntry: (state, action: PayloadAction<string>) => {
      state.weight = state.weight.filter(entry => entry.id !== action.payload);
    },
    addMealEntry: (state, action: PayloadAction<MealEntry>) => {
      state.meals.push(action.payload);
    },
    updateMealEntry: (state, action: PayloadAction<MealEntry>) => {
      const index = state.meals.findIndex(entry => entry.id === action.payload.id);
      if (index !== -1) {
        state.meals[index] = action.payload;
      }
    },
    deleteMealEntry: (state, action: PayloadAction<string>) => {
      state.meals = state.meals.filter(entry => entry.id !== action.payload);
    },
    addWaterEntry: (state, action: PayloadAction<WaterEntry>) => {
      state.waterIntake.push(action.payload);
    },
    addSleepEntry: (state, action: PayloadAction<SleepEntry>) => {
      state.sleep.push(action.payload);
    },
    addExerciseEntry: (state, action: PayloadAction<ExerciseEntry>) => {
      state.exercise.push(action.payload);
    },
    addMedicineEntry: (state, action: PayloadAction<MedicineEntry>) => {
      state.medicines.push(action.payload);
    },
    updateMedicineEntry: (state, action: PayloadAction<MedicineEntry>) => {
      const index = state.medicines.findIndex(entry => entry.id === action.payload.id);
      if (index !== -1) {
        state.medicines[index] = action.payload;
      }
    },
    deleteMedicineEntry: (state, action: PayloadAction<string>) => {
      state.medicines = state.medicines.filter(entry => entry.id !== action.payload);
    },
    addReportEntry: (state, action: PayloadAction<ReportEntry>) => {
      state.reports.push(action.payload);
    },
    updateReportEntry: (state, action: PayloadAction<ReportEntry>) => {
      const index = state.reports.findIndex(entry => entry.id === action.payload.id);
      if (index !== -1) {
        state.reports[index] = action.payload;
      }
    },
    deleteReportEntry: (state, action: PayloadAction<string>) => {
      state.reports = state.reports.filter(entry => entry.id !== action.payload);
    },
    updateHospitalBagItem: (state, action: PayloadAction<{ name: string; checked: boolean }>) => {
      const { name, checked } = action.payload;
      const index = state.hospitalBagChecklist.findIndex(item => item.name === name);
      if (index !== -1) {
        state.hospitalBagChecklist[index].checked = checked;
      }
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
  setPregnancyData,
  addWeightEntry,
  updateWeightEntry,
  deleteWeightEntry,
  addMealEntry,
  updateMealEntry,
  deleteMealEntry,
  addWaterEntry,
  addSleepEntry,
  addExerciseEntry,
  addMedicineEntry,
  updateMedicineEntry,
  deleteMedicineEntry,
  addReportEntry,
  updateReportEntry,
  deleteReportEntry,
  updateHospitalBagItem,
  setLoading,
  setError,
  clearError,
} = pregnancySlice.actions;

export default pregnancySlice.reducer;
