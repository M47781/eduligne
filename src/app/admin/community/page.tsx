"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { MessageSquare, Search, Users, Hash, TrendingUp, Flag, Eye, Trash2, MoreVertical, Heart, MessageCircle, AlertTriangle, CheckCircle2, Shield, BarChart2 } from 'lucide-react';

const posts = [
  { id: 1, author: 'أحمد محمد', avatar: 'Ahmed', role: 'student', content: 'هل يمكن لأحد شرح درس المعادلات التربيعية بطريقة مبسطة؟ أحتاج مساعدة في التمارين.', likes: 12, replies: 5, time: 'منذ 15 دقيقة', reported: false, topic: 'رياضيات' },
  { id: 2, author: 'د. سارة علي', avatar: 'Sara', role: 'teacher', content: 'إليكم ملخص درس الكيمياء العضوية. شاركوه مع زملائكم! 📚', likes: 45, replies: 18, time: 'منذ ساعة', reported: false, topic: 'كيمياء' },
  { id: 3, author: 'كريم بن علي', avatar: 'Karim', role: 'student', content: 'محتوى غير مناسب تم الإبلاغ عنه من قبل عدة مستخدمين.', likes: 0, replies: 0, time: 'منذ ساعتين', reported: true, topic: 'عام' },
  { id: 4, author: 'نادية مراد', avatar: 'Nadia', role: 'teacher', content: 'أعلن عن مسابقة في البرمجة لجميع طلاب المتوسط! الجوائز رائعة 🏆', likes: 89, replies: 34, time: 'منذ 3 ساعات', reported: false, topic: 'برمجة' },
  { id: 5, author: 'يوسف حمادي', avatar: 'Youssef', role: 'student', content: 'شكراً لكل المعلمين على الجهود الرائعة في هذا الفصل! ❤️', likes: 67, replies: 12, time: 'منذ 5 ساعات', reported: false, topic: 'عام' },
  { id: 6, author: 'مستخدم مجهول', avatar: 'Anon', role: 'student', content: 'رسالة تحتوي كلمات مسيئة ومحتوى مخالف لسياسة المنصة.', likes: 1, replies: 0, time: 'أمس', reported: true, topic: 'عام' },
];

