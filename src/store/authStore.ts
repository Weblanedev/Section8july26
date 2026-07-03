import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string, phone?: string) => boolean;
  logout: () => void;
}

const USERS_KEY = "section8-users";

function getStoredUsers(): Record<string, { password: string; user: User }> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveUser(email: string, password: string, user: User) {
  const users = getStoredUsers();
  users[email.toLowerCase()] = { password, user };
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (email, password) => {
        const users = getStoredUsers();
        const record = users[email.toLowerCase()];
        if (record && record.password === password) {
          set({ user: record.user, isAuthenticated: true });
          return true;
        }
        return false;
      },

      signup: (name, email, password, phone) => {
        const users = getStoredUsers();
        const key = email.toLowerCase();
        if (users[key]) return false;

        const user: User = {
          id: `user_${Date.now()}`,
          name,
          email: key,
          phone,
          createdAt: new Date().toISOString(),
        };
        saveUser(key, password, user);
        set({ user, isAuthenticated: true });
        return true;
      },

      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "section8-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.user && !state.isAuthenticated) {
          state.isAuthenticated = true;
        }
      },
    }
  )
);
