"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, BookOpen, Library, Users, Cpu, Bot, User, Bell, Settings, LogOut,
  Menu, X, GraduationCap, Calendar, MessageCircle, FileText,
  PieChart, CreditCard, TrendingUp, Video
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/stores/useAuthStore";

interface DashboardLayoutProps {
  role?: "student" | "teacher" | "admin" | "parent";
  children?: React.ReactNode;
}

export default function DashboardLayout({ role = "student", children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const getLinks = () => {
    switch (role) {
      case "teacher":
        return [
          { name: "لوحة التحكم", path: "/teacher/dashboard", icon: LayoutDashboard },
          { name: "إدارة الدروس", path: "/teacher/courses", icon: BookOpen },
          { name: "إنشاء دورة", path: "/teacher/courses/new", icon: FileText },
          { name: "الاختبارات", path: "/teacher/exams/new", icon: FileText },
          { name: "الحصص المباشرة", path: "/teacher/live", icon: Video },
          { name: "المكتبة", path: "/teacher/library", icon: Library },
          { name: "المجتمع", path: "/teacher/community", icon: MessageCircle },
          { name: "المجموعات", path: "/teacher/groups", icon: Users },
          { name: "الطلاب", path: "/teacher/students", icon: GraduationCap },
          { name: "التصحيح", path: "/teacher/grading", icon: FileText },
          { name: "الملف الشخصي", path: "/teacher/profile", icon: User },
        ];
      case "admin":
        return [
          { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
          { name: "المستخدمين", path: "/admin/users", icon: Users },
          { name: "الدورات", path: "/admin/courses", icon: BookOpen },
          { name: "المكتبة", path: "/admin/library", icon: Library },
          { name: "المجموعات", path: "/admin/groups", icon: Users },
          { name: "الفعاليات", path: "/admin/events", icon: Calendar },
          { name: "المجتمع", path: "/admin/community", icon: MessageCircle },
          { name: "المدفوعات", path: "/admin/payments", icon: CreditCard },
          { name: "التقارير", path: "/admin/reports", icon: PieChart },
          { name: "الإعدادات", path: "/admin/settings", icon: Settings },
        ];
      case "parent":
        return [
          { name: "لوحة التحكم", path: "/parent/dashboard", icon: LayoutDashboard },
          { name: "الأبناء", path: "/parent/children", icon: Users },
          { name: "الدورات", path: "/parent/courses", icon: BookOpen },
          { name: "المكتبة", path: "/parent/library", icon: Library },
          { name: "المجتمع", path: "/parent/community", icon: MessageCircle },
          { name: "الرسائل", path: "/parent/messages", icon: MessageCircle },
          { name: "الفواتير", path: "/parent/billing", icon: CreditCard },
          { name: "الإشعارات", path: "/parent/notifications", icon: Bell },
          { name: "الملف الشخصي", path: "/parent/profile", icon: User },
        ];
      default:
        return [
          { name: "لوحة التحكم", path: "/student/dashboard", icon: LayoutDashboard },
          { name: "الدروس", path: "/student/courses", icon: BookOpen },
          { name: "المكتبة التعليمية", path: "/student/library", icon: Library },
          { name: "المجتمع", path: "/student/community", icon: MessageCircle },
          { name: "STEM", path: "/student/stem", icon: Cpu },
          { name: "المساعد الذكي", path: "/student/ai", icon: Bot },
          { name: "الشهادات", path: "/student/certificates", icon: GraduationCap },
          { name: "المتصدرين", path: "/student/leaderboard", icon: TrendingUp },
          { name: "الملف الشخصي", path: "/student/profile", icon: User },
        ];
    }
  };

  const links = getLinks();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const roleColor = {
    student: "from-indigo-500 to-violet-600",
    teacher: "from-emerald-500 to-teal-600",
    parent: "from-amber-500 to-orange-600",
    admin: "from-slate-600 to-slate-800",
  }[role];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 right-0 z-50 w-64 bg-white border-l border-slate-200 transform transition-transform duration-300 ease-in-out lg:transform-none ${
          sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-200">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <Image 
                src="/logo.png" 
                alt="Eduligne Logo" 
                width={40} 
                height={40} 
                className="object-contain"
              />
            </div>
            <span className="font-black text-lg text-slate-900">
              Edu<span className="text-indigo-600">ligne</span>
            </span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-500 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5 shrink-0" />
          </button>
        </div>

        {/* Role Badge */}
        <div className="px-5 pt-4 pb-2">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${roleColor} text-white`}>
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            {{
              student: "طالب",
              teacher: "أستاذ",
              parent: "ولي أمر",
              admin: "مشرف",
            }[role]}
          </div>
        </div>

        {/* Nav Links */}
        <div className="p-3 space-y-0.5 overflow-y-auto h-[calc(100vh-8rem)]">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.path || pathname.startsWith(link.path + "/");
            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
                {link.name}
                {isActive && (
                  <span className="mr-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />
                )}
              </Link>
            );
          })}

          <div className="pt-6 mt-4 border-t border-slate-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              تسجيل الخروج
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-500 hover:text-slate-900 p-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <Menu className="w-5 h-5 shrink-0" />
            </button>
            <Link href="/" className="lg:hidden flex items-center gap-2">
              <Image src="/logo.png" alt="Logo" width={32} height={32} className="object-contain" />
            </Link>
            <h1 className="text-lg font-bold text-slate-800 hidden sm:block">
              {links.find((l) => pathname === l.path || pathname.startsWith(l.path + "/"))?.name || "لوحة التحكم"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/${role === "student" ? "student" : role}/notifications`}
              className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-xl hover:bg-slate-100"
            >
              <Bell className="w-5 h-5 shrink-0" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </Link>
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold overflow-hidden border-2 border-indigo-200">
              {user?.avatar ? (
                <Image src={user.avatar} alt="User" className="w-full h-full object-cover" width={32} height={32} />
              ) : (
                <User className="w-4 h-4 shrink-0" />
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto pb-20 lg:pb-8">
          {children}
        </main>

        {/* Mobile Bottom Nav */}
        <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 z-40 px-2 py-1 safe-area-inset-bottom">
          <div className="flex items-center justify-around">
            {links.slice(0, 5).map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl text-[10px] font-bold transition-colors ${
                    isActive ? "text-indigo-600 bg-indigo-50" : "text-slate-400"
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="truncate max-w-[56px]">{link.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