const topics = [
  { name: 'رياضيات', posts: 234, color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { name: 'كيمياء', posts: 156, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { name: 'برمجة', posts: 312, color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { name: 'فيزياء', posts: 98, color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { name: 'عام', posts: 567, color: 'bg-slate-100 text-slate-700 border-slate-200' },
];

export default function AdminCommunityPage() {
  const [filterTab, setFilterTab] = useState<'all' | 'reported'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = posts.filter(p => {
    const matchSearch = p.content.includes(searchQuery) || p.author.includes(searchQuery);
    const matchTab = filterTab === 'all' || (filterTab === 'reported' && p.reported);
    return matchSearch && matchTab;
  });

  const stats = [
    { label: 'إجمالي المنشورات', value: '2,340', icon: MessageSquare, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-100' },
    { label: 'الأعضاء النشطين', value: '1,856', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
    { label: 'البلاغات المعلقة', value: posts.filter(p => p.reported).length.toString(), icon: Flag, color: 'text-red-600', bg: 'bg-red-50 border-red-100' },
    { label: 'معدل التفاعل', value: '+18%', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-100 text-violet-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-5 h-5 shrink-0" />
            </div>
            إدارة المجتمع
          </h1>
          <p className="text-slate-500 mt-2 font-medium">مراقبة المنشورات والتفاعلات ومعالجة البلاغات</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl font-bold transition-colors shadow-md">
            <BarChart2 className="w-5 h-5 shrink-0" /> تقرير المجتمع
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className={`p-5 rounded-2xl border ${stat.bg} flex items-center gap-4`}>
            <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center ${stat.color} shadow-sm shrink-0`}>
              <stat.icon className="w-6 h-6 shrink-0" />
            </div>
            <div>
              <span className={`text-2xl font-black ${stat.color}`}>{stat.value}</span>
              <p className="text-xs font-bold text-slate-500 mt-0.5">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main Posts Feed */}
        <div className="xl:col-span-3 space-y-6">
          {/* Search & Tabs */}
          <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 shrink-0 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في المنشورات..."
                className="w-full rounded-xl border border-slate-200 py-3 px-4 pr-12 bg-slate-50 outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-500 transition-all font-medium"
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button onClick={() => setFilterTab('all')} className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-sm font-bold transition-colors ${filterTab === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'}`}>
                جميع المنشورات
              </button>
              <button onClick={() => setFilterTab('reported')} className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors ${filterTab === 'reported' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'}`}>
                <Flag className="w-4 h-4 shrink-0" /> البلاغات
                <span className="bg-white/20 text-xs px-1.5 py-0.5 rounded-md">{posts.filter(p => p.reported).length}</span>
              </button>
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {filtered.map(post => (
              <div key={post.id} className={`bg-white rounded-2xl shadow-sm border p-6 transition-all hover:shadow-md ${post.reported ? 'border-red-200 bg-red-50/30' : 'border-slate-200'}`}>
                <div className="flex items-start gap-4">
                  <Image
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.avatar}`}
                    alt={post.author}
                    width={48} height={48}
                    className="w-12 h-12 rounded-xl bg-slate-100 shrink-0 border border-slate-200"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-bold text-slate-900 text-sm">{post.author}</h3>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${post.role === 'teacher' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                        {post.role === 'teacher' ? 'أستاذ' : 'طالب'}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-50 text-slate-500 border border-slate-200">
                        #{post.topic}
                      </span>
                      {post.reported && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-100 text-red-700 border border-red-200">
                          <AlertTriangle className="w-3 h-3 shrink-0" /> تم الإبلاغ
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400 font-medium mr-auto">{post.time}</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed mb-4">{post.content}</p>
                    <div className="flex items-center gap-6">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                        <Heart className="w-4 h-4 shrink-0 text-rose-400" /> {post.likes}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                        <MessageCircle className="w-4 h-4 shrink-0 text-blue-400" /> {post.replies}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-blue-600 transition-colors" title="معاينة">
                      <Eye className="w-4 h-4 shrink-0" />
                    </button>
                    {post.reported && (
                      <button className="p-2 hover:bg-emerald-50 rounded-lg text-slate-400 hover:text-emerald-600 transition-colors" title="تجاوز البلاغ">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                      </button>
                    )}
                    <button className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600 transition-colors" title="حذف">
                      <Trash2 className="w-4 h-4 shrink-0" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-1">لا توجد نتائج</h3>
                <p className="text-slate-500 text-sm">جرب تغيير كلمة البحث أو الفلتر</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar: Topics & Moderation */}
        <div className="space-y-6">
          {/* Topics */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
              <Hash className="w-5 h-5 shrink-0 text-violet-600" /> المواضيع الشائعة
            </h3>
            <div className="space-y-3">
              {topics.map((topic, idx) => (
                <div key={idx} className={`flex items-center justify-between p-3 rounded-xl border ${topic.color} cursor-pointer hover:shadow-sm transition-all`}>
                  <span className="font-bold text-sm">#{topic.name}</span>
                  <span className="text-xs font-bold opacity-70">{topic.posts} منشور</span>
                </div>
              ))}
            </div>
          </div>

          {/* Moderation Guidelines */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white">
            <h3 className="font-black mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 shrink-0 text-indigo-400" /> إرشادات الإشراف
            </h3>
            <ul className="space-y-2 text-sm text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                راجع جميع البلاغات خلال 24 ساعة
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                احذف المحتوى المسيء فوراً
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                أرسل تحذيراً قبل حظر المستخدم
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                وثّق كل إجراء في سجل النظام
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
