"use client";

import { useState } from "react";
import { Library, Search, BookOpen, FileText, Video, Cpu, ChevronLeft, Star, Clock, Download } from "lucide-react";
import { motion } from "motion/react";

const categories = [
  { id: 'all', label: 'الكل', icon: Library },
  { id: 'summaries', label: 'الملخصات', icon: FileText },
  { id: 'videos', label: 'الدروس المرئية', icon: Video },
  { id: 'stem', label: 'مشاريع STEM', icon: Cpu },
  { id: 'exercises', label: 'التمارين', icon: BookOpen },
];

const resources = [
  { id: 1, title: 'ملخص شامل — الرياضيات السنة الثالثة ثانوي', category: 'summaries', subject: 'رياضيات', grade: 'السنة 3 ثانوي', rating: 4.9, duration: null, pages: 45, type: 'PDF', color: 'from-indigo-500 to-violet-600' },
  { id: 2, title: 'دروس الفيزياء التفاعلية — الحركة والقوى', category: 'videos', subject: 'فيزياء', grade: 'السنة 2 ثانوي', rating: 4.7, duration: '2h 30m', pages: null, type: 'فيديو', color: 'from-rose-500 to-pink-600' },
  { id: 3, title: 'مشروع STEM: صانع الماء الشمسي', category: 'stem', subject: 'STEM', grade: 'جميع المراحل', rating: 4.8, duration: '45m', pages: null, type: 'STEM', color: 'from-emerald-500 to-teal-600' },
  { id: 4, title: 'تمارين محلولة — الجبر والتحليل', category: 'exercises', subject: 'رياضيات', grade: 'السنة 1 ثانوي', rating: 4.6, duration: null, pages: 32, type: 'PDF', color: 'from-amber-500 to-orange-600' },
  { id: 5, title: 'ملخص قواعد اللغة العربية — كل القواعد', category: 'summaries', subject: 'عربية', grade: 'جميع المراحل', rating: 4.9, duration: null, pages: 28, type: 'PDF', color: 'from-violet-500 to-purple-600' },
  { id: 6, title: 'تجربة علمية: صنع خلية كهروكيميائية بسيطة', category: 'stem', subject: 'كيمياء / STEM', grade: 'السنة 3 ثانوي', rating: 4.5, duration: '35m', pages: null, type: 'STEM', color: 'from-cyan-500 to-blue-600' },
];

export default function ParentLibraryPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = resources.filter((r) => {
    const matchCat = activeCategory === 'all' || r.category === activeCategory;
    const matchSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-2">
          <Library className="w-6 h-6 shrink-0 text-indigo-600" />
          المكتبة التعليمية
        </h1>
        <p className="text-slate-500">ملخصات، مشاريع STEM، ودروس مرئية متاحة لمتابعة ومساعدة أبنائك</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 shrink-0 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث عن ملخص، مادة، أو مشروع..."
          className="w-full pr-12 pl-4 py-3.5 rounded-2xl border border-slate-200 bg-white shadow-sm outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all text-slate-900"
        />
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600'
            }`}
          >
            <cat.icon className="w-4 h-4 shrink-0" />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Resources grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((resource, idx) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-indigo-200 transition-all group"
          >
            {/* Color bar */}
            <div className={`h-2 bg-gradient-to-r ${resource.color}`} />

            <div className="p-5">
              {/* Type badge */}
              <div className="flex items-center justify-between mb-3">
                <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-lg bg-gradient-to-r ${resource.color} text-white`}>
                  {resource.type}
                </span>
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 shrink-0" fill="currentColor" />
                  {resource.rating}
                </div>
              </div>

              <h3 className="font-bold text-slate-900 text-base leading-snug mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                {resource.title}
              </h3>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-lg text-xs font-medium text-slate-600">
                  {resource.subject}
                </span>
                <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-lg text-xs font-medium text-slate-600">
                  {resource.grade}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mb-4">
                {resource.duration && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 shrink-0" /> {resource.duration}
                  </span>
                )}
                {resource.pages && (
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 shrink-0" /> {resource.pages} صفحة
                  </span>
                )}
              </div>

              <div className="flex gap-2 pt-4 border-t border-slate-100">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-sm font-bold transition-colors border border-indigo-100">
                  <ChevronLeft className="w-4 h-4 shrink-0" />
                  عرض
                </button>
                <button className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl transition-colors border border-slate-200">
                  <Download className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16 text-slate-400">
            <Library className="w-12 h-12 shrink-0 mx-auto mb-4 opacity-30" />
            <p className="font-medium">لا توجد نتائج مطابقة للبحث</p>
          </div>
        )}
      </div>
    </div>
  );
}
