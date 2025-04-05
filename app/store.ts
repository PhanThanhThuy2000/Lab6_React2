import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from './pokemon';
import { authApi } from './authApi';

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    // thêm các reducer khác nếu có
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      pokemonApi.middleware,
      authApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;