import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: string | null;
  role: string | null;
  token: string | null;
}

const initialState: UserState = {
  id: null,
  role: null,
  token: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ id: string; role: string; token: string }>) => {
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.token = action.payload.token;
    },
    loginFailure: (state) => {
      state.id = null;
      state.role = null;
      state.token = null;
    },
    logout: (state) => {
      state.id = null;
      state.role = null;
      state.token = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = userSlice.actions;

export default userSlice.reducer;
