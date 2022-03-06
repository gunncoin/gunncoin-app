import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserState {
  privateSeed: string;
  publicKey: string;
  loggedIn: boolean;
}

const initialState: UserState = {
  privateSeed: "",
  publicKey: "",
  loggedIn: false,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setPrivateSeed: (state, action: PayloadAction<string>) => {
      state.privateSeed = action.payload;
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
export const { setPrivateSeed, setPublicKey, setLoggedIn } = userSlice.actions;

// Selectors
export const selectPrivateSeed = (state: RootState) => state.users.privateSeed;
export const selectPublicKey = (state: RootState) => state.users.publicKey;
export const selectLoggedIn = (state: RootState) => state.users.loggedIn;

// Reducer
export default userSlice.reducer;
