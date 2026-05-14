"use client";

import Image from 'next/image';
import React from 'react';
import { BookOpen, Clock, Award, PlayCircle, Star, Bell, Crown, Zap, Shield, ChevronLeft, Target, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

import { motion } from 'motion/react';

export default function StudentDashboard() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* 1. Header & Greeting */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
           <div className="relative">
              <Image  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Student" className="w-16 h-16 rounded-2xl bg-indigo-50 border-2 border-indigo-100" width={500} height={500} />
              <div className="absolute -bottom-2 -right-2 bg-amber-400 text-amber-900 text-xs font-black px-2 py-0.5 rounded-lg border-2 border-white flex items-center gap-1 shadow-sm">
                 <Star  fill="currentColor"  className="w-4 h-4 shrink-0"/> Lvl 12
              </div>
           </div>
           <div>
              <h1 className="text-2xl font-black text-slate-900">أهلاً بعودتك، يا بطل! 🚀</h1>
              <p className="text-slate-500 font-medium mt-1">مستواك الحالي: مبدع مبتدئ</p>
           </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
            <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold px-4 py-3 md:py-2 rounded-xl transition-colors">
               <Bell  className="w-4 h-4 shrink-0 text-indigo-600" />
               الإشعارات
               <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-md">3</span>
            </button>
        </div>
      </div>

      {/* Progress & Subscription Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Card (Gold/Indigo Theme) */}
        <div className="lg:col-span-2 bg-gradient-to-br from-indigo-900 to-slate-900 p-8 rounded-3xl text-white shadow-lg relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="flex-1 w-full relative">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                     <Target className="w-6 h-6 shrink-0 text-amber-400 shrink-0" />
                     <h2 className="text-xl font-bold">الهدف الأسبوعي</h2>
                  </div>
                  <p className="text-indigo-200 text-sm mb-6 leading-relaxed max-w-lg">أكمل 5 دروس إضافية للحصول على شارة "الطالب المثالي" لهذا الأسبوع.</p>
                  
                  <div className="space-y-3">
                     <div className="flex justify-between text-sm font-bold">
                        <span className="text-amber-400">75% مكتمل</span>
                        <span className="text-slate-400 font-mono">15/20 درس</span>
                     </div>
                     <div className="h-4 bg-slate-800/50 rounded-full overflow-hidden border border-white/10 p-0.5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '75%' }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full relative overflow-hidden shadow-[0_0_10px_rgba(251,191,36,0.3)]"
                        >
                           <div className="absolute inset-0 bg-white/20 w-full animate-pulse"></div>
                        </motion.div>
                     </div>
                  </div>
               </div>
               
               <div className="w-32 h-32 shrink-0 relative flex items-center justify-center bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md shadow-2xl">
                   <Crown  className="w-6 h-6 shrink-0 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]" />
                   <div className="absolute -bottom-3 bg-amber-400 text-amber-950 font-black text-xs px-3 py-1 rounded-full border border-amber-300 shadow-sm whitespace-nowrap">
                      شارة الأسبوع
                   </div>
               </div>
            </div>
        </div>

        {/* Subscription Status */}
        <div className="bg-gradient-to-b from-amber-50 to-white p-8 rounded-3xl border border-amber-200/60 shadow-sm flex flex-col justify-between relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>
             <div>
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-5 border border-amber-200 shadow-sm">
                   <Zap  className="w-6 h-6 shrink-0 fill-amber-500" />
                </div>
                <h3 className="font-black text-slate-900 text-xl mb-1">الاشتراك المميز (Pro)</h3>
                <p className="text-slate-500 font-medium text-sm mb-6">نشط حتى 15 سبتمبر 2026</p>
             </div>
             
             <div className="relative z-10">
                 <div className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                    <CheckCircle2  className="w-4 h-4 shrink-0 text-emerald-500" /> وصول غير محدود للدروس
                 </div>
                 <div className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-6">
                    <CheckCircle2  className="w-4 h-4 shrink-0 text-emerald-500" /> الحصص المباشرة (4MAT)
                 </div>
                 <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-colors shadow-md text-sm">
                    إدارة الاشتراك
                 </button>
             </div>
        </div>
      </div>

      {/* Gamified Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: BookOpen, label: 'دروس مكتملة', value: '42', color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
          { icon: Clock, label: 'ساعة تعلم', value: '124', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
          { icon: Shield, label: 'شارات', value: '18', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
          { icon: Star, label: 'إكس بي (XP)', value: '8,450', color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-100' },
        ].map((stat, idx) => (
           <div key={idx} className="p-6 rounded-3xl border bg-white shadow-sm flex flex-col items-center justify-center text-center hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer border-slate-200">
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4 ${stat.border} border shadow-sm`}>
                 <stat.icon className="w-6 h-6 shrink-0"  />
              </div>
              <span className="text-3xl font-black text-slate-900 mb-1 leading-none">{stat.value}</span>
              <span className="text-sm font-bold text-slate-500 mt-1">{stat.label}</span>
           </div>
        ))}
      </div>

      {/* Continue Learning & Intelligent Notifications Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Continue Learning - takes 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-end">
            <div>
               <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                  <PlayCircle className="w-5 h-5 shrink-0 text-indigo-600" /> مسارك الحالي
               </h2>
               <p className="text-slate-500 font-medium mt-1">استأنف التعلم من حيث توقفت</p>
            </div>
            <Link href="/student/courses" className="text-sm font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors">
               دوراتي
            </Link>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-6 items-center group hover:border-indigo-300 transition-all cursor-pointer relative overflow-hidden">
            <div className="w-full sm:w-56 h-36 rounded-2xl overflow-hidden relative shrink-0">
               <Image  src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Course" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" width={500} height={500} />
               <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-white/95 rounded-full flex items-center justify-center text-indigo-600 pl-1 shadow-lg shadow-black/20">
                     <PlayCircle  className="w-6 h-6 shrink-0 fill-current" />
                  </div>
               </div>
            </div>
            
            <div className="flex-1 w-full">
               <div className="inline-flex bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-md mb-3">
                  تطوير الويب
               </div>
               
               <h3 className="text-xl font-bold text-slate-900 mb-2 leading-snug">تطوير تطبيقات الويب الحديثة بـ React</h3>
               <p className="text-sm font-bold text-slate-500 mb-5 flex items-center gap-1.5">
                  <Clock  className="w-4 h-4 shrink-0 text-slate-400" /> الدرس: إدارة حالة التطبيق (State)
               </p>
               
               <div className="flex items-center gap-4">
                 <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div className="h-full bg-indigo-600 rounded-full w-[65%] relative">
                       <div className="absolute inset-0 bg-white/20 w-full animate-pulse"></div>
                    </div>
                 </div>
                 <span className="font-bold text-slate-700 text-sm">65%</span>
               </div>
            </div>
          </div>
        </div>

        {/* Smart Notifications Sidebar */}
        <div className="space-y-6">
           <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Zap className="w-5 h-5 shrink-0 text-amber-500" /> إشعارات ذكية
           </h2>
           <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
               <div className="space-y-4">
                  {[
                     { id: 1, title: 'موعد حصة مباشرة يقترب!', desc: 'تبدأ حصة الذكاء الاصطناعي خلال 30 دقيقة.', type: 'urgent', icon: Clock, color: 'text-rose-600', bg: 'bg-rose-100 border-rose-200' },
                     { id: 2, title: 'تصحيح الاختبار متاح', desc: 'تم تصحيح اختبار الرياضيات. لقد حصلت على 18/20!', type: 'success', icon: Award, color: 'text-emerald-600', bg: 'bg-emerald-100 border-emerald-200' },
                     { id: 3, title: 'مهمة من الأستاذ', desc: 'أضاف أستاذك واجباً جديداً في قسم الفيزياء.', type: 'info', icon: Target, color: 'text-indigo-600', bg: 'bg-indigo-100 border-indigo-200' },
                  ].map((notif) => (
                     <div key={notif.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex gap-4 items-start hover:shadow-md transition-shadow cursor-pointer">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${notif.bg} ${notif.color} border shadow-sm`}>
                           <notif.icon className="w-5 h-5 shrink-0"  />
                        </div>
                        <div>
                           <h4 className="font-bold text-slate-900 text-sm leading-tight mb-1">{notif.title}</h4>
                           <p className="text-xs text-slate-500 font-medium leading-relaxed">{notif.desc}</p>
                        </div>
                     </div>
                  ))}
               </div>
           </div>
        </div>
      </div>

      {/* Recommended Courses Wrapper */}
      <div className="pt-8 border-t border-slate-200">
         <div className="flex justify-between items-end mb-8">
            <div>
               <h2 className="text-2xl font-black text-slate-900">دورات مقترحة خصيصاً لك</h2>
               <p className="text-slate-500 font-medium mt-1">بناءً على تقدمك ومستواك الحالي في التعلم</p>
            </div>
            <div className="hidden sm:flex gap-2">
               <button className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
                  <ChevronLeft className="w-5 h-5 shrink-0 rotate-180" />
               </button>
               <button className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
                  <ChevronLeft   className="w-5 h-5 shrink-0"/>
               </button>
            </div>
         </div>
         
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
               { id: 101, title: 'التفكير النقدي وحل المشكلات', instructor: 'د. وائل أحمد', rating: 4.8, image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=400&q=80', tag: 'تطوير ذاتي', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
               { id: 102, title: 'الرياضيات المتقدمة', instructor: 'أ. كريم حسن', rating: 4.9, image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400&q=80', tag: 'الرياضيات', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
               { id: 103, title: 'أساسيات البرمجة بلغة بايثون', instructor: 'د. سارة علي', rating: 4.7, image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=400&q=80', tag: 'برمجة', color: 'bg-amber-50 text-amber-700 border-amber-200' },
            ].map(course => (
               <Link key={course.id} href={`/student/courses/${course.id}`} className="group block bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
                  <div className="h-48 p-2 relative">
                     <div className="w-full h-full rounded-2xl overflow-hidden relative">
                        <Image  src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" width={500} height={500} />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                        <div className={`absolute top-3 right-3 px-2.5 py-1.5 rounded-lg text-xs font-bold border ${course.color} shadow-sm backdrop-blur-md`}>
                           {course.tag}
                        </div>
                        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-white text-xs font-bold bg-slate-900/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg">
                           <Star  className="w-4 h-4 shrink-0 text-amber-400" fill="currentColor" /> {course.rating}
                        </div>
                     </div>
                  </div>
                  <div className="p-5">
                     <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">{course.title}</h3>
                     <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5 mb-5">
                        <Image  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.instructor}`} alt="" className="w-5 h-5 rounded-full bg-slate-100" width={500} height={500} />
                        أناء {course.instructor}
                     </p>
                     
                     <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <span className="text-sm font-black text-emerald-600">مجاني ضمن الباقة</span>
                        <span className="w-8 h-8 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                           <ChevronLeft   className="w-4 h-4 shrink-0"/>
                        </span>
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </div>

    </div>
  );
}
