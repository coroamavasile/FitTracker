import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ILoginRequestDto, IRegisterRequestDto} from '../../common';
import {login, register} from './authentication-data-access';
import {toast} from 'react-toastify';

export interface AuthenticationState {
  token: string | undefined;
  email: string;
  loading: boolean;
}

const initialState: AuthenticationState = {
  token: undefined,
  email: '',
  loading: false,
};

export const registerAction = createAsyncThunk(
  'authentication/register',
  async (dto: IRegisterRequestDto) => {
    return register(dto);
  }
);

export const loginAction = createAsyncThunk(
  'authentication/login',
  async (dto: ILoginRequestDto) => {
    return login(dto);
  }
);

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {},
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
export const {} = authenticationSlice.actions;

export const authenticationReducer = authenticationSlice.reducer;
