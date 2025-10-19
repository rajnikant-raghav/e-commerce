import { configureStore } from "@reduxjs/toolkit";
import reducer from "./productsSlice";
export const store = configureStore({
    reducer: {
        products: reducer
    },
});