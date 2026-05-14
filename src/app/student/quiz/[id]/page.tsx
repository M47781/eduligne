"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Clock, CheckCircle2, XCircle, ArrowLeft, Trophy } from "lucide-react";
import { getQuizById } from "@/lib/mockApi";
import { useAuth } from "@/stores/useAuthStore";
import type { Quiz } from "@/lib/types";

export default function QuizPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addXP } = useAuth();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => { getQuizById(Number(id)).then((q) => { if (q) { setQuiz(q); setTimeLeft(q.timeLimit * 60); } }); }, [id]);

  useEffect(() => {
    if (!quiz || finished || timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft((p) => { if (p <= 1) { setFinished(true); return 0; } return p - 1; }), 1000);
    return () => clearInterval(t);
  }, [quiz, finished, timeLeft]);

  if (!quiz) return <div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" /></div>;

  const selectAnswer = (optIdx: number) => {
    const newAnswers = [...answers];
    newAnswers[current] = optIdx;
    setAnswers(newAnswers);
  };

  const finish = () => { setFinished(true); addXP(200); };

  const score = quiz.questions.reduce((acc, q, i) => acc + (answers[i] === q.correctAnswer ? 1 : 0), 0);
  const percentage = Math.round((score / quiz.questions.length) * 100);
  const passed = percentage >= quiz.passingScore;

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  if (finished) {
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <div className={`text-center p-10 rounded-3xl border ${passed ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}>
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${passed ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"}`}>
            {passed ? <Trophy   className="w-6 h-6 shrink-0"/> : <XCircle   className="w-6 h-6 shrink-0"/>}
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">{passed ? "مبروك! نجحت 🎉" : "لم تنجح هذه المرة"}</h2>
          <p className="text-slate-600 mb-4">حصلت على {score} من {quiz.questions.length} ({percentage}%)</p>
          <p className="text-sm text-slate-500 mb-6">+200 XP</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { setCurrent(0); setAnswers([]); setFinished(false); setTimeLeft(quiz.timeLimit * 60); }} className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-colors">إعادة المحاولة</button>
            <button onClick={() => router.push("/student/courses")} className="px-6 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-colors">العودة للدورات</button>
          </div>
        </div>
        <div className="space-y-4">
          {quiz.questions.map((q, i) => (
            <div key={q.id} className="bg-white p-5 rounded-2xl border border-slate-200">
              <div className="flex items-start gap-3 mb-3">
                {answers[i] === q.correctAnswer ? <CheckCircle2  className="w-5 h-5 shrink-0 text-emerald-500 shrink-0 mt-0.5" /> : <XCircle  className="w-5 h-5 shrink-0 text-red-500 shrink-0 mt-0.5" />}
                <p className="font-bold text-slate-900">{q.text}</p>
              </div>
              <div className="mr-8 space-y-2">
                {q.options.map((opt, oi) => (
                  <div key={oi} className={`text-sm px-3 py-2 rounded-lg ${oi === q.correctAnswer ? "bg-emerald-50 text-emerald-700 font-bold" : answers[i] === oi ? "bg-red-50 text-red-600" : "text-slate-600"}`}>{opt}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const q = quiz.questions[current];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
        <h1 className="text-lg font-bold text-slate-900">{quiz.title}</h1>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-bold ${timeLeft < 60 ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-700"}`}>
          <Clock   className="w-4 h-4 shrink-0"/>{mins}:{secs.toString().padStart(2, "0")}
        </div>
      </div>
      <div className="flex gap-2">
        {quiz.questions.map((_, i) => (<div key={i} className={`h-2 flex-1 rounded-full ${i === current ? "bg-primary-500" : answers[i] !== undefined ? "bg-emerald-400" : "bg-slate-200"}`} />))}
      </div>
      <div className="bg-white p-8 rounded-3xl border border-slate-200">
        <p className="text-sm font-medium text-slate-400 mb-2">السؤال {current + 1} من {quiz.questions.length}</p>
        <h2 className="text-xl font-bold text-slate-900 mb-6">{q.text}</h2>
        <div className="space-y-3">
          {q.options.map((opt, oi) => (
            <button key={oi} onClick={() => selectAnswer(oi)} className={`w-full text-right px-5 py-4 rounded-2xl border-2 font-medium transition-all ${answers[current] === oi ? "border-primary-500 bg-primary-50 text-primary-700" : "border-slate-200 hover:border-slate-300 text-slate-700"}`}>{opt}</button>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <button onClick={() => setCurrent((p) => Math.max(0, p - 1))} disabled={current === 0} className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-40">السابق</button>
        {current < quiz.questions.length - 1 ? (
          <button onClick={() => setCurrent((p) => p + 1)} className="px-6 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-colors">التالي</button>
        ) : (
          <button onClick={finish} className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors">إنهاء الاختبار</button>
        )}
      </div>
    </div>
  );
}
