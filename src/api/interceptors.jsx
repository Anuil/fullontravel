import axiosInstance from "./axiosInstance";

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Attach token or any other headers here
    const token = 123;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;

// Response interceptor for handling token expiration
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const refreshResponse = await axiosInstance.post(
            "https://api.example.com/refresh-token"
          );

          const newToken = refreshResponse.data.token;
          localStorage.setItem("token", newToken);
          //set token wherever you want

          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } catch (err) {
          // Handle refresh token failure (e.g., redirect to login)
          window.location.href = "/login";
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
