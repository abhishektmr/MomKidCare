import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the User interface
export interface User {
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

// Define the Auth state interface
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  isAuthenticated: true,
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  clearError,
  updateUser 
} = authSlice.actions;

export default authSlice.reducer;
