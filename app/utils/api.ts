import axios from "axios";
import { toast } from "sonner";

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorResponse = {
      message: "Something went wrong",
      statusCode: error.response?.status || 500,
      errorCode: error.response?.data?.error || "UNKNOWN_ERROR",
    };

    if (error.response) {
      errorResponse.message =
        error.response.data?.message || "Server error occurred";

      switch (error.response.status) {
        case 400:
          errorResponse.message = error.response.data?.message || "Bad request";
          break;
        case 401:
          errorResponse.message = "Unauthorized. Please login again.";

          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
          break;
        case 403:
          errorResponse.message =
            "You do not have permission to perform this action";
          break;
        case 404:
          errorResponse.message =
            error.response.data?.message || "Resource not found";
          break;
        case 429:
          errorResponse.message = "Too many requests. Please try again later.";
          break;
        case 500:
          errorResponse.message = "Server error. Please try again later.";
          break;
        default:
          errorResponse.message =
            error.response.data?.message || "An error occurred";
      }
    } else if (error.request) {
      errorResponse.message = "Network error. Please check your connection.";
      errorResponse.statusCode = 0;
    }

    toast.error(errorResponse.message);

    return Promise.reject(errorResponse);
  }
);

export default api;
