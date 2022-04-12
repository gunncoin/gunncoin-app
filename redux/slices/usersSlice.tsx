import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import TcpSocket from "react-native-tcp-socket";
import { sendMessage, balanceMessage, txHistoryMessage } from "../../api";
import {
  Transaction,
  TransactionHistoryResponse,
} from "../../api/responseTypes";

interface UserState {
  privateSeed: string;
  publicKey: string;
  loggedIn: boolean;
  balance: number;
  transactions: TransactionHistoryResponse;
  balanceLoading: boolean;
  transactionsLoading: boolean;
}

const initialState: UserState = {
  privateSeed: "",
  publicKey: "",
  loggedIn: false,
  balance: 0,
  transactions: [],
  balanceLoading: true,
  transactionsLoading: true,
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
  extraReducers(builder) {
    builder.addCase(fetchBalance.pending, (state, action) => {
      state.balanceLoading = true;
    });
    builder.addCase(fetchBalance.fulfilled, (state, action) => {
      const { balance } = action.payload as { balance: number };
      state.balance = balance;
      state.balanceLoading = false;
    });
    builder.addCase(fetchBalance.rejected, (state, action) => {
      console.log("Fetch balance failed");
    });
    builder.addCase(fetchTransactions.pending, (state, action) => {
      state.transactionsLoading = true;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      const { transactions } = action.payload as {
        transactions: TransactionHistoryResponse;
      };
      state.transactions = transactions;
      state.transactionsLoading = false;
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      console.log("Fetch transaction failed");
    });

    /*
    [{"amount": 5, "receiver": "123", "sender": "2437345c606c8f843432a05c75641f323433316972530cba16f6941760ccc6f6", "signature": "128be5aa65a51f252afc028fb597047b7a7bb3882273fdae68d1b5e576cf789a0d150af6bbfaee62f5d6da77fdf5ac4a86413d27da86cfee63e4f0c86e7a330c", "timestamp": 1647737385}, {"amount": 5, "receiver": "8389437903df537bfa58f9fd767d191cefab3907b07491cb4e382b0f8b19824d", "sender": "2437345c606c8f843432a05c75641f323433316972530cba16f6941760ccc6f6", "signature": "d1ad454000899d6c7cb6cc204054d7e4bc742662d10180535b5c3888b52ac9164a7c155c357b8de4a5ab2be22abb5704a399a2883119a1cdd4a9ce8fdf12ad0e", "timestamp": 1647737385}, {"amount": 2, "receiver": "8389437903df537bfa58f9fd767d191cefab3907b07491cb4e382b0f8b19824d", "sender": "2437345c606c8f843432a05c75641f323433316972530cba16f6941760ccc6f6", "signature": "6498264e1ede3200a82c6f658c13332f77a83e6965f7860c86250c3ed5555f47214016e409348b67b8fed3c0e1986bbf5124fb3ecc9610963a49240be22b8307", "timestamp": 1647737385}]
    */
  },
});

export const fetchBalance = createAsyncThunk(
  "users/fetchBalance",
  async (_, { getState }) => {
    const {
      users: { publicKey },
    } = getState() as { users: UserState };
    return await sendMessage(balanceMessage(publicKey)).catch((e) =>
      console.log(e)
    );
  }
);

export const fetchTransactions = createAsyncThunk(
  "users/fetchTransactions",
  async (_, { getState }) => {
    const {
      users: { publicKey },
    } = getState() as { users: UserState };
    return await sendMessage(txHistoryMessage(publicKey)).catch((e) =>
      console.log(e)
    );
  }
);

// Actions
export const { setPrivateSeed, setPublicKey, setLoggedIn } = userSlice.actions;

// Selectors
export const selectPrivateSeed = (state: RootState) => state.users.privateSeed;
export const selectPublicKey = (state: RootState) => state.users.publicKey;
export const selectLoggedIn = (state: RootState) => state.users.loggedIn;
export const selectBalance = (state: RootState) => state.users.balance;
export const selectTransactions = (state: RootState) =>
  state.users.transactions;
export const selectTransactionsLoading = (state: RootState) =>
  state.users.transactionsLoading;
export const selectBalanceLoading = (state: RootState) =>
  state.users.balanceLoading;

// Reducer
export default userSlice.reducer;
