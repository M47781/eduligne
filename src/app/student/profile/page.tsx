"use client";

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Phone, MapPin, Camera, Award, BookOpen, Star, Shield, Settings, Download, Edit2, CheckCircle2, Bell } from 'lucide-react';

export default function StudentProfile() {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);

  const studentInfo = {
    name: 'أحمد محمود',
    email: 'ahmed.m@example.com',
    phone: '+966 50 123 4567',
    location: 'الرياض، المملكة العربية السعودية',
    grade: 'الصف الأول الثانوي',
    school: 'مدرسة المجد الأهلية',
    joinDate: 'سبتمبر 2025',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
    points: 2450,
    rank: 'ذهبي',
    completedCourses: 12,
    certificates: 4
  };

  const achievements = [
    { id: 1, title: 'مبرمج واعد', description: 'إتمام أول دورة برمجة بنجاح', icon: <Star className="w-5 h-5 shrink-0 text-yellow-500" />, date: '10 مارس 2026' },
    { id: 2, title: 'طالب مثالي', description: 'حضور 100% في الشهر الماضي', icon: <Shield className="w-5 h-5 shrink-0 text-emerald-500" />, date: '1 مارس 2026' },
    { id: 3, title: 'قارئ نهم', description: 'قراءة 5 مقالات إثرائية', icon: <BookOpen className="w-5 h-5 shrink-0 text-blue-500" />, date: '25 فبراير 2026' },
  ];

  const certificates = [
    { id: 1, title: 'أساسيات بايثون', date: '15 يناير 2026', grade: '95%' },
    { id: 2, title: 'مقدمة في الذكاء الاصطناعي', date: '10 ديسمبر 2025', grade: '98%' },
    { id: 3, title: 'تصميم واجهات المستخدم', date: '5 نوفمبر 2025', grade: '92%' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header Profile Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative">
        {/* Cover Image */}
        <div className="h-48 bg-gradient-to-r from-primary-600 to-primary-400 relative">
          <button className="absolute top-4 left-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-2 rounded-xl transition-colors">
            <Edit2   className="w-4 h-4 shrink-0"/>
          </button>
        </div>
        
        <div className="px-8 pb-8 relative">
          {/* Avatar */}
          <div className="absolute -top-16 right-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl bg-white p-2 shadow-lg">
                <div className="w-full h-full rounded-xl bg-primary-50 overflow-hidden">
                  <Image  src={studentInfo.avatar} alt={studentInfo.name} className="w-full h-full object-cover" width={500} height={500} />
                </div>
              </div>
              <button className="absolute -bottom-2 -left-2 bg-white text-slate-700 p-2 rounded-xl shadow-md border border-slate-100 hover:text-primary-600 transition-colors">
                <Camera   className="w-4 h-4 shrink-0"/>
              </button>
            </div>
          </div>

          <div className="pt-20 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{studentInfo.name}</h1>
              <p className="text-slate-500 mt-1 text-lg">{studentInfo.grade} • {studentInfo.school}</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="bg-slate-50 text-slate-700 px-6 py-2.5 rounded-xl font-semibold hover:bg-slate-100 transition-colors border border-slate-200 flex items-center gap-2"
              >
                {isEditing ? <CheckCircle2  className="w-4 h-4 shrink-0 text-emerald-500" /> : <Edit2   className="w-4 h-4 shrink-0"/>}
                {isEditing ? 'حفظ التغييرات' : 'تعديل الملف'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-yellow-50 text-yellow-500 flex items-center justify-center">
            <Star   className="w-6 h-6 shrink-0"/>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">النقاط</p>
            <p className="text-2xl font-bold text-slate-900">{studentInfo.points}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
            <Shield   className="w-6 h-6 shrink-0"/>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">المستوى</p>
            <p className="text-2xl font-bold text-slate-900">{studentInfo.rank}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
            <BookOpen   className="w-6 h-6 shrink-0"/>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">الدورات المكتملة</p>
            <p className="text-2xl font-bold text-slate-900">{studentInfo.completedCourses}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center">
            <Award   className="w-6 h-6 shrink-0"/>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">الشهادات</p>
            <p className="text-2xl font-bold text-slate-900">{studentInfo.certificates}</p>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex border-b border-slate-100 overflow-x-auto hide-scrollbar">
          <button 
            onClick={() => setActiveTab('personal')}
            className={`px-8 py-4 font-semibold text-sm whitespace-nowrap transition-colors relative ${activeTab === 'personal' ? 'text-primary-600' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
          >
            المعلومات الشخصية
            {activeTab === 'personal' && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
            )}
          </button>
          <button 
            onClick={() => setActiveTab('achievements')}
            className={`px-8 py-4 font-semibold text-sm whitespace-nowrap transition-colors relative ${activeTab === 'achievements' ? 'text-primary-600' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
          >
            الإنجازات والأوسمة
            {activeTab === 'achievements' && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
            )}
          </button>
          <button 
            onClick={() => setActiveTab('certificates')}
            className={`px-8 py-4 font-semibold text-sm whitespace-nowrap transition-colors relative ${activeTab === 'certificates' ? 'text-primary-600' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
          >
            الشهادات
            {activeTab === 'certificates' && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
            )}
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`px-8 py-4 font-semibold text-sm whitespace-nowrap transition-colors relative ${activeTab === 'settings' ? 'text-primary-600' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
          >
            الإعدادات
            {activeTab === 'settings' && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
            )}
          </button>
        </div>

        <div className="p-8">
          {/* Personal Info Tab */}
          {activeTab === 'personal' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-2 flex items-center gap-2">
                    <User   className="w-4 h-4 shrink-0"/>
                    الاسم الكامل
                  </label>
                  {isEditing ? (
                    <input type="text" defaultValue={studentInfo.name} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:ring-2 focus:ring-primary-500 outline-none" />
                  ) : (
                    <div className="text-slate-900 font-medium px-4 py-2.5 bg-slate-50 rounded-xl border border-transparent">{studentInfo.name}</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-2 flex items-center gap-2">
                    <Mail   className="w-4 h-4 shrink-0"/>
                    البريد الإلكتروني
                  </label>
                  {isEditing ? (
                    <input type="email" defaultValue={studentInfo.email} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:ring-2 focus:ring-primary-500 outline-none" />
                  ) : (
                    <div className="text-slate-900 font-medium px-4 py-2.5 bg-slate-50 rounded-xl border border-transparent">{studentInfo.email}</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-2 flex items-center gap-2">
                    <Phone   className="w-4 h-4 shrink-0"/>
                    رقم الهاتف
                  </label>
                  {isEditing ? (
                    <input type="tel" defaultValue={studentInfo.phone} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:ring-2 focus:ring-primary-500 outline-none" />
                  ) : (
                    <div className="text-slate-900 font-medium px-4 py-2.5 bg-slate-50 rounded-xl border border-transparent">{studentInfo.phone}</div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-2 flex items-center gap-2">
                    <MapPin   className="w-4 h-4 shrink-0"/>
                    الموقع
                  </label>
                  {isEditing ? (
                    <input type="text" defaultValue={studentInfo.location} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:ring-2 focus:ring-primary-500 outline-none" />
                  ) : (
                    <div className="text-slate-900 font-medium px-4 py-2.5 bg-slate-50 rounded-xl border border-transparent">{studentInfo.location}</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-2 flex items-center gap-2">
                    <BookOpen   className="w-4 h-4 shrink-0"/>
                    المرحلة الدراسية
                  </label>
                  <div className="text-slate-900 font-medium px-4 py-2.5 bg-slate-50 rounded-xl border border-transparent">{studentInfo.grade}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-2 flex items-center gap-2">
                    <Award   className="w-4 h-4 shrink-0"/>
                    تاريخ الانضمام
                  </label>
                  <div className="text-slate-900 font-medium px-4 py-2.5 bg-slate-50 rounded-xl border border-transparent">{studentInfo.joinDate}</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {achievements.map((achievement) => (
                <div key={achievement.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-primary-200 transition-colors group">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {achievement.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{achievement.title}</h3>
                  <p className="text-sm text-slate-500 mb-4">{achievement.description}</p>
                  <div className="text-xs font-medium text-slate-400">{achievement.date}</div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Certificates Tab */}
          {activeTab === 'certificates' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {certificates.map((cert) => (
                <div key={cert.id} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-primary-200 hover:shadow-sm transition-all bg-white">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                      <Award   className="w-6 h-6 shrink-0"/>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{cert.title}</h4>
                      <p className="text-sm text-slate-500">تاريخ الإصدار: {cert.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center hidden sm:block">
                      <span className="block text-xs text-slate-500">الدرجة</span>
                      <span className="font-bold text-emerald-600">{cert.grade}</span>
                    </div>
                    <button className="bg-slate-50 hover:bg-primary-50 text-slate-700 hover:text-primary-600 p-2.5 rounded-xl transition-colors">
                      <Download   className="w-5 h-5 shrink-0"/>
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl space-y-8"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Bell  className="w-5 h-5 shrink-0 text-primary-500" />
                  إعدادات الإشعارات
                </h3>
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors">
                    <div>
                      <div className="font-semibold text-slate-900">إشعارات البريد الإلكتروني</div>
                      <div className="text-sm text-slate-500">تلقي تحديثات حول الدورات والواجبات</div>
                    </div>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-primary-500">
                      <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white transition-transform"></span>
                    </div>
                  </label>
                  <label className="flex items-center justify-between p-4 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors">
                    <div>
                      <div className="font-semibold text-slate-900">إشعارات المتصفح</div>
                      <div className="text-sm text-slate-500">تنبيهات فورية عند وجود رسائل جديدة</div>
                    </div>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-slate-200">
                      <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform"></span>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Settings  className="w-5 h-5 shrink-0 text-primary-500" />
                  تفضيلات الحساب
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">لغة العرض</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:ring-2 focus:ring-primary-500 outline-none appearance-none">
                      <option value="ar">العربية</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">كلمة المرور</label>
                    <button className="text-primary-600 font-semibold text-sm hover:underline">تغيير كلمة المرور...</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
