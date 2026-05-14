"use client";

import React, { useState } from 'react';
import { Bell, CheckCircle, AlertTriangle, Info, MessageSquare, Check, Trash2, Clock } from 'lucide-react';

export default function Notifications() {
  const [filter, setFilter] = useState('الكل');

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'تم تقييم مشروعك بنجاح!',
      message: 'حصلت على 95/100 في مشروع "السفينة الذكية". تفقد ملاحظات المعلم.',
      type: 'success',
      date: 'منذ ساعتين',
      isRead: false,
      category: 'النظام'
    },
    {
      id: 2,
      title: 'رسالة جديدة من المعلم أحمد',
      message: 'الرجاء مراجعة الدرس الثالث قبل الاختبار غداً.',
      type: 'message',
      date: 'منذ 5 ساعات',
      isRead: false,
      category: 'الرسائل'
    },
    {
      id: 3,
      title: 'تحديث جديد في المنصة',
      message: 'تمت إضافة ميزات جديدة في قسم STEM. اكتشفها الآن!',
      type: 'info',
      date: 'أمس',
      isRead: true,
      category: 'النظام'
    },
    {
      id: 4,
      title: 'تذكير: موعد تسليم الواجب',
      message: 'بقي يوم واحد على تسليم واجب الرياضيات.',
      type: 'warning',
      date: 'أمس',
      isRead: true,
      category: 'النظام'
    },
    {
      id: 5,
      title: 'انضمام عضو جديد للمجموعة',
      message: 'انضم "ياسين" إلى مجموعة "عباقرة الرياضيات".',
      type: 'info',
      date: 'منذ 3 أيام',
      isRead: true,
      category: 'المجموعات'
    }
  ]);

  const filters = ['الكل', 'غير مقروءة', 'الرسائل', 'النظام'];

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'الكل') return true;
    if (filter === 'غير مقروءة') return !n.isRead;
    return n.category === filter;
  });

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-6 h-6 shrink-0 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-6 h-6 shrink-0 text-yellow-500" />;
      case 'message': return <MessageSquare className="w-6 h-6 shrink-0 text-blue-500" />;
      case 'info':
      default: return <Info className="w-6 h-6 shrink-0 text-primary-500" />;
    }
  };

  const getBgColor = (type: string, isRead: boolean) => {
    if (isRead) return 'bg-white';
    switch (type) {
      case 'success': return 'bg-green-50 border-green-100';
      case 'warning': return 'bg-yellow-50 border-yellow-100';
      case 'message': return 'bg-blue-50 border-blue-100';
      case 'info':
      default: return 'bg-primary-50 border-primary-100';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
            <Bell className="w-6 h-6 shrink-0 text-primary-600" />
            الإشعارات
          </h1>
          <p className="text-slate-500">تابع أحدث التنبيهات، الرسائل، وتحديثات النظام.</p>
        </div>
        <button 
          onClick={markAllAsRead}
          className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-sm"
        >
          <Check   className="w-4 h-4 shrink-0"/>
          تحديد الكل كمقروء
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-colors whitespace-nowrap ${
              filter === f 
                ? 'bg-slate-900 text-white' 
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {f}
            {f === 'غير مقروءة' && notifications.filter(n => !n.isRead).length > 0 && (
              <span className="ml-2 rtl:mr-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs">
                {notifications.filter(n => !n.isRead).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(notification => (
            <div 
              key={notification.id} 
              className={`p-4 sm:p-6 rounded-2xl border transition-all flex gap-4 ${getBgColor(notification.type, notification.isRead)} ${notification.isRead ? 'border-slate-100 shadow-sm' : 'shadow-md'}`}
            >
              <div className="shrink-0 mt-1">
                {getIcon(notification.type)}
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-1">
                  <h3 className={`font-bold text-lg ${notification.isRead ? 'text-slate-700' : 'text-slate-900'}`}>
                    {notification.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 whitespace-nowrap">
                    <Clock   className="w-4 h-4 shrink-0"/>
                    {notification.date}
                  </div>
                </div>
                
                <p className={`text-sm mb-4 ${notification.isRead ? 'text-slate-500' : 'text-slate-700 font-medium'}`}>
                  {notification.message}
                </p>
                
                <div className="flex items-center gap-3">
                  {!notification.isRead && (
                    <button 
                      onClick={() => markAsRead(notification.id)}
                      className="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1"
                    >
                      <Check   className="w-4 h-4 shrink-0"/>
                      تحديد كمقروء
                    </button>
                  )}
                  <button 
                    onClick={() => deleteNotification(notification.id)}
                    className="text-xs font-bold text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors"
                  >
                    <Trash2   className="w-4 h-4 shrink-0"/>
                    حذف
                  </button>
                </div>
              </div>
              
              {!notification.isRead && (
                <div className="shrink-0 flex items-center">
                  <div className="w-3 h-3 bg-primary-500 rounded-full shadow-sm"></div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Bell className="w-6 h-6 shrink-0 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">لا توجد إشعارات</h3>
            <p className="text-slate-500">أنت على اطلاع دائم! لا توجد إشعارات جديدة في هذا القسم.</p>
          </div>
        )}
      </div>
    </div>
  );
}
