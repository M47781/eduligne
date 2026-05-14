import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

import { PlayCircle, CheckCircle2, Star, Clock, Users, FileText, ArrowRight, Play, BookOpen, Lock } from 'lucide-react';

export default function CourseDetails() {
  const { id } = useParams();

  // Mock data based on ID
  const course = {
    id,
    title: 'تطوير تطبيقات الويب الحديثة',
    instructor: 'د. سارة علي',
    rating: 4.9,
    students: 850,
    duration: '20 ساعة',
    price: '2500 د.ج',
    category: 'برمجة',
    level: 'متقدم',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
    description: 'تعلم كيفية بناء تطبيقات ويب حديثة وسريعة ومتجاوبة باستخدام أحدث التقنيات وتميز في سوق العمل. هذه الدورة تغطي الأساسيات وحتى المفاهيم المتقدمة.',
    lessons: [
      { id: 1, title: 'مقدمة عن الدورة وماذا ستتعلم', duration: '10:00', completed: true, isLocked: false },
      { id: 2, title: 'إعداد بيئة التطوير المثالية', duration: '15:30', completed: true, isLocked: false },
      { id: 3, title: 'الأساسيات والمفاهيم الأولية', duration: '20:45', completed: false, isLocked: false },
      { id: 4, title: 'التصميم المتجاوب المتقدم', duration: '25:10', completed: false, isLocked: true },
      { id: 5, title: 'إدارة حالة التطبيق بفعالية', duration: '30:00', completed: false, isLocked: true },
      { id: 6, title: 'تحسين الأداء وتسريع التحميل', duration: '18:20', completed: false, isLocked: true },
      { id: 7, title: 'الاختبار والنشر النهائي', duration: '22:15', completed: false, isLocked: true },
    ]
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      {/* Back Button */}
      <Link href="/student/courses" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors">
        <ArrowRight   className="w-5 h-5 shrink-0"/>
        العودة إلى الدورات
      </Link>

      {/* Hero Section */}
      <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
        <div className="absolute inset-0 z-0">
          <Image  src={course.image} alt={course.title} className="w-full h-full object-cover opacity-40 mix-blend-overlay" referrerPolicy="no-referrer" width={500} height={500} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row gap-10 items-center justify-between">
            <div className="flex-1 text-white">
                <div className="flex gap-3 mb-6">
                    <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-lg text-sm font-bold backdrop-blur-md">
                        {course.category}
                    </span>
                    <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-lg text-sm font-bold backdrop-blur-md">
                        {course.level}
                    </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">{course.title}</h1>
                <p className="text-xl text-slate-300 mb-8 max-w-3xl leading-relaxed">{course.description}</p>
                
                <div className="flex flex-wrap items-center gap-6 text-slate-300 font-medium">
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                    <Image  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.instructor}`} alt={course.instructor} className="w-8 h-8 rounded-full bg-slate-100" width={500} height={500} />
                    <span>أ. {course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <Star  fill="currentColor"  className="w-5 h-5 shrink-0"/>
                    <span>{course.rating}</span>
                    <span className="text-slate-400 font-normal">({course.students.toLocaleString('en-US')})</span>
                  </div>
                </div>
            </div>
            
            <div className="w-full md:w-80 shrink-0">
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100/10 text-center">
                    <h3 className="text-slate-500 font-bold text-sm mb-2">سعر الدورة</h3>
                    <div className="text-4xl font-black justify-center text-slate-900 mb-6 flex items-baseline gap-1">
                        {course.price.split(' ')[0]} 
                        <span className="text-lg text-slate-500">{course.price.split(' ')[1]}</span>
                    </div>
                    
                    <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-indigo-200 mb-4 flex items-center justify-center gap-2">
                        <CheckCircle2   className="w-6 h-6 shrink-0"/> اشترك الآن
                    </button>
                    <p className="text-sm text-slate-500 font-medium">ضمان استرداد الأموال لمدة 14 يوم</p>
                </div>
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* About */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 shrink-0 text-indigo-600" /> عن الدورة
            </h2>
            <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 text-lg leading-relaxed mb-4">{course.description}</p>
                <p className="text-slate-600 text-lg leading-relaxed">
                  ستتعلم في هذه الدورة كيفية إنشاء تطبيقات تفاعلية من الصفر. المنهج يعتمد بالكامل على التطبيق العملي وبناء مشاريع حقيقية لتكون جاهزاً لسوق العمل بمجرد اتمامك الدروس بنجاح.
                </p>
            </div>
          </div>

          {/* Lessons List */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                  <PlayCircle className="w-5 h-5 shrink-0 text-indigo-600" /> محتوى الدورة
               </h2>
               <div className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
                  {course.lessons.length} دروس مجدولة
               </div>
            </div>
            
            <div className="space-y-3">
              {course.lessons.map((lesson, idx) => (
                <div 
                  key={lesson.id} 
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border transition-all ${
                    lesson.completed 
                      ? 'bg-slate-50 border-slate-200' 
                      : lesson.isLocked 
                        ? 'bg-white border-slate-100 opacity-60'
                        : 'bg-indigo-50/50 border-indigo-100 hover:border-indigo-300 cursor-pointer shadow-sm'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-3 sm:mb-0">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                      lesson.completed ? 'bg-emerald-100 text-emerald-600 border border-emerald-200' 
                      : lesson.isLocked ? 'bg-slate-100 text-slate-400 border border-slate-200'
                      : 'bg-indigo-600 text-white'
                    }`}>
                      {lesson.completed ? <CheckCircle2   className="w-6 h-6 shrink-0"/> : lesson.isLocked ? <Lock   className="w-5 h-5 shrink-0"/> : <Play  className="w-5 h-5 shrink-0 ml-1" />}
                    </div>
                    <div>
                      <p className={`font-bold text-lg mb-1 leading-tight ${lesson.completed ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                        {idx + 1}. {lesson.title}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                         <Clock  className="w-4 h-4 shrink-0 text-slate-400" />
                         {lesson.duration} دقيقة
                      </div>
                    </div>
                  </div>
                  
                  {!lesson.completed && !lesson.isLocked && (
                    <button className="sm:hidden lg:flex w-full sm:w-auto mt-2 sm:mt-0 justify-center bg-indigo-100 text-indigo-700 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-200 transition-colors">
                      تشغيل الآن
                    </button>
                  )}
                  {lesson.isLocked && (
                     <div className="sm:hidden lg:block text-slate-400 text-sm font-bold flex items-center justify-center sm:justify-end gap-1 mt-2 sm:mt-0">
                        محتوى مقفل
                     </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
           {/* Course Meta Info */}
           <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-2 gap-4">
               <div className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                  <Clock  className="w-6 h-6 shrink-0 text-amber-500 mb-2" />
                  <span className="text-slate-900 font-bold text-lg">{course.duration}</span>
                  <span className="text-slate-500 text-xs font-bold">المدة الإجمالية</span>
               </div>
               <div className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                  <Users  className="w-6 h-6 shrink-0 text-indigo-500 mb-2" />
                  <span className="text-slate-900 font-bold text-lg">{course.students.toLocaleString()}</span>
                  <span className="text-slate-500 text-xs font-bold">طالب مسجل</span>
               </div>
               <div className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center justify-center text-center col-span-2">
                  <FileText  className="w-6 h-6 shrink-0 text-emerald-500 mb-2" />
                  <span className="text-slate-900 font-bold text-lg">شهادة إتمام</span>
                  <span className="text-slate-500 text-xs font-bold">تمنح للمجتازين بنجاح</span>
               </div>
           </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
            <h3 className="font-black text-slate-900 mb-6 text-xl">ماذا ستتعلم؟</h3>
            <ul className="space-y-4">
              {[
                'بناء واجهات مستخدم تفاعلية وجذابة',
                'فهم مكونات الويب الحديثة بشكل عميق',
                'إدارة حالة التطبيق (State Management)',
                'التعامل مع واجهات برمجة التطبيقات (APIs)',
                'استراتيجيات نشر التطبيق على الإنترنت'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="bg-emerald-100 text-emerald-600 rounded-full p-1 shrink-0 mt-0.5">
                     <CheckCircle2   className="w-4 h-4 shrink-0"/>
                  </div>
                  <span className="text-slate-700 font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Instructor Brief */}
           <div className="bg-indigo-600 p-6 md:p-8 rounded-3xl shadow-lg relative overflow-hidden text-center flex flex-col items-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full mix-blend-screen -translate-y-1/2 translate-x-1/2"></div>
              
              <Image  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.instructor}`} alt={course.instructor} className="w-20 h-20 rounded-full bg-indigo-300 border-4 border-indigo-400 mb-4 relative z-10" width={500} height={500} />
              <h3 className="text-white font-black text-xl mb-1 relative z-10">أ. {course.instructor}</h3>
              <p className="text-indigo-200 font-medium text-sm mb-4 relative z-10">خبير الويب ومدرب معتمد</p>
              
              <button className="bg-white/20 hover:bg-white/30 text-white w-full py-3 rounded-xl font-bold transition-colors backdrop-blur-sm relative z-10">
                 عرض الملف الشخصي
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

