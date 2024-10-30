// src/store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string | null;
}

const initialState: UserState = {
  username: localStorage.getItem("username"), // Retrieve username from localStorage, if available
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      localStorage.setItem("username", action.payload); // Save to localStorage
    },
    clearUsername: (state) => {
      state.username = null;
      localStorage.removeItem("username"); // Remove from localStorage on logout
    },
  },
});

export const { setUsername, clearUsername } = userSlice.actions;
export default userSlice.reducer;
