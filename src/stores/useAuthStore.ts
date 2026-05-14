"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { User, UserRole } from "@/lib/types";

// ─── Pre-built demo accounts ────────────────────────────────────────────────
const DEMO_ACCOUNTS: Record<string, User> = {
  "student@edu.dz": { id: "u1", name: "أحمد بن علي", email: "student@edu.dz", role: "student", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed", phone: "0555111222", subscription: "pro", xp: 8450, level: 12, badges: ["early-adopter", "quiz-master", "streak-7"], createdAt: "2025-09-01" },
  "teacher@edu.dz": { id: "u2", name: "د. ليلى عمر", email: "teacher@edu.dz", role: "teacher", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leila", phone: "0555333444", subscription: "pro", xp: 0, level: 0, badges: [], createdAt: "2025-08-15" },
  "parent@edu.dz": { id: "u3", name: "محمد الأمين", email: "parent@edu.dz", role: "parent", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohamed", phone: "0555555666", subscription: "free", xp: 0, level: 0, badges: [], createdAt: "2025-10-01" },
  "admin@edu.dz": { id: "u4", name: "المشرف العام", email: "admin@edu.dz", role: "admin", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin", phone: "0555777888", subscription: "pro", xp: 0, level: 0, badges: [], createdAt: "2025-01-01" },
};

const STORAGE_KEY = "edutech_auth_user";

// ─── Auth state shape ────────────────────────────────────────────────────────
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; role?: UserRole; error?: string };
  register: (name: string, email: string, role: UserRole) => { success: boolean; error?: string };
  logout: () => void;
  updateUser: (partial: Partial<User>) => void;
  addXP: (amount: number) => void;
}

// ─── React Context ───────────────────────────────────────────────────────────
export const AuthContext = createContext<AuthState | null>(null);

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

// ─── Hook that powers the provider ──────────────────────────────────────────
export function useAuthState(): AuthState {
  const [user, setUser] = useState<User | null>(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  // Persist whenever user changes
  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  const login = useCallback((email: string, _password: string) => {
    const account = DEMO_ACCOUNTS[email.toLowerCase()];
    if (account) {
      setUser(account);
      return { success: true, role: account.role };
    }
    // Check localStorage for registered users
    try {
      const stored = localStorage.getItem("edutech_registered_users");
      if (stored) {
        const users: User[] = JSON.parse(stored);
        const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
        if (found) { setUser(found); return { success: true, role: found.role }; }
      }
    } catch { /* ignore */ }
    return { success: false, error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" };
  }, []);

  const register = useCallback((name: string, email: string, role: UserRole) => {
    if (DEMO_ACCOUNTS[email.toLowerCase()]) return { success: false, error: "هذا البريد مسجل بالفعل" };
    const newUser: User = {
      id: `u_${Date.now()}`, name, email, role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      subscription: "free", xp: 0, level: 1, badges: [], createdAt: new Date().toISOString(),
    };
    // Store in registered users list
    try {
      const stored = localStorage.getItem("edutech_registered_users");
      const users: User[] = stored ? JSON.parse(stored) : [];
      users.push(newUser);
      localStorage.setItem("edutech_registered_users", JSON.stringify(users));
    } catch { /* ignore */ }
    setUser(newUser);
    return { success: true };
  }, []);

  const logout = useCallback(() => { setUser(null); }, []);

  const updateUser = useCallback((partial: Partial<User>) => {
    setUser((prev) => prev ? { ...prev, ...partial } : null);
  }, []);

  const addXP = useCallback((amount: number) => {
    setUser((prev) => {
      if (!prev) return null;
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 1000) + 1;
      return { ...prev, xp: newXP, level: newLevel };
    });
  }, []);

  return { user, isAuthenticated: !!user, login, register, logout, updateUser, addXP };
}
