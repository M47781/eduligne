import Link from "next/link";
import { ShieldX, Home, LogIn } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <ShieldX   className="w-6 h-6 shrink-0"/>
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-4">غير مصرح</h1>
        <p className="text-slate-500 mb-8 leading-relaxed">ليس لديك صلاحية للوصول إلى هذه الصفحة. يرجى تسجيل الدخول بحساب مناسب.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors">
            <Home   className="w-4 h-4 shrink-0"/> العودة للرئيسية
          </Link>
          <Link href="/login" className="flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors">
            <LogIn   className="w-4 h-4 shrink-0"/> تسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
}
