"use client";

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen, Cpu, Gamepad2, Globe, BarChart3, Star,
  CheckCircle2, Bot, Play, ChevronLeft, ChevronRight,
  Users, Video, ArrowLeft, GraduationCap, ShieldCheck
} from 'lucide-react';

const AnimatedCounter = ({ value, suffix = "", prefix = "" }: { value: number, suffix?: string, prefix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTimestamp: number | null = null;
          const duration = 2000;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Easing function: easeOutQuart
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeProgress * value));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return <span ref={ref} className="font-mono tracking-tight">{prefix}{count.toLocaleString('en-US')}{suffix}</span>;
};

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    { name: 'أحمد محمود', role: 'طالب ثانوي', content: 'تجربة مذهلة! الأسلوب التفاعلي والذكاء الاصطناعي ساعداني على تحسين مستواي بشكل غير مسبوق في وقت قصير.' },
    { name: 'سارة خالد', role: 'ولية أمر', content: 'أعجبني جداً تتبع مستوى ابني من خلال التحليلات الدقيقة، وتوفر الأساتذة طوال الوقت للدعم الأكاديمي الممتاز.' },
    { name: 'ياسين بلعربي', role: 'متعلم للغات', content: 'أفضل منصة لتطوير المهارات. الدروس التفاعلية جعلت التعلم ممتعاً، ومشروعات STEM فتحت لي آفاقاً واسعة.' }
  ];

  const features = [
    { icon: Cpu, title: 'STEM ومشاريع', desc: 'برامج وتجارب علمية عملية لتحفيز الابتكار والهندسة.' },
    { icon: Bot, title: 'ذكاء اصطناعي (AI)', desc: 'مساعد ذكي يرافقك لتقديم شروحات مخصصة لمستواك.' },
    { icon: Gamepad2, title: 'التعلم باللعب', desc: 'تحديات ومكافآت يومية تجعل من المذاكرة مغامرة مشوقة.' },
    { icon: Globe, title: 'اللغات الحية', desc: 'دورات تفاعلية لإتقان اللغات الأجنبية بطلاقة وثقة تامة.' },
    { icon: BookOpen, title: 'دعم أكاديمي قوي', desc: 'مراجعات ودروس تقوية مستمرة لجميع المراحل الدراسية.' },
    { icon: BarChart3, title: 'تحليلات متقدمة', desc: 'تقارير فورية ودقيقة لتقييم وتقويم الأداء بشكل مستمر.' },
  ];

  const steps = [
    { num: '1', title: 'إنشاء حساب', desc: 'سجل كطالب، ولي أمر، أو معلم في ثوانٍ.' },
    { num: '2', title: 'تحديد المسار', desc: 'اختر المهارات والمواد التي ترغب في تعلمها.' },
    { num: '3', title: 'تعلم تفاعلي', desc: 'حضر الدروس الحية، العب وتعلم مع الذكاء الاصطناعي.' },
    { num: '4', title: 'نيل الشهادات', desc: 'أكمل التحديات واحصل على شهادات معتمدة.' }
  ];

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // Auto play testimonials
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white font-cairo">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 z-0"></div>
        {/* Animated Glow Elements */}
        <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-amber-500 rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
           
            <span className="inline-block py-1 px-3 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-bold tracking-wider mb-6">
              Eduligne — منصة التعليم الرائدة
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-8">
              التميّز التعليمي في <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-400 to-yellow-200">كل خطوة</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 font-medium mb-10 tracking-wide">
              تعلم ذكي <span className="text-amber-500 mx-2">•</span> خبراء حقيقيون <span className="text-amber-500 mx-2">•</span> تجربة تفاعلية
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-14">
              <Link href="/register"
                className="bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 px-10 py-4 rounded-full font-black text-xl hover:scale-105 transition-transform flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
              >
                ابدأ رحلتك الآن
                <ArrowLeft   className="w-6 h-6 shrink-0"/>
              </Link>
              <button
                className="bg-white/5 border border-white/10 text-white px-10 py-4 rounded-full font-bold text-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-3 backdrop-blur-md"
              >
                <Play  className="w-6 h-6 shrink-0 text-amber-400" /> مشاهدة العرض
              </button>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 pt-8 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3 rtl:space-x-reverse">
                  {[1, 2, 3, 4].map(i => (
                    <Image
                      key={i}
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=U${i}&backgroundColor=e2e8f0`}
                      alt="Learner"
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full border-2 border-slate-900 bg-white object-cover"
                    />))}
                </div>
                <div className="text-right pr-2">
                  <div className="text-white font-bold text-lg"><AnimatedCounter value={50000} prefix="+" /> متعلم</div>
                  <div className="text-slate-400 text-sm">يثقون بنا</div>
                </div>
              </div>
              <div className="h-12 w-px bg-white/10 hidden md:block"></div>
              <div className="flex items-center gap-4">
                <div className="flex text-amber-400">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} fill="currentColor"  className="w-6 h-6 shrink-0"/>)}
                </div>
                <div className="text-right">
                  <div className="text-white font-black text-2xl">4.8</div>
                  <div className="text-slate-400 text-sm">تقييم المنصة</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-6">تجربة تعليمية متكاملة</h2>
            <p className="text-xl text-slate-600 leading-relaxed">نجمع بين أحدث التقنيات وأفضل الكفاءات لتقديم بيئة محفزة تبني المهارات الأساسية والمتقدمة للحاضر والمستقبل.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all group"
              >
                <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-slate-100 group-hover:bg-amber-50 group-hover:border-amber-200 transition-colors">
                  <feature.icon className="text-slate-700 group-hover:text-amber-500 transition-colors w-6 h-6 shrink-0" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-lg">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center divide-x-0 lg:divide-x lg:divide-x-reverse divide-white/10">

            <div className="p-4">
              <div className="flex justify-center mb-4 text-amber-400"><BookOpen  strokeWidth={1.5}  className="w-6 h-6 shrink-0"/></div>
              <div className="text-5xl font-black mb-3"><AnimatedCounter value={120} suffix="+" /></div>
              <div className="text-slate-400 text-lg font-bold">دورة تعليمية</div>
            </div>

            <div className="p-4">
              <div className="flex justify-center mb-4 text-amber-400"><GraduationCap  strokeWidth={1.5}  className="w-6 h-6 shrink-0"/></div>
              <div className="text-5xl font-black mb-3"><AnimatedCounter value={45} suffix="+" /></div>
              <div className="text-slate-400 text-lg font-bold">أستاذ وخبير</div>
            </div>

            <div className="p-4">
              <div className="flex justify-center mb-4 text-amber-400"><Users  strokeWidth={1.5}  className="w-6 h-6 shrink-0"/></div>
              <div className="text-5xl font-black mb-3"><AnimatedCounter value={10} suffix="K" /></div>
              <div className="text-slate-400 text-lg font-bold">متعلم نشط</div>
            </div>

            <div className="p-4">
              <div className="flex justify-center mb-4 text-amber-400"><Video  strokeWidth={1.5}  className="w-6 h-6 shrink-0"/></div>
              <div className="text-5xl font-black mb-3"><AnimatedCounter value={500} suffix="+" /></div>
              <div className="text-slate-400 text-lg font-bold">حصة مباشرة</div>
            </div>

          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <h2 className="text-4xl font-black text-slate-900 mb-6">رحلتك نحـو النجـــاح</h2>
            <p className="text-xl text-slate-600">طريقك واضح للبدء في تحقيق أهدافك الأكاديمية والمهنية عبر أدواتنا البسيطة والقوية.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            <div className="hidden md:block absolute top-[50px] right-24 left-24 h-1 border-t-2 border-dashed border-slate-200 z-0"></div>
            {steps.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-white border-4 border-slate-100 rounded-full flex items-center justify-center text-3xl font-black text-slate-300 mb-8 group-hover:border-amber-400 group-hover:bg-amber-50 group-hover:text-amber-500 transition-all duration-500 shadow-sm relative">
                  {step.num}
                  <div className="absolute -bottom-2 -right-2 bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                    <CheckCircle2   className="w-4 h-4 shrink-0"/>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">آراء المتعلمين والأولياء</h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl p-10 md:p-14 shadow-xl border border-slate-100 text-center"
              >
                <div className="flex justify-center text-amber-400 mb-8">
                  {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor"  className="w-6 h-6 shrink-0"/>)}
                </div>
                <p className="text-2xl md:text-3xl text-slate-800 font-medium leading-relaxed mb-10">
                  "{testimonials[currentTestimonial].content}"
                </p>
                <div className="flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-slate-200 rounded-full border-4 border-slate-50 mb-4 overflow-hidden shadow-sm">
                    <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonials[currentTestimonial].name}`} alt="Avatar" width={500} height={500} />
                  </div>
                  <h4 className="font-bold text-xl text-slate-900">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-amber-500 font-bold">{testimonials[currentTestimonial].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-16">
              <button onClick={prevTestimonial} className="bg-white p-4 rounded-full shadow-lg text-slate-500 hover:text-amber-500 hover:scale-110 transition-all border border-slate-100">
                <ChevronRight   className="w-6 h-6 shrink-0"/>
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-16">
              <button onClick={nextTestimonial} className="bg-white p-4 rounded-full shadow-lg text-slate-500 hover:text-amber-500 hover:scale-110 transition-all border border-slate-100">
                <ChevronLeft   className="w-6 h-6 shrink-0"/>
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-3 mt-10">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`h-3 rounded-full transition-all ${i === currentTestimonial ? 'w-10 bg-amber-500' : 'w-3 bg-slate-300 hover:bg-slate-400'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>

            <div className="relative z-10 flex flex-col items-center">
              <ShieldCheck  className="w-6 h-6 shrink-0 text-amber-400 mb-8" />
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">مستقبلك يبدأ بقرار اليوم</h2>
              <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">انضم إلى مجتمعنا الحيوي من المتعلمين واستفد من أحدث تقنيات التعليم التفاعلي لتحقيق الريادة.</p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register"
                  className="bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 px-10 py-5 rounded-full font-black text-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(245,158,11,0.3)] w-full sm:w-auto"
                >
                  انضم إلينا مجـــاناً
                </Link>
                <Link href="/about"
                  className="bg-white/10 text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white/20 transition-colors backdrop-blur-md w-full sm:w-auto"
                >
                  اكتشف المزيد عنا
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

