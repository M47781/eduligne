"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import { MessageSquare, Heart, Share2, Image as ImageIcon, Send, MoreHorizontal, Users, Hash, Activity, FileText, ArrowLeft, Star, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Community() {
  const [activeTab, setActiveTab] = useState<'trending' | 'groups' | 'events' | 'articles'>('trending');
  
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: { name: 'د. سارة علي', avatar: '2', role: 'أستاذ' },
      content: 'تم إضافة ملخص جديد لدرس الرياضيات المتقدمة في قسم المكتبة. أنصح جميع الطلاب بالاطلاع عليه قبل الاختبار القادم.',
      time: 'منذ ساعتين',
      likes: 45,
      comments: 12,
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      author: { name: 'أحمد محمود', avatar: '1', role: 'طالب' },
      content: 'مرحباً بالجميع! هل يمكن لأحد مساعدتي في فهم مفهوم الـ Hooks في React؟ حاولت قراءة التوثيق الرسمي ولكن لا زلت أواجه بعض الصعوبات.',
      time: 'منذ 5 ساعات',
      likes: 12,
      comments: 5,
      image: null
    },
    {
      id: 3,
      author: { name: 'ياسين عمر', avatar: '3', role: 'طالب' },
      content: 'أخيراً أنهيت مشروعي الأول في دورة تطوير الويب! شكراً للأستاذ أحمد على شرحه المبسط.',
      time: 'منذ يوم واحد',
      likes: 89,
      comments: 24,
      image: null
    }
  ]);

  const [newPost, setNewPost] = useState('');

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post = {
      id: Date.now(),
      author: { name: 'أنت', avatar: 'Felix', role: 'طالب' },
      content: newPost,
      time: 'الآن',
      likes: 0,
      comments: 0,
      image: null
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  const groups = [
    { id: 1, name: 'نادي المبرمجين', desc: 'مساحة لتبادل الخبرات ومناقشة تقنيات البرمجة الحديثة.', members: 1250 },
    { id: 2, name: 'رواد الفيزياء', desc: 'مجموعة مخصصة لطلاب الفيزياء والتجارب العلمية.', members: 840 },
    { id: 3, name: 'تعلم الإنجليزية', desc: 'تطوير مهارات المحادثة والقراءة باللغة الإنجليزية.', members: 3200 },
  ];

  const events = [
    { id: 1, title: 'محاضرة: مستقبل الذكاء الاصطناعي', speaker: 'د. خالد عبدالله', date: '15 نوفمبر 2026', time: '08:00 مساءً' },
    { id: 2, title: 'ورشة عمل: أساسيات التصميم', speaker: 'أ. سارة محمد', date: '20 نوفمبر 2026', time: '05:00 مساءً' },
  ];

  const articles = [
    { id: 1, title: 'كيف تنظم وقتك للدراسة بفعالية', author: 'أ. منال سعد', readTime: '5 دقائق' },
    { id: 2, title: 'أفضل 10 أدوات لتعلم البرمجة', author: 'د. أحمد صبحي', readTime: '8 دقائق' },
  ];

  const tabs = [
    { id: 'trending', label: 'المحتوى الرائج', icon: Star },
    { id: 'groups', label: 'المجموعات', icon: Users },
    { id: 'events', label: 'الفعاليات', icon: Calendar },
    { id: 'articles', label: 'المقالات', icon: FileText },
  ] as const;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
      {/* Main Content */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        
        {/* Stories (Teachers Only) */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 overflow-x-auto hide-scrollbar">
          <div className="flex gap-4">
            <div className="flex flex-col items-center gap-2 shrink-0">
               {/* Note: In this educational setup, only teachers can post stories. For students, it's view only.*/}
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <ImageIcon   className="w-6 h-6 shrink-0"/>
              </div>
              <span className="text-xs font-medium text-slate-500">قصص الأساتذة</span>
            </div>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group">
                <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 to-indigo-500 group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-white rounded-full p-0.5 relative">
                    <Image  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher${i}`} alt="Story" className="w-full h-full rounded-full bg-slate-100" width={500} height={500} />
                    <div className="absolute bottom-0 right-0 bg-amber-500 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
                        <CheckCircle2  className="w-4 h-4 shrink-0 text-white" />
                    </div>
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-700">أستاذ {i}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Create Post */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <form onSubmit={handlePostSubmit}>
            <div className="flex gap-4 mb-4">
              <Image  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-12 h-12 rounded-full bg-slate-100 shrink-0 border border-slate-200" width={500} height={500} />
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="بم تفكر؟ شارك أفكارك أو اطرح سؤالاً..."
                className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-slate-900 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 resize-none outline-none transition-all"
                rows={3}
              ></textarea>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button type="button" className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors px-4 py-2 rounded-lg hover:bg-indigo-50 font-medium">
                <ImageIcon   className="w-5 h-5 shrink-0"/>
                <span>إضافة صورة</span>
              </button>
              <button 
                type="submit"
                disabled={!newPost.trim()}
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2 shadow-sm shadow-indigo-200"
              >
                نشر
                <Send   className="w-4 h-4 shrink-0"/>
              </button>
            </div>
          </form>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex overflow-x-auto border-b border-slate-100 hide-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                <tab.icon className="w-4 h-4 shrink-0"  />
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="p-6 bg-slate-50 border-t border-slate-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'trending' && (
                  <div className="space-y-6">
                    {posts.map((post) => (
                      <div key={post.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-shadow hover:shadow-md">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <Image  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author.avatar}`} alt={post.author.name} className="w-12 h-12 rounded-full border border-slate-100" width={500} height={500} />
                            <div>
                              <h4 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
                                {post.author.name}
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                                    post.author.role === 'أستاذ' ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'
                                }`}>
                                  {post.author.role}
                                </span>
                              </h4>
                              <p className="text-sm text-slate-500 font-medium">{post.time}</p>
                            </div>
                          </div>
                          <button className="text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors">
                            <MoreHorizontal   className="w-5 h-5 shrink-0"/>
                          </button>
                        </div>

                        <div className="mb-4">
                          <p className="text-slate-800 leading-relaxed whitespace-pre-wrap text-[15px]">{post.content}</p>
                          {post.image && (
                            <div className="mt-4 rounded-xl overflow-hidden border border-slate-100">
                              <Image  src={post.image} alt="Post attachment" className="w-full h-auto max-h-96 object-cover" referrerPolicy="no-referrer" width={500} height={500} />
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <div className="flex items-center gap-2 sm:gap-6">
                            <button className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors group">
                              <div className="p-2 rounded-full group-hover:bg-red-50 transition-colors">
                                <Heart  className="w-5 h-5 shrink-0 group-hover:fill-red-500" />
                              </div>
                              <span className="text-sm font-bold">{post.likes}</span>
                            </button>
                            <button className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors group">
                              <div className="p-2 rounded-full group-hover:bg-indigo-50 transition-colors">
                                <MessageSquare  className="w-5 h-5 shrink-0 group-hover:fill-indigo-600" />
                              </div>
                              <span className="text-sm font-bold">{post.comments}</span>
                            </button>
                          </div>
                          <button className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors group">
                            <div className="p-2 rounded-full group-hover:bg-slate-100 transition-colors">
                              <Share2   className="w-5 h-5 shrink-0"/>
                            </div>
                            <span className="text-sm font-bold hidden sm:inline">مشاركة</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'groups' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {groups.map(group => (
                        <div key={group.id} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-300 transition-all">
                           <h3 className="text-xl font-bold text-slate-900 mb-2">{group.name}</h3>
                           <p className="text-sm text-slate-600 mb-4 line-clamp-2">{group.desc}</p>
                           <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                              <div className="flex items-center gap-1.5 text-slate-500 font-medium text-sm">
                                 <Users   className="w-4 h-4 shrink-0"/>
                                 {group.members.toLocaleString('en-US')} عضو
                              </div>
                              <button className="text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 text-sm font-bold rounded-lg transition-colors">انضمام</button>
                           </div>
                        </div>
                     ))}
                  </div>
                )}

                {activeTab === 'events' && (
                  <div className="space-y-4">
                     {events.map(event => (
                        <div key={event.id} className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                           <div className="flex gap-4">
                              <div className="bg-amber-50 h-16 w-16 rounded-xl flex flex-col items-center justify-center border border-amber-100 shrink-0">
                                 <span className="text-amber-500 text-xs font-bold font-mono">NOV</span>
                                 <span className="text-amber-600 text-xl font-black">{event.date.split(' ')[0]}</span>
                              </div>
                              <div>
                                 <h3 className="font-bold text-slate-900 text-lg mb-1">{event.title}</h3>
                                 <p className="text-sm text-slate-600 mb-2">{event.speaker}</p>
                                 <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                    <Clock  className="w-4 h-4 shrink-0 text-slate-400" />
                                    {event.time}
                                 </div>
                              </div>
                           </div>
                           <button className="bg-indigo-600 text-white font-bold py-2.5 px-6 rounded-xl text-sm hover:bg-indigo-700 w-full sm:w-auto">تسجيل الان</button>
                        </div>
                     ))}
                  </div>
                )}

                {activeTab === 'articles' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {articles.map(article => (
                        <div key={article.id} className="bg-white p-6 rounded-2xl border border-slate-200">
                           <h3 className="font-bold text-slate-900 text-lg mb-3 leading-snug hover:text-indigo-600 cursor-pointer">{article.title}</h3>
                           <div className="flex items-center justify-between text-sm text-slate-500 font-medium">
                              <span>{article.author}</span>
                              <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                                 <Clock   className="w-4 h-4 shrink-0"/>
                                 {article.readTime}
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

      {/* Sidebar Widgets */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Active Members Widget */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
           <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 shrink-0 text-indigo-500" /> الأعضاء النشطون
           </h3>
           <div className="flex items-center gap-3">
              {[1, 2, 3, 4, 5].map(i => (
                 <div key={i} className="relative cursor-pointer hover:-translate-y-1 transition-transform">
                    <Image  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Active${i}`} alt="Active member" className="w-10 h-10 rounded-full border border-slate-200 bg-slate-50" width={500} height={500} />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                 </div>
              ))}
              <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 cursor-pointer hover:bg-slate-200">
                 +99
              </div>
           </div>
        </div>

        {/* Trending Topics Widget */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
           <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Hash className="w-5 h-5 shrink-0 text-amber-500" /> التريند التعليمي
           </h3>
           <div className="space-y-4">
              {[
                 { tag: 'تعلم_الذكاء_الاصطناعي', posts: '2.5k' },
                 { tag: 'مشاريع_التخرج_2026', posts: '1.2k' },
                 { tag: 'نصائح_لبرمجة_نظيفة', posts: '850' },
                 { tag: 'منحة_الدراسة_بالخارج', posts: '640' }
              ].map((topic, i) => (
                 <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <span className="text-slate-700 font-semibold group-hover:text-indigo-600 transition-colors">#{topic.tag}</span>
                    <span className="text-xs font-medium text-slate-400">{topic.posts} منشور</span>
                 </div>
              ))}
           </div>
        </div>

        {/* Suggested Groups Widget */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
           <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 shrink-0 text-emerald-500" /> مجموعات مقترحة
           </h3>
           <div className="space-y-4">
              {groups.slice(0,2).map(group => (
                 <div key={group.id} className="flex gap-3">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0 font-bold border border-indigo-100 text-lg">
                       {group.name[0]}
                    </div>
                    <div>
                       <h4 className="font-bold text-slate-900 text-sm mb-1">{group.name}</h4>
                       <p className="text-xs text-slate-500 font-medium mb-2">{group.members} عضو</p>
                       <button className="text-indigo-600 text-xs font-bold hover:underline">انضمام للمجموعة</button>
                    </div>
                 </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
}

