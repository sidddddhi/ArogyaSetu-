import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { TimelineEvent, Patient } from '../types';
import {
  CalendarDays,
  CheckCircle2,
  AlertTriangle,
  Clock,
  FileText,
  GitCompare,
  ArrowRight,
  ShieldCheck,
  Check,
  Filter,
  Eye,
  Info
} from 'lucide-react';

interface PatientTimelineViewProps {
  events: TimelineEvent[];
  patient: Patient;
  onOpenCompare: () => void;
  onOpenDocumentById?: (docId: string) => void;
}

export const PatientTimelineView: React.FC<PatientTimelineViewProps> = ({
  events,
  patient,
  onOpenCompare,
  onOpenDocumentById,
}) => {
  const { t } = useLanguage();
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(events[2]); // Default to Lab Report
  const [filterType, setFilterType] = useState<string>('All');

  const filteredEvents = events.filter((e) => {
    if (filterType === 'All') return true;
    return e.type === filterType;
  });

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              Patient ID: {patient.id}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-600">{patient.name}, {patient.age}Y</span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 mt-1 font-display">
            Chronological Care Journey
          </h3>
          <p className="text-xs text-slate-500">
            Synthesized timeline of all consultations, diagnostic lab orders, prescriptions, and follow-ups
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenCompare}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto shrink-0"
        >
          <GitCompare className="w-4 h-4 text-blue-400" />
          <span>{t('comparePrevious')}</span>
        </button>
      </div>

      {/* Main Grid: Interactive Timeline Left (Cols 7), Detail Drawer Right (Cols 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Vertical Interactive Timeline */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Journey Milestones ({filteredEvents.length})
            </span>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Filter:</span>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-50 border border-slate-200 focus:outline-hidden"
              >
                <option value="All">All Events</option>
                <option value="consultation">Consultations</option>
                <option value="prescription">Prescriptions</option>
                <option value="lab_report">Lab Reports</option>
                <option value="appointment">Appointments</option>
                <option value="follow_up">Follow-ups</option>
              </select>
            </div>
          </div>

          {/* Timeline Nodes */}
          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
            {filteredEvents.map((evt) => {
              const isSelected = selectedEvent?.id === evt.id;
              const isVerified = evt.status === 'verified';
              const isConfirmed = evt.status === 'confirmed';
              const isUnconfirmed = evt.status === 'requires_confirmation';

              return (
                <div
                  key={evt.id}
                  onClick={() => setSelectedEvent(evt)}
                  className={`relative p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/40 shadow-sm ring-2 ring-blue-500/20'
                      : 'border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  {/* Pin Circle on the vertical line */}
                  <div
                    className={`absolute -left-6 sm:-left-8 top-5 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center transition-all ${
                      isVerified || isConfirmed
                        ? 'bg-blue-600 shadow-sm'
                        : 'bg-amber-500 animate-pulse'
                    }`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                          {evt.displayDate}
                        </span>
                        <h4 className="font-bold text-sm text-slate-900">
                          {evt.title}
                        </h4>
                      </div>

                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {evt.description}
                      </p>
                    </div>

                    <div className="shrink-0">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                          isVerified
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : isConfirmed
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-amber-100 text-amber-800 border-amber-300'
                        }`}
                      >
                        {isVerified && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                        {isConfirmed && <Check className="w-3 h-3 text-blue-600" />}
                        {isUnconfirmed && <AlertTriangle className="w-3 h-3 text-amber-700" />}
                        <span>
                          {isVerified ? '✓ Verified' : isConfirmed ? '✓ Confirmed' : '⚠ Requires Confirmation'}
                        </span>
                      </span>
                    </div>
                  </div>

                  {evt.sourceDocName && (
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-mono">Source: {evt.sourceDocName}</span>
                      <span className="text-blue-600 font-semibold group-hover:underline flex items-center gap-1">
                        <span>Inspect Facts</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Event Deep-Dive Panel */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-5">
          {selectedEvent ? (
            <>
              <div className="pb-3 border-b border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                  Event Details &amp; Provenance
                </span>
                <h3 className="font-bold text-lg text-slate-900 mt-2 font-display">
                  {selectedEvent.title}
                </h3>
                <p className="text-xs text-slate-500">
                  Recorded Date: {selectedEvent.date} ({selectedEvent.displayDate})
                </p>
              </div>

              {/* Status Banner */}
              <div
                className={`p-3.5 rounded-2xl border text-xs flex items-start gap-2.5 ${
                  selectedEvent.status === 'requires_confirmation'
                    ? 'bg-amber-50 border-amber-200 text-amber-900'
                    : 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                }`}
              >
                {selectedEvent.status === 'requires_confirmation' ? (
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                ) : (
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-bold block">
                    {selectedEvent.status === 'requires_confirmation'
                      ? 'Requires Human Administrative Confirmation'
                      : 'Cryptographically Verified with Source Document'}
                  </span>
                  <span className="text-[11px] opacity-80">
                    {selectedEvent.status === 'requires_confirmation'
                      ? 'This follow-up event was derived from a physician directive ("Review after two weeks"). The exact appointment slot must be accepted.'
                      : 'Every data point is tied to verified text in the uploaded patient file.'}
                  </span>
                </div>
              </div>

              {/* Source Document Citation */}
              {selectedEvent.sourceDocName && (
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700">Source Document:</span>
                    <span className="text-[10px] font-mono text-slate-400">Page {selectedEvent.sourcePage || 1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-slate-900">{selectedEvent.sourceDocName}</span>
                  </div>

                  {selectedEvent.evidenceQuote && (
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-[11px] text-slate-700 italic font-serif">
                      "{selectedEvent.evidenceQuote}"
                    </div>
                  )}
                </div>
              )}

              {/* Extracted Facts */}
              <div className="space-y-2.5">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                  Extracted Facts ({selectedEvent.extractedFacts.length})
                </h4>

                <div className="space-y-2">
                  {selectedEvent.extractedFacts.map((fact, fIdx) => (
                    <div
                      key={fIdx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="text-[11px] text-slate-500 block">{fact.label}</span>
                        <span className="font-bold text-slate-900 block mt-0.5">{fact.value}</span>
                      </div>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          fact.isVerified
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {fact.isVerified ? 'VERIFIED' : 'PENDING'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Administrative Tasks */}
              {selectedEvent.relatedTasks.length > 0 && (
                <div className="pt-2 border-t border-slate-100 text-xs">
                  <span className="font-bold text-slate-700 block mb-1">
                    Related Administrative Care Tasks:
                  </span>
                  <div className="text-[11px] text-blue-700 bg-blue-50 p-2 rounded-xl border border-blue-200">
                    Linked to Task #{selectedEvent.relatedTasks.join(', #')}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 text-slate-400 text-xs">
              <CalendarDays className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <p>Select any timeline milestone on the left to inspect ground-truth evidence</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
