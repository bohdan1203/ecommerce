import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cart: [],
  showCart: false,
};

export const getUserCart = createAsyncThunk(
  "cart/getUserCart",
  async (cartId) => {
    const response = await axios.get(
      `https://ecommerce-beabb-default-rtdb.europe-west1.firebasedatabase.app/carts/${cartId}/cart.json`
    );

    const data = response.data;
    const loadedCart = [];

    for (const key in data) {
      if (data[key]) {
        loadedCart.push({ id: key, quantity: data[key].quantity });
      }
    }

    return loadedCart;
  }
);

export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async ({ productId, cartId }) => {
    await axios.put(
      `https://ecommerce-beabb-default-rtdb.europe-west1.firebasedatabase.app/carts/${cartId}/cart/${productId}.json`,
      { quantity: 1 }
    );

    return { id: productId, quantity: 1 };
  }
);

export const deleteProductFromCart = createAsyncThunk(
  "cart/deleteProductFromCart",
  async ({ productId, cartId }) => {
    await axios.delete(
      `https://ecommerce-beabb-default-rtdb.europe-west1.firebasedatabase.app/carts/${cartId}/cart/${productId}.json`
    );

    return productId;
  }
);

export const changeQuantity = createAsyncThunk(
  "cart/changeQuantity",
  async ({ productId, cartId, newQuantity }) => {
    await axios.put(
      `https://ecommerce-beabb-default-rtdb.europe-west1.firebasedatabase.app/carts/${cartId}/cart/${productId}.json`,
      { quantity: newQuantity }
    );

    return { id: productId, quantity: newQuantity };
  }
);

export const emptyCart = createAsyncThunk("cart/emptyCart", async (cartId) => {
  await axios.delete(
    `https://ecommerce-beabb-default-rtdb.europe-west1.firebasedatabase.app/carts/${cartId}/cart.json`
  );

  return [];
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart(state, action) {
      if (!action.payload) {
        state.showCart = !state.showCart;
      } else {
        state.showCart = action.payload;
      }
    },
    resetCartState(state) {
      state.cart = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.cart.push(action.payload);
      })
      .addCase(deleteProductFromCart.fulfilled, (state, action) => {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      })
      .addCase(changeQuantity.fulfilled, (state, action) => {
        state.cart = state.cart.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity = action.payload.quantity;
          }
          return item;
        });
      })
      .addCase(emptyCart.fulfilled, (state, action) => {
        console.log("delete?");
        state.cart = action.payload;
      });
  },
});

export const { toggleCart, resetCartState } = cartSlice.actions;

export default cartSlice.reducer;
