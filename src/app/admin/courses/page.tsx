"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { BookOpen, Search, Filter, MoreVertical, Edit2, Trash2, Eye, Plus, Star, Users, Clock, CheckCircle2, XCircle, ArrowUpDown } from 'lucide-react';

const courses = [
  { id: 1, title: 'أساسيات البرمجة بلغة بايثون', instructor: 'د. سارة علي', students: 342, rating: 4.7, status: 'published', category: 'برمجة', lessons: 24, duration: '18 ساعة', image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=400&q=80', revenue: '850k' },
  { id: 2, title: 'الرياضيات المتقدمة للمتوسط', instructor: 'أ. كريم حسن', students: 567, rating: 4.9, status: 'published', category: 'رياضيات', lessons: 36, duration: '28 ساعة', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400&q=80', revenue: '1.2M' },
  { id: 3, title: 'التفكير النقدي وحل المشكلات', instructor: 'د. وائل أحمد', students: 189, rating: 4.8, status: 'published', category: 'تطوير ذاتي', lessons: 12, duration: '9 ساعات', image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=400&q=80', revenue: '420k' },
  { id: 4, title: 'الفيزياء الحديثة - مقدمة شاملة', instructor: 'د. ليلى حسن', students: 98, rating: 4.5, status: 'draft', category: 'فيزياء', lessons: 18, duration: '14 ساعة', image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=400&q=80', revenue: '0' },
  { id: 5, title: 'تعلم اللغة الإنجليزية من الصفر', instructor: 'أ. نادية مراد', students: 1205, rating: 4.6, status: 'published', category: 'لغات', lessons: 48, duration: '36 ساعة', image: 'https://images.unsplash.com/photo-1543109740-4bdb38cda5d0?auto=format&fit=crop&w=400&q=80', revenue: '2.1M' },
  { id: 6, title: 'تاريخ الجزائر المعاصر', instructor: 'أ. محمد صالح', students: 0, rating: 0, status: 'review', category: 'تاريخ', lessons: 8, duration: '6 ساعات', image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=400&q=80', revenue: '0' },
];

export default function AdminCoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = courses.filter(c => {
    const matchSearch = c.title.includes(searchQuery) || c.instructor.includes(searchQuery);
    const matchStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
    published: { label: 'منشور', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: <CheckCircle2 className="w-4 h-4 shrink-0" /> },
    draft: { label: 'مسودة', color: 'bg-slate-100 text-slate-600 border-slate-200', icon: <Edit2 className="w-4 h-4 shrink-0" /> },
    review: { label: 'قيد المراجعة', color: 'bg-amber-50 text-amber-700 border-amber-200', icon: <Clock className="w-4 h-4 shrink-0" /> },
  };

  const stats = [
    { label: 'إجمالي الدورات', value: courses.length.toString(), color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-100' },
    { label: 'منشورة', value: courses.filter(c => c.status === 'published').length.toString(), color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
    { label: 'مسودة', value: courses.filter(c => c.status === 'draft').length.toString(), color: 'text-slate-600', bg: 'bg-slate-50 border-slate-200' },
    { label: 'قيد المراجعة', value: courses.filter(c => c.status === 'review').length.toString(), color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 shrink-0" />
            </div>
            إدارة الدورات التعليمية
          </h1>
          <p className="text-slate-500 mt-2 font-medium">إدارة ومراجعة جميع الدورات المتوفرة على المنصة</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-bold transition-colors shadow-md shadow-indigo-600/20">
          <Plus className="w-5 h-5 shrink-0" /> إضافة دورة جديدة
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className={`p-5 rounded-2xl border ${stat.bg} flex flex-col items-center justify-center text-center`}>
            <span className={`text-3xl font-black ${stat.color}`}>{stat.value}</span>
            <span className="text-sm font-bold text-slate-500 mt-1">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
        <div className="relative flex-1 w-full">
          <Search className="w-5 h-5 shrink-0 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث بعنوان الدورة أو اسم الأستاذ..."
            className="w-full rounded-xl border border-slate-200 py-3 px-4 pr-12 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all font-medium"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          {['all', 'published', 'draft', 'review'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-colors whitespace-nowrap ${
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

      {/* Course Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-right py-4 px-6 text-xs font-black text-slate-500 uppercase tracking-wider">
                  <span className="flex items-center gap-1 cursor-pointer hover:text-slate-700"><ArrowUpDown className="w-4 h-4 shrink-0" /> الدورة</span>
                </th>
                <th className="text-right py-4 px-4 text-xs font-black text-slate-500 uppercase tracking-wider">الأستاذ</th>
                <th className="text-center py-4 px-4 text-xs font-black text-slate-500 uppercase tracking-wider">الطلاب</th>
                <th className="text-center py-4 px-4 text-xs font-black text-slate-500 uppercase tracking-wider">التقييم</th>
                <th className="text-center py-4 px-4 text-xs font-black text-slate-500 uppercase tracking-wider">الإيرادات</th>
                <th className="text-center py-4 px-4 text-xs font-black text-slate-500 uppercase tracking-wider">الحالة</th>
                <th className="text-center py-4 px-4 text-xs font-black text-slate-500 uppercase tracking-wider">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(course => {
                const st = statusConfig[course.status];
                return (
                  <tr key={course.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                          <Image src={course.image} alt={course.title} width={64} height={48} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-slate-900 text-sm truncate max-w-[200px]">{course.title}</h3>
                          <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                            <BookOpen className="w-3 h-3 shrink-0" /> {course.lessons} درس · {course.duration}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-bold text-slate-700">{course.instructor}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="flex items-center justify-center gap-1 text-sm font-bold text-slate-700">
                        <Users className="w-4 h-4 shrink-0 text-slate-400" /> {course.students.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      {course.rating > 0 ? (
                        <span className="flex items-center justify-center gap-1 text-sm font-bold text-amber-600">
                          <Star className="w-4 h-4 shrink-0" fill="currentColor" /> {course.rating}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 font-medium">—</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-sm font-black text-slate-700">{course.revenue} د.ج</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border ${st.color}`}>
                        {st.icon} {st.label}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors" title="معاينة">
                          <Eye className="w-4 h-4 shrink-0" />
                        </button>
                        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-amber-600 transition-colors" title="تعديل">
                          <Edit2 className="w-4 h-4 shrink-0" />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600 transition-colors" title="حذف">
                          <Trash2 className="w-4 h-4 shrink-0" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="p-12 text-center">
            <XCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-1">لا توجد نتائج</h3>
            <p className="text-slate-500 text-sm">جرب تغيير كلمة البحث أو الفلتر</p>
          </div>
        )}
      </div>
    </div>
  );
}
