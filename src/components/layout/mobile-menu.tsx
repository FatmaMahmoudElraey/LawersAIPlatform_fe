// src/components/layout/mobile-menu.tsx - Updated
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  Book, 
  Contact, 
  Languages,
  LogIn, 
  UserPlus 
} from 'lucide-react';

interface MobileMenuProps {
  lang: string;
  isAuthenticated: boolean;
  onLanguageToggle: () => void;
}

export default function MobileMenu({ lang, isAuthenticated, onLanguageToggle }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: '/#features', label: 'Features', icon: Home },
    { href: '/#pricing', label: 'Pricing', icon: Users },
    { href: '/#testimonials', label: 'Testimonials', icon: Book },
    { href: '/contact', label: 'Contact', icon: Contact },
  ];

  const getCurrentLanguageName = () => {
    return lang === 'ar' ? 'العربية' : 'English';
  };

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu panel */}
          <div className="fixed top-16 right-0 left-0 bg-background border-b shadow-lg z-50">
            <div className="container mx-auto px-4 py-4">
              {/* Language Toggle Button */}
              <Button
                variant="ghost"
                className="w-full justify-start mb-4"
                onClick={() => {
                  onLanguageToggle();
                  setIsOpen(false);
                }}
              >
                <Languages className="h-4 w-4 mr-3" />
                <div className="flex-1 text-left">
                  <div>Switch Language</div>
                  <div className="text-xs text-muted-foreground">
                    Current: {getCurrentLanguageName()} ({lang.toUpperCase()})
                  </div>
                </div>
              </Button>

              {/* Menu Items */}
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* Auth Buttons */}
              <div className="mt-6 space-y-3">
                <Button asChild className="w-full" variant="ghost">
                  <Link href="/login" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/register" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                    <UserPlus className="h-4 w-4" />
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}