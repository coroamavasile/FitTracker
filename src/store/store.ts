import { configureStore } from '@reduxjs/toolkit';

import { authenticationReducer, usersReducer } from '../slices';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { AUTHENTICATION_FEATURE_KEY, USERS_FEATURE_KEY } from '../constants';

export const store = configureStore({
  reducer: {
    [AUTHENTICATION_FEATURE_KEY]: authenticationReducer,
    [USERS_FEATURE_KEY]: usersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
