"use client";

import { useState } from 'react';
import { Search, Filter, PlusCircle, Users, Clock, BookOpen, MoreVertical, Edit2, Trash2, MessageCircle, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export default function TeacherGroups() {
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');

  const groups = [
    {
      id: 1,
      name: 'مجموعة أ - صباحي',
      course: 'مقدمة في تطوير الويب باستخدام React',
      students: 25,
      schedule: 'الأحد والثلاثاء - 10:00 صباحاً',
      status: 'نشط',
      progress: 60,
      nextSession: 'غداً، 10:00 ص'
    },
    {
      id: 2,
      name: 'مجموعة ب - مسائي',
      course: 'مقدمة في تطوير الويب باستخدام React',
      students: 30,
      schedule: 'الإثنين والأربعاء - 06:00 مساءً',
      status: 'نشط',
      progress: 45,
      nextSession: 'اليوم، 06:00 م'
    },
    {
      id: 3,
      name: 'مجموعة المتميزين',
      course: 'أساسيات جافاسكريبت',
      students: 15,
      schedule: 'السبت - 02:00 مساءً',
      status: 'نشط',
      progress: 85,
      nextSession: 'السبت القادم'
    },
    {
      id: 4,
      name: 'مجموعة التصميم 101',
      course: 'تصميم واجهات المستخدم (UI/UX)',
      students: 20,
      schedule: 'الثلاثاء والخميس - 04:00 مساءً',
      status: 'مكتمل',
      progress: 100,
      nextSession: '-'
    }
  ];

  const courses = Array.from(new Set(groups.map(g => g.course)));

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.includes(searchQuery);
    const matchesCourse = courseFilter === 'all' || group.course === courseFilter;
    return matchesSearch && matchesCourse;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">إدارة المجموعات 👥</h1>
          <p className="text-slate-500 mt-1">قم بتنظيم طلابك في مجموعات دراسية وتتبع تقدمهم الجماعي.</p>
        </div>
        <button className="bg-primary-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-primary-700 transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5">
          <PlusCircle   className="w-5 h-5 shrink-0"/>
          إنشاء مجموعة جديدة
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="w-5 h-5 shrink-0 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="ابحث عن مجموعة..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pr-10 pl-4 text-slate-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
          />
        </div>
        
        <div className="relative w-full sm:w-auto">
          <Filter className="w-4 h-4 shrink-0 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <select 
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="w-full sm:w-64 bg-slate-50 border border-slate-200 rounded-xl py-2.5 pr-9 pl-4 text-slate-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all appearance-none"
          >
            <option value="all">جميع الدورات</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredGroups.map((group, idx) => (
          <motion.div 
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-all group relative overflow-hidden"
          >
            {/* Top Section */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className={`px-3 py-1 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 mb-3 ${
                  group.status === 'نشط' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50' : 'bg-slate-100 text-slate-700 border border-slate-200/50'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${group.status === 'نشط' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                  {group.status}
                </span>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary-600 transition-colors">
                  {group.name}
                </h3>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="تعديل">
                  <Edit2   className="w-4 h-4 shrink-0"/>
                </button>
                <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="حذف">
                  <Trash2   className="w-4 h-4 shrink-0"/>
                </button>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <BookOpen  className="w-4 h-4 shrink-0 text-slate-400 shrink-0" />
                <span className="truncate" title={group.course}>{group.course}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Users  className="w-4 h-4 shrink-0 text-slate-400 shrink-0" />
                <span>{group.students} طالب مسجل</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock  className="w-4 h-4 shrink-0 text-slate-400 shrink-0" />
                <span>{group.schedule}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Calendar  className="w-4 h-4 shrink-0 text-primary-500 shrink-0" />
                <span className="font-medium text-slate-700">الجلسة القادمة: {group.nextSession}</span>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-1.5 text-sm">
                <span className="text-slate-500 font-medium">التقدم العام</span>
                <span className="text-slate-700 font-bold">{group.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    group.progress === 100 ? 'bg-emerald-500' : 'bg-primary-500'
                  }`} 
                  style={{ width: `${group.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <button className="flex-1 bg-slate-50 hover:bg-primary-50 text-slate-700 hover:text-primary-600 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                <Users   className="w-4 h-4 shrink-0"/>
                عرض الطلاب
              </button>
              <button className="flex-1 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                <MessageCircle   className="w-4 h-4 shrink-0"/>
                مراسلة
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredGroups.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 border-dashed">
          <Users  className="w-6 h-6 shrink-0 mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-bold text-slate-900 mb-1">لا توجد مجموعات</h3>
          <p className="text-slate-500">لم يتم العثور على أي مجموعات تطابق بحثك.</p>
        </div>
      )}
    </div>
  );
}
