import PocketBase from "pocketbase";
import { createContext, useContext, useEffect, useState } from "react";

const pb = new PocketBase("http://127.0.0.1:8090");

type AuthContextType = {
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
  pb: PocketBase;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(pb.authStore.record);
  const [token, setToken] = useState<string | null>(pb.authStore.token);

  useEffect(() => {
    // Subscribe to auth store changes
    return pb.authStore.onChange(() => {
      setToken(pb.authStore.token);
      setUser(pb.authStore.record);
    });
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(email, password);

      setUser(authData.record);
      setToken(authData.token);

      return authData;
    } catch (error) {
      // Clear any stale auth data on failed login
      pb.authStore.clear();
      setUser(null);
      setToken(null);
      throw error; // Re-throw so the caller can handle it
    }
  };

  const logout = () => {
    pb.authStore.clear();
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    login,
    logout,
    pb, // Expose pb instance for making requests
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
