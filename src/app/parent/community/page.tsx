"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import { MessageSquare, Heart, Share2, ImageIcon, Send, MoreHorizontal, Users, Bell, BookOpen, Activity, Star, Clock, Calendar, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ParentCommunity() {
  const [activeTab, setActiveTab] = useState<'feed' | 'announcements' | 'events' | 'tips'>('feed');
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: { name: 'أ. سارة محمدي', avatar: '2', role: 'أستاذ' },
      content: 'تذكير لأولياء الأمور: اختبار نهاية الفصل للسنة الثالثة سيكون الأسبوع القادم. يرجى تشجيع أبنائكم على المراجعة يومياً والتواصل معنا لأي استفسار.',
      time: 'منذ ساعتين',
      likes: 42,
      comments: 18,
      image: null,
    },
    {
      id: 2,
      author: { name: 'كريمة بوزيد', avatar: '3', role: 'ولي أمر' },
      content: 'شكراً لفريق Eduligne! لاحظت تحسناً ملموساً في نتائج ابني منذ بدأ استخدام المنصة. التحليلات التفصيلية ساعدتني كثيراً في فهم نقاط ضعفه والتركيز عليها.',
      time: 'منذ 5 ساعات',
      likes: 67,
      comments: 12,
      image: null,
    },
    {
      id: 3,
      author: { name: 'أ. يوسف قاسم', avatar: '4', role: 'أستاذ' },
      content: 'جلسة مفتوحة مع أولياء الأمور الأسبوع القادم للحديث عن نتائج الفصل ومتابعة التقدم. التفاصيل في قسم الفعاليات.',
      time: 'منذ يوم',
      likes: 38,
      comments: 9,
      image: null,
    },
  ]);

  const [newPost, setNewPost] = useState('');

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    setPosts([{
      id: Date.now(),
      author: { name: 'أنت', avatar: 'Parent', role: 'ولي أمر' },
      content: newPost,
      time: 'الآن',
      likes: 0,
      comments: 0,
      image: null,
    }, ...posts]);
    setNewPost('');
  };

  const announcements = [
    { id: 1, title: 'اختبار نهاية الفصل — الأسبوع القادم', type: 'urgent', from: 'إدارة المنصة' },
    { id: 2, title: 'تحديث جديد: نظام متابعة الأبناء المتطور', type: 'info', from: 'فريق Eduligne' },
    { id: 3, title: 'إضافة محتوى STEM جديد للفصل الدراسي', type: 'success', from: 'قسم المحتوى' },
  ];

  const events = [
    { id: 1, title: 'جلسة أولياء الأمور الفصلية', date: '18 مايو 2026', time: '05:00 مساءً', type: 'اجتماع' },
    { id: 2, title: 'ورشة: كيف تدعم طفلك في دراسته', date: '25 مايو 2026', time: '03:00 مساءً', type: 'ورشة' },
  ];

  const tips = [
    { id: 1, title: '5 طرق لتحفيز طفلك على الدراسة اليومية', author: 'أ. ريم حسن', readTime: '4 دقائق', tag: 'تحفيز' },
    { id: 2, title: 'كيف تفسّر تقارير أداء طفلك على Eduligne؟', author: 'فريق Eduligne', readTime: '6 دقائق', tag: 'دليل' },
    { id: 3, title: 'نصائح لإدارة وقت المذاكرة في المنزل', author: 'أ. فاطمة الزهراء', readTime: '5 دقائق', tag: 'تنظيم' },
  ];

  const tabs = [
    { id: 'feed' as const, label: 'المنشورات', icon: MessageSquare },
    { id: 'announcements' as const, label: 'الإشعارات', icon: Bell },
    { id: 'events' as const, label: 'الفعاليات', icon: Calendar },
    { id: 'tips' as const, label: 'نصائح تربوية', icon: Star },
  ];

  const typeColors: Record<string, string> = {
    urgent: 'bg-red-50 border-red-200 text-red-700',
    info: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8 flex flex-col gap-6">

        {/* Welcome banner */}
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          <div className="relative z-10">
            <h2 className="text-xl font-black mb-1">مجتمع أولياء الأمور</h2>
            <p className="text-amber-100 text-sm leading-relaxed">
              تواصل مع أساتذة أبنائك وأولياء الأمور الآخرين. تابع الإشعارات المدرسية والنصائح التربوية.
            </p>
          </div>
        </div>

        {/* Create Post */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <form onSubmit={handlePostSubmit}>
            <div className="flex gap-4 mb-4">
              <Image src="https://api.dicebear.com/7.x/avataaars/svg?seed=Parent" alt="User" className="w-11 h-11 rounded-full bg-slate-100 shrink-0 border border-slate-200" width={44} height={44} />
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="شارك سؤالاً أو ملاحظة مع الأساتذة وأولياء الأمور..."
                className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-slate-900 focus:ring-2 focus:ring-amber-100 focus:border-amber-300 resize-none outline-none transition-all text-sm"
                rows={3}
              />
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button type="button" className="flex items-center gap-2 text-slate-500 hover:text-amber-600 transition-colors px-3 py-2 rounded-lg hover:bg-amber-50 font-medium text-sm">
                <ImageIcon className="w-4 h-4 shrink-0" />
                صورة
              </button>
              <button
                type="submit"
                disabled={!newPost.trim()}
                className="bg-amber-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-amber-600 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2 text-sm"
              >
                نشر <Send className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </form>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex overflow-x-auto border-b border-slate-100">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id ? 'border-amber-500 text-amber-600 bg-amber-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                <tab.icon className="w-4 h-4 shrink-0" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6 bg-slate-50/50">
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                {activeTab === 'feed' && (
                  <div className="space-y-5">
                    {posts.map((post) => (
                      <div key={post.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author.avatar}`} alt={post.author.name} className="w-10 h-10 rounded-full border border-slate-100" width={40} height={40} />
                            <div>
                              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                {post.author.name}
                                <span className={`text-xs px-2 py-0.5 rounded-md font-bold ${post.author.role === 'أستاذ' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                  {post.author.role}
                                </span>
                              </h4>
                              <p className="text-xs text-slate-400">{post.time}</p>
                            </div>
                          </div>
                          <button className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100">
                            <MoreHorizontal className="w-4 h-4 shrink-0" />
                          </button>
                        </div>
                        <p className="text-slate-700 text-sm leading-relaxed mb-4">{post.content}</p>
                        <div className="flex items-center gap-5 pt-3 border-t border-slate-100">
                          <button className="flex items-center gap-1.5 text-slate-400 hover:text-red-500 text-sm font-bold transition-colors">
                            <Heart className="w-4 h-4 shrink-0" /> {post.likes}
                          </button>
                          <button className="flex items-center gap-1.5 text-slate-400 hover:text-indigo-600 text-sm font-bold transition-colors">
                            <MessageSquare className="w-4 h-4 shrink-0" /> {post.comments}
                          </button>
                          <button className="flex items-center gap-1.5 text-slate-400 hover:text-slate-700 text-sm font-bold transition-colors mr-auto">
                            <Share2 className="w-4 h-4 shrink-0" /> مشاركة
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'announcements' && (
                  <div className="space-y-4">
                    {announcements.map((ann) => (
                      <div key={ann.id} className={`p-5 rounded-2xl border ${typeColors[ann.type]}`}>
                        <div className="flex items-start gap-3">
                          <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-bold mb-1">{ann.title}</h3>
                            <p className="text-xs opacity-70 font-medium">من: {ann.from}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'events' && (
                  <div className="space-y-4">
                    {events.map((event) => (
                      <div key={event.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex justify-between items-center gap-4">
                        <div className="flex gap-4">
                          <div className="bg-amber-50 h-14 w-14 rounded-xl flex flex-col items-center justify-center border border-amber-100 shrink-0">
                            <span className="text-amber-500 text-[9px] font-bold">MAY</span>
                            <span className="text-amber-600 text-xl font-black">{event.date.split(' ')[0]}</span>
                          </div>
                          <div>
                            <span className="text-xs font-bold px-2 py-0.5 bg-amber-50 text-amber-700 rounded-md border border-amber-100 mb-1.5 inline-block">{event.type}</span>
                            <h3 className="font-bold text-slate-900 text-sm">{event.title}</h3>
                            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                              <Clock className="w-3 h-3 shrink-0" /> {event.time}
                            </p>
                          </div>
                        </div>
                        <button className="bg-amber-500 text-white text-sm font-bold py-2 px-4 rounded-xl hover:bg-amber-600 transition-colors shrink-0">
                          تسجيل
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'tips' && (
                  <div className="space-y-4">
                    {tips.map((tip) => (
                      <div key={tip.id} className="bg-white p-5 rounded-2xl border border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="inline-block text-xs font-bold px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md border border-indigo-100 mb-2">{tip.tag}</span>
                            <h3 className="font-bold text-slate-900 text-sm leading-snug hover:text-amber-600 mb-2">{tip.title}</h3>
                            <p className="text-xs text-slate-400">{tip.author}</p>
                          </div>
                          <div className="shrink-0 flex items-center gap-1 text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
                            <Clock className="w-3.5 h-3.5 shrink-0" /> {tip.readTime}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 shrink-0 text-amber-500" /> أولياء الأمور النشطون
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="relative cursor-pointer hover:-translate-y-1 transition-transform">
                <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=ParentA${i}`} alt="Active parent" className="w-10 h-10 rounded-full border border-slate-200 bg-slate-50" width={40} height={40} />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
              </div>
            ))}
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
              +45
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 shrink-0 text-indigo-500" /> روابط مهمة
          </h3>
          <div className="space-y-3">
            {[
              { label: 'تقرير أداء ابني', path: '/parent/children' },
              { label: 'إدارة الاشتراك', path: '/parent/billing' },
              { label: 'التواصل مع الأساتذة', path: '/parent/messages' },
              { label: 'المكتبة التعليمية', path: '/parent/library' },
            ].map((link, i) => (
              <a key={i} href={link.path} className="flex items-center gap-3 px-4 py-3 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl transition-colors text-slate-700 text-sm font-medium border border-transparent hover:border-indigo-100">
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-6 rounded-2xl text-white">
          <h3 className="font-bold text-base mb-2">نصيحة لولي الأمر</h3>
          <p className="text-amber-100 text-sm leading-relaxed">
            خصّص 10 دقائق يومياً لمتابعة تقدّم طفلك عبر لوحة التحكم. الأطفال الذين يشعرون بمتابعة والديهم يتحصّلون أكاديمياً بشكل أفضل.
          </p>
        </div>
      </div>
    </div>
  );
}
