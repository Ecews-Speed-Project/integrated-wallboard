import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { loginSuccess } from './authSlice';

// Define LoginCredentials type
interface LoginCredentials {
  email: string;
  password: string;
}


// Define the async thunk for login
export const login = createAsyncThunk<
  void,
  LoginCredentials,
  { rejectValue: string }
>(
  'auth/login',
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      // Make the API call
      const response = await axios.post('http://eboard.ecews.org/api/account/login', { email, password });

      if (response.status !== 200) {
        throw new Error('Login failed');
      }

      // Extract token, role, fullName from response data
      const { token, roles, fullName, stateId,  state} = response.data;

      // Dispatch loginSuccess with token, role, email, and fullName
      dispatch(loginSuccess({ token, roles, fullName, stateId, email, state} ));

      // Store the token in localStorage
      localStorage.setItem('token', token);

      return response.data;
      
    } catch (error: any) {
      return rejectWithValue('Login failed. Please check your credentials.');
    }
  }
);
