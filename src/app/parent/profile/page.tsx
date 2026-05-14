"use client";

import { User, Mail, Phone, Users, Save, Shield, MapPin } from "lucide-react";
import { useAuth } from "@/stores/useAuthStore";
import { useToast } from "@/components/providers/ToastProvider";
import Image from "next/image";

export default function ParentProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSave = (e: React.FormEvent) => { 
    e.preventDefault(); 
    toast("تم حفظ الملف الشخصي بنجاح", "success"); 
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900 mb-2">الملف الشخصي</h1>
        <p className="text-slate-500">إدارة معلومات حسابك كولي أمر</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-200">
          <div className="w-24 h-24 rounded-3xl overflow-hidden bg-slate-100 border-4 border-white shadow-md relative shrink-0">
            {user?.avatar ? (
               <Image src={user.avatar} alt="Profile" width={100} height={100} className="w-full h-full object-cover" />
            ) : (
               <div className="w-full h-full flex items-center justify-center text-slate-400">
                 <User className="w-10 h-10 shrink-0" />
               </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">{user?.name || "ولي الأمر"}</h2>
            <p className="text-slate-500 mt-1">{user?.email}</p>
            <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100">
              <Shield className="w-3 h-3 shrink-0" /> حساب موثق
            </span>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">الاسم الكامل</label>
              <div className="relative">
                <User className="w-5 h-5 shrink-0 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  defaultValue={user?.name} 
                  className="w-full rounded-2xl border border-slate-200 py-3.5 px-4 pr-12 bg-slate-50 outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all font-medium text-slate-700" 
                  placeholder="أدخل اسمك الكامل"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="w-5 h-5 shrink-0 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="email"
                  defaultValue={user?.email} 
                  className="w-full rounded-2xl border border-slate-200 py-3.5 px-4 pr-12 bg-slate-50 outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all font-medium text-slate-700" 
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">رقم الهاتف</label>
              <div className="relative">
                <Phone className="w-5 h-5 shrink-0 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  defaultValue={user?.phone || "+213 555 000 000"} 
                  className="w-full rounded-2xl border border-slate-200 py-3.5 px-4 pr-12 bg-slate-50 outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all font-medium text-slate-700" 
                  dir="ltr" 
                  placeholder="+XXX XX XXX XXXX"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">العنوان</label>
              <div className="relative">
                <MapPin className="w-5 h-5 shrink-0 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  defaultValue="الجزائر العاصمة، الجزائر" 
                  className="w-full rounded-2xl border border-slate-200 py-3.5 px-4 pr-12 bg-slate-50 outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all font-medium text-slate-700" 
                  placeholder="أدخل عنوانك"
                />
              </div>
            </div>
          </div>

          <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 shrink-0" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">الأبناء المسجلين</h3>
                <p className="text-sm text-slate-600 font-medium mt-0.5">لديك 2 من الأبناء مرتبطين بهذا الحساب</p>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              type="submit" 
              className="flex items-center gap-2 px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 active:scale-[0.98] transition-all shadow-md shadow-slate-900/20"
            >
              <Save className="w-5 h-5 shrink-0" />
              حفظ التغييرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
