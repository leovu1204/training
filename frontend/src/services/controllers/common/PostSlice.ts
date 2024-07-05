import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PostState {
  password: string | null;
}

const initialState: PostState = {
  password: null,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    postLoginSuccess: (state, action: PayloadAction<{ password: string }>) => {
      state.password = action.payload.password;
    },
    postLogout: (state) => {
      state.password = null;
    },
  },
});

export const { postLoginSuccess, postLogout } = postSlice.actions;

export default postSlice.reducer;
