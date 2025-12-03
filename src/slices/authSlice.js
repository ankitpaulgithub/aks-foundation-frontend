import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';

/**
 * Login user
 */
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/userapp/auth/login', credentials);

      if (response.data.status === 'SUCCESS') {
        const { data } = response.data;
        
        // Store token, user data, and role in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', data.token);
          localStorage.setItem('user', JSON.stringify(data));
          localStorage.setItem('userRole', data.role || '');
          if (data.refreshToken) {
            localStorage.setItem('refreshToken', data.refreshToken);
          }
        }
        
        return data;
      }
      return rejectWithValue(response.data.message || 'Login failed');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Login failed');
    }
  }
);

/**
 * Logout user
 */
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        localStorage.removeItem('refreshToken');
      }
      return true;
    } catch (error) {
      return rejectWithValue('Logout failed');
    }
  }
);

/**
 * Check if user is authenticated (on app load)
 */
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      if (typeof window === 'undefined') {
        return rejectWithValue('Not in browser');
      }
      
      const token = localStorage.getItem('accessToken');
      const userStr = localStorage.getItem('user');
      
      if (!token || !userStr) {
        return rejectWithValue('No auth data found');
      }
      
      const user = JSON.parse(userStr);
      const role = localStorage.getItem('userRole');
      return { token, user, role };
    } catch (error) {
      return rejectWithValue('Failed to check auth');
    }
  }
);

const initialState = {
  user: null,
  token: null,
  role: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  checkingAuth: true, // For initial auth check on app load
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Clear auth error
    clearAuthError: (state) => {
      state.error = null;
    },
    // Set auth from localStorage (for SSR hydration)
    setAuthFromStorage: (state) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('accessToken');
        const userStr = localStorage.getItem('user');
        if (token && userStr) {
          state.token = token;
          state.user = JSON.parse(userStr);
          state.isAuthenticated = true;
        }
      }
      state.checkingAuth = false;
    },
    // Clear auth state (for logout from interceptor)
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload;
        state.role = action.payload.role || null;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.role = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.checkingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.checkingAuth = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.role = action.payload.role;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.checkingAuth = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.role = null;
      });
  },
});

export const { clearAuthError, setAuthFromStorage, clearAuth } = authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectRole = (state) => state.auth.role;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectCheckingAuth = (state) => state.auth.checkingAuth;

export default authSlice.reducer;
