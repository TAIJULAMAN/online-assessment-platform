import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'employer' | 'candidate';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  refId?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_state', JSON.stringify(state));
      }
    },
    loginFailure: (state) => {
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_state');
        localStorage.removeItem('exam_state');
      }
    },
    rehydrateAuth: (state, action: PayloadAction<AuthState>) => {
      return action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, rehydrateAuth } = authSlice.actions;
export default authSlice.reducer;
