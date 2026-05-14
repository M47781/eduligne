import React from 'react';
import { Users, BookOpen, DollarSign, Activity, TrendingUp, TrendingDown, Settings, CreditCard, PieChart, Shield, LayoutDashboard, Database, HardDrive, Bell } from 'lucide-react';
import Link from 'next/link';


export default function AdminDashboard() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 text-white p-6 md:p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex items-center gap-4">
           <div className="w-14 h-14 bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center backdrop-blur-md">
              <Shield  className="w-6 h-6 shrink-0 text-indigo-400" />
           </div>
           <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">لوحة تحكم الإدارة</h1>
              <p className="text-slate-400 mt-1 font-medium">نظرة عامة على أداء المنصة والإحصائيات الرئيسية</p>
           </div>
        </div>
        <div className="relative z-10 flex gap-3 w-full sm:w-auto">
           <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white text-slate-900 px-5 py-2.5 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-sm">
             <LayoutDashboard   className="w-4 h-4 shrink-0"/> التقارير المفصلة
           </button>
           <Link href="/admin/settings" className="w-11 h-11 flex items-center justify-center bg-white/10 text-white border border-white/20 rounded-xl hover:bg-white/20 transition-colors">
              <Settings   className="w-5 h-5 shrink-0"/>
           </Link>
        </div>
      </div>

      {/* Quick Actions / Modules */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
         {[
           { label: 'إدارة المستخدمين', icon: Users, link: '/admin/users', color: 'text-blue-600', bg: 'bg-blue-50 hover:bg-blue-100 border-blue-200' },
           { label: 'إدارة المحتوى', icon: Database, link: '/admin/courses', color: 'text-indigo-600', bg: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200' },
           { label: 'المدفوعات', icon: CreditCard, link: '/admin/payments', color: 'text-emerald-600', bg: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200' },
           { label: 'التقارير والإحصاءات', icon: PieChart, link: '/admin/reports', color: 'text-amber-600', bg: 'bg-amber-50 hover:bg-amber-100 border-amber-200' },
           { label: 'إعدادات النظام', icon: HardDrive, link: '/admin/settings', color: 'text-slate-600', bg: 'bg-slate-50 hover:bg-slate-100 border-slate-200' },
         ].map((action, idx) => (
            <Link href={action.link} className={`p-4 rounded-2xl border transition-all flex flex-col items-center justify-center gap-3 text-center group ${action.bg}`}>
               <div className={`p-3 rounded-xl bg-white shadow-sm ${action.color}`}>
                  <action.icon className="w-6 h-6 shrink-0"  />
               </div>
               <span className="font-bold text-slate-700 group-hover:text-slate-900 text-sm">{action.label}</span>
            </Link>
         ))}
      </div>

      {/* KPIs Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-2 h-full bg-blue-500"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="bg-slate-50 p-3 rounded-xl text-blue-600 border border-slate-100 group-hover:scale-110 transition-transform">
              <Users   className="w-6 h-6 shrink-0"/>
            </div>
            <span className="flex items-center gap-1 text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1.5 rounded-lg border border-emerald-100">
              <TrendingUp   className="w-4 h-4 shrink-0"/> +12%
            </span>
          </div>
          <p className="text-sm text-slate-500 font-bold mb-1">المستخدمين النشطين</p>
          <p className="text-3xl font-black text-slate-900 tracking-tight">12,450</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="bg-slate-50 p-3 rounded-xl text-emerald-600 border border-slate-100 group-hover:scale-110 transition-transform">
              <DollarSign   className="w-6 h-6 shrink-0"/>
            </div>
            <span className="flex items-center gap-1 text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1.5 rounded-lg border border-emerald-100">
              <TrendingUp   className="w-4 h-4 shrink-0"/> +8.5%
            </span>
          </div>
          <p className="text-sm text-slate-500 font-bold mb-1">الإيرادات (هذا الشهر)</p>
          <p className="text-3xl font-black text-slate-900 tracking-tight">450k</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-2 h-full bg-purple-500"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="bg-slate-50 p-3 rounded-xl text-purple-600 border border-slate-100 group-hover:scale-110 transition-transform">
              <BookOpen   className="w-6 h-6 shrink-0"/>
            </div>
            <span className="flex items-center gap-1 text-xs font-black text-slate-500 bg-slate-100 px-2 py-1.5 rounded-lg border border-slate-200">
              0%
            </span>
          </div>
          <p className="text-sm text-slate-500 font-bold mb-1">المحتوى التعليمي</p>
          <p className="text-3xl font-black text-slate-900 tracking-tight">1,242</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-2 h-full bg-amber-500"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="bg-slate-50 p-3 rounded-xl text-amber-600 border border-slate-100 group-hover:scale-110 transition-transform">
              <Activity   className="w-6 h-6 shrink-0"/>
            </div>
            <span className="flex items-center gap-1 text-xs font-black text-rose-600 bg-rose-50 px-2 py-1.5 rounded-lg border border-rose-100">
              <TrendingDown   className="w-4 h-4 shrink-0"/> -2.4%
            </span>
          </div>
          <p className="text-sm text-slate-500 font-bold mb-1">معدل التفاعل النشط</p>
          <p className="text-3xl font-black text-slate-900 tracking-tight">68%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Systems Health / Activity Chart Container */}
        <div className="xl:col-span-2 space-y-6">
           <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 h-full flex flex-col">
             <div className="flex items-center justify-between mb-8">
               <div>
                  <h2 className="text-xl font-black text-slate-900">أداء المنصة</h2>
                  <p className="text-sm font-medium text-slate-500 mt-1">مقارنة المستخدمين والإيرادات عبر الزمن</p>
               </div>
               <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-xl px-4 py-2 outline-none focus:border-indigo-500">
                  <option>آخر 30 يوم</option>
                  <option>هذا العام</option>
                  <option>الكل</option>
               </select>
             </div>
             <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-200 border-dashed flex flex-col items-center justify-center min-h-[300px]">
               <PieChart  className="w-6 h-6 shrink-0 text-slate-300 mb-4" />
               <p className="text-slate-500 font-bold">مساحة مخصصة للرسم البياني (مثلاً باستخدام Recharts)</p>
             </div>
           </div>
        </div>

        {/* System Logs / Recent Activity */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
               <Bell className="w-5 h-5 shrink-0 text-indigo-600" /> سجل النظام
            </h2>
            <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors">عرض الكل</button>
          </div>
          <div className="space-y-5 flex-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {[
              { title: 'عملية دفع ناجحة', desc: 'تم اشتراك 50 طالب جديد في الباقة المميزة.', time: 'منذ 10 دقائق', type: 'success' },
              { title: 'تنبيه النظام', desc: 'استهلاك عالٍ لموارد الخادم في منطقة الجزائر العاصمة.', time: 'منذ ساعة', type: 'warning' },
              { title: 'محتوى جديد', desc: 'الأستاذة ليلى قامت برفع دورة جديدة (أساسيات React).', time: 'منذ ساعتين', type: 'info' },
              { title: 'تسجيل دخول جديد', desc: 'تم تسجيل دخول مشرف جديد من جهاز (Chrome/Mac).', time: 'منذ 3 ساعات', type: 'info' },
              { title: 'تحديث المنصة', desc: 'تم تطبيق تحديث الأمان V2.4 بنجاح.', time: 'أمس', type: 'success' },
            ].map((log, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="mt-1">
                   <div className={`w-2.5 h-2.5 rounded-full ring-4 ${
                     log.type === 'success' ? 'bg-emerald-500 ring-emerald-100' :
                     log.type === 'warning' ? 'bg-amber-500 ring-amber-100' :
                     'bg-blue-500 ring-blue-100'
                   }`}></div>
                </div>
                <div className="flex-1 pb-5 border-b border-slate-100 last:border-0 last:pb-0">
                   <h4 className="font-bold text-slate-900 text-sm mb-0.5">{log.title}</h4>
                   <p className="text-xs font-medium text-slate-500 leading-relaxed mb-2">{log.desc}</p>
                   <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

