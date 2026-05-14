"use client";

import React, { useState } from 'react';
import {
  Check, X, CreditCard, Wallet, Building2, ChevronRight,
  ShieldCheck, Zap, BookOpen, Users, Brain, Library,
  Cpu, BarChart3, Star, Clock, Infinity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type PlanTab = 'subscriptions' | 'payasyougo' | 'courses';

export default function Pricing() {
  const [activeTab, setActiveTab] = useState<PlanTab>('subscriptions');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'edahabia' | 'cash'>('edahabia');

  const openCheckout = (plan: any) => {
    setSelectedPlan(plan);
    setCheckoutStep(1);
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
    setTimeout(() => { setSelectedPlan(null); setCheckoutStep(1); }, 300);
  };

  const tabs: { id: PlanTab; label: string }[] = [
    { id: 'subscriptions', label: 'الاشتراكات السنوية' },
    { id: 'payasyougo', label: 'ادفع حسب الاستخدام' },
    { id: 'courses', label: 'دورات مستقلة' },
  ];

  const payAsYouUseItems = [
    { icon: Brain, title: 'رصيد الذكاء الاصطناعي', desc: '100 رصيد لتوليد التفسيرات والمساعدة الذكية', price: 500, color: 'indigo' },
    { icon: BookOpen, title: 'ملخص تعليمي', desc: 'ملخص شامل لمادة دراسية واحدة', price: 200, color: 'violet' },
    { icon: Cpu, title: 'مشروع STEM', desc: 'وصول كامل لمشروع STEM واحد مع أدواته', price: 800, color: 'emerald' },
    { icon: Star, title: 'حصة مباشرة', desc: 'الانضمام لحصة مباشرة مع أستاذ متخصص', price: 400, color: 'amber' },
  ];

  const mockCourses = [
    { title: 'أساسيات البرمجة بـ Python', level: 'مبتدئ', duration: '20 ساعة', price: 2500, students: 1240, rating: 4.8, category: 'برمجة' },
    { title: 'الرياضيات للبكالوريا — شعبة العلوم', level: 'متقدم', duration: '35 ساعة', price: 3000, students: 890, rating: 4.9, category: 'رياضيات' },
    { title: 'مشاريع STEM العملية', level: 'متوسط', duration: '18 ساعة', price: 2000, students: 560, rating: 4.7, category: 'STEM' },
    { title: 'اللغة الإنجليزية — المستوى المتوسط', level: 'متوسط', duration: '25 ساعة', price: 1800, students: 2100, rating: 4.6, category: 'لغات' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20 relative">
      {/* Header */}
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-bold rounded-full mb-6">
            <Zap className="w-4 h-4 shrink-0" />
            فواتير سنوية فقط — وفّر أكثر
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            استثمر في مستقبلك اليوم
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium mb-10">
            اشتراكات سنوية شاملة، أو ادفع فقط مقابل ما تحتاجه، أو اشترِ دورة بشكل مستقل.
          </p>

          {/* Tab Toggle */}
          <div className="inline-flex bg-slate-800 p-1.5 rounded-2xl relative border border-slate-700/50 shadow-inner gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative z-10 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">

            {/* ── SUBSCRIPTIONS TAB ── */}
            {activeTab === 'subscriptions' && (
              <motion.div
                key="subscriptions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Annual badge */}
                <div className="text-center mb-12">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-bold rounded-xl">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    اشتراك سنوي كامل — ادفع مرة واحدة واستفد طوال العام
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {/* BASIC */}
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col hover:shadow-lg hover:border-indigo-200 transition-all group">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-black text-slate-900">الأساسية</h3>
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">BASIC</span>
                    </div>
                    <p className="text-slate-500 font-medium mb-6">مثالية للبدء واستكشاف المنصة</p>
                    <div className="mb-8 pb-8 border-b border-slate-100">
                      <div className="flex items-end gap-2">
                        <span className="text-5xl font-black text-slate-900">8,000</span>
                        <div className="pb-1">
                          <p className="text-slate-500 font-bold text-sm">د.ج / سنة</p>
                          <p className="text-emerald-600 text-xs font-bold">≈ 667 د.ج / شهر</p>
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-8 flex-1">
                      {[
                        { text: '30% من محتوى المنصة', ok: true },
                        { text: 'الوصول للمكتبة التعليمية', ok: true },
                        { text: 'المشاركة في المجتمع', ok: true },
                        { text: 'أدوات الذكاء الاصطناعي (محدودة)', ok: true },
                        { text: 'مشاريع STEM الأساسية', ok: true },
                        { text: 'إحصائيات الأداء', ok: true },
                        { text: 'نظام متابعة الأولياء', ok: false },
                        { text: 'وصول كامل لجميع الدورات', ok: false },
                      ].map((item, i) => (
                        <li key={i} className={`flex items-center gap-3 font-medium ${item.ok ? 'text-slate-700' : 'text-slate-300'}`}>
                          {item.ok
                            ? <Check className="w-5 h-5 shrink-0 text-emerald-500 shrink-0" />
                            : <X className="w-5 h-5 shrink-0 text-slate-200 shrink-0" />
                          }
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => openCheckout({ name: 'الاشتراك الأساسي — سنوي', price: 8000, type: 'sub' })}
                      className="w-full py-4 rounded-xl font-bold border-2 border-slate-200 text-slate-700 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 transition-all group-hover:border-indigo-300"
                    >
                      اشترك الآن
                    </button>
                  </div>

                  {/* PROFESSIONAL */}
                  <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 shadow-2xl shadow-indigo-600/25 border border-indigo-500 flex flex-col relative transform md:-translate-y-4">
                    <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-amber-400 text-amber-900 px-4 py-1.5 rounded-full text-sm font-black shadow-sm flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 shrink-0" fill="currentColor" /> الأكثر شعبية
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-black text-white">الاحترافية</h3>
                      <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full">PRO</span>
                    </div>
                    <p className="text-indigo-200 font-medium mb-6">للطالب الطموح — تجربة تعليمية متكاملة</p>
                    <div className="mb-8 pb-8 border-b border-indigo-500/50">
                      <div className="flex items-end gap-2">
                        <span className="text-5xl font-black text-white">25,000</span>
                        <div className="pb-1">
                          <p className="text-indigo-200 font-bold text-sm">د.ج / سنة</p>
                          <p className="text-amber-300 text-xs font-bold">≈ 2,083 د.ج / شهر</p>
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-8 flex-1">
                      {[
                        'الوصول الكامل لجميع محتوى STEM',
                        'نظام متابعة الأولياء المتقدم',
                        'مجتمع ذكاء اصطناعي تفاعلي',
                        'وصول كامل للمكتبة الرقمية',
                        'مساعد الذكاء الاصطناعي (غير محدود)',
                        'شهادات إتمام معتمدة',
                        'الحصص المباشرة مع الأساتذة',
                        'أولوية في الدعم التقني',
                      ].map((text, i) => (
                        <li key={i} className="flex items-center gap-3 text-white font-bold">
                          <Check className="w-5 h-5 shrink-0 text-amber-400 shrink-0" />
                          <span>{text}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => openCheckout({ name: 'الاشتراك الاحترافي — سنوي', price: 25000, type: 'sub' })}
                      className="w-full py-4 rounded-xl font-black text-indigo-700 bg-white hover:bg-amber-50 transition-colors shadow-sm"
                    >
                      اشترك الآن
                    </button>
                  </div>
                </div>

                {/* Annual perks */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {[
                    { icon: ShieldCheck, title: 'ضمان 7 أيام', desc: 'استرجاع كامل للمبلغ بدون أسئلة' },
                    { icon: Infinity, title: 'وصول مدى السنة', desc: 'استخدم المنصة بلا قيود طوال العام' },
                    { icon: Clock, title: 'تحديثات مجانية', desc: 'جميع التحديثات والمحتوى الجديد مجاناً' },
                  ].map((perk, i) => (
                    <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0 border border-indigo-100">
                        <perk.icon className="w-5 h-5 shrink-0 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 mb-0.5">{perk.title}</p>
                        <p className="text-sm text-slate-500">{perk.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── PAY AS YOU GO TAB ── */}
            {activeTab === 'payasyougo' && (
              <motion.div
                key="payasyougo"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-12 max-w-2xl mx-auto">
                  <h2 className="text-3xl font-black text-slate-900 mb-4">ادفع فقط مقابل ما تستخدمه</h2>
                  <p className="text-lg text-slate-500">
                    لا اشتراكات شهرية، لا التزامات. اشتر الرصيد أو الخدمة التي تحتاجها بالضبط.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
                  {payAsYouUseItems.map((item, idx) => {
                    const colors: Record<string, string> = {
                      indigo: 'bg-indigo-50 border-indigo-200 text-indigo-600',
                      violet: 'bg-violet-50 border-violet-200 text-violet-600',
                      emerald: 'bg-emerald-50 border-emerald-200 text-emerald-600',
                      amber: 'bg-amber-50 border-amber-200 text-amber-600',
                    };
                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -6 }}
                        className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all flex flex-col"
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${colors[item.color]}`}>
                          <item.icon className="w-6 h-6 shrink-0" />
                        </div>
                        <h3 className="font-black text-slate-900 mb-2">{item.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-1">{item.desc}</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-2xl font-black text-slate-900">{item.price}</span>
                            <span className="text-slate-500 text-sm font-medium"> د.ج</span>
                          </div>
                          <button
                            onClick={() => openCheckout({ name: item.title, price: item.price, type: 'payg' })}
                            className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-indigo-600 transition-colors"
                          >
                            شراء
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Credit bundles */}
                <div className="max-w-3xl mx-auto bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-black mb-2">حزم رصيد الذكاء الاصطناعي</h3>
                    <p className="text-indigo-200 mb-8">وفّر أكثر عند شراء رصيد أكبر</p>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { credits: 200, price: 900, saving: null },
                        { credits: 500, price: 2000, saving: '11%' },
                        { credits: 1000, price: 3500, saving: '22%' },
                      ].map((bundle, i) => (
                        <button
                          key={i}
                          onClick={() => openCheckout({ name: `${bundle.credits} رصيد ذكاء اصطناعي`, price: bundle.price, type: 'credits' })}
                          className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl p-5 text-center transition-all hover:-translate-y-1"
                        >
                          {bundle.saving && (
                            <span className="inline-block px-2 py-0.5 bg-amber-400 text-amber-900 text-xs font-black rounded-full mb-2">
                              وفّر {bundle.saving}
                            </span>
                          )}
                          <p className="text-3xl font-black">{bundle.credits}</p>
                          <p className="text-indigo-200 text-sm font-medium mb-2">رصيد</p>
                          <p className="font-black text-lg">{bundle.price} <span className="text-sm font-medium">د.ج</span></p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── COURSES TAB ── */}
            {activeTab === 'courses' && (
              <motion.div
                key="courses"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-12 max-w-2xl mx-auto">
                  <h2 className="text-3xl font-black text-slate-900 mb-4">اشترِ دورتك مباشرة</h2>
                  <p className="text-lg text-slate-500">
                    الدورات المستقلة غير مشمولة في الاشتراك — ادفع مرة واحدة واحتفظ بها مدى الحياة.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {mockCourses.map((course, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -4 }}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all"
                    >
                      <div className="h-3 bg-gradient-to-r from-indigo-500 to-violet-500" />
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="font-black text-slate-900 text-lg leading-snug">{course.title}</h3>
                          <span className="shrink-0 px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-100">
                            {course.category}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-3 mb-5 text-sm text-slate-500 font-medium">
                          <span className="flex items-center gap-1.5">
                            <BarChart3 className="w-4 h-4 shrink-0" /> {course.level}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 shrink-0" /> {course.duration}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users className="w-4 h-4 shrink-0" /> {course.students.toLocaleString('en-US')} طالب
                          </span>
                          <span className="flex items-center gap-1.5 text-amber-500">
                            <Star className="w-4 h-4 shrink-0" fill="currentColor" /> {course.rating}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <div>
                            <span className="text-2xl font-black text-slate-900">{course.price.toLocaleString('en-US')}</span>
                            <span className="text-slate-500 text-sm font-medium"> د.ج</span>
                            <p className="text-xs text-emerald-600 font-bold mt-0.5">وصول مدى الحياة</p>
                          </div>
                          <button
                            onClick={() => openCheckout({ name: course.title, price: course.price, type: 'course' })}
                            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-colors shadow-sm shadow-indigo-600/20"
                          >
                            شراء الآن
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <p className="text-slate-500 font-medium mb-4">تشمل كل دورة:</p>
                  <div className="inline-flex flex-wrap gap-4 justify-center">
                    {[
                      { icon: Infinity, text: 'وصول مدى الحياة' },
                      { icon: ShieldCheck, text: 'شهادة إتمام' },
                      { icon: Library, text: 'موارد تعليمية مرفقة' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 text-sm font-bold text-slate-700">
                        <item.icon className="w-4 h-4 shrink-0 text-indigo-500" />
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-black text-slate-900 mb-12">طرق الدفع الآمنة والموثوقة</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: CreditCard, title: 'البطاقة الذهبية / CIB', desc: 'الدفع الإلكتروني الآمن محلياً', color: 'indigo' },
              { icon: Wallet, title: 'التحويل البنكي أو البريدي', desc: 'CPA, BDL أو CCP', color: 'emerald' },
              { icon: Building2, title: 'الدفع نقداً', desc: 'عبر مكاتبنا المعتمدة في ولايتك', color: 'amber' },
            ].map((method, i) => {
              const colors: Record<string, string> = {
                indigo: 'text-indigo-600 bg-indigo-50 border-indigo-100 hover:border-indigo-300 hover:bg-indigo-50/50',
                emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50/50',
                amber: 'text-amber-600 bg-amber-50 border-amber-100 hover:border-amber-300 hover:bg-amber-50/50',
              };
              return (
                <div key={i} className={`p-6 rounded-2xl border flex flex-col items-center gap-4 transition-colors ${colors[method.color]}`}>
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                    <method.icon className="w-7 h-7 shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 mb-1">{method.title}</h4>
                    <p className="text-sm text-slate-500 font-medium">{method.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">الأسئلة الشائعة</h2>
          <div className="space-y-4">
            {[
              { q: 'هل الاشتراك سنوي فقط؟', a: 'نعم، نوفر اشتراكات سنوية فقط للحصول على أفضل قيمة وتجربة تعليمية مستمرة. يمكنك أيضاً الدفع حسب الاستخدام أو شراء دورات مستقلة.' },
              { q: 'هل يمكنني استرجاع أموالي؟', a: 'نعم، نقدم ضمان استرجاع الأموال خلال أول 7 أيام من الاشتراك دون أي أسئلة.' },
              { q: 'هل الدورات مشمولة في الاشتراك؟', a: 'الدورات المستقلة غير مشمولة في الاشتراك الأساسي أو الاحترافي. يمكن شراؤها بشكل منفصل أو عبر نموذج الدفع حسب الاستخدام.' },
              { q: 'كيف يعمل نموذج "ادفع حسب الاستخدام"؟', a: 'تشتري رصيداً أو خدمة محددة (ملخص، مشروع STEM، حصة مباشرة) وتدفع فقط مقابل ما تستخدمه بالفعل.' },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h4 className="text-lg font-bold text-slate-900 mb-2">{faq.q}</h4>
                <p className="text-slate-600 font-medium leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && selectedPlan && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCheckout}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white rounded-[2rem] shadow-2xl z-50 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="font-black text-slate-900 text-xl">إتمام الطلب</h3>
                <button onClick={closeCheckout} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-500 transition-colors">
                  <X className="w-5 h-5 shrink-0" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto">
                {/* Steps */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-black ${checkoutStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>1</div>
                  <div className={`h-1 flex-1 rounded-full ${checkoutStep >= 2 ? 'bg-indigo-600' : 'bg-slate-100'}`} />
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-black ${checkoutStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>2</div>
                </div>

                {checkoutStep === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 mb-8">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-sm font-bold text-slate-500 mb-1">العنصر</p>
                          <h4 className="font-black text-slate-900">{selectedPlan.name}</h4>
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-bold text-slate-500 mb-1">السعر</p>
                          <p className="font-black text-slate-900">{selectedPlan.price > 0 ? `${selectedPlan.price.toLocaleString('en-US')} د.ج` : 'مجاناً'}</p>
                        </div>
                      </div>
                      <div className="border-t border-slate-200 pt-4 mt-4 flex justify-between items-center">
                        <span className="font-bold text-slate-700">المجموع النهائي:</span>
                        <span className="text-xl font-black text-indigo-600">{selectedPlan.price > 0 ? `${selectedPlan.price.toLocaleString('en-US')} د.ج` : 'مجاناً'}</span>
                      </div>
                    </div>

                    <h4 className="font-black text-slate-900 mb-4">اختر طريقة الدفع</h4>
                    <div className="grid gap-3">
                      <button onClick={() => setPaymentMethod('edahabia')} className={`flex items-center gap-4 p-4 rounded-xl border-2 text-right transition-all ${paymentMethod === 'edahabia' ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-200 hover:border-slate-300'}`}>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === 'edahabia' ? 'border-indigo-600' : 'border-slate-300'}`}>
                          {paymentMethod === 'edahabia' && <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />}
                        </div>
                        <CreditCard className="w-6 h-6 shrink-0 text-slate-700" />
                        <div>
                          <p className="font-bold text-slate-900">البطاقة الذهبية / CIB</p>
                          <p className="text-xs font-medium text-slate-500">تفعيل فوري للاشتراك</p>
                        </div>
                      </button>
                      <button onClick={() => setPaymentMethod('cash')} className={`flex items-center gap-4 p-4 rounded-xl border-2 text-right transition-all ${paymentMethod === 'cash' ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-200 hover:border-slate-300'}`}>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === 'cash' ? 'border-indigo-600' : 'border-slate-300'}`}>
                          {paymentMethod === 'cash' && <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />}
                        </div>
                        <Building2 className="w-6 h-6 shrink-0 text-slate-700" />
                        <div>
                          <p className="font-bold text-slate-900">الدفع نقداً أو CCP</p>
                          <p className="text-xs font-medium text-slate-500">تحويل بريدي أو دفع مادي (يتطلب تأكيد يدوي)</p>
                        </div>
                      </button>
                    </div>
                    <button onClick={() => setCheckoutStep(2)} className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2">
                      متابعة الدفع <ChevronRight className="w-5 h-5 shrink-0 rotate-180" />
                    </button>
                  </motion.div>
                )}

                {checkoutStep === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    {paymentMethod === 'edahabia' ? (
                      <div className="space-y-4">
                        <div className="bg-slate-100 rounded-xl p-4 flex items-start gap-3 mb-6">
                          <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
                          <p className="text-sm font-medium text-slate-700">بوابة دفع تجريبية آمنة. أدخل معلومات بطاقتك.</p>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-1.5">رقم البطاقة</label>
                          <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:bg-white transition-colors" dir="ltr" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">تاريخ الانتهاء</label>
                            <input type="text" placeholder="MM/YY" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:bg-white transition-colors" dir="ltr" />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">رمز CVC</label>
                            <input type="text" placeholder="123" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:bg-white transition-colors" dir="ltr" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4 text-center">
                        <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mx-auto mb-4 border border-amber-100">
                          <Wallet className="w-6 h-6 shrink-0" />
                        </div>
                        <h4 className="font-black text-slate-900 mb-2">تعليمات الدفع عبر CCP</h4>
                        <p className="text-slate-600 font-medium mb-6">حوّل المبلغ <strong>{selectedPlan.price?.toLocaleString('en-US')} د.ج</strong> إلى الحساب البريدي:</p>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left w-full max-w-sm mx-auto" dir="ltr">
                          <p className="text-slate-500 font-bold text-sm mb-1">Account Number</p>
                          <p className="text-2xl font-black text-slate-900 mb-4">0000 1234 5678</p>
                          <p className="text-slate-500 font-bold text-sm mb-1">Key (Clé)</p>
                          <p className="font-black text-slate-900">45</p>
                        </div>
                        <p className="text-sm font-bold text-slate-500">بعد التحويل، ارفع وصل الدفع من لوحة التحكم.</p>
                      </div>
                    )}
                    <div className="flex gap-3 mt-8">
                      <button onClick={() => setCheckoutStep(1)} className="px-6 py-4 rounded-xl font-bold border-2 border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors">
                        رجوع
                      </button>
                      <button onClick={() => { alert('تمت العملية بنجاح!'); closeCheckout(); }} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg">
                        {paymentMethod === 'edahabia' ? 'تأكيد الدفع' : 'تأكيد الطلب'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
