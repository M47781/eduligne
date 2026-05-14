"use client";

import Image from 'next/image';
import { motion } from 'motion/react';
import { Users, Bell, BookOpen, TrendingUp, Award, Calendar, PlusCircle, Link as LinkIcon, ChevronLeft, AlertCircle } from 'lucide-react';
import Link from 'next/link';


export default function ParentDashboard() {
  const children = [
    {
      id: 1,
      name: 'أحمد محمد',
      grade: 'الصف الأول المتوسط',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
      progress: 85,
      attendance: 95,
      lastGrade: 'A',
      nextExam: 'الرياضيات - غداً',
      status: 'ممتاز'
    },
    {
      id: 2,
      name: 'سارة محمد',
      grade: 'الصف الخامس الابتدائي',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara',
      progress: 60,
      attendance: 80,
      lastGrade: 'B+',
      nextExam: 'العلوم - الأسبوع القادم',
      status: 'جيد جداً'
    }
  ];

  const alerts = [
    {
      id: 1,
      title: 'اختبار رياضيات غداً',
      child: 'أحمد محمد',
      type: 'exam',
      date: 'منذ ساعتين',
      isRead: false
    },
    {
      id: 2,
      title: 'غياب عن حصة العلوم',
      child: 'سارة محمد',
      type: 'absence',
      date: 'أمس',
      isRead: true
    },
    {
      id: 3,
      title: 'تم تسليم مشروع البرمجة',
      child: 'أحمد محمد',
      type: 'success',
      date: 'منذ يومين',
      isRead: true
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">مرحباً بك، ولي الأمر 👋</h1>
          <p className="text-slate-500 mt-1">تابع تقدم أبنائك، واطلع على آخر التنبيهات والفعاليات التربوية.</p>
        </div>
        <button className="bg-primary-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-primary-700 transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5">
          <LinkIcon   className="w-5 h-5 shrink-0"/>
          ربط حساب ابن جديد
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Children Overview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-6 h-6 shrink-0 text-primary-500" />
              متابعة الأبناء
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {children.map((child, idx) => (
              <motion.div 
                key={child.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary-50 border-2 border-primary-100 overflow-hidden shrink-0">
                    <Image  src={child.avatar} alt={child.name} className="w-full h-full object-cover" width={500} height={500} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{child.name}</h3>
                    <p className="text-sm text-slate-500">{child.grade}</p>
                    <span className="inline-block mt-2 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200/50">
                      الحالة: {child.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <div className="flex justify-between items-center mb-1.5 text-sm">
                      <span className="text-slate-600 font-medium flex items-center gap-1.5">
                        <TrendingUp  className="w-4 h-4 shrink-0 text-primary-500" />
                        التقدم الدراسي
                      </span>
                      <span className="text-slate-900 font-bold">{child.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${child.progress >= 80 ? 'bg-emerald-500' : 'bg-primary-500'}`} 
                        style={{ width: `${child.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                        <Award  className="w-4 h-4 shrink-0 text-yellow-500" />
                        آخر درجة
                      </div>
                      <div className="font-bold text-slate-900">{child.lastGrade}</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                        <Calendar  className="w-4 h-4 shrink-0 text-blue-500" />
                        نسبة الحضور
                      </div>
                      <div className="font-bold text-slate-900">{child.attendance}%</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-slate-500 block text-xs mb-0.5">الاختبار القادم:</span>
                    <span className="font-medium text-slate-900">{child.nextExam}</span>
                  </div>
                  <Link href={`/parent/children/${child.id}`} className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center gap-1 transition-colors">
                    التفاصيل
                    <ChevronLeft   className="w-4 h-4 shrink-0"/>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar - Alerts & Quick Actions */}
        <div className="space-y-8">
          {/* Alerts */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Bell className="w-5 h-5 shrink-0 text-primary-500" />
                آخر التنبيهات
              </h2>
              <button className="text-sm text-primary-600 font-medium hover:underline">عرض الكل</button>
            </div>
            
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className={`p-4 rounded-xl border ${alert.isRead ? 'bg-slate-50 border-slate-100' : 'bg-blue-50/50 border-blue-100'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 ${
                      alert.type === 'exam' ? 'text-blue-500' : 
                      alert.type === 'absence' ? 'text-red-500' : 
                      'text-emerald-500'
                    }`}>
                      <AlertCircle   className="w-4 h-4 shrink-0"/>
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${alert.isRead ? 'text-slate-700' : 'text-slate-900'}`}>
                        {alert.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">يخص: {alert.child}</p>
                      <span className="text-xs text-slate-400 block mt-2">{alert.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-6">إجراءات سريعة</h2>
            <div className="space-y-3">
              <Link href="/parent/education" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <BookOpen   className="w-5 h-5 shrink-0"/>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">المحتوى التربوي</div>
                    <div className="text-xs text-slate-500">مقالات وفيديوهات توعوية</div>
                  </div>
                </div>
                <ChevronLeft  className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-primary-600 transition-colors" />
              </Link>
              
              <Link href="/parent/courses" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Award   className="w-5 h-5 shrink-0"/>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">دورات للكبار</div>
                    <div className="text-xs text-slate-500">تصفح الدورات المتاحة لك</div>
                  </div>
                </div>
                <ChevronLeft  className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-primary-600 transition-colors" />
              </Link>

              <Link href="/parent/events" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Calendar   className="w-5 h-5 shrink-0"/>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">الملتقيات التربوية</div>
                    <div className="text-xs text-slate-500">حضور الفعاليات المخصصة</div>
                  </div>
                </div>
                <ChevronLeft  className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-primary-600 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
