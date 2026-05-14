"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, Clock, FileText, Star } from "lucide-react";
import { useToast } from "@/components/providers/ToastProvider";

const submissions = [
  { id: 1, student: "أحمد بن علي", avatar: "Ahmed", exam: "اختبار الجبر الخطي", submitted: "منذ ساعتين", grade: null as number | null },
  { id: 2, student: "فاطمة الزهراء", avatar: "Fatima", exam: "اختبار React الأساسي", submitted: "منذ 5 ساعات", grade: null as number | null },
  { id: 3, student: "عمر بن خلدون", avatar: "Omar", exam: "اختبار الجبر الخطي", submitted: "أمس", grade: 85 },
  { id: 4, student: "مريم حسن", avatar: "Meriem", exam: "واجب الفيزياء", submitted: "منذ يومين", grade: 92 },
];

export default function GradingPage() {
  const { toast } = useToast();
  const [items, setItems] = useState(submissions);

  const gradeSubmission = (id: number, grade: number) => {
    setItems(items.map((s) => s.id === id ? { ...s, grade } : s));
    toast("تم حفظ الدرجة بنجاح", "success");
  };

  const pending = items.filter((s) => s.grade === null);
  const graded = items.filter((s) => s.grade !== null);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div><h1 className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-2"><FileText className="w-5 h-5 shrink-0 text-primary-600" />التصحيح والتقييم</h1><p className="text-slate-500">قم بتصحيح أعمال الطلاب وتقييمها</p></div>

      {pending.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><Clock  className="w-4 h-4 shrink-0 text-amber-500" />في انتظار التصحيح ({pending.length})</h2>
          <div className="space-y-4">
            {pending.map((s) => (
              <div key={s.id} className="bg-white rounded-2xl border border-amber-200 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${s.avatar}`} alt={s.student} width={48} height={48} className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200" style={{ width: "48px", height: "48px" }} />
                <div className="flex-1"><h3 className="font-bold text-slate-900">{s.student}</h3><p className="text-sm text-slate-500">{s.exam} • {s.submitted}</p></div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <input type="number" min={0} max={100} placeholder="الدرجة" className="w-24 rounded-xl border border-slate-200 py-2 px-3 text-center font-bold outline-none focus:ring-2 focus:ring-primary-500" />
                  <button onClick={() => gradeSubmission(s.id, 75)} className="px-4 py-2 bg-primary-600 text-white rounded-xl font-bold text-sm hover:bg-primary-700 transition-colors">حفظ</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {graded.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><CheckCircle2  className="w-4 h-4 shrink-0 text-emerald-500" />تم التصحيح ({graded.length})</h2>
          <div className="space-y-3">
            {graded.map((s) => (
              <div key={s.id} className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4">
                <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${s.avatar}`} alt={s.student} width={40} height={40} className="w-10 h-10 rounded-full bg-slate-100" style={{ width: "40px", height: "40px" }} />
                <div className="flex-1"><h3 className="font-bold text-slate-900 text-sm">{s.student}</h3><p className="text-xs text-slate-500">{s.exam}</p></div>
                <div className="flex items-center gap-1.5 text-sm font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200"><Star   className="w-4 h-4 shrink-0"/>{s.grade}/100</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
