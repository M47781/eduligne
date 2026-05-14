"use client";

import { User, Mail, Phone, BookOpen, Save } from "lucide-react";
import { useAuth } from "@/stores/useAuthStore";
import { useToast } from "@/components/providers/ToastProvider";
import Image from "next/image";

export default function TeacherProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSave = (e: React.FormEvent) => { e.preventDefault(); toast("تم حفظ الملف الشخصي", "success"); };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div><h1 className="text-2xl font-black text-slate-900 mb-2">الملف الشخصي</h1><p className="text-slate-500">إدارة معلومات حسابك</p></div>
      <div className="bg-white rounded-3xl border border-slate-200 p-8">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-200">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-primary-50 border-2 border-primary-100">
            {user?.avatar && <Image src={user.avatar} alt="Profile" width={80} height={80} className="w-full h-full object-cover" />}
          </div>
          <div><h2 className="text-xl font-bold text-slate-900">{user?.name || "الأستاذ"}</h2><p className="text-sm text-slate-500">{user?.email}</p><span className="inline-block mt-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg">أستاذ</span></div>
        </div>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div><label className="block text-sm font-bold text-slate-700 mb-2">الاسم الكامل</label><div className="relative"><User  className="w-4 h-4 shrink-0 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" /><input defaultValue={user?.name} className="w-full rounded-xl border border-slate-200 py-3 px-4 pr-10 bg-slate-50 outline-none focus:ring-2 focus:ring-primary-500" /></div></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-2">البريد الإلكتروني</label><div className="relative"><Mail  className="w-4 h-4 shrink-0 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" /><input defaultValue={user?.email} className="w-full rounded-xl border border-slate-200 py-3 px-4 pr-10 bg-slate-50 outline-none focus:ring-2 focus:ring-primary-500" /></div></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-2">رقم الهاتف</label><div className="relative"><Phone  className="w-4 h-4 shrink-0 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" /><input defaultValue={user?.phone} className="w-full rounded-xl border border-slate-200 py-3 px-4 pr-10 bg-slate-50 outline-none focus:ring-2 focus:ring-primary-500" dir="ltr" /></div></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-2">التخصص</label><div className="relative"><BookOpen  className="w-4 h-4 shrink-0 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" /><input defaultValue="تطوير الويب" className="w-full rounded-xl border border-slate-200 py-3 px-4 pr-10 bg-slate-50 outline-none focus:ring-2 focus:ring-primary-500" /></div></div>
          </div>
          <div><label className="block text-sm font-bold text-slate-700 mb-2">نبذة تعريفية</label><textarea rows={3} defaultValue="أستاذ في مجال البرمجة وعلوم الحاسوب مع خبرة 10 سنوات في التعليم." className="w-full rounded-xl border border-slate-200 py-3 px-4 bg-slate-50 outline-none focus:ring-2 focus:ring-primary-500 resize-none" /></div>
          <div className="flex justify-end"><button type="submit" className="flex items-center gap-2 px-8 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-colors"><Save   className="w-4 h-4 shrink-0"/>حفظ التغييرات</button></div>
        </form>
      </div>
    </div>
  );
}
