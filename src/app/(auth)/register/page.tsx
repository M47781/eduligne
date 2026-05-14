"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpen, Mail, Lock, User, Phone, ArrowRight } from "lucide-react";
import { useAuth } from "@/stores/useAuthStore";
import type { UserRole } from "@/lib/types";

export default function RegisterForm() {
  const searchParams = useSearchParams();
  const type = (searchParams.get("type") || "student") as UserRole;
  const router = useRouter();
  const { register } = useAuth();
  const [error, setError] = useState("");

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    const result = register(name, email, type);
    if (result.success) {
      const routes: Record<string, string> = { teacher: "/teacher/dashboard", admin: "/admin/dashboard", parent: "/parent/dashboard", student: "/student/dashboard" };
      router.push(routes[type] || "/student/dashboard");
    } else {
      setError(result.error || "حدث خطأ");
    }
  };

  const getTitle = () => {
    switch (type) {
      case "teacher": return "حساب أستاذ جديد";
      case "parent": return "حساب ولي أمر جديد";
      default: return "حساب تلميذ جديد";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
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
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 mb-2">{getTitle()}</h2>
        <p className="text-center text-sm text-slate-600">أدخل بياناتك لإنشاء حسابك الجديد</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-8 shadow-xl shadow-slate-200/50 sm:rounded-3xl border border-slate-100">
          {error && <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">{error}</div>}
          <form className="space-y-5" onSubmit={handleRegister}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">الاسم الكامل</label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none"><User className="h-5 w-5 text-slate-400" /></div>
                <input id="name" name="name" type="text" required className="block w-full rounded-xl border-slate-200 py-3 pl-4 pr-12 text-slate-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50 focus:bg-white transition-colors outline-none border" placeholder="أدخل اسمك الكامل" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">البريد الإلكتروني</label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-slate-400" /></div>
                <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-xl border-slate-200 py-3 pl-4 pr-12 text-slate-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50 focus:bg-white transition-colors outline-none border" placeholder="example@domain.com" />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">رقم الهاتف</label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none"><Phone className="h-5 w-5 text-slate-400" /></div>
                <input id="phone" name="phone" type="tel" className="block w-full rounded-xl border-slate-200 py-3 pl-4 pr-12 text-slate-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50 focus:bg-white transition-colors outline-none border text-left" placeholder="0555 123 456" dir="ltr" />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">كلمة المرور</label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-slate-400" /></div>
                <input id="password" name="password" type="password" required className="block w-full rounded-xl border-slate-200 py-3 pl-4 pr-12 text-slate-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50 focus:bg-white transition-colors outline-none border" placeholder="••••••••" />
              </div>
            </div>
            <div className="pt-2">
              <button type="submit" className="flex w-full justify-center items-center gap-2 rounded-xl bg-primary-600 px-4 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors">
                إنشاء الحساب <ArrowRight   className="w-4 h-4 shrink-0"/>
              </button>
            </div>
          </form>
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600">
              بالتسجيل، أنت توافق على{" "}<Link href="/terms" className="font-bold text-primary-600 hover:text-primary-500">شروط الاستخدام</Link>{" "}و{" "}<Link href="/privacy" className="font-bold text-primary-600 hover:text-primary-500">سياسة الخصوصية</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
