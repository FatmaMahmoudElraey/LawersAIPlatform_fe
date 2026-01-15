import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type UserRole = "student" | "lawyer" | "firm" | null;

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
}

export interface AuthState {
  isAuthenticated: boolean;
  role: UserRole;
  token?: string;
  user?: UserInfo | null;
  setAuth: (payload: { isAuthenticated: boolean; role: UserRole; token?: string; user?: UserInfo | null }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      role: null,
      token: undefined,
      user: null,
      setAuth: ({ isAuthenticated, role, token, user }) =>
        set(() => ({ isAuthenticated, role, token, user })),
      logout: () => {
        set({ isAuthenticated: false, role: null, token: undefined, user: null });
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem('auth');
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
