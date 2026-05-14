"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Clock, Users, Search, BookOpen, PlayCircle } from "lucide-react";
import { getCourses } from "@/lib/mockApi";
import type { Course } from "@/lib/types";


export default function PublicCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => { getCourses().then((d) => { setCourses(d); setLoading(false); }); }, []);

  const filtered = courses.filter((c) => c.title.includes(search) || c.category.includes(search));

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-slate-900 mb-4">الدورات التعليمية</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">اكتشف مجموعة واسعة من الدورات في مختلف المجالات</p>
        </div>
        <div className="relative max-w-xl mx-auto mb-12">
          <Search className="w-5 h-5 shrink-0 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ابحث عن دورة..." className="w-full bg-white border border-slate-200 rounded-2xl py-4 pr-12 pl-4 text-slate-900 font-medium focus:ring-2 focus:ring-primary-100 focus:border-primary-400 outline-none shadow-sm" />
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (<div key={i} className="bg-white rounded-3xl border border-slate-200 h-80 animate-pulse"><div className="h-48 bg-slate-100 rounded-t-3xl" /><div className="p-5 space-y-3"><div className="h-4 bg-slate-100 rounded w-3/4" /><div className="h-4 bg-slate-100 rounded w-1/2" /></div></div>))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20"><BookOpen  className="w-6 h-6 shrink-0 text-slate-300 mx-auto mb-4" /><p className="text-slate-500 text-lg font-medium">لا توجد نتائج مطابقة</p></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => (
              <Link key={course.id} href={`/student/courses/${course.id}`} className="group block bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-primary-200 transition-all duration-300">
                <div className="h-48 p-2 relative">
                  <div className="w-full h-full rounded-2xl overflow-hidden relative">
                    <Image src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" width={400} height={250} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-800 shadow-sm">{course.category}</div>
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-slate-900/80 backdrop-blur-md rounded-lg px-2.5 py-1 text-white text-xs font-bold"><Star  className="w-4 h-4 shrink-0 text-amber-400" fill="currentColor" />{course.rating}</div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-slate-900 mb-2 leading-tight group-hover:text-primary-600 transition-colors line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-slate-500 mb-4 flex items-center gap-2"><Users   className="w-4 h-4 shrink-0"/>{course.students.toLocaleString()} طالب<span className="mx-1">•</span><Clock   className="w-4 h-4 shrink-0"/>{course.duration}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className={`font-black text-lg ${course.price === "مجاني" ? "text-emerald-600" : "text-slate-900"}`}>{course.price}</span>
                    <span className="bg-primary-50 text-primary-700 px-4 py-2 rounded-xl text-sm font-bold group-hover:bg-primary-100 transition-colors flex items-center gap-1.5"><PlayCircle   className="w-4 h-4 shrink-0"/>عرض</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
