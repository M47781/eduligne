"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import { User, Bell, Palette, Shield, Globe, Save, Camera, Lock, Smartphone, Check } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('account');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    browser: true,
    marketing: false
  });

  const tabs = [
    { id: 'account', label: 'الحساب الشخصي', icon: <User   className="w-4 h-4 shrink-0"/> },
    { id: 'notifications', label: 'الإشعارات', icon: <Bell   className="w-4 h-4 shrink-0"/> },
    { id: 'appearance', label: 'المظهر واللغة', icon: <Palette   className="w-4 h-4 shrink-0"/> },
    { id: 'security', label: 'الأمان والخصوصية', icon: <Shield   className="w-4 h-4 shrink-0"/> },
  ];

  const Toggle = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => (
    <button 
      onClick={onChange}
      className={`w-12 h-6 rounded-full transition-colors relative ${checked ? 'bg-primary-600' : 'bg-slate-300'}`}
    >
      <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${checked ? 'left-1' : 'right-1'}`} />
    </button>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">الإعدادات (Parameters)</h1>
        <p className="text-slate-500">قم بإدارة تفضيلات حسابك، الإشعارات، والأمان.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 shrink-0 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                activeTab === tab.id 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className={activeTab === tab.id ? 'text-primary-600' : 'text-slate-400'}>
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
          
          {/* Account Settings */}
          {activeTab === 'account' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Image  
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-sm"
                  width={500} height={500} />
                  <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-slate-100 text-slate-600 hover:text-primary-600 transition-colors">
                    <Camera   className="w-4 h-4 shrink-0"/>
                  </button>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">الصورة الشخصية</h3>
                  <p className="text-sm text-slate-500 mb-3">يُفضل استخدام صورة مربعة بحجم 256x256 بكسل.</p>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg text-sm font-bold hover:bg-primary-100 transition-colors">
                      تغيير الصورة
                    </button>
                    <button className="px-4 py-2 text-red-600 rounded-lg text-sm font-bold hover:bg-red-50 transition-colors">
                      حذف
                    </button>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">الاسم الأول</label>
                  <input type="text" defaultValue="أحمد" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">اسم العائلة</label>
                  <input type="text" defaultValue="محمد" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-slate-700">البريد الإلكتروني</label>
                  <input type="email" defaultValue="admin@eduligne.dz" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-slate-700">نبذة تعريفية</label>
                  <textarea rows={4} defaultValue="مدير النظام والمسؤول عن إدارة المحتوى التعليمي." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all resize-none"></textarea>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-sm">
                  <Save   className="w-4 h-4 shrink-0"/>
                  حفظ التغييرات
                </button>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">تفضيلات الإشعارات</h3>
                <p className="text-sm text-slate-500 mb-6">اختر كيف ومتى تريد أن نرسل لك الإشعارات.</p>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                    <div>
                      <h4 className="font-bold text-slate-900">إشعارات البريد الإلكتروني</h4>
                      <p className="text-sm text-slate-500">تلقي تحديثات وتقارير أسبوعية عبر البريد.</p>
                    </div>
                    <Toggle checked={notifications.email} onChange={() => setNotifications({...notifications, email: !notifications.email})} />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                    <div>
                      <h4 className="font-bold text-slate-900">إشعارات المتصفح</h4>
                      <p className="text-sm text-slate-500">تنبيهات فورية عند وجود رسائل أو نشاط جديد.</p>
                    </div>
                    <Toggle checked={notifications.browser} onChange={() => setNotifications({...notifications, browser: !notifications.browser})} />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                    <div>
                      <h4 className="font-bold text-slate-900">الرسائل القصيرة (SMS)</h4>
                      <p className="text-sm text-slate-500">تنبيهات أمنية وتذكيرات هامة عبر الهاتف.</p>
                    </div>
                    <Toggle checked={notifications.sms} onChange={() => setNotifications({...notifications, sms: !notifications.sms})} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">المظهر</h3>
                <p className="text-sm text-slate-500 mb-6">تخصيص واجهة المستخدم حسب تفضيلاتك.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button className="border-2 border-primary-500 bg-primary-50 rounded-xl p-4 flex flex-col items-center gap-3 relative">
                    <div className="absolute top-2 right-2 text-primary-600"><Check   className="w-4 h-4 shrink-0"/></div>
                    <div className="w-full h-20 bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col gap-2 p-2">
                      <div className="w-full h-4 bg-slate-100 rounded"></div>
                      <div className="w-2/3 h-4 bg-slate-100 rounded"></div>
                    </div>
                    <span className="font-bold text-primary-700">الوضع الفاتح</span>
                  </button>
                  <button className="border-2 border-slate-200 hover:border-slate-300 rounded-xl p-4 flex flex-col items-center gap-3">
                    <div className="w-full h-20 bg-slate-900 rounded-lg shadow-sm border border-slate-800 flex flex-col gap-2 p-2">
                      <div className="w-full h-4 bg-slate-800 rounded"></div>
                      <div className="w-2/3 h-4 bg-slate-800 rounded"></div>
                    </div>
                    <span className="font-bold text-slate-600">الوضع الداكن</span>
                  </button>
                  <button className="border-2 border-slate-200 hover:border-slate-300 rounded-xl p-4 flex flex-col items-center gap-3">
                    <div className="w-full h-20 bg-gradient-to-br from-white to-slate-900 rounded-lg shadow-sm border border-slate-200 flex flex-col gap-2 p-2">
                      <div className="w-full h-4 bg-slate-200 rounded"></div>
                      <div className="w-2/3 h-4 bg-slate-700 rounded"></div>
                    </div>
                    <span className="font-bold text-slate-600">تلقائي (حسب النظام)</span>
                  </button>
                </div>
              </div>

              <hr className="border-slate-100" />

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <Globe  className="w-4 h-4 shrink-0 text-slate-400" />
                  اللغة والمنطقة
                </h3>
                <p className="text-sm text-slate-500 mb-6">اختر لغة العرض المفضلة لديك.</p>
                
                <div className="max-w-xs">
                  <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all appearance-none bg-white">
                    <option value="ar">العربية (الجزائر)</option>
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <Lock  className="w-4 h-4 shrink-0 text-slate-400" />
                  تغيير كلمة المرور
                </h3>
                <p className="text-sm text-slate-500 mb-6">تأكد من استخدام كلمة مرور قوية لحماية حسابك.</p>
                
                <div className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">كلمة المرور الحالية</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">كلمة المرور الجديدة</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">تأكيد كلمة المرور الجديدة</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all" />
                  </div>
                  <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-colors w-full mt-2">
                    تحديث كلمة المرور
                  </button>
                </div>
              </div>

              <hr className="border-slate-100" />

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <Smartphone  className="w-4 h-4 shrink-0 text-slate-400" />
                  المصادقة الثنائية (2FA)
                </h3>
                <p className="text-sm text-slate-500 mb-4">أضف طبقة حماية إضافية لحسابك.</p>
                
                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50">
                  <div>
                    <h4 className="font-bold text-slate-900">تطبيق المصادقة</h4>
                    <p className="text-sm text-slate-500">استخدم تطبيق مثل Google Authenticator.</p>
                  </div>
                  <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm">
                    إعداد
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
