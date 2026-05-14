"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, BookOpen, FileText, BrainCircuit, Calendar, Paperclip, X, File as FileIcon, HelpCircle } from 'lucide-react';
import { getAIResponse } from '@/lib/mockApi';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: number;
  role: 'ai' | 'user';
  content: string;
  fileName?: string;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'ai', content: 'مرحباً! أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟' }
  ]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<{ mimeType: string; data: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setSelectedFile(file);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      setFileData({
        mimeType: file.type || 'application/octet-stream',
        data: base64String
      });
    };
    reader.readAsDataURL(file);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if ((!input.trim() && !selectedFile) || isLoading) return;

    const userMessage: Message = { 
      id: Date.now(), 
      role: 'user', 
      content: input,
      fileName: selectedFile?.name
    };
    setMessages((prev) => [...prev, userMessage]);
    
    const currentInput = input;
    
    setInput('');
    setSelectedFile(null);
    setFileData(null);
    setIsLoading(true);

    try {
      // Use mock API instead of real Gemini for the frontend-only MVP
      const responseText = await getAIResponse(currentInput || 'يرجى تحليل هذا الملف.');

      const aiMessage: Message = { 
        id: Date.now() + 1, 
        role: 'ai', 
        content: responseText
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error calling mock AI API:", error);
      const errorMessage: Message = { 
        id: Date.now() + 1, 
        role: 'ai', 
        content: 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى لاحقاً.' 
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    { icon: Calendar, label: 'خطة دراسة', prompt: 'ساعدني في وضع جدول زمني لمراجعة مادة [اسم المادة] خلال أسبوعين.' },
    { icon: BrainCircuit, label: 'اختبرني', prompt: 'اطرح علي 5 أسئلة لاختبار فهمي في موضوع [اسم الموضوع].' },
    { icon: BookOpen, label: 'شرح درس', prompt: 'هل يمكنك شرح مفهوم [اسم الدرس] بطريقة مبسطة مع أمثلة؟' },
    { icon: FileText, label: 'لخص', prompt: 'قم بتلخيص النقاط الرئيسية لدرس [اسم الدرس].' },
    { icon: HelpCircle, label: 'أجب على أسئلتي', prompt: 'لدي بعض الأسئلة حول مادة [اسم المادة]، هل يمكنك مساعدتي في الإجابة عليها؟' },
  ];

  const handleQuickAction = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] max-w-5xl mx-auto rounded-[2.5rem] bg-white/40 backdrop-blur-3xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] overflow-hidden relative">
      
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] -left-[10%] w-96 h-96 bg-blue-400/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-[20%] -right-[10%] w-96 h-96 bg-purple-400/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      {/* Header */}
      <div className="bg-white/40 backdrop-blur-md border-b border-white/40 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0 relative z-10">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-3.5 rounded-2xl shadow-lg shadow-blue-500/30">
            <Bot   className="w-6 h-6 shrink-0"/>
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
              المساعد الذكي
              <Sparkles  className="w-4 h-4 shrink-0 text-amber-400" />
            </h2>
            <p className="text-slate-500 text-sm font-medium">مدعوم بتقنية الذكاء الاصطناعي</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 relative z-10 scrollbar-thin scrollbar-thumb-white/60 scrollbar-track-transparent">
        <div className="flex justify-center mb-8">
           <span className="bg-white/50 backdrop-blur-sm border border-white/40 text-slate-400 text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
             اليوم
           </span>
        </div>
        
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              key={msg.id} 
              className={`flex gap-3 sm:gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm backdrop-blur-md z-10 ${
                msg.role === 'user' 
                ? 'bg-blue-600/10 text-blue-600 border border-blue-600/20' 
                : 'bg-white/70 text-slate-700 border border-white/60 shadow-md'
              }`}>
                {msg.role === 'user' ? <User   className="w-5 h-5 shrink-0"/> : <Bot   className="w-5 h-5 shrink-0"/>}
              </div>
              <div className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 sm:p-5 shadow-sm backdrop-blur-md border ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-tl-sm border-blue-500/30 shadow-indigo-500/20' 
                  : 'bg-slate-100/80 text-slate-800 rounded-tr-sm border-white/60 hover:bg-slate-100/90 transition-colors'
              }`}>
                {msg.fileName && (
                  <div className="flex items-center gap-2 mb-3 bg-black/10 p-3 rounded-xl border border-white/10 w-fit backdrop-blur-md">
                    <FileIcon  className="w-4 h-4 shrink-0 shrink-0" />
                    <span className="text-sm font-bold truncate max-w-[200px]" dir="ltr">{msg.fileName}</span>
                  </div>
                )}
                <div className="leading-relaxed whitespace-pre-wrap font-medium">{msg.content}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/70 border border-white/60 text-slate-700 flex items-center justify-center shrink-0 shadow-sm backdrop-blur-md">
              <Bot   className="w-5 h-5 shrink-0"/>
            </div>
            <div className="bg-slate-100/80 border border-white/60 rounded-3xl rounded-tr-sm p-5 shadow-sm backdrop-blur-md flex items-center gap-2 h-[56px]">
              <div className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-bounce"></div>
              <div className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
              <div className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Input Area */}
      <div className="p-4 sm:p-6 bg-white/40 backdrop-blur-xl border-t border-white/40 shrink-0 relative z-10 w-full">
        {/* Quick Actions (Smart Suggestions) */}
        <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar mb-2 custom-scrollbar">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickAction(action.prompt)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 hover:shadow-sm transition-all whitespace-nowrap text-sm font-bold shadow-sm"
            >
              <action.icon className="w-4 h-4 shrink-0"  />
              {action.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSend} className="relative">
          {selectedFile && (
            <div className="absolute -top-14 right-2 bg-white/90 backdrop-blur-md text-blue-700 p-2.5 rounded-xl border border-blue-100 shadow-md w-max flex items-center gap-3">
              <FileIcon   className="w-4 h-4 shrink-0"/>
              <span className="text-sm font-bold truncate max-w-[200px]" dir="ltr">{selectedFile.name}</span>
              <button 
                type="button" 
                onClick={() => { setSelectedFile(null); setFileData(null); }}
                className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors mr-2"
              >
                <X   className="w-4 h-4 shrink-0"/>
              </button>
            </div>
          )}
          
          <div className="relative flex items-center bg-white/70 backdrop-blur-md border hover:border-blue-300 border-white/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] rounded-[2rem] transition-all focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100/50">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept=".pdf,.txt,.doc,.docx,.png,.jpg,.jpeg" 
            />
            
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute right-3 p-3 text-slate-400 hover:text-blue-600 bg-white/50 hover:bg-white rounded-full transition-all shadow-sm border border-transparent hover:border-blue-100"
              disabled={isLoading}
              title="إرفاق ملف"
            >
              <Paperclip   className="w-5 h-5 shrink-0"/>
            </button>
            
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اسألني أي شيء أو اخْتَر من الاقتراحات..."
              className="w-full bg-transparent py-5 pr-16 pl-16 text-slate-800 font-medium placeholder-slate-400 outline-none"
              disabled={isLoading}
            />
            
            <button
              type="submit"
              disabled={(!input.trim() && !selectedFile) || isLoading}
              className="absolute left-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3.5 rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
            >
              <Send  className="w-5 h-5 shrink-0 rotate-180 -ml-0.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

