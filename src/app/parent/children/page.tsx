"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, TrendingUp, Award, ChevronLeft } from "lucide-react";
import { getChildren } from "@/lib/mockApi";
import type { ChildProfile } from "@/lib/types";

export default function ChildrenListPage() {
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { getChildren().then((d) => { setChildren(d); setLoading(false); }); }, []);

  if (loading) return <div className="space-y-4">{[1, 2].map((i) => <div key={i} className="h-40 bg-white rounded-3xl border border-slate-200 animate-pulse" />)}</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div><h1 className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-2"><Users className="w-5 h-5 shrink-0 text-primary-600" />الأبناء</h1><p className="text-slate-500">متابعة تقدم أبنائك الدراسي</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children.map((child) => (
          <div key={child.id} className="bg-white rounded-3xl border border-slate-200 p-6 hover:shadow-md transition-all">
            <div className="flex items-start gap-4 mb-6">
              <Image src={child.avatar} alt={child.name} width={64} height={64} className="w-16 h-16 rounded-full bg-primary-50 border-2 border-primary-100" style={{ width: "64px", height: "64px" }} />
              <div><h3 className="font-bold text-lg text-slate-900">{child.name}</h3><p className="text-sm text-slate-500">{child.grade}</p><span className="inline-block mt-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200/50">{child.status}</span></div>
            </div>
            <div className="space-y-3 mb-6">
              <div><div className="flex justify-between text-sm mb-1"><span className="text-slate-600 flex items-center gap-1"><TrendingUp  className="w-4 h-4 shrink-0 text-primary-500" />التقدم</span><span className="font-bold">{child.progress}%</span></div><div className="h-2 bg-slate-100 rounded-full"><div className={`h-2 rounded-full ${child.progress >= 80 ? "bg-emerald-500" : "bg-primary-500"}`} style={{ width: `${child.progress}%` }} /></div></div>
              <div className="flex gap-4"><div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex-1"><div className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Award   className="w-4 h-4 shrink-0"/>آخر درجة</div><div className="font-bold text-slate-900">{child.lastGrade}</div></div><div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex-1"><div className="text-xs text-slate-500 mb-1">الحضور</div><div className="font-bold text-slate-900">{child.attendance}%</div></div></div>
            </div>
            <Link href={`/parent/children/${child.id}`} className="flex items-center justify-center gap-2 w-full py-3 bg-primary-50 text-primary-700 rounded-xl font-bold hover:bg-primary-100 transition-colors">التفاصيل الكاملة <ChevronLeft   className="w-4 h-4 shrink-0"/></Link>
          </div>
        ))}
      </div>
    </div>
  );
}
