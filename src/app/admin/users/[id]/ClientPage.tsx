"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight, Mail, Calendar, Clock, Shield } from "lucide-react";
import { getAdminUserById } from "@/lib/mockApi";

export default function AdminUserDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => { getAdminUserById(id as string).then(setUser); }, [id]);

  if (!user) return <div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" /></div>;

  const roleLabels: Record<string, string> = { student: "طالب", teacher: "أستاذ", parent: "ولي أمر", admin: "مشرف" };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors"><ArrowRight   className="w-4 h-4 shrink-0"/>العودة</button>
      <div className="bg-white rounded-3xl border border-slate-200 p-8">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-200">
          <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt={user.name} width={80} height={80} className="w-20 h-20 rounded-2xl bg-primary-50 border-2 border-primary-100" style={{ width: "80px", height: "80px" }} />
          <div><h1 className="text-2xl font-bold text-slate-900">{user.name}</h1><p className="text-slate-500">{user.email}</p><span className={`inline-block mt-2 px-3 py-1 rounded-lg text-xs font-bold ${user.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>{user.status === "active" ? "نشط" : "معلق"}</span></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100"><div className="flex items-center gap-2 text-sm text-slate-500 mb-2"><Shield   className="w-4 h-4 shrink-0"/>الدور</div><p className="font-bold text-slate-900">{roleLabels[user.role]}</p></div>
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100"><div className="flex items-center gap-2 text-sm text-slate-500 mb-2"><Mail   className="w-4 h-4 shrink-0"/>البريد</div><p className="font-bold text-slate-900">{user.email}</p></div>
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100"><div className="flex items-center gap-2 text-sm text-slate-500 mb-2"><Calendar   className="w-4 h-4 shrink-0"/>تاريخ التسجيل</div><p className="font-bold text-slate-900">{user.joinDate}</p></div>
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100"><div className="flex items-center gap-2 text-sm text-slate-500 mb-2"><Clock   className="w-4 h-4 shrink-0"/>آخر نشاط</div><p className="font-bold text-slate-900">{user.lastActive}</p></div>
        </div>
      </div>
    </div>
  );
}



