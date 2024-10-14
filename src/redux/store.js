import { configureStore } from "@reduxjs/toolkit";
import coinsReducer from "./coinsReducer.js";

export const store = configureStore({
    reducer: {
        coins: coinsReducer,
    },
})
