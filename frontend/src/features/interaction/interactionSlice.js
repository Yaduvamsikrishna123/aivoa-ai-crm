import { createSlice } from "@reduxjs/toolkit";

const interactionSlice = createSlice({
  name: "interaction",
  initialState: {
    interactions: [],
    aiResult: null,
  },
  reducers: {
    setInteractions: (state, action) => {
      state.interactions = action.payload;
    },

    setAIResult: (state, action) => {
      state.aiResult = action.payload;
    },
  },
});

export const { setInteractions, setAIResult } =
  interactionSlice.actions;

export default interactionSlice.reducer;