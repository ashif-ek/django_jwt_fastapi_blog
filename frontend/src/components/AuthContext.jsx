import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => {
    const raw = window.localStorage.getItem("auth");
    if (!raw) return { user: null, access: null, refresh: null };
    try {
      return JSON.parse(raw);
    } catch {
      return { user: null, access: null, refresh: null };
    }
  });

  useEffect(() => {
    window.localStorage.setItem("auth", JSON.stringify(authState));
  }, [authState]);

  async function login(username, password) {
    const { data } = await api.post("auth/token/", { username, password });
    setAuthState((prev) => ({
      ...prev,
      access: data.access,
      refresh: data.refresh,
      user: { username },
    }));
  }

  function logout() {
    setAuthState({ user: null, access: null, refresh: null });
  }

  const value = {
    ...authState,
    isAuthenticated: Boolean(authState.access),
    login,
    logout,
    setAuthState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
