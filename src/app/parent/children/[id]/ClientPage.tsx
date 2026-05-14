"use client";

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

import { ChevronRight, TrendingUp, Clock, BookOpen, Target, CheckCircle2, Award, Calendar, Activity, Bell } from 'lucide-react';
import { motion } from 'motion/react';

export default function ChildTracking() {
  const { id } = useParams();

  // Mock child details
  const child = {
    id,
    name: id === '1' ? 'أحمد محمد' : 'سارة محمد',
    grade: id === '1' ? 'الصف الأول المتوسط' : 'الصف الخامس الابتدائي',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id === '1' ? 'Ahmed' : 'Sara'}`,
    progress: id === '1' ? 85 : 60,
    stats: {
      completedLessons: 42,
      hoursSpent: 120,
      averageScore: '92%',
      attendance: '95%'
    },
    recentActivities: [
      { id: 1, type: 'lesson', title: 'إتمام درس الرياضيات: الجبر خطوة بخطوة', date: 'اليوم, 10:30 صباحاً', icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-50' },
      { id: 2, type: 'quiz', title: 'اختبار قصير في العلوم', result: '18/20', date: 'أمس, 14:00 مساءً', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
      { id: 3, type: 'badge', title: 'الحصول على شارة "الطالب المثالي"', date: 'منذ يومين', icon: Award, color: 'text-amber-500', bg: 'bg-amber-50' },
    ],
    notifications: [
      { id: 1, message: 'الأستاذ خالد أضاف ملاحظة حول تفاعل الطالب.', date: 'اليوم', type: 'info' },
      { id: 2, message: 'تذكير: اختبار الفيزياء يوم الخميس بقاعة 3.', date: 'أمس', type: 'warning' }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      
      {/* Navigation */}
      <div className="flex items-center gap-2 text-sm font-bold text-slate-500 mb-6">
        <Link href="/parent/dashboard" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
          <ChevronRight   className="w-4 h-4 shrink-0"/> العودة إلى لوحة التحكم
        </Link>
        <span>/</span>
        <span className="text-slate-900">متابعة الطالب</span>
      </div>

      {/* Header Profile */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="w-24 h-24 rounded-full bg-slate-50 p-2 border border-slate-200 shrink-0 relative z-10 shadow-sm">
           <Image  src={child.avatar} alt={child.name} className="w-full h-full object-cover rounded-full" width={500} height={500} />
        </div>
        
        <div className="text-center md:text-right flex-1 relative z-10">
           <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-1">{child.name}</h1>
           <p className="text-slate-500 font-medium text-lg">{child.grade}</p>
        </div>
        
        <div className="w-full md:w-auto relative z-10 text-center md:text-right">
           <div className="text-xs font-bold text-slate-500 mb-2">التقدم العام</div>
           <div className="flex items-center gap-4">
              <div className="w-32 bg-slate-100 h-3 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${child.progress}%` }}
                   transition={{ duration: 1 }}
                   className="h-full bg-indigo-600 rounded-full"
                 ></motion.div>
              </div>
              <span className="font-black text-indigo-700">{child.progress}%</span>
           </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {[
           { label: 'الدروس المكتملة', value: child.stats.completedLessons, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
           { label: 'ساعات التعلم', value: child.stats.hoursSpent, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
           { label: 'متوسط الدرجات', value: child.stats.averageScore, icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
           { label: 'الالتزام والغياب', value: child.stats.attendance, icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
         ].map((stat, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center">
               <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${stat.bg} ${stat.color} border ${stat.border}`}>
                  <stat.icon className="w-6 h-6 shrink-0"  />
               </div>
               <div className="text-2xl font-black text-slate-900 mb-1">{stat.value}</div>
               <div className="text-xs font-bold text-slate-500">{stat.label}</div>
            </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Academic Activities Stream */}
         <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
               <Activity className="w-5 h-5 shrink-0 text-indigo-600" />
               النشاط الأكاديمي المباشر
            </h2>
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
               <div className="space-y-6 relative">
                  {/* Timeline Line */}
                  <div className="absolute right-[23px] top-6 bottom-6 w-0.5 bg-slate-100"></div>

                  {child.recentActivities.map((act) => (
                    <div key={act.id} className="relative z-10 flex gap-4">
                       <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-4 border-white ${act.bg} ${act.color} shadow-sm`}>
                          <act.icon className="w-5 h-5 shrink-0"  />
                       </div>
                       <div className="flex-1 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                          <div className="flex justify-between items-start mb-1">
                             <h4 className="font-bold text-slate-900">{act.title}</h4>
                             {act.result && (
                                <span className="text-sm font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                                  {act.result}
                                </span>
                             )}
                          </div>
                          <p className="text-xs font-medium text-slate-500">{act.date}</p>
                       </div>
                    </div>
                  ))}
               </div>
               <button className="w-full mt-6 py-3 rounded-xl border-2 border-indigo-50 text-indigo-600 font-bold hover:bg-indigo-50 transition-colors">
                  عرض كل النشاطات
               </button>
            </div>
         </div>

         {/* Notifications Sidebar */}
         <div className="space-y-6">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
               <Bell className="w-5 h-5 shrink-0 text-amber-500" />
               تنبيهات الأساتذة والنظام
            </h2>
            <div className="space-y-4">
               {child.notifications.map((notif) => (
                 <div key={notif.id} className={`p-4 rounded-2xl border flex gap-3 shadow-sm ${
                   notif.type === 'warning' ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200'
                 }`}>
                    <div className={notif.type === 'warning' ? 'text-amber-500' : 'text-blue-500'}>
                       {notif.type === 'warning' ? <Bell   className="w-5 h-5 shrink-0"/> : <BookOpen   className="w-5 h-5 shrink-0"/>}
                    </div>
                    <div>
                       <p className="text-sm font-bold text-slate-800 mb-1 leading-snug">{notif.message}</p>
                       <p className="text-xs font-medium text-slate-500">{notif.date}</p>
                    </div>
                 </div>
               ))}
               <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-slate-100 shadow-sm mx-auto mb-3">
                     <TrendingUp className="w-6 h-6 shrink-0 text-emerald-500" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">توصيات مخصصة للنظام</h4>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                     ننصح بتشجيع {child.name.split(' ')[0]} على المراجعة الدورية لمادة العلوم للحفاظ على المستوى الممتاز!
                  </p>
                  <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700">
                     فتح خطة مقترحة
                  </button>
               </div>
            </div>
         </div>
      </div>

    </div>
  );
}



