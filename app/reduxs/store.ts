import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./product/productSlice";
import authReducer from "./auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
