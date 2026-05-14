import { MapPin, Phone, Mail, Send, Facebook, Instagram, Rss } from 'lucide-react';

export default function Contact() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">تواصل مع Eduligne</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            نحن هنا لمساعدتك. لا تتردد في الاتصال بنا لأي استفسار أو اقتراح.
          </p>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">معلومات التواصل</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="bg-primary-100 p-4 rounded-2xl text-primary-600 shrink-0">
                    <MapPin   className="w-6 h-6 shrink-0"/>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">العنوان</h3>
                    <p className="text-slate-600 leading-relaxed">
                      الجزائر — برج الكيفان
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="bg-primary-100 p-4 rounded-2xl text-primary-600 shrink-0">
                    <Phone   className="w-6 h-6 shrink-0"/>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">الهاتف</h3>
                    <a href="tel:+213676802269" className="text-slate-600 hover:text-indigo-600 transition-colors" dir="ltr">+213 676 80 22 69</a>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="bg-primary-100 p-4 rounded-2xl text-primary-600 shrink-0">
                    <Mail   className="w-6 h-6 shrink-0"/>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">البريد الإلكتروني</h3>
                    <a href="mailto:contact@eduligne.dz" className="text-slate-600 hover:text-indigo-600 transition-colors">contact@eduligne.dz</a>
                    <br />
                    <a href="mailto:support@eduligne.dz" className="text-slate-600 hover:text-indigo-600 transition-colors">support@eduligne.dz</a>
                    <div className="flex items-center gap-3 mt-5">
                      <a href="https://www.facebook.com/eduligne.dz" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white border border-indigo-100 transition-all">
                        <Facebook className="w-4 h-4 shrink-0" />
                      </a>
                      <a href="https://www.instagram.com/eduligne.dz" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-xl bg-pink-50 text-pink-600 hover:bg-pink-600 hover:text-white border border-pink-100 transition-all">
                        <Instagram className="w-4 h-4 shrink-0" />
                      </a>
                      <a href="https://eduligne.blogspot.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-xl bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white border border-orange-100 transition-all">
                        <Rss className="w-4 h-4 shrink-0" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">أرسل لنا رسالة</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">الاسم الكامل</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-slate-50 focus:bg-white"
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">البريد الإلكتروني</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-slate-50 focus:bg-white"
                    placeholder="example@domain.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">الموضوع</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-slate-50 focus:bg-white"
                    placeholder="موضوع الرسالة"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">الرسالة</label>
                  <textarea 
                    id="message" 
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-slate-50 focus:bg-white resize-none"
                    placeholder="اكتب رسالتك هنا..."
                  ></textarea>
                </div>
                <button 
                  type="button"
                  className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                >
                  إرسال الرسالة
                  <Send   className="w-5 h-5 shrink-0"/>
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-96 bg-slate-200 relative">
        <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-bold text-xl">
          [ Google Map Integration ]
        </div>
      </section>
    </div>
  );
}
