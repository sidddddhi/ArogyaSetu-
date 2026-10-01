import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { NavItem } from '../types';
import {
  LayoutDashboard,
  CalendarDays,
  FileText,
  CheckSquare,
  Clock,
  Sparkles,
  FileCheck2,
  Settings,
  ShieldCheck,
  Activity,
  ChevronRight,
  Info
} from 'lucide-react';

interface SidebarProps {
  currentNav: NavItem;
  onNavigate: (nav: NavItem) => void;
  pendingTasksCount: number;
  unconfirmedCount: number;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentNav,
  onNavigate,
  pendingTasksCount,
  unconfirmedCount,
  isMobileOpen,
  onCloseMobile,
}) => {
  const { t, lang } = useLanguage();

  const navigationItems: {
    id: NavItem;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
    badgeColor?: string;
  }[] = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'timeline', label: t('timeline'), icon: CalendarDays },
    { id: 'documents', label: t('documents'), icon: FileText, badge: 4, badgeColor: 'bg-slate-100 text-slate-700' },
    { id: 'tasks', label: t('tasks'), icon: CheckSquare, badge: pendingTasksCount, badgeColor: 'bg-amber-100 text-amber-800' },
    { id: 'appointments', label: t('appointments'), icon: Clock, badge: 1, badgeColor: 'bg-blue-100 text-blue-800' },
    { id: 'insights', label: t('insights'), icon: Sparkles, badge: unconfirmedCount, badgeColor: 'bg-indigo-100 text-indigo-800' },
    { id: 'doctor-brief', label: t('doctorBrief'), icon: FileCheck2 },
    { id: 'settings', label: t('settings'), icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200/90 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Top Header & Branding */}
        <div>
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 text-white flex items-center justify-center shadow-md shadow-blue-500/25">
                <Activity className="w-5 h-5 text-white stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight text-slate-900 font-display">
                    CareFlow AI
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-200">
                    Agent
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 truncate max-w-[170px]" title={t('appTagline')}>
                  {t('appTagline')}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation links */}
          <div className="px-3 py-4 space-y-1">
            <div className="px-3 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Care Coordination
            </div>

            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentNav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onNavigate(item.id);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs shadow-blue-600/30'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-white' : 'text-slate-500'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.badgeColor || 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Safety & Human-in-the-loop Guardrail */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70">
          <div className="group relative p-3 rounded-2xl bg-white border border-emerald-200/80 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 truncate">
                    {t('humanInTheLoop')}
                  </span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                  Clinical supervision active • Zero automated medical changes
                </p>
              </div>
            </div>

            {/* Hover tooltip explanation */}
            <div className="mt-2.5 pt-2 border-t border-slate-100 text-[10px] text-slate-500 flex items-start gap-1.5 leading-normal">
              <Info className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
              <span>{t('humanTooltip')}</span>
            </div>
          </div>

          <div className="mt-3 px-2 flex items-center justify-between text-[11px] text-slate-400 font-medium">
            <span>CareFlow v2.4 (HIPAA)</span>
            <span className="text-blue-600 font-semibold">Demo Sandbox</span>
          </div>
        </div>
      </aside>
    </>
  );
};
