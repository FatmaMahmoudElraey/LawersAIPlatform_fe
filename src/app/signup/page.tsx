// src/app/signup/page.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { LocalStorageKeys } from '@/helpers/constants/local-storage.constant';

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(4, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(4, "Please confirm your password"),
  languagePreference: z.enum(["en", "ar"]),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      languagePreference: "en",
      terms: false,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    setIsSubmitting(true);

    try {
      const { confirmPassword, terms, ...registrationData } = values;

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...registrationData,
          role: "Student", // Backend expects capitalized role value
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          data && typeof data.message === "string"
            ? data.message
            : Array.isArray(data?.message)
            ? data.message.join("\n")
            : "Registration failed. Please try again.";

        setServerError(message);
        reset({ ...values, password: "", confirmPassword: "" });
        setIsSubmitting(false);
        return;
      }

      // Registration successful - auto-login the user
      const userData = data.data;
      const accessToken = data.accessToken;
      const refreshToken = data.refreshToken;
      
      const user = {
        id: String(userData.id),
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar,
        role: typeof userData.role === 'string' ? userData.role.toLowerCase() : userData.role,
        jobTitle: userData.jobTitle,
        languagePreference: userData.languagePreference,
      };
      
      // Store auth state
      useAuthStore.getState().setAuth({
        isAuthenticated: true,
        role: user.role,
        token: accessToken,
        user,
      });
      
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(LocalStorageKeys.UserAuth, JSON.stringify({
          isAuthenticated: true,
          role: user.role,
          token: accessToken,
          user,
          refreshToken,
        }));
      }
      
      reset();
      
      // Redirect to appropriate dashboard based on role
      if (user.role === "student") {
        router.replace("/student");
      } else if (user.role === "lawyer") {
        router.replace("/lawyer");
      } else {
        router.replace("/");
      }
    } catch (error) {
      setServerError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  });

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
            Create an account
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mb-8">
            Start your free 14-day trial. No credit card required.
          </p>

          {/* Form */}
          <form className="space-y-6" onSubmit={onSubmit} noValidate>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-3">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="John Doe"
                  autoComplete="name"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 bg-slate-100 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  {...register("name")}
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

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
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 bg-slate-100 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-3">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="········"
                  autoComplete="new-password"
                  className="w-full pl-10 pr-10 py-3 rounded-lg border border-slate-200 bg-slate-100 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-3">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="········"
                  autoComplete="new-password"
                  className="w-full pl-10 pr-10 py-3 rounded-lg border border-slate-200 bg-slate-100 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Language Preference */}
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-3">
                Language Preference
              </label>
              <select
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-100 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                {...register("languagePreference")}
              >
                <option value="en">English</option>
                <option value="ar">العربية (Arabic)</option>
              </select>
              {errors.languagePreference && (
                <p className="mt-2 text-sm text-red-600">{errors.languagePreference.message}</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded mt-1"
                {...register("terms")}
              />
              <label htmlFor="terms" className="ml-2 text-sm text-slate-600">
                I agree to the{" "}
                <Link href="#" className="text-emerald-600 hover:text-emerald-700">
                  Terms of Service
                </Link>
                {" and "}
                <Link href="#" className="text-emerald-600 hover:text-emerald-700">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-600">{errors.terms.message}</p>
            )}

            {/* Server error message */}
            {serverError && (
              <div className="rounded-lg bg-red-50 p-4">
                <p className="text-sm text-red-600">{serverError}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-emerald-500 py-3 px-4 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating account..." : "Create Account"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>

            {/* Login Link */}
            <div className="text-center text-sm">
              <p className="text-slate-600">
                Already a member?{" "}
                <Link href="/login" className="text-emerald-600 font-semibold hover:text-emerald-700">
                  Login
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
            {/* <div className="grid grid-cols-2 gap-4">
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
            </div> */}
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
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:justify-between">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-500">
            <Link href="#" className="hover:text-emerald-600">Privacy Policy</Link>
            <Link href="#" className="hover:text-emerald-600">Terms of Service</Link>
            <Link href="#" className="hover:text-emerald-600">Help Center</Link>
          </div>
          <p className="text-xs text-slate-400">© 2023 LegalAI Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
