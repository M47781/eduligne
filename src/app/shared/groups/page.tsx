"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import { Users, Search, BookOpen, MessageCircle, Plus, Lock, Globe } from 'lucide-react';

export default function Groups() {
  const [filter, setFilter] = useState('الكل');

  const groups = [
    {
      id: 1,
      name: 'عباقرة الرياضيات',
      category: 'رياضيات',
      members: 124,
      isPrivate: false,
      description: 'مجموعة مخصصة لحل المسائل الرياضية المعقدة ومناقشة النظريات.',
      lastActive: 'قبل ساعتين',
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      name: 'نادي المبرمجين الصغار',
      category: 'برمجة',
      members: 85,
      isPrivate: true,
      description: 'نتعلم معاً لغات البرمجة مثل Python و JavaScript ونبني مشاريع حقيقية.',
      lastActive: 'الآن',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      name: 'مستكشفو العلوم',
      category: 'علوم',
      members: 210,
      isPrivate: false,
      description: 'تجارب علمية، نقاشات حول الفضاء، والطبيعة، وكل ما يخص العلوم.',
      lastActive: 'قبل 5 ساعات',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      name: 'English Speakers Club',
      category: 'لغات',
      members: 156,
      isPrivate: false,
      description: 'Practice your English with native speakers and other learners.',
      lastActive: 'قبل دقيقة',
      image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 5,
      name: 'مشاريع STEM',
      category: 'هندسة',
      members: 64,
      isPrivate: true,
      description: 'مجموعة عمل مغلقة للطلاب المشاركين في مسابقة STEM الوطنية.',
      lastActive: 'أمس',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  ];

  const categories = ['الكل', 'رياضيات', 'برمجة', 'علوم', 'لغات', 'هندسة'];

  const filteredGroups = filter === 'الكل' ? groups : groups.filter(g => g.category === filter);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-l from-blue-900 to-cyan-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">المجموعات الدراسية</h1>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            انضم إلى مجموعات دراسية، تبادل المعرفة، وتعاون مع زملائك في إنجاز المشاريع ومناقشة الأفكار.
          </p>
          <button className="bg-white text-blue-900 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors flex items-center gap-2 shadow-lg">
            <Plus   className="w-5 h-5 shrink-0"/>
            إنشاء مجموعة جديدة
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-colors whitespace-nowrap ${
                filter === c 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 shrink-0 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="ابحث عن مجموعة..." 
            className="w-full pl-4 pr-10 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
        </div>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map(group => (
          <div key={group.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
            <div className="h-32 relative">
              <Image  src={group.image} alt={group.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" width={500} height={500} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-3 right-3 left-3 flex justify-between items-end">
                <span className="bg-white/20 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-bold border border-white/30">
                  {group.category}
                </span>
                {group.isPrivate ? (
                  <span className="bg-slate-900/60 backdrop-blur-md text-white p-1.5 rounded-lg border border-white/20" title="مجموعة خاصة">
                    <Lock   className="w-4 h-4 shrink-0"/>
                  </span>
                ) : (
                  <span className="bg-blue-900/60 backdrop-blur-md text-white p-1.5 rounded-lg border border-white/20" title="مجموعة عامة">
                    <Globe   className="w-4 h-4 shrink-0"/>
                  </span>
                )}
              </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-lg text-slate-900 mb-2">{group.name}</h3>
              <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-1">{group.description}</p>
              
              <div className="flex items-center justify-between text-sm text-slate-600 mb-6">
                <div className="flex items-center gap-1.5">
                  <Users  className="w-4 h-4 shrink-0 text-blue-500" />
                  <span>{group.members} عضو</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageCircle  className="w-4 h-4 shrink-0 text-green-500" />
                  <span>نشط {group.lastActive}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex -space-x-2 rtl:space-x-reverse">
                  {[1, 2, 3].map((i) => (
                    <Image  
                      key={i}
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${group.id * i + 10}`} 
                      alt="Member" 
                      className="w-8 h-8 rounded-full border-2 border-white bg-slate-100"
                    width={500} height={500} />
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                    +{group.members - 3}
                  </div>
                </div>
                <button className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
                  group.isPrivate 
                    ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' 
                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                }`}>
                  {group.isPrivate ? 'طلب انضمام' : 'انضمام'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
