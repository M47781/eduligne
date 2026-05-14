"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Leaf, Lightbulb, Mic, CheckCircle2, Upload, Play, Square } from 'lucide-react';

interface StageWhatIfProps {
  onComplete: () => void;
  addXp: (amount: number) => void;
  addBadge: (badge: string) => void;
  isDarkMode: boolean;
}

export default function StageWhatIf({ onComplete, addXp, addBadge, isDarkMode }: StageWhatIfProps) {
  const [activeTab, setActiveTab] = useState<'art' | 'sustainability' | 'logic' | 'pitch'>('art');
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  
  // States for challenges
  const [logoUploaded, setLogoUploaded] = useState(false);
  const [adText, setAdText] = useState('');
  const [circuitFixed, setCircuitFixed] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);

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
      completedChallenges.includes('art') &&
      completedChallenges.includes('sustainability') &&
      completedChallenges.includes('logic') &&
      completedChallenges.includes('pitch')
    ) {
      onComplete();
    }
  };

  React.useEffect(() => {
    checkAllCompleted();
  }, [completedChallenges]);

  const handleLogoUpload = () => {
    setLogoUploaded(true);
    handleCompleteChallenge('art', 15, 'الفنان المبدع');
  };

  const handleAdSubmit = () => {
    if (adText.length > 20) {
      handleCompleteChallenge('sustainability', 15, 'صديق البيئة');
    }
  };

  const handleCircuitFix = () => {
    setCircuitFixed(true);
    handleCompleteChallenge('logic', 15, 'المفكر المنطقي');
  };

  const handleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setHasRecorded(true);
      handleCompleteChallenge('pitch', 15, 'المتحدث البارع');
    } else {
      setIsRecording(true);
      setTimeout(() => {
        if (isRecording) { // Auto stop after 3 seconds for demo
          setIsRecording(false);
          setHasRecorded(true);
          handleCompleteChallenge('pitch', 15, 'المتحدث البارع');
        }
      }, 3000);
    }
  };

  const tabs = [
    { id: 'art', label: 'الفن', icon: Palette, color: 'text-pink-500', bg: 'bg-pink-500' },
    { id: 'sustainability', label: 'الاستدامة', icon: Leaf, color: 'text-green-500', bg: 'bg-green-500' },
    { id: 'logic', label: 'المنطق', icon: Lightbulb, color: 'text-yellow-500', bg: 'bg-yellow-500' },
    { id: 'pitch', label: 'التواصل', icon: Mic, color: 'text-purple-500', bg: 'bg-purple-500' },
  ] as const;

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          تحديات STEAM (ماذا لو؟)
        </h2>
        <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          أطلق العنان لإبداعك! فكر خارج الصندوق لحل هذه التحديات الإضافية وتطوير المصنع.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isCompleted = completedChallenges.includes(tab.id);
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
              {isCompleted && (
                <CheckCircle2 className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-green-500'}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className={`rounded-3xl p-8 shadow-sm border min-h-[400px] ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <AnimatePresence mode="wait">
          
          {/* ART TAB */}
          {activeTab === 'art' && (
            <motion.div
              key="art"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-pink-100 text-pink-600 rounded-xl">
                  <Palette   className="w-6 h-6 shrink-0"/>
                </div>
                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  تصميم الشعار
                </h3>
              </div>
              
              <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                ماذا لو طلبنا منك تصميم شعار جديد للمصنع يبدأ بحرف "A" (Algeria) ويعبر عن الاستدامة؟
                ارسم الشعار وقم برفعه هنا.
              </p>

              <div className="py-8 flex flex-col items-center">
                {!logoUploaded ? (
                  <div className={`w-full max-w-md p-8 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-colors hover:bg-slate-50 ${isDarkMode ? 'border-slate-600 hover:bg-slate-700' : 'border-slate-300'}`} onClick={handleLogoUpload}>
                    <Upload className={`w-5 h-5 shrink-0 mx-auto mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`} />
                    <p className={`font-bold mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>اضغط لرفع صورة الشعار</p>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>PNG, JPG (الحد الأقصى 2MB)</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-32 h-32 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Palette   className="w-6 h-6 shrink-0"/>
                    </div>
                    <p className="text-green-600 font-bold text-xl flex items-center justify-center gap-2">
                      <CheckCircle2  className="w-5 h-5 shrink-0"/> تم رفع الشعار بنجاح!
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* SUSTAINABILITY TAB */}
          {activeTab === 'sustainability' && (
            <motion.div
              key="sustainability"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                  <Leaf   className="w-6 h-6 shrink-0"/>
                </div>
                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  إعادة التدوير
                </h3>
              </div>
              
              <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                ماذا لو استخدمنا الحبوب المرفوضة كعلف للدجاج بدلاً من رميها؟
                اكتب إعلاناً قصيراً (أكثر من 20 حرف) لتشجيع المزارعين على شراء هذا العلف.
              </p>

              <div className="py-8 max-w-2xl mx-auto space-y-4">
                <textarea
                  value={adText}
                  onChange={(e) => setAdText(e.target.value)}
                  disabled={completedChallenges.includes('sustainability')}
                  placeholder="اكتب إعلانك هنا..."
                  className={`w-full h-32 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none transition-colors resize-none ${
                    isDarkMode 
                      ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
                
                {!completedChallenges.includes('sustainability') && (
                  <button 
                    onClick={handleAdSubmit}
                    className={`w-full px-6 py-3 rounded-xl font-bold transition-colors shadow-lg ${
                      adText.length > 20 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    نشر الإعلان
                  </button>
                )}

                {completedChallenges.includes('sustainability') && (
                  <p className="text-green-600 font-bold text-xl flex items-center justify-center gap-2">
                    <CheckCircle2  className="w-5 h-5 shrink-0"/> فكرة رائعة! تم نشر الإعلان.
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* LOGIC TAB */}
          {activeTab === 'logic' && (
            <motion.div
              key="logic"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-yellow-100 text-yellow-600 rounded-xl">
                  <Lightbulb   className="w-6 h-6 shrink-0"/>
                </div>
                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  تعديل الدارة
                </h3>
              </div>
              
              <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                ماذا لو أردنا إضافة جرس إنذار للدارة السابقة بحيث يعمل بشكل مستقل عن المصباح؟
                كيف يجب أن نوصله؟
              </p>

              <div className="py-8 flex flex-col items-center gap-6">
                <div className="flex gap-4">
                  <button 
                    onClick={() => {}} // Incorrect
                    disabled={completedChallenges.includes('logic')}
                    className={`px-6 py-4 rounded-xl font-bold border-2 transition-all ${
                      isDarkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    توصيل على التسلسل
                  </button>
                  <button 
                    onClick={handleCircuitFix} // Correct
                    disabled={completedChallenges.includes('logic')}
                    className={`px-6 py-4 rounded-xl font-bold border-2 transition-all ${
                      completedChallenges.includes('logic')
                        ? 'bg-green-500 border-green-500 text-white'
                        : isDarkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    توصيل على التفرع (التوازي)
                  </button>
                </div>

                {completedChallenges.includes('logic') && (
                  <p className="text-green-600 font-bold text-xl flex items-center justify-center gap-2">
                    <CheckCircle2  className="w-5 h-5 shrink-0"/> صحيح! التوصيل على التفرع يضمن عمل كل جهاز بشكل مستقل.
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* PITCH TAB */}
          {activeTab === 'pitch' && (
            <motion.div
              key="pitch"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                  <Mic   className="w-6 h-6 shrink-0"/>
                </div>
                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  عرض المشروع (Pitch)
                </h3>
              </div>
              
              <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                سجل مقطعاً صوتياً قصيراً تشرح فيه فكرة مشروعك وكيف يساهم في إنقاذ المصنع والبيئة.
              </p>

              <div className="py-8 flex flex-col items-center">
                {!hasRecorded ? (
                  <button 
                    onClick={handleRecording}
                    className={`w-32 h-32 rounded-full flex items-center justify-center transition-all shadow-lg ${
                      isRecording 
                        ? 'bg-red-500 text-white animate-pulse scale-110' 
                        : 'bg-purple-600 text-white hover:bg-purple-700 hover:scale-105'
                    }`}
                  >
                    {isRecording ? <Square   className="w-6 h-6 shrink-0"/> : <Mic   className="w-6 h-6 shrink-0"/>}
                  </button>
                ) : (
                  <div className="text-center">
                    <div className="w-32 h-32 bg-purple-100 text-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play  className="w-6 h-6 shrink-0 ml-2" />
                    </div>
                    <p className="text-green-600 font-bold text-xl flex items-center justify-center gap-2">
                      <CheckCircle2  className="w-5 h-5 shrink-0"/> تم تسجيل العرض بنجاح!
                    </p>
                  </div>
                )}
                
                {!hasRecorded && (
                  <p className={`mt-6 font-bold ${isRecording ? 'text-red-500' : isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {isRecording ? 'جاري التسجيل... اضغط للإيقاف' : 'اضغط للبدء بالتسجيل'}
                  </p>
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
