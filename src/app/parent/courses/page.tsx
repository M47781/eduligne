"use client";

import Image from "next/image";
import { useState } from "react";
import { BookOpen, Play, BarChart3, Clock, CheckCircle2, Lock, Users } from "lucide-react";
import { motion } from "motion/react";

const children = [
  {
    id: 1,
    name: 'يوسف',
    grade: 'السنة 3 ثانوي',
    avatar: 'Youssef',
    courses: [
      { id: 1, title: 'الرياضيات المتقدمة — بكالوريا', instructor: 'أ. محمد بن علي', progress: 72, lessons: 24, completedLessons: 17, status: 'enrolled', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80' },
      { id: 2, title: 'الفيزياء التطبيقية', instructor: 'أ. كمال رضا', progress: 45, lessons: 18, completedLessons: 8, status: 'enrolled', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80' },
      { id: 3, title: 'مشاريع STEM المتقدمة', instructor: 'أ. سارة صحراوي', progress: 0, lessons: 12, completedLessons: 0, status: 'locked', image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&q=80' },
    ],
  },
  {
    id: 2,
    name: 'أمينة',
    grade: 'السنة 1 ثانوي',
    avatar: 'Amina',
    courses: [
      { id: 4, title: 'أساسيات البرمجة — Python', instructor: 'أ. خالد بن سعد', progress: 88, lessons: 16, completedLessons: 14, status: 'enrolled', image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&q=80' },
      { id: 5, title: 'اللغة الإنجليزية — المستوى أ2', instructor: 'أ. ريم حسين', progress: 60, lessons: 20, completedLessons: 12, status: 'enrolled', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80' },
    ],
  },
];

export default function ParentCoursesPage() {
  const [selectedChild, setSelectedChild] = useState(children[0].id);
  const child = children.find((c) => c.id === selectedChild)!;

  const enrolledCourses = child.courses.filter((c) => c.status === 'enrolled');
  const lockedCourses = child.courses.filter((c) => c.status === 'locked');
  const avgProgress = enrolledCourses.length
    ? Math.round(enrolledCourses.reduce((sum, c) => sum + c.progress, 0) / enrolledCourses.length)
    : 0;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-2">
          <BookOpen className="w-6 h-6 shrink-0 text-indigo-600" />
          متابعة دورات الأبناء
        </h1>
        <p className="text-slate-500">تابع تقدم أبنائك في دوراتهم التعليمية على Eduligne</p>
      </div>

      {/* Child selector */}
      <div className="flex gap-3">
        {children.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedChild(c.id)}
            className={`flex items-center gap-3 px-5 py-3 rounded-2xl border-2 font-bold transition-all ${
              selectedChild === c.id
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300'
            }`}
          >
            <Image
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${c.avatar}`}
              alt={c.name}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full bg-slate-100"
            />
            <div className="text-right">
              <p className="text-sm font-black">{c.name}</p>
              <p className="text-xs opacity-70">{c.grade}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'الدورات المسجّلة', value: enrolledCourses.length, icon: BookOpen, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
          { label: 'متوسط التقدم', value: `${avgProgress}%`, icon: BarChart3, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
          { label: 'الدروس المنجزة', value: enrolledCourses.reduce((s, c) => s + c.completedLessons, 0), icon: CheckCircle2, color: 'text-amber-600 bg-amber-50 border-amber-100' },
        ].map((stat, i) => (
          <div key={i} className={`p-5 rounded-2xl border text-center ${stat.color}`}>
            <stat.icon className="w-5 h-5 shrink-0 mx-auto mb-2" />
            <p className="text-2xl font-black mb-0.5">{stat.value}</p>
            <p className="text-xs font-semibold opacity-70">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Enrolled Courses */}
      {enrolledCourses.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Play className="w-4 h-4 shrink-0 text-emerald-500" />
            الدورات الجارية
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {enrolledCourses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between">
                    <span className="text-white text-xs font-bold bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                      {course.completedLessons}/{course.lessons} درس
                    </span>
                    <span className="text-white text-sm font-black">{course.progress}%</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-black text-slate-900 text-base mb-1 line-clamp-1">{course.title}</h3>
                  <p className="text-xs text-slate-500 font-medium mb-3 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 shrink-0" />
                    {course.instructor}
                  </p>

                  {/* Progress bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-slate-500 font-medium mb-1.5">
                      <span>التقدم</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>آخر نشاط: منذ يومين</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Locked/Purchasable Courses */}
      {lockedCourses.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Lock className="w-4 h-4 shrink-0 text-slate-400" />
            دورات غير مفعّلة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {lockedCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden opacity-80">
                <div className="relative h-28 overflow-hidden grayscale">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Lock className="w-8 h-8 shrink-0 text-white/70" />
                  </div>
                </div>
                <div className="p-5 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-black text-slate-900 text-sm line-clamp-1">{course.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{course.instructor}</p>
                  </div>
                  <a
                    href="/pricing"
                    className="shrink-0 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    شراء
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
