"use client";

import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Award, CheckCircle2, 
  Search, Wind, Lightbulb, Upload, 
  Play, Globe, Beaker, Wrench,
  BarChart, Anchor, Compass, Zap, Download,
  AlertTriangle, Factory, Cpu, Mic, Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// --- Types ---
type Stage = 'why' | 'what' | 'how' | 'whatif' | 'protect';
type Badge = { id: string; name: string; icon: React.ReactNode };

// --- Audio Utilities ---
const playSound = (type: 'success' | 'error' | 'click' | 'applause') => {
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
  } else if (type === 'error') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.2);
  } else if (type === 'click') {
    osc.type = 'square';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  } else if (type === 'applause') {
    // Simple noise burst for applause simulation
    const bufferSize = ctx.sampleRate * 2; 
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) output[i] = Math.random() * 2 - 1;
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    
    // Lowpass filter to muffle the noise
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1000;
    
    noiseSource.connect(filter);
    filter.connect(gain);
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0, ctx.currentTime + 2);
    
    noiseSource.start(ctx.currentTime);
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

export default function FactoryMission() {
  const [xp, setXp] = useState(0);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [activeStage, setActiveStage] = useState<Stage>('why');
  const [completedStages, setCompletedStages] = useState<Stage[]>([]);
  const [engineerName, setEngineerName] = useState('المهندس الشاب');
  const [projectName, setProjectName] = useState('مصنع الجزائر المستدامة');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEmergency, setIsEmergency] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('factoryMissionState');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setXp(parsed.xp || 0);
        setCompletedStages(parsed.completedStages || []);
        if (parsed.engineerName) setEngineerName(parsed.engineerName);
        if (parsed.projectName) setProjectName(parsed.projectName);
        setIsDarkMode(parsed.isDarkMode || false);
        if (parsed.completedStages && parsed.completedStages.includes('why')) {
            setIsEmergency(false);
        }
      } catch (e) {
        console.error('Error loading state', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('factoryMissionState', JSON.stringify({
      xp, completedStages, engineerName, projectName, isDarkMode
    }));
  }, [xp, completedStages, engineerName, projectName, isDarkMode]);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const addXp = (amount: number) => {
    setXp(prev => Math.min(prev + amount, 150));
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
    <div className={`text-white p-4 rounded-xl shadow-lg mb-6 flex flex-wrap items-center justify-between gap-4 sticky top-20 z-40 border transition-all duration-500 ${isEmergency ? 'bg-red-900 border-red-500 shadow-red-500/50' : 'bg-slate-900 border-slate-700'}`}>
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border-2 transition-colors ${isEmergency ? 'bg-red-600 border-red-400' : 'bg-emerald-500 border-emerald-300'}`}>
          {engineerName.charAt(0)}
        </div>
        <div>
          <div className="text-xs text-slate-300">مدير المشروع</div>
          <div className="font-bold">{engineerName}</div>
        </div>
      </div>
      <div className="flex-1 min-w-[200px] max-w-md">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-300">النقاط (XP)</span>
          <span className="font-bold text-yellow-400">{xp} / 150</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300" initial={{ width: 0 }} animate={{ width: `${Math.min(100, (xp / 150) * 100)}%` }} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="text-xs text-slate-300">النظام</div>
          <div className={`font-bold text-sm ${isEmergency ? 'text-red-300 animate-pulse' : 'text-emerald-300'}`}>{projectName}</div>
        </div>
        <div className="h-8 w-px bg-slate-700 mx-2"></div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2 rtl:space-x-reverse">
            {badges.slice(0, 3).map((badge, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-yellow-400" title={badge.name}>{badge.icon}</div>
            ))}
            {badges.length > 3 && <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-xs font-bold">+{badges.length - 3}</div>}
          </div>
          <div className="text-xs text-slate-300"><span className="font-bold text-white">{badges.length}</span> أوسمة</div>
        </div>
      </div>
    </div>
  );

  const Navbar = () => {
    const stages: { id: Stage; label: string; icon: React.ReactNode; color: string }[] = [
      { id: 'why', label: 'لماذا؟', icon: <Search   className="w-4 h-4 shrink-0"/>, color: 'bg-red-500' },
      { id: 'what', label: 'ماذا؟', icon: <Beaker   className="w-4 h-4 shrink-0"/>, color: 'bg-emerald-500' },
      { id: 'how', label: 'كيف؟', icon: <Wrench   className="w-4 h-4 shrink-0"/>, color: 'bg-blue-500' },
      { id: 'whatif', label: 'ماذا لو؟', icon: <Lightbulb   className="w-4 h-4 shrink-0"/>, color: 'bg-yellow-500' },
      { id: 'protect', label: 'براءة', icon: <Shield   className="w-4 h-4 shrink-0"/>, color: 'bg-purple-500' },
    ];

    return (
      <div className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 mb-6 font-cairo">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex space-x-4 rtl:space-x-reverse overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              {stages.map((stage, idx) => {
                const isActive = activeStage === stage.id;
                const isCompleted = completedStages.includes(stage.id);
                // Allow clicking if it's completed or if it's the exact next step (idx === completed stages length)
                const isClickable = isCompleted || completedStages.length === idx;
                
                return (
                  <button
                    key={stage.id} 
                    onClick={() => {
                        if (isClickable) {
                            playSound('click');
                            setActiveStage(stage.id);
                        } else {
                            playSound('error');
                        }
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all whitespace-nowrap ${isActive ? `${stage.color} text-white shadow-md` : isCompleted ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700' : 'text-slate-400 cursor-not-allowed opacity-60'}`}
                  >
                    {stage.icon} {stage.label} {isCompleted && <CheckCircle2 className={`w-5 h-5 shrink-0 ${isActive ? 'text-white/80' : 'text-emerald-500'}`} />}
                  </button>
                );
              })}
            </div>
            <button onClick={() => { playSound('click'); setIsDarkMode(!isDarkMode); }} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
              {isDarkMode ? <Zap   className="w-5 h-5 shrink-0"/> : <Globe   className="w-5 h-5 shrink-0"/>}
            </button>
          </div>
          <div className="h-1 bg-slate-100 dark:bg-slate-800 w-full">
            <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${(completedStages.length / 5) * 100}%` }}></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen font-cairo ${isDarkMode ? 'dark bg-slate-950 text-slate-50' : 'bg-slate-50 text-slate-900'} ${isEmergency ? 'animate-pulse' : ''}`}>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 pb-24">
        <Dashboard />
        <AnimatePresence mode="wait">
          {activeStage === 'why' && <StageWhy key="why" addXp={addXp} addBadge={addBadge} onComplete={() => { completeStage('why'); setIsEmergency(false); setActiveStage('what'); }} setProjectName={setProjectName} setEngineerName={setEngineerName} projectName={projectName} engineerName={engineerName} />}
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
  const [slogan, setSlogan] = useState('');
  
  const handleStart = () => {
    if (!engineerName.trim() || !projectName.trim() || !slogan.trim()) {
      playSound('error');
      return;
    }
    playSound('applause');
    addXp(10);
    addBadge({ id: 'crisis_manager', name: 'مدير الأزمات', icon: <AlertTriangle   className="w-4 h-4 shrink-0"/> });
    onComplete();
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="space-y-8">
      <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-2xl border border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <AlertTriangle   className="w-6 h-6 shrink-0"/>
        </div>
        <div className="flex gap-6 items-start relative z-10">
          <Image  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mahdi&style=circle" alt="سي المهدي" className="w-24 h-24 bg-slate-100 rounded-full border-4 border-red-500" width={500} height={500} />
          <div>
            <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-black text-red-700 dark:text-red-400">سي المهدي (مدير المصنع)</h3>
                <span className="bg-red-600 text-white px-2 py-1 tracking-widest text-xs font-bold rounded animate-pulse">حالة طوارئ</span>
            </div>
            <p className="text-red-900 dark:text-red-200 text-lg leading-relaxed font-medium mb-4">
              "أيها المهندس! النظام الرئيسي لمصنع الجزائر للفرز توقف تماماً! لا يمكننا فرز المواد، والنفايات تتراكم! الآلات فقدت برمجتها وتوقفت أجهزة الاستشعار. أنت أملنا الوحيد لإعادة الأمور إلى نصابها وبناء نظام أكثر استدامة. هل تتولى المهمة؟"
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-800">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><Factory className="w-5 h-5 shrink-0 text-emerald-500" /> تسجيل قائد مهمة الإنقاذ</h3>
        <div className="space-y-5 mb-8">
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">اسم المهندس المكلف</label>
            <input type="text" value={engineerName} onChange={e => { playSound('click'); setEngineerName(e.target.value); }} className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl p-4 focus:border-red-500 focus:ring-0 outline-none transition-all font-bold" placeholder="أدخل اسمك..." />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">الاسم الرمزي للمشروع الجديد</label>
            <input type="text" value={projectName} onChange={e => { playSound('click'); setProjectName(e.target.value); }} className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl p-4 focus:border-red-500 focus:ring-0 outline-none transition-all font-bold" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">شعار المهمة (كلمات تشجيعية للعمال)</label>
            <input type="text" value={slogan} onChange={e => { playSound('click'); setSlogan(e.target.value); }} className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl p-4 focus:border-red-500 focus:ring-0 outline-none transition-all font-bold" placeholder="مثال: العمل بذكاء من أجل بيئة أنقى..." />
          </div>
        </div>
        <button onClick={handleStart} className="w-full bg-gradient-to-l from-red-600 to-red-500 text-white font-bold py-4 rounded-xl text-xl hover:from-red-700 hover:to-red-600 shadow-lg shadow-red-500/30 transition-all flex items-center justify-center gap-3">
          <Wrench  className="w-5 h-5 shrink-0"/> إيقاف الإنذار وبدء الإصلاح (+10 XP)
        </button>
      </div>
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
    playSound('success');
    setSolved({ ...solved, [id]: true });
    addXp(xpReward);
  };

  const isAllSolved = Object.keys(solved).length === 11; // 3 sci + 4 math + 4 phys

  const ChoiceBtn = ({ text, isCorrect, id, dir = "rtl" }: any) => (
    <button 
      onClick={() => isCorrect ? handleSolve(id) : playSound('error')} 
      disabled={solved[id]}
      className={`w-full text-right p-3 rounded-xl border-2 transition-colors font-bold ${solved[id] ? (isCorrect ? 'bg-emerald-100 border-emerald-500 text-emerald-800 dark:bg-emerald-900/30 dark:border-emerald-500 dark:text-emerald-300' : 'opacity-30 border-slate-200 dark:border-slate-700') : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-600 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
      dir={dir}
    >
      {text}
      {solved[id] && isCorrect && <CheckCircle2 className="w-4 h-4 shrink-0 inline ml-2" />}
    </button>
  );

  const Section = ({ title, icon, children }: any) => (
      <div className="mb-10 animate-fade-in">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b pb-2 dark:border-slate-800">{icon} {title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {children}
          </div>
      </div>
  )

  const QuestionCard = ({ title, id, children }: any) => (
    <div className={`bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border-2 transition-all ${solved[id] ? 'border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'border-slate-100 dark:border-slate-800'}`}>
      <h4 className="font-bold mb-4 flex items-center justify-between text-slate-800 dark:text-slate-200">
        {title} {solved[id] && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">مكتمل</span>}
      </h4>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-2">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex gap-4 items-center mb-10 shadow-lg">
        <Image  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mahdi&style=circle" alt="سي المهدي" className="w-16 h-16 bg-slate-700 rounded-full border-2 border-slate-600" width={500} height={500} />
        <p className="text-slate-200 font-medium leading-relaxed">
          "المصنع يدمج بين الكيمياء العضوية، الدقة الرياضية للإحداثيات، وأنظمة الفيزياء الكهربائية. لا يمكننا إعادة التشغيل دون ضبط وبرمجة العقول الإلكترونية للمصنع عبر اختبار مفاهيمك الأساسية."
        </p>
      </div>

      <Section title="تحديات الكيمياء الطبيعية (علوم)" icon={<Beaker className="w-5 h-5 shrink-0 text-purple-500" />}>
        <QuestionCard title="اختبار كاشف فهلنغ مع التسخين" id="sci1">
          <p className="text-sm text-slate-500 mb-4">عند إضافة كاشف فهلنغ (أ+ب) إلى المادة والتسخين، ظهر لون أحمر آجري. إذن هذه المادة تحتوي على:</p>
          <ChoiceBtn text="البروتين" isCorrect={false} id="sci1" />
          <ChoiceBtn text="الدسم" isCorrect={false} id="sci1" />
          <ChoiceBtn text="سكريات مرجعة (بسيطة)" isCorrect={true} id="sci1" />
        </QuestionCard>

        <QuestionCard title="تصنيف الأغذية" id="sci2">
          <p className="text-sm text-slate-500 mb-4">أثناء فرز المنتجات الزراعية، وجدنا العدس. ما هو تصنيفه الدقيق؟</p>
          <ChoiceBtn text="غذاء معدني" isCorrect={false} id="sci2" />
          <ChoiceBtn text="غذاء عضوي نباتي" isCorrect={true} id="sci2" />
          <ChoiceBtn text="غذاء عضوي حيواني" isCorrect={false} id="sci2" />
        </QuestionCard>

        <QuestionCard title="اختبار ماء اليود" id="sci3">
          <p className="text-sm text-slate-500 mb-4">استخدمنا ماء اليود على عينة، فتلوّنت باللون الأزرق البنفسجي. المادة هي:</p>
          <ChoiceBtn text="نشاء" isCorrect={true} id="sci3" />
          <ChoiceBtn text="ماء وأملاح" isCorrect={false} id="sci3" />
          <ChoiceBtn text="بروتين" isCorrect={false} id="sci3" />
        </QuestionCard>
      </Section>

      <Section title="تحديات الدقة (رياضيات)" icon={<BarChart className="w-5 h-5 shrink-0 text-blue-500" />}>
        <QuestionCard title="تعديل حجم مجرى الفرز" id="math1">
          <p className="text-sm text-slate-500 mb-4" dir="ltr">Order values from largest to smallest:</p>
          <p className="text-xs mb-3 font-mono font-bold" dir="ltr">A: 15mm, B: 2.5cm, C: 0.05m</p>
          <ChoiceBtn text="C > B > A" isCorrect={true} id="math1" dir="ltr" />
          <ChoiceBtn text="A > B > C" isCorrect={false} id="math1" dir="ltr" />
          <ChoiceBtn text="B > C > A" isCorrect={false} id="math1" dir="ltr" />
        </QuestionCard>

        <QuestionCard title="تحويلات أطوال الأنابيب" id="math2">
          <p className="text-sm text-slate-500 mb-4">نحتاج أنبوب غاز طوله 0.25 متر لربط الخزان. كم يساوي بالسنتيمتر؟</p>
          <ChoiceBtn text="2.5 cm" isCorrect={false} id="math2" dir="ltr" />
          <ChoiceBtn text="250 cm" isCorrect={false} id="math2" dir="ltr" />
          <ChoiceBtn text="25 cm" isCorrect={true} id="math2" dir="ltr" />
        </QuestionCard>

        <QuestionCard title="ترتيب الأوزان العشرية" id="math3">
          <p className="text-sm text-slate-500 mb-4">آلة الوزن تقرأ أوزاناً خاطئة وتحتاج تدريباً. رتب الأوزان تنازلياً:</p>
          <ChoiceBtn text="1.55 > 1.05 > 1.50" isCorrect={false} id="math3" dir="ltr" />
          <ChoiceBtn text="1.55 > 1.50 > 1.05" isCorrect={true} id="math3" dir="ltr" />
        </QuestionCard>

        <QuestionCard title="معايرة دقة الحساسات" id="math4">
          <p className="text-sm text-slate-500 mb-4">المسافة بين الحساس والشريط المتحرك هي 1.2 cm. أدخلها بالمليمتر (mm) للمبرمج:</p>
          <ChoiceBtn text="12 mm" isCorrect={true} id="math4" dir="ltr" />
          <ChoiceBtn text="120 mm" isCorrect={false} id="math4" dir="ltr" />
          <ChoiceBtn text="0.12 mm" isCorrect={false} id="math4" dir="ltr" />
        </QuestionCard>
      </Section>

      <Section title="تحديات الطاقة (فيزياء)" icon={<Zap className="w-5 h-5 shrink-0 text-yellow-500" />}>
        <QuestionCard title="ناقلية المواد" id="phys1">
          <p className="text-sm text-slate-500 mb-4">نحتاج لصنع مستشعر إغلاق. أي من المواد التالية يسمح بمرور التيار لإغلاق الدارة؟</p>
          <ChoiceBtn text="شريط ألمنيوم" isCorrect={true} id="phys1" />
          <ChoiceBtn text="قطعة خشبية" isCorrect={false} id="phys1" />
          <ChoiceBtn text="شريط بلاستيكي" isCorrect={false} id="phys1" />
        </QuestionCard>

        <QuestionCard title="مكونات دارة الإنذار" id="phys2">
          <p className="text-sm text-slate-500 mb-4">طابق المكون الكهربائي بوظيفته في المصنع:</p>
          <ChoiceBtn text="البطارية = أسلاك نقل" isCorrect={false} id="phys2" />
          <ChoiceBtn text="البطارية = مولد الطاقة" isCorrect={true} id="phys2" />
          <ChoiceBtn text="أسلاك النقل = مستهلك للطاقة" isCorrect={false} id="phys2" />
        </QuestionCard>

        <QuestionCard title="العوازل والنواقل" id="phys3">
          <p className="text-sm text-slate-500 mb-4">لماذا تُغلف أسلاك المصنع بالبلاستيك (PVC)؟</p>
          <ChoiceBtn text="لأن البلاستيك ناقل جيد فيسرع التيار" isCorrect={false} id="phys3" />
          <ChoiceBtn text="لأن البلاستيك عازل يحمي العمال من الصدمات" isCorrect={true} id="phys3" />
        </QuestionCard>

        <QuestionCard title="المنطق الكهربائي" id="phys4">
          <p className="text-sm text-slate-500 mb-4">يتوقف المحرك إذا كانت القاطعة ____، ومصباح الإنذار يشتعل إذا كانت القاطعة ____.</p>
          <ChoiceBtn text="مغلقة - مفتوحة" isCorrect={false} id="phys4" />
          <ChoiceBtn text="مفتوحة - مغلقة" isCorrect={true} id="phys4" />
        </QuestionCard>
      </Section>

      {isAllSolved && (
        <div className="bg-emerald-600 text-white p-8 rounded-2xl text-center mt-6 shadow-xl animate-fade-in border-4 border-emerald-400">
          <h3 className="text-2xl font-black mb-4">ممتاز! تمت استعادة المعارف الأساسية للنظام.</h3>
          <p className="mb-6">أنت الآن جاهز لارتداء خوذتك والنزول لورشة بناء مسار الفرز.</p>
          <button onClick={() => { playSound('success'); addBadge({ id: 'knowledge_master', name: 'خبير الأنظمة', icon: <Cpu   className="w-4 h-4 shrink-0"/> }); onComplete(); }} className="bg-white text-emerald-800 px-8 py-4 rounded-xl font-black text-xl hover:bg-emerald-50 shadow-md transition-transform hover:scale-105">
            الدخول لورشة الإنتاج
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
    { id: 1, title: 'تصميم مسار الفرز المغناطيسي', desc: "قمنا بتثبيت دعائم مسار الفرز.", xp: 10 },
    { id: 2, title: 'قص بوابات العبور', desc: "صنع فتحات دقيقة لتمرير العلب بأحجام مخصصة.", xp: 10 },
    { id: 3, title: 'تثبيت المستشعر', desc: "وضع شريحة ألمنيوم لكشف المعادن عند مرورها.", xp: 10 },
    { id: 4, title: 'ضبط زاوية الميلان', desc: "ضبطنا زاوية الميل على 30° لضمان انزلاق سلس بفعل الجاذبية.", xp: 10 },
    { id: 5, title: 'توصيل دارة الإنذار الخفي', desc: "ربط مولد ومصباح وقاطعة لاستشعار الأجسام.", xp: 10 },
    { id: 6, title: 'الاختبار الشامل', desc: "إلقاء عينة حقيقية لرؤية الآلية تعمل وتشتعل الأضواء للصحيح.", xp: 15, badge: { id: 'factory_builder', name: 'مُشيد المصانع', icon: <Wrench   className="w-4 h-4 shrink-0"/> } }
  ];

  const handleCompleteStep = (stepObj: any) => {
      playSound('click');
    if (completedSteps.includes(stepObj.id)) return;
    setCompletedSteps([...completedSteps, stepObj.id]);
    addXp(stepObj.xp);
    if (stepObj.badge) addBadge(stepObj.badge);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
      <div className="flex gap-6 p-6 bg-slate-900 rounded-xl border border-slate-700 text-white">
        <div className="flex-1">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Factory className="w-5 h-5 shrink-0 text-blue-400" /> ورشة بناء مسار الفرز</h3>
            <p className="text-slate-300 font-medium mb-2 leading-relaxed">
            "يجب أن نعيد بناء المسار الفيزيائي للحزام الناقل. اتبع خطوات التركيب بدقة، كل خطوة تنجزها ستعيد جزءاً من الطاقة للمصنع المطفأ."
            </p>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col justify-center items-center gap-2 font-mono text-xl">
            <div className="text-emerald-400 font-bold">{Math.round((completedSteps.length / steps.length) * 100)}%</div>
            <div className="text-xs text-slate-400">طاقة المصنع</div>
        </div>
      </div>

      <div className="space-y-4 relative">
        {/* Connection Line */}
        <div className="absolute top-8 bottom-8 right-10 w-1 bg-slate-200 dark:bg-slate-800 z-0"></div>

        {steps.map((step, idx) => {
          const isCompleted = completedSteps.includes(step.id);
          const isLocked = idx > 0 && !completedSteps.includes(steps[idx - 1].id);
          
          return (
            <div key={step.id} className={`bg-white dark:bg-slate-900 rounded-2xl p-6 border-2 transition-all relative z-10 flex gap-6 items-center ${isCompleted ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/10' : isLocked ? 'border-slate-100 dark:border-slate-800 opacity-50 grayscale' : 'border-blue-200 shadow-lg dark:border-slate-700 hover:border-blue-400'}`}>
              
              <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center font-bold border-4 ${isCompleted ? 'bg-blue-500 border-blue-200 text-white' : 'bg-white border-slate-200 text-slate-400 dark:bg-slate-800 dark:border-slate-600'}`}>
                  {isCompleted ? <CheckCircle2   className="w-4 h-4 shrink-0"/> : step.id}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h4 className={`font-bold text-lg ${isCompleted ? 'text-blue-900 dark:text-blue-300' : 'text-slate-700 dark:text-slate-300'}`}>{step.title}</h4>
                  <div className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded text-xs font-bold border dark:border-slate-700">+{step.xp} XP</div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{step.desc}</p>
              </div>

              {!isCompleted && !isLocked && (
                <button onClick={() => handleCompleteStep(step)} className="shrink-0 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95">
                  تفعيل
                </button>
              )}
            </div>
          );
        })}
      </div>

      {completedSteps.length === steps.length && (
        <div className="bg-blue-600 text-white p-8 rounded-2xl text-center mt-8 animate-bounce shadow-xl">
          <h3 className="text-2xl font-black mb-4">آليات المصنع تدور بنجاح! เสียงเครื่องจักรทำงาน! ⚙️</h3>
          <button onClick={() => { playSound('applause'); addXp(20); onComplete(); }} className="bg-white text-blue-800 px-8 py-3 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors shadow-lg">
            دخول قاعة التطوير STEAM
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
  const [isRecording, setIsRecording] = useState(false);
  const [pitchRecorded, setPitchRecorded] = useState(false);

  const challenges = [
    { id: 1, title: 'الفن في الصناعة', desc: 'صمم فكرة للشعار الجديد للمصنع. كيف ستدمج حرف "A" للجزائر مع رمز إعادة التدوير؟ صِف فكرتك.' },
    { id: 2, title: 'الاستدامة والطاقة', desc: 'المصنع يستهلك كهرباء كبيرة. ماذا لو فكرت بمصدر طاقة بديل ونظيف لتشغيل المصنع بدلاً من غازات الاحتراق؟' },
    { id: 3, title: 'تحسين الدارات', desc: 'الدارة الحالية بسيطة. كيف يمكن للمهندس تعديلها لتصدر إنذاراً صوتياً بدلاً من الضوئي أو كليهما؟' }
  ];

  const handleSaveIdea = (id: number) => {
    if (savedIdeas.includes(id)) return;
    playSound('success');
    setSavedIdeas([...savedIdeas, id]);
    addXp(15);
  };

  const simulateRecording = () => {
      playSound('click');
      if (isRecording) {
          setIsRecording(false);
          setPitchRecorded(true);
          playSound('success');
      } else {
          setIsRecording(true);
      }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-8 rounded-2xl border border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.2)]">
        <p className="text-yellow-900 dark:text-yellow-100 font-bold text-lg leading-relaxed">
            "سي المهدي: عظيم! الآلات تعمل، لكننا لا نكتفي بالعمل بل نبحث عن الابتكار. هذه هي قاعة STEAM (علوم، تقنية، هندسة، فنون، رياضيات). أطلق العنان لمخيلتك وقدم حلولاً إبداعية غير تقليدية."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6 md:col-span-1">
          {challenges.map((card) => {
              const isDone = savedIdeas.includes(card.id);
              return (
                  <div key={card.id} className={`bg-white dark:bg-slate-900 rounded-2xl p-6 border-2 transition-all ${isDone ? 'border-emerald-500 shadow-sm' : 'border-slate-200 dark:border-slate-700 hover:border-yellow-400'}`}>
                      <h3 className="text-lg font-bold mb-2 text-slate-800 dark:text-slate-100">{card.title}</h3>
                      <p className="text-sm mb-4 text-slate-600 dark:text-slate-400">{card.desc}</p>
                      <textarea 
                          value={ideas[card.id] || ''} 
                          onChange={e => setIdeas({...ideas, [card.id]: e.target.value})} 
                          disabled={isDone} 
                          placeholder="اكتب أفكارك الإبداعية هنا..."
                          className="w-full border-2 border-slate-100 dark:border-slate-800 rounded-xl p-4 mb-4 bg-slate-50 dark:bg-slate-950 focus:border-yellow-400 outline-none transition-colors" rows={3}>
                      </textarea>
                      {!isDone && (
                          <button onClick={() => { if((ideas[card.id]||'').length > 5) handleSaveIdea(card.id); else playSound('error')}} className="bg-slate-800 text-white font-bold px-6 py-2 rounded-lg hover:bg-slate-900 transition-colors w-full">حفظ الفكرة للإدارة (+15 XP)</button>
                      )}
                      {isDone && <div className="text-emerald-500 font-bold flex gap-2 items-center"><CheckCircle2/> تم الحفظ بنجاح</div>}
                  </div>
              )
          })}
        </div>

        {/* Pitch Data Tracker */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border-2 border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center">
          <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2"><Mic className="w-5 h-5 shrink-0 text-red-500" /> عرض الابتكار للمستثمرين</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-sm">
             سجل شرحاً صوتياً قصيراً مدته 30 ثانية باستخدام أسلوب "Pitch"، تخيل أنك تقنع رئيس البلدية ومستثمرين بتبني نظام الفرز الخاص بك.
          </p>
          
          <button 
             onClick={simulateRecording} 
             disabled={pitchRecorded && !isRecording}
             className={`w-36 h-36 rounded-full flex flex-col items-center justify-center font-bold text-white transition-all shadow-xl ${pitchRecorded && !isRecording ? 'bg-emerald-500 cursor-not-allowed' : isRecording ? 'bg-red-600 animate-pulse border-8 border-red-300' : 'bg-rose-500 hover:bg-rose-600 hover:scale-105'}`}>
             
             {pitchRecorded && !isRecording ? (
                 <><CheckCircle2  className="w-6 h-6 shrink-0 mb-2"/> تم التسجيل</>
             ) : isRecording ? (
                 <><Volume2  className="w-6 h-6 shrink-0 mb-2 animate-bounce"/> إيقاف...</>
             ) : (
                 <><Mic  className="w-6 h-6 shrink-0 mb-2"/> بدء التسجيل</>
             )}
          </button>
          
          {pitchRecorded && <p className="mt-6 text-emerald-600 dark:text-emerald-400 font-bold">رائع! مستواك في التواصل متميز. الإدارة أعجبت بالعرض.</p>}
        </div>
      </div>

      {(savedIdeas.length === 3 && pitchRecorded) && (
        <button onClick={() => { playSound('applause'); addXp(20); onComplete(); }} className="w-full bg-gradient-to-l from-yellow-500 to-amber-500 text-white font-black py-5 rounded-2xl text-xl mt-8 shadow-[0_10px_20px_rgba(245,158,11,0.3)] hover:scale-[1.02] transition-transform">
          الخطوة الأخيرة: الختم وبراءة الاختراع 🥇
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
    playSound('click');
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (!certificateRef.current) return;
    playSound('click');
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(certificateRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`شهادة_${projectName}.pdf`);
      playSound('applause');
      addXp(35);
      addBadge({ id: 'certified_innovator', name: 'مهندس معتمد', icon: <Award   className="w-4 h-4 shrink-0"/> });
      triggerConfetti();
    } catch (err) {
      console.error(err);
      playSound('error');
    }
    setIsGenerating(false);
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="space-y-8">
      <div className="bg-purple-100 dark:bg-purple-900/40 p-8 rounded-2xl border border-purple-300 dark:border-purple-700 text-purple-900 dark:text-purple-100 text-center">
        <h2 className="font-black text-3xl mb-4">"مهمة إنقاذ المصنع نجحت!"</h2>
        <p className="text-lg leading-relaxed max-w-2xl mx-auto">
            أثبتّ كفاءتك في العلوم والرياضيات والفيزياء، وبنيت نظاماً هندسياً مبتكراً. الآن وثق ابتكارك للحصول على الاعتماد الرسمي كمخترع من طرف الدولة.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800">
        <label className="block mb-2 font-bold text-slate-700 dark:text-slate-200">صورة لابتكارك / مجسم المصنع (اختياري)</label>
        <div className="border-4 border-dashed rounded-2xl p-10 text-center bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 mb-8 relative hover:border-purple-400 transition-colors cursor-pointer group">
           {image ? (
             <Image  src={image} className="max-h-64 mx-auto rounded-xl shadow-md border-4 border-white" alt="Preview"width={500} height={500} />
           ) : (
             <>
               <Upload className="w-6 h-6 shrink-0 mx-auto text-slate-400 dark:text-slate-600 mb-4 group-hover:text-purple-500 group-hover:scale-110 transition-all" />
               <p className="font-bold text-slate-600 dark:text-slate-400">انقر هنا لرفع صورة للمشروع الذي أنجزته</p>
               <p className="text-sm text-slate-400 mt-2">JPG, PNG, WEBP (Max 5MB)</p>
             </>
           )}
           <input type="file" onChange={handleImageUpload} accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        </div>

        <label className="block mb-2 font-bold text-slate-700 dark:text-slate-200">مبدأ عمل الابتكار (علمياً)</label>
        <textarea rows={3} placeholder="يعتمد نظام الفرز على قانون الجاذبية بزاوية 30 درجة ودارة كهربائية مغلقة بملامسة الألمنيوم..." className="w-full border-2 border-slate-200 dark:border-slate-700 rounded-xl p-4 mb-6 bg-slate-50 dark:bg-slate-950 focus:border-purple-500 outline-none"></textarea>
      </div>

      {/* Certificate Preview */}
      <div className="overflow-x-auto pb-4 hide-scrollbar">
        <div ref={certificateRef} className="min-w-[900px] w-full aspect-[1.414] bg-white relative overflow-hidden border-[16px] border-double border-slate-800 p-12 flex flex-col items-center justify-center text-center shadow-2xl">
          
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <Factory   className="w-6 h-6 shrink-0"/>
          </div>

          <Factory  className="w-6 h-6 shrink-0 text-emerald-600 mb-6 relative z-10" />
          
          <h1 className="text-5xl font-black text-slate-900 mb-4 font-cairo relative z-10 uppercase tracking-wider">شهادة ابتكار و هندسة مستدامة</h1>
          <h2 className="text-2xl font-bold text-slate-600 mb-12 relative z-10">الجمهورية - وزارة الصناعات الذكية</h2>
          
          <p className="text-2xl text-slate-700 mb-3 relative z-10">تمنح هذه البراءة للصانع و المبتكر:</p>
          <p className="text-5xl font-black text-blue-700 mb-10 px-16 border-b-4 border-slate-800 inline-block pb-4 relative z-10">{engineerName}</p>
          
          <p className="text-2xl text-slate-700 mb-3 relative z-10">لإسهامه في إنقاذ وبرمجة مشروع:</p>
          <p className="text-4xl font-bold text-emerald-600 mb-12 relative z-10">"{projectName}"</p>
          
          <div className="w-full flex justify-between mt-auto px-12 items-end relative z-10 border-t-2 border-slate-200 pt-8">
            <div className="text-right">
               <p className="font-bold text-slate-400 text-sm uppercase tracking-wide">الرقم المرجعي (ID)</p>
               <p className="font-mono text-xl font-bold text-slate-800 mt-1">DZ-STEAM-{Math.floor(Math.random()*90000)+10000}</p>
               <p className="font-mono text-md text-slate-500 mt-2">{new Date().toLocaleDateString('ar-DZ')}</p>
            </div>
            
            <div className="flex flex-col items-center">
                 {/* Seal */}
                <div className="w-32 h-32 rounded-full border-4 border-amber-500 flex items-center justify-center bg-amber-50 shadow-inner relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center opacity-20"><Award  className="w-6 h-6 shrink-0 text-amber-500"/></div>
                    <div className="text-center relative z-10">
                        <span className="block text-2xl font-black text-amber-600">{xp}</span>
                        <span className="block text-xs font-bold text-amber-700">نقاط الابتكار</span>
                    </div>
                </div>
            </div>

            <div className="text-left text-center">
               <p className="font-bold text-slate-400 text-sm uppercase tracking-wide">توقيع مدير المصنع</p>
               <p className="text-4xl font-black text-slate-800 mt-4 opacity-80" style={{fontFamily: 'cursive'}}>Al-Mahdi</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-12 pb-12">
        <button onClick={handleDownload} disabled={isGenerating} className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-5 px-16 rounded-2xl text-2xl transition-all shadow-[0_10px_0_theme(colors.slate.700)] active:shadow-[0_2px_0_theme(colors.slate.700)] active:translate-y-[8px] disabled:opacity-50 flex items-center justify-center gap-3">
          {isGenerating ? 'جاري الاستخراج...' : <><Download   className="w-6 h-6 shrink-0"/> استخراج وطباعة البراءة</>}
        </button>
      </div>
    </motion.div>
  );
}
