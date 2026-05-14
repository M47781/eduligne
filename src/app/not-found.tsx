import Link from "next/link";
import { BookOpen, Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-primary-50 text-primary-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <BookOpen   className="w-6 h-6 shrink-0"/>
        </div>
        <h1 className="text-7xl font-black text-slate-900 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-700 mb-4">الصفحة غير موجودة</h2>
        <p className="text-slate-500 mb-8 leading-relaxed">عذراً، الصفحة التي تبحث عنها غير متاحة أو تم نقلها.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors">
            <Home   className="w-4 h-4 shrink-0"/> العودة للرئيسية
          </Link>
          <Link href="/login" className="flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors">
            تسجيل الدخول <ArrowRight   className="w-4 h-4 shrink-0"/>
          </Link>
        </div>
      </div>
    </div>
  );
}
