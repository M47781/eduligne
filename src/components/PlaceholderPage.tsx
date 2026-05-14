"use client";

import { motion } from 'motion/react';
import { Construction } from 'lucide-react';

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-24 h-24 bg-primary-50 text-primary-500 rounded-full flex items-center justify-center mb-6"
      >
        <Construction   className="w-6 h-6 shrink-0"/>
      </motion.div>
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-bold text-slate-900 mb-4"
      >
        {title}
      </motion.h1>
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-slate-500 max-w-md mx-auto"
      >
        هذه الصفحة قيد التطوير حالياً. سيتم إضافة الميزات الخاصة بها قريباً. شكراً لتفهمكم!
      </motion.p>
    </div>
  );
}
