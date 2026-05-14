"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import { PlayCircle, Trophy, Star, Users, ArrowLeft, Wrench, Video, ChevronLeft, Crown, Target } from 'lucide-react';
import Link from 'next/link';

import { motion } from 'motion/react';

export default function STEM() {
  const [activeTab, setActiveTab] = useState('الكل');

  const levels = ['الكل', 'مبتدئ', 'متوسط', 'متقدم'];

  const projects = [
    { id: 1, title: 'بناء روبوت متتبع للخط', category: 'روبوتيك', level: 'متوسط', duration: '4 أسابيع', materials: ['متحكم دقيق', 'حساسات IR', 'محركات DC', 'بطاريات'], image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=600&q=80', videoLength: '12:45' },
    { id: 2, title: 'المرشح الحيوي الذكي (محاكي الكلى)', category: 'أحياء وهندسة', level: 'متقدم', duration: 'أسبوعين', materials: ['مضخة ماء صغيرة', 'أنابيب شفافة', 'فلاتر دقيقة', 'أردوينو'], image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=600&q=80', videoLength: '18:20' },
    { id: 3, title: 'السفينة الذكية', category: 'الهندسة والفيزياء', level: 'متوسط', duration: 'أسبوعين', materials: ['محرك بحري', 'مستشعرات مسافة', 'خشب/بلاستيك مبثوق', 'لوحة طاقة شمسية'], image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=800&q=80', videoLength: '15:10' },
    { id: 4, title: 'برمجة لعبة تفاعلية باستخدام Scratch', category: 'برمجة', level: 'مبتدئ', duration: '3 أسابيع', materials: ['جهاز كمبيوتر', 'حساب سكراتش', 'أفكار إبداعية'], image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80', videoLength: '08:30' },
    { id: 5, title: 'استخراج الحمض النووي (DNA) من الفراولة', category: 'علوم', level: 'مبتدئ', duration: 'أسبوع واحد', materials: ['فراولة', 'ملح', 'صابون أطباق', 'كحول طبي', 'مصفاة'], image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80', videoLength: '10:05' },
    { id: 6, title: 'مشروع ذراع الأمل (طرف صناعي ذكي)', category: 'الروبوتيك الطبي', level: 'متقدم', duration: '5 أسابيع', materials: ['طابعة ثلاثية الأبعاد', 'محركات سيرفو', 'مستشعرات عضلية (EMG)', 'أردوينو نانو'], image: 'https://images.unsplash.com/photo-1581093196277-cb3197607a38?auto=format&fit=crop&w=600&q=80', videoLength: '24:50' },
  ];

  const filteredProjects = activeTab === 'الكل' ? projects : projects.filter(p => p.level === activeTab);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl pointer-events-none transform -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-indigo-100 font-bold text-sm mb-6 border border-white/20">
            <Star  className="w-4 h-4 shrink-0 text-amber-400" fill="currentColor" /> منصة الإبداع العلمي
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            عالم <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">STEM</span> التفاعلي!
          </h1>
          <p className="text-indigo-100/90 text-lg md:text-xl mb-10 leading-relaxed font-medium max-w-2xl">
            اكتشف مشاريع عملية وتحديات ممتعة تنمي مهارات التفكير النقدي والإبداع في مجالات العلوم والتكنولوجيا والهندسة والرياضيات.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/student/stem/factory-mission" className="bg-white text-indigo-950 px-8 py-4 rounded-2xl font-black hover:bg-indigo-50 hover:shadow-xl hover:shadow-white/10 transition-all flex items-center justify-center gap-3 text-lg">
              <PlayCircle  className="w-6 h-6 shrink-0 text-indigo-600" />
              ابدأ التحدي الأول
            </Link>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-3 text-lg">
              تصفح كل المشاريع <ArrowLeft   className="w-5 h-5 shrink-0"/>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Monthly Challenge (2/3 width) */}
        <div className="lg:col-span-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-8 shadow-lg relative overflow-hidden text-white flex flex-col md:flex-row items-center gap-8 border border-orange-400/50">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 relative bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-2xl">
            <Trophy  className="w-6 h-6 shrink-0 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
            <div className="absolute -bottom-4 bg-slate-900 text-amber-400 font-black px-4 py-2 rounded-xl text-sm shadow-xl border border-slate-700 whitespace-nowrap">
              تحدي الشهر
            </div>
          </div>
          
          <div className="flex-1 relative z-10">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h2 className="text-3xl font-black">تصميم سيارة شمسية مصغرة</h2>
              <span className="bg-rose-500 text-white px-3 py-1.5 rounded-lg text-xs font-black shadow-sm flex items-center gap-1.5">
                <Target   className="w-4 h-4 shrink-0"/> ينتهي بعد 5 أيام
              </span>
            </div>
            <p className="text-orange-50 font-medium mb-6 leading-relaxed max-w-lg">
              استخدم مهاراتك في الهندسة والفيزياء لتصميم وبناء نموذج لسيارة صغيرة تعمل بالطاقة الشمسية وتدير مسارها بكفاءة. شارك مشروعك للتربع على عرش الصدارة!
            </p>
            
            <div className="flex flex-wrap items-center gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
              <div className="flex items-center gap-2">
                <Users  className="w-5 h-5 shrink-0 text-orange-200" />
                <span className="font-bold">120 مشارك</span>
              </div>
              <div className="w-px h-6 bg-white/20"></div>
              <div className="flex items-center gap-2">
                <Star  className="w-5 h-5 shrink-0 fill-white text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                <span className="font-black text-lg">1,000 إكس بي</span>
              </div>
              <button className="mr-auto bg-white text-orange-600 px-6 py-2.5 rounded-xl font-bold hover:shadow-lg transition-all active:scale-95 shadow-orange-700/20">
                شارك الآن
              </button>
            </div>
          </div>
        </div>

        {/* Leaderboard Preview (1/3 width) */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Crown className="w-6 h-6 shrink-0 text-amber-500" />
              أبطال STEM
            </h2>
            <Link href="/student/stem/leaderboard" className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
              <ChevronLeft   className="w-5 h-5 shrink-0"/>
            </Link>
          </div>
          
          <div className="space-y-3 flex-1 flex flex-col justify-center">
            {[
              { name: 'أحمد محمود', points: '12,450', rank: 1, color: 'text-amber-500', bg: 'bg-amber-50 border-amber-200' },
              { name: 'سارة خالد', points: '11,200', rank: 2, color: 'text-slate-400', bg: 'bg-slate-50 border-slate-200' },
              { name: 'عمر طارق', points: '10,800', rank: 3, color: 'text-orange-500', bg: 'bg-orange-50 border-orange-200' },
            ].map((user) => (
              <div key={user.rank} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group border border-transparent hover:border-slate-100">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${user.bg} ${user.color} border shadow-sm`}>
                  {user.rank}
                </div>
                <Image  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="User" className="w-12 h-12 rounded-full border-2 border-white shadow-sm bg-indigo-50" width={500} height={500} />
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900">{user.name}</h4>
                  <p className="text-sm font-bold text-indigo-600 group-hover:text-amber-500 transition-colors">{user.points} XP</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid with Tabs */}
      <div className="mt-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-900">مشاريع التعلم النشط</h2>
            <p className="text-slate-500 mt-1 font-medium">ابدأ رحلتك من التجربة إلى الإبداع</p>
          </div>
          
          <div className="flex gap-2 p-1 bg-slate-100 border border-slate-200 rounded-2xl w-max overflow-x-auto hide-scrollbar">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setActiveTab(level)}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                  activeTab === level 
                    ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/60' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Link key={project.id} href={`/student/stem/project/${project.id}`} className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-indigo-300 transition-all duration-300 flex flex-col cursor-pointer">
              <div className="h-56 relative overflow-hidden m-2 rounded-2xl">
                <Image  src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" width={500} height={500} />
                
                {/* Video Play Overlay */}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center text-indigo-600 shadow-xl shadow-black/20 transform scale-90 group-hover:scale-100 transition-transform duration-300 pl-1">
                      <PlayCircle  className="w-6 h-6 shrink-0 fill-current" />
                   </div>
                </div>

                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-black text-indigo-700 shadow-sm shadow-black/10">
                  {project.category}
                </div>
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-bold text-white flex items-center gap-1.5 shadow-sm">
                  <Video   className="w-4 h-4 shrink-0"/> {project.videoLength}
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-black text-slate-900 mb-3 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors h-14">{project.title}</h3>
                
                <div className="flex items-center gap-4 mt-auto mb-5">
                   <div className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                     project.level === 'مبتدئ' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                     project.level === 'متوسط' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                     'bg-rose-50 text-rose-700 border border-rose-100'
                   }`}>
                     {project.level}
                   </div>
                   <div className="text-sm font-bold text-slate-500 whitespace-nowrap">
                     {project.duration}
                   </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mt-auto">
                   <h4 className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-2">
                     <Wrench  className="w-4 h-4 shrink-0 text-slate-400" /> الأدوات المختصرة:
                   </h4>
                   <div className="flex flex-wrap gap-1.5">
                     {project.materials.map((m, idx) => (
                       <span key={idx} className="bg-white border border-slate-200 text-slate-600 text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                         {m}
                       </span>
                     ))}
                   </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
