"use client";

import { useState } from 'react';
import { Search, Filter, PlusCircle, FileText, Video, Link as LinkIcon, File, MoreVertical, Edit2, Trash2, Download, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export default function TeacherLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');

  const resources = [
    {
      id: 1,
      title: 'مقدمة في React - العرض التقديمي',
      type: 'pdf',
      course: 'مقدمة في تطوير الويب باستخدام React',
      size: '2.4 MB',
      date: '12 مارس 2026',
      downloads: 45
    },
    {
      id: 2,
      title: 'تسجيل المحاضرة الأولى: أساسيات المكونات',
      type: 'video',
      course: 'مقدمة في تطوير الويب باستخدام React',
      duration: '45:20',
      date: '10 مارس 2026',
      views: 112
    },
    {
      id: 3,
      title: 'دليل جافاسكريبت الشامل (MDN)',
      type: 'link',
      course: 'أساسيات جافاسكريبت',
      url: 'https://developer.mozilla.org',
      date: '5 مارس 2026',
      clicks: 89
    },
    {
      id: 4,
      title: 'ورقة عمل: المتغيرات والدوال',
      type: 'doc',
      course: 'أساسيات جافاسكريبت',
      size: '1.1 MB',
      date: '1 مارس 2026',
      downloads: 67
    },
    {
      id: 5,
      title: 'أمثلة على واجهات مستخدم حديثة',
      type: 'pdf',
      course: 'تصميم واجهات المستخدم (UI/UX)',
      size: '5.8 MB',
      date: '28 فبراير 2026',
      downloads: 34
    },
    {
      id: 6,
      title: 'أدوات التصميم المساعدة (Figma Plugins)',
      type: 'link',
      course: 'تصميم واجهات المستخدم (UI/UX)',
      url: 'https://figma.com/community',
      date: '25 فبراير 2026',
      clicks: 156
    }
  ];

  const courses = Array.from(new Set(resources.map(r => r.course)));

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.includes(searchQuery);
    const matchesType = typeFilter === 'all' || resource.type === typeFilter;
    const matchesCourse = courseFilter === 'all' || resource.course === courseFilter;
    return matchesSearch && matchesType && matchesCourse;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText  className="w-6 h-6 shrink-0 text-red-500" />;
      case 'video': return <Video  className="w-6 h-6 shrink-0 text-blue-500" />;
      case 'link': return <LinkIcon  className="w-6 h-6 shrink-0 text-emerald-500" />;
      default: return <File  className="w-6 h-6 shrink-0 text-slate-500" />;
    }
  };

  const getTypeBg = (type: string) => {
    switch (type) {
      case 'pdf': return 'bg-red-50 border-red-100';
      case 'video': return 'bg-blue-50 border-blue-100';
      case 'link': return 'bg-emerald-50 border-emerald-100';
      default: return 'bg-slate-50 border-slate-100';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'pdf': return 'ملف PDF';
      case 'video': return 'فيديو';
      case 'link': return 'رابط خارجي';
      case 'doc': return 'مستند';
      default: return 'ملف';
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">المكتبة والموارد 📁</h1>
          <p className="text-slate-500 mt-1">إدارة الملفات، الروابط، والموارد التعليمية الخاصة بدوراتك.</p>
        </div>
        <button className="bg-primary-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-primary-700 transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5">
          <PlusCircle   className="w-5 h-5 shrink-0"/>
          إضافة مورد جديد
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col lg:flex-row gap-4 justify-between items-center">
        <div className="relative w-full lg:w-96">
          <Search className="w-5 h-5 shrink-0 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="ابحث عن ملف أو رابط..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pr-10 pl-4 text-slate-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-auto">
            <Filter className="w-4 h-4 shrink-0 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full sm:w-40 bg-slate-50 border border-slate-200 rounded-xl py-2.5 pr-9 pl-4 text-slate-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all appearance-none"
            >
              <option value="all">جميع الأنواع</option>
              <option value="pdf">ملفات PDF</option>
              <option value="video">فيديو</option>
              <option value="link">روابط</option>
              <option value="doc">مستندات</option>
            </select>
          </div>

          <div className="relative w-full sm:w-auto">
            <Filter className="w-4 h-4 shrink-0 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select 
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="w-full sm:w-56 bg-slate-50 border border-slate-200 rounded-xl py-2.5 pr-9 pl-4 text-slate-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all appearance-none"
            >
              <option value="all">جميع الدورات</option>
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource, idx) => (
          <motion.div 
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-all group flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${getTypeBg(resource.type)}`}>
                {getTypeIcon(resource.type)}
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="تعديل">
                  <Edit2   className="w-4 h-4 shrink-0"/>
                </button>
                <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="حذف">
                  <Trash2   className="w-4 h-4 shrink-0"/>
                </button>
              </div>
            </div>

            <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
              {resource.title}
            </h3>
            
            <p className="text-sm text-slate-500 mb-4 line-clamp-1" title={resource.course}>
              {resource.course}
            </p>

            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-700">{getTypeName(resource.type)}</span>
                <span className="text-xs text-slate-400">{resource.date}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded-md">
                  {resource.type === 'video' ? resource.duration : 
                   resource.type === 'link' ? `${resource.clicks} زيارة` : 
                   resource.size}
                </span>
                
                <button className="w-8 h-8 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors">
                  {resource.type === 'link' ? <ExternalLink   className="w-4 h-4 shrink-0"/> : <Download   className="w-4 h-4 shrink-0"/>}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 border-dashed">
          <File  className="w-6 h-6 shrink-0 mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-bold text-slate-900 mb-1">لا توجد موارد</h3>
          <p className="text-slate-500">لم يتم العثور على أي ملفات أو روابط تطابق بحثك.</p>
        </div>
      )}
    </div>
  );
}
