"use client";

import Image from 'next/image';
import { Target, Lightbulb, MapPin, Phone, Facebook, Instagram, Rss, Award, BookOpen, Users } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-6">من نحن</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            تعرف على قصة Eduligne، رؤيتنا، ومؤسسة المنصة.
          </p>
        </div>
      </div>

      {/* Intro */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-bold rounded-full mb-4 border border-indigo-100">
                منصة تعليمية جزائرية
              </span>
              <h2 className="text-3xl font-black text-slate-900 mb-6">منصة Eduligne التعليمية</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                نحن منصة تعليمية جزائرية رائدة تأسست من برج الكيفان — الجزائر، بهدف إحداث ثورة في مجال التعليم الرقمي. نؤمن بأن التعليم يجب أن يكون متاحاً، ممتعاً، وفعالاً للجميع.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                من خلال دمج أحدث تقنيات الذكاء الاصطناعي مع مناهج STEM المبتكرة ومنهجية 4MAT التعليمية، نقدم تجربة فريدة تلبي احتياجات الطلاب في مختلف المراحل الدراسية.
              </p>

              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { icon: BookOpen, label: 'دورة تعليمية', value: '+120' },
                  { icon: Users, label: 'متعلم نشط', value: '10K+' },
                  { icon: Award, label: 'شهادة ممنوحة', value: '+500' },
                ].map((stat, idx) => (
                  <div key={idx} className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <stat.icon className="w-6 h-6 shrink-0 text-indigo-600 mx-auto mb-2" />
                    <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Image
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Education"
                className="rounded-2xl shadow-lg"
                referrerPolicy="no-referrer"
                width={500}
                height={500}
              />
              <Image
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Learning"
                className="rounded-2xl shadow-lg mt-8"
                referrerPolicy="no-referrer"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="bg-indigo-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-indigo-100">
                <Lightbulb className="w-7 h-7 shrink-0 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">رؤيتنا</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                أن نكون المنصة التعليمية الأولى في العالم العربي التي تساهم في بناء جيل مبتكر ومبدع، قادر على مواجهة تحديات المستقبل من خلال تعليم رقمي متطور وشامل.
              </p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="bg-violet-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-violet-100">
                <Target className="w-7 h-7 shrink-0 text-violet-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">رسالتنا</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                توفير بيئة تعليمية تفاعلية وآمنة، تمكن الطلاب من اكتساب المعرفة والمهارات اللازمة بطرق حديثة، وتدعم المعلمين بأدوات متطورة لتقديم أفضل ما لديهم.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ FOUNDER SECTION ════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-amber-50 text-amber-700 text-sm font-bold rounded-full border border-amber-200 mb-4">
              مؤسسة المنصة
            </span>
            <h2 className="text-3xl font-black text-slate-900">الرائدة التي أشعلت شمعة Eduligne</h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Glow background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-violet-600/5 to-amber-500/10 rounded-[2.5rem] blur-xl scale-95" />

            <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-[2rem] p-8 md:p-14 overflow-hidden border border-indigo-800/30">
              {/* Background decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.15),transparent_60%)]" />

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-16">
                {/* Avatar */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="shrink-0"
                >
                  <div className="relative">
                    {/* Glow ring */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-amber-500 rounded-full blur-md opacity-50 scale-110" />
                    <div className="relative w-44 h-44 rounded-full p-1 bg-gradient-to-br from-indigo-500 via-violet-500 to-amber-500">
                      <div className="w-full h-full rounded-full overflow-hidden bg-slate-800 border-2 border-white/10">
                        <Image
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=SarahSahrawi&backgroundColor=e2e8f0&clothingGraphic=bear"
                          alt="سارة صحراوي"
                          width={176}
                          height={176}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    {/* Badge */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-xs font-black whitespace-nowrap shadow-lg">
                      المؤسِّسة
                    </div>
                  </div>
                </motion.div>

                {/* Content */}
                <div className="flex-1 text-center md:text-right">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-1">
                      سارة صحراوي
                    </h3>
                    <p className="text-indigo-300 font-bold text-lg mb-6">
                      مؤسِّسة منصة Eduligne — الجزائر
                    </p>

                    {/* Quote */}
                    <blockquote className="relative mb-8">
                      <div className="text-5xl text-indigo-400/30 font-serif leading-none mb-2 select-none">"</div>
                      <p className="text-slate-300 text-lg leading-relaxed -mt-6">
                        آمنت بأن كل طفل جزائري يستحق تعليماً عالي الجودة، ذكياً وتفاعلياً. لذلك أسّست Eduligne لتكون الجسر بين أحلام أبنائنا وعلوم المستقبل.
                      </p>
                      <div className="text-5xl text-indigo-400/30 font-serif leading-none mt-2 text-left select-none">"</div>
                    </blockquote>

                    {/* Info pills */}
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-8">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white text-sm font-medium rounded-xl border border-white/10 backdrop-blur-sm">
                        <MapPin className="w-4 h-4 shrink-0 text-indigo-400" />
                        برج الكيفان — الجزائر
                      </span>
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white text-sm font-medium rounded-xl border border-white/10 backdrop-blur-sm">
                        <BookOpen className="w-4 h-4 shrink-0 text-amber-400" />
                        خبيرة تربوية في STEM
                      </span>
                    </div>

                    {/* Social links */}
                    <div className="flex gap-3 justify-center md:justify-start">
                      <a
                        href="https://www.facebook.com/eduligne.dz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 text-slate-300 hover:bg-indigo-600 hover:text-white transition-all duration-200 border border-white/10"
                        aria-label="Facebook"
                      >
                        <Facebook className="w-4 h-4 shrink-0" />
                      </a>
                      <a
                        href="https://www.instagram.com/eduligne.dz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 text-slate-300 hover:bg-pink-600 hover:text-white transition-all duration-200 border border-white/10"
                        aria-label="Instagram"
                      >
                        <Instagram className="w-4 h-4 shrink-0" />
                      </a>
                      <a
                        href="https://eduligne.blogspot.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 text-slate-300 hover:bg-orange-500 hover:text-white transition-all duration-200 border border-white/10"
                        aria-label="Blogger"
                      >
                        <Rss className="w-4 h-4 shrink-0" />
                      </a>
                      <a
                        href="tel:+213550000000"
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 text-slate-300 hover:bg-emerald-600 hover:text-white transition-all duration-200 border border-white/10"
                        aria-label="Phone"
                      >
                        <Phone className="w-4 h-4 shrink-0" />
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-12">شركاء النجاح</h2>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="text-2xl font-bold text-slate-400">Google for Education</div>
            <div className="text-2xl font-bold text-slate-400">Microsoft</div>
            <div className="text-2xl font-bold text-slate-400">Coursera</div>
            <div className="text-2xl font-bold text-slate-400">EdX</div>
          </div>
        </div>
      </section>
    </div>
  );
}
