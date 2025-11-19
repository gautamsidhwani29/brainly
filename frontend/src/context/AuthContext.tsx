import { toast } from "react-toastify";
import API from "../api/axios";
import { createContext, useState, useEffect, type ReactNode } from "react";

export interface UserInterface {
  _id: string;
  username: string;
}

interface AuthContextInterface {
  user: UserInterface | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const res = await API.get<{ user: UserInterface }>("/auth/myprofile", {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (error: any) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (username: string, password: string) => {
    try {
      const res = await API.post(
        "/auth/signup",
        { username, password },
        { withCredentials: true }
      );
      toast.success(res.data.message || "Signup Successful!", {
        position: "top-center",
      });
      await loadUser();
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(
          Array.isArray(error.response.data.message)
            ? error.response.data.message.map((m: any) => m.message).join(", ")
            : error.response.data.message,
          { position: "top-center" }
        );
      } else {
        toast.error("Signup failed. Please try again.");
      }
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const res = await API.post(
        "/auth/signin",
        { username, password },
        { withCredentials: true }
      );
      toast.success(res.data.message || "Login Successful!", {
        position: "top-center",
      });
      await loadUser();
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(
          Array.isArray(error.response.data.message)
            ? error.response.data.message.map((m: any) => m.message).join(", ")
            : error.response.data.message,
          { position: "top-center" }
        );
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  const logout = async () => {
    try {
      await API.post("/auth/logout");
      setUser(null);
      toast.success("Logged out successfully", { position: "top-center" });
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ login, signup, loading, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
