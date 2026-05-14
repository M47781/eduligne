"use client";

import { useState, useEffect } from "react";
import { Award, Download, Calendar, Star } from "lucide-react";
import { getCertificates } from "@/lib/mockApi";
import type { Certificate } from "@/lib/types";

export default function CertificatesPage() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { getCertificates().then((d) => { setCerts(d); setLoading(false); }); }, []);

  const handleDownload = (cert: Certificate) => {
    // Simulate PDF download
    const el = document.createElement("a");
    el.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(`شهادة إتمام: ${cert.courseTitle}\nالطالب: ${cert.studentName}\nالدرجة: ${cert.grade}\nالتاريخ: ${cert.completionDate}`));
    el.setAttribute("download", `certificate_${cert.id}.txt`);
    el.click();
  };

  if (loading) return <div className="space-y-4">{[1, 2].map((i) => <div key={i} className="bg-white rounded-3xl h-48 animate-pulse border border-slate-200" />)}</div>;

  if (certs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-24 h-24 bg-amber-50 text-amber-400 rounded-full flex items-center justify-center mb-6"><Award   className="w-6 h-6 shrink-0"/></div>
        <h2 className="text-2xl font-bold text-slate-900 mb-3">لا توجد شهادات بعد</h2>
        <p className="text-slate-500 max-w-md">أكمل الدورات والاختبارات للحصول على شهاداتك الأولى!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div><h1 className="text-2xl font-black text-slate-900 mb-2">شهاداتي</h1><p className="text-slate-500">جميع الشهادات التي حصلت عليها</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certs.map((cert) => (
          <div key={cert.id} className="bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 rounded-3xl p-8 relative overflow-hidden group hover:shadow-xl transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center border border-amber-200"><Award   className="w-6 h-6 shrink-0"/></div>
                <div><h3 className="font-bold text-slate-900 text-lg">شهادة إتمام</h3><p className="text-sm text-amber-700 font-medium">{cert.courseTitle}</p></div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-slate-600"><Star  className="w-4 h-4 shrink-0 text-amber-500" />الدرجة: <span className="font-bold text-slate-900">{cert.grade}</span></div>
                <div className="flex items-center gap-2 text-sm text-slate-600"><Calendar  className="w-4 h-4 shrink-0 text-slate-400" />تاريخ الإتمام: <span className="font-bold">{cert.completionDate}</span></div>
              </div>
              <button onClick={() => handleDownload(cert)} className="w-full flex items-center justify-center gap-2 bg-amber-500 text-white py-3 rounded-xl font-bold hover:bg-amber-600 transition-colors">
                <Download   className="w-4 h-4 shrink-0"/>تحميل الشهادة
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
