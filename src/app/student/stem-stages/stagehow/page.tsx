"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Wrench, CheckCircle2, ArrowLeft, Settings, Scissors, Cpu, Bell, Play } from 'lucide-react';

interface StageHowProps {
  onComplete: () => void;
  addXp: (amount: number) => void;
  addBadge: (badge: string) => void;
  isDarkMode: boolean;
}

export default function StageHow({ onComplete, addXp, addBadge, isDarkMode }: StageHowProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { id: 'plan', title: 'التخطيط', icon: Settings, desc: 'قراءة المخطط وتجهيز الأدوات.' },
    { id: 'cut', title: 'القص والتركيب', icon: Scissors, desc: 'قص الكرتون وتجميع الهيكل الأساسي للمصنع.' },
    { id: 'sensor', title: 'تثبيت الحساسات', icon: Cpu, desc: 'تركيب حساس الحركة عند البوابة.' },
    { id: 'alarm', title: 'توصيل الإنذار', icon: Bell, desc: 'توصيل الجرس والمصباح بالدارة.' },
    { id: 'test', title: 'التجربة النهائية', icon: Play, desc: 'تشغيل النظام واختبار الاستجابة.' },
  ];

  const handleCompleteStep = () => {
    addXp(10); // 10 XP per step
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      addBadge('كبير المهندسين');
      onComplete();
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          ورشة الإنتاج (كيف؟)
        </h2>
        <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          حان وقت العمل اليدوي! اتبع الخطوات التالية لبناء مجسم المصنع الذكي وتوصيل أجزائه.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Steps List */}
        <div className={`w-full md:w-1/3 rounded-3xl p-6 shadow-sm border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            <Wrench className="w-5 h-5 shrink-0 text-primary-500" />
            خطوات العمل
          </h3>
          <div className="space-y-4 relative">
            {/* Vertical line */}
            <div className="absolute right-6 top-6 bottom-6 w-0.5 bg-slate-200 z-0"></div>
            
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isCompleted = idx < currentStep;
              const isActive = idx === currentStep;
              const isLocked = idx > currentStep;

              return (
                <div key={step.id} className={`relative z-10 flex items-start gap-4 p-3 rounded-xl transition-colors ${
                  isActive ? (isDarkMode ? 'bg-slate-700' : 'bg-primary-50') : ''
                }`}>
                  <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center border-4 ${isDarkMode ? 'border-slate-800' : 'border-white'} ${
                    isCompleted ? 'bg-green-500 text-white' :
                    isActive ? 'bg-primary-600 text-white' :
                    isDarkMode ? 'bg-slate-700 text-slate-500' : 'bg-slate-200 text-slate-400'
                  }`}>
                    {isCompleted ? <CheckCircle2   className="w-6 h-6 shrink-0"/> : <Icon   className="w-6 h-6 shrink-0"/>}
                  </div>
                  <div className="pt-2">
                    <h4 className={`font-bold ${
                      isCompleted ? 'text-green-600' :
                      isActive ? 'text-primary-600' :
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {step.title}
                    </h4>
                    {isActive && (
                      <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {step.desc}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Step Details */}
        <div className={`w-full md:w-2/3 rounded-3xl p-8 shadow-sm border flex flex-col ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <div className="w-24 h-24 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-6">
              {React.createElement(steps[currentStep].icon, { size: 48 })}
            </div>
            <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              الخطوة {currentStep + 1}: {steps[currentStep].title}
            </h3>
            <p className={`text-lg max-w-md ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {steps[currentStep].desc}
            </p>
            
            {/* Placeholder for actual interactive tool/video/diagram */}
            <div className={`w-full max-w-md h-48 mt-8 rounded-2xl border-2 border-dashed flex items-center justify-center ${isDarkMode ? 'border-slate-600 bg-slate-700/50' : 'border-slate-300 bg-slate-50'}`}>
              <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>
                [مساحة لعرض فيديو توضيحي أو نموذج 3D للخطوة]
              </span>
            </div>
          </div>

          <button 
            onClick={handleCompleteStep}
            className="w-full bg-primary-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            {currentStep === steps.length - 1 ? 'إنهاء الورشة والانتقال' : 'إتمام الخطوة (+10 XP)'}
            <ArrowLeft   className="w-5 h-5 shrink-0"/>
          </button>
        </div>
      </div>
    </div>
  );
}
