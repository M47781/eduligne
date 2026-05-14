"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Lock, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ResetPasswordPage() {
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setDone(true); };

  if (done) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2   className="w-6 h-6 shrink-0"/></div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">تم تغيير كلمة المرور بنجاح</h2>
          <p className="text-slate-500 mb-8">يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.</p>
          <Link href="/login" className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors">تسجيل الدخول</Link>
        </div>
      </div>
    );
  }

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
        <h2 className="text-center text-3xl font-bold text-slate-900 mb-2">إعادة تعيين كلمة المرور</h2>
        <p className="text-center text-sm text-slate-600">أدخل كلمة المرور الجديدة</p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-8 shadow-xl shadow-slate-200/50 sm:rounded-3xl border border-slate-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">كلمة المرور الجديدة</label>
              <div className="relative"><div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-slate-400" /></div><input id="password" type="password" required className="block w-full rounded-xl border-slate-200 py-3 pl-4 pr-12 text-slate-900 focus:ring-2 focus:ring-primary-500 bg-slate-50 focus:bg-white outline-none border" placeholder="••••••••" /></div>
            </div>
            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-slate-700 mb-2">تأكيد كلمة المرور</label>
              <div className="relative"><div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-slate-400" /></div><input id="confirm" type="password" required className="block w-full rounded-xl border-slate-200 py-3 pl-4 pr-12 text-slate-900 focus:ring-2 focus:ring-primary-500 bg-slate-50 focus:bg-white outline-none border" placeholder="••••••••" /></div>
            </div>
            <button type="submit" className="flex w-full justify-center items-center gap-2 rounded-xl bg-primary-600 px-4 py-3.5 text-sm font-bold text-white hover:bg-primary-700 transition-colors">حفظ كلمة المرور <ArrowRight   className="w-4 h-4 shrink-0"/></button>
          </form>
        </div>
      </div>
    </div>
  );
}
