"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Upload, Plus, X, Save, HelpCircle, Lightbulb, Wrench, Rocket, Bot, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useToast } from "@/components/providers/ToastProvider";

interface FourMatSection {
  why: string;
  what: string;
  how: string;
  whatif: string;
}

const fourMatBlocks = [
  {
    key: "why" as keyof FourMatSection,
    icon: HelpCircle,
    arabic: "لماذا؟",
    english: "WHY",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-600",
    placeholder: "اشرح لماذا هذا الموضوع مهم وما الفائدة منه للطالب. ما الذي سيحفزه على التعلم؟",
    desc: "الدافعية والتحفيز — أثِر فضول الطالب",
  },
  {
    key: "what" as keyof FourMatSection,
    icon: Lightbulb,
    arabic: "ماذا؟",
    english: "WHAT",
    color: "from-indigo-500 to-violet-500",
    bg: "bg-indigo-50 border-indigo-200",
    iconColor: "text-indigo-600",
    placeholder: "قدّم المحتوى المعرفي والمفاهيم الأساسية للموضوع. ما المعلومات التي يحتاج الطالب أن يعرفها؟",
    desc: "المعرفة النظرية — المحتوى والمفاهيم",
  },
  {
    key: "how" as keyof FourMatSection,
    icon: Wrench,
    arabic: "كيف؟",
    english: "HOW",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50 border-emerald-200",
    iconColor: "text-emerald-600",
    placeholder: "أوضح كيفية تطبيق ما تعلّمه الطالب بشكل عملي. ما الخطوات والتمارين التطبيقية؟",
    desc: "التطبيق العملي — الممارسة والتجريب",
  },
  {
    key: "whatif" as keyof FourMatSection,
    icon: Rocket,
    arabic: "ماذا لو؟",
    english: "WHAT IF",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50 border-violet-200",
    iconColor: "text-violet-600",
    placeholder: "شجّع الطالب على التفكير النقدي والإبداعي. ماذا لو غيّرنا هذا أو ذاك؟ كيف يمكن توظيف المعرفة بطرق جديدة؟",
    desc: "التفكير النقدي — الإبداع والتوسع",
  },
];

