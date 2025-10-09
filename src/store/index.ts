import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import babySlice from './slices/babySlice';
import pregnancySlice from './slices/pregnancySlice';
import settingsSlice from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    pregnancy: pregnancySlice,
    baby: babySlice,
    settings: settingsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serialization check
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
  devTools: __DEV__, // Enable Redux DevTools in development
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export store as default for easier imports
export default store;
