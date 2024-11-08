import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  expirationTimestamp: number | null;
}

const initialState: AuthState = {
  isAuthenticated:
    sessionStorage.getItem("isAuthenticated") === "true" ||
    localStorage.getItem("isAuthenticated") === "true",
  token: sessionStorage.getItem("token") || localStorage.getItem("token"),
  expirationTimestamp: parseInt(
    sessionStorage.getItem("expirationTimestamp") ||
    localStorage.getItem("expirationTimestamp") ||
    "0"
  ),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; rememberMe: boolean,expirationTimestamp: number }>) => {
      const { token, rememberMe, expirationTimestamp } = action.payload;
      state.isAuthenticated = true;
      state.token = token;
      state.expirationTimestamp = expirationTimestamp;

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("token", token);
      storage.setItem("isAuthenticated", "true");
      storage.setItem("expirationTimestamp", expirationTimestamp.toString());

    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.expirationTimestamp = null;

      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("expirationTimestamp");

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("isAuthenticated");
      sessionStorage.removeItem("expirationTimestamp");
    },

  },
});

export const { login, logout } = authSlice.actions;

export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;

export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectExpirationTimestamp = (state: { auth: AuthState }) => state.auth.expirationTimestamp;
export default authSlice.reducer;