export default function NewCoursePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [lessons, setLessons] = useState([{ title: "", duration: "" }]);
  const [fourMat, setFourMat] = useState<FourMatSection>({ why: "", what: "", how: "", whatif: "" });
  const [openSection, setOpenSection] = useState<keyof FourMatSection | null>("why");
  const [aiLoading, setAiLoading] = useState<keyof FourMatSection | null>(null);

  const addLesson = () => setLessons([...lessons, { title: "", duration: "" }]);
  const removeLesson = (i: number) => setLessons(lessons.filter((_, idx) => idx !== i));

  const handleFourMatChange = (key: keyof FourMatSection, value: string) => {
    setFourMat((prev) => ({ ...prev, [key]: value }));
  };

  const handleAiAssist = (key: keyof FourMatSection) => {
    setAiLoading(key);
    setTimeout(() => {
      const suggestions: Record<keyof FourMatSection, string> = {
        why: "يعدّ هذا الموضوع ركيزة أساسية لفهم المفاهيم المتقدمة في هذا المجال. إتقانه يفتح للطالب أبواب التميز الأكاديمي والمهني مستقبلاً.",
        what: "يتناول هذا الدرس المفاهيم الجوهرية التي تشكّل بنية المادة، مع التركيز على التعريفات الدقيقة والقواعد الأساسية.",
        how: "طبّق ما تعلّمته من خلال حل تمارين متدرجة الصعوبة، ابدأ بالأمثلة البسيطة ثم انتقل تدريجياً للتطبيقات الأكثر تعقيداً.",
        whatif: "تخيّل كيف يمكن تطبيق هذه المفاهيم في سياقات جديدة: كيف ستتغير النتائج لو عدّلنا المتغيرات الأساسية؟",
      };
      setFourMat((prev) => ({ ...prev, [key]: suggestions[key] }));
      setAiLoading(null);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast("تم إنشاء الدورة بنجاح!", "success");
    setTimeout(() => router.push("/teacher/courses"), 1000);
  };

  const filledCount = Object.values(fourMat).filter((v) => v.trim().length > 0).length;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-2">
          <BookOpen className="w-5 h-5 shrink-0 text-indigo-600" />
          إنشاء دورة جديدة
        </h1>
        <p className="text-slate-500">أضف دورتك التعليمية مع تفاصيلها ودروسها وإطار 4MAT التعليمي</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6">
          <h2 className="text-lg font-bold text-slate-900 mb-2">معلومات الدورة</h2>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">عنوان الدورة</label>
            <input
              required
              className="w-full rounded-xl border border-slate-200 py-3 px-4 text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors"
              placeholder="مثال: أساسيات البرمجة"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">الوصف</label>
            <textarea
              rows={4}
              required
              className="w-full rounded-xl border border-slate-200 py-3 px-4 text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors resize-none"
              placeholder="وصف مختصر عن محتوى الدورة"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">التصنيف</label>
              <select className="w-full rounded-xl border border-slate-200 py-3 px-4 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500">
                <option>برمجة</option>
                <option>رياضيات</option>
                <option>علوم</option>
                <option>لغات</option>
                <option>STEM</option>
                <option>تطوير ذاتي</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">المستوى</label>
              <select className="w-full rounded-xl border border-slate-200 py-3 px-4 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500">
                <option>مبتدئ</option>
                <option>متوسط</option>
                <option>متقدم</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">السعر (د.ج)</label>
              <input
                type="number"
                className="w-full rounded-xl border border-slate-200 py-3 px-4 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="0 = مجاني"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">صورة الغلاف</label>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center cursor-pointer hover:border-indigo-400 transition-colors group">
              <Upload className="w-6 h-6 shrink-0 text-slate-400 group-hover:text-indigo-500 mx-auto mb-2 transition-colors" />
              <p className="text-sm text-slate-500">اسحب الصورة هنا أو انقر للرفع</p>
            </div>
          </div>
        </div>

        {/* Lessons */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">الدروس</h2>
            <button
              type="button"
              onClick={addLesson}
              className="flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4 shrink-0" />
              إضافة درس
            </button>
          </div>
          <div className="space-y-3">
            {lessons.map((_, i) => (
              <div key={i} className="flex gap-3 items-center">
                <span className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-sm font-bold text-indigo-600 shrink-0 border border-indigo-100">
                  {i + 1}
                </span>
                <input
                  placeholder="عنوان الدرس"
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 px-4 text-sm bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  placeholder="المدة (مثال: 30 دقيقة)"
                  className="w-36 rounded-xl border border-slate-200 py-2.5 px-4 text-sm bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {lessons.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLesson(i)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 shrink-0" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════ 4MAT FRAMEWORK ═══════════ */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="p-8 pb-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-black">4M</span>
                  </div>
                  إطار 4MAT التعليمي
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  بنيّة الدرس وفق منهجية 4MAT لضمان تجربة تعلّم شاملة ومتوازنة
                </p>
              </div>
              <div className="shrink-0">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex gap-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${
                          i < filledCount ? 'bg-indigo-500' : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-500">{filledCount}/4</span>
                </div>
              </div>
            </div>

            {/* Step overview */}
            <div className="grid grid-cols-4 gap-2 my-6">
              {fourMatBlocks.map((block) => (
                <button
                  key={block.key}
                  type="button"
                  onClick={() => setOpenSection(openSection === block.key ? null : block.key)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all ${
                    openSection === block.key
                      ? `${block.bg} shadow-sm`
                      : 'border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  <block.icon className={`w-5 h-5 shrink-0 ${block.iconColor}`} />
                  <span className="text-xs font-black text-slate-800">{block.arabic}</span>
                  <span className={`text-[10px] font-bold ${fourMat[block.key] ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {fourMat[block.key] ? '✓ مكتمل' : 'فارغ'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="px-8 pb-8 space-y-3">
            {fourMatBlocks.map((block) => (
              <div key={block.key} className={`rounded-2xl border overflow-hidden transition-all ${block.bg}`}>
                <button
                  type="button"
                  onClick={() => setOpenSection(openSection === block.key ? null : block.key)}
                  className="w-full flex items-center justify-between p-4 text-right"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${block.color} flex items-center justify-center shadow-sm`}>
                      <block.icon className="w-5 h-5 shrink-0 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900 text-base">{block.arabic}</span>
                        <span className={`text-xs font-black px-2 py-0.5 rounded-md bg-gradient-to-r ${block.color} text-white`}>
                          {block.english}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">{block.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {fourMat[block.key] && (
                      <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                    )}
                    {openSection === block.key
                      ? <ChevronUp className="w-4 h-4 shrink-0 text-slate-400" />
                      : <ChevronDown className="w-4 h-4 shrink-0 text-slate-400" />
                    }
                  </div>
                </button>

                <AnimatePresence>
                  {openSection === block.key && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-3">
                        <div className="relative">
                          <textarea
                            value={fourMat[block.key]}
                            onChange={(e) => handleFourMatChange(block.key, e.target.value)}
                            rows={4}
                            placeholder={block.placeholder}
                            className="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-400 resize-none transition-all"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleAiAssist(block.key)}
                            disabled={aiLoading === block.key}
                            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 text-xs font-bold rounded-lg transition-all disabled:opacity-60"
                          >
                            <Bot className={`w-3.5 h-3.5 shrink-0 ${aiLoading === block.key ? 'animate-spin' : ''}`} />
                            {aiLoading === block.key ? 'جارٍ التوليد...' : 'مساعدة الذكاء الاصطناعي'}
                          </button>
                          <button
                            type="button"
                            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-500 text-xs font-bold rounded-lg transition-all"
                          >
                            <Upload className="w-3.5 h-3.5 shrink-0" />
                            رفع ملف
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 flex items-center gap-2 transition-colors shadow-sm shadow-indigo-600/20"
          >
            <Save className="w-4 h-4 shrink-0" />
            حفظ الدورة
          </button>
        </div>
      </form>
    </div>
  );
}
