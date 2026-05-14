"use client";

import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Award, CheckCircle2, 
  Search, Wind, Lightbulb, Upload, 
  Download, Play, X, Globe, Beaker, Wrench,
  Activity, BarChart, Zap, Brain, Hand, Target
} from 'lucide-react';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// --- Types ---
type Stage = 'why' | 'what' | 'how' | 'whatif' | 'protect';
type Badge = { id: string; name: string; icon: React.ReactNode };

// --- Audio Utilities ---
const playSound = (type: 'success' | 'error') => {
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  if (type === 'success') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  } else {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.2);
  }
};

const triggerConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#e74c3c', '#2ecc71', '#9b59b6', '#f1c40f', '#3498db']
  });
};

export default function HopeArmMission() {
  const [xp, setXp] = useState(0);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [activeStage, setActiveStage] = useState<Stage>('why');
  const [completedStages, setCompletedStages] = useState<Stage[]>([]);
  const [engineerName, setEngineerName] = useState('مهندس المستقبل');
  const [projectName, setProjectName] = useState('المشروع قيد التفعيل');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('hopeArmState');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setXp(parsed.xp || 0);
        setCompletedStages(parsed.completedStages || []);
        setEngineerName(parsed.engineerName || 'مهندس المستقبل');
        setProjectName(parsed.projectName || 'المشروع قيد التفعيل');
        setIsDarkMode(parsed.isDarkMode || false);
      } catch (e) {
        console.error('Error loading state', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('hopeArmState', JSON.stringify({
      xp, completedStages, engineerName, projectName, isDarkMode
    }));
  }, [xp, completedStages, engineerName, projectName, isDarkMode]);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const addXp = (amount: number) => {
    setXp(prev => prev + amount);
    if (amount >= 10) triggerConfetti();
    playSound('success');
  };

  const addBadge = (badge: Badge) => {
    setBadges(prev => prev.find(b => b.id === badge.id) ? prev : [...prev, badge]);
  };

  const completeStage = (stage: Stage) => {
    if (!completedStages.includes(stage)) setCompletedStages(prev => [...prev, stage]);
  };

  const Dashboard = () => (
    <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg mb-6 flex flex-wrap items-center justify-between gap-4 sticky top-20 z-40 border border-slate-700">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center font-bold text-xl border-2 border-pink-300">
          {engineerName.charAt(0)}
        </div>
        <div>
          <div className="text-xs text-slate-400">المهندس</div>
          <div className="font-bold">{engineerName}</div>
        </div>
      </div>
      <div className="flex-1 min-w-[200px] max-w-md">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-400">النقاط (XP)</span>
          <span className="font-bold text-yellow-400">{xp} / 300</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300" initial={{ width: 0 }} animate={{ width: `${Math.min(100, (xp / 300) * 100)}%` }} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="text-xs text-slate-400">المشروع</div>
          <div className="font-bold text-pink-300 text-sm">{projectName}</div>
        </div>
        <div className="h-8 w-px bg-slate-700 mx-2"></div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2 rtl:space-x-reverse">
            {badges.slice(0, 3).map((badge, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-yellow-400" title={badge.name}>{badge.icon || <Award   className="w-4 h-4 shrink-0"/>}</div>
            ))}
            {badges.length > 3 && <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-xs font-bold">+{badges.length - 3}</div>}
          </div>
          <div className="text-xs text-slate-400"><span className="font-bold text-white">{badges.length}</span> أوسمة</div>
        </div>
      </div>
    </div>
  );

  const Navbar = () => {
    const stages: { id: Stage; label: string; icon: React.ReactNode; color: string }[] = [
      { id: 'why', label: 'لماذا؟', icon: <Search   className="w-4 h-4 shrink-0"/>, color: 'bg-pink-600' },
      { id: 'what', label: 'ماذا؟', icon: <Beaker   className="w-4 h-4 shrink-0"/>, color: 'bg-emerald-500' },
      { id: 'how', label: 'كيف؟', icon: <Wrench   className="w-4 h-4 shrink-0"/>, color: 'bg-blue-500' },
      { id: 'whatif', label: 'ماذا لو؟', icon: <Lightbulb   className="w-4 h-4 shrink-0"/>, color: 'bg-yellow-500' },
      { id: 'protect', label: 'براءة', icon: <Shield   className="w-4 h-4 shrink-0"/>, color: 'bg-purple-500' },
    ];

    return (
      <div className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 mb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex space-x-4 rtl:space-x-reverse overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              {stages.map((stage) => {
                const isActive = activeStage === stage.id;
                const isCompleted = completedStages.includes(stage.id);
                return (
                  <button
                    key={stage.id} onClick={() => setActiveStage(stage.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all whitespace-nowrap ${isActive ? `${stage.color} text-white shadow-md` : isCompleted ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                  >
                    {stage.icon} {stage.label} {isCompleted && <CheckCircle2 className={`w-5 h-5 shrink-0 ${isActive ? 'text-white/80' : 'text-green-500'}`} />}
                  </button>
                );
              })}
            </div>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
              {isDarkMode ? <Zap   className="w-5 h-5 shrink-0"/> : <Globe   className="w-5 h-5 shrink-0"/>}
            </button>
          </div>
          <div className="h-1 bg-slate-100 dark:bg-slate-800 w-full">
            <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500" style={{ width: `${(completedStages.length / 5) * 100}%` }}></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-slate-950 text-slate-50' : 'bg-slate-50 text-slate-900'}`}>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 pb-24">
        <Dashboard />
        <AnimatePresence mode="wait">
          {activeStage === 'why' && <StageWhy key="why" addXp={addXp} addBadge={addBadge} onComplete={() => { completeStage('why'); setActiveStage('what'); }} setProjectName={setProjectName} setEngineerName={setEngineerName} />}
          {activeStage === 'what' && <StageWhat key="what" addXp={addXp} addBadge={addBadge} onComplete={() => { completeStage('what'); setActiveStage('how'); }} />}
          {activeStage === 'how' && <StageHow key="how" addXp={addXp} addBadge={addBadge} onComplete={() => { completeStage('how'); setActiveStage('whatif'); }} />}
          {activeStage === 'whatif' && <StageWhatIf key="whatif" addXp={addXp} addBadge={addBadge} onComplete={() => { completeStage('whatif'); setActiveStage('protect'); }} />}
          {activeStage === 'protect' && <StageProtect key="protect" addXp={addXp} addBadge={addBadge} engineerName={engineerName} projectName={projectName} xp={xp} badgesCount={badges.length} onComplete={() => completeStage('protect')} />}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ============================================================================
// STAGE 1: WHY (لماذا؟)
// ============================================================================
function StageWhy({ addXp, addBadge, onComplete, setProjectName, setEngineerName }: any) {
  const [step, setStep] = useState(0);
  
  // Challenge 1: Reflex Arc
  const reflexItems = [
    { id: 4, text: 'عصب حركي' },
    { id: 1, text: 'مستقبل حسي' },
    { id: 5, text: 'عضلة' },
    { id: 2, text: 'عصب حسي' },
    { id: 3, text: 'نخاع شوكي' },
  ];
  const [reflexOrder, setReflexOrder] = useState<number[]>([]);
  const [q1Solved, setQ1Solved] = useState(false);

  // Challenge 2: Matching
  const [matches, setMatches] = useState<{item: string, func: string}[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const items = ['حمام زاجل', 'رسائل مشفرة', 'راديو سري'];
  const funcs = ['إخفاء المعنى', 'بث التعليمات', 'نقل الرسائل'];
  const correctMatches: Record<string, string> = {
    'حمام زاجل': 'نقل الرسائل',
    'رسائل مشفرة': 'إخفاء المعنى',
    'راديو سري': 'بث التعليمات'
  };

  // Challenge 3: MCQ
  const [q3Solved, setQ3Solved] = useState(false);

  // Identity
  const [inputName, setInputName] = useState('ذراع الأمل');
  const [inputSlogan, setInputSlogan] = useState('الحركة حياة');
  const [inputEngineer, setInputEngineer] = useState('مهندس المستقبل');

  const handleReflexClick = (id: number) => {
    if (reflexOrder.includes(id)) return;
    const newOrder = [...reflexOrder, id];
    setReflexOrder(newOrder);
    if (newOrder.length === 5) {
      if (newOrder.join(',') === '1,2,3,4,5') {
        setQ1Solved(true);
        addXp(15);
        addBadge({ id: 'neuro_expert', name: 'خبير أعصاب', icon: <Brain   className="w-4 h-4 shrink-0"/> });
        setStep(2);
      } else {
        playSound('error');
        setReflexOrder([]);
      }
    }
  };

  const handleMatch = (func: string) => {
    if (!selectedItem) return;
    if (correctMatches[selectedItem] === func) {
      const newMatches = [...matches, { item: selectedItem, func }];
      setMatches(newMatches);
      setSelectedItem(null);
      if (newMatches.length === 3) {
        addXp(15);
        addBadge({ id: 'tech_historian', name: 'مؤرخ تقني', icon: <Globe   className="w-4 h-4 shrink-0"/> });
        setStep(3);
      }
    } else {
      playSound('error');
      setSelectedItem(null);
    }
  };

  const handleIdentitySubmit = () => {
    setProjectName(inputName);
    setEngineerName(inputEngineer);
    addXp(50);
    addBadge({ id: 'certified_inventor', name: 'مخترع معتمد', icon: <Award   className="w-4 h-4 shrink-0"/> });
    onComplete();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
      {/* Intro Video & Doctor */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="aspect-video bg-slate-800 rounded-xl mb-6 relative overflow-hidden flex items-center justify-center border-4 border-pink-900/30">
          <Play  className="w-6 h-6 shrink-0 text-white/50" />
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">video_hope_arm.mp4</div>
        </div>
        
        <div className="flex gap-4 items-start bg-pink-50 dark:bg-pink-900/20 p-6 rounded-xl border border-pink-100 dark:border-pink-800">
          <Image  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Amal&style=circle" alt="Dr Amal" className="w-16 h-16 bg-white rounded-full border-2 border-pink-200" width={500} height={500} />
          <div>
            <h3 className="font-bold text-pink-900 dark:text-pink-300 mb-2">الدكتورة آمال</h3>
            <p className="text-pink-800 dark:text-pink-200 leading-relaxed font-medium">
              "مرحباً بك يا بطل! هناك أطفال فقدوا أطرافهم ويحتاجون إلى مساعدتك للعودة إلى حياتهم الطبيعية. العلم يمنحنا القدرة على صناعة 'ذراع الأمل' لتعويض ما فقدوه. هل أنت مستعد لفهم كيف تعمل أجسامنا وتطبيق ذلك هندسياً؟"
            </p>
            {step === 0 && (
              <button onClick={() => setStep(1)} className="mt-4 bg-pink-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-pink-700">
                مستعد للتحدي!
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Challenge 1 */}
      {step >= 1 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-xl font-bold text-pink-600 mb-4 flex items-center gap-2">
            <Brain  className="w-5 h-5 shrink-0"/> التحدي الأول: القوس الانعكاسي
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6">قبل صنع ذراع آلية، يجب أن نفهم كيف يتحرك ذراعنا الطبيعي. رتب مسار 'القوس الانعكاسي' للسيالة العصبية بالترتيب الصحيح:</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {reflexItems.map(item => (
              <button 
                key={item.id}
                onClick={() => handleReflexClick(item.id)}
                disabled={reflexOrder.includes(item.id)}
                className={`py-3 px-4 rounded-xl font-bold border-2 transition-all ${reflexOrder.includes(item.id) ? 'bg-slate-100 border-slate-200 text-slate-400' : 'border-slate-200 hover:border-pink-300 text-slate-700 dark:text-slate-300'}`}
              >
                {item.text}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-4">
            {reflexOrder.map((id, index) => {
              const item = reflexItems.find(i => i.id === id);
              return (
                <div key={id} className="flex items-center gap-2">
                  <div className="bg-pink-100 text-pink-800 px-4 py-2 rounded-lg font-bold whitespace-nowrap">
                    {item?.text}
                  </div>
                  {index < 4 && <div className="text-slate-400">→</div>}
                </div>
              );
            })}
          </div>

          {q1Solved && (
            <div className="p-4 bg-green-50 text-green-800 rounded-lg flex items-center gap-3 mt-4">
              <CheckCircle2  className="w-5 h-5 shrink-0"/> الترتيب صحيح! اكتسبت +15 XP ووسام "خبير أعصاب".
            </div>
          )}
        </div>
      )}

      {/* Challenge 2 */}
      {step >= 2 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-xl font-bold text-pink-600 mb-4 flex items-center gap-2">
            <Globe  className="w-5 h-5 shrink-0"/> التحدي الثاني: طرق التواصل عبر التاريخ
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6">السيالة العصبية تنقل رسائل. تاريخياً، كيف كان البشر يتواصلون؟ صل الوسيلة بوظيفتها:</p>
          
          <div className="flex gap-4 md:gap-8 mb-6 flex-wrap md:flex-nowrap">
            <div className="flex-1 space-y-3 w-full">
              <h4 className="font-bold text-center mb-2">الوسيلة</h4>
              {items.map(t => (
                <button 
                  key={t}
                  onClick={() => setSelectedItem(t)}
                  disabled={matches.some(m => m.item === t)}
                  className={`w-full p-3 rounded-lg border-2 text-center transition-all ${matches.some(m => m.item === t) ? 'bg-green-100 border-green-300 text-green-700 opacity-50' : selectedItem === t ? 'border-pink-500 bg-pink-50' : 'border-slate-200 hover:border-pink-300'}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex-1 space-y-3 w-full">
              <h4 className="font-bold text-center mb-2">الوظيفة</h4>
              {funcs.map(f => (
                <button 
                  key={f}
                  onClick={() => handleMatch(f)}
                  disabled={matches.some(m => m.func === f)}
                  className={`w-full p-3 rounded-lg border-2 text-center transition-all ${matches.some(m => m.func === f) ? 'bg-green-100 border-green-300 text-green-700 opacity-50' : 'border-slate-200 hover:border-pink-300'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {matches.length === 3 && (
            <div className="p-4 bg-green-50 text-green-800 rounded-lg flex items-center gap-3">
              <CheckCircle2  className="w-5 h-5 shrink-0"/> رائع! الجهاز العصبي مثل شبكة اتصالات دقيقة.
            </div>
          )}
        </div>
      )}

      {/* Challenge 3: MCQ */}
      {step >= 3 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-xl font-bold text-pink-600 mb-4 flex items-center gap-2">
            <Target  className="w-5 h-5 shrink-0"/> التحدي الثالث: هندسة الحركة
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6">عند سحب خيوط الذراع الاصطناعية لتنثني الأصابع، ما هو التحويل النقطي الرياضي الأقرب لوصف حركة نقطة على الخيط الساحب؟</p>
          
          <div className="space-y-3">
            <button onClick={() => playSound('error')} className="w-full text-right p-4 rounded-lg border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-700">
              (أ) دوران (Rotation)
            </button>
            <button onClick={() => playSound('error')} className="w-full text-right p-4 rounded-lg border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-700">
              (ب) تناظر مركزي (Central Symmetry)
            </button>
            <button onClick={() => {
              if(!q3Solved) {
                setQ3Solved(true);
                addXp(20);
                addBadge({ id: 'math_engineer', name: 'مهندس رياضي', icon: <Wrench   className="w-4 h-4 shrink-0"/> });
                setStep(4);
              }
            }} className={`w-full text-right p-4 rounded-lg border-2 ${q3Solved ? 'border-green-500 bg-green-50' : 'border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-700'}`}>
              (ج) انسحاب (Translation)
            </button>
          </div>
        </div>
      )}

      {/* Identity Activation */}
      {step >= 4 && (
        <div className="bg-gradient-to-br from-pink-900 to-purple-900 rounded-2xl p-8 text-white shadow-lg">
          <h3 className="text-2xl font-bold mb-4">تفعيل الهوية</h3>
          <p className="mb-6 text-pink-200">
            أنت الآن تملك المعرفة اللازمة! قم بتسجيل تفاصيل مشروعك لتبدأ عملية البناء.
          </p>
          
          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-bold mb-2 text-pink-300">👨‍🔧 اسمك كمهندس</label>
              <input 
                type="text" value={inputEngineer} onChange={(e) => setInputEngineer(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white focus:outline-none focus:border-white/50"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-pink-300">✍️ اسم المشروع</label>
              <input 
                type="text" value={inputName} onChange={(e) => setInputName(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white focus:outline-none focus:border-white/50"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-pink-300">🚩 شعار المهمة</label>
              <input 
                type="text" value={inputSlogan} onChange={(e) => setInputSlogan(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white focus:outline-none focus:border-white/50"
              />
            </div>
          </div>

          <button 
            onClick={handleIdentitySubmit}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-yellow-950 font-bold py-4 rounded-xl transition-colors text-lg"
          >
            تفعيل الهوية وبدء المهمة
          </button>
        </div>
      )}
    </motion.div>
  );
}

// ============================================================================
// STAGE 2: WHAT (ماذا؟)
// ============================================================================
function StageWhat({ addXp, addBadge, onComplete }: any) {
  const [solved, setSolved] = useState<Record<string, boolean>>({});

  const handleSolve = (id: string, badge?: Badge) => {
    if (solved[id]) return;
    setSolved({ ...solved, [id]: true });
    addXp(8);
    if (badge) addBadge(badge);
  };

  const isAllSolved = Object.keys(solved).length === 9;

  const ChoiceBtn = ({ text, isCorrect, id, badge }: any) => (
    <button 
      onClick={() => isCorrect ? handleSolve(id, badge) : playSound('error')} 
      className="w-full text-right p-3 rounded-lg border border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 mb-2"
    >
      {text}
    </button>
  );

  const QuestionCard = ({ title, id, children }: any) => (
    <div className={`bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border transition-all ${solved[id] ? 'border-green-500 bg-green-50/50 dark:bg-green-900/10' : 'border-slate-100 dark:border-slate-800'}`}>
      <h4 className="font-bold mb-4 flex items-center justify-between">
        {title}
        {solved[id] && <CheckCircle2 className="w-5 h-5 shrink-0 text-green-500" />}
      </h4>
      {!solved[id] && children}
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
      <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-xl border border-emerald-100 dark:border-emerald-800 flex gap-4 items-center">
        <Image  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Amal&style=circle" alt="Dia" className="w-16 h-16 bg-white rounded-full border-2 border-emerald-200" width={500} height={500} />
        <p className="text-emerald-800 dark:text-emerald-200 font-bold">
          "هنا ندمج العلوم، الفيزياء، والرياضيات لفهم آليات الحركة. أجب عن هذه الأسئلة التحضيرية."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QuestionCard title="س1: المركز النخاعي" id="q1">
          <p className="text-sm text-slate-600 mb-4">ما هو المركز المسؤول عن الأفعال الانعكاسية (اللاإرادية)؟</p>
          <ChoiceBtn text="(A) المخ" isCorrect={false} id="q1" />
          <ChoiceBtn text="(B) النخاع الشوكي" isCorrect={true} id="q1" badge={{ id: 'bio_expert', name: 'عالم أحياء', icon: <Brain   className="w-4 h-4 shrink-0"/> }} />
          <ChoiceBtn text="(C) البصلة السيسائية" isCorrect={false} id="q1" />
        </QuestionCard>

        <QuestionCard title="س2: العصب الناقل" id="q2">
          <p className="text-sm text-slate-600 mb-4">أي عصب ينقل الأوامر من المركز العصبي إلى العضلة؟</p>
          <ChoiceBtn text="العصب الحسي" isCorrect={false} id="q2" />
          <ChoiceBtn text="العصب الحركي" isCorrect={true} id="q2" />
        </QuestionCard>

        <QuestionCard title="س3: صح أم خطأ" id="q3">
          <p className="text-sm text-slate-600 mb-4">المخدرات تزيد من سرعة استجابة الجهاز العصبي للمنبهات وتنشطه.</p>
          <div className="flex gap-4">
            <button onClick={() => playSound('error')} className="flex-1 py-2 bg-green-100 text-green-800 rounded-lg">صواب</button>
            <button onClick={() => handleSolve('q3')} className="flex-1 py-2 bg-red-100 text-red-800 rounded-lg">خطأ</button>
          </div>
        </QuestionCard>

        <QuestionCard title="س4: طبيعة الرسالة" id="q4">
          <p className="text-sm text-slate-600 mb-4">كيف تنتقل الأوامر عبر الأعصاب؟</p>
          <ChoiceBtn text="عبر سيالة عصبية (إشارات كهربائية)" isCorrect={true} id="q4" badge={{ id: 'phys_expert', name: 'عالم فيزياء', icon: <Zap   className="w-4 h-4 shrink-0"/> }} />
          <ChoiceBtn text="عبر نبضات صوتية" isCorrect={false} id="q4" />
        </QuestionCard>

        <QuestionCard title="س5: القوى الفيزيائية" id="q5">
          <p className="text-sm text-slate-600 mb-4">عندما نسحب الخيط في الذراع الاصطناعية، ما نوع القوة المطبقة؟</p>
          <ChoiceBtn text="(A) قوة دفع" isCorrect={false} id="q5" />
          <ChoiceBtn text="(B) قوة شد (سحب)" isCorrect={true} id="q5" />
        </QuestionCard>

        <QuestionCard title="س6: السرعة والقوة" id="q6">
          <p className="text-sm text-slate-600 mb-4">لجعل الإصبع ينثني بسرعة أكبر، ماذا يجب أن نفعل؟</p>
          <ChoiceBtn text="زيادة قوة الشد على الخيط" isCorrect={true} id="q6" />
          <ChoiceBtn text="تقليل قوة الشد على الخيط" isCorrect={false} id="q6" />
        </QuestionCard>

        <QuestionCard title="س7: الانسحاب الرياضي" id="q7">
          <p className="text-sm text-slate-600 mb-4">حركة الخيط داخل الأنبوب المفرغ تمثل هندسياً حركة:</p>
          <ChoiceBtn text="دوران حول محور" isCorrect={false} id="q7" />
          <ChoiceBtn text="انسحاب في خط مستقيم" isCorrect={true} id="q7" />
        </QuestionCard>

        <QuestionCard title="س8: تواصل تاريخي" id="q8">
          <p className="text-sm text-slate-600 mb-4">قبل اختراع الهاتف، استخدم البشر إشارات سريعة للتحذير من مسافات بعيدة مثل السيالة العصبية. ماهي؟</p>
          <ChoiceBtn text="الإشارات الدخانية أو الضوئية" isCorrect={true} id="q8" />
          <ChoiceBtn text="رسائل في زجاجات" isCorrect={false} id="q8" />
        </QuestionCard>

        <QuestionCard title="س9: حساب المساحة" id="q9">
          <p className="text-sm text-slate-600 mb-4">إذا كان كف الذراع الاصطناعي مستطيلاً طوله 20cm وعرضه 15cm، فكم مساحته؟</p>
          <div className="grid grid-cols-3 gap-2">
            {[200, 300, 400].map(val => (
              <button key={val} onClick={() => val === 300 ? handleSolve('q9') : playSound('error')} className="py-2 border border-slate-200 rounded-lg">{val} cm²</button>
            ))}
          </div>
        </QuestionCard>
      </div>

      {isAllSolved && (
        <div className="bg-emerald-500 text-white p-8 rounded-2xl text-center">
          <h3 className="text-2xl font-bold mb-4">عمل مميز!</h3>
          <p className="mb-6">أثبتّ فهمك للمبادئ العلمية للمشروع.</p>
          <button onClick={() => { addXp(50); onComplete(); }} className="bg-white text-emerald-600 px-8 py-3 rounded-xl font-bold text-lg hover:bg-emerald-50">
            تقدم للمرحلة التالية (+50 XP)
          </button>
        </div>
      )}
    </motion.div>
  );
}

// ============================================================================
// STAGE 3: HOW (كيف؟)
// ============================================================================
function StageHow({ addXp, addBadge, onComplete }: any) {
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  const stages = [
    { id: 1, title: 'الخطوة 1: الرسم والقص', desc: "ارسم مخططاً لليد على الكرتون المقوى بدقة. قم بقصه بحذر مع الحفاظ على النسب الصحيحة للأصابع.", xp: 10 },
    { id: 2, title: 'الخطوة 2: إنشاء المفاصل', desc: "قم بِثني الأصابع الكرتونية في الأماكن الثلاثة الطبيعية لكل إصبع (سلاميات) لإنشاء مفاصل مرنة تتحرك بسهولة.", xp: 10 },
    { id: 3, title: 'الخطوة 3: تركيب المسارات (المصاصات)', desc: "قص مصاصات بلاستيكية وقم بلصق كل قطعة بين كل مفصل وآخر. هذه المصاصات ستكون بمثابة الأغماد للأعصاب.", xp: 10 },
    { id: 4, title: 'الخطوة 4: تمرير الخيوط والاختبار', desc: "مرر خيوطاً متينة (تعمل كأعصاب وأوتار) عبر المصاصات، واربطها في نهاية كل إصبع. اسحب الخيوط لتختبر حركة اليد!", xp: 10, badge: { id: 'hand_builder', name: 'صانع الأمل', icon: <Hand   className="w-4 h-4 shrink-0"/> } }
  ];

  const handleCompleteStage = (stage: any) => {
    if (completedStages.includes(stage.id)) return;
    setCompletedStages([...completedStages, stage.id]);
    addXp(stage.xp);
    if (stage.badge) addBadge(stage.badge);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
        <p className="text-blue-800 dark:text-blue-200 font-bold mb-4">
          "حان وقت البناء! سنحول الخامات البسيطة إلى ذراع متحركة باستخدام الهندسة اليدوية."
        </p>
      </div>

      <div className="space-y-4">
        {stages.map((stage, idx) => {
          const isCompleted = completedStages.includes(stage.id);
          const isLocked = idx > 0 && !completedStages.includes(stages[idx - 1].id);
          return (
            <div key={stage.id} className={`bg-white dark:bg-slate-900 rounded-2xl p-6 border-2 transition-all ${isCompleted ? 'border-green-500 bg-green-50/30' : isLocked ? 'border-slate-100 opacity-50' : 'border-blue-200 shadow-sm'}`}>
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-lg">{stage.title}</h4>
                <div className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">+{stage.xp} XP</div>
              </div>
              <p className="text-slate-600 mb-4">{stage.desc}</p>
              {!isCompleted && !isLocked && (
                <button onClick={() => handleCompleteStage(stage)} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700">
                  إتمام الخطوة
                </button>
              )}
            </div>
          );
        })}
      </div>

      {completedStages.length === 4 && (
        <div className="bg-blue-500 text-white p-8 rounded-2xl text-center">
          <h3 className="text-2xl font-bold mb-4">تم الانتهاء بنجاح!</h3>
          <p className="mb-6">ذراع الأمل جاهزة للحركة ومساعدة الآخرين.</p>
          <button onClick={() => { addXp(40); onComplete(); }} className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50">
            المرحلة التالية (+40 XP)
          </button>
        </div>
      )}
    </motion.div>
  );
}

// ============================================================================
// STAGE 4: WHAT IF (ماذا لو؟)
// ============================================================================
function StageWhatIf({ addXp, addBadge, onComplete }: any) {
  const [c1, setC1] = useState(false);
  const [c2, setC2] = useState(false);
  const [c3, setC3] = useState(false);

  const ChoiceBtn = ({ text, isCorrect, onSolve, badge }: any) => (
    <button onClick={() => {
      if (isCorrect) { onSolve(true); addXp(15); if(badge) addBadge(badge); } else playSound('error');
    }} className="w-full text-right p-4 rounded-xl border-2 border-slate-200 hover:bg-slate-50 mb-3 block">
      {text}
    </button>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border border-yellow-100 flex gap-4 items-center">
        <p className="text-yellow-800 font-bold">"تفكير المبدع لا يتوقف. ماذا لو قمنا بتطوير النموذج؟"</p>
      </div>

      <div className="space-y-6">
        <div className={`bg-white rounded-2xl p-6 border-2 ${c1 ? 'border-green-500' : 'border-yellow-200'}`}>
          <h3 className="text-lg font-bold mb-4">🌱 ماذا لو استبدلنا البلاستيك بمواد طبيعية للبيئة؟</h3>
          {!c1 && (
            <>
              <ChoiceBtn text="(A) سيصبح النموذج ضعيفاً وغير صالح." isCorrect={false} />
              <ChoiceBtn text="(B) سنحصل على ذراع مستدامة قابلة للتحلل، لكن تحتاج لمواد مثل خشب الخيزران أو الخيوط القطنية." isCorrect={true} onSolve={setC1} badge={{ id: 'eco_friendly', name: 'صديق البيئة', icon: <Globe   className="w-4 h-4 shrink-0"/> }} />
            </>
          )}
        </div>

        <div className={`bg-white rounded-2xl p-6 border-2 ${c2 ? 'border-green-500' : 'border-yellow-200'}`}>
          <h3 className="text-lg font-bold mb-4">🤖 ماذا لو استخدمنا نظاماً هيدروليكياً بالحقن بدلاً من الخيوط؟</h3>
          {!c2 && (
            <>
              <ChoiceBtn text="(A) ستتحرك الأصابع بناءً على ضغط السائل المنقول عبر الأنابيب الدقيقة." isCorrect={true} onSolve={setC2} badge={{ id: 'innovator', name: 'مبتكر أنظمة', icon: <Lightbulb   className="w-4 h-4 shrink-0"/> }} />
              <ChoiceBtn text="(B) النظام الهيدروليكي يستخدم فقط في السيارات." isCorrect={false} />
            </>
          )}
        </div>

        <div className={`bg-white rounded-2xl p-6 border-2 ${c3 ? 'border-green-500' : 'border-yellow-200'}`}>
          <h3 className="text-lg font-bold mb-4">🧲 ماذا لو أضفنا حساسات ومحركات للذراع؟</h3>
          {!c3 && (
            <>
              <ChoiceBtn text="(A) ستصبح ذراعاً إلكترونية (Bionic Arm) تقرأ الإشارات العضلية وتتحرك آلياً." isCorrect={true} onSolve={setC3} />
              <ChoiceBtn text="(B) ستنفجر الذراع من الكهرباء." isCorrect={false} />
            </>
          )}
        </div>
      </div>

      {(c1 && c2 && c3) && (
        <button onClick={() => { addXp(35); onComplete(); }} className="w-full bg-yellow-500 text-yellow-950 font-bold py-4 rounded-xl text-lg">
          إتمام التحديات الإبداعية (+35 XP)
        </button>
      )}
    </motion.div>
  );
}

// ============================================================================
// STAGE 5: PROTECT (براءة)
// ============================================================================
function StageProtect({ addXp, addBadge, onComplete, engineerName, projectName, xp, badgesCount }: any) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!certificateRef.current) return;
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(certificateRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`براءة_اختراع_${projectName}.pdf`);
      addXp(25);
      addBadge({ id: 'hope_patent', name: 'براءة ذراع الأمل', icon: <Award   className="w-4 h-4 shrink-0"/> });
    } catch (err) {
      console.error(err);
    }
    setIsGenerating(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
      <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 flex gap-4">
        <p className="text-purple-800 font-bold">
          "ختام الرحلة. وثّق عملك الهندسي للحصول على البراءة."
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <label className="block mb-2 font-bold">شرح الابتكار</label>
        <textarea rows={3} placeholder="كيف يعمل مشروعك..." className="w-full border rounded-xl p-3 mb-4"></textarea>
        
        <label className="block mb-2 font-bold">ما المميز في تصميمك؟</label>
        <textarea rows={3} placeholder="إضافاتك الخاصة..." className="w-full border rounded-xl p-3 mb-4"></textarea>
      </div>

      {/* Certificate Preview */}
      <div className="overflow-x-auto pb-4">
        <div ref={certificateRef} className="min-w-[800px] w-full aspect-[1.414] bg-white relative overflow-hidden border-8 border-double border-purple-900 p-12 flex flex-col items-center justify-center text-center">
          <Award  className="w-6 h-6 shrink-0 text-yellow-500 mb-6" />
          <h1 className="text-5xl font-black text-purple-900 mb-2 font-serif">براءة اختراع</h1>
          <h2 className="text-2xl font-bold text-purple-700 mb-12">"ذراع الأمل الاصطناعية"</h2>
          <p className="text-xl text-slate-700 mb-4">مُنحت للمخترع(ة):</p>
          <p className="text-4xl font-bold text-blue-600 mb-8 pb-2 border-b-2 inline-block px-12">{engineerName}</p>
          <p className="text-xl text-slate-700 mb-4">باسم المشروع:</p>
          <p className="text-3xl font-bold text-pink-600 mb-12">"{projectName}"</p>
          <div className="flex justify-between w-full px-16 mt-auto">
            <div><p className="font-bold">XP</p><p className="text-2xl text-blue-600 font-black">{xp}</p></div>
            <div><p className="font-bold">توقيع الوكالة</p><p className="text-2xl text-purple-900 font-black" style={{fontFamily: 'cursive'}}>د. آمال</p></div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button onClick={handleDownload} disabled={isGenerating} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-xl text-xl transition-all disabled:opacity-50">
          {isGenerating ? 'جاري الاستخراج...' : 'اختم ابتكاري (+25 XP)'}
        </button>
      </div>
    </motion.div>
  );
}
