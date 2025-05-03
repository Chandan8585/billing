import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import themeSettingSlice from './themeSettingSlice';
import productReducer from './slice/productsSlice';
import { productApi } from './api/productApi';
import { categoryApi } from './api/categoryApi';

const store = configureStore({
  reducer: { 
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    productReducer: productReducer,
    rootReducer: rootReducer,
    themeSetting: themeSettingSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      categoryApi.middleware
    ),
});

export default store;