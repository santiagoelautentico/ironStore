import { configureStore } from "@reduxjs/toolkit";
import coinsReducer from "./coinsReducer.js";
import transactionsReducer from "./transactionReducer.js";
import usernameReducer from "./userName.js";

export const store = configureStore({
  reducer: {
    coins: coinsReducer,
    transactions: transactionsReducer,
    username: usernameReducer,
    
  },
});
