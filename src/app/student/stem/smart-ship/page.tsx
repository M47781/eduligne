"use client";

import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Award, CheckCircle2, 
  Search, Wind, Lightbulb, Upload, 
  Play, Globe, Beaker, Wrench,
  BarChart, Anchor, Compass, Ship, Navigation, Zap, Download
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
    colors: ['#e67e22', '#2ecc71', '#3498db', '#f1c40f', '#9b59b6']
  });
};

export default function SmartShipMission() {
  const [xp, setXp] = useState(0);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [activeStage, setActiveStage] = useState<Stage>('why');
  const [completedStages, setCompletedStages] = useState<Stage[]>([]);
  const [engineerName, setEngineerName] = useState('مهندس أسطول');
  const [projectName, setProjectName] = useState('المشروع قيد التفعيل');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('smartShipState');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setXp(parsed.xp || 0);
        setCompletedStages(parsed.completedStages || []);
        setEngineerName(parsed.engineerName || 'مهندس أسطول');
        setProjectName(parsed.projectName || 'المشروع قيد التفعيل');
        setIsDarkMode(parsed.isDarkMode || false);
      } catch (e) {
        console.error('Error loading state', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('smartShipState', JSON.stringify({
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
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center font-bold text-xl border-2 border-blue-300">
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
          <div className="font-bold text-blue-300 text-sm">{projectName}</div>
        </div>
        <div className="h-8 w-px bg-slate-700 mx-2"></div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2 rtl:space-x-reverse">
            {badges.slice(0, 3).map((badge, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-yellow-400" title={badge.name}>{badge.icon}</div>
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
      { id: 'why', label: 'لماذا؟', icon: <Search   className="w-4 h-4 shrink-0"/>, color: 'bg-orange-500' },
      { id: 'what', label: 'ماذا؟', icon: <Beaker   className="w-4 h-4 shrink-0"/>, color: 'bg-green-500' },
      { id: 'how', label: 'كيف؟', icon: <Wrench   className="w-4 h-4 shrink-0"/>, color: 'bg-blue-500' },
      { id: 'whatif', label: 'ماذا لو؟', icon: <Lightbulb   className="w-4 h-4 shrink-0"/>, color: 'bg-yellow-500' },
      { id: 'protect', label: 'براءة', icon: <Shield   className="w-4 h-4 shrink-0"/>, color: 'bg-purple-500' },
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
            <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${(completedStages.length / 5) * 100}%` }}></div>
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
  
  // Power Slider
  const [powerSlider, setPowerSlider] = useState(1);

  // Matching Game
  const [matches, setMatches] = useState<{type: string, func: string}[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const types = ['سفينة شراعية', 'غواصة', 'كاسحة جليد'];
  const funcs = ['تعمل بقوة الرياح', 'الإبحار تحت الماء', 'تحطيم المسارات المتجمدة'];
  const correctMatches: Record<string, string> = {
    'سفينة شراعية': 'تعمل بقوة الرياح',
    'غواصة': 'الإبحار تحت الماء',
    'كاسحة جليد': 'تحطيم المسارات المتجمدة'
  };

  const handleMatch = (func: string) => {
    if (!selectedType) return;
    if (correctMatches[selectedType] === func) {
      const newMatches = [...matches, { type: selectedType, func }];
      setMatches(newMatches);
      setSelectedType(null);
      if (newMatches.length === 3) addXp(15);
    } else {
      playSound('error');
      setSelectedType(null);
    }
  };

  const handleIdentitySubmit = () => {
    if (engineerName.trim() === '' || projectName.trim() === '') {
        playSound('error');
        return;
    }
    addXp(50);
    addBadge({ id: 'fleet_commander', name: 'قائد الأسطول', icon: <Anchor   className="w-4 h-4 shrink-0"/> });
    onComplete();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
      {/* Intro & Dialogue */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border-t-4 border-orange-500 dark:border-slate-800">
        <div className="aspect-video bg-slate-800 rounded-xl mb-6 relative overflow-hidden flex items-center justify-center">
          <Play  className="w-6 h-6 shrink-0 text-white/50" />
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">video_rais_001.mp4</div>
        </div>
        
        <div className="flex gap-4 items-start bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl border border-orange-100 dark:border-orange-800">
          <Image  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rais&style=circle" alt="Rais Hamidou" className="w-16 h-16 bg-slate-100 rounded-full border-2 border-orange-200" width={500} height={500} />
          <div>
            <h3 className="font-bold text-orange-900 dark:text-orange-300 mb-2">الرايس حميدو</h3>
            <p className="text-orange-800 dark:text-orange-200 leading-relaxed font-medium">
              "يا بني، البحر لا يرحم الضعفاء. لكي نقود الأسطول بنجاح، يجب أن نصمم 'السفينة الذكية'. سفينة تستفيد من قوة الرياح وتُبنى على أسس علمية متينة. هل أنت مستعد للتحدي؟"
            </p>
            {step === 0 && (
              <button onClick={() => setStep(1)} className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-600">
                أنا مستعد أيها القائد
              </button>
            )}
          </div>
        </div>
      </div>

      {step >= 1 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-xl font-bold text-orange-600 mb-4">التحدي 1: تصميم الهيكل</h3>
          <p className="mb-4">لتقليل مقاومة الماء وزيادة السرعة، أي تصميم تختار لهيكل السفينة؟</p>
          <div className="flex gap-4">
             <button onClick={() => playSound('error')} className="flex-1 border rounded-xl p-4 text-center hover:bg-slate-50 dark:hover:bg-slate-800">
               <div className="w-20 h-12 bg-slate-300 mx-auto rounded-sm mb-2"></div>
               <span className="font-bold">شكل مسطح (مربع)</span>
             </button>
             <button onClick={() => {
                 addXp(15);
                 addBadge({ id: 'streamlined_design', name: 'تصميم انسيابي', icon: <Ship   className="w-4 h-4 shrink-0"/> });
                 setStep(2);
             }} className="flex-1 border rounded-xl p-4 text-center hover:bg-orange-50 dark:hover:bg-orange-900/20 border-orange-200">
               <div className="w-24 h-12 bg-orange-300 mx-auto rounded-b-full rounded-t-sm mb-2" style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)' }}></div>
               <span className="font-bold">شكل انسيابي</span>
            </button>
          </div>
        </div>
      )}

      {step >= 2 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-xl font-bold text-orange-600 mb-4">التحدي 2: أنواع السفن</h3>
          <p className="mb-4">طابق كل نوع سفينة مع وظيفتها الأساسية:</p>
          <div className="flex flex-col md:flex-row gap-8 mb-6">
            <div className="flex-1 space-y-3">
              <h4 className="font-bold text-center">نوع السفينة</h4>
              {types.map(t => (
                <button key={t} onClick={() => setSelectedType(t)} disabled={matches.some(m => m.type === t)} className={`w-full p-3 rounded-lg border-2 text-center transition-all ${matches.some(m => m.type === t) ? 'bg-green-100 border-green-300 opacity-50' : selectedType === t ? 'border-orange-500 bg-orange-50' : 'hover:border-orange-300 border-slate-200'}`}>
                  {t}
                </button>
              ))}
            </div>
            <div className="flex-1 space-y-3">
              <h4 className="font-bold text-center">الوظيفة</h4>
              {funcs.map(f => (
                <button key={f} onClick={() => handleMatch(f)} disabled={matches.some(m => m.func === f)} className={`w-full p-3 rounded-lg border-2 text-center transition-all ${matches.some(m => m.func === f) ? 'bg-green-100 border-green-300 opacity-50' : 'hover:border-orange-300 border-slate-200'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          
          {matches.length === 3 && (
            <div className="mt-6 border-t pt-4">
              <h3 className="font-bold mb-4">سؤال إضافي: ما فائدة الأشرعة المثلثة؟</h3>
              <div className="flex flex-col gap-2">
                <button onClick={() => playSound('error')} className="border rounded-lg p-3 text-right">لإعطاء شكل جمالي فقط</button>
                <button onClick={() => { addXp(15); setStep(3); }} className="border rounded-lg p-3 text-right">القدرة على الإبحار عكس اتجاه الرياح</button>
                <button onClick={() => playSound('error')} className="border rounded-lg p-3 text-right">لتجميع مياه الأمطار</button>
              </div>
            </div>
          )}
        </div>
      )}

      {step >= 3 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-xl font-bold text-orange-600 mb-4">التحدي 3: محاكاة قوة الرياح</h3>
          <p className="mb-4">حرك المؤشر لزيادة سرعة الرياح، ولاحظ تأثيرها على السفينة.</p>
          
          <div className="py-8 px-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl relative overflow-hidden mb-6">
            <div className={`absolute bottom-4 text-4xl transition-all duration-300`} style={{ right: `${powerSlider * 10}%` }}>⛵</div>
            <div className="absolute top-4 right-4 text-slate-400 flex items-center gap-1">
              <Wind className={`w-5 h-5 shrink-0 ${powerSlider > 5 ? 'animate-pulse text-blue-500' : ''}`} /> 
              {powerSlider * 10} كم/س
            </div>
          </div>

          <input type="range" min="1" max="8" value={powerSlider} onChange={e => setPowerSlider(parseInt(e.target.value))} className="w-full mb-6" />

          {powerSlider >= 7 && (
            <div className="mt-6 border-t pt-4 animate-fade-in">
              <h3 className="font-bold mb-4">لدينا رياح قوية! كيف نحسب سرعة السفينة؟</h3>
              <div className="flex flex-col gap-2">
                <button onClick={() => playSound('error')} className="border rounded-lg p-3 flex justify-between"><span>السرعة = المسافة × الزمن</span> <span>v = d × t</span></button>
                <button onClick={() => { addXp(20); setStep(4); }} className="border rounded-lg p-3 flex justify-between bg-orange-50 border-orange-200"><span>السرعة = المسافة ÷ الزمن</span> <span dir="ltr">v = d / t</span></button>
                <button onClick={() => playSound('error')} className="border rounded-lg p-3 flex justify-between"><span>السرعة = الزمن ÷ المسافة</span> <span dir="ltr">v = t / d</span></button>
              </div>
            </div>
          )}
        </div>
      )}

      {step >= 4 && (
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-8 text-white shadow-lg">
          <h3 className="text-2xl font-bold mb-4">تسجيل المشروع</h3>
          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-bold mb-2">اسم المهندس (أو القبطان)</label>
              <input type="text" value={engineerName} onChange={e => setEngineerName(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">اسم السفينة / المشروع</label>
              <input type="text" value={projectName} onChange={e => setProjectName(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white focus:outline-none" />
            </div>
          </div>
          <button onClick={handleIdentitySubmit} className="w-full bg-white text-orange-700 font-bold py-4 rounded-xl text-lg hover:bg-orange-50 transition-colors">
            تأكيد إطلاق المشروع (+50 XP)
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

  const handleSolve = (id: string, xpReward: number = 10) => {
    if (solved[id]) return;
    setSolved({ ...solved, [id]: true });
    addXp(xpReward);
  };

  const isAllSolved = Object.keys(solved).length === 6;

  const ChoiceBtn = ({ text, isCorrect, id, dir = "rtl" }: any) => (
    <button 
      onClick={() => isCorrect ? handleSolve(id) : playSound('error')} 
      className="w-full text-right p-3 rounded-lg border border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 mb-2 transition-colors font-medium"
      dir={dir}
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
        <Image  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rais&style=circle" alt="Rais Hamidou" className="w-16 h-16 bg-slate-100 rounded-full border-2 border-green-200" width={500} height={500} />
        <p className="text-green-800 dark:text-green-200 font-bold">
          "بناء سفينة يتطلب إلماماً بالفيزياء، الهندسة، والرياضيات. لا تدع الأمواج تغرقك بالأسئلة، أجب بدقة!"
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Physics */}
        <QuestionCard title="الفيزياء: اتجاه الضوء" id="q1">
          <p className="text-sm text-slate-600 mb-4">للإضاءة في السفينة ليلاً باستخدام مصابيح، كيف ينتشر الضوء؟</p>
          <ChoiceBtn text="في خطوط منحنية" isCorrect={false} id="q1" />
          <ChoiceBtn text="في خطوط مستقيمة" isCorrect={true} id="q1" />
          <ChoiceBtn text="بشكل متعرج حسب الرياح" isCorrect={false} id="q1" />
        </QuestionCard>

        <QuestionCard title="الفيزياء: الدارة الكهربائية" id="q2">
          <p className="text-sm text-slate-600 mb-4">لتشغيل المصباح، يجب أن تكون الدارة الكهربائية:</p>
          <ChoiceBtn text="مفتوحة (قاطعة مفتوحة)" isCorrect={false} id="q2" />
          <ChoiceBtn text="مغلقة (قاطعة مغلقة)" isCorrect={true} id="q2" />
        </QuestionCard>

        <QuestionCard title="الفيزياء: السلسلة الطاقوية" id="q3">
          <p className="text-sm text-slate-600 mb-4">رتب السلسلة الطاقوية الصحيحة لحركة السفينة الشراعية:</p>
          <ChoiceBtn text="رياح ← تدفع ← شراع ← يسحب ← سفينة" isCorrect={true} id="q3" />
          <ChoiceBtn text="شراع ← يدفع ← رياح ← تدفع ← سفينة" isCorrect={false} id="q3" />
        </QuestionCard>

        {/* Math */}
        <QuestionCard title="الرياضيات: فيثاغورس" id="q4">
          <p className="text-sm text-slate-600 mb-4">في شراع مثلث قائم الزاوية، طول القاعدة 5م والارتفاع 12م. ما هو طول طول الوتر؟</p>
          <ChoiceBtn text="13 متر" isCorrect={true} id="q4" />
          <ChoiceBtn text="17 متر" isCorrect={false} id="q4" />
          <ChoiceBtn text="10 متر" isCorrect={false} id="q4" />
        </QuestionCard>

        <QuestionCard title="الرياضيات: حساب الزاوية (جيب التمام)" id="q5">
          <p className="text-sm mb-4" dir="ltr">cos(θ) = 0.5</p>
          <p className="text-sm text-slate-600 mb-4">ما هي قيمة الزاوية التي يجب توجيه الشراع بها؟</p>
          <ChoiceBtn text="30°" isCorrect={false} id="q5" dir="ltr" />
          <ChoiceBtn text="45°" isCorrect={false} id="q5" dir="ltr" />
          <ChoiceBtn text="60°" isCorrect={true} id="q5" dir="ltr" />
        </QuestionCard>

        <QuestionCard title="العلوم الهندسية: تآكل المواد" id="q6">
          <p className="text-sm text-slate-600 mb-4">كيف نحمي هيكل السفينة من التأثيرات الميكانيكية للماء المالح (التآكل)؟</p>
          <ChoiceBtn text="بطلائها بمواد عازلة ومضادة للتآكل" isCorrect={true} id="q6" />
          <ChoiceBtn text="بصنعها بالكامل من الخشب غير المعالج" isCorrect={false} id="q6" />
        </QuestionCard>
      </div>

      {isAllSolved && (
        <div className="bg-green-600 text-white p-8 rounded-2xl text-center mt-6">
          <h3 className="text-2xl font-bold mb-4">أحسنت! المعرفة النظرية مكتملة.</h3>
          <button onClick={() => { addXp(50); onComplete(); }} className="bg-white text-green-700 px-8 py-3 rounded-xl font-bold text-lg hover:bg-green-50 shadow-md">
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
    { id: 1, title: 'تركيب الهيكل الانسيابي', desc: "قمنا بقص القارورة لإنتاج شكل انسيابي لتقليل مقاومة الماء.", xp: 10 },
    { id: 2, title: 'نظام الأشرعة', desc: "تثبيت الصاري القوي وربط الشراع المثلث بقاعدة السفينة.", xp: 10 },
    { id: 3, title: 'الإنارة الآمنة', desc: "تركيب دارة كهربائية بسيطة مع LED مقاوم للماء داخل السفينة وتغطية الأسلاك.", xp: 10 },
    { id: 4, title: 'التجربة المائية', desc: "وضع السفينة في حوض وإطلاق تيار هوائي باستخدام مروحة لرؤية النتيجة.", xp: 10, badge: { id: 'marine_engineer', name: 'مهندس بحري', icon: <Wrench   className="w-4 h-4 shrink-0"/> } }
  ];

  const handleCompleteStep = (stepObj: any) => {
    if (completedSteps.includes(stepObj.id)) return;
    setCompletedSteps([...completedSteps, stepObj.id]);
    addXp(stepObj.xp);
    if (stepObj.badge) addBadge(stepObj.badge);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
      <div className="flex gap-4 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-t-4 border-blue-500">
        <div className="flex-1">
            <p className="text-blue-800 dark:text-blue-200 font-bold mb-2">
            "المواد جاهزة في الورشة: قوارير بلاستيكية، أعواد خشبية، أشرعة قماشية، وبطاريات للتوصيل. اتبع الخطوات بدقة لتركيب السفينة الذكية."
            </p>
        </div>
        <div className="bg-white p-2 rounded-lg border flex flex-wrap gap-2 max-w-[120px] justify-center text-xl">
            <span title="قارورة">🧴</span>
            <span title="عود خشب">🪵</span>
            <span title="شراع">⛵</span>
            <span title="LED">💡</span>
        </div>
      </div>

      <div className="space-y-4">
        {steps.map((step, idx) => {
          const isCompleted = completedSteps.includes(step.id);
          const isLocked = idx > 0 && !completedSteps.includes(steps[idx - 1].id);
          return (
            <div key={step.id} className={`bg-white dark:bg-slate-900 rounded-2xl p-6 border-2 transition-all ${isCompleted ? 'border-blue-500 bg-blue-50/30' : isLocked ? 'border-slate-100 opacity-50' : 'border-blue-200 shadow-sm'}`}>
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-lg text-blue-900 dark:text-blue-300">{step.title}</h4>
                <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">+{step.xp} XP</div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-4">{step.desc}</p>
              {!isCompleted && !isLocked && (
                <button onClick={() => handleCompleteStep(step)} className="bg-blue-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-600">
                  تنفيذ الخطوة
                </button>
              )}
            </div>
          );
        })}
      </div>

      {completedSteps.length === 4 && (
        <div className="bg-blue-600 text-white p-8 rounded-2xl text-center mt-6">
          <h3 className="text-2xl font-bold mb-4">تم بناء السفينة بنجاح!</h3>
          <button onClick={() => { addXp(40); onComplete(); }} className="bg-white text-blue-700 px-8 py-3 rounded-xl font-bold text-lg hover:bg-blue-50">
            الانتقال لمرحلة التحليل (+40 XP)
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
  
  // Data logging for chart
  const [speeds, setSpeeds] = useState<number[]>([15, 20, 25]);
  const [newSpeed, setNewSpeed] = useState('');

  const challenges = [
    { id: 1, title: 'تحسين زاوية الشراع', desc: 'ماذا لو غيرنا زاوية الشراع 30 درجة بدلاً من 60؟ كيف سيؤثر ذلك على السرعة؟' },
    { id: 2, title: 'نظام إنارة احتياطي', desc: 'ماذا لو نفدت البطارية؟ اقترح مصدراً آخر للطاقة على متن السفينة.' },
    { id: 3, title: 'الحملة التسويقية', desc: 'كيف تقنع المهتمين بالبيئة بدعم هذا النوع من السفن كبديل للمحركات الملوثة؟' }
  ];

  const handleSaveIdea = (id: number) => {
    if (savedIdeas.includes(id)) return;
    setSavedIdeas([...savedIdeas, id]);
    addXp(15);
  };

  const handleAddSpeed = () => {
    const val = parseInt(newSpeed);
    if (!isNaN(val) && val > 0) {
      setSpeeds([...speeds, val]);
      setNewSpeed('');
    } else {
      playSound('error');
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border-t-4 border-yellow-500">
        <p className="text-yellow-800 font-bold">"أيها المهندس، سفينتك تطفو وتتحرك، لكن هل هي الأفضل؟ دعنا نطرح بعض الفرضيات، ونسجل القياسات الحقيقية للسرعة."</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {challenges.map((card) => {
              const isDone = savedIdeas.includes(card.id);
              return (
                  <div key={card.id} className={`bg-white dark:bg-slate-900 rounded-2xl p-6 border-2 ${isDone ? 'border-green-500' : 'border-yellow-300'}`}>
                      <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                      <p className="text-sm mb-4 text-slate-600">{card.desc}</p>
                      <textarea 
                          value={ideas[card.id] || ''} 
                          onChange={e => setIdeas({...ideas, [card.id]: e.target.value})} 
                          disabled={isDone} 
                          className="w-full border rounded-xl p-3 mb-4 bg-slate-50 dark:bg-slate-800" rows={3}>
                      </textarea>
                      {!isDone && <button onClick={() => { if((ideas[card.id]||'').length > 5) handleSaveIdea(card.id); else playSound('error')}} className="bg-yellow-500 text-yellow-950 font-bold px-6 py-2 rounded-lg hover:bg-yellow-400">حفظ الفكرة (+15 XP)</button>}
                  </div>
              )
          })}
        </div>

        {/* Experiment Data Tracker */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border-2 border-slate-200">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><BarChart   className="w-5 h-5 shrink-0"/> سجل السرعات (تجربة)</h3>
          <p className="text-sm text-slate-600 mb-4">قم بمحاكاة سرعة السفينة بتسجيل سرعات مختلفة (كم/س):</p>
          
          <div className="flex gap-2 mb-6">
            <input 
              type="number" 
              value={newSpeed} 
              onChange={(e) => setNewSpeed(e.target.value)} 
              placeholder="السرعة..." 
              className="flex-1 border rounded-lg p-2 bg-slate-50"
            />
            <button onClick={handleAddSpeed} className="bg-slate-800 text-white px-4 py-2 rounded-lg font-bold">إضافة</button>
          </div>

          <div className="h-48 border-b-2 border-l-2 border-slate-300 flex items-end gap-2 p-2 relative">
             {speeds.map((s, i) => {
               const max = Math.max(...speeds, 50);
               const height = `${(s / max) * 100}%`;
               return (
                 <div key={i} className="flex-1 bg-blue-400 rounded-t-sm flex flex-col justify-end text-center group transition-all duration-300 min-w-0" style={{ height }}>
                    <span className="text-xs font-bold text-white mb-1 opacity-0 group-hover:opacity-100">{s}</span>
                 </div>
               )
             })}
          </div>
          <p className="text-center text-xs mt-2 text-slate-500">حجم العينة: {speeds.length} محاولات</p>
        </div>
      </div>

      {(savedIdeas.length === 3 && speeds.length >= 4) && (
        <button onClick={() => { addXp(35); onComplete(); }} className="w-full bg-yellow-500 text-yellow-950 font-bold py-4 rounded-xl text-lg mt-6">
          استخراج شهادة الاعتماد (+35 XP)
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
      pdf.save(`شهادة_${projectName}.pdf`);
      addXp(25);
      addBadge({ id: 'certified_builder', name: 'باني معتمد', icon: <Award   className="w-4 h-4 shrink-0"/> });
    } catch (err) {
      console.error(err);
    }
    setIsGenerating(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
      <div className="bg-purple-50 p-6 rounded-xl border-t-4 border-purple-600 text-purple-900">
        <p className="font-bold mb-2 text-xl">"فخر للأسطول!"</p>
        <p className="text-sm">نجحت سفينتك، وتم تدوين سرعتها وأدائها. التقط صورة لنموذجك واشرح فكرتك لتحصل على شهادة الاعتماد البحرية.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <label className="block mb-2 font-bold">صورة النموذج (اختياري)</label>
        <div className="border-2 border-dashed rounded-xl p-8 text-center bg-slate-50 mb-6 relative">
           {image ? (
             <Image  src={image} className="max-h-48 mx-auto rounded-lg shadow-sm" alt="Preview"width={500} height={500} />
           ) : (
             <>
               <Upload className="w-5 h-5 shrink-0 mx-auto text-slate-400 mb-2" />
               <p className="text-sm text-slate-500">ارفع صورة للسفينة التي قمت بصنعها باستخدام القارورة والأشرعة</p>
             </>
           )}
           <input type="file" onChange={handleImageUpload} accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        </div>

        <label className="block mb-2 font-bold">الوصف التقني</label>
        <textarea rows={2} placeholder="تعتمد السفينة على شراع مثلث زاوية 60 درجة..." className="w-full border rounded-xl p-3 mb-4 bg-slate-50"></textarea>
        
        <label className="block mb-2 font-bold">الابتكار المميز</label>
        <textarea rows={2} placeholder="استخدمنا بطاريات للإنارة لضمان سلامة الإبحار ليلاً..." className="w-full border rounded-xl p-3 mb-4 bg-slate-50"></textarea>
      </div>

      {/* Certificate Preview */}
      <div className="overflow-x-auto pb-4 hide-scrollbar">
        <div ref={certificateRef} className="min-w-[800px] w-full aspect-[1.414] bg-white relative overflow-hidden border-[12px] border-double border-purple-900 p-12 flex flex-col items-center justify-center text-center">
          <Ship  className="w-6 h-6 shrink-0 text-blue-600 mb-4" />
          <h1 className="text-4xl font-black text-purple-900 mb-2 font-cairo">شهادة اعتماد النموذج الهندسي (السفينة الذكية)</h1>
          <h2 className="text-xl font-bold text-slate-600 mb-10">لأسطول الرايس حميدو</h2>
          <p className="text-xl text-slate-700 mb-2">تُمنح للمهندس المشرف:</p>
          <p className="text-4xl font-bold text-orange-600 mb-8 px-12 border-b-2 inline-block pb-2">{engineerName}</p>
          <p className="text-xl text-slate-700 mb-2">لتصميم وتطوير مشروع:</p>
          <p className="text-3xl font-bold text-green-700 mb-8">"{projectName}"</p>
          
          <div className="w-full flex justify-between mt-auto px-10 items-end">
            <div className="text-right">
               <p className="font-bold text-slate-500 text-sm">رقم براءة التصميم</p>
               <p className="font-mono text-lg text-slate-800">RAISSHIP-{Math.floor(Math.random()*10000)}</p>
               <p className="font-mono text-sm text-slate-500 mt-1">{new Date().toLocaleDateString('ar-DZ')}</p>
            </div>
            <div className="text-center">
               <p className="text-4xl font-black text-yellow-500 mb-1">{xp} XP</p>
               <p className="text-sm font-bold text-slate-500">{badgesCount} شارات استحقاق</p>
            </div>
            <div className="text-left">
               <p className="font-bold text-slate-500 text-sm">اعتماد القيادة البحرية</p>
               <p className="text-2xl font-black text-purple-900 mt-2" style={{fontFamily: 'cursive'}}>الرايس حميدو</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button onClick={handleDownload} disabled={isGenerating} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-12 rounded-xl text-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2">
          {isGenerating ? 'جاري الاستخراج...' : <><Download   className="w-6 h-6 shrink-0"/> اختم ابتكاري (+25 XP)</>}
        </button>
      </div>
    </motion.div>
  );
}
