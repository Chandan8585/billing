import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../../../api';

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { signal }) => { // Added signal for abort capability
    try {
      const response = await fetchData("product/productList", { signal });
      return response;
    } catch (error) {
      // You can customize error messages here
      throw new Error('Failed to fetch products');
    }
  }
);

export const fetchProductDetail = createAsyncThunk(
  'products/fetchDetail', 
  async (_id, { signal, rejectWithValue }) => {
    try {
      const response = await fetchData(`product/productList/${_id}`, { signal }); 
      return response.data; // Make sure to return .data if your API wraps responses
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const fetchCategoryList = createAsyncThunk(
  'products/fetchCategoryList',
  async (_, { signal }) => {
    try {
      const response = await fetchData("product/category", { signal });
      return response;
    } catch (error) {
      throw new Error('Failed to fetch categories');
    }
  }
);
export const fetchStoreList = createAsyncThunk(
  'products/fetchCategoryList',
  async (_, { signal }) => {
    try {
      const response = await fetchData("product/category", { signal });
      return response;
    } catch (error) {
      throw new Error('Failed to fetch categories');
    }
  }
);
export const fetchSkuId = createAsyncThunk(
  'products/fetchCategoryList',
  async (_, { signal }) => {
    try {
      const response = await fetchData("product/sku", { signal });
      return response;
    } catch (error) {
      throw new Error('Failed to fetch categories');
    }
  }
);
const productsSlice = createSlice({
    name: 'products',
    initialState: {
    list: [],
    currentProduct: null,
    detailStatus: 'idle',
    detailError: null, // 'idle' | 'loading' | 'succeeded' | 'failed'
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    store: [],
    category: [],

    lastFetched: null

  },
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
      state.detailStatus = 'idle';
      state.detailError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null; 
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
        state.lastFetched = new Date().toISOString();
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductDetail.pending, (state) => {
        state.detailStatus = 'loading';
        state.detailError = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.detailStatus = 'succeeded';
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.detailStatus = 'failed';
        state.detailError = action.payload;
      });
  }
});
export const { clearCurrentProduct } = productsSlice.actions;
export default productsSlice.reducer;