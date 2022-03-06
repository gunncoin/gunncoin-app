import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./slices/usersSlice";
import uiReducer from "./slices/uiSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    UI: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
