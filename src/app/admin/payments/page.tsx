"use client";

import React, { useState } from 'react';
import { CreditCard, DollarSign, TrendingUp, Search, Filter, CheckCircle2, Clock, XCircle, Download, ArrowUpDown, Users, Calendar, Eye, BarChart2, Wallet, Receipt } from 'lucide-react';

const transactions = [
  { id: 'TXN-001', student: 'أحمد محمد', plan: 'الباقة المميزة (Pro)', amount: '4,500 د.ج', method: 'CCP', date: '2026-05-04', status: 'completed' },
  { id: 'TXN-002', student: 'سارة بن خليل', plan: 'الباقة المميزة (Pro)', amount: '4,500 د.ج', method: 'بطاقة ذهبية', date: '2026-05-04', status: 'completed' },
  { id: 'TXN-003', student: 'كريم حمادي', plan: 'الباقة الأساسية', amount: '2,000 د.ج', method: 'CCP', date: '2026-05-03', status: 'pending' },
  { id: 'TXN-004', student: 'نادية مراد', plan: 'الباقة المميزة (Pro)', amount: '4,500 د.ج', method: 'بطاقة ذهبية', date: '2026-05-03', status: 'completed' },
  { id: 'TXN-005', student: 'يوسف عبدلي', plan: 'الباقة الأساسية', amount: '2,000 د.ج', method: 'تحويل بريدي', date: '2026-05-02', status: 'failed' },
  { id: 'TXN-006', student: 'ليلى حسن', plan: 'الباقة المميزة (Pro)', amount: '4,500 د.ج', method: 'CCP', date: '2026-05-02', status: 'completed' },
  { id: 'TXN-007', student: 'محمد صالح', plan: 'دورة فردية', amount: '1,200 د.ج', method: 'بطاقة ذهبية', date: '2026-05-01', status: 'completed' },
  { id: 'TXN-008', student: 'آمال بوزيد', plan: 'الباقة الأساسية', amount: '2,000 د.ج', method: 'CCP', date: '2026-05-01', status: 'pending' },
];

