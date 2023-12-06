import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

import { authenticationReducer, nutritionLoggerReducer, progressLoggerReducer, usersReducer } from '../slices';
import { AUTHENTICATION_FEATURE_KEY, NUTRITION_LOGGER_FEATURE_KEY, USERS_FEATURE_KEY } from '../constants';
import { PROGRESS_LOGGER_FEATURE_KEY } from '../constants/progress-logger.constants';

export const store = configureStore({
  reducer: {
    [AUTHENTICATION_FEATURE_KEY]: authenticationReducer,
    [USERS_FEATURE_KEY]: usersReducer,
    [NUTRITION_LOGGER_FEATURE_KEY]: nutritionLoggerReducer,
    [PROGRESS_LOGGER_FEATURE_KEY]: progressLoggerReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
