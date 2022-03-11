import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import TcpSocket from "react-native-tcp-socket";
import { sendMessage, balanceMessage } from "../../api";

interface UserState {
  privateSeed: string;
  publicKey: string;
  loggedIn: boolean;
  balance: number;
}

const initialState: UserState = {
  privateSeed: "",
  publicKey: "",
  loggedIn: false,
  balance: 0,
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
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchBalance.pending, (state, action) => {
      // TODO
    });
    builder.addCase(fetchBalance.fulfilled, (state, action) => {
      const { balance } = action.payload as { balance: number };
      state.balance = balance;
    });
    builder.addCase(fetchBalance.rejected, (state, action) => {
      console.log("bad request");
    });
  },
});

export const fetchBalance = createAsyncThunk(
  "users/fetchBalance",
  async (_, { getState }) => {
    const {
      users: { publicKey },
    } = getState() as { users: UserState };
    return await sendMessage(
      balanceMessage(
        "034e06f1d959fe83fd3f65627b7e2e2d3c020f99cd99bcd3a4dd649e65e3a684"
      )
    );
  }
);

// Actions
export const { setPrivateSeed, setPublicKey, setLoggedIn, setBalance } =
  userSlice.actions;

// Selectors
export const selectPrivateSeed = (state: RootState) => state.users.privateSeed;
export const selectPublicKey = (state: RootState) => state.users.publicKey;
export const selectLoggedIn = (state: RootState) => state.users.loggedIn;
export const selectBalance = (state: RootState) => state.users.balance;

// Reducer
export default userSlice.reducer;
