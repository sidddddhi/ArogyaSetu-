import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DoctorBriefData } from '../types';
import {
  FileCheck2,
  Calendar,
  FileText,
  AlertTriangle,
  HelpCircle,
  TrendingUp,
  Download,
  Share2,
  Edit,
  ShieldCheck,
  CheckCircle2,
  Printer,
  Info,
  User
} from 'lucide-react';

interface DoctorBriefViewProps {
  brief: DoctorBriefData;
}

export const DoctorBriefView: React.FC<DoctorBriefViewProps> = ({ brief }) => {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleExportPDF = () => {
    setToastMessage('Doctor Care Brief exported as encrypted PDF');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleShareTeam = () => {
    setToastMessage('Brief securely shared to Dr. Mehta and attending nursing station');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 border border-slate-700 animate-in slide-in-from-bottom-5 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Document Brief Sheet */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8 max-w-4xl mx-auto">
        {/* Document Header */}
        <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>AI-Generated Care Brief</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Pre-Consultation Clinical Brief
            </h2>
            <p className="text-xs text-slate-500">
              Generated: {brief.generatedDate} • Case: Outpatient Care Navigation
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-slate-500" />
              <span className="font-bold text-slate-900">{brief.patientName}</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              ID: <span className="font-mono font-semibold">{brief.patientId}</span> • Age: {brief.age}Y • {brief.gender}
            </div>
          </div>
        </div>

        {/* Section 1: RECENT EVENTS */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm uppercase tracking-wider">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>RECENT EVENTS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {brief.recentEvents.map((evt, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  <span className="font-semibold text-slate-800">{evt.title}</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 font-medium shrink-0">
                  {evt.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: DOCUMENTS */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm uppercase tracking-wider">
            <FileText className="w-4 h-4 text-indigo-600" />
            <span>VERIFIED SOURCE DOCUMENTS</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {brief.documents.map((doc, idx) => (
              <div
                key={idx}
                className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{doc.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: PENDING ITEMS */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>PENDING ADMINISTRATIVE ITEMS</span>
          </div>

          <div className="space-y-2">
            {brief.pendingItems.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5"
              >
                <span className="font-bold text-amber-600">⚠</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: RECENT DOCUMENTED CHANGES */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span>RECENT DOCUMENTED CHANGES</span>
          </div>

          <div className="space-y-2">
            {brief.recentChanges.map((change, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-blue-950 flex items-center gap-2.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>{change}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: QUESTIONS REQUIRING CONFIRMATION */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            <span>QUESTIONS REQUIRING CLINICIAN CONFIRMATION</span>
          </div>

          <div className="space-y-2">
            {brief.questionsRequiringConfirmation.map((q, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-indigo-50/40 border border-indigo-200 text-xs text-indigo-950 flex items-start gap-2.5"
              >
                <span className="font-bold text-indigo-600">?</span>
                <span className="font-medium">{q}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mandatory Bottom Safety Disclaimer */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900 block">
              {t('doctorBriefDisclaimer')}
            </span>
            <span className="text-[11px] text-slate-500">
              CareFlow AI does not diagnose, predict clinical outcomes, or prescribe medications. All data represents administrative extraction from uploaded hospital papers.
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span>{isEditing ? 'Save Changes' : 'Edit Brief'}</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleExportPDF}
              className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
            >
              <Download className="w-4 h-4 text-blue-600" />
              <span>Export PDF</span>
            </button>

            <button
              type="button"
              onClick={handleShareTeam}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm shadow-blue-500/20 transition-all transform active:scale-98"
            >
              <Share2 className="w-4 h-4" />
              <span>Share with Care Team</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
