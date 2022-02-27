import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import * as TYPES from "../types";

interface UserState {
  privateKey: string;
  publicKey: string;
}

const initialState: UserState = {
  privateKey: "",
  publicKey: "",
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setPrivateKey: (state, action: PayloadAction<string>) => {
      state.privateKey = action.payload;
    },
    setPublicKey: (state, action: PayloadAction<string>) => {
      state.publicKey = action.payload;
    },
  },
});

// Actions
export const { setPrivateKey, setPublicKey } = userSlice.actions;

// Selectors
export const selectPrivateKey = (state: RootState) => state.users.privateKey;
export const selectPublicKey = (state: RootState) => state.users.publicKey;

// Reducer
export default userSlice.reducer;
