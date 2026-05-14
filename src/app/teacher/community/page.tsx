"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import { MessageSquare, Heart, Share2, Image as ImageIcon, Send, MoreHorizontal, Users, Hash, Activity, FileText, Star, Clock, Calendar, Pin, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function TeacherCommunity() {
  const [activeTab, setActiveTab] = useState<'trending' | 'groups' | 'events' | 'articles'>('trending');
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: { name: 'د. خالد بن علي', avatar: '5', role: 'أستاذ' },
      content: 'أنشأت ملخصاً شاملاً لدرس الكيمياء العضوية للبكالوريا. يمكن لجميع الأساتذة الاستفادة منه ومشاركته مع طلابهم من قسم المكتبة.',
      time: 'منذ ساعة',
      likes: 34,
      comments: 8,
      isPinned: true,
      image: null,
    },
    {
      id: 2,
      author: { name: 'أ. سارة محمدي', avatar: '2', role: 'أستاذ' },
      content: 'هل جرّب أحد منكم استخدام منهجية 4MAT في تدريس الرياضيات؟ لاحظت تحسناً ملحوظاً في مستوى التفاعل لدى الطلاب خاصة في مرحلة "لماذا؟".',
      time: 'منذ 3 ساعات',
      likes: 56,
      comments: 15,
      isPinned: false,
      image: null,
    },
    {
      id: 3,
      author: { name: 'أ. يوسف قاسم', avatar: '4', role: 'أستاذ' },
      content: 'مبادرة رائعة من فريق Eduligne — إطار 4MAT يحوّل الدرس العادي إلى تجربة تعلّم متكاملة. أشاركم نموذجاً طبّقته هذا الأسبوع.',
      time: 'منذ يوم',
      likes: 89,
      comments: 22,
      isPinned: false,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
  ]);

  const [newPost, setNewPost] = useState('');

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    setPosts([{
      id: Date.now(),
      author: { name: 'أنت', avatar: 'Teacher', role: 'أستاذ' },
      content: newPost,
      time: 'الآن',
      likes: 0,
      comments: 0,
      isPinned: false,
      image: null,
    }, ...posts]);
    setNewPost('');
  };

  const groups = [
    { id: 1, name: 'أساتذة العلوم والرياضيات', desc: 'تبادل المناهج والأساليب التدريسية في المواد العلمية.', members: 420 },
    { id: 2, name: 'مجتمع الذكاء الاصطناعي في التعليم', desc: 'مناقشة توظيف الذكاء الاصطناعي وأدواته في التدريس.', members: 280 },
    { id: 3, name: 'مختبر STEM الرقمي', desc: 'تصميم وتطوير مشاريع STEM التفاعلية للطلاب.', members: 195 },
  ];

  const events = [
    { id: 1, title: 'ورشة: تطبيق 4MAT في الفصل الدراسي', speaker: 'أ. سارة صحراوي', date: '15 مايو 2026', time: '04:00 مساءً' },
    { id: 2, title: 'ندوة: قياس التفاعل والتحصيل الدراسي', speaker: 'د. منصور بلحاج', date: '22 مايو 2026', time: '06:00 مساءً' },
  ];

  const articles = [
    { id: 1, title: 'كيف تصمم اختباراً يقيس الفهم الحقيقي لا الحفظ', author: 'أ. يوسف قاسم', readTime: '7 دقائق' },
    { id: 2, title: 'إدارة الفصل الرقمي: أدوات وممارسات مجرّبة', author: 'د. خالد بن علي', readTime: '10 دقائق' },
  ];

  const tabs = [
    { id: 'trending' as const, label: 'المحتوى الرائج', icon: Star },
    { id: 'groups' as const, label: 'المجموعات', icon: Users },
    { id: 'events' as const, label: 'الفعاليات', icon: Calendar },
    { id: 'articles' as const, label: 'المقالات', icon: FileText },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8 flex flex-col gap-6">

        {/* Teacher stories */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
          <div className="flex gap-4">
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                <span className="text-white text-xl font-black">+</span>
              </div>
              <span className="text-xs font-medium text-slate-500">قصتك</span>
            </div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group">
                <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 to-indigo-500 group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-white rounded-full p-0.5">
                    <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=TStory${i}`} alt="Story" className="w-full h-full rounded-full bg-slate-100" width={60} height={60} />
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
              <Image src="https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher" alt="User" className="w-12 h-12 rounded-full bg-slate-100 shrink-0 border border-slate-200" width={48} height={48} />
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="شارك تجربتك التدريسية، اطرح سؤالاً، أو أضف موارد مفيدة..."
                className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-slate-900 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 resize-none outline-none transition-all text-sm"
                rows={3}
              />
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button type="button" className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors px-4 py-2 rounded-lg hover:bg-indigo-50 font-medium text-sm">
                <ImageIcon className="w-5 h-5 shrink-0" />
                <span>إضافة صورة</span>
              </button>
              <button
                type="submit"
                disabled={!newPost.trim()}
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2 shadow-sm text-sm"
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
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
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
                {activeTab === 'trending' && (
                  <div className="space-y-5">
                    {posts.map((post) => (
                      <div key={post.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        {post.isPinned && (
                          <div className="flex items-center gap-1.5 text-amber-600 text-xs font-bold mb-3">
                            <Pin className="w-3.5 h-3.5 shrink-0" />
                            مثبّت من المشرف
                          </div>
                        )}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author.avatar}`} alt={post.author.name} className="w-11 h-11 rounded-full border border-slate-100" width={44} height={44} />
                            <div>
                              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                                {post.author.name}
                                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700">{post.author.role}</span>
                              </h4>
                              <p className="text-xs text-slate-400 font-medium">{post.time}</p>
                            </div>
                          </div>
                          <button className="text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100">
                            <MoreHorizontal className="w-4 h-4 shrink-0" />
                          </button>
                        </div>
                        <p className="text-slate-800 leading-relaxed text-sm mb-4">{post.content}</p>
                        {post.image && (
                          <div className="rounded-xl overflow-hidden border border-slate-100 mb-4">
                            <Image src={post.image} alt="Post" className="w-full max-h-64 object-cover" referrerPolicy="no-referrer" width={600} height={300} />
                          </div>
                        )}
                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                          <div className="flex items-center gap-5">
                            <button className="flex items-center gap-1.5 text-slate-500 hover:text-red-500 transition-colors text-sm font-bold">
                              <Heart className="w-4 h-4 shrink-0" /> {post.likes}
                            </button>
                            <button className="flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 transition-colors text-sm font-bold">
                              <MessageSquare className="w-4 h-4 shrink-0" /> {post.comments}
                            </button>
                          </div>
                          <button className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 text-sm font-bold">
                            <Share2 className="w-4 h-4 shrink-0" /> مشاركة
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'groups' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {groups.map((group) => (
                      <div key={group.id} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-300 transition-all">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{group.name}</h3>
                        <p className="text-sm text-slate-600 mb-4 line-clamp-2">{group.desc}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <div className="flex items-center gap-1.5 text-slate-500 font-medium text-sm">
                            <Users className="w-4 h-4 shrink-0" /> {group.members} عضو
                          </div>
                          <button className="text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-1.5 text-sm font-bold rounded-lg transition-colors border border-indigo-100">
                            انضمام
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'events' && (
                  <div className="space-y-4">
                    {events.map((event) => (
                      <div key={event.id} className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex gap-4">
                          <div className="bg-indigo-50 h-14 w-14 rounded-xl flex flex-col items-center justify-center border border-indigo-100 shrink-0">
                            <span className="text-indigo-500 text-[10px] font-bold font-mono uppercase">MAY</span>
                            <span className="text-indigo-600 text-xl font-black">{event.date.split(' ')[0]}</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 mb-1">{event.title}</h3>
                            <p className="text-sm text-slate-500 mb-2">{event.speaker}</p>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                              <Clock className="w-3.5 h-3.5 shrink-0" /> {event.time}
                            </div>
                          </div>
                        </div>
                        <button className="bg-indigo-600 text-white font-bold py-2.5 px-5 rounded-xl text-sm hover:bg-indigo-700 w-full sm:w-auto">
                          تسجيل
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'articles' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {articles.map((article) => (
                      <div key={article.id} className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
                        <h3 className="font-bold text-slate-900 text-base mb-3 leading-snug hover:text-indigo-600">{article.title}</h3>
                        <div className="flex items-center justify-between text-sm text-slate-500 font-medium">
                          <span>{article.author}</span>
                          <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md text-xs">
                            <Clock className="w-3.5 h-3.5 shrink-0" /> {article.readTime}
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
            <Activity className="w-5 h-5 shrink-0 text-indigo-500" /> الأساتذة النشطون
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="relative cursor-pointer hover:-translate-y-1 transition-transform">
                <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=ActiveT${i}`} alt="Active teacher" className="w-10 h-10 rounded-full border border-slate-200 bg-slate-50" width={40} height={40} />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
              </div>
            ))}
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
              +28
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Hash className="w-5 h-5 shrink-0 text-amber-500" /> المواضيع التعليمية الرائجة
          </h3>
          <div className="space-y-3">
            {[
              { tag: 'منهجية_4MAT', posts: '1.2k' },
              { tag: 'تعليم_STEM_الجزائر', posts: '890' },
              { tag: 'الذكاء_الاصطناعي_للمعلمين', posts: '640' },
              { tag: 'البكالوريا_2026', posts: '2.1k' },
            ].map((topic, i) => (
              <div key={i} className="flex items-center justify-between cursor-pointer group">
                <span className="text-slate-700 font-semibold text-sm group-hover:text-indigo-600 transition-colors">#{topic.tag}</span>
                <span className="text-xs font-medium text-slate-400">{topic.posts}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-2xl text-white">
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-amber-400" />
            نصيحة الأسبوع
          </h3>
          <p className="text-indigo-100 text-sm leading-relaxed">
            جرّب تطبيق خطوة "لماذا؟" من إطار 4MAT في أول 5 دقائق من درسك. الطلاب الذين يفهمون سبب تعلّم الموضوع يحصّلون أفضل بنسبة 40%.
          </p>
        </div>
      </div>
    </div>
  );
}
