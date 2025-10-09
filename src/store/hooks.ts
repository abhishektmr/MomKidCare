import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './index';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Custom hooks for specific slices
export const useAuth = () => useAppSelector((state) => state.auth);
export const usePregnancy = () => useAppSelector((state) => state.pregnancy);
export const useBaby = () => useAppSelector((state) => state.baby);
export const useSettings = () => useAppSelector((state) => state.settings);

// Auth-specific hooks
export const useIsAuthenticated = () => useAppSelector((state) => state.auth.isAuthenticated);
export const useUser = () => useAppSelector((state) => state.auth.user);
export const useAuthLoading = () => useAppSelector((state) => state.auth.isLoading);

// Pregnancy-specific hooks
export const useCurrentWeek = () => useAppSelector((state) => state.pregnancy.currentWeek);
export const useDueDate = () => useAppSelector((state) => state.pregnancy.dueDate);
export const useWeightEntries = () => useAppSelector((state) => state.pregnancy.weight);
export const useMealEntries = () => useAppSelector((state) => state.pregnancy.meals);

// Baby-specific hooks
export const useBabyProfile = () => useAppSelector((state) => state.baby.babyProfile);
export const useFeedingEntries = () => useAppSelector((state) => state.baby.feeding);
export const useVaccinations = () => useAppSelector((state) => state.baby.vaccinations);

// Settings-specific hooks
export const useTheme = () => useAppSelector((state) => state.settings.theme);
export const useIsPremium = () => useAppSelector((state) => state.settings.isPremium);
export const useNotifications = () => useAppSelector((state) => state.settings.notifications);
