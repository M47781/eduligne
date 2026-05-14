"use client";

import { useState, useEffect } from "react";
import { Bell, CheckCircle2, Clock, AlertTriangle, Info } from "lucide-react";
import { getNotifications, markNotificationRead } from "@/lib/mockApi";
import type { Notification } from "@/lib/types";

export default function ParentNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { getNotifications().then((d) => { setNotifications(d); setLoading(false); }); }, []);

  const markRead = async (id: number) => {
    await markNotificationRead(id);
    setNotifications(notifications.map((n) => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllRead = () => setNotifications(notifications.map((n) => ({ ...n, isRead: true })));

  const typeIcons = { info: Info, success: CheckCircle2, warning: AlertTriangle, urgent: Clock };
  const typeColors = { info: "text-blue-500 bg-blue-50", success: "text-emerald-500 bg-emerald-50", warning: "text-amber-500 bg-amber-50", urgent: "text-red-500 bg-red-50" };

  if (loading) return <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-20 bg-white rounded-2xl border border-slate-200 animate-pulse" />)}</div>;

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div><h1 className="text-2xl font-black text-slate-900 mb-1 flex items-center gap-2"><Bell className="w-5 h-5 shrink-0 text-primary-600" />الإشعارات</h1><p className="text-slate-500">{unreadCount > 0 ? `${unreadCount} إشعارات غير مقروءة` : "لا توجد إشعارات جديدة"}</p></div>
        {unreadCount > 0 && <button onClick={markAllRead} className="text-sm font-bold text-primary-600 hover:text-primary-700">تحديد الكل كمقروء</button>}
      </div>
      <div className="space-y-3">
        {notifications.map((n) => {
          const Icon = typeIcons[n.type];
          const colors = typeColors[n.type];
          return (
            <div key={n.id} onClick={() => markRead(n.id)} className={`bg-white rounded-2xl border p-5 flex gap-4 cursor-pointer transition-all hover:shadow-md ${n.isRead ? "border-slate-200" : "border-primary-200 bg-primary-50/20"}`}>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${colors}`}><Icon   className="w-5 h-5 shrink-0"/></div>
              <div className="flex-1"><h3 className={`text-sm mb-1 ${n.isRead ? "font-medium text-slate-700" : "font-bold text-slate-900"}`}>{n.title}</h3><p className="text-xs text-slate-500 leading-relaxed">{n.description}</p><span className="text-[10px] text-slate-400 mt-2 block">{new Date(n.createdAt).toLocaleDateString("ar")}</span></div>
              {!n.isRead && <div className="w-2.5 h-2.5 bg-primary-500 rounded-full shrink-0 mt-1.5" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
