import axios from "axios";

export const authApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = (data) => {
  return authApi.post("/register", data);
};

export const loginUser = (data) => {
  return authApi.post("/login", data);
};

export const logoutUser = () => {
  return authApi.post("/logout");
};

export const getCurrentUser = () => {
  return authApi.get("/me");
};