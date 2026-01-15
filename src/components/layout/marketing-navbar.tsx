// src/components/layout/marketing-navbar.tsx
'use client'; // Add this since we're using client-side state

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Scale, Globe, Languages } from "lucide-react";
import { useSettingsStore } from "@/stores/settings.store";
import MobileMenu from "./mobile-menu";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuthStore } from '@/stores/auth.store';
import { LocalStorageKeys } from '@/helpers/constants/local-storage.constant';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function MarketingNavbar() {
  const router = useRouter();
  const { lang, langShortcut, toggleLanguage } = useSettingsStore();
  const [isClient, setIsClient] = useState(false);
  const { isAuthenticated, user, logout, setAuth } = useAuthStore();

  // Hydrate auth state from localStorage on mount
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const data = window.localStorage.getItem(LocalStorageKeys.UserAuth);
      if (data) {
        try {
          const auth = JSON.parse(data);
          setAuth(auth);
        } catch {}
      }
    }
  }, [setAuth]);

  const handleLanguageToggle = () => {
    toggleLanguage();
    
    // Update the cookie
    const newLang = langShortcut === 'en' ? 'ar' : 'en';
    document.cookie = `lang=${newLang}; path=/; max-age=${60 * 60 * 24 * 365}`;
    
    // Force a page refresh to apply RTL/LTR changes
    router.refresh();
  };

  const getCurrentLanguageName = () => {
    return langShortcut === 'ar' ? 'العربية' : 'English';
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-transparent pt-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="flex w-full items-center justify-between rounded-full bg-white px-6 py-3 text-sm shadow-lg shadow-emerald-500/5 ring-1 ring-slate-100 dark:bg-slate-950 dark:ring-slate-800">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                LA
              </div>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                LegalAI
              </span>
            </Link>
          </div>

          {/* Center navigation */}
          <div className="hidden items-center gap-8 text-xs font-medium text-slate-400 md:flex">
            <Link
              href="/#features"
              className="transition-colors hover:text-slate-700 dark:hover:text-slate-100"
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              className="transition-colors hover:text-slate-700 dark:hover:text-slate-100"
            >
              Pricing
            </Link>
            <Link
              href="/#testimonials"
              className="transition-colors hover:text-slate-700 dark:hover:text-slate-100"
            >
              Testimonials
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-slate-700 dark:hover:text-slate-100"
            >
              Contact
            </Link>
          </div>

          {/* Right side: language + auth + mobile menu */}
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-300">
            {isClient && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLanguageToggle}
                className="hidden items-center gap-2 px-2 md:inline-flex"
              >
                <Languages className="h-4 w-4" />
                <span>{getCurrentLanguageName()}</span>
                <span className="text-[10px] opacity-70">({langShortcut.toUpperCase()})</span>
              </Button>
            )}

            <div className="hidden items-center gap-3 md:flex">
              {!isAuthenticated ? (
                <>
                  <Button asChild variant="ghost" size="sm" className="px-2">
                    <Link href="/login">Sign in</Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="h-9 rounded-full bg-emerald-500 px-4 text-xs font-semibold text-white hover:bg-emerald-600"
                  >
                    <Link href="/register">Start Free Trial</Link>
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      {user && user.avatar ? (
                        <AvatarImage src={user.avatar} alt={user.name} />
                      ) : (
                        <AvatarFallback>{user?.name?.[0]?.toUpperCase() || '?'}</AvatarFallback>
                      )}
                    </Avatar>
                    <span className="font-medium text-slate-800 dark:text-slate-100">
                      {user?.name}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={logout}>Logout</Button>
                </>
              )}
            </div>
            {/* Mobile menu (icon only on small screens) */}
            <div className="md:hidden">
              <MobileMenu
                lang={isClient ? langShortcut : "en"}
                isAuthenticated={isAuthenticated}
                onLanguageToggle={handleLanguageToggle}
                user={user}
                onLogout={logout}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}