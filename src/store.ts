// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Config for redux-persist
const persistConfig = {
  key: 'root', // Key for localStorage (or another storage)
  storage, // Define the storage type
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, authReducer);

// Create the store
export const store = configureStore({
  reducer: {
    auth: persistedReducer, // Wrap the auth reducer with persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Persistor object to be used in your application
export const persistor = persistStore(store);

// Infer types for use in components and thunks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
