
import { Shield } from "lucide-react";

export default function TermsPage() {
  return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-8"><Shield className="w-6 h-6 shrink-0 text-primary-600" /><h1 className="text-3xl font-black text-slate-900">شروط الاستخدام</h1></div>
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 space-y-8 text-slate-700 leading-relaxed">
          <section><h2 className="text-xl font-bold text-slate-900 mb-4">1. مقدمة</h2><p>مرحباً بك في منصة إديوتك التعليمية. باستخدامك لهذه المنصة، فإنك توافق على الالتزام بهذه الشروط والأحكام.</p></section>
          <section><h2 className="text-xl font-bold text-slate-900 mb-4">2. حساب المستخدم</h2><p>يجب عليك تقديم معلومات دقيقة وكاملة عند إنشاء حسابك. أنت مسؤول عن الحفاظ على سرية بيانات حسابك.</p></section>
          <section><h2 className="text-xl font-bold text-slate-900 mb-4">3. المحتوى التعليمي</h2><p>جميع المحتويات التعليمية المتوفرة على المنصة محمية بحقوق الملكية الفكرية ولا يجوز نسخها أو توزيعها دون إذن مسبق.</p></section>
          <section><h2 className="text-xl font-bold text-slate-900 mb-4">4. الاشتراكات والمدفوعات</h2><p>بعض الميزات تتطلب اشتراكاً مدفوعاً. يمكنك إلغاء اشتراكك في أي وقت من خلال إعدادات حسابك.</p></section>
          <section><h2 className="text-xl font-bold text-slate-900 mb-4">5. قواعد السلوك</h2><p>يُتوقع من جميع المستخدمين التصرف باحترام ومهنية. أي سلوك غير لائق قد يؤدي إلى تعليق الحساب.</p></section>
          <p className="text-sm text-slate-400 pt-4 border-t border-slate-200">آخر تحديث: مايو 2026</p>
        </div>
      </div>
  );
}
