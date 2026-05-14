"use client";

import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Award, CheckCircle2, 
  Search, Lightbulb, Upload, 
  Play, Globe, Beaker, Wrench,
  Zap, Magnet, Bug, Target, BarChart, ChevronRight
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

export default function MagneticPollinatorMission() {
  const [xp, setXp] = useState(0);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [activeStage, setActiveStage] = useState<Stage>('why');
  const [completedStages, setCompletedStages] = useState<Stage[]>([]);
  const [engineerName, setEngineerName] = useState('مهندس الطبيعة');
  const [projectName, setProjectName] = useState('المشروع قيد التفعيل');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('magneticPollinatorState');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setXp(parsed.xp || 0);
        setCompletedStages(parsed.completedStages || []);
        setEngineerName(parsed.engineerName || 'مهندس الطبيعة');
        setProjectName(parsed.projectName || 'المشروع قيد التفعيل');
        setIsDarkMode(parsed.isDarkMode || false);
      } catch (e) {
        console.error('Error loading state', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('magneticPollinatorState', JSON.stringify({
      xp, completedStages, engineerName, projectName, isDarkMode
    }));
  }, [xp, completedStages, engineerName, projectName, isDarkMode]);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const addXp = (amount: number) => {
    setXp(prev => Math.min(prev + amount, 250));
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
        <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center font-bold text-xl border-2 border-amber-300 text-amber-950">
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
          <span className="font-bold text-amber-400">{xp} / 250</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-amber-500 to-yellow-300" initial={{ width: 0 }} animate={{ width: `${Math.min(100, (xp / 250) * 100)}%` }} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="text-xs text-slate-400">المشروع</div>
          <div className="font-bold text-amber-300 text-sm">{projectName}</div>
        </div>
        <div className="h-8 w-px bg-slate-700 mx-2"></div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2 rtl:space-x-reverse">
            {badges.slice(0, 3).map((badge, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-amber-400" title={badge.name}>{badge.icon || <Award   className="w-4 h-4 shrink-0"/>}</div>
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
      { id: 'why', label: 'لماذا؟', icon: <Search   className="w-4 h-4 shrink-0"/>, color: 'bg-red-600' },
      { id: 'what', label: 'ماذا؟', icon: <Beaker   className="w-4 h-4 shrink-0"/>, color: 'bg-green-600' },
      { id: 'how', label: 'كيف؟', icon: <Wrench   className="w-4 h-4 shrink-0"/>, color: 'bg-purple-600' },
      { id: 'whatif', label: 'ماذا لو؟', icon: <Lightbulb   className="w-4 h-4 shrink-0"/>, color: 'bg-yellow-500' },
      { id: 'protect', label: 'براءة', icon: <Shield   className="w-4 h-4 shrink-0"/>, color: 'bg-blue-600' },
    ];

    return (
      <div className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 mb-6 font-cairo">
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
            <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${(completedStages.length / 5) * 100}%` }}></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen font-cairo ${isDarkMode ? 'dark bg-slate-950 text-slate-50' : 'bg-slate-50 text-slate-900'}`}>
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
  const [inspectedAnther, setInspectedAnther] = useState(false);
  const [inspectedStigma, setInspectedStigma] = useState(false);
  const [q1Solved, setQ1Solved] = useState(false);
  
  // Matching Game
  const [matches, setMatches] = useState<{item: string, func: string}[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const items = ['الجسم المشعر', 'الألوان الزاهية', 'الرحيق'];
  const funcs = ['حمل حبوب الطلع', 'جذب الحشرات', 'غذاء النحلة'];
  const correctMatches: Record<string, string> = {
    'الجسم المشعر': 'حمل حبوب الطلع',
    'الألوان الزاهية': 'جذب الحشرات',
    'الرحيق': 'غذاء النحلة'
  };
  const [q2Solved, setQ2Solved] = useState(false);

  // Timeline
  const [timeline, setTimeline] = useState(0);
  const [q3Solved, setQ3Solved] = useState(false);

  // Identity
  const [inputName, setInputName] = useState('ملقح 2000');
  const [inputSlogan, setInputSlogan] = useState('حياة أفضل لنباتاتنا');
  const [inputEngineer, setInputEngineer] = useState('مهندس الطبيعة');

  const handleMatch = (func: string) => {
    if (!selectedItem) return;
    if (correctMatches[selectedItem] === func) {
      const newMatches = [...matches, { item: selectedItem, func }];
      setMatches(newMatches);
      setSelectedItem(null);
    } else {
      playSound('error');
      setSelectedItem(null);
    }
  };

  const handleIdentitySubmit = () => {
    setProjectName(inputName);
    setEngineerName(inputEngineer);
    addXp(50);
    addBadge({ id: 'eco_engineer', name: 'مهندس بيئي', icon: <Bug   className="w-4 h-4 shrink-0"/> });
    onComplete();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
      {/* Intro & Dialogue */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border-t-4 border-red-600 dark:border-slate-800">
        <div className="aspect-video bg-slate-800 rounded-xl mb-6 relative overflow-hidden flex items-center justify-center">
          <Play  className="w-6 h-6 shrink-0 text-white/50" />
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">video_bees_crisis.mp4</div>
        </div>
        
        <div className="flex gap-4 items-start bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border border-red-100 dark:border-red-800">
          <Image  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Dia" alt="Engineer Dia" className="w-16 h-16 bg-amber-100 rounded-full border-2 border-red-200" width={500} height={500} />
          <div>
            <h3 className="font-bold text-red-900 dark:text-red-300 mb-2">المهندسة ديا</h3>
            <p className="text-red-800 dark:text-red-200 leading-relaxed font-medium">
              "حالة طوارئ! أعداد النحل في تراجع مستمر بسبب التلوث. بدون النحل، لن تُلقّح الأزهار ولن تثمر المحاصيل. مهمتك هي فهم المشكلة وابتكار مقلّد مغناطيسي يعوّض عملها!"
            </p>
            {step === 0 && (
              <button onClick={() => setStep(1)} className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700">
                مستعد لبدء التحقيق!
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Investigation */}
      {step >= 1 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
            <Search  className="w-5 h-5 shrink-0"/> التفتيش الزهري
          </h3>
          <p className="mb-4">تفقّد المئبر (الجزء الذكري) والميسم (الجزء الأنثوي) للزهرة.</p>
          <div className="flex gap-4 mb-6">
            <button onClick={() => setInspectedAnther(true)} className={`px-4 py-2 rounded-lg font-bold transition-all ${inspectedAnther ? 'bg-slate-200 text-slate-500' : 'bg-amber-100 hover:bg-amber-200 text-amber-800'}`}>
              فحص المئبر
            </button>
            <button onClick={() => setInspectedStigma(true)} className={`px-4 py-2 rounded-lg font-bold transition-all ${inspectedStigma ? 'bg-slate-200 text-slate-500' : 'bg-pink-100 hover:bg-pink-200 text-pink-800'}`}>
              فحص الميسم
            </button>
          </div>
          {inspectedAnther && inspectedStigma && !q1Solved && (
            <div className="bg-red-50 p-4 rounded-xl">
              <p className="font-bold mb-3">ما هو الخطر الرئيسي إذا لم تنتقل حبوب الطلع من المئبر إلى الميسم؟</p>
              <button onClick={() => playSound('error')} className="block w-full p-2 mb-2 bg-white rounded border hover:bg-slate-50 text-right">ذبول الأوراق</button>
              <button onClick={() => {
                setQ1Solved(true);
                addXp(15);
                addBadge({ id: 'botany_detective', name: 'محقق نباتي', icon: <Search   className="w-4 h-4 shrink-0"/> });
                setStep(2);
              }} className="block w-full p-2 mb-2 bg-white border hover:bg-slate-50 text-right">انقطاع التلقيح</button>
            </div>
          )}
          {q1Solved && <div className="text-green-600 font-bold flex items-center gap-2"><CheckCircle2/> التلقيح متوقف! المشكلة حددت. (+15 XP)</div>}
        </div>
      )}

      {/* Matching Game */}
      {step >= 2 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
            <Bug  className="w-5 h-5 shrink-0"/> أسرار النحلة
          </h3>
          <p className="mb-4">قبل اختراع البديل، كيف تقوم النحلة بهذه العملية بكفاءة؟</p>
          <div className="flex flex-col md:flex-row gap-8 mb-6">
            <div className="flex-1 space-y-3">
              <h4 className="font-bold text-center">الخصائص</h4>
              {items.map(t => (
                <button key={t} onClick={() => setSelectedItem(t)} disabled={matches.some(m => m.item === t)} className={`w-full p-3 rounded-lg border-2 text-center transition-all ${matches.some(m => m.item === t) ? 'bg-green-100 border-green-300 opacity-50' : selectedItem === t ? 'border-red-500 bg-red-50' : 'hover:border-red-300 border-slate-200'}`}>
                  {t}
                </button>
              ))}
            </div>
            <div className="flex-1 space-y-3">
              <h4 className="font-bold text-center">الوظائف</h4>
              {funcs.map(f => (
                <button key={f} onClick={() => handleMatch(f)} disabled={matches.some(m => m.func === f)} className={`w-full p-3 rounded-lg border-2 text-center transition-all ${matches.some(m => m.func === f) ? 'bg-green-100 border-green-300 opacity-50' : 'hover:border-red-300 border-slate-200'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          {matches.length === 3 && !q2Solved && (
            <div className="bg-red-50 p-4 rounded-xl">
              <p className="font-bold mb-3">بالإضافة إلى الزغب، تحك النحلة أجنحتها في الهواء مما يولد نوعاً من الشحنات تساعد في التصاق حبوب الطلع. ما هي؟</p>
              <button onClick={() => {
                setQ2Solved(true);
                addXp(15);
                setStep(3);
              }} className="block w-full p-2 mb-2 bg-white border hover:bg-slate-50 text-right">الشحنات الكهربائية</button>
              <button onClick={() => playSound('error')} className="block w-full p-2 mb-2 bg-white border hover:bg-slate-50 text-right">الشحنات المغناطيسية</button>
            </div>
          )}
          {q2Solved && <div className="text-green-600 font-bold flex items-center gap-2"><CheckCircle2/> النحلة تستخدم الكهرباء الساكنة! (+15 XP)</div>}
        </div>
      )}

      {/* Timeline */}
      {step >= 3 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
            <BarChart  className="w-5 h-5 shrink-0"/> خط زمني للتدهور
          </h3>
          <p className="mb-4">حرك الشريط الزمني لمشاهدة تأثير غياب النحل على المحصول بمرور الأشهر.</p>
          <input type="range" min="0" max="3" value={timeline} onChange={(e) => setTimeline(Number(e.target.value))} className="w-full accent-red-600 mb-4" />
          <div className="flex justify-between text-sm text-slate-500 mb-6">
            <span>الشهر الأول</span>
            <span>الشهر الرابع</span>
          </div>
          <div className="text-center font-bold text-lg mb-6 h-12">
            {timeline === 0 && 'الأزهار تتفتح لكن لا يوجد ملقحات.'}
            {timeline === 1 && 'تبدأ بعض الأزهار بالذبول المبكر.'}
            {timeline === 2 && 'غياب شبه تام لتشكل الثمار.'}
            {timeline === 3 && 'انهيار المحصول الزراعي بنسبة 90%.'}
          </div>
          {timeline === 3 && !q3Solved && (
            <div className="bg-red-50 p-4 rounded-xl">
              <p className="font-bold mb-3">ما هو الاستنتاج الرئيسي من هذه المحاكاة؟</p>
              <button onClick={() => playSound('error')} className="block w-full p-2 mb-2 bg-white border hover:bg-slate-50 text-right">الأزهار لا تحتاج لثمار</button>
              <button onClick={() => {
                setQ3Solved(true);
                addXp(20);
                setStep(4);
              }} className="block w-full p-2 mb-2 bg-white border hover:bg-slate-50 text-right">التلقيح هو المفتاح الأساسي للأمن الغذائي</button>
            </div>
          )}
        </div>
      )}

      {/* Identity */}
      {step >= 4 && (
        <div className="bg-gradient-to-br from-red-600 to-amber-600 rounded-2xl p-8 text-white shadow-lg">
          <h3 className="text-2xl font-bold mb-4">تبني المهمة</h3>
          <p className="mb-6 text-red-100">سجل تفاصيل مهمتك لإنقاذ الموسم الزراعي باستخدام العلوم!</p>
          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-bold mb-2">اسمك (المهندس)</label>
              <input type="text" value={inputEngineer} onChange={e => setInputEngineer(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white focus:outline-none focus:border-white/50" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">اسم الملقح المغناطيسي الخاص بك</label>
              <input type="text" value={inputName} onChange={e => setInputName(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white focus:outline-none focus:border-white/50" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">شعار العملية</label>
              <input type="text" value={inputSlogan} onChange={e => setInputSlogan(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white focus:outline-none focus:border-white/50" />
            </div>
          </div>
          <button onClick={handleIdentitySubmit} className="w-full bg-white text-red-700 font-bold py-4 rounded-xl transition-colors text-lg hover:bg-red-50">
            تأكيد وابدأ التصميم (+50 XP)
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

  const isAllSolved = Object.keys(solved).length === 7;

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
        {title} {solved[id] && <CheckCircle2 className="w-5 h-5 shrink-0 text-green-500" />}
      </h4>
      {!solved[id] && children}
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border-t-4 border-green-600 flex gap-4 items-center">
        <Image  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Dia" alt="Dia" className="w-16 h-16 bg-amber-100 rounded-full border-2 border-green-200" width={500} height={500} />
        <p className="text-green-800 dark:text-green-200 font-bold">
          "المعرفة هي سلاحنا. أحتاج مساعتدك لإجراء الاختبارات المتعددة في مجالات البيولوجيا، الفيزياء والرياضيات لبناء نموذجنا المغناطيسي."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Biology */}
        <QuestionCard title="البيولوجيا: ترتيب التلقيح" id="q1">
          <p className="text-sm text-slate-600 mb-4">ما هو الترتيب الصحيح لعملية التلقيح؟</p>
          <ChoiceBtn text="سقوط حبة طلاع -> إنبات انبوب طلعي -> إخصاب -> ثمرة" isCorrect={true} id="q1" badge={{ id: 'botanist', name: 'عالم نبات', icon: <Beaker   className="w-4 h-4 shrink-0"/> }} />
          <ChoiceBtn text="إخصاب -> ثمرة -> سقوط طلاع" isCorrect={false} id="q1" />
        </QuestionCard>

        <QuestionCard title="البيولوجيا: الدخيل" id="q2">
          <p className="text-sm text-slate-600 mb-4">أي من التالي لا يعتبر من الملقحات الطبيعية؟</p>
          <ChoiceBtn text="النحل" isCorrect={false} id="q2" />
          <ChoiceBtn text="الرياح" isCorrect={false} id="q2" />
          <ChoiceBtn text="حشرات المن (التي تمتص عصارة النبات)" isCorrect={true} id="q2" />
        </QuestionCard>

        {/* Physics */}
        <QuestionCard title="الفيزياء: التجاذب المغناطيسي" id="q3">
          <p className="text-sm text-slate-600 mb-4">ماذا يحدث لبرادة الحديد عند تقريب المغناطيس منها؟</p>
          <ChoiceBtn text="تتنافر وتبتعد" isCorrect={false} id="q3" />
          <ChoiceBtn text="تنجذب وتتشكل حول أقطاب المغناطيس" isCorrect={true} id="q3" badge={{ id: 'magnet_master', name: 'سيد المغناطيس', icon: <Magnet   className="w-4 h-4 shrink-0"/> }} />
        </QuestionCard>

        <QuestionCard title="الفيزياء: المجال عبر الحواجز" id="q4">
          <p className="text-sm text-slate-600 mb-4">هل يمكن للمجال المغناطيسي أن يجذب مسامير حديدية من خلال ورقة؟</p>
          <ChoiceBtn text="نعم، المجال المغناطيسي يخترق الورق" isCorrect={true} id="q4" />
          <ChoiceBtn text="لا، الورقة تعزل المغناطيسية تماماً" isCorrect={false} id="q4" />
        </QuestionCard>

        {/* Math */}
        <QuestionCard title="الرياضيات: معادلة التلقيح" id="q5">
          <p className="text-sm text-slate-600 mb-4">إذا كان لدينا X زهرة، وكل زهرة تحتاج لـ 3 حبيبات طلاع لتخصيبها بالكامل، العبارة الجبرية لعدد حبيبات الطلع الكلية هي:</p>
          <ChoiceBtn text="X + 3" isCorrect={false} id="q5" />
          <ChoiceBtn text="3X" isCorrect={true} id="q5" />
          <ChoiceBtn text="X/3" isCorrect={false} id="q5" />
        </QuestionCard>

        <QuestionCard title="الرياضيات: حل المعادلة" id="q6">
          <p className="text-sm text-slate-600 mb-4">إذا كان إجمالي عدد الزهور الملقحة هو A=50 وكانت المعادلة: A = 2 * x، استخرج قيمة x (عدد الزيارات اللازمة).</p>
          <ChoiceBtn text="100" isCorrect={false} id="q6" />
          <ChoiceBtn text="25" isCorrect={true} id="q6" />
        </QuestionCard>

        {/* Data Analysis */}
        <QuestionCard title="تحليل البيانات: التردد" id="q7">
          <p className="text-sm text-slate-600 mb-4">في جدول إحصائي، لُوحظ أن الزهرة 'أ' زارتها الملقحات 12 مرة، والزهرة 'ب' 5 مرات. أي زهرة ستحظى بفرصة إخصاب أعلى بناءً على التكرار؟</p>
          <ChoiceBtn text="الزهرة أ" isCorrect={true} id="q7" />
          <ChoiceBtn text="الزهرة ب" isCorrect={false} id="q7" />
        </QuestionCard>
      </div>

      {isAllSolved && (
        <div className="bg-green-600 text-white p-8 rounded-2xl text-center">
          <h3 className="text-2xl font-bold mb-4">تم جمع البيانات بنجاح!</h3>
          <p className="mb-6">لقد حددنا المبادئ المغناطيسية الجاذبة والوظائف الحيوية بدقة.</p>
          <button onClick={() => { addXp(50); onComplete(); }} className="bg-white text-green-700 px-8 py-3 rounded-xl font-bold text-lg hover:bg-green-50 pointer">
            الذهاب للورشة (+50 XP)
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
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    { id: 1, title: 'صناعة النحلة المغناطيسية', desc: "نأخذ نموذج النحلة (من الكرتون) ونلصق في أسفله مغناطيساً صغيراً قوياً. سيُحاكي هذا المغناطيس الشحنات الكهربائية الساكنة العالية للنحلة الطبيعية.", xp: 10 },
    { id: 2, title: 'تحضير الزهرة', desc: "نضع زهرة اصطناعية ونثبت في وسطها (المئبر) برادة الحديد الدقيقة، والتي ستُمثل هنا حبوب الطلع الجاهزة للانتقال.", xp: 10 },
    { id: 3, title: 'التحكم والتوجيه', desc: "نثبت النحلة على عصا خشبية أو سلك صلب للتحكم الجيد في طيرانها بين الأزهار بعناية فائقة.", xp: 10 },
    { id: 4, title: 'محاكاة التلقيح (الاختبار)', desc: "نقوم بتمرير نموذج النحلة فوق برادة الحديد. بفعل الجذب المغناطيسي، تلتصق البرادة ببطن النحلة. ثم ننقلها لزهرة أخرى لنسخ عملية التلقيح الحقيقي!", xp: 10, badge: { id: 'pollinator_builder', name: 'صانع الملقح', icon: <Wrench   className="w-4 h-4 shrink-0"/> } }
  ];

  const handleCompleteStep = (stepObj: any) => {
    if (completedSteps.includes(stepObj.id)) return;
    setCompletedSteps([...completedSteps, stepObj.id]);
    addXp(stepObj.xp);
    if (stepObj.badge) addBadge(stepObj.badge);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
      <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl border-t-4 border-purple-600">
        <p className="text-purple-800 dark:text-purple-200 font-bold mb-4 flex items-center gap-2">
          <Wrench  className="w-5 h-5 shrink-0"/> "مرحباً بك في الورشة الهندسية. فلنبدأ بناء الملقح العبقري."
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step, idx) => {
          const isCompleted = completedSteps.includes(step.id);
          const isLocked = idx > 0 && !completedSteps.includes(steps[idx - 1].id);
          return (
            <div key={step.id} className={`bg-white dark:bg-slate-900 rounded-2xl p-6 border-2 transition-all ${isCompleted ? 'border-purple-500 bg-purple-50/30' : isLocked ? 'border-slate-100 opacity-50' : 'border-purple-200 shadow-sm'}`}>
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-lg text-purple-900 dark:text-purple-300">{step.title}</h4>
                <div className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs font-bold">+{step.xp} XP</div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-4">{step.desc}</p>
              {!isCompleted && !isLocked && (
                <button onClick={() => handleCompleteStep(step)} className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-purple-700">
                  إتمام وتركيب النموذج
                </button>
              )}
            </div>
          );
        })}
      </div>

      {completedSteps.length === 4 && (
        <div className="bg-purple-600 text-white p-8 rounded-2xl text-center">
          <h3 className="text-2xl font-bold mb-4">النموذج يعمل بكفاءة!</h3>
          <p className="mb-6">انتقال برادة الحديد يثبت أن فكرة الملقّح قابلة للتطبيق.</p>
          <button onClick={() => { addXp(40); onComplete(); }} className="bg-white text-purple-700 px-8 py-3 rounded-xl font-bold text-lg hover:bg-purple-50">
            انتقل إلى تحدي الأفكار (+40 XP)
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
  const [c1, setC1] = useState('');
  const [c2, setC2] = useState('');
  const [done1, setDone1] = useState(false);
  const [done2, setDone2] = useState(false);
  const [attempts, setAttempts] = useState<{id:number, success:boolean}[]>([]);

  const handleSaveIdea = (setter: any, isDone: boolean) => {
    if (isDone) return;
    setter(true);
    addXp(15);
  };

  const handleExperiment = (success: boolean) => {
    if (attempts.length >= 10) return;
    setAttempts([...attempts, { id: attempts.length + 1, success }]);
    if (attempts.length === 9) addXp(15);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border-t-4 border-yellow-500">
        <p className="text-yellow-800 font-bold">"تفوق المهندس الحقيقي يظهر عندما يطرح أسئلة صعبة. ماذا لو واجهنا عقبات؟"</p>
      </div>

      <div className="space-y-6">
        <div className={`bg-white rounded-2xl p-6 border-2 ${done1 ? 'border-green-500' : 'border-yellow-300'}`}>
          <h3 className="text-lg font-bold mb-4">ماذا لو كان المغناطيس قويا جداً وتسبب في إتلاف الزهرة الرقيقة؟</h3>
          <textarea value={c1} onChange={e => setC1(e.target.value)} disabled={done1} placeholder="اقترح حلاً هنا..." className="w-full border rounded-xl p-3 mb-4" rows={2} />
          {!done1 && <button onClick={() => { if(c1.trim()) handleSaveIdea(setDone1, done1); else playSound('error')}} className="bg-yellow-500 text-yellow-950 font-bold px-6 py-2 rounded-lg hover:bg-yellow-400">اعتماد الحل (+15 XP)</button>}
        </div>

        <div className={`bg-white rounded-2xl p-6 border-2 ${done2 ? 'border-green-500' : 'border-yellow-300'}`}>
          <h3 className="text-lg font-bold mb-4">ماذا لو أردنا الاستغناء عن العصا وجعل النموذج يطير وحده؟</h3>
          <textarea value={c2} onChange={e => setC2(e.target.value)} disabled={done2} placeholder="هندسة طيران صغيرة..." className="w-full border rounded-xl p-3 mb-4" rows={2} />
          {!done2 && <button onClick={() => { if(c2.trim()) handleSaveIdea(setDone2, done2); else playSound('error')}} className="bg-yellow-500 text-yellow-950 font-bold px-6 py-2 rounded-lg hover:bg-yellow-400">اعتماد الحل (+15 XP)</button>}
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-yellow-300">
          <h3 className="text-lg font-bold mb-4 block w-full">متتبع محاولات التلقيح (10 محاولات كحد أقصى)</h3>
          <p className="text-sm mb-4">قم بتسجيل نتائج الورشة: هل نجح الجذب المغناطيسي ونقل الطلع أم فشل وتساقط؟</p>
          <div className="flex gap-4 mb-6">
             <button disabled={attempts.length >= 10} onClick={() => handleExperiment(true)} className="bg-green-100 text-green-800 font-bold px-6 py-2 rounded-lg disabled:opacity-50">نجاح ✅</button>
             <button disabled={attempts.length >= 10} onClick={() => handleExperiment(false)} className="bg-red-100 text-red-800 font-bold px-6 py-2 rounded-lg disabled:opacity-50">فشل ❌</button>
          </div>
          <div className="flex gap-1">
             {attempts.map(a => (
               <div key={a.id} className={`h-8 flex-1 rounded ${a.success ? 'bg-green-500' : 'bg-red-500'}`}></div>
             ))}
             {Array.from({length: 10 - attempts.length}).map((_, i) => (
               <div key={i} className="h-8 flex-1 rounded bg-slate-100"></div>
             ))}
          </div>
        </div>
      </div>

      {(done1 && done2 && attempts.length === 10) && (
        <button onClick={() => { addXp(35); onComplete(); }} className="w-full bg-yellow-500 text-yellow-950 font-bold py-4 rounded-xl text-lg">
          إتمام التحديات وإصدار البراءة (+35 XP)
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
  const [image, setImage] = useState<string|null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

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
      pdf.save(`براءة_${projectName}.pdf`);
      addXp(25);
      addBadge({ id: 'mag_patent', name: 'براءة الملقح', icon: <Award   className="w-4 h-4 shrink-0"/> });
    } catch (err) {
      console.error(err);
    }
    setIsGenerating(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
      <div className="bg-blue-50 p-6 rounded-xl border-t-4 border-blue-600 flex gap-4 text-blue-900">
        <p className="font-bold">
          "ختام المهمة العظيمة! وثق ابتكارك لاستخراج البراءة الرسمية لمنقذ الطبيعة."
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <label className="block mb-2 font-bold">صورة النموذج (اختياري)</label>
        <div className="border-2 border-dashed rounded-xl p-8 text-center bg-slate-50 mb-6 relative">
           {image ? (
             <Image  src={image} className="max-h-48 mx-auto" alt="Preview"width={500} height={500} />
           ) : (
             <>
               <Upload className="w-5 h-5 shrink-0 mx-auto text-slate-400 mb-2" />
               <p className="text-sm">ارفع صورة نموذجك المغناطيسي</p>
             </>
           )}
           <input type="file" onChange={handleImageUpload} accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        </div>

        <label className="block mb-2 font-bold">شرح عمل الملقح</label>
        <textarea rows={3} placeholder="الملقح يعتمد على المغناطيسية لـ..." className="w-full border rounded-xl p-3 mb-4"></textarea>
      </div>

      {/* Certificate Preview */}
      <div className="overflow-x-auto pb-4 hide-scrollbar">
        <div ref={certificateRef} className="min-w-[800px] w-full aspect-[1.414] bg-white relative overflow-hidden border-[12px] border-double border-blue-900 p-12 flex flex-col items-center justify-center text-center">
          <Award  className="w-6 h-6 shrink-0 text-amber-500 mb-4" />
          <h1 className="text-4xl font-black text-blue-900 mb-2 font-cairo">براءة اختراع التلقيح المغناطيسي</h1>
          <h2 className="text-xl font-bold text-slate-600 mb-10">شهادة تقدير وإثبات ابتكار</h2>
          <p className="text-xl text-slate-700 mb-2">تُمنح للمهندس الاستثنائي:</p>
          <p className="text-4xl font-bold text-red-600 mb-8 px-12 border-b-2 inline-block pb-2">{engineerName}</p>
          <p className="text-xl text-slate-700 mb-2">عن مشروعه البيئي المبتكر:</p>
          <p className="text-3xl font-bold text-green-700 mb-8">"{projectName}"</p>
          
          <div className="w-full flex justify-between mt-auto px-10 items-end">
            <div className="text-right">
               <p className="font-bold text-slate-500 text-sm">رمز الابتكار</p>
               <p className="font-mono text-lg text-slate-800">MAG-PLN-{Math.floor(Math.random()*10000)}</p>
            </div>
            <div className="text-center">
               <p className="text-4xl font-black text-amber-500 mb-1">XP {xp}</p>
               <p className="text-sm font-bold text-slate-500">{badgesCount} أوسمة مكتسبة</p>
            </div>
            <div className="text-left">
               <p className="font-bold text-slate-500 text-sm">توقيع الوكالة</p>
               <p className="text-2xl font-black text-blue-900" style={{fontFamily: 'cursive'}}>المهندسة ديا</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button onClick={handleDownload} disabled={isGenerating} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-xl text-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50">
          {isGenerating ? 'جاري الاستخراج...' : 'اختم ابتكاري (+25 XP)'}
        </button>
      </div>
    </motion.div>
  );
}
