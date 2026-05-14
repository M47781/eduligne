
import { Lock } from "lucide-react";

export default function PrivacyPage() {
  return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-8"><Lock className="w-6 h-6 shrink-0 text-primary-600" /><h1 className="text-3xl font-black text-slate-900">سياسة الخصوصية</h1></div>
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 space-y-8 text-slate-700 leading-relaxed">
          <section><h2 className="text-xl font-bold text-slate-900 mb-4">1. البيانات التي نجمعها</h2><p>نجمع معلومات أساسية مثل الاسم والبريد الإلكتروني عند التسجيل، بالإضافة إلى بيانات استخدام المنصة لتحسين الخدمة.</p></section>
          <section><h2 className="text-xl font-bold text-slate-900 mb-4">2. كيف نستخدم بياناتك</h2><p>نستخدم بياناتك لتوفير الخدمات التعليمية، تخصيص تجربتك، وإرسال إشعارات مهمة حول حسابك.</p></section>
          <section><h2 className="text-xl font-bold text-slate-900 mb-4">3. حماية البيانات</h2><p>نتخذ إجراءات أمنية متقدمة لحماية بياناتك الشخصية من الوصول غير المصرح به أو التسريب.</p></section>
          <section><h2 className="text-xl font-bold text-slate-900 mb-4">4. حقوقك</h2><p>يحق لك طلب الوصول إلى بياناتك أو تعديلها أو حذفها في أي وقت عن طريق التواصل معنا.</p></section>
          <p className="text-sm text-slate-400 pt-4 border-t border-slate-200">آخر تحديث: مايو 2026</p>
        </div>
      </div>
  );
}
