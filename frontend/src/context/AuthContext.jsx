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
        // Check for stored token and user
        const storedToken = localStorage.getItem("cineverseToken");
        const storedUser = localStorage.getItem("cineverseUser");

        // If we have a token but no user, fetch user data
        if (storedToken) {
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }

          // Always verify token with backend
          const response = await apiRequest.get("/auth/me");

          if (response.data?.success && response.data?.user) {
            const currentUser = response.data.user;
            setUser(currentUser);
            localStorage.setItem("cineverseUser", JSON.stringify(currentUser));
          } else {
            // If verification fails, clear everything
            setUser(null);
            localStorage.removeItem("cineverseToken");
            localStorage.removeItem("cineverseUser");
          }
        } else {
          // No token, clear user
          setUser(null);
          localStorage.removeItem("cineverseUser");
        }
      } catch (error) {
        if (error.response?.status !== 401) {
          console.error("Auth check error:", error);
        }
        
        // Clear everything on error
        setUser(null);
        localStorage.removeItem("cineverseToken");
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
        const token = response.data.token;

        setUser(registeredUser);
        
        // Store both user and token
        localStorage.setItem("cineverseUser", JSON.stringify(registeredUser));
        localStorage.setItem("cineverseToken", token);

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
        const token = response.data.token;

        setUser(loggedInUser);
        
        // Store both user and token
        localStorage.setItem("cineverseUser", JSON.stringify(loggedInUser));
        localStorage.setItem("cineverseToken", token);

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
      // Clear everything
      setUser(null);
      localStorage.removeItem("cineverseUser");
      localStorage.removeItem("cineverseToken");
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