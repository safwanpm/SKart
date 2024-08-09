import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch cart details
export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId) => {
    try {
        const response = await axios.post('http://localhost:4005/cart/viewCart', { userId });
        console.log(response); // Optional: remove in production
        return response.data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
});


// Async thunk to add item to cart
export const addCart = createAsyncThunk('cart/addCart', async ({ userId, productId, productname }) => {
    try {
        const response = await axios.post('http://localhost:4005/cart/addCart', { userId, productId, productname });
        return response.data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
});


// Async thunk to remove item from cart
export const deleteCart = createAsyncThunk('cart/deleteCart', async ({ userId, productId }) => {
    try {
        const response = await axios.post('http://localhost:4005/cart/deleteCart', { userId, productId });
        return response.data;
    } catch (error) {
        console.error('Error removing from cart:', error);
        throw error;
    }
});
export const decrementquantity = createAsyncThunk('cart/decrement', async ({ userId, productId }) => {
    try {
        const response = await axios.post('http://localhost:4005/cart/decrement', { userId, productId: productId });
        return response.data;
    } catch (error) {
        console.error('Error removing from cart:', error);
        throw error;
    }
});
export const incrementquantity = createAsyncThunk('cart/increment', async ({ userId, productId }) => {
    try {
        const response = await axios.post('http://localhost:4005/cart/increment', { userId, productId: productId });
        return response.data;
    } catch (error) {
        console.error('Error removing from cart:', error);
        throw error;
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        incart: {}, // Tracks whether an item is in cart or not
        totalQuantity: 0,
        status: 'idle',
        error: null,
    },
    reducers: {
        setInCart(state, action) {
            const { productId, isInCart } = action.payload;
            state.incart[productId] = isInCart;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.data; // Assuming data contains products
                state.totalQuantity = action.payload.totalQuantity; // Update totalQuantity from backend response
                // Initialize incart state based on fetched items
                state.incart = {};
                state.items.forEach(item => {
                    state.incart[item.productId] = true; // Assuming item.productId is the correct ID
                });
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })


            .addCase(addCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.updatedCart; // Ensure your backend returns this
                state.totalQuantity += 1;
                state.incart[action.payload.productId] = true; // Ensure productId is returned
            })
            .addCase(addCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.data; // Assuming data contains updated cart items
                state.totalQuantity -= 1; // Decrement totalQuantity upon successful removal from cart
                state.incart[action.payload.productId] = false; // Mark item as not in cart
            })
            .addCase(deleteCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(decrementquantity.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.data; // Assuming data contains updated cart items
                state.totalQuantity -= 1; // Decrement totalQuantity upon successful removal from cart
                state.incart[action.payload.productId] = false; // Mark item as not in cart
            })
            .addCase(decrementquantity.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(incrementquantity.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.data; // Assuming data contains updated cart items
                state.totalQuantity += 1; // Decrement totalQuantity upon successful removal from cart
                state.incart[action.payload.productId] = false; // Mark item as not in cart
            })
            .addCase(incrementquantity.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })



    }
});

export const { setInCart } = cartSlice.actions;

export default cartSlice.reducer;