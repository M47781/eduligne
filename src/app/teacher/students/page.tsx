"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Search, Filter, MoreVertical, Mail, Trash2, Download, UserCheck, UserX, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

export default function TeacherStudents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const students = [
    {
      id: 1,
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
      course: 'مقدمة في تطوير الويب باستخدام React',
      progress: 75,
      status: 'نشط',
      lastActive: 'منذ ساعتين',
      grade: 'A'
    },
    {
      id: 2,
      name: 'سارة خالد',
      email: 'sara@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara',
      course: 'أساسيات جافاسكريبت',
      progress: 45,
      status: 'نشط',
      lastActive: 'منذ يوم',
      grade: 'B+'
    },
    {
      id: 3,
      name: 'عمر عبدالله',
      email: 'omar@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar',
      course: 'تصميم واجهات المستخدم (UI/UX)',
      progress: 10,
      status: 'غير نشط',
      lastActive: 'منذ أسبوع',
      grade: '-'
    },
    {
      id: 4,
      name: 'نورة سعد',
      email: 'noura@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Noura',
      course: 'مقدمة في تطوير الويب باستخدام React',
      progress: 100,
      status: 'مكتمل',
      lastActive: 'منذ 3 أيام',
      grade: 'A+'
    },
    {
      id: 5,
      name: 'خالد يوسف',
      email: 'khalid@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Khalid',
      course: 'أساسيات جافاسكريبت',
      progress: 85,
      status: 'نشط',
      lastActive: 'منذ 5 ساعات',
      grade: 'A-'
    }
  ];

  const courses = Array.from(new Set(students.map(s => s.course)));

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.includes(searchQuery) || student.email.includes(searchQuery);
    const matchesCourse = courseFilter === 'all' || student.course === courseFilter;
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    return matchesSearch && matchesCourse && matchesStatus;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">إدارة الطلاب 👨‍🎓</h1>
          <p className="text-slate-500 mt-1">تابع تقدم طلابك، تواصل معهم، وقم بإدارة حساباتهم.</p>
        </div>
        <button className="bg-white border border-slate-200 text-slate-700 px-6 py-2.5 rounded-xl font-semibold hover:bg-slate-50 transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5">
          <Download   className="w-5 h-5 shrink-0"/>
          تصدير البيانات
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col lg:flex-row gap-4 justify-between items-center">
        <div className="relative w-full lg:w-96">
          <Search className="w-5 h-5 shrink-0 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="ابحث بالاسم أو البريد الإلكتروني..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pr-10 pl-4 text-slate-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-auto">
            <Filter className="w-4 h-4 shrink-0 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select 
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="w-full sm:w-48 bg-slate-50 border border-slate-200 rounded-xl py-2.5 pr-9 pl-4 text-slate-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all appearance-none"
            >
              <option value="all">جميع الدورات</option>
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>

          <div className="relative w-full sm:w-auto">
            <Filter className="w-4 h-4 shrink-0 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-40 bg-slate-50 border border-slate-200 rounded-xl py-2.5 pr-9 pl-4 text-slate-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all appearance-none"
            >
              <option value="all">جميع الحالات</option>
              <option value="نشط">نشط</option>
              <option value="غير نشط">غير نشط</option>
              <option value="مكتمل">مكتمل</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-slate-50/50 border-b border-slate-100 text-slate-500 text-sm">
              <tr>
                <th className="px-6 py-4 font-semibold">الطالب</th>
                <th className="px-6 py-4 font-semibold">الدورة</th>
                <th className="px-6 py-4 font-semibold">التقدم</th>
                <th className="px-6 py-4 font-semibold">الحالة</th>
                <th className="px-6 py-4 font-semibold">آخر نشاط</th>
                <th className="px-6 py-4 font-semibold text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student, idx) => (
                <motion.tr 
                  key={student.id} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 border border-primary-200 overflow-hidden shrink-0">
                        <Image  src={student.avatar} alt={student.name} className="w-full h-full object-cover" width={500} height={500} />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{student.name}</div>
                        <div className="text-sm text-slate-500">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-700 max-w-[200px] truncate" title={student.course}>
                      {student.course}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-slate-100 rounded-full h-2 max-w-[100px]">
                        <div 
                          className={`h-2 rounded-full ${
                            student.progress === 100 ? 'bg-emerald-500' : 
                            student.progress > 50 ? 'bg-primary-500' : 
                            'bg-yellow-500'
                          }`} 
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-slate-700">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 ${
                      student.status === 'نشط' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50' : 
                      student.status === 'مكتمل' ? 'bg-blue-50 text-blue-700 border border-blue-200/50' :
                      'bg-slate-100 text-slate-700 border border-slate-200/50'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        student.status === 'نشط' ? 'bg-emerald-500' : 
                        student.status === 'مكتمل' ? 'bg-blue-500' :
                        'bg-slate-400'
                      }`}></span>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                    {student.lastActive}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="مراسلة">
                        <Mail   className="w-4 h-4 shrink-0"/>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="الدرجات">
                        <GraduationCap   className="w-4 h-4 shrink-0"/>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="إزالة">
                        <Trash2   className="w-4 h-4 shrink-0"/>
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredStudents.length === 0 && (
          <div className="text-center py-16 bg-white">
            <UserX  className="w-6 h-6 shrink-0 mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-1">لا يوجد طلاب</h3>
            <p className="text-slate-500">لم يتم العثور على أي طلاب يطابقون معايير البحث.</p>
          </div>
        )}
        
        {/* Pagination (Static for UI) */}
        {filteredStudents.length > 0 && (
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
            <span className="text-sm text-slate-500 font-medium">
              عرض {filteredStudents.length} من أصل {students.length} طالب
            </span>
            <div className="flex gap-1">
              <button className="px-3 py-1 rounded-lg border border-slate-200 bg-white text-slate-400 cursor-not-allowed">السابق</button>
              <button className="px-3 py-1 rounded-lg border border-primary-600 bg-primary-600 text-white font-medium">1</button>
              <button className="px-3 py-1 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors">2</button>
              <button className="px-3 py-1 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors">التالي</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
