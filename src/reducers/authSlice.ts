import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null; 
}

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  token: localStorage.getItem("token"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("token", action.payload);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.setItem("isAuthenticated", "false");
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;

export const selectToken = (state: { auth: AuthState }) => state.auth.token;

export default authSlice.reducer;
