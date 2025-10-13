import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Lady interface
export interface Lady {
  id: string;
  email: string;
  name: string;
  phone: string;
  dateOfBirth: string;
  pregnancyType: string;
  babyName?: string;
  babyBirthDate?: string;
  babyGender?: 'male' | 'female' | null;
}

// Define the Auth state interface
export interface AuthState {
  isAuthenticated: boolean;
  lady: Lady | null;
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  // isAuthenticated: false,
  isAuthenticated: true,
  // Lady: null,
  lady: {
    id: "1",
    email: "Shaifali@gmail.com",
    name: "Shaifali",
    phone: "1234567891",
    dateOfBirth: "04/01/1998",
    pregnancyType: "first"
  },
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
    loginSuccess: (state, action: PayloadAction<Lady>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.lady = action.payload;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.lady = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.lady = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateLady: (state, action: PayloadAction<Partial<Lady>>) => {
      if (state.lady) {
        state.lady = { ...state.lady, ...action.payload };
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
  updateLady 
} = authSlice.actions;

export default authSlice.reducer;
