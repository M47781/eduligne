import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Rss } from 'lucide-react';

const FacebookIcon = () => (
  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Eduligne Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="font-black text-xl text-white">
                Edu<span className="text-indigo-400">ligne</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              منصة Eduligne — منظومة تعليمية ذكية مدعومة بالذكاء الاصطناعي، تُمكّن الطلاب وتدعم مسيرتهم في علوم STEM بأساليب تفاعلية وحديثة.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61582137344041"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:bg-indigo-600 hover:text-white transition-all duration-200"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.instagram.com/eduligne?igsh=NTFqM25pc3dlOGhr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:bg-pink-600 hover:text-white transition-all duration-200"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://eduligne.blogspot.com/?m=1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:bg-orange-500 hover:text-white transition-all duration-200"
                aria-label="Blogger"
              >
                <Rss className="w-4 h-4 shrink-0" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">روابط سريعة</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-sm hover:text-white transition-colors">من نحن</Link></li>
              <li><Link href="/services" className="text-sm hover:text-white transition-colors">خدماتنا</Link></li>
              <li><Link href="/pricing" className="text-sm hover:text-white transition-colors">الأسعار</Link></li>
              <li><Link href="/courses" className="text-sm hover:text-white transition-colors">الدورات</Link></li>
              <li><Link href="/blog" className="text-sm hover:text-white transition-colors">المدونة</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-6">الخدمات</h3>
            <ul className="space-y-4">
              <li><Link href="/services" className="text-sm hover:text-white transition-colors">مشاريع STEM</Link></li>
              <li><Link href="/services" className="text-sm hover:text-white transition-colors">الذكاء الاصطناعي</Link></li>
              <li><Link href="/services" className="text-sm hover:text-white transition-colors">المكتبة الرقمية</Link></li>
              <li><Link href="/services" className="text-sm hover:text-white transition-colors">الدعم المدرسي</Link></li>
              <li><Link href="/pricing" className="text-sm hover:text-white transition-colors">الاشتراكات السنوية</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6">تواصل معنا</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 text-indigo-400 mt-0.5" />
                <span className="text-sm">الجزائر — برج الكيفان</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0 text-indigo-400" />
                <a href="tel:+213676802269" className="text-sm hover:text-white transition-colors" dir="ltr">
                  +213 676 80 22 69
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 shrink-0 text-indigo-400" />
                <a href="mailto:eduligneplateforme@gmail.com" className="text-sm hover:text-white transition-colors">
                  eduligneplateforme@gmail.com
                </a>
              </li>
            </ul>

            <div className="mt-6 pt-6 border-t border-slate-800">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                راسلنا الآن
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Eduligne. جميع الحقوق محفوظة.
          </p>
          <div className="flex space-x-6 space-x-reverse text-sm text-slate-500">
            <Link href="/privacy" className="hover:text-white transition-colors">سياسة الخصوصية</Link>
            <Link href="/terms" className="hover:text-white transition-colors">شروط الاستخدام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
