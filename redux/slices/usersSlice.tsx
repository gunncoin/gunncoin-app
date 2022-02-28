import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserState {
  privateKey: string;
  publicKey: string;
  loggedIn: boolean;
}

const initialState: UserState = {
  privateKey: "",
  publicKey: "",
  loggedIn: true,
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
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
  },
});

// Actions
export const { setPrivateKey, setPublicKey, setLoggedIn } = userSlice.actions;

// Selectors
export const selectPrivateKey = (state: RootState) => state.users.privateKey;
export const selectPublicKey = (state: RootState) => state.users.publicKey;
export const selectLoggedIn = (state: RootState) => state.users.loggedIn;

// Reducer
export default userSlice.reducer;
