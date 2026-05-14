"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Beaker, Calculator, Zap, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';

interface StageWhatProps {
  onComplete: () => void;
  addXp: (amount: number) => void;
  addBadge: (badge: string) => void;
  isDarkMode: boolean;
}

export default function StageWhat({ onComplete, addXp, addBadge, isDarkMode }: StageWhatProps) {
  const [activeTab, setActiveTab] = useState<'science' | 'math' | 'physics'>('science');
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  
  // Science State
  const [iodineColor, setIodineColor] = useState<'default' | 'blue'>('default');
  
  // Math State
  const [mathAnswer, setMathAnswer] = useState('');
  const [mathFeedback, setMathFeedback] = useState<'none' | 'correct' | 'incorrect'>('none');

  // Physics State
  const [circuitMaterial, setCircuitMaterial] = useState<string | null>(null);

  const handleCompleteChallenge = (challengeId: string, xpReward: number, badgeReward?: string) => {
    if (!completedChallenges.includes(challengeId)) {
      setCompletedChallenges(prev => [...prev, challengeId]);
      addXp(xpReward);
      if (badgeReward) {
        addBadge(badgeReward);
      }
    }
  };

  const checkAllCompleted = () => {
    if (
      completedChallenges.includes('science_starch') &&
      completedChallenges.includes('math_convert') &&
      completedChallenges.includes('physics_circuit')
    ) {
      onComplete();
    }
  };

  // Check completion whenever completedChallenges changes
  React.useEffect(() => {
    checkAllCompleted();
  }, [completedChallenges]);

  const handleScienceTest = () => {
    setIodineColor('blue');
    setTimeout(() => {
      handleCompleteChallenge('science_starch', 20, 'مكتشف النشاء');
    }, 1000);
  };

  const handleMathSubmit = () => {
    if (mathAnswer === '150') { // 1.5m = 150cm
      setMathFeedback('correct');
      handleCompleteChallenge('math_convert', 20, 'مهندس القياسات');
    } else {
      setMathFeedback('incorrect');
    }
  };

  const handlePhysicsTest = (material: string, isConductor: boolean) => {
    setCircuitMaterial(material);
    if (isConductor) {
      setTimeout(() => {
        handleCompleteChallenge('physics_circuit', 20, 'سيد الدوائر');
      }, 1000);
    }
  };

  const tabs = [
    { id: 'science', label: 'مختبر العلوم', icon: Beaker, color: 'text-green-500', bg: 'bg-green-500' },
    { id: 'math', label: 'غرفة الرياضيات', icon: Calculator, color: 'text-blue-500', bg: 'bg-blue-500' },
    { id: 'physics', label: 'ورشة الفيزياء', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-500' },
  ] as const;

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          تحديات المعرفة (ماذا؟)
        </h2>
        <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          لإصلاح المصنع، يجب أن نمر بثلاث غرف ونحل التحديات العلمية والرياضية والفيزيائية.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                isActive 
                  ? `${tab.bg} text-white shadow-lg scale-105` 
                  : isDarkMode 
                    ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' 
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : tab.color}`} />
              {tab.label}
              {/* Checkmark if section is completed */}
              {((tab.id === 'science' && completedChallenges.includes('science_starch')) ||
                (tab.id === 'math' && completedChallenges.includes('math_convert')) ||
                (tab.id === 'physics' && completedChallenges.includes('physics_circuit'))) && (
                <CheckCircle2 className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-green-500'}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className={`rounded-3xl p-8 shadow-sm border min-h-[400px] ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <AnimatePresence mode="wait">
          
          {/* SCIENCE TAB */}
          {activeTab === 'science' && (
            <motion.div
              key="science"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                  <Beaker   className="w-6 h-6 shrink-0"/>
                </div>
                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  كاشف تركيب الأغذية
                </h3>
              </div>
              
              <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                المصنع ينتج مواد غذائية. نحتاج للتأكد من وجود النشاء في هذه العينة باستخدام ماء اليود.
                ماذا سيحدث للون العينة؟
              </p>

              <div className="flex flex-col md:flex-row gap-8 items-center justify-center py-8">
                {/* Dropper */}
                <div className="flex flex-col items-center gap-4">
                  <button 
                    onClick={handleScienceTest}
                    disabled={completedChallenges.includes('science_starch')}
                    className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
                      completedChallenges.includes('science_starch')
                        ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:-translate-y-1'
                    }`}
                  >
                    قطّر ماء اليود
                    <ArrowLeft  className="w-5 h-5 shrink-0 rotate-90 md:rotate-0" />
                  </button>
                </div>

                {/* Sample */}
                <div className="relative w-48 h-48 rounded-full border-8 border-slate-200 flex items-center justify-center overflow-hidden bg-white shadow-inner">
                  <div 
                    className={`absolute inset-0 transition-colors duration-1000 ${
                      iodineColor === 'blue' ? 'bg-blue-800' : 'bg-amber-100'
                    }`}
                  />
                  <span className={`relative z-10 font-bold text-xl ${iodineColor === 'blue' ? 'text-white' : 'text-amber-800'}`}>
                    عينة الخبز
                  </span>
                </div>
              </div>

              {completedChallenges.includes('science_starch') && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-100 border border-green-200 text-green-800 p-4 rounded-xl flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 shrink-0 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">أحسنت!</p>
                    <p>تحول اللون إلى الأزرق البنفسجي، مما يؤكد وجود النشاء. لقد كسبت 20 XP وشارة "مكتشف النشاء"!</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* MATH TAB */}
          {activeTab === 'math' && (
            <motion.div
              key="math"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                  <Calculator   className="w-6 h-6 shrink-0"/>
                </div>
                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  تحدي المعايرة
                </h3>
              </div>
              
              <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                لتركيب الحزام الناقل الجديد، نحتاج إلى تحويل القياسات. 
                طول الحزام المطلوب هو <strong>1.5 متر</strong>. كم يساوي بالسنتيمتر (cm)؟
              </p>

              <div className="max-w-md mx-auto py-8 space-y-4">
                <div className="flex items-center gap-4">
                  <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    1.5 m = 
                  </div>
                  <input 
                    type="number" 
                    value={mathAnswer}
                    onChange={(e) => {
                      setMathAnswer(e.target.value);
                      setMathFeedback('none');
                    }}
                    disabled={completedChallenges.includes('math_convert')}
                    className={`flex-1 px-4 py-3 text-xl text-center rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${
                      isDarkMode 
                        ? 'bg-slate-900 border-slate-700 text-white' 
                        : 'bg-slate-50 border-slate-200 text-slate-900'
                    } ${mathFeedback === 'incorrect' ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="???"
                  />
                  <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    cm
                  </div>
                </div>

                {!completedChallenges.includes('math_convert') && (
                  <button 
                    onClick={handleMathSubmit}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    تحقق من الإجابة
                  </button>
                )}

                {mathFeedback === 'incorrect' && (
                  <div className="text-red-500 flex items-center gap-2 justify-center font-bold">
                    <XCircle   className="w-5 h-5 shrink-0"/>
                    <span>حاول مرة أخرى! تذكر أن 1 متر = 100 سنتيمتر.</span>
                  </div>
                )}

                {completedChallenges.includes('math_convert') && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-100 border border-green-200 text-green-800 p-4 rounded-xl flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">إجابة صحيحة!</p>
                      <p>1.5 × 100 = 150 cm. لقد كسبت 20 XP وشارة "مهندس القياسات"!</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* PHYSICS TAB */}
          {activeTab === 'physics' && (
            <motion.div
              key="physics"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-yellow-100 text-yellow-600 rounded-xl">
                  <Zap   className="w-6 h-6 shrink-0"/>
                </div>
                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  محاكي الدارة الذكية
                </h3>
              </div>
              
              <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                انقطع السلك الموصل للمصباح التحذيري! اختر المادة المناسبة لإكمال الدارة الكهربائية وإضاءة المصباح.
              </p>

              <div className="py-8">
                {/* Circuit Visualization */}
                <div className="flex items-center justify-center gap-4 mb-12">
                  <div className="w-16 h-24 bg-slate-800 rounded-lg border-4 border-slate-600 flex flex-col justify-between p-2 relative">
                    <div className="w-full h-2 bg-red-500 rounded-full"></div>
                    <span className="text-white text-xs text-center font-bold">بطارية</span>
                    <div className="w-full h-2 bg-blue-500 rounded-full"></div>
                    {/* Wires */}
                    <div className="absolute top-2 -right-16 w-16 h-1 bg-slate-400"></div>
                    <div className="absolute bottom-2 -right-16 w-16 h-1 bg-slate-400"></div>
                  </div>

                  {/* The Gap / Material */}
                  <div className={`w-24 h-16 border-2 border-dashed rounded-lg flex items-center justify-center transition-colors ${
                    circuitMaterial === 'copper' ? 'bg-orange-300 border-orange-500' :
                    circuitMaterial === 'plastic' ? 'bg-blue-200 border-blue-400' :
                    circuitMaterial === 'wood' ? 'bg-amber-700 border-amber-900' :
                    'border-slate-400 bg-slate-100'
                  }`}>
                    {circuitMaterial === 'copper' && <span className="font-bold text-orange-900">نحاس</span>}
                    {circuitMaterial === 'plastic' && <span className="font-bold text-blue-900">بلاستيك</span>}
                    {circuitMaterial === 'wood' && <span className="font-bold text-amber-100">خشب</span>}
                    {!circuitMaterial && <span className="text-slate-400 text-2xl">?</span>}
                  </div>

                  {/* Lightbulb */}
                  <div className="relative">
                    <div className="absolute top-1/2 -left-16 w-16 h-1 bg-slate-400 -translate-y-1/2"></div>
                    <div className={`w-16 h-16 rounded-full border-4 transition-all duration-500 flex items-center justify-center ${
                      circuitMaterial === 'copper' 
                        ? 'bg-yellow-300 border-yellow-500 shadow-[0_0_30px_rgba(253,224,71,0.8)]' 
                        : 'bg-slate-200 border-slate-400'
                    }`}>
                      <Zap className={`w-5 h-5 shrink-0 ${circuitMaterial === 'copper' ? 'text-yellow-600' : 'text-slate-400'}`} />
                    </div>
                  </div>
                </div>

                {/* Material Options */}
                <div className="flex justify-center gap-4">
                  <button 
                    onClick={() => handlePhysicsTest('wood', false)}
                    disabled={completedChallenges.includes('physics_circuit')}
                    className="px-6 py-3 bg-amber-700 text-amber-100 rounded-xl font-bold hover:bg-amber-800 transition-colors"
                  >
                    قطعة خشب
                  </button>
                  <button 
                    onClick={() => handlePhysicsTest('plastic', false)}
                    disabled={completedChallenges.includes('physics_circuit')}
                    className="px-6 py-3 bg-blue-400 text-white rounded-xl font-bold hover:bg-blue-500 transition-colors"
                  >
                    مسطرة بلاستيكية
                  </button>
                  <button 
                    onClick={() => handlePhysicsTest('copper', true)}
                    disabled={completedChallenges.includes('physics_circuit')}
                    className="px-6 py-3 bg-orange-400 text-orange-950 rounded-xl font-bold hover:bg-orange-500 transition-colors shadow-lg"
                  >
                    سلك نحاسي
                  </button>
                </div>

                {circuitMaterial && circuitMaterial !== 'copper' && (
                  <div className="mt-6 text-red-500 flex items-center gap-2 justify-center font-bold">
                    <XCircle   className="w-5 h-5 shrink-0"/>
                    <span>هذه المادة عازلة! الكهرباء لا تمر. جرب مادة أخرى.</span>
                  </div>
                )}

                {completedChallenges.includes('physics_circuit') && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 bg-green-100 border border-green-200 text-green-800 p-4 rounded-xl flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">إضاءة ناجحة!</p>
                      <p>النحاس مادة ناقلة للكهرباء. لقد اكتملت الدارة! كسبت 20 XP وشارة "سيد الدوائر"!</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
      
      {/* Proceed Button - only visible when all 3 are completed */}
      {completedChallenges.includes('science_starch') && 
       completedChallenges.includes('math_convert') && 
       completedChallenges.includes('physics_circuit') && (
        <div className="flex justify-center pt-4">
          <p className="text-green-600 font-bold mb-4">لقد أكملت جميع تحديات المعرفة بنجاح!</p>
        </div>
      )}
    </div>
  );
}
