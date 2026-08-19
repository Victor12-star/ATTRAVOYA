/**
 * ==============================================================================
 * ATTRAVOYA WEB CLIENT - FETCH API CONNECTOR
 * ==============================================================================
 * This is our unified HTTP Client. It is responsible for making requests to our
 * Express server. It automatically includes cross-origin cookies (to pass our
 * HttpOnly JWT session tokens) and formats raw responses into clean JSON data.
 */

// Define the root target for our Express backend server
const BASE_URL = "http://localhost:3000/api";

export const apiClient = {
  /**
   * Core fetch wrapper that standardizes headers, credential inclusions,
   * and exception catches.
   */
  request: async (endpoint, options = {}) => {
    const url = `${BASE_URL}${endpoint}`;
    
    // Set up standard headers
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    // Configure request settings
    const config = {
      ...options,
      headers,
    };

    // Very important: 'include' tells the browser to send our secure HttpOnly cookies
    // to the backend server with this request!
    config.credentials = "include";

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        // Create an error object carrying the server's clean JSON warning
        const error = new Error(data.message || "An error occurred while communicating with the server.");
        error.statusCode = response.status;
        error.errors = data.errors || [];
        throw error;
      }

      return data;
    } catch (err) {
      console.error(`Fetch error on endpoint [${endpoint}]:`, err.message);
      throw err; // Forward error up to our UI error-alert components
    }
  },

  // Helper GET request
  get: (endpoint, options = {}) => {
    return apiClient.request(endpoint, { ...options, method: "GET" });
  },

  // Helper POST request
  post: (endpoint, body, options = {}) => {
    return apiClient.request(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  // Helper PUT request
  put: (endpoint, body, options = {}) => {
    return apiClient.request(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    });
  },

  // Helper DELETE request
  delete: (endpoint, options = {}) => {
    return apiClient.request(endpoint, { ...options, method: "DELETE" });
  }
};

export default apiClient;