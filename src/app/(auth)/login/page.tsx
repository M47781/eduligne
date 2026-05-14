"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Facebook, Instagram, Rss } from "lucide-react";
import { useAuth } from "@/stores/useAuthStore";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = login(email, password);
    if (result.success && result.role) {
      const routes: Record<string, string> = {
        teacher: "/teacher/dashboard",
        admin: "/admin/dashboard",
        parent: "/parent/dashboard",
        student: "/student/dashboard",
      };
      router.push(routes[result.role] || "/student/dashboard");
    } else {
      setError(result.error || "خطأ في تسجيل الدخول");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <Link href="/" className="flex justify-center items-center gap-2 mb-8 group">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <Image 
              src="/logo.png" 
              alt="Eduligne Logo" 
              width={48} 
              height={48} 
              className="object-contain"
              priority
            />
          </div>
          <span className="font-black text-3xl text-slate-900">
            Edu<span className="text-indigo-600">ligne</span>
          </span>
        </Link>
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 mb-2">
          تسجيل الدخول
        </h2>
        <p className="text-center text-sm text-slate-600">
          مرحباً بك في منصة Eduligne التعليمية
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-8 shadow-xl shadow-slate-200/50 sm:rounded-3xl border border-slate-100">
          {/* Demo accounts hint */}
          <div className="mb-6 p-4 rounded-xl bg-indigo-50 border border-indigo-100">
            <p className="text-xs font-bold text-indigo-800 mb-2">🔑 حسابات تجريبية:</p>
            <div className="space-y-1 text-xs text-indigo-700">
              <p><span className="font-mono bg-indigo-100 px-1.5 py-0.5 rounded">student@edu.dz</span> — طالب</p>
              <p><span className="font-mono bg-indigo-100 px-1.5 py-0.5 rounded">teacher@edu.dz</span> — أستاذ</p>
              <p><span className="font-mono bg-indigo-100 px-1.5 py-0.5 rounded">parent@edu.dz</span> — ولي أمر</p>
              <p><span className="font-mono bg-indigo-100 px-1.5 py-0.5 rounded">admin@edu.dz</span> — مشرف</p>
              <p className="text-indigo-500 mt-1">كلمة المرور: أي شيء</p>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-xl border-slate-200 py-3 pl-4 pr-12 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50 focus:bg-white transition-colors outline-none border"
                  placeholder="example@domain.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-xl border-slate-200 py-3 pl-4 pr-12 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50 focus:bg-white transition-colors outline-none border"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="mr-2 block text-sm text-slate-700">
                  تذكرني
                </label>
              </div>
              <Link href="/forgot-password" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                نسيت كلمة المرور؟
              </Link>
            </div>
            <button
              type="submit"
              className="flex w-full justify-center items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
            >
              تسجيل الدخول <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600">
              ليس لديك حساب؟{" "}
              <Link href="/register-type" className="font-bold text-indigo-600 hover:text-indigo-500">
                إنشاء حساب جديد
              </Link>
            </p>
          </div>

          {/* Social Links */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-center text-xs text-slate-400 mb-4">تابعونا على</p>
            <div className="flex justify-center gap-3">
              <a
                href="https://www.facebook.com/eduligne.dz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
              >
                <Facebook className="w-4 h-4 shrink-0" />
              </a>
              <a
                href="https://www.instagram.com/eduligne.dz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:border-pink-300 hover:text-pink-600 hover:bg-pink-50 transition-all"
              >
                <Instagram className="w-4 h-4 shrink-0" />
              </a>
              <a
                href="https://eduligne.blogspot.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50 transition-all"
              >
                <Rss className="w-4 h-4 shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
