"use client";

import { Users, BookOpen, Clock, PlusCircle, MoreVertical, Edit2, Trash2, TrendingUp, Award, Activity, Video, FileUp, Settings, FileText } from 'lucide-react';
import Link from 'next/link';

import { motion } from 'motion/react';

export default function TeacherDashboard() {
  const stats = [
    { title: 'إجمالي الطلاب', value: '450', icon: Users, color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', trend: '+12% هذا الشهر' },
    { title: 'الدورات النشطة', value: '8', icon: BookOpen, color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50', trend: '+2 دورة جديدة' },
    { title: 'موارد وملفات', value: '124', icon: FileText, color: 'from-purple-500 to-purple-600', bg: 'bg-purple-50', trend: '+15 ملف هذا الأسبوع' },
  ];

  const courses = [
    { name: 'مقدمة في تطوير الويب باستخدام React', students: 120, rating: 4.8, status: 'نشط' },
    { name: 'أساسيات جافاسكريبت', students: 85, rating: 4.5, status: 'نشط' },
    { name: 'تصميم واجهات المستخدم (UI/UX)', students: 45, rating: 4.9, status: 'مسودة' },
  ];

  const activities = [
    { msg: 'قام الطالب "أحمد" بتسليم الواجب الأول في دورة React.', time: 'منذ ساعتين', icon: Edit2, color: 'text-blue-500', bg: 'bg-blue-100' },
    { msg: 'تم تسجيل 5 طلاب جدد في دورة أساسيات جافاسكريبت.', time: 'منذ 5 ساعات', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-100' },
    { msg: 'تلقيت تقييماً جديداً (5 نجوم) من الطالبة "سارة".', time: 'منذ يوم واحد', icon: Award, color: 'text-yellow-500', bg: 'bg-yellow-100' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none"></div>
        
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">مرحباً بك، أستاذ! 👋</h1>
          <p className="text-slate-500 font-medium mt-1">إليك نظرة عامة على أداء دوراتك وطلابك اليوم.</p>
        </div>
        
        <div className="flex flex-wrap gap-3 w-full lg:w-auto z-10">
          <Link href="/teacher/courses" className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-600/20">
             <PlusCircle   className="w-4 h-4 shrink-0"/> إنشاء دورة
          </Link>
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl font-bold hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all shadow-sm">
             <Video className="w-4 h-4 shrink-0 text-rose-500" /> حصة شات مباشر
          </button>
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm">
             <FileUp className="w-4 h-4 shrink-0 text-emerald-500" /> رفع موارد
          </button>
          <Link href="/teacher/students" className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl font-bold hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 transition-all shadow-sm">
             <Users className="w-4 h-4 shrink-0 text-amber-500" /> إدارة الطلاب
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-2 h-full bg-gradient-to-b ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500 font-semibold mb-2">{stat.title}</p>
                <p className="text-3xl font-bold text-slate-900 tracking-tight">{stat.value}</p>
              </div>
              <div className={`${stat.bg} p-3 rounded-xl`}>
                <stat.icon className={`text-transparent bg-clip-text bg-gradient-to-br ${stat.color} w-6 h-6 shrink-0`} style={{ color: 'currentColor' }} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-slate-500">
              <TrendingUp  className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>{stat.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Courses List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen  className="w-5 h-5 shrink-0 text-primary-600" />
              دوراتي الحالية
            </h2>
            <Link href="/teacher/courses" className="text-sm font-semibold text-primary-600 hover:text-primary-700">عرض الكل</Link>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-slate-50/50 border-b border-slate-100 text-slate-500 text-sm">
                  <tr>
                    <th className="px-6 py-4 font-semibold">اسم الدورة</th>
                    <th className="px-6 py-4 font-semibold">عدد الطلاب</th>
                    <th className="px-6 py-4 font-semibold">التقييم</th>
                    <th className="px-6 py-4 font-semibold">الحالة</th>
                    <th className="px-6 py-4 font-semibold">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {courses.map((course, idx) => (
                    <motion.tr 
                      key={idx} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{course.name}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-medium">
                        <div className="flex items-center gap-1.5">
                          <Users  className="w-4 h-4 shrink-0 text-slate-400" />
                          {course.students}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-medium">
                        <div className="flex items-center gap-1.5">
                          <Award  className="w-4 h-4 shrink-0 text-yellow-500" />
                          {course.rating}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 ${
                          course.status === 'نشط' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50' : 'bg-slate-100 text-slate-700 border border-slate-200/50'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${course.status === 'نشط' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                          {course.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                            <Edit2   className="w-4 h-4 shrink-0"/>
                          </button>
                          <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2   className="w-4 h-4 shrink-0"/>
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Activity  className="w-5 h-5 shrink-0 text-primary-600" />
            النشاط الأخير
          </h2>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              {activities.map((activity, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  className="relative flex items-start gap-4"
                >
                  <div className={`w-10 h-10 rounded-xl ${activity.bg} flex items-center justify-center shrink-0 z-10 shadow-sm border border-white`}>
                    <activity.icon className={activity.color} />
                  </div>
                  <div className="pt-1.5">
                    <p className="text-slate-700 font-semibold text-sm leading-relaxed">{activity.msg}</p>
                    <p className="text-xs font-medium text-slate-400 mt-1.5">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-2.5 text-sm font-semibold text-slate-600 hover:text-primary-600 bg-slate-50 hover:bg-primary-50 rounded-xl transition-colors">
              عرض كل الأنشطة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
