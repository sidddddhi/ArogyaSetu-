import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Patient,
  TimelineEvent,
  CareTask,
  MissingDocumentItem,
  AgentActivity,
  NavItem
} from '../types';
import {
  Users,
  CheckSquare,
  Clock,
  FileText,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  FileQuestion,
  Sparkles,
  ArrowRight,
  Activity,
  CheckCircle2,
  Calendar,
  Send,
  Eye,
  ChevronRight,
  Info
} from 'lucide-react';
import { VoiceToTask } from './VoiceToTask';

interface DashboardViewProps {
  patient: Patient;
  timelineEvents: TimelineEvent[];
  pendingTasksCount: number;
  upcomingAptsCount: number;
  missingItem: MissingDocumentItem;
  agentActivities: AgentActivity[];
  onNavigate: (nav: NavItem) => void;
  onOpenPipelineModal: () => void;
  onUpdateMissingStatus: (status: MissingDocumentItem['status']) => void;
  onTaskCreated: (task: CareTask) => void;
  onSelectTimelineEvent: (event: TimelineEvent) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  patient,
  timelineEvents,
  pendingTasksCount,
  upcomingAptsCount,
  missingItem,
  agentActivities,
  onNavigate,
  onOpenPipelineModal,
  onUpdateMissingStatus,
  onTaskCreated,
  onSelectTimelineEvent,
}) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-7">
      {/* Good morning Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>CareFlow AI • Care-Navigation Agent</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            {t('greeting')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t('greetingSubtitle')}
          </p>
        </div>

        {/* Multi-Agent Action Banner Trigger */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenPipelineModal}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all transform active:scale-98"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Run CareFlow Multi-Agent Pipeline</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Patients */}
        <div
          onClick={() => onNavigate('dashboard')}
          className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 group-hover:text-blue-600 transition-colors">
              {t('activePatients')}
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">12</div>
            <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 mt-1">
              <span>● All within care plan</span>
            </div>
          </div>
        </div>

        {/* Pending Care Tasks */}
        <div
          onClick={() => onNavigate('tasks')}
          className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 group-hover:text-amber-600 transition-colors">
              {t('pendingTasks')}
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-800 font-display">
              {pendingTasksCount}
            </div>
            <div className="text-[11px] text-amber-700 font-medium flex items-center gap-1 mt-1">
              <span>1 high priority approval</span>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div
          onClick={() => onNavigate('appointments')}
          className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 group-hover:text-blue-600 transition-colors">
              {t('upcomingAppointments')}
            </span>
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">8</div>
            <div className="text-[11px] text-blue-700 font-medium flex items-center gap-1 mt-1">
              <span>Next: 05 Oct (10:30 AM)</span>
            </div>
          </div>
        </div>

        {/* Documents Awaiting Review */}
        <div
          onClick={() => onNavigate('documents')}
          className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 group-hover:text-indigo-600 transition-colors">
              {t('documentsAwaiting')}
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">3</div>
            <div className="text-[11px] text-indigo-700 font-medium flex items-center gap-1 mt-1">
              <span>Lab_Report.pdf verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* CARE JOURNEY OVERVIEW Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
              {t('careJourneyOverview')}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <h3 className="font-extrabold text-lg text-slate-900 font-display">
                Patient: {patient.name}
              </h3>
              <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                Patient ID: {patient.id}
              </span>
              <span className="text-xs text-slate-400">Age: {patient.age}Y</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('timeline')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Open Detailed Timeline</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Horizontal Timeline */}
        <div className="py-2">
          <div className="relative">
            {/* Horizontal Line */}
            <div className="hidden sm:block absolute top-7 left-8 right-8 h-1 bg-slate-200 -z-0" />

            {/* 5 Milestone Events */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-4 relative z-10">
              {timelineEvents.map((evt, idx) => {
                const isVerified = evt.status === 'verified';
                const isConfirmed = evt.status === 'confirmed';
                const isRequiresConfirmation = evt.status === 'requires_confirmation';

                return (
                  <div
                    key={evt.id}
                    onClick={() => {
                      onSelectTimelineEvent(evt);
                      onNavigate('timeline');
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all hover:scale-102 hover:shadow-md flex flex-col justify-between ${
                      isRequiresConfirmation
                        ? 'bg-amber-50/50 border-amber-300 ring-2 ring-amber-400/20'
                        : isVerified
                        ? 'bg-white border-slate-200 hover:border-blue-400'
                        : 'bg-white border-slate-200 hover:border-blue-400'
                    }`}
                  >
                    <div>
                      {/* Date Bubble */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center shadow-xs">
                          {idx + 1}
                        </span>
                        <span className="font-mono text-xs font-bold text-slate-600">
                          {evt.displayDate}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-slate-900">
                        {evt.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {evt.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isVerified
                            ? 'bg-emerald-50 text-emerald-700'
                            : isConfirmed
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {isVerified ? '✓ Verified' : isConfirmed ? '✓ Confirmed' : '⚠ Confirm'}
                      </span>

                      <span className="text-[10px] text-blue-600 font-semibold group-hover:underline">
                        View
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* AI DETECTED ITEMS Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-base text-slate-900 font-display">
              {t('aiDetectedItems')}
            </h3>
            <p className="text-xs text-slate-500">
              Categorized factual intelligence distilled from uploaded documents
            </p>
          </div>
          <span className="text-xs font-semibold text-blue-600 cursor-pointer" onClick={() => onNavigate('insights')}>
            View All Reasoning →
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Verified Facts */}
          <div
            onClick={() => onNavigate('insights')}
            className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>{t('verifiedFacts')}</span>
              </span>
              <span className="font-extrabold text-2xl text-emerald-700 font-display">
                3
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Direct ground truth: Hemoglobin 13.2 g/dL, Fasting Sugar 96 mg/dL, authorized medication dosage.
            </p>
            <div className="mt-3 text-[11px] text-emerald-700 font-semibold flex items-center gap-1 group-hover:underline">
              <span>Inspect Source Citations</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card 2: Needs Confirmation */}
          <div
            onClick={() => onNavigate('tasks')}
            className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                <span>{t('needsConfirmation')}</span>
              </span>
              <span className="font-extrabold text-2xl text-amber-700 font-display">
                2
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Follow-up for 14 October suggested by physician note; clinical purpose not explicitly written.
            </p>
            <div className="mt-3 text-[11px] text-amber-700 font-semibold flex items-center gap-1 group-hover:underline">
              <span>Review in Care Tasks</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card 3: Referenced Documents Missing */}
          <div
            onClick={() => onNavigate('insights')}
            className="p-5 rounded-2xl bg-blue-50/40 border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span>{t('referencedMissing')}</span>
              </span>
              <span className="font-extrabold text-2xl text-blue-700 font-display">
                1
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Previous abdominal ultrasound scan cited in Appointment Note but absent from uploaded file archive.
            </p>
            <div className="mt-3 text-[11px] text-blue-700 font-semibold flex items-center gap-1 group-hover:underline">
              <span>View Missing Detector</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      {/* MISSING INFORMATION DETECTOR CARD on Dashboard */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-base text-slate-900 font-display">
              Referenced but Missing Document
            </h3>
          </div>
          <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
            Status: {missingItem.status}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/30 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-slate-900">
              {missingItem.title}
            </h4>
            <p className="text-xs text-slate-600">
              {missingItem.details}
            </p>
            <div className="text-[10px] text-slate-400 font-mono">
              Referenced in: {missingItem.referencedIn}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onUpdateMissingStatus('Requested')}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Request Document</span>
            </button>
            <button
              type="button"
              onClick={() => onUpdateMissingStatus('Marked as Available')}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Mark as Available
            </button>
            <button
              type="button"
              onClick={() => onUpdateMissingStatus('Ignored')}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              Ignore
            </button>
          </div>
        </div>
      </div>

      {/* Voice to Task dictation widget */}
      <VoiceToTask onTaskCreated={onTaskCreated} />

      {/* AI AGENT ACTIVITY LIVE FEED */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-base text-slate-900 font-display">
              AI Agent Activity Stream
            </h3>
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Autonomous Collaboration Active</span>
          </span>
        </div>

        <div className="space-y-2.5">
          {agentActivities.map((act) => (
            <div
              key={act.id}
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/70 border border-slate-200/70 flex items-center justify-between text-xs transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                <span className="font-bold text-slate-800">{act.agentName}:</span>
                <span className="text-slate-600">{act.action}</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono shrink-0 pl-2">
                {act.timestamp}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
