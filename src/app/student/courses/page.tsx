"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import { Search, Filter, Star, Clock, BookOpen, Users, Video, Calendar, ChevronDown, PlayCircle } from 'lucide-react';
import Link from 'next/link';

import { motion, AnimatePresence } from 'motion/react';

export default function Courses() {
  const [activeTab, setActiveTab] = useState<'recorded' | 'live'>('recorded');
  const [showFilters, setShowFilters] = useState(false);
  
  const recordedCourses = [
    { id: 1, title: 'مقدمة في الجبر الخطي', instructor: 'أحمد محمود', rating: 4.8, students: 1200, duration: '12 ساعة', price: 'مجاني', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400&q=80', category: 'رياضيات', level: 'متوسط' },
    { id: 2, title: 'تطوير تطبيقات الويب الحديثة', instructor: 'د. سارة علي', rating: 4.9, students: 850, duration: '20 ساعة', price: '2500 د.ج', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=400&q=80', category: 'برمجة', level: 'متقدم' },
    { id: 3, title: 'قواعد اللغة الإنجليزية', instructor: 'كريم حسن', rating: 4.7, students: 2100, duration: '15 ساعة', price: '1500 د.ج', image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=400&q=80', category: 'لغات', level: 'مبتدئ' },
    { id: 4, title: 'تجارب كيميائية ممتعة', instructor: 'جون سميث', rating: 4.6, students: 3400, duration: '8 ساعات', price: 'مجاني', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80', category: 'علوم', level: 'الكل' },
  ];

  const liveCourses = [
    { id: 5, title: 'جلسة 4MAT: تطبيقات الذكاء الاصطناعي', instructor: 'د. ليلى عمر', avatar: 'Teacher1', date: '15 نوفمبر', time: '18:00', duration: 'ساعتين', price: '1000 د.ج', category: 'AI', registered: 45 },
    { id: 6, title: 'المراجعة النهائية لامتحان البكالوريا', instructor: 'أ. خالد سعيد', avatar: 'Teacher2', date: '20 نوفمبر', time: '20:00', duration: '3 ساعات', price: 'مجاني', category: 'رياضيات', registered: 120 },
    { id: 7, title: 'تحدث الإنجليزية بطلاقة مع متحدثين أصليين', instructor: 'إيما ويلسون', avatar: 'Teacher3', date: '21 نوفمبر', time: '19:30', duration: 'ساعة ونصف', price: '1500 د.ج', category: 'لغات', registered: 30 },
  ];

  const filterOptions = [
    { label: 'المادة', options: ['رياضيات', 'برمجة', 'AI', 'علوم', 'لغات', 'الكل'] },
    { label: 'المستوى', options: ['مبتدئ', 'متوسط', 'متقدم', 'الكل'] },
    { label: 'السعر', options: ['مجاني', 'مدفوع', 'الكل'] },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">الدورات التعليمية</h1>
          <p className="text-slate-500 font-medium">طور مهاراتك من خلال دورات مسجلة وحصص تفاعلية مباشرة.</p>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start md:w-auto w-full mb-6">
        <button
          onClick={() => setActiveTab('recorded')}
          className={`flex-1 md:px-8 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            activeTab === 'recorded' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen   className="w-4 h-4 shrink-0"/>
          دورات مسجلة
        </button>
        <button
          onClick={() => setActiveTab('live')}
          className={`flex-1 md:px-8 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            activeTab === 'live' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <div className="relative flex items-center justify-center">
             <Video   className="w-4 h-4 shrink-0"/>
             {activeTab !== 'live' && <span className="absolute -top-1 -right-1 flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
             </span>}
          </div>
          حصص 4MAT مباشرة
        </button>
      </div>

      {/* Search and Filters Toggle */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-5 h-5 shrink-0 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={`ابحث عن ${activeTab === 'recorded' ? 'دورة...' : 'حصة مباشرة...'}`}
            className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pr-12 pl-4 text-slate-900 font-medium focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all shadow-sm"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-6 py-3.5 rounded-2xl border font-bold flex items-center justify-center gap-2 transition-colors ${
            showFilters 
            ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Filter   className="w-4 h-4 shrink-0"/>
          فلاتر البحث
        </button>
      </div>

      {/* Advanced Filters Dropdown */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-6">
              {filterOptions.map((filter, idx) => (
                <div key={idx}>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{filter.label}</label>
                  <div className="relative">
                    <select className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 font-medium outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50">
                      {filter.options.map((opt, i) => <option key={i}>{opt}</option>)}
                    </select>
                    <ChevronDown  className="w-4 h-4 shrink-0 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'recorded' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recordedCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-indigo-200 transition-all duration-300 group flex flex-col">
                  
                  <div className="h-48 relative p-2">
                    <div className="w-full h-full rounded-2xl overflow-hidden relative">
                       <Image  src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" width={500} height={500} />
                       <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                       <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-800 shadow-sm">
                         {course.category}
                       </div>
                       
                       {/* Rating badge */}
                       <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-slate-900/80 backdrop-blur-md rounded-lg px-2.5 py-1 text-white text-xs font-bold">
                         <Star  className="w-4 h-4 shrink-0 text-amber-400" fill="currentColor" />
                         {course.rating}
                       </div>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                       <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md">{course.level}</span>
                    </div>
                    
                    <h3 className="font-bold text-slate-900 text-lg mb-2 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2 flex-1">
                       {course.title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                       <span>أ. {course.instructor}</span>
                       <div className="flex items-center gap-1">
                          <Users   className="w-4 h-4 shrink-0"/>
                          {course.students.toLocaleString('en-US')}
                       </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className={`font-black text-lg ${course.price === 'مجاني' ? 'text-emerald-600' : 'text-slate-900 font-mono'}`}>
                        {course.price}
                      </span>
                      <Link href={`/student/courses/${course.id}`} 
                        className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-colors flex items-center gap-1.5"
                      >
                         <PlayCircle   className="w-4 h-4 shrink-0"/> الدورة
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'live' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-3xl border border-slate-200 p-6 hover:border-indigo-200 hover:shadow-xl transition-all group relative overflow-hidden">
                   <div className="absolute -top-12 -right-12 w-24 h-24 bg-red-500 rounded-full mix-blend-multiply opacity-5 group-hover:scale-150 transition-transform"></div>
                   
                   <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                         <div className="relative">
                            <Image  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.avatar}`} alt="Instructor" className="w-16 h-16 rounded-2xl bg-indigo-50 border-2 border-indigo-100 p-1" width={500} height={500} />
                            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-pulse"></div>
                         </div>
                         <div>
                            <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-md mb-1 inline-block">بث مباشر مجدول</span>
                            <p className="font-bold text-slate-900">{course.instructor}</p>
                         </div>
                      </div>
                      <div className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold shrink-0">
                         {course.category}
                      </div>
                   </div>

                   <h3 className="text-xl font-bold text-slate-900 mb-4 leading-snug">{course.title}</h3>

                   <div className="grid grid-cols-2 gap-3 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div className="flex flex-col gap-1">
                         <span className="text-xs text-slate-500 font-medium">التاريخ</span>
                         <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                            <Calendar  className="w-4 h-4 shrink-0 text-indigo-500" />
                            {course.date}
                         </div>
                      </div>
                      <div className="flex flex-col gap-1">
                         <span className="text-xs text-slate-500 font-medium">الوقت</span>
                         <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                            <Clock  className="w-4 h-4 shrink-0 text-amber-500" />
                            {course.time} (المدة: {course.duration})
                         </div>
                      </div>
                   </div>

                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                         <Users   className="w-4 h-4 shrink-0"/>
                         {course.registered} مسجل
                      </div>
                      
                      <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
                         احجز مقعدك - {course.price}
                      </button>
                   </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

    </div>
  );
}

