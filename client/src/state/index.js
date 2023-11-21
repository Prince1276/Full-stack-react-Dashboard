import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: "63701cc1f03239b7f700000e",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      if (state.mode === "light") {
        state.mode = "dark";

        // change CSS for scrollbar
        const root = document.querySelector(":root");
        root.style.setProperty("--scrollbar-color", "#abc8fa");
        root.style.setProperty("--scrollbar-background", "#272727");
      } else {
        state.mode = "light";

        const root = document.querySelector(":root");
        root.style.setProperty("--scrollbar-color", "#96a1c9");
        root.style.setProperty("--scrollbar-background", "#f0f0f0");
      }
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
