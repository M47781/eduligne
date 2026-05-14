"use client";

import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Award, CheckCircle2, 
  Search, Lightbulb, Upload, 
  Play, Globe, Beaker, Wrench,
  Zap, Brain, Microscope, Bug, Target, BarChart, ChevronRight, Key
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

export default function BioFilterMission() {
  const [xp, setXp] = useState(0);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [activeStage, setActiveStage] = useState<Stage>('why');
  const [completedStages, setCompletedStages] = useState<Stage[]>([]);
  const [engineerName, setEngineerName] = useState('الوكيل المبتدئ');
  const [projectName, setProjectName] = useState('المشروع السري');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('bioFilterState');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setXp(parsed.xp || 0);
        setCompletedStages(parsed.completedStages || []);
        setEngineerName(parsed.engineerName || 'الوكيل المبتدئ');
        setProjectName(parsed.projectName || 'المشروع السري');
        setIsDarkMode(parsed.isDarkMode || false);
      } catch (e) {
        console.error('Error loading state', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bioFilterState', JSON.stringify({
      xp, completedStages, engineerName, projectName, isDarkMode
    }));
  }, [xp, completedStages, engineerName, projectName, isDarkMode]);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const addXp = (amount: number) => {
    setXp(prev => Math.min(prev + amount, 300));
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
        <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center font-bold text-xl border-2 border-sky-300 text-sky-950">
          {engineerName.charAt(0)}
        </div>
        <div>
          <div className="text-xs text-slate-400">الوكيل</div>
          <div className="font-bold">{engineerName}</div>
        </div>
      </div>
      <div className="flex-1 min-w-[200px] max-w-md">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-400">النقاط (XP)</span>
          <span className="font-bold text-sky-400">{xp} / 300</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-sky-500 to-cyan-300" initial={{ width: 0 }} animate={{ width: `${Math.min(100, (xp / 300) * 100)}%` }} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="text-xs text-slate-400">العملية</div>
          <div className="font-bold text-sky-300 text-sm">{projectName}</div>
        </div>
        <div className="h-8 w-px bg-slate-700 mx-2"></div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2 rtl:space-x-reverse">
            {badges.slice(0, 3).map((badge, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-sky-400" title={badge.name}>{badge.icon || <Award   className="w-4 h-4 shrink-0"/>}</div>
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
            <div className="h-full bg-sky-500 transition-all duration-500" style={{ width: `${(completedStages.length / 5) * 100}%` }}></div>
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
          {activeStage === 'why' && <StageWhy key="why" addXp={addXp} addBadge={addBadge} onComplete={() => { completeStage('why'); setActiveStage('what'); }} setProjectName={setProjectName} setEngineerName={setEngineerName} projectName={projectName} engineerName={engineerName} />}
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
function StageWhy({ addXp, addBadge, onComplete, setProjectName, setEngineerName, projectName, engineerName }: any) {
  const [step, setStep] = useState(0);
  const [code, setCode] = useState('');
  
  // Matching Game
  const [matches, setMatches] = useState<{item: string, func: string}[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const items = ['الدم الفاسد', 'العرق', 'الهواء الفاسد'];
  const funcs = ['الكلى', 'الجلد', 'الرئتين'];
  const correctMatches: Record<string, string> = {
    'الدم الفاسد': 'الكلى',
    'العرق': 'الجلد',
    'الهواء الفاسد': 'الرئتين'
  };

  const handleMatch = (func: string) => {
    if (!selectedItem) return;
    if (correctMatches[selectedItem] === func) {
      const newMatches = [...matches, { item: selectedItem, func }];
      setMatches(newMatches);
      setSelectedItem(null);
      if (newMatches.length === 3) addXp(15);
    } else {
      playSound('error');
      setSelectedItem(null);
    }
  };

  const handleIdentitySubmit = () => {
    if (engineerName.trim() === '' || projectName.trim() === '') {
        playSound('error');
        return;
    }
    addXp(50);
    addBadge({ id: 'certified_agent', name: 'وكيل معتمد', icon: <Shield   className="w-4 h-4 shrink-0"/> });
    onComplete();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
      {/* Intro & Dialogue */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border-t-4 border-red-600 dark:border-slate-800">
        <div className="aspect-video bg-slate-800 rounded-xl mb-6 relative overflow-hidden flex items-center justify-center">
          <Play  className="w-6 h-6 shrink-0 text-white/50" />
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">video_intel_001.mp4</div>
        </div>
        
        <div className="flex gap-4 items-start bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border border-red-100 dark:border-red-800">
          <Image  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Spy&style=circle" alt="Secret Agent" className="w-16 h-16 bg-slate-100 rounded-full border-2 border-red-200" width={500} height={500} />
          <div>
            <h3 className="font-bold text-red-900 dark:text-red-300 mb-2">العميلة السرية</h3>
            <p className="text-red-800 dark:text-red-200 leading-relaxed font-medium">
              "الوكيل! لقد اخترقت السموم جسد هدفنا. إذا لم نتدخل فوراً لتنظيم عمليات التصفية، فستتوقف الأعضاء الحيوية عن العمل. يجب أن تبني لنا أداة التصفية (المصفي الحيوي الذكي)."
            </p>
            {step === 0 && (
              <button onClick={() => setStep(1)} className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700">
                قراءة المهمة المشفرة
              </button>
            )}
          </div>
        </div>
      </div>

      {step >= 1 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-xl font-bold text-red-600 mb-4">التحدي 1: فك الشيفرة</h3>
          <p className="mb-4">رسالة مشفرة من المركز القيادي. (أ=1, ب=2 ... ك=22, ل=23, ي=28). الرسالة: "22-23-28"</p>
          <div className="flex gap-4">
             <input type="text" value={code} onChange={e => setCode(e.target.value)} placeholder="الكلمة السريّة..." className="flex-1 border rounded-xl p-3 bg-slate-50 dark:bg-slate-800" />
             <button onClick={() => {
                 if (code.trim().includes('كلي')) {
                     addXp(15);
                     addBadge({ id: 'codebreaker', name: 'فك الشيفرة', icon: <Key   className="w-4 h-4 shrink-0"/> });
                     setStep(2);
                 } else playSound('error');
             }} className="bg-red-600 text-white font-bold px-6 py-2 rounded-xl">فك الشيفرة</button>
          </div>
        </div>
      )}

      {step >= 2 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-xl font-bold text-red-600 mb-4">التحدي 2: مطابقة الأعضاء</h3>
          <p className="mb-4">طابق المواد المراد تصفيتها مع الأعضاء المسؤولة لحماية المركز.</p>
          <div className="flex flex-col md:flex-row gap-8 mb-6">
            <div className="flex-1 space-y-3">
              <h4 className="font-bold text-center">المواد السامة</h4>
              {items.map(t => (
                <button key={t} onClick={() => setSelectedItem(t)} disabled={matches.some(m => m.item === t)} className={`w-full p-3 rounded-lg border-2 text-center transition-all ${matches.some(m => m.item === t) ? 'bg-green-100 border-green-300 opacity-50' : selectedItem === t ? 'border-red-500 bg-red-50' : 'hover:border-red-300 border-slate-200'}`}>
                  {t}
                </button>
              ))}
            </div>
            <div className="flex-1 space-y-3">
              <h4 className="font-bold text-center">أعضاء التصفية</h4>
              {funcs.map(f => (
                <button key={f} onClick={() => handleMatch(f)} disabled={matches.some(m => m.func === f)} className={`w-full p-3 rounded-lg border-2 text-center transition-all ${matches.some(m => m.func === f) ? 'bg-green-100 border-green-300 opacity-50' : 'hover:border-red-300 border-slate-200'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          {matches.length === 3 && (
              <div className="text-center mt-4">
                  <button onClick={() => { addBadge({ id: 'expert_filter', name: 'خبير الإطراح', icon: <Target   className="w-4 h-4 shrink-0"/> }); setStep(3); }} className="bg-red-600 text-white font-bold px-6 py-2 rounded-xl">متابعة</button>
              </div>
          )}
        </div>
      )}

      {step >= 3 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-xl font-bold text-red-600 mb-4">التحدي 3: تمرير الضوء</h3>
          <p className="mb-4">نحتاج أن ننظر للداخل دون كشفنا! ما هو الوسط الذي يسمح بمرور جزء من الضوء دون رؤية الجسم بوضوح تام؟</p>
          <div className="flex justify-center gap-4">
              <button onClick={() => playSound('error')} className="border rounded-xl px-6 py-2">شفاف</button>
              <button onClick={() => { addXp(15); addBadge({ id: 'light_expert', name: 'خبير الضوء', icon: <Lightbulb   className="w-4 h-4 shrink-0"/> }); setStep(4); }} className="border rounded-xl px-6 py-2">شافٍ</button>
              <button onClick={() => playSound('error')} className="border rounded-xl px-6 py-2">عتم</button>
          </div>
        </div>
      )}

      {step >= 4 && (
        <div className="bg-gradient-to-br from-red-600 to-amber-600 rounded-2xl p-8 text-white shadow-lg">
          <h3 className="text-2xl font-bold mb-4">تفعيل الهوية السرية</h3>
          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-bold mb-2">اسم الوكيل</label>
              <input type="text" value={engineerName} onChange={e => setEngineerName(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">اسم المشروع التمويهي</label>
              <input type="text" value={projectName} onChange={e => setProjectName(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white focus:outline-none" />
            </div>
          </div>
          <button onClick={handleIdentitySubmit} className="w-full bg-white text-red-700 font-bold py-4 rounded-xl text-lg">
            تأكيد وابدأ المهمة (+50 XP)
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

  const handleSolve = (id: string) => {
    if (solved[id]) return;
    setSolved({ ...solved, [id]: true });
    addXp(8);
  };

  const isAllSolved = Object.keys(solved).length === 9; // 3 bio + 3 phy + 3 math

  const ChoiceBtn = ({ text, isCorrect, id }: any) => (
    <button 
      onClick={() => isCorrect ? handleSolve(id) : playSound('error')} 
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
        <Image  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Spy&style=circle" alt="Agent" className="w-16 h-16 bg-slate-100 rounded-full border-2 border-green-200" width={500} height={500} />
        <p className="text-green-800 dark:text-green-200 font-bold">
          "نحن نحتاج للمعلومات الدقيقة لبرمجة المصفي. أجب عن أسئلة البيولوجيا، الفيزياء والرياضيات!"
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Biology */}
        <QuestionCard title="البيولوجيا: وظيفة الكلى" id="q1">
          <ChoiceBtn text="ضخ الدم" isCorrect={false} id="q1" />
          <ChoiceBtn text="تنقية الدم وإنتاج البول" isCorrect={true} id="q1" />
          <ChoiceBtn text="هضم الطعام" isCorrect={false} id="q1" />
        </QuestionCard>

        <QuestionCard title="البيولوجيا: تركيب البول" id="q2">
          <p className="text-sm text-slate-600 mb-4">ما هو التركيب الأساسي للبول؟</p>
          <ChoiceBtn text="ماء وأملاح فائضة ويوريا" isCorrect={true} id="q2" />
          <ChoiceBtn text="سكر وكريات دم حمراء" isCorrect={false} id="q2" />
        </QuestionCard>

        <QuestionCard title="البيولوجيا: دور الجلد" id="q3">
          <ChoiceBtn text="إفراز العرق للتخلص من الأملاح" isCorrect={true} id="q3" />
          <ChoiceBtn text="تحليل الدهون" isCorrect={false} id="q3" />
        </QuestionCard>

        {/* Physics */}
        <QuestionCard title="الفيزياء: الضوء الشفاف" id="q4">
          <ChoiceBtn text="يسمح بمرور جزء من الضوء" isCorrect={false} id="q4" />
          <ChoiceBtn text="يسمح بمرور كل الضوء ونرى بوضوح" isCorrect={true} id="q4" />
        </QuestionCard>

        <QuestionCard title="الفيزياء: تكون الظل" id="q5">
          <ChoiceBtn text="بسبب انكسار الضوء" isCorrect={false} id="q5" />
          <ChoiceBtn text="عند اصطدام الضوء بجسم عاتم" isCorrect={true} id="q5" />
        </QuestionCard>

        <QuestionCard title="الفيزياء: تأثير المسافة" id="q6">
          <p className="text-sm text-slate-600 mb-4">عندما يقترب مصدر الضوء من الجسم، فإن الظل:</p>
          <ChoiceBtn text="يصغر" isCorrect={false} id="q6" />
          <ChoiceBtn text="ينعدم" isCorrect={false} id="q6" />
          <ChoiceBtn text="يكبر" isCorrect={true} id="q6" />
        </QuestionCard>

        {/* Math */}
        <QuestionCard title="الرياضيات: حساب الحجم" id="q7">
          <p className="text-sm text-slate-600 mb-4">مجسم أبعاده 8سم، 5سم، 10سم. حجمه هو:</p>
          <ChoiceBtn text="400 سم مكعب" isCorrect={true} id="q7" />
          <ChoiceBtn text="130 سم مكعب" isCorrect={false} id="q7" />
        </QuestionCard>

        <QuestionCard title="الرياضيات: تحويل الوحدات" id="q8">
          <p className="text-sm text-slate-600 mb-4">حجم 400 سم مكعب يساوى كم باللتر؟ (1 لتر = 1000 سم مكعب)</p>
          <ChoiceBtn text="4 لتر" isCorrect={false} id="q8" />
          <ChoiceBtn text="0.4 لتر" isCorrect={true} id="q8" />
        </QuestionCard>

        <QuestionCard title="الرياضيات: التناسب" id="q9">
          <p className="text-sm text-slate-600 mb-4">الجهاز يصفي 150 مل في 5 دقائق، كم يصفي في 20 دقيقة؟</p>
          <ChoiceBtn text="600 مل" isCorrect={true} id="q9" />
          <ChoiceBtn text="300 مل" isCorrect={false} id="q9" />
        </QuestionCard>
      </div>

      {isAllSolved && (
        <div className="bg-green-600 text-white p-8 rounded-2xl text-center mt-6">
          <h3 className="text-2xl font-bold mb-4">ممتاز! تم جمع البيانات.</h3>
          <button onClick={() => { addXp(50); onComplete(); }} className="bg-white text-green-700 px-8 py-3 rounded-xl font-bold text-lg hover:bg-green-50">
            اذهب إلى ورشة البناء (+50 XP)
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
    { id: 1, title: 'إعداد طبقات الترشيح', desc: "نجهز القارورة بوضع القطن، الشاش، الرمل، والحصى كطبقات تحاكي أنسجة الكلية.", xp: 10 },
    { id: 2, title: 'تصميم الكلية الخارجي', desc: "استخدم الصلصال لتشكيل هيكل كلية حول القارورة مع ترك نافذة زجاجية للمشاهدة.", xp: 10 },
    { id: 3, title: 'نظام الأنابيب', desc: "نوصل أنبوب علوي لإدخال السوائل، وأنبوب سفلي موصول بوعاء لجمع المخرجات.", xp: 10 },
    { id: 4, title: 'اختبار الترشيح (مياه ملوثة)', desc: "نسكب مياهاً مخلوطة بتراب أو ألوان، ونراقب كيف تخرج نقية من الجانب الآخر بفعل الترشيح.", xp: 10, badge: { id: 'filter_engineer', name: 'مهندس ترشيح', icon: <Wrench   className="w-4 h-4 shrink-0"/> } }
  ];

  const handleCompleteStep = (stepObj: any) => {
    if (completedSteps.includes(stepObj.id)) return;
    setCompletedSteps([...completedSteps, stepObj.id]);
    addXp(stepObj.xp);
    if (stepObj.badge) addBadge(stepObj.badge);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
      <div className="flex gap-4 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border-t-4 border-purple-600">
        <div className="flex-1">
            <p className="text-purple-800 dark:text-purple-200 font-bold mb-2">
            "المعمل السري جاهز. ابدأ في تنفيذ الخطوات بحذر، لا نريد أي تسريب."
            </p>
        </div>
        <div className="bg-white p-2 rounded-lg border flex gap-2">
            <span title="قطن وشاش">☁️</span>
            <span title="حصى">🪨</span>
            <span title="قارورة">🧪</span>
            <span title="صلصال">🎨</span>
        </div>
      </div>

      <div className="space-y-4">
        {steps.map((step, idx) => {
          const isCompleted = completedSteps.includes(step.id);
          const isLocked = idx > 0 && !completedSteps.includes(steps[idx - 1].id);
          return (
            <div key={step.id} className={`bg-white dark:bg-slate-900 rounded-2xl p-6 border-2 transition-all ${isCompleted ? 'border-purple-500 bg-purple-50/30' : isLocked ? 'border-slate-100 opacity-50' : 'border-purple-200 shadow-sm'}`}>
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-lg text-purple-900 dark:text-purple-300">{step.title}</h4>
                <div className="bg-sky-100 text-sky-700 px-2 py-1 rounded text-xs font-bold">+{step.xp} XP</div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-4">{step.desc}</p>
              {!isCompleted && !isLocked && (
                <button onClick={() => handleCompleteStep(step)} className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-purple-700">
                  تنفيذ
                </button>
              )}
            </div>
          );
        })}
      </div>

      {completedSteps.length === 4 && (
        <div className="bg-purple-600 text-white p-8 rounded-2xl text-center mt-6">
          <h3 className="text-2xl font-bold mb-4">تم تشغيل المصفي الحيوي!</h3>
          <button onClick={() => { addXp(40); onComplete(); }} className="bg-white text-purple-700 px-8 py-3 rounded-xl font-bold text-lg hover:bg-purple-50">
            الانتقال للمرحلة المتقدمة (+40 XP)
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
  const [ideas, setIdeas] = useState<Record<number, string>>({});
  const [savedIdeas, setSavedIdeas] = useState<number[]>([]);

  const challenges = [
    { id: 1, title: 'الأثر الواقعي', desc: 'ماذا لو تم استخدام مبدأ هذا المصفي في تنقية مياه الصرف في المدارس؟' },
    { id: 2, title: 'تحسين النموذج', desc: 'ماذا لو أردنا إضافة طبقة خامسة للمصفي، ماذا تقترح ولماذا؟' },
    { id: 3, title: 'معالجة الفشل', desc: 'ماذا لو انسد الأنبوب المخرج؟ كيف نصمم نظام التنبيه؟' },
    { id: 4, title: 'ملصق توعوي', desc: 'اكتب عبارة قوية لملصق توعوي لحماية الكلى في الحياة اليومية.' }
  ];

  const handleSaveIdea = (id: number) => {
    if (savedIdeas.includes(id)) return;
    setSavedIdeas([...savedIdeas, id]);
    addXp(25);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border-t-4 border-yellow-500">
        <p className="text-yellow-800 font-bold">"الجهاز يعمل، لكن الابتكار الحقيقي لا يتوقف. تخيل السيناريوهات التالية واقترح الحلول كوكيل خبير."</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {challenges.map((card) => {
            const isDone = savedIdeas.includes(card.id);
            return (
                <div key={card.id} className={`bg-white rounded-2xl p-6 border-2 ${isDone ? 'border-green-500' : 'border-yellow-300'}`}>
                    <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                    <p className="text-sm mb-4 text-slate-600">{card.desc}</p>
                    <textarea 
                        value={ideas[card.id] || ''} 
                        onChange={e => setIdeas({...ideas, [card.id]: e.target.value})} 
                        disabled={isDone} 
                        className="w-full border rounded-xl p-3 mb-4" rows={3}>
                    </textarea>
                    {!isDone && <button onClick={() => { if((ideas[card.id]||'').length > 5) handleSaveIdea(card.id); else playSound('error')}} className="bg-yellow-500 text-yellow-950 font-bold px-6 py-2 rounded-lg hover:bg-yellow-400">حفظ الفكرة (+25 XP)</button>}
                </div>
            )
        })}
      </div>

      {(savedIdeas.length === 4) && (
        <button onClick={() => { addXp(35); onComplete(); }} className="w-full bg-yellow-500 text-yellow-950 font-bold py-4 rounded-xl text-lg mt-6">
          استخراج براءة الاختراع (+35 XP)
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
      addBadge({ id: 'bio_patent', name: 'براءة المصفي', icon: <Award   className="w-4 h-4 shrink-0"/> });
    } catch (err) {
      console.error(err);
    }
    setIsGenerating(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
      <div className="bg-blue-50 p-6 rounded-xl border-t-4 border-blue-600 text-blue-900">
        <p className="font-bold mb-2 text-xl">"تهانينا أيها الوكيل الاستثنائي!"</p>
        <p className="text-sm">لقد أنقذت الموقف وأثبتّ كفاءتك في مجال التصفية الحيوية. قم بختم ابتكارك بصورة وتوصيف.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <label className="block mb-2 font-bold">صورة النموذج النهائي (اختياري)</label>
        <div className="border-2 border-dashed rounded-xl p-8 text-center bg-slate-50 mb-6 relative">
           {image ? (
             <Image  src={image} className="max-h-48 mx-auto" alt="Preview"width={500} height={500} />
           ) : (
             <>
               <Upload className="w-5 h-5 shrink-0 mx-auto text-slate-400 mb-2" />
               <p className="text-sm">ارفع صورة نموذج المصفي الحيوي الذكي الخاص بك</p>
             </>
           )}
           <input type="file" onChange={handleImageUpload} accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        </div>

        <label className="block mb-2 font-bold">التفسير العلمي للنموذج</label>
        <textarea rows={2} placeholder="يشبه النموذج عمل الكلى لأنه..." className="w-full border rounded-xl p-3 mb-4"></textarea>
        
        <label className="block mb-2 font-bold">الفكرة المبتكرة الإضافية</label>
        <textarea rows={2} placeholder="استخدمنا الرمل لأنه يحاكي..." className="w-full border rounded-xl p-3 mb-4"></textarea>
      </div>

      {/* Certificate Preview */}
      <div className="overflow-x-auto pb-4 hide-scrollbar">
        <div ref={certificateRef} className="min-w-[800px] w-full aspect-[1.414] bg-white relative overflow-hidden border-[12px] border-double border-blue-900 p-12 flex flex-col items-center justify-center text-center">
          <Shield  className="w-6 h-6 shrink-0 text-sky-500 mb-4" />
          <h1 className="text-4xl font-black text-blue-900 mb-2 font-cairo">براءة اختراع المصفي الحيوي السري</h1>
          <h2 className="text-xl font-bold text-slate-600 mb-10">شهادة خبرة واعتماد</h2>
          <p className="text-xl text-slate-700 mb-2">تُمنح للوكيل الخبير:</p>
          <p className="text-4xl font-bold text-red-600 mb-8 px-12 border-b-2 inline-block pb-2">{engineerName}</p>
          <p className="text-xl text-slate-700 mb-2">بنجاح عملية:</p>
          <p className="text-3xl font-bold text-green-700 mb-8">"{projectName}"</p>
          
          <div className="w-full flex justify-between mt-auto px-10 items-end">
            <div className="text-right">
               <p className="font-bold text-slate-500 text-sm">رمز الاعتماد</p>
               <p className="font-mono text-lg text-slate-800">BIO-FLT-{Math.floor(Math.random()*10000)}</p>
            </div>
            <div className="text-center">
               <p className="text-4xl font-black text-sky-500 mb-1">XP {xp}</p>
               <p className="text-sm font-bold text-slate-500">{badgesCount} أوسمة مكتسبة</p>
            </div>
            <div className="text-left">
               <p className="font-bold text-slate-500 text-sm">توقيع العميلة السرية</p>
               <p className="text-2xl font-black text-blue-900" style={{fontFamily: 'cursive'}}>العميلة "ع"</p>
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
