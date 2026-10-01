import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Search,
  Bell,
  Play,
  Menu,
  Shield,
  User,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import { Patient } from '../types';

interface TopBarProps {
  onOpenMobile: () => void;
  onRunPipeline: () => void;
  patient: Patient;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenMobile,
  onRunPipeline,
  patient,
  searchQuery,
  onSearchChange,
}) => {
  const { lang, setLang, t } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: 'New lab report indexed for Aarav Sharma (28 Sept)', time: '10m ago', unread: true },
    { id: 2, text: 'Follow-up appointment suggested for 14 October', time: '25m ago', unread: true },
    { id: 3, text: 'Missing referenced scan flagged by detector', time: '1h ago', unread: false },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between transition-all">
      {/* Left Search & Mobile Toggle */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          type="button"
          onClick={onOpenMobile}
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-10 pr-4 py-2 sm:py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3 pl-3">
        {/* Run CareFlow Agent Pipeline Button */}
        <button
          type="button"
          onClick={onRunPipeline}
          className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 transition-all transform active:scale-98"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Run CareFlow</span>
        </button>

        {/* Trilingual Language Selector */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setLang('en')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              lang === 'en'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLang('hi')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              lang === 'hi'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            हिन्दी
          </button>
          <button
            type="button"
            onClick={() => setLang('mr')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              lang === 'mr'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            मराठी
          </button>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 relative transition-colors"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="w-2 h-2 rounded-full bg-blue-600 absolute top-2 right-2 border-2 border-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in duration-150">
              <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Notifications</span>
                <span className="text-[10px] text-blue-600 font-semibold cursor-pointer">
                  Mark all read
                </span>
              </div>
              <div className="divide-y divide-slate-50 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 text-xs hover:bg-slate-50/80 transition-colors">
                    <p className={`text-slate-800 ${n.unread ? 'font-semibold' : ''}`}>
                      {n.text}
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-slate-200">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            VM
          </div>
          <div className="hidden md:block text-left">
            <span className="font-bold text-xs text-slate-900 block leading-tight">
              Dr. Vikram Mehta
            </span>
            <span className="text-[10px] text-slate-400 block">
              Attending Physician
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
