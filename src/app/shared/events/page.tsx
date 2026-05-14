"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, ArrowLeft, Search } from 'lucide-react';

export default function Events() {
  const [filter, setFilter] = useState('الكل');

  const events = [
    {
      id: 1,
      title: 'مسابقة الروبوتيك الوطنية 2026',
      category: 'مسابقات',
      date: '15 أبريل 2026',
      time: '09:00 صباحاً',
      location: 'الجزائر العاصمة - قاعة المؤتمرات',
      type: 'حضوري',
      attendees: 120,
      image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'تحدي وطني لطلاب المدارس المتوسطة في تصميم وبرمجة الروبوتات لحل مشكلات بيئية.'
    },
    {
      id: 2,
      title: 'ورشة عمل: الذكاء الاصطناعي للمبتدئين',
      category: 'ورش عمل',
      date: '20 أبريل 2026',
      time: '04:00 مساءً',
      location: 'عبر الإنترنت (Zoom)',
      type: 'عن بُعد',
      attendees: 450,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'ورشة عمل تفاعلية لتعلم أساسيات الذكاء الاصطناعي وكيفية استخدامه في الحياة اليومية.'
    },
    {
      id: 3,
      title: 'معرض العلوم والابتكار',
      category: 'معارض',
      date: '05 مايو 2026',
      time: '10:00 صباحاً',
      location: 'وهران - مركز المعارض',
      type: 'حضوري',
      attendees: 300,
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'فرصة لعرض مشاريعكم العلمية والابتكارية أمام لجنة من الخبراء والمستثمرين.'
    },
    {
      id: 4,
      title: 'ندوة: مستقبل الطاقة المتجددة',
      category: 'ندوات',
      date: '12 مايو 2026',
      time: '06:00 مساءً',
      location: 'عبر الإنترنت (Google Meet)',
      type: 'عن بُعد',
      attendees: 200,
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'نقاش مفتوح مع خبراء في مجال الطاقة المتجددة حول التحديات والفرص المستقبلية.'
    }
  ];

  const categories = ['الكل', 'مسابقات', 'ورش عمل', 'معارض', 'ندوات'];

  const filteredEvents = filter === 'الكل' ? events : events.filter(e => e.category === filter);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-l from-teal-900 to-emerald-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">الفعاليات والأحداث</h1>
          <p className="text-teal-100 text-lg mb-8 leading-relaxed">
            اكتشف وشارك في أحدث الفعاليات، المسابقات، وورش العمل العلمية والتقنية. وسّع آفاقك وتواصل مع المبدعين!
          </p>
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
                  ? 'bg-teal-600 text-white' 
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
            placeholder="ابحث عن فعالية..." 
            className="w-full pl-4 pr-10 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
          />
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvents.map(event => (
          <div key={event.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col sm:flex-row">
            <div className="sm:w-2/5 h-48 sm:h-auto relative">
              <Image  src={event.image} alt={event.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" width={500} height={500} />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-teal-700 shadow-sm">
                {event.category}
              </div>
            </div>
            <div className="p-6 sm:w-3/5 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-slate-900 line-clamp-2">{event.title}</h3>
              </div>
              <p className="text-slate-500 text-sm mb-4 line-clamp-2">{event.description}</p>
              
              <div className="space-y-2 mb-6 mt-auto">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar  className="w-4 h-4 shrink-0 text-teal-500" />
                  <span>{event.date}</span>
                  <Clock  className="w-4 h-4 shrink-0 text-teal-500 mr-2" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin  className="w-4 h-4 shrink-0 text-teal-500" />
                  <span className="truncate max-w-[120px]">{event.location}</span>
                  <span className={`mr-auto px-2 py-0.5 rounded text-xs font-bold ${event.type === 'حضوري' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                    {event.type}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Users   className="w-4 h-4 shrink-0"/>
                  <span>{event.attendees} مسجل</span>
                </div>
                <button className="text-teal-600 font-bold hover:text-teal-700 flex items-center gap-1 text-sm bg-teal-50 px-4 py-2 rounded-lg hover:bg-teal-100 transition-colors">
                  سجل الآن
                  <ArrowLeft   className="w-4 h-4 shrink-0"/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
