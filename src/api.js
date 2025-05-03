// src/services/api.js
import { base_url } from "./environment";

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'API request failed');
  }
  const jsonData = await response.json();
  console.log("Parsed Data:", jsonData); // <--- Add this
  return jsonData;
};


export const fetchData = async (endpoint, options = {}) => {
  const response = await fetch(`${base_url}/${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Include other headers if needed, like authorization
    },
    ...options, // Merge signal or any other options
  });
  console.log("Response:", response);
  return handleResponse(response);
};


// Add other API calls similarly
export const createCustomer = async (customerData) => {
  const response = await fetch(`${base_url}/api/customer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customerData),
  });
  return handleResponse(response);
};