// src/store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string | null;
}

const initialState: UserState = {
  username: localStorage.getItem("username"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      localStorage.setItem("username", action.payload);
    },
    clearUsername: (state) => {
      state.username = null;
      localStorage.removeItem("username");
    },
  },
});

export const { setUsername, clearUsername } = userSlice.actions;
export default userSlice.reducer;
