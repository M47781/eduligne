"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Trophy, Medal, Star, TrendingUp, Crown } from "lucide-react";
import { getLeaderboard } from "@/lib/mockApi";
import type { LeaderboardEntry } from "@/lib/types";
import { useAuth } from "@/stores/useAuthStore";

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => { getLeaderboard().then((d) => { setEntries(d); setLoading(false); }); }, []);

  const rankIcons = [Crown, Medal, Medal];
  const rankColors = ["text-amber-500", "text-slate-400", "text-amber-700"];
  const rankBg = ["bg-amber-50 border-amber-200", "bg-slate-50 border-slate-200", "bg-amber-50/50 border-amber-200/50"];

  if (loading) return <div className="space-y-4">{[1, 2, 3, 4, 5].map((i) => <div key={i} className="bg-white rounded-2xl h-16 animate-pulse border border-slate-200" />)}</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div><h1 className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-2"><Trophy className="w-5 h-5 shrink-0 text-amber-500" />لوحة المتصدرين</h1><p className="text-slate-500">أفضل الطلاب بناءً على نقاط الخبرة (XP)</p></div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4">
        {entries.slice(0, 3).map((entry, i) => {
          const Icon = rankIcons[i];
          return (
            <div key={entry.userId} className={`${rankBg[i]} rounded-3xl border p-6 text-center ${i === 0 ? "scale-105 shadow-lg" : ""}`}>
              <div className="relative inline-block mb-3">
                <Image src={entry.avatar} alt={entry.name} width={64} height={64} className="w-16 h-16 rounded-full bg-slate-100 mx-auto border-2 border-white shadow" style={{ width: "64px", height: "64px" }} />
                <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow ${i === 0 ? "bg-amber-400 text-white" : i === 1 ? "bg-slate-300 text-white" : "bg-amber-600 text-white"}`}>
                  <span className="text-xs font-black">{entry.rank}</span>
                </div>
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">{entry.name}</h3>
              <div className="flex items-center justify-center gap-1 text-xs font-bold text-amber-600"><Star  fill="currentColor"  className="w-4 h-4 shrink-0"/>{entry.xp.toLocaleString()} XP</div>
              <p className="text-xs text-slate-500 mt-1">المستوى {entry.level}</p>
            </div>
          );
        })}
      </div>

      {/* Rest of the list */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
        {entries.slice(3).map((entry) => (
          <div key={entry.userId} className={`flex items-center gap-4 px-6 py-4 border-b border-slate-100 last:border-0 transition-colors ${entry.userId === user?.id ? "bg-primary-50" : "hover:bg-slate-50"}`}>
            <span className="w-8 text-center font-black text-slate-400">{entry.rank}</span>
            <Image src={entry.avatar} alt={entry.name} width={40} height={40} className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200" style={{ width: "40px", height: "40px" }} />
            <div className="flex-1">
              <h4 className="font-bold text-slate-900 text-sm">{entry.name} {entry.userId === user?.id && <span className="text-primary-600 text-xs">(أنت)</span>}</h4>
              <p className="text-xs text-slate-500">المستوى {entry.level} • {entry.badges} شارة</p>
            </div>
            <div className="flex items-center gap-1.5 text-sm font-bold text-amber-600"><TrendingUp   className="w-4 h-4 shrink-0"/>{entry.xp.toLocaleString()} XP</div>
          </div>
        ))}
      </div>
    </div>
  );
}
