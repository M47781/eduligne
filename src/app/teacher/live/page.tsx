"use client";

import { useState } from "react";
import { Video, Plus, X, Calendar, Clock, Users, Link2, Send, Play, ExternalLink, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useToast } from "@/components/providers/ToastProvider";

interface LiveSession {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  group: string;
  link: string;
  platform: 'zoom' | 'meet' | 'teams';
  status: 'upcoming' | 'live' | 'ended';
}

const mockSessions: LiveSession[] = [
  { id: 1, title: 'مراجعة الفصل الأول — الرياضيات', date: '2026-05-10', time: '18:00', duration: '90', group: 'السنة الثالثة ثانوي', link: 'https://zoom.us/j/example', platform: 'zoom', status: 'upcoming' },
  { id: 2, title: 'درس Python: الدوال والمكتبات', date: '2026-05-08', time: '16:00', duration: '60', group: 'نادي البرمجة', link: 'https://meet.google.com/example', platform: 'meet', status: 'live' },
  { id: 3, title: 'شرح مشاريع STEM العملية', date: '2026-05-01', time: '17:00', duration: '120', group: 'المجموعة أ', link: 'https://zoom.us/j/example2', platform: 'zoom', status: 'ended' },
];

const platformIcons: Record<string, string> = {
  zoom: '📹',
  meet: '🎥',
  teams: '💼',
};

const platformColors: Record<string, string> = {
  zoom: 'bg-blue-50 text-blue-700 border-blue-200',
  meet: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  teams: 'bg-violet-50 text-violet-700 border-violet-200',
};

