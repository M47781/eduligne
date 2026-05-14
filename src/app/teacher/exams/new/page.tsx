"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Plus, X, Save, Clock, Users, Calendar, Bell, CheckCircle2, Eye } from "lucide-react";
import { motion } from "motion/react";
import { useToast } from "@/components/providers/ToastProvider";

type PublishMode = 'draft' | 'scheduled' | 'immediate';

export default function NewExamPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [questions, setQuestions] = useState([{ text: "", options: ["", "", "", ""], correct: 0 }]);
  const [publishMode, setPublishMode] = useState<PublishMode>('immediate');
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [deadline, setDeadline] = useState('');

  const addQuestion = () => setQuestions([...questions, { text: "", options: ["", "", "", ""], correct: 0 }]);
  const removeQuestion = (i: number) => setQuestions(questions.filter((_, idx) => idx !== i));

  const availableGroups = [
    'السنة الأولى ثانوي',
    'السنة الثانية ثانوي',
    'السنة الثالثة ثانوي',
    'نادي البرمجة',
    'المجموعة أ',
    'المجموعة ب',
    'جميع الطلاب',
  ];

  const toggleGroup = (group: string) => {
    setSelectedGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedGroups.length === 0) {
      toast('يرجى اختيار مجموعة واحدة على الأقل', 'error' as any);
      return;
    }
    const msg =
      publishMode === 'immediate'
        ? 'تم نشر الاختبار وإشعار الطلاب فوراً!'
        : publishMode === 'scheduled'
        ? `تم جدولة الاختبار بنجاح! سيُرسل للطلاب في ${scheduledDate} الساعة ${scheduledTime}`
        : 'تم حفظ الاختبار كمسودة.';
    toast(msg, 'success');
    setTimeout(() => router.push("/teacher/dashboard"), 1200);
  };

  const publishModeConfig = {
    immediate: { icon: Bell, label: 'نشر فوري', desc: 'يُرسل للطلاب المحددين فور الحفظ مع إشعار فوري', color: 'border-emerald-400 bg-emerald-50 text-emerald-700' },
    scheduled: { icon: Calendar, label: 'جدولة', desc: 'حدّد تاريخاً ووقتاً لنشر الاختبار تلقائياً', color: 'border-indigo-400 bg-indigo-50 text-indigo-700' },
    draft: { icon: Eye, label: 'حفظ كمسودة', desc: 'حفظ الاختبار بدون نشر — يمكنك نشره لاحقاً', color: 'border-slate-300 bg-slate-50 text-slate-600' },
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-2">
          <FileText className="w-5 h-5 shrink-0 text-indigo-600" />
          إنشاء اختبار جديد
        </h1>
        <p className="text-slate-500">إنشاء الاختبارات متاح للأساتذة فقط — حدّد المجموعة المستهدفة وطريقة النشر</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-5">
          <h2 className="font-bold text-slate-900 text-lg">معلومات الاختبار</h2>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">عنوان الاختبار</label>
            <input
              required
              className="w-full rounded-xl border border-slate-200 py-3 px-4 text-slate-900 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="مثال: اختبار منتصف الفصل — الرياضيات"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">المدة (دقائق)</label>
              <div className="relative">
                <Clock className="w-4 h-4 shrink-0 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="number"
                  defaultValue={30}
                  className="w-full rounded-xl border border-slate-200 py-3 pl-4 pr-10 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">درجة النجاح (%)</label>
              <input
                type="number"
                defaultValue={60}
                className="w-full rounded-xl border border-slate-200 py-3 px-4 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">الموعد النهائي للتسليم (اختياري)</label>
            <div className="relative">
              <Calendar className="w-4 h-4 shrink-0 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full rounded-xl border border-slate-200 py-3 pl-4 pr-10 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Target Groups */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 shrink-0 text-indigo-600" />
            <h2 className="font-bold text-slate-900 text-lg">المجموعات المستهدفة</h2>
          </div>
          <p className="text-slate-500 text-sm mb-5">اختر الفصول أو المجموعات التي ستتلقى هذا الاختبار</p>
          <div className="flex flex-wrap gap-2">
            {availableGroups.map((group) => (
              <button
                key={group}
                type="button"
                onClick={() => toggleGroup(group)}
                className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${
                  selectedGroups.includes(group)
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600'
                }`}
              >
                {selectedGroups.includes(group) && <CheckCircle2 className="w-3.5 h-3.5 shrink-0 inline ml-1.5" />}
                {group}
              </button>
            ))}
          </div>
          {selectedGroups.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 p-3 bg-indigo-50 rounded-xl border border-indigo-100 text-sm font-medium text-indigo-700"
            >
              تم اختيار {selectedGroups.length} مجموعة: {selectedGroups.join('، ')}
            </motion.div>
          )}
        </div>

        {/* Questions */}
        {questions.map((q, qi) => (
          <div key={qi} className="bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <span className="w-7 h-7 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-xs font-black">
                  {qi + 1}
                </span>
                السؤال {qi + 1}
              </h3>
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(qi)}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 shrink-0" />
                </button>
              )}
            </div>
            <input
              placeholder="نص السؤال"
              className="w-full rounded-xl border border-slate-200 py-3 px-4 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900"
            />
            <div className="space-y-2">
              {q.options.map((_, oi) => (
                <div key={oi} className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`correct_${qi}`}
                      defaultChecked={oi === 0}
                      className="accent-indigo-600 w-4 h-4"
                      title="الإجابة الصحيحة"
                    />
                    <span className="text-xs text-slate-400 font-bold w-4">
                      {String.fromCharCode(65 + oi)}
                    </span>
                  </div>
                  <input
                    placeholder={`الخيار ${oi + 1}`}
                    className="flex-1 rounded-xl border border-slate-200 py-2.5 px-4 text-sm bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
              اختر الزر المجاور لتحديد الإجابة الصحيحة
            </p>
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-sm font-bold text-slate-500 hover:border-indigo-400 hover:text-indigo-600 flex items-center justify-center gap-2 transition-colors bg-white"
        >
          <Plus className="w-4 h-4 shrink-0" />
          إضافة سؤال
        </button>

        {/* Publish Mode */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8">
          <h2 className="font-bold text-slate-900 text-lg mb-5 flex items-center gap-2">
            <Bell className="w-5 h-5 shrink-0 text-indigo-600" />
            طريقة النشر والإشعار
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(Object.keys(publishModeConfig) as PublishMode[]).map((mode) => {
              const cfg = publishModeConfig[mode];
              const Icon = cfg.icon;
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setPublishMode(mode)}
                  className={`p-4 rounded-2xl border-2 text-right transition-all ${
                    publishMode === mode ? cfg.color + ' shadow-sm' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0 mb-2" />
                  <p className="font-black text-sm mb-1">{cfg.label}</p>
                  <p className="text-xs opacity-70 leading-relaxed">{cfg.desc}</p>
                </button>
              );
            })}
          </div>

          {publishMode === 'scheduled' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-5 grid grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">تاريخ النشر</label>
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  required={publishMode === 'scheduled'}
                  className="w-full rounded-xl border border-slate-200 py-3 px-4 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">وقت النشر</label>
                <input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  required={publishMode === 'scheduled'}
                  className="w-full rounded-xl border border-slate-200 py-3 px-4 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50"
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 flex items-center gap-2 transition-colors shadow-sm shadow-indigo-600/20"
          >
            <Save className="w-4 h-4 shrink-0" />
            {publishMode === 'draft' ? 'حفظ كمسودة' : publishMode === 'scheduled' ? 'جدولة الاختبار' : 'نشر الاختبار فوراً'}
          </button>
        </div>
      </form>
    </div>
  );
}
