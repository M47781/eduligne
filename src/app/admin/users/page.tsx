"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Users, Search, Filter, ChevronLeft, UserCheck, UserX } from "lucide-react";
import { getAdminUsers } from "@/lib/mockApi";
import { useToast } from "@/components/providers/ToastProvider";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  useEffect(() => { getAdminUsers().then((d) => { setUsers(d); setLoading(false); }); }, []);

  const filtered = users.filter((u) => u.name.includes(search) || u.email.includes(search));
  const roleLabels: Record<string, string> = { student: "طالب", teacher: "أستاذ", parent: "ولي أمر", admin: "مشرف" };
  const roleColors: Record<string, string> = { student: "bg-blue-50 text-blue-700", teacher: "bg-purple-50 text-purple-700", parent: "bg-emerald-50 text-emerald-700", admin: "bg-red-50 text-red-700" };

  const toggleStatus = (id: string) => {
    setUsers(users.map((u) => u.id === id ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u));
    toast("تم تحديث حالة المستخدم", "success");
  };

  if (loading) return <div className="space-y-3">{[1, 2, 3, 4].map((i) => <div key={i} className="h-16 bg-white rounded-2xl border border-slate-200 animate-pulse" />)}</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-start"><div><h1 className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-2"><Users className="w-5 h-5 shrink-0 text-primary-600" />إدارة المستخدمين</h1><p className="text-slate-500">إجمالي {users.length} مستخدم مسجل</p></div></div>
      <div className="relative"><Search className="w-4 h-4 shrink-0 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ابحث عن مستخدم..." className="w-full bg-white border border-slate-200 rounded-xl py-3 pr-12 pl-4 outline-none focus:ring-2 focus:ring-primary-100 shadow-sm" /></div>
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-slate-50 border-b border-slate-200 text-sm text-slate-500"><tr><th className="px-6 py-4 font-semibold">المستخدم</th><th className="px-6 py-4 font-semibold">الدور</th><th className="px-6 py-4 font-semibold">الحالة</th><th className="px-6 py-4 font-semibold">تاريخ التسجيل</th><th className="px-6 py-4 font-semibold">إجراءات</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4"><div><p className="font-bold text-slate-900">{u.name}</p><p className="text-xs text-slate-500">{u.email}</p></div></td>
                  <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${roleColors[u.role]}`}>{roleLabels[u.role]}</span></td>
                  <td className="px-6 py-4"><span className={`flex items-center gap-1.5 text-xs font-bold ${u.status === "active" ? "text-emerald-600" : "text-red-500"}`}><span className={`w-2 h-2 rounded-full ${u.status === "active" ? "bg-emerald-500" : "bg-red-500"}`} />{u.status === "active" ? "نشط" : "معلق"}</span></td>
                  <td className="px-6 py-4 text-sm text-slate-500">{u.joinDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/users/${u.id}`} className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"><ChevronLeft   className="w-4 h-4 shrink-0"/></Link>
                      <button onClick={() => toggleStatus(u.id)} className={`p-2 rounded-lg transition-colors ${u.status === "active" ? "text-slate-400 hover:text-red-600 hover:bg-red-50" : "text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"}`}>{u.status === "active" ? <UserX   className="w-4 h-4 shrink-0"/> : <UserCheck   className="w-4 h-4 shrink-0"/>}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
