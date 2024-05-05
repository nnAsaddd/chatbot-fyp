import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  userName: string;
  mood: string;
  session: number;
  gptResponse: string;
  time: number;
};

const initialState: UserState = {
  userName: "unknown",
  mood: "unknown",
  session: 0,
  gptResponse: "unknown",
  time: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserName: (state, action) => {
      state.userName = action.payload;
    },
    updateMood: (state, action) => {
      state.mood = action.payload;
    },
    updateSession: (state, action) => {
      state.session = action.payload;
    },
    updateGptResponse: (state, action) => {
      state.gptResponse = action.payload;
    },
    updateTime: (state, action) => {
      state.time = action.payload;
    },
  },
});

export const {
  updateUserName,
  updateMood,
  updateSession,
  updateGptResponse,
  updateTime,
} = userSlice.actions;

export default userSlice.reducer;
