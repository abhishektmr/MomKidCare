import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define interfaces for baby data
export interface BabyProfile {
  id: string;
  name: string;
  birthDate: string;
  gender: 'male' | 'female';
  birthWeight: number;
  birthHeight: number;
  currentWeight?: number;
  currentHeight?: number;
  notes?: string;
}

export interface FeedingEntry {
  id: string;
  date: string;
  time: string;
  type: 'breastfeeding' | 'bottle' | 'solid';
  amount?: number; // in ml for bottle, duration in minutes for breastfeeding
  duration?: number; // in minutes
  notes?: string;
}

export interface SleepEntry {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  quality: 'poor' | 'fair' | 'good' | 'excellent';
  notes?: string;
}

export interface PottyEntry {
  id: string;
  date: string;
  time: string;
  type: 'wet' | 'dirty' | 'both';
  notes?: string;
}

export interface PlaytimeEntry {
  id: string;
  date: string;
  time: string;
  duration: number; // in minutes
  activity: string;
  notes?: string;
}

export interface GrowthEntry {
  id: string;
  date: string;
  weight: number; // in kg
  height: number; // in cm
  headCircumference?: number; // in cm
  notes?: string;
}

export interface VaccinationEntry {
  id: string;
  name: string;
  dueDate: string;
  givenDate?: string;
  status: 'upcoming' | 'overdue' | 'completed' | 'skipped';
  notes?: string;
}

export interface BabyState {
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

const initialState: BabyState = {
  babyProfile: null,
  feeding: [],
  sleep: [],
  potty: [],
  playtime: [],
  growth: [],
  vaccinations: [
    // Common vaccination schedule for first year
    { id: '1', name: 'Hepatitis B (1st dose)', dueDate: '2024-01-01', status: 'upcoming' },
    { id: '2', name: 'DTaP (1st dose)', dueDate: '2024-02-01', status: 'upcoming' },
    { id: '3', name: 'Hib (1st dose)', dueDate: '2024-02-01', status: 'upcoming' },
    { id: '4', name: 'Polio (1st dose)', dueDate: '2024-02-01', status: 'upcoming' },
    { id: '5', name: 'PCV13 (1st dose)', dueDate: '2024-02-01', status: 'upcoming' },
    { id: '6', name: 'Rotavirus (1st dose)', dueDate: '2024-02-01', status: 'upcoming' },
  ],
  isLoading: false,
  error: null,
};

const babySlice = createSlice({
  name: 'baby',
  initialState,
  reducers: {
    setBabyProfile: (state, action: PayloadAction<BabyProfile>) => {
      state.babyProfile = action.payload;
    },
    updateBabyProfile: (state, action: PayloadAction<Partial<BabyProfile>>) => {
      if (state.babyProfile) {
        state.babyProfile = { ...state.babyProfile, ...action.payload };
      }
    },
    addFeedingEntry: (state, action: PayloadAction<FeedingEntry>) => {
      state.feeding.push(action.payload);
    },
    updateFeedingEntry: (state, action: PayloadAction<FeedingEntry>) => {
      const index = state.feeding.findIndex(entry => entry.id === action.payload.id);
      if (index !== -1) {
        state.feeding[index] = action.payload;
      }
    },
    deleteFeedingEntry: (state, action: PayloadAction<string>) => {
      state.feeding = state.feeding.filter(entry => entry.id !== action.payload);
    },
    addSleepEntry: (state, action: PayloadAction<SleepEntry>) => {
      state.sleep.push(action.payload);
    },
    updateSleepEntry: (state, action: PayloadAction<SleepEntry>) => {
      const index = state.sleep.findIndex(entry => entry.id === action.payload.id);
      if (index !== -1) {
        state.sleep[index] = action.payload;
      }
    },
    deleteSleepEntry: (state, action: PayloadAction<string>) => {
      state.sleep = state.sleep.filter(entry => entry.id !== action.payload);
    },
    addPottyEntry: (state, action: PayloadAction<PottyEntry>) => {
      state.potty.push(action.payload);
    },
    updatePottyEntry: (state, action: PayloadAction<PottyEntry>) => {
      const index = state.potty.findIndex(entry => entry.id === action.payload.id);
      if (index !== -1) {
        state.potty[index] = action.payload;
      }
    },
    deletePottyEntry: (state, action: PayloadAction<string>) => {
      state.potty = state.potty.filter(entry => entry.id !== action.payload);
    },
    addPlaytimeEntry: (state, action: PayloadAction<PlaytimeEntry>) => {
      state.playtime.push(action.payload);
    },
    updatePlaytimeEntry: (state, action: PayloadAction<PlaytimeEntry>) => {
      const index = state.playtime.findIndex(entry => entry.id === action.payload.id);
      if (index !== -1) {
        state.playtime[index] = action.payload;
      }
    },
    deletePlaytimeEntry: (state, action: PayloadAction<string>) => {
      state.playtime = state.playtime.filter(entry => entry.id !== action.payload);
    },
    addGrowthEntry: (state, action: PayloadAction<GrowthEntry>) => {
      state.growth.push(action.payload);
    },
    updateGrowthEntry: (state, action: PayloadAction<GrowthEntry>) => {
      const index = state.growth.findIndex(entry => entry.id === action.payload.id);
      if (index !== -1) {
        state.growth[index] = action.payload;
      }
    },
    deleteGrowthEntry: (state, action: PayloadAction<string>) => {
      state.growth = state.growth.filter(entry => entry.id !== action.payload);
    },
    addVaccinationEntry: (state, action: PayloadAction<VaccinationEntry>) => {
      state.vaccinations.push(action.payload);
    },
    updateVaccinationStatus: (state, action: PayloadAction<{ vaccineId: string; status: VaccinationEntry['status']; givenDate?: string }>) => {
      const { vaccineId, status, givenDate } = action.payload;
      const index = state.vaccinations.findIndex(v => v.id === vaccineId);
      if (index !== -1) {
        state.vaccinations[index].status = status;
        if (givenDate) {
          state.vaccinations[index].givenDate = givenDate;
        }
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
  setBabyProfile,
  updateBabyProfile,
  addFeedingEntry,
  updateFeedingEntry,
  deleteFeedingEntry,
  addSleepEntry,
  updateSleepEntry,
  deleteSleepEntry,
  addPottyEntry,
  updatePottyEntry,
  deletePottyEntry,
  addPlaytimeEntry,
  updatePlaytimeEntry,
  deletePlaytimeEntry,
  addGrowthEntry,
  updateGrowthEntry,
  deleteGrowthEntry,
  addVaccinationEntry,
  updateVaccinationStatus,
  setLoading,
  setError,
  clearError,
} = babySlice.actions;

export default babySlice.reducer;
