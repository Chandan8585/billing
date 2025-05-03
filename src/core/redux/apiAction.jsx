import { fetchData } from '../../api';
import {
  set_product_list,
  setdashboard_recentproduct,
  // import all other setters...
} from './initial.value';

// Async action to fetch product list
export const fetchProducts = () => async (dispatch) => {
  try {
    const data = await fetchData("product");
    dispatch(set_product_list(data));
  } catch (error) {
    console.error("Failed to fetch products:", error);
    // You might want to dispatch an error action here
  }
};

// Async action to fetch recent products
export const fetchRecentProducts = () => async (dispatch) => {
  try {
    const data = await fetchData("recent-products");
    dispatch(setdashboard_recentproduct(data));
  } catch (error) {
    console.error("Failed to fetch recent products:", error);
  }
};

// Create similar async actions for all your data endpoints