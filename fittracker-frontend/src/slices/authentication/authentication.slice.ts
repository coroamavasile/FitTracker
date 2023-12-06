import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { login, register } from './authentication-data-access';
import { toast } from 'react-toastify';
import { ILoginRequestDto, IRegisterRequestDto } from '../../interfaces';

export interface AuthenticationState {
  token: string | undefined;
  email: string | undefined;
  name: string | undefined;
  role: number | undefined;
  userId: number | undefined;
  userProfileImage: string | undefined;
  loading: boolean;
}

const initialState: AuthenticationState = {
  token: localStorage.getItem('jwt') ?? undefined,
  email: localStorage.getItem('userEmail') ?? undefined,
  name: localStorage.getItem('userName') ?? undefined,
  role: Number(localStorage.getItem('userRole')) ?? undefined,
  userId: Number(localStorage.getItem('userId')) ?? undefined,
  userProfileImage: localStorage.getItem('userProfileImage') ?? undefined,
  loading: false,
};

export const registerAction = createAsyncThunk('authentication/register', async (dto: IRegisterRequestDto) => {
  return register(dto);
});

export const loginAction = createAsyncThunk('authentication/login', async (dto: ILoginRequestDto) => {
  return login(dto);
});

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    clearAuthenticationStateAction: () => {
      localStorage.clear();
      return {
        token: undefined,
        email: undefined,
        name: undefined,
        role: undefined,
        userId: undefined,
        userProfileImage: undefined,
        loading: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      /** Pending */
      .addCase(registerAction.pending, (state: AuthenticationState) => {
        state.loading = true;
      })
      .addCase(loginAction.pending, (state: AuthenticationState) => {
        state.loading = true;
      })

      /** Fulfilled */
      .addCase(registerAction.fulfilled, (state: AuthenticationState) => {
        state.loading = false;
        toast('Your account was successfully created!');
      })

      .addCase(loginAction.fulfilled, (state: AuthenticationState, action) => {
        state.loading = false;
        state.token = action.payload.token;
        localStorage.setItem('jwt', action.payload.token);

        state.email = action.payload.email;
        localStorage.setItem('userEmail', action.payload.email);

        state.userId = action.payload.id;
        localStorage.setItem('userId', action.payload.id);

        state.name = action.payload.name;
        localStorage.setItem('userName', action.payload.name);

        state.role = action.payload.role;
        localStorage.setItem('userRole', action.payload.role);

        if (action.payload.profileImage !== null) {
          state.userProfileImage = action.payload.profileImage;
          localStorage.setItem('userProfileImage', action.payload.profileImage);
        }
      })
      /** Rejected */
      .addCase(registerAction.rejected, (state: AuthenticationState) => {
        state.loading = false;
        /**Add message from backend */
        toast.error('Something went wrong');
      })
      .addCase(loginAction.rejected, (state: AuthenticationState) => {
        state.loading = false;
        /**Add message from backend */
        toast.error('Something went wrong');
      });
  },
});

// Action creators are generated for each case reducer function
export const { clearAuthenticationStateAction } = authenticationSlice.actions;

export const authenticationReducer = authenticationSlice.reducer;
