"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MessageCircle, Send } from "lucide-react";
import { getMessages, sendMessage as sendMockMessage } from "@/lib/mockApi";
import type { Message } from "@/lib/types";

export default function ParentMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => { getMessages().then((d) => { setMessages(d); setLoading(false); }); }, []);

  const handleSend = async () => {
    if (!newMsg.trim()) return;
    const msg = await sendMockMessage(newMsg);
    setMessages([msg, ...messages]);
    setNewMsg("");
  };

  if (loading) return <div className="space-y-4">{[1, 2, 3].map((i) => <div key={i} className="h-20 bg-white rounded-2xl border border-slate-200 animate-pulse" />)}</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div><h1 className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-2"><MessageCircle className="w-5 h-5 shrink-0 text-primary-600" />الرسائل</h1><p className="text-slate-500">التواصل مع الأساتذة والإدارة</p></div>
      <div className="bg-white rounded-3xl border border-slate-200 p-4">
        <div className="flex gap-3">
          <input value={newMsg} onChange={(e) => setNewMsg(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder="اكتب رسالة..." className="flex-1 rounded-xl border border-slate-200 py-3 px-4 bg-slate-50 outline-none focus:ring-2 focus:ring-primary-500" />
          <button onClick={handleSend} className="px-5 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-colors"><Send   className="w-4 h-4 shrink-0"/></button>
        </div>
      </div>
      <div className="space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`bg-white rounded-2xl border p-5 flex gap-4 ${msg.isRead ? "border-slate-200" : "border-primary-200 bg-primary-50/30"}`}>
            <Image src={msg.senderAvatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=User"} alt={msg.senderName} width={44} height={44} className="w-11 h-11 rounded-full bg-slate-100 shrink-0" style={{ width: "44px", height: "44px" }} />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1"><h3 className="font-bold text-slate-900 text-sm">{msg.senderName}</h3><span className="text-xs text-slate-400">{new Date(msg.timestamp).toLocaleDateString("ar")}</span></div>
              <p className="text-sm text-slate-600 leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
