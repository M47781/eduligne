"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import { Book, Video, FileText, Download, Search, Filter, Star, Clock, ChevronRight } from 'lucide-react';

export default function Library() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const resources = [
    {
      id: 1,
      title: 'أساسيات الفيزياء الحديثة',
      type: 'book',
      subject: 'فيزياء',
      level: '3 متوسط',
      author: 'د. أحمد محمود',
      rating: 4.8,
      downloads: 1250,
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'كتاب شامل يغطي أساسيات الفيزياء مع أمثلة وتطبيقات عملية.'
    },
    {
      id: 2,
      title: 'تجارب كيميائية ممتعة',
      type: 'video',
      subject: 'كيمياء',
      level: '2 متوسط',
      author: 'أ. سارة علي',
      rating: 4.9,
      duration: '45 دقيقة',
      image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'سلسلة مرئية لتجارب كيميائية آمنة يمكن إجراؤها في المنزل أو المختبر المدرسي.'
    },
    {
      id: 3,
      title: 'ملخص قواعد اللغة العربية',
      type: 'document',
      subject: 'لغة عربية',
      level: '4 متوسط',
      author: 'أ. محمد صالح',
      rating: 4.7,
      downloads: 3400,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'ملخص شامل ومبسط لجميع قواعد النحو والصرف المقررة.'
    },
    {
      id: 4,
      title: 'مقدمة في علم الأحياء',
      type: 'book',
      subject: 'علوم طبيعية',
      level: '1 متوسط',
      author: 'د. ليلى حسن',
      rating: 4.6,
      downloads: 890,
      image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'مدخل مبسط لعالم الكائنات الحية والبيئة المحيطة بنا.'
    },
    {
      id: 5,
      title: 'حلول تمارين الرياضيات',
      type: 'document',
      subject: 'رياضيات',
      level: '3 متوسط',
      author: 'لجنة المناهج',
      rating: 4.5,
      downloads: 5600,
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'حلول مفصلة لجميع تمارين الكتاب المدرسي مع الشرح.'
    },
    {
      id: 6,
      title: 'تاريخ الجزائر المعاصر',
      type: 'video',
      subject: 'تاريخ',
      level: '4 متوسط',
      author: 'قناة التعليمية',
      rating: 4.9,
      duration: '1 ساعة و 20 دقيقة',
      image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'وثائقي تعليمي يغطي أهم المحطات في تاريخ الجزائر المعاصر.'
    }
  ];

  const tabs = [
    { id: 'all', label: 'الكل', icon: null },
    { id: 'book', label: 'كتب إلكترونية', icon: <Book   className="w-4 h-4 shrink-0"/> },
    { id: 'video', label: 'مرئيات', icon: <Video   className="w-4 h-4 shrink-0"/> },
    { id: 'document', label: 'ملخصات ومستندات', icon: <FileText   className="w-4 h-4 shrink-0"/> }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesTab = activeTab === 'all' || resource.type === activeTab;
    const matchesSearch = resource.title.includes(searchQuery) || resource.subject.includes(searchQuery);
    return matchesTab && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'book': return <Book  className="w-4 h-4 shrink-0 text-blue-500" />;
      case 'video': return <Video  className="w-4 h-4 shrink-0 text-red-500" />;
      case 'document': return <FileText  className="w-4 h-4 shrink-0 text-green-500" />;
      default: return <FileText   className="w-4 h-4 shrink-0"/>;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'book': return 'كتاب';
      case 'video': return 'فيديو';
      case 'document': return 'مستند';
      default: return 'مورد';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-l from-indigo-900 to-purple-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">المكتبة الرقمية</h1>
          <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
            استكشف آلاف الموارد التعليمية من كتب، مقاطع فيديو، وملخصات مصممة خصيصاً لدعم مسيرتك التعليمية.
          </p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 shrink-0 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="ابحث عن كتاب، مادة، أو موضوع..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
            />
          </div>
          <button className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors" title="تصفية متقدمة">
            <Filter   className="w-5 h-5 shrink-0"/>
          </button>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map(resource => (
          <div key={resource.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all group flex flex-col">
            <div className="h-48 relative overflow-hidden">
              <Image  
                src={resource.image} 
                alt={resource.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                referrerPolicy="no-referrer" 
              width={500} height={500} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 shadow-sm flex items-center gap-1.5">
                {getTypeIcon(resource.type)}
                {getTypeName(resource.type)}
              </div>
              <div className="absolute bottom-3 right-3 left-3 flex justify-between items-end">
                <span className="bg-indigo-600 text-white px-2.5 py-1 rounded-md text-xs font-bold">
                  {resource.subject}
                </span>
                <span className="bg-black/50 backdrop-blur-md text-white px-2.5 py-1 rounded-md text-xs font-medium">
                  {resource.level}
                </span>
              </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                {resource.title}
              </h3>
              <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-1">
                {resource.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                <span className="font-medium">{resource.author}</span>
                <div className="flex items-center gap-1 text-yellow-500 font-bold">
                  <Star  fill="currentColor"  className="w-4 h-4 shrink-0"/>
                  <span>{resource.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  {resource.type === 'video' ? (
                    <>
                      <Clock   className="w-4 h-4 shrink-0"/>
                      <span>{resource.duration}</span>
                    </>
                  ) : (
                    <>
                      <Download   className="w-4 h-4 shrink-0"/>
                      <span>{resource.downloads} تحميل</span>
                    </>
                  )}
                </div>
                <button className="text-indigo-600 font-bold hover:text-indigo-700 flex items-center gap-1 text-sm bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors">
                  {resource.type === 'video' ? 'مشاهدة' : 'تحميل'}
                  <ChevronRight   className="w-4 h-4 shrink-0"/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <Search className="w-6 h-6 shrink-0 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">لم يتم العثور على نتائج</h3>
          <p className="text-slate-500">جرب البحث بكلمات مختلفة أو قم بتغيير التصنيف.</p>
        </div>
      )}
    </div>
  );
}