export default function TeacherLivePage() {
  const { toast } = useToast();
  const [sessions, setSessions] = useState<LiveSession[]>(mockSessions);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '',
    duration: '60',
    group: '',
    link: '',
    platform: 'zoom' as 'zoom' | 'meet' | 'teams',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSession: LiveSession = {
      id: Date.now(),
      ...form,
      status: 'upcoming',
    };
    setSessions([newSession, ...sessions]);
    setIsFormOpen(false);
    setForm({ title: '', date: '', time: '', duration: '60', group: '', link: '', platform: 'zoom' });
    toast('تم إنشاء الحصة المباشرة وإشعار الطلاب بنجاح!', 'success');
  };

  const statusConfig = {
    upcoming: { label: 'قادمة', color: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-400' },
    live: { label: 'مباشر الآن', color: 'bg-red-50 text-red-700 border-red-200', dot: 'bg-red-500 animate-pulse' },
    ended: { label: 'منتهية', color: 'bg-slate-100 text-slate-500 border-slate-200', dot: 'bg-slate-400' },
  };

  const upcomingCount = sessions.filter((s) => s.status === 'upcoming').length;
  const liveCount = sessions.filter((s) => s.status === 'live').length;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Video className="w-6 h-6 shrink-0 text-rose-500" />
            الحصص المباشرة
          </h1>
          <p className="text-slate-500 mt-1">أنشئ وجدول حصصك التفاعلية مع الطلاب</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-bold transition-all shadow-sm shadow-indigo-600/20"
        >
          <Plus className="w-4 h-4 shrink-0" />
          حصة جديدة
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'حصص قادمة', value: upcomingCount, color: 'text-amber-600 bg-amber-50 border-amber-100' },
          { label: 'مباشر الآن', value: liveCount, color: 'text-red-600 bg-red-50 border-red-100' },
          { label: 'إجمالي الحصص', value: sessions.length, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
        ].map((stat, i) => (
          <div key={i} className={`p-5 rounded-2xl border text-center ${stat.color}`}>
            <p className="text-3xl font-black mb-1">{stat.value}</p>
            <p className="text-sm font-semibold opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Sessions list */}
      <div className="space-y-4">
        {sessions.map((session) => {
          const status = statusConfig[session.status];
          return (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-indigo-600 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-sm">
                    {platformIcons[session.platform]}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="font-black text-slate-900 text-lg">{session.title}</h3>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${status.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                        {status.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 shrink-0" />
                        {session.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 shrink-0" />
                        {session.time} ({session.duration} دقيقة)
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 shrink-0" />
                        {session.group}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md text-xs font-bold border ${platformColors[session.platform]}`}>
                        {session.platform.charAt(0).toUpperCase() + session.platform.slice(1)}
                      </span>
                      <a
                        href={session.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        <Link2 className="w-3.5 h-3.5 shrink-0" />
                        رابط الحصة
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  {session.status === 'live' && (
                    <a
                      href={session.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl transition-colors animate-pulse"
                    >
                      <Play className="w-4 h-4 shrink-0" fill="currentColor" />
                      انضمام الآن
                    </a>
                  )}
                  {session.status === 'upcoming' && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(session.link);
                        toast('تم نسخ رابط الحصة!', 'success');
                      }}
                      className="flex items-center gap-2 px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-sm rounded-xl transition-colors border border-indigo-200"
                    >
                      <Send className="w-4 h-4 shrink-0" />
                      نسخ الرابط
                    </button>
                  )}
                  {session.status === 'ended' && (
                    <span className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 text-slate-400 font-bold text-sm rounded-xl border border-slate-200">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      منتهية
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Create session modal */}
      <AnimatePresence>
        {isFormOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-[2rem] shadow-2xl z-50 overflow-hidden max-h-[90vh]"
            >
              <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-black text-slate-900 text-xl flex items-center gap-2">
                  <Video className="w-5 h-5 shrink-0 text-rose-500" />
                  حصة مباشرة جديدة
                </h3>
                <button onClick={() => setIsFormOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500">
                  <X className="w-5 h-5 shrink-0" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-5 overflow-y-auto">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">عنوان الحصة</label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="مثال: مراجعة الفصل الثاني"
                    className="w-full rounded-xl border border-slate-200 py-3 px-4 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">التاريخ</label>
                    <input
                      required
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 py-3 px-4 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">الوقت</label>
                    <input
                      required
                      type="time"
                      value={form.time}
                      onChange={(e) => setForm({ ...form, time: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 py-3 px-4 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">المدة (دقائق)</label>
                    <input
                      type="number"
                      value={form.duration}
                      onChange={(e) => setForm({ ...form, duration: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 py-3 px-4 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">المنصة</label>
                    <select
                      value={form.platform}
                      onChange={(e) => setForm({ ...form, platform: e.target.value as 'zoom' | 'meet' | 'teams' })}
                      className="w-full rounded-xl border border-slate-200 py-3 px-4 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    >
                      <option value="zoom">Zoom</option>
                      <option value="meet">Google Meet</option>
                      <option value="teams">Microsoft Teams</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">المجموعة أو الفصل المستهدف</label>
                  <select
                    value={form.group}
                    onChange={(e) => setForm({ ...form, group: e.target.value })}
                    required
                    className="w-full rounded-xl border border-slate-200 py-3 px-4 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  >
                    <option value="">اختر المجموعة</option>
                    <option>السنة الأولى ثانوي</option>
                    <option>السنة الثانية ثانوي</option>
                    <option>السنة الثالثة ثانوي</option>
                    <option>نادي البرمجة</option>
                    <option>المجموعة أ</option>
                    <option>المجموعة ب</option>
                    <option>جميع الطلاب</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">رابط الحصة (Zoom / Meet)</label>
                  <div className="relative">
                    <Link2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 shrink-0 text-slate-400" />
                    <input
                      required
                      type="url"
                      value={form.link}
                      onChange={(e) => setForm({ ...form, link: e.target.value })}
                      placeholder="https://zoom.us/j/..."
                      className="w-full rounded-xl border border-slate-200 py-3 pl-4 pr-10 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="flex-1 px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <Send className="w-4 h-4 shrink-0" />
                    إنشاء وإشعار الطلاب
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
