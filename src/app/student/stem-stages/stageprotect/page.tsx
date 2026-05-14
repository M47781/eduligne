"use client";

import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Download, Award, Star, Calendar, User } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';

interface StageProtectProps {
  xp: number;
  badges: string[];
  isDarkMode: boolean;
}

export default function StageProtect({ xp, badges, isDarkMode }: StageProtectProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSealed, setIsSealed] = useState(false);
  const [studentName, setStudentName] = useState('');

  const handleSeal = () => {
    if (studentName.trim()) {
      setIsSealed(true);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#FFD700', '#FFA500', '#FF8C00']
      });
    }
  };

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;
    
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('patent-certificate.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const today = new Date().toLocaleDateString('ar-DZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          حماية الابتكار
        </h2>
        <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          لقد أنقذت المصنع بنجاح! الآن يجب أن نوثق ابتكارك ونحميه براءة اختراع مصغرة.
        </p>
      </div>

      {!isSealed ? (
        <div className={`max-w-md mx-auto rounded-3xl p-8 shadow-sm border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className="w-20 h-20 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck   className="w-6 h-6 shrink-0"/>
          </div>
          <h3 className={`text-xl font-bold text-center mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            الختم الرقمي
          </h3>
          <div className="space-y-4">
            <div>
              <label className={`block font-bold mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                اسم المهندس (اسمك الثلاثي)
              </label>
              <input 
                type="text" 
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="مثال: أحمد محمد علي"
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary-500 outline-none transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>
            <button 
              onClick={handleSeal}
              disabled={!studentName.trim()}
              className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg ${
                studentName.trim() 
                  ? 'bg-primary-600 text-white hover:bg-primary-700 hover:-translate-y-1' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              اعتماد الابتكار
            </button>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-8"
        >
          {/* Certificate Preview (Hidden from screen readers, used for PDF generation) */}
          <div className="overflow-hidden rounded-xl shadow-2xl border-4 border-slate-200 bg-white w-full max-w-4xl relative">
            
            {/* The actual element to be captured by html2canvas */}
            <div 
              ref={certificateRef} 
              className="p-12 bg-white text-slate-900 relative"
              style={{ minHeight: '600px', backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}
            >
              {/* Decorative Borders */}
              <div className="absolute inset-4 border-4 border-double border-primary-800 rounded-lg opacity-30 pointer-events-none"></div>
              <div className="absolute inset-6 border border-primary-800 rounded opacity-20 pointer-events-none"></div>
              
              <div className="text-center relative z-10">
                <div className="flex justify-center mb-6">
                  <Award  className="w-6 h-6 shrink-0 text-yellow-500" />
                </div>
                <h1 className="text-4xl font-black text-primary-900 mb-2 font-serif">براءة اختراع مصغرة</h1>
                <p className="text-xl text-primary-700 font-bold mb-12">مهمة إنقاذ مصنع الجزائر المستدامة</p>
                
                <div className="text-2xl mb-8">
                  تُمنح هذه الشهادة للمهندس/ة المبدع/ة:
                </div>
                <div className="text-5xl font-bold text-slate-800 mb-12 border-b-2 border-slate-300 inline-block pb-2 px-12">
                  {studentName}
                </div>
                
                <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
                  تقديراً لجهوده(ا) الاستثنائية في تطبيق مهارات العلوم والرياضيات والفيزياء، 
                  وابتكار حلول مستدامة لإنقاذ المصنع وإعادة تشغيله بكفاءة.
                </p>

                <div className="flex justify-center gap-12 mb-12">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-yellow-600 font-bold text-2xl mb-2">
                      <Star fill="currentColor"  className="w-5 h-5 shrink-0"/>
                      <span>{xp} XP</span>
                    </div>
                    <div className="text-sm text-slate-500">النقاط المكتسبة</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-primary-600 font-bold text-2xl mb-2">
                      <ShieldCheck  className="w-5 h-5 shrink-0"/>
                      <span>{badges.length}</span>
                    </div>
                    <div className="text-sm text-slate-500">الشارات المحصلة</div>
                  </div>
                </div>

                <div className="flex justify-between items-end px-12 mt-16">
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-slate-500 mb-2">
                      <Calendar   className="w-4 h-4 shrink-0"/>
                      <span>تاريخ الإصدار</span>
                    </div>
                    <div className="font-bold text-lg">{today}</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-32 h-32 border-4 border-red-600 rounded-full flex items-center justify-center text-red-600 font-bold text-xl rotate-[-15deg] opacity-80 mx-auto mb-2">
                      مُعتمد
                    </div>
                    <div className="font-bold text-slate-700">إدارة المصنع</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={downloadCertificate}
            disabled={isGenerating}
            className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${
              isGenerating 
                ? 'bg-slate-200 text-slate-500 cursor-wait' 
                : 'bg-primary-600 text-white hover:bg-primary-700 hover:-translate-y-1'
            }`}
          >
            {isGenerating ? (
              <>جاري التجهيز...</>
            ) : (
              <>
                <Download   className="w-6 h-6 shrink-0"/>
                تحميل براءة الاختراع (PDF)
              </>
            )}
          </button>
        </motion.div>
      )}
    </div>
  );
}
