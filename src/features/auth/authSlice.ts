import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login } from './authThunks';

interface AuthState {
  token: string | null;
  roles: string[];  // Changed to an array of roles
  email: string | null;
  state : string | null;
  fullName: string | null;
  stateId: number | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  token: null,
  roles: [],  // Initialize roles as an empty array
  email: null,
  state: null,
  fullName: null,
  error: null,
  isLoading: false,
  stateId:null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ token: string; roles: string[]; email: string; fullName: string, stateId:number, state:string  }>
    ) => {
      state.token = action.payload.token;
      state.roles = action.payload.roles;  // Now store roles as an array
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.stateId = action.payload.stateId;
      state.state = action.payload.state;
      state.error = null;  // Clear error on successful login
    },
    logout: (state) => {
      state.token = null;
      state.roles = [];
      state.email = null;
      state.fullName = null;
      state.state = null;
      state.error = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'An unknown error occurred';
      });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
