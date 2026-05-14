"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { BookOpen, GraduationCap, Users, UserCircle2, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function RegisterType() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (selectedType) {
      router.push(`/register?type=${selectedType}`);
    }
  };

  const types = [
    { id: 'student', title: 'تلميذ / طالب', icon: GraduationCap, desc: 'أريد التعلم وتطوير مهاراتي' },
    { id: 'teacher', title: 'أستاذ / مدرب', icon: BookOpen, desc: 'أريد مشاركة معرفتي وتعليم الآخرين' },
    { id: 'parent', title: 'ولي أمر', icon: Users, desc: 'أريد متابعة تقدم أبنائي الدراسي' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <Link href="/" className="flex justify-center items-center gap-2 mb-8 group">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <Image 
              src="/logo.png" 
              alt="Eduligne Logo" 
              width={48} 
              height={48} 
              className="object-contain"
              priority
            />
          </div>
          <span className="font-black text-3xl text-slate-900">
            Edu<span className="text-indigo-600">ligne</span>
          </span>
        </Link>
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 mb-4">
          اختر نوع الحساب
        </h2>
        <p className="text-center text-lg text-slate-600 mb-12">
          كيف ترغب في استخدام منصة Eduligne؟
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {types.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`relative flex flex-col items-center p-8 rounded-3xl border-2 transition-all duration-300 ${
                  isSelected 
                    ? 'border-primary-600 bg-primary-50 shadow-md transform -translate-y-2' 
                    : 'border-slate-200 bg-white hover:border-primary-300 hover:bg-slate-50'
                }`}
              >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-colors ${
                  isSelected ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  <Icon   className="w-6 h-6 shrink-0"/>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isSelected ? 'text-primary-900' : 'text-slate-900'}`}>
                  {type.title}
                </h3>
                <p className={`text-sm text-center ${isSelected ? 'text-primary-700' : 'text-slate-500'}`}>
                  {type.desc}
                </p>
                
                {isSelected && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-primary-600 rounded-full border-4 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            disabled={!selectedType}
            className={`flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-lg transition-all ${
              selectedType 
                ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            متابعة التسجيل
            <ArrowLeft   className="w-5 h-5 shrink-0"/>
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-600">
            لديك حساب بالفعل؟{' '}
            <Link href="/login" className="font-bold text-primary-600 hover:text-primary-500">
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
