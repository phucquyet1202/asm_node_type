import { configureStore } from "@reduxjs/toolkit";
import productApi from "../api/product";
import categoryApi from "../api/category";
import authApi from "../api/user";
import cartApi from "../api/cart";
import searchSlice from "../slices/search";
const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    search: searchSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({})
      .concat(productApi.middleware)
      .concat(categoryApi.middleware)
      .concat(authApi.middleware)
      .concat(cartApi.middleware),
});
export default store;
