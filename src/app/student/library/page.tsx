"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import { Search, Filter, Book, FileText, Video, Eye, Lock, Unlock, Bookmark, BookmarkCheck, ChevronDown, ListChecks, FileArchive, CheckCircle2, ShoppingCart, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Library() {
  const [mainTab, setMainTab] = useState<'discover' | 'my_library'>('discover');
  const [contentType, setContentType] = useState<'books' | 'summaries' | 'videos' | 'tests' | 'articles'>('books');
  const [libraryType, setLibraryType] = useState<'saved' | 'purchased'>('saved');
  
  const [showFilters, setShowFilters] = useState(false);

  const [resources, setResources] = useState([
    {
      id: 1,
      title: 'أساسيات الفيزياء التطبيقية',
      description: 'مقدمة شاملة في الفيزياء التطبيقية مع أمثلة عملية للطلاب في المرحلة الثانوية لفهم المبادئ الأساسية.',
      author: 'د. كريم حسن',
      type: 'books',
      category: 'علوم',
      level: 'ثانوي',
      age: '15-18',
      price: 50,
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80',
      isLocked: true,
      hasPreview: true,
      isSaved: false,
      isPurchased: false
    },
    {
      id: 2,
      title: 'مراجعة الجبر وتطبيقاته',
      description: 'ملخص مكثف لأهم قوانين الجبر، مع أمثلة وحلول لتمارين سابقة تساعدك على اجتياز الاختبار بسهولة.',
      author: 'أ. محمود سعد',
      type: 'summaries',
      category: 'رياضيات',
      level: 'متوسّط',
      age: '12-15',
      price: 0,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
      isLocked: false,
      hasPreview: false,
      isSaved: true,
      isPurchased: true
    },
    {
      id: 3,
      title: 'تاريخ الحضارات القديمة',
      description: 'سلسلة مرئية تأخذك في رحلة ممتعة لاستكشاف أعظم الحضارات القديمة وأسرار بناء إمبراطورياتهم.',
      author: 'قناة التاريخ اليوم',
      type: 'videos',
      category: 'تاريخ',
      level: 'الجميع',
      age: '10+',
      price: 15,
      image: 'https://images.unsplash.com/photo-1563964177265-a8647bc5214d?auto=format&fit=crop&w=400&q=80',
      isLocked: true,
      hasPreview: true,
      isSaved: true,
      isPurchased: false
    },
    {
      id: 4,
      title: 'اختبار تحديد المستوى - إنجليزي',
      description: 'اختبار تفاعلي يقيس مهاراتك في القراءة، الاستماع وقواعد اللغة الإنجليزية بشكل دقيق.',
      author: 'أ. سارة علي',
      type: 'tests',
      category: 'لغات',
      level: 'متوسّط',
      age: '14+',
      price: 5,
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&q=80',
      isLocked: true,
      hasPreview: true,
      isSaved: false,
      isPurchased: true
    },
    {
      id: 5,
      title: 'مقال: كيف تحسن ذاكرتك الدراسية',
      description: 'مقالة توضح أحدث التقنيات العلمية لتحسين الذاكرة وتعزيز القدرة على الحفظ والفهم أثناء الدراسة.',
      author: 'د. وائل أحمد',
      type: 'articles',
      category: 'مهارات',
      level: 'الجميع',
      age: '12+',
      price: 0,
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80',
      isLocked: false,
      hasPreview: false,
      isSaved: false,
      isPurchased: false
    },
    {
      id: 6,
      title: 'برمجة بايثون للمبتدئين',
      description: 'مجموعة ملخصات برمجية للتعرف على لغة بايثون بطرق عملية وبسيطة.',
      author: 'أحمد ياسين',
      type: 'books',
      category: 'برمجة',
      level: 'مبتدئ',
      age: '12+',
      price: 30,
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=400&q=80',
      isLocked: true,
      hasPreview: true,
      isSaved: true,
      isPurchased: false
    }
  ]);

  const toggleSave = (id: number) => {
    setResources(prev => prev.map(r => r.id === id ? { ...r, isSaved: !r.isSaved } : r));
  };

  const getFilteredResources = () => {
    if (mainTab === 'my_library') {
      if (libraryType === 'saved') return resources.filter(r => r.isSaved);
      if (libraryType === 'purchased') return resources.filter(r => r.isPurchased && r.price > 0);
    }
    return resources.filter(r => r.type === contentType);
  };

  const filteredResources = getFilteredResources();

  const contentTabs = [
    { id: 'books', label: 'الكتب', icon: Book },
    { id: 'summaries', label: 'الملخصات', icon: FileArchive },
    { id: 'videos', label: 'الفيديوهات', icon: Video },
    { id: 'tests', label: 'الاختبارات', icon: ListChecks },
    { id: 'articles', label: 'المقالات', icon: FileText }
  ] as const;

  const filterOptions = [
    { label: 'التصنيف', options: ['علوم', 'رياضيات', 'تاريخ', 'لغات', 'برمجة', 'الكل'] },
    { label: 'المستوى', options: ['مبتدئ', 'متوسط', 'متقدم', 'الكل'] },
    { label: 'السن', options: ['7-11', '12-15', '15-18', 'الكل'] },
    { label: 'السعر', options: ['مجاني', 'مدفوع', 'الكل'] },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header and Main Navigation */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">المكتبة الرقمية</h1>
          <p className="text-slate-500 font-medium">استكشف آلاف الكتب، الاختبارات، والموارد التعليمية.</p>
        </div>
        
        <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <button
            onClick={() => setMainTab('discover')}
            className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-colors ${
              mainTab === 'discover' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            استكشف المكتبة
          </button>
          <button
            onClick={() => setMainTab('my_library')}
            className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-colors ${
              mainTab === 'my_library' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            مكتبتي الخاصة
          </button>
        </div>
      </div>

      {mainTab === 'discover' ? (
        <>
          {/* Search and Filters Toggle */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 shrink-0 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="ابحث عن اسم مدرس، كتاب، موضوع..."
                className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pr-12 pl-4 text-slate-900 font-medium focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all shadow-sm"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-3.5 rounded-2xl border font-bold flex items-center justify-center gap-2 transition-colors ${
                showFilters 
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Filter   className="w-4 h-4 shrink-0"/>
              فلاتر متقدمة
            </button>
          </div>

          {/* Advanced Filters Dropdown */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {filterOptions.map((filter, idx) => (
                    <div key={idx}>
                      <label className="block text-sm font-bold text-slate-700 mb-2">{filter.label}</label>
                      <div className="relative">
                        <select className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 font-medium outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50">
                          {filter.options.map((opt, i) => <option key={i}>{opt}</option>)}
                        </select>
                        <ChevronDown  className="w-4 h-4 shrink-0 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Content Type Tabs */}
          <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2">
            {contentTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setContentType(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold whitespace-nowrap transition-all border ${
                  contentType === tab.id
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <tab.icon className="w-4 h-4 shrink-0"  />
                {tab.label}
              </button>
            ))}
          </div>
        </>
      ) : (
        /* My Library Secondary Tabs */
        <div className="flex gap-4 border-b border-slate-200 pb-px">
          <button
            onClick={() => setLibraryType('saved')}
            className={`font-bold pb-4 px-2 border-b-2 transition-colors ${
              libraryType === 'saved' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            العناصر المحفوظة
          </button>
          <button
            onClick={() => setLibraryType('purchased')}
            className={`font-bold pb-4 px-2 border-b-2 transition-colors ${
              libraryType === 'purchased' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            المحتوى المفتوح
          </button>
        </div>
      )}

      {/* Content Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-indigo-200 group flex flex-col">
            
            {/* Card Image area */}
            <div className="relative h-56 p-2">
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <Image  src={resource.image} alt={resource.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" width={500} height={500} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                
                {/* Status Badges */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  {resource.isLocked && !resource.isPurchased ? (
                     <div className="bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm text-xs font-bold text-slate-700">
                       <Lock  className="w-4 h-4 shrink-0 text-amber-500" /> مقفل
                     </div>
                  ) : (
                     <div className="bg-emerald-500/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm text-xs font-bold text-white">
                       <Unlock   className="w-4 h-4 shrink-0"/> متاح
                     </div>
                  )}
                </div>

                <div className="absolute top-3 left-3">
                   <button 
                      onClick={(e) => { e.stopPropagation(); toggleSave(resource.id); }}
                      className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                         resource.isSaved ? 'bg-indigo-500/90 text-white' : 'bg-white/90 text-slate-400 hover:text-indigo-500'
                      }`}
                   >
                     {resource.isSaved ? <BookmarkCheck   className="w-4 h-4 shrink-0"/> : <Bookmark   className="w-4 h-4 shrink-0"/>}
                   </button>
                </div>

                {/* Preview Badge */}
                {resource.hasPreview && resource.isLocked && !resource.isPurchased && (
                  <div className="absolute bottom-3 right-3 bg-indigo-500/90 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 border border-indigo-400/30">
                     <Eye   className="w-4 h-4 shrink-0"/> معاينة 30% الفصول
                  </div>
                )}
              </div>
            </div>

            {/* Card Content area */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex gap-2 mb-3">
                 <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md">{resource.category}</span>
                 <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md">{resource.level}</span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
                {resource.title}
              </h3>
              
              <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                {resource.description}
              </p>

              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs shrink-0">
                     {resource.author.charAt(0)}
                   </div>
                   <span className="text-xs font-bold text-slate-700">{resource.author}</span>
                </div>
                
                {resource.isPurchased || resource.price === 0 ? (
                  <button className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-indigo-100 transition-colors">
                     <PlayCircle   className="w-4 h-4 shrink-0"/> تصفح
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 text-sm font-black border border-amber-200 font-mono">
                    {resource.price} DA 
                  </div>
                )}
              </div>
            </div>

            {/* If Locked, show CTA over row */}
            {!resource.isPurchased && resource.price > 0 && (
               <div className="p-3 bg-slate-50 border-t border-slate-100">
                  <button className="w-full flex justify-center items-center gap-2 bg-slate-900 text-white font-bold py-2.5 rounded-xl hover:bg-slate-800 transition-colors text-sm">
                     <ShoppingCart   className="w-4 h-4 shrink-0"/> شراء الآن للحصول على النسخة كاملة
                  </button>
               </div>
            )}
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
         <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
            <Book  className="w-6 h-6 shrink-0 mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">عذراً، لم نجد أي محتوى</h3>
            <p className="text-slate-500">حاول تغيير خيارات البحث أو الفلاتر.</p>
         </div>
      )}

    </div>
  );
}
