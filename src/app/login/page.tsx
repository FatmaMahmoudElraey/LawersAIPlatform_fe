// src/app/login/page.tsx
import Link from "next/link";
import { Mail, Lock, ArrowRight, Eye } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F6F8F7" }}>
      {/* Header */}
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center mr-3">
              <svg 
                className="h-5 w-5 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-slate-900">LegalAI</span>
          </div>

          <Link
            href="/"
            className="text-sm font-medium text-slate-500 hover:text-slate-700"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        {/* Card */}
        <div className="w-full max-w-md rounded-3xl bg-white shadow-lg border border-slate-100 px-6 py-8 sm:px-8 sm:py-10">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Welcome back
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mb-8">
            Please enter your credentials to access the platform.
          </p>

          {/* Form */}
          <form className="space-y-6">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-3">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />

              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-slate-900">
                  Password
                </label>
                <Link href="/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-700">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  placeholder="········"
                  className="w-full pl-10 pr-12 py-3 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <Eye className="h-5 w-5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-emerald-500 py-3 px-4 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors flex items-center justify-center"
            >
              Login
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>

            {/* Signup Link */}
            <div className="text-center text-sm">
              <p className="text-slate-600">
                New to LegalAI?{" "}
                <Link href="/signup" className="font-semibold text-emerald-600 hover:text-emerald-700">
                  Create Account
                </Link>
              </p>
            </div>

            {/* Divider with text */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-xs text-slate-400">Or continue with</span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="py-3 px-4 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium hover:bg-slate-50 transition-colors"

              >
                Google
              </button>
              <button
                type="button"
                className="py-3 px-4 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium hover:bg-slate-50 transition-colors"
              >
                Github
              </button>
            </div>
          </form>
        </div>
        {/* Security pill under card */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs text-slate-500 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>SOC2 Compliant &amp; AES-256 Encrypted</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white py-6 mt-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-500">
            <Link href="#" className="hover:text-emerald-600">Privacy Policy</Link>
            <Link href="#" className="hover:text-emerald-600">Terms of Service</Link>
            <Link href="#" className="hover:text-emerald-600">Help Center</Link>
          </div>
          <p className="text-xs text-slate-400"> 2023 LegalAI Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}