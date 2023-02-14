import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
};

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async () => {
    const response = await axios.get(
      "https://ecommerce-beabb-default-rtdb.europe-west1.firebasedatabase.app/products/-NNp6qW3_iXDNdG0Mkcn.json"
    );

    const loadedProducts = [];
    let reviews = [];
    let ratings = [];

    const data = response.data;

    for (const key in data) {
      if (data[key].reviews) {
        for (const key2 in data[key].reviews) {
          reviews.push({ ...data[key].reviews[key2], id: key2 });
        }

        if (data[key].ratings) {
          for (const key2 in data[key].ratings) {
            ratings.push({ ...data[key].ratings[key2], id: key2 });
          }
        }
      }

      loadedProducts.push({
        key,
        id: data[key].id,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price,
        imageUrl: data[key].imageUrl,
        reviews: reviews,
        ratings: ratings,
      });

      reviews = [];
      ratings = [];
    }

    return loadedProducts;
  }
);

export const addReview = createAsyncThunk(
  "products/addReview",
  async ({ productId, review, productKey }) => {
    await axios.post(
      `https://ecommerce-beabb-default-rtdb.europe-west1.firebasedatabase.app/products/-NNp6qW3_iXDNdG0Mkcn/${productKey}/reviews.json`,
      review
    );

    return { productId, review, productKey };
  }
);

export const addRating = createAsyncThunk(
  "products/addRating",
  async ({ productId, rating, productKey }) => {
    await axios.post(
      `https://ecommerce-beabb-default-rtdb.europe-west1.firebasedatabase.app/products/-NNp6qW3_iXDNdG0Mkcn/${productKey}/ratings.json`,
      rating
    );

    return { productId, rating, productKey };
  }
);

export const updateRating = createAsyncThunk(
  "products/updateRating",
  async ({ productId, rating, productKey, ratingKey }) => {
    await axios.put(
      `https://ecommerce-beabb-default-rtdb.europe-west1.firebasedatabase.app/products/-NNp6qW3_iXDNdG0Mkcn/${productKey}/ratings/${ratingKey}.json`,
      rating
    );

    return { productId, rating, productKey, ratingKey };
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllProducts.pending, (state, action) => {
        console.log("loading...");
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        console.log("error!");
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        console.log("success!");
        state.products = action.payload;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.products = state.products.map((product) => {
          if (product.id === action.payload.productId) {
            if (!product.reviews) {
              product.reviews = [action.payload.review];
            } else {
              product.reviews.push(action.payload.review);
            }
          }
          return product;
        });
      })
      .addCase(addRating.fulfilled, (state, action) => {
        state.products = state.products.map((product) => {
          if (product.id === action.payload.productId) {
            if (!product.ratings) {
              product.ratings = [action.payload.review];
            } else {
              product.ratings.push(action.payload.review);
            }
          }
          return product;
        });
      })
      .addCase(updateRating.fulfilled, (state, action) => {
        state.products = state.products.map((product) => {
          if (product.id === action.payload.productId) {
            product.rating.map((rating) => {
              if (rating.id === action.payload.ratingKey) {
                rating.rating = action.payload.rating.rating;
              }
              return rating;
            });
          }
          return product;
        });
      });
  },
});

export default productsSlice.reducer;
