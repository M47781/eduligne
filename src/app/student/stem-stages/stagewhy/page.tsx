"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, Factory, ShieldAlert, PlayCircle, User } from 'lucide-react';

interface StageWhyProps {
  onComplete: () => void;
  isDarkMode: boolean;
}

export default function StageWhy({ onComplete, isDarkMode }: StageWhyProps) {
  const [projectName, setProjectName] = useState('');
  const [slogan, setSlogan] = useState('');
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectName.trim() && slogan.trim()) {
      setIsStarted(true);
      // Play dramatic sound here if possible
      setTimeout(() => {
        onComplete();
      }, 2000); // Wait for animation before moving to next stage
    }
  };

  if (isStarted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <Factory   className="w-6 h-6 shrink-0"/>
        </div>
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          تم تفعيل بروتوكول الإنقاذ!
        </h2>
        <p className={`text-xl ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          فريق "{projectName}" مستعد للمهمة.
        </p>
        <p className="text-primary-600 font-bold mt-2 text-lg">"{slogan}"</p>
        <div className="mt-8 flex gap-2">
          <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Dramatic Intro */}
      <div className={`relative overflow-hidden rounded-3xl p-8 md:p-12 ${isDarkMode ? 'bg-red-950/30 border border-red-900/50' : 'bg-red-50 border border-red-100'}`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
          <div className="w-32 h-32 shrink-0 bg-red-100 text-red-600 rounded-full flex items-center justify-center relative">
            <div className="absolute inset-0 border-4 border-red-500 rounded-full animate-ping opacity-20"></div>
            <AlertTriangle   className="w-6 h-6 shrink-0"/>
          </div>
          
          <div>
            <div className="flex items-center gap-2 text-red-600 font-bold mb-2">
              <ShieldAlert   className="w-5 h-5 shrink-0"/>
              <span>رسالة عاجلة من مدير المصنع</span>
            </div>
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              المصنع في خطر! نحتاج إلى مهندسين أبطال!
            </h2>
            <div className={`space-y-4 text-lg leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              <p>
                "أهلاً بك أيها المهندس الصغير! أنا 'سي المهدي'، مدير مصنع الجزائر المستدامة. لقد تعطلت أنظمة المصنع فجأة، وتوقف الإنتاج! 😱"
              </p>
              <p>
                "نحن نعتمد على مهاراتك في العلوم، الرياضيات، والفيزياء لإصلاح الأعطال وإعادة تشغيل المصنع بطريقة صديقة للبيئة. هل أنت مستعد لقبول التحدي؟"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Setup Form */}
      <div className={`rounded-3xl p-8 shadow-sm border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          <User className="w-5 h-5 shrink-0 text-primary-500" />
          تسجيل الدخول للمهمة
        </h3>
        
        <form onSubmit={handleStart} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className={`block font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                اسم فريق الإنقاذ (أو اسمك)
              </label>
              <input 
                type="text" 
                required
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="مثال: أبطال الاستدامة"
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary-500 outline-none transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>
            
            <div className="space-y-2">
              <label className={`block font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                شعار المهمة
              </label>
              <input 
                type="text" 
                required
                value={slogan}
                onChange={(e) => setSlogan(e.target.value)}
                placeholder="مثال: معاً لبيئة أفضل!"
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary-500 outline-none transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              disabled={!projectName.trim() || !slogan.trim()}
              className={`w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                projectName.trim() && slogan.trim()
                  ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-red-600/20 hover:-translate-y-1'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <PlayCircle   className="w-6 h-6 shrink-0"/>
              قبول المهمة والبدء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
