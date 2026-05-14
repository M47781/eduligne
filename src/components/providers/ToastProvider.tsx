"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { X, CheckCircle2, AlertTriangle, Info, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type ToastType = "success" | "error" | "warning" | "info";
interface Toast { id: number; message: string; type: ToastType }

const ToastContext = createContext<{ toast: (msg: string, type?: ToastType) => void }>({ toast: () => {} });

export const useToast = () => useContext(ToastContext);

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const remove = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const iconMap = { success: CheckCircle2, error: XCircle, warning: AlertTriangle, info: Info };
  const colorMap = { success: "bg-emerald-50 border-emerald-200 text-emerald-800", error: "bg-red-50 border-red-200 text-red-800", warning: "bg-amber-50 border-amber-200 text-amber-800", info: "bg-blue-50 border-blue-200 text-blue-800" };
  const iconColorMap = { success: "text-emerald-500", error: "text-red-500", warning: "text-amber-500", info: "text-blue-500" };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 left-6 z-[9999] space-y-3 max-w-sm">
        <AnimatePresence>
          {toasts.map((t) => {
            const Icon = iconMap[t.type];
            return (
              <motion.div key={t.id} initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${colorMap[t.type]}`}>
                <Icon className={`w-5 h-5 shrink-0 ${iconColorMap[t.type]}`} />
                <span className="text-sm font-semibold flex-1">{t.message}</span>
                <button onClick={() => remove(t.id)} className="p-1 hover:bg-white/50 rounded-lg transition-colors"><X   className="w-4 h-4 shrink-0"/></button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
