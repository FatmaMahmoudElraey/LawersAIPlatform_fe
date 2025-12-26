import { create } from "zustand";

export type UserRole = "student" | "lawyer" | "firm" | null;

export interface AuthState {
  isAuthenticated: boolean;
  role: UserRole;
  token?: string;
  setAuth: (payload: { isAuthenticated: boolean; role: UserRole; token?: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  role: null,
  token: undefined,
  setAuth: ({ isAuthenticated, role, token }) =>
    set(() => ({ isAuthenticated, role, token })),
  logout: () => set({ isAuthenticated: false, role: null, token: undefined }),
}));
