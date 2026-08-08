import { createContext, useState, useContext, useEffect } from "react";

import { apiRequest } from "../services/movieApi";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ============================
  // CHECK AUTHENTICATION
  // ============================
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("cineverseUser");

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        const response = await apiRequest.get("/auth/me");

        if (response.data?.success && response.data?.user) {
          const currentUser = response.data.user;

          setUser(currentUser);

          localStorage.setItem("cineverseUser", JSON.stringify(currentUser));
        }
      } catch (error) {
        if (error.response?.status !== 401) {
          console.error("Auth check error:", error);
        }

        setUser(null);
        localStorage.removeItem("cineverseUser");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // ============================
  // REGISTER
  // ============================
  const register = async (username, email, password) => {
    try {
      const response = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });

      if (response.data?.success) {
        const registeredUser = response.data.user;

        setUser(registeredUser);

        localStorage.setItem("cineverseUser", JSON.stringify(registeredUser));

        return {
          success: true,
          user: registeredUser,
        };
      }

      return {
        success: false,
        message: response.data?.message || "Registration failed",
      };
    } catch (error) {
      console.error("Registration error:", error);

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
      };
    }
  };

  // ============================
  // LOGIN
  // ============================
  const login = async (username, password) => {
    try {
      const response = await apiRequest.post("/auth/login", {
        username,
        password,
      });

      if (response.data?.success) {
        const loggedInUser = response.data.user;

        setUser(loggedInUser);

        localStorage.setItem("cineverseUser", JSON.stringify(loggedInUser));

        return {
          success: true,
          user: loggedInUser,
        };
      }

      return {
        success: false,
        message: response.data?.message || "Login failed",
      };
    } catch (error) {
      console.error("Login error:", error);

      return {
        success: false,
        message:
          error.response?.data?.message || "Invalid username or password",
      };
    }
  };

  // ============================
  // LOGOUT
  // ============================
  const logout = async () => {
    try {
      await apiRequest.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("cineverseUser");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
