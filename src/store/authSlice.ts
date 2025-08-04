import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  phoneNumber: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  phoneNumber: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initializeAuth: (
      state,
      action: PayloadAction<{
        phoneNumber: string | null;
        isAuthenticated: boolean;
      }>
    ) => {
      state.phoneNumber = action.payload.phoneNumber;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.phoneNumber = null;
      state.isAuthenticated = false;
    },
  },
});

export const { initializeAuth, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
