"use client";

import Image from 'next/image';
import { useState } from 'react';
import { PlusCircle, Search, Filter, MoreVertical, Edit2, Trash2, Users, Star, Clock, BookOpen, BarChart2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function TeacherCourses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const courses = [
    {
      id: 1,
      title: 'مقدمة في تطوير الويب باستخدام React',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      status: 'نشط',
      students: 120,
      rating: 4.8,
      duration: '12 أسبوع',
      lessons: 24,
      lastUpdated: 'منذ يومين'
    },
    {
      id: 2,
      title: 'أساسيات جافاسكريبت المتقدمة',
      image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      status: 'نشط',
      students: 85,
      rating: 4.5,
      duration: '8 أسابيع',
      lessons: 16,
      lastUpdated: 'منذ أسبوع'
    },
    {
      id: 3,
      title: 'تصميم واجهات المستخدم (UI/UX)',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      status: 'مسودة',
      students: 0,
      rating: 0,
      duration: '6 أسابيع',
      lessons: 12,
      lastUpdated: 'منذ 3 ساعات'
    },
    {
      id: 4,
      title: 'تطوير تطبيقات الموبايل بـ React Native',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      status: 'مؤرشف',
      students: 210,
      rating: 4.9,
      duration: '10 أسابيع',
      lessons: 20,
      lastUpdated: 'منذ شهرين'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.includes(searchQuery);
    const matchesFilter = filter === 'all' || course.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">إدارة الدورات 📚</h1>
          <p className="text-slate-500 mt-1">قم بإدارة دوراتك، تتبع تقدم الطلاب، وقم بتحديث المحتوى.</p>
        </div>
        <button className="bg-primary-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-primary-700 transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5">
          <PlusCircle   className="w-5 h-5 shrink-0"/>
          إضافة دورة جديدة
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="w-5 h-5 shrink-0 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="ابحث عن دورة..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pr-10 pl-4 text-slate-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${filter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
          >
            الكل
          </button>
          <button 
            onClick={() => setFilter('نشط')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${filter === 'نشط' ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
          >
            نشطة
          </button>
          <button 
            onClick={() => setFilter('مسودة')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${filter === 'مسودة' ? 'bg-yellow-500 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
          >
            مسودات
          </button>
          <button 
            onClick={() => setFilter('مؤرشف')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${filter === 'مؤرشف' ? 'bg-slate-500 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
          >
            مؤرشفة
          </button>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map((course, idx) => (
          <motion.div 
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all group flex flex-col"
          >
            {/* Thumbnail */}
            <div className="relative h-48 overflow-hidden shrink-0">
              <Image  
                src={course.image} 
                alt={course.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              width={500} height={500} />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-lg text-xs font-bold shadow-sm backdrop-blur-md ${
                  course.status === 'نشط' ? 'bg-emerald-500/90 text-white' : 
                  course.status === 'مسودة' ? 'bg-yellow-500/90 text-white' : 
                  'bg-slate-500/90 text-white'
                }`}>
                  {course.status}
                </span>
              </div>
              <div className="absolute top-4 left-4">
                <button className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm text-slate-700 flex items-center justify-center hover:bg-white hover:text-primary-600 transition-colors shadow-sm">
                  <MoreVertical   className="w-4 h-4 shrink-0"/>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-bold text-lg text-slate-900 mb-4 line-clamp-2 group-hover:text-primary-600 transition-colors">
                {course.title}
              </h3>
              
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6 mt-auto">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Users  className="w-4 h-4 shrink-0 text-slate-400" />
                  <span className="font-medium">{course.students} طالب</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Star  className="w-4 h-4 shrink-0 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium">{course.rating > 0 ? course.rating : 'جديد'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock  className="w-4 h-4 shrink-0 text-slate-400" />
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <BookOpen  className="w-4 h-4 shrink-0 text-slate-400" />
                  <span className="font-medium">{course.lessons} درس</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">آخر تحديث: {course.lastUpdated}</span>
                <div className="flex items-center gap-1">
                  <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="إحصائيات">
                    <BarChart2   className="w-4 h-4 shrink-0"/>
                  </button>
                  <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="تعديل">
                    <Edit2   className="w-4 h-4 shrink-0"/>
                  </button>
                  <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="حذف">
                    <Trash2   className="w-4 h-4 shrink-0"/>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {filteredCourses.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 border-dashed">
          <BookOpen  className="w-6 h-6 shrink-0 mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-bold text-slate-900 mb-1">لا توجد دورات</h3>
          <p className="text-slate-500">لم يتم العثور على أي دورات تطابق بحثك.</p>
        </div>
      )}
    </div>
  );
}