export default function AdminPaymentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = transactions.filter(t => {
    const matchSearch = t.student.includes(searchQuery) || t.id.includes(searchQuery);
    const matchStatus = filterStatus === 'all' || t.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
    completed: { label: 'مكتملة', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: <CheckCircle2 className="w-4 h-4 shrink-0" /> },
    pending: { label: 'معلقة', color: 'bg-amber-50 text-amber-700 border-amber-200', icon: <Clock className="w-4 h-4 shrink-0" /> },
    failed: { label: 'فاشلة', color: 'bg-red-50 text-red-700 border-red-200', icon: <XCircle className="w-4 h-4 shrink-0" /> },
  };

  const stats = [
    { label: 'إجمالي الإيرادات', value: '2.4M د.ج', sub: 'هذا الشهر', icon: DollarSign, color: 'text-emerald-600', bg: 'from-emerald-50 to-white border-emerald-100', trend: '+18%' },
    { label: 'المعاملات الناجحة', value: '342', sub: 'من 380 معاملة', icon: CheckCircle2, color: 'text-blue-600', bg: 'from-blue-50 to-white border-blue-100', trend: '90%' },
    { label: 'المشتركون النشطون', value: '1,856', sub: 'في الباقات المدفوعة', icon: Users, color: 'text-violet-600', bg: 'from-violet-50 to-white border-violet-100', trend: '+12%' },
    { label: 'معلقة بانتظار التأكيد', value: transactions.filter(t => t.status === 'pending').length.toString(), sub: 'تحتاج مراجعة', icon: Clock, color: 'text-amber-600', bg: 'from-amber-50 to-white border-amber-100', trend: '' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
              <Wallet className="w-5 h-5 shrink-0" />
            </div>
            إدارة المدفوعات والفواتير
          </h1>
          <p className="text-slate-500 mt-2 font-medium">تتبع جميع المعاملات المالية والاشتراكات على المنصة</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl font-bold transition-colors shadow-md">
            <Download className="w-5 h-5 shrink-0" /> تصدير التقرير
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => (
          <div key={idx} className={`p-6 rounded-3xl border bg-gradient-to-b ${stat.bg} relative overflow-hidden group`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center ${stat.color} shadow-sm border border-white/80 group-hover:scale-110 transition-transform shrink-0`}>
                <stat.icon className="w-6 h-6 shrink-0" />
              </div>
              {stat.trend && (
                <span className="flex items-center gap-1 text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100">
                  <TrendingUp className="w-3 h-3 shrink-0" /> {stat.trend}
                </span>
              )}
            </div>
            <p className="text-2xl font-black text-slate-900 mb-0.5">{stat.value}</p>
            <p className="text-xs font-bold text-slate-500">{stat.label} · {stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-black text-slate-900">تفاصيل الإيرادات</h2>
              <p className="text-sm text-slate-500 font-medium mt-1">توزيع الدخل حسب نوع الاشتراك</p>
            </div>
            <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-xl px-4 py-2 outline-none">
              <option>هذا الشهر</option>
              <option>آخر 3 أشهر</option>
              <option>هذا العام</option>
            </select>
          </div>
          <div className="space-y-5">
            {[
              { label: 'الباقة المميزة (Pro)', amount: '1.62M د.ج', percent: 67, color: 'bg-indigo-600' },
              { label: 'الباقة الأساسية', amount: '540k د.ج', percent: 22, color: 'bg-emerald-500' },
              { label: 'دورات فردية', amount: '240k د.ج', percent: 11, color: 'bg-amber-500' },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-700">{item.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-slate-900">{item.amount}</span>
                    <span className="text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">{item.percent}%</span>
                  </div>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
            <CreditCard className="w-5 h-5 shrink-0 text-indigo-600" /> طرق الدفع
          </h2>
          <div className="space-y-4">
            {[
              { method: 'CCP (حوالة بريدية)', count: 156, percent: 45, color: 'bg-amber-500' },
              { method: 'بطاقة ذهبية', count: 124, percent: 36, color: 'bg-blue-500' },
              { method: 'تحويل بريدي', count: 65, percent: 19, color: 'bg-emerald-500' },
            ].map((pm, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-700">{pm.method}</span>
                  <span className="text-xs font-bold text-slate-500">{pm.count} معاملة</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className={`h-full ${pm.color} rounded-full`} style={{ width: `${pm.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 shrink-0">
              <Receipt className="w-5 h-5 shrink-0 text-slate-600" /> سجل المعاملات
            </h2>
            <div className="flex flex-1 gap-3 w-full sm:w-auto">
              <div className="relative flex-1">
                <Search className="w-5 h-5 shrink-0 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث بالاسم أو رقم المعاملة..."
                  className="w-full rounded-xl border border-slate-200 py-2.5 px-4 pr-12 bg-slate-50 outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition-all font-medium text-sm"
                />
              </div>
              <div className="flex gap-2">
                {['all', 'completed', 'pending', 'failed'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                      filterStatus === status
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {status === 'all' ? 'الكل' : statusConfig[status]?.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-right py-4 px-6 text-xs font-black text-slate-500 uppercase tracking-wider">رقم المعاملة</th>
                <th className="text-right py-4 px-4 text-xs font-black text-slate-500 uppercase tracking-wider">المستخدم</th>
                <th className="text-right py-4 px-4 text-xs font-black text-slate-500 uppercase tracking-wider">الباقة</th>
                <th className="text-center py-4 px-4 text-xs font-black text-slate-500 uppercase tracking-wider">المبلغ</th>
                <th className="text-center py-4 px-4 text-xs font-black text-slate-500 uppercase tracking-wider">طريقة الدفع</th>
                <th className="text-center py-4 px-4 text-xs font-black text-slate-500 uppercase tracking-wider">التاريخ</th>
                <th className="text-center py-4 px-4 text-xs font-black text-slate-500 uppercase tracking-wider">الحالة</th>
                <th className="text-center py-4 px-4 text-xs font-black text-slate-500 uppercase tracking-wider">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(txn => {
                const st = statusConfig[txn.status];
                return (
                  <tr key={txn.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <span className="text-sm font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">{txn.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-bold text-slate-900">{txn.student}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-medium text-slate-600">{txn.plan}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-sm font-black text-slate-900">{txn.amount}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-xs font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">{txn.method}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-xs font-medium text-slate-500 flex items-center justify-center gap-1">
                        <Calendar className="w-3 h-3 shrink-0" /> {txn.date}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border ${st.color}`}>
                        {st.icon} {st.label}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors" title="تفاصيل">
                        <Eye className="w-4 h-4 shrink-0" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="p-12 text-center">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-1">لا توجد معاملات</h3>
            <p className="text-slate-500 text-sm">جرب تغيير الفلتر أو كلمة البحث</p>
          </div>
        )}
      </div>
    </div>
  );
}
