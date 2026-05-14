"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/stores/useAuthStore";

const navLinks = [
  { name: "الرئيسية", path: "/" },
  { name: "من نحن", path: "/about" },
  { name: "خدماتنا", path: "/services" },
  { name: "الأسعار", path: "/pricing" },
  { name: "الدورات", path: "/courses" },
  { name: "المدونة", path: "/blog" },
  { name: "تواصل معنا", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dashboardPath = user ? `/${user.role}/dashboard` : "/login";

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm border-b border-slate-200/50 py-2"
          : "bg-white py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <Image 
                  src="/logo.png" 
                  alt="Eduligne Logo" 
                  width={40} 
                  height={40} 
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-black text-2xl text-slate-900 tracking-tight">
                Edu<span className="text-indigo-600">ligne</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2 space-x-reverse">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-semibold transition-all px-4 py-2.5 rounded-xl ${
                  pathname === link.path
                    ? "text-indigo-700 bg-indigo-50"
                    : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3 space-x-reverse">
            {isAuthenticated ? (
              <Link
                href={dashboardPath}
                className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                لوحة التحكم
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-all"
                >
                  <LogIn className="w-4 h-4 shrink-0" />
                  تسجيل الدخول
                </Link>
                <Link
                  href="/register-type"
                  className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <UserPlus className="w-4 h-4 shrink-0" />
                  إنشاء حساب
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none p-2 rounded-xl hover:bg-slate-50 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6 shrink-0" /> : <Menu className="w-6 h-6 shrink-0" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-100 bg-white absolute w-full shadow-lg"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                    pathname === link.path
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 pb-2 flex flex-col gap-3 border-t border-slate-100 mt-4">
                {isAuthenticated ? (
                  <Link
                    href={dashboardPath}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-base font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                  >
                    لوحة التحكم
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-base font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <LogIn className="w-5 h-5 shrink-0" />
                      تسجيل الدخول
                    </Link>
                    <Link
                      href="/register-type"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-base font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                    >
                      <UserPlus className="w-5 h-5 shrink-0" />
                      إنشاء حساب
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
