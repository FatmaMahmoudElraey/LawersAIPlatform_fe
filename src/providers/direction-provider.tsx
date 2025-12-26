// src/providers/direction-provider.tsx - Updated to use your actual store
'use client';

import { createContext, useContext, useEffect } from 'react';
import { useSettingsStore } from '@/stores/settings.store'; // Changed from useLanguageStore
import { AppLangShortcutEnum } from '@/helpers/constants/settings.contants';

interface DirectionContextType {
  direction: 'ltr' | 'rtl';
  toggleDirection: () => void;
}

const DirectionContext = createContext<DirectionContextType | undefined>(undefined);

export function DirectionProvider({ children }: { children: React.ReactNode }) {
  const { langShortcut, toggleLanguage } = useSettingsStore(); // Use your actual store

  // Calculate direction based on language shortcut
  const direction = langShortcut === AppLangShortcutEnum.ar ? 'rtl' : 'ltr';

  useEffect(() => {
    // Update document direction and language
    document.documentElement.dir = direction;
    document.documentElement.lang = langShortcut;
    
    // Update Tailwind direction class
    document.documentElement.classList.remove('ltr', 'rtl');
    document.documentElement.classList.add(direction);
  }, [direction, langShortcut]);

  // Use the toggleLanguage function from your settings store
  const toggleDirection = () => {
    toggleLanguage();
  };

  return (
    <DirectionContext.Provider value={{ direction, toggleDirection }}>
      {children}
    </DirectionContext.Provider>
  );
}

export function useDirection() {
  const context = useContext(DirectionContext);
  if (context === undefined) {
    throw new Error('useDirection must be used within a DirectionProvider');
  }
  return context;
}