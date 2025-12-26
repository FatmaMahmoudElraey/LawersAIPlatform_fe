import { create, type StateCreator } from "zustand";

export interface UIState {
  isSidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const uiStateCreator: StateCreator<UIState> = (set) => ({
  isSidebarCollapsed: false,
  setSidebarCollapsed: (collapsed: boolean) => set({ isSidebarCollapsed: collapsed }),
});

export const useUIStore = create<UIState>(uiStateCreator);
