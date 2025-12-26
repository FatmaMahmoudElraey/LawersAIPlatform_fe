// src/stores/settings.store.ts - Updated version
import { create, type StateCreator } from "zustand";
import type { AppLang, AppLangShortcut, AppTheme } from "@/helpers/constants/settings.contants";
import { AppLangEnum, AppLangShortcutEnum, AppThemeEnum } from "@/helpers/constants/settings.contants";

export interface SettingsState {
  lang: AppLang;
  langShortcut: AppLangShortcut;
  theme: AppTheme;
  setLang: (lang: AppLang, shortcut: AppLangShortcut) => void;
  setTheme: (theme: AppTheme) => void;
  toggleLanguage: () => void; // New function
}

const getInitialLang = (): { lang: AppLang; shortcut: AppLangShortcut } => {
  if (typeof window === "undefined") {
    return { lang: "English", shortcut: AppLangShortcutEnum.en };
  }
  const cookieLang = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("lang="));
  const value = cookieLang?.split("=")[1];
  if (value === AppLangShortcutEnum.ar) {
    return { lang: "Arabic", shortcut: AppLangShortcutEnum.ar };
  }
  return { lang: "English", shortcut: AppLangShortcutEnum.en };
};

const initial = getInitialLang();

const settingsStateCreator: StateCreator<SettingsState> = (set) => ({
  lang: initial.lang,
  langShortcut: initial.shortcut,
  theme: AppThemeEnum.System,
  
  setLang: (lang: AppLang, shortcut: AppLangShortcut) => {
    if (typeof document !== "undefined") {
      document.cookie = `lang=${shortcut}; path=/`;
      document.documentElement.lang = shortcut;
      document.documentElement.dir = shortcut === AppLangShortcutEnum.ar ? "rtl" : "ltr";
    }
    set({ lang, langShortcut: shortcut });
  },
  
  setTheme: (theme: AppTheme) => set({ theme }),
  
  // NEW: toggleLanguage function
  toggleLanguage: () => {
    set((state) => {
      const newLang = state.lang === "English" ? "Arabic" : "English";
      const newShortcut = newLang === "Arabic" ? AppLangShortcutEnum.ar : AppLangShortcutEnum.en;
      
      // Update cookie and document attributes
      if (typeof document !== "undefined") {
        document.cookie = `lang=${newShortcut}; path=/`;
        document.documentElement.lang = newShortcut;
        document.documentElement.dir = newShortcut === AppLangShortcutEnum.ar ? "rtl" : "ltr";
      }
      
      return { 
        lang: newLang, 
        langShortcut: newShortcut 
      };
    });
  },
});

export const useSettingsStore = create<SettingsState>(settingsStateCreator);