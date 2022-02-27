import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UIState {
  isLoading: boolean;
}

const initialState: UIState = {
  isLoading: true,
};

export const userSlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

// Actions
export const { setIsLoading } = userSlice.actions;

// Selectors
export const selectIsLoading = (state: RootState) => state.UI.isLoading;

// Reducer
export default userSlice.reducer;
