import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        return data;
    }
)
const initialState = {
    products: [],
    loading: false,
    error: null,
    cart: []

};

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        // addItem: (state, action) => {
        //     state.products.push(action.payload);
        // }
        addToCart: (state, action) => {
            state.cart.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        })
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            }).addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    },
});
export default productsSlice.reducer

export const { addToCart } = productsSlice.actions