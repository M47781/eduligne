"use client";

import { PieChart, Users, BookOpen, DollarSign, TrendingUp, Activity } from "lucide-react";

const metrics = [
  { label: "إجمالي المستخدمين", value: "12,450", change: "+12%", trend: "up", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "الدورات النشطة", value: "1,242", change: "+5%", trend: "up", icon: BookOpen, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "الإيرادات الشهرية", value: "450K د.ج", change: "+8.5%", trend: "up", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "معدل التفاعل", value: "68%", change: "-2.4%", trend: "down", icon: Activity, color: "text-amber-600", bg: "bg-amber-50" },
];

const monthlyData = [
  { month: "يناير", users: 8200, revenue: 320 },
  { month: "فبراير", users: 8900, revenue: 345 },
  { month: "مارس", users: 9500, revenue: 380 },
  { month: "أبريل", users: 10800, revenue: 420 },
  { month: "مايو", users: 12450, revenue: 450 },
];

export default function AdminReportsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div><h1 className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-2"><PieChart className="w-5 h-5 shrink-0 text-primary-600" />التقارير والإحصاءات</h1><p className="text-slate-500">نظرة شاملة على أداء المنصة</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white rounded-3xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4"><div className={`${m.bg} ${m.color} p-3 rounded-xl`}><m.icon className="w-5 h-5 shrink-0" /></div><span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${m.trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}><TrendingUp className={`w-4 h-4 shrink-0 ${m.trend === "down" ? "rotate-180" : ""}`} />{m.change}</span></div>
            <p className="text-sm text-slate-500 font-medium mb-1">{m.label}</p>
            <p className="text-2xl font-black text-slate-900">{m.value}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-8">
          <h2 className="text-lg font-bold text-slate-900 mb-6">نمو المستخدمين</h2>
          <div className="space-y-4">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex items-center gap-4">
                <span className="w-16 text-sm font-medium text-slate-500">{d.month}</span>
                <div className="flex-1 h-8 bg-slate-100 rounded-xl overflow-hidden"><div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-end px-3" style={{ width: `${(d.users / 15000) * 100}%` }}><span className="text-[10px] font-bold text-white">{d.users.toLocaleString()}</span></div></div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-3xl border border-slate-200 p-8">
          <h2 className="text-lg font-bold text-slate-900 mb-6">الإيرادات (ألف د.ج)</h2>
          <div className="space-y-4">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex items-center gap-4">
                <span className="w-16 text-sm font-medium text-slate-500">{d.month}</span>
                <div className="flex-1 h-8 bg-slate-100 rounded-xl overflow-hidden"><div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-end px-3" style={{ width: `${(d.revenue / 500) * 100}%` }}><span className="text-[10px] font-bold text-white">{d.revenue}K</span></div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-3xl border border-slate-200 p-8">
        <h2 className="text-lg font-bold text-slate-900 mb-6">توزيع المستخدمين حسب الدور</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[{ role: "طلاب", count: "9,840", pct: 79, color: "bg-blue-500" }, { role: "أساتذة", count: "1,245", pct: 10, color: "bg-purple-500" }, { role: "أولياء أمور", count: "1,115", pct: 9, color: "bg-emerald-500" }, { role: "مشرفون", count: "250", pct: 2, color: "bg-amber-500" }].map((r) => (
            <div key={r.role} className="text-center p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-full h-2 bg-slate-200 rounded-full mb-3"><div className={`h-2 ${r.color} rounded-full`} style={{ width: `${r.pct}%` }} /></div>
              <p className="text-2xl font-black text-slate-900">{r.count}</p>
              <p className="text-sm text-slate-500 font-medium">{r.role} ({r.pct}%)</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
