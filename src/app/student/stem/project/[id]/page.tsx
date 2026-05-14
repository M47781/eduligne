"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import { PlayCircle, ShieldCheck, ArrowLeft, Wrench, Video, ChevronRight, UploadCloud, CheckCircle2, Trophy, Star, Lightbulb, User } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { motion, AnimatePresence } from 'motion/react';

export default function STEMProjectDetails() {
  const { id } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  // Mock project data
  const project = {
    id: 1,
    title: 'بناء روبوت متتبع للخط',
    category: 'روبوتيك',
    level: 'متوسط',
    duration: '4 أسابيع',
    xp: 500,
    materials: ['متحكم دقيق', 'حساسات IR', 'محركات DC', 'بطاريات', 'هيكل الروبوت', 'أسلاك توصيل'],
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80',
    description: 'في هذا التحدي العملي، ستتعلم كيف تبني روبوتك الأول الذي يتبع مساراً أسود تلقائياً. ستتعرف على كيفية دمج حساسات الأشعة تحت الحمراء مع المتحكم الدقيق للتحكم في حركة المحركات.',
    steps: [
      { id: 1, title: 'تحضير الهيكل', desc: 'تجميع هيكل الروبوت وتثبيت المحركات في أماكنها الصحيحة مع العجلات.', time: '30 دقيقة' },
      { id: 2, title: 'توصيل الدارة الكهربائية', desc: 'توصيل حساسات الـ IR والمحركات بلوحة التحكم (الأردوينو).', time: '45 دقيقة' },
      { id: 3, title: 'برمجة المتحكم', desc: 'كتابة شيفرة برمجية لقراءة البيانات من الحساسات واتخاذ قرارات التوجيه.', time: '60 دقيقة' },
      { id: 4, title: 'الاختبار والضبط', desc: 'وضع الروبوت على المسار الأسود وضبط الحساسات للعمل بشكل مثالي.', time: '30 دقيقة' },
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Dummy video
  };

  const currentStep = project.steps[activeStep];

  const handleUploadResult = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      
      {/* Navigation */}
      <div className="flex items-center gap-2 text-sm font-bold text-slate-500 mb-6">
        <Link href="/student/stem" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
          <ChevronRight   className="w-4 h-4 shrink-0"/> منصة STEM
        </Link>
        <span>/</span>
        <span className="text-slate-900">{project.title}</span>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Video & Details) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main Video Banner */}
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl aspect-video relative group">
            {/* Typically you would embed an iframe here, using an image placeholder for the mockup */}
            <Image  src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80" width={500} height={500} />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center cursor-pointer">
               <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full border border-white/40 flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform pl-2">
                  <PlayCircle  className="w-6 h-6 shrink-0 fill-white/80" />
               </div>
            </div>
            
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-white font-bold text-sm flex items-center gap-2">
               <Video   className="w-4 h-4 shrink-0"/> الدرس الكامل
            </div>
          </div>

          {/* Project Details */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
             
             <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-black border border-indigo-100">
                  {project.category}
                </div>
                <div className="flex items-center gap-2 text-amber-500 font-bold bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
                   <Star  fill="currentColor"  className="w-4 h-4 shrink-0"/> {project.xp} نقطة XP
                </div>
             </div>

             <h1 className="text-3xl font-black text-slate-900 mb-4 leading-tight">{project.title}</h1>
             <p className="text-slate-600 text-lg leading-relaxed mb-8">{project.description}</p>

             {/* Metadata */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'المستوى', value: project.level, icon: Trophy, color: 'text-rose-500', bg: 'bg-rose-50 border-rose-100' },
                  { label: 'المدة المقدرة', value: project.duration, icon: PlayCircle, color: 'text-indigo-500', bg: 'bg-indigo-50 border-indigo-100' },
                  { label: 'المشاركون', value: '1,204', icon: User, color: 'text-emerald-500', bg: 'bg-emerald-50 border-emerald-100' },
                  { label: 'تحديث', value: 'أبريل 2026', icon: ShieldCheck, color: 'text-amber-500', bg: 'bg-amber-50 border-amber-100' },
                ].map((meta, idx) => (
                  <div key={idx} className={`p-4 rounded-2xl ${meta.bg} border flex items-center gap-3`}>
                     <div className={`p-2 rounded-xl bg-white shadow-sm ${meta.color}`}>
                       <meta.icon className="w-5 h-5 shrink-0"  />
                     </div>
                     <div>
                        <p className="text-xs font-bold text-slate-500 mb-0.5">{meta.label}</p>
                        <p className="text-sm font-black text-slate-900">{meta.value}</p>
                     </div>
                  </div>
                ))}
             </div>

             {/* Materials Needed */}
             <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
               <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                 <Wrench className="w-5 h-5 shrink-0 text-slate-500" /> الأدوات والمواد المطلوبة
               </h3>
               <div className="flex flex-wrap gap-2">
                 {project.materials.map((m, idx) => (
                   <span key={idx} className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm shadow-sm flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> {m}
                   </span>
                 ))}
               </div>
             </div>
          </div>
          
        </div>

        {/* Right Column (Steps & Upload) */}
        <div className="space-y-6">
           
           {/* Steps Path */}
           <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
               <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                 <Lightbulb className="w-5 h-5 shrink-0 text-amber-500" /> خطوات التنفيذ
               </h3>
               
               <div className="space-y-4 relative">
                  {/* Progress Line */}
                  <div className="absolute right-6 top-8 bottom-8 w-1 bg-slate-100 rounded-full"></div>
                  <div className="absolute right-6 top-8 w-1 bg-indigo-500 rounded-full transition-all duration-500" style={{ height: `${(activeStep / (project.steps.length - 1)) * 100}%` }}></div>

                  {project.steps.map((step, idx) => {
                    const isActive = idx === activeStep;
                    const isCompleted = idx < activeStep;
                    
                    return (
                      <div 
                        key={step.id} 
                        className={`relative z-10 flex gap-4 cursor-pointer p-3 rounded-2xl transition-all ${
                          isActive ? 'bg-indigo-50 border border-indigo-100' : 'hover:bg-slate-50 border border-transparent'
                        }`}
                        onClick={() => setActiveStep(idx)}
                      >
                         <div className={`w-12 h-12 rounded-xl shrink-0 flex items-center justify-center font-black shadow-sm transition-colors ${
                           isActive ? 'bg-indigo-600 text-white' :
                           isCompleted ? 'bg-emerald-500 text-white' :
                           'bg-white border border-slate-200 text-slate-400'
                         }`}>
                           {isCompleted ? <CheckCircle2   className="w-6 h-6 shrink-0"/> : step.id}
                         </div>
                         <div className="flex-1">
                            <h4 className={`font-black mb-1 ${isActive ? 'text-indigo-900' : 'text-slate-700'}`}>{step.title}</h4>
                            <p className="text-xs font-bold text-slate-500 mb-2">{step.time}</p>
                            
                            <AnimatePresence>
                              {isActive && (
                                <motion.div 
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <p className="text-sm text-slate-600 leading-relaxed font-medium pb-2 border-t border-indigo-200/50 pt-2 mt-2">
                                    {step.desc}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                         </div>
                      </div>
                    )
                  })}
               </div>
               
               {activeStep < project.steps.length - 1 ? (
                 <button 
                   onClick={() => setActiveStep(s => s + 1)}
                   className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/20"
                 >
                   إتمام الخطوة والانتقال للتالية
                 </button>
               ) : (
                 <button 
                   onClick={() => setShowUploadMenu(true)}
                   className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                 >
                   <CheckCircle2   className="w-5 h-5 shrink-0"/> إنهاء المشروع ورفع النتيجة
                 </button>
               )}
           </div>

           {/* Upload Result Block */}
           <AnimatePresence>
             {showUploadMenu && (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="bg-white rounded-3xl p-6 border-2 border-dashed border-indigo-300 shadow-sm text-center relative overflow-hidden"
               >
                 <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <UploadCloud   className="w-6 h-6 shrink-0"/>
                 </div>
                 <h3 className="text-lg font-black text-slate-900 mb-2">ارفع نتيجة مشروعك</h3>
                 <p className="text-sm text-slate-500 mb-6 px-4">
                   قم بتصوير فيديو قصير (لا يتجاوز دقيقة) يظهر عمل مشروعك النهائى لكي تحصل على النقاط!
                 </p>
                 
                 {file ? (
                   <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <Video className="w-6 h-6 shrink-0 text-emerald-500 shrink-0" />
                        <span className="text-sm font-bold text-slate-700 truncate" dir="ltr">{file.name}</span>
                      </div>
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
                   </div>
                 ) : (
                   <div className="relative mb-4">
                     <input 
                       type="file" 
                       accept="video/*" 
                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                       onChange={handleUploadResult}
                     />
                     <div className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl shadow-md w-full">
                        اختر ملف الفيديو
                     </div>
                   </div>
                 )}
                 
                 <button 
                    disabled={!file}
                    className="w-full font-bold text-sm text-slate-500 hover:text-slate-800 disabled:opacity-50"
                 >
                    تخطي في الوقت الحالي
                 </button>
               </motion.div>
             )}
           </AnimatePresence>
           
        </div>
      </div>
    </div>
  );
}
