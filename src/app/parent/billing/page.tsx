"use client";

import { useState, useEffect } from "react";
import { CreditCard, CheckCircle2, Clock, XCircle, Zap } from "lucide-react";
import { getBillingRecords } from "@/lib/mockApi";
import { useAuth } from "@/stores/useAuthStore";
import { useToast } from "@/components/providers/ToastProvider";
import type { BillingRecord } from "@/lib/types";

export default function BillingPage() {
  const [records, setRecords] = useState<BillingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const { user, updateUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => { getBillingRecords().then((d) => { setRecords(d); setLoading(false); }); }, []);

  const handlePay = () => { updateUser({ subscription: "pro" }); setShowCheckout(false); toast("تم ترقية اشتراكك بنجاح! 🎉", "success"); };

  const statusIcon = { paid: <CheckCircle2  className="w-4 h-4 shrink-0 text-emerald-500" />, pending: <Clock  className="w-4 h-4 shrink-0 text-amber-500" />, failed: <XCircle  className="w-4 h-4 shrink-0 text-red-500" /> };
  const statusText = { paid: "مدفوع", pending: "معلق", failed: "فشل" };
  const statusColor = { paid: "bg-emerald-50 text-emerald-700", pending: "bg-amber-50 text-amber-700", failed: "bg-red-50 text-red-700" };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-start"><div><h1 className="text-2xl font-black text-slate-900 mb-2">الفواتير والاشتراك</h1><p className="text-slate-500">إدارة اشتراكك وسجل المدفوعات</p></div>
        {user?.subscription !== "pro" && <button onClick={() => setShowCheckout(true)} className="flex items-center gap-2 bg-amber-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-amber-600 transition-colors"><Zap   className="w-4 h-4 shrink-0"/>ترقية لـ Pro</button>}
      </div>
      <div className={`rounded-3xl border p-6 ${user?.subscription === "pro" ? "bg-gradient-to-br from-amber-50 to-white border-amber-200" : "bg-white border-slate-200"}`}>
        <div className="flex items-center gap-4 mb-4"><div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${user?.subscription === "pro" ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-500"}`}><Zap   className="w-6 h-6 shrink-0"/></div>
          <div><h3 className="font-bold text-lg text-slate-900">الباقة {user?.subscription === "pro" ? "المميزة (Pro)" : "المجانية"}</h3><p className="text-sm text-slate-500">{user?.subscription === "pro" ? "وصول غير محدود لجميع الدورات" : "وصول محدود للمحتوى المجاني"}</p></div></div>
      </div>
      {loading ? <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-16 bg-white rounded-2xl border border-slate-200 animate-pulse" />)}</div> : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200"><h2 className="font-bold text-slate-900">سجل المدفوعات</h2></div>
          {records.map((r) => (
            <div key={r.id} className="flex items-center justify-between px-6 py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3"><CreditCard  className="w-4 h-4 shrink-0 text-slate-400" /><div><p className="font-medium text-slate-900 text-sm">{r.description}</p><p className="text-xs text-slate-500">{r.date}</p></div></div>
              <div className="flex items-center gap-4"><span className="font-bold text-slate-900">{r.amount}</span><span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg ${statusColor[r.status]}`}>{statusIcon[r.status]}{statusText[r.status]}</span></div>
            </div>
          ))}
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4" onClick={() => setShowCheckout(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-black text-slate-900 mb-2">ترقية للباقة المميزة</h2>
            <p className="text-slate-500 mb-6">وصول غير محدود لجميع الدورات والميزات</p>
            <div className="bg-amber-50 rounded-2xl p-6 mb-6 border border-amber-200"><p className="text-3xl font-black text-slate-900 mb-1">2,500 د.ج<span className="text-sm font-medium text-slate-500 mr-1">/شهرياً</span></p></div>
            <div className="space-y-3 mb-6">
              <input placeholder="رقم البطاقة" className="w-full rounded-xl border border-slate-200 py-3 px-4 bg-slate-50 outline-none" />
              <div className="grid grid-cols-2 gap-3"><input placeholder="MM/YY" className="rounded-xl border border-slate-200 py-3 px-4 bg-slate-50 outline-none" /><input placeholder="CVV" className="rounded-xl border border-slate-200 py-3 px-4 bg-slate-50 outline-none" /></div>
            </div>
            <div className="flex gap-3"><button onClick={() => setShowCheckout(false)} className="flex-1 py-3 bg-slate-100 rounded-xl font-bold text-slate-700">إلغاء</button><button onClick={handlePay} className="flex-1 py-3 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600 transition-colors">دفع الآن</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
