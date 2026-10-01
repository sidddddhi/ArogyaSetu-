import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FactReasoningItem, MissingDocumentItem } from '../types';
import { whatChangedData } from '../data/mockCareflowData';
import {
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  FileQuestion,
  CheckCircle2,
  Send,
  Eye,
  ArrowRight,
  Info,
  Scale,
  Sparkles,
  GitCompare,
  Check
} from 'lucide-react';

interface FactReasoningPanelProps {
  reasoningItems: FactReasoningItem[];
  missingItem: MissingDocumentItem;
  onUpdateMissingStatus: (status: MissingDocumentItem['status']) => void;
}

export const FactReasoningPanel: React.FC<FactReasoningPanelProps> = ({
  reasoningItems,
  missingItem,
  onUpdateMissingStatus,
}) => {
  const { t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'VERIFIED' | 'INFERENCE' | 'NEEDS_CONFIRMATION'>('ALL');
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const filteredItems = reasoningItems.filter((item) => {
    if (selectedFilter === 'VERIFIED') return item.category === 'VERIFIED_FACT';
    if (selectedFilter === 'INFERENCE') return item.category === 'POSSIBLE_INFERENCE';
    if (selectedFilter === 'NEEDS_CONFIRMATION') return item.category === 'NEEDS_CONFIRMATION';
    return true;
  });

  const handleAction = (msg: string, status: MissingDocumentItem['status']) => {
    onUpdateMissingStatus(status);
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {feedbackToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 border border-slate-700 animate-in slide-in-from-bottom-5 text-xs font-semibold">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* Hero Header with Constitution Safeguard */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-indigo-500/20">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              <Scale className="w-3.5 h-3.5 text-indigo-300" />
              <span>Evidence-Based Reasoning Protocol</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
              AI Reasoning &amp; Evidence Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              CareFlow AI enforces strict epistemic boundaries: verified document facts are never conflated with machine inferences or unstated context.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCompareModal(true)}
            className="px-5 py-3 bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold text-xs shadow-md flex items-center gap-2 transition-all self-start md:self-auto shrink-0"
          >
            <GitCompare className="w-4 h-4 text-blue-600" />
            <span>Compare Previous vs Current</span>
          </button>
        </div>
      </div>

      {/* Fact vs Assumption Tri-Partite Categorization */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-base text-slate-900 font-display">
              Epistemic Classification (Fact vs Assumption)
            </h3>
            <p className="text-xs text-slate-500">
              Every item is classified by provenance and requires human sign-off before downstream action
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
            <button
              type="button"
              onClick={() => setSelectedFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                selectedFilter === 'ALL'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Items ({reasoningItems.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('VERIFIED')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1 ${
                selectedFilter === 'VERIFIED'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Facts</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('INFERENCE')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1 ${
                selectedFilter === 'INFERENCE'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Inferences</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('NEEDS_CONFIRMATION')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1 ${
                selectedFilter === 'NEEDS_CONFIRMATION'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Needs Confirmation</span>
            </button>
          </div>
        </div>

        {/* Classification Cards */}
        <div className="space-y-3 pt-2">
          {filteredItems.map((item) => {
            const isVerified = item.category === 'VERIFIED_FACT';
            const isInference = item.category === 'POSSIBLE_INFERENCE';
            const isConfirmation = item.category === 'NEEDS_CONFIRMATION';

            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isVerified
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : isInference
                    ? 'border-amber-200 bg-amber-50/20'
                    : 'border-blue-200 bg-blue-50/20'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${
                          isVerified
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : isInference
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : 'bg-blue-100 text-blue-800 border-blue-300'
                        }`}
                      >
                        {isVerified && <ShieldCheck className="w-3 h-3 text-emerald-700" />}
                        {isInference && <AlertTriangle className="w-3 h-3 text-amber-700" />}
                        {isConfirmation && <HelpCircle className="w-3 h-3 text-blue-700" />}
                        <span>{item.badgeLabel}</span>
                      </span>

                      <span className="text-[11px] text-slate-400 font-mono">
                        {item.source}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900">
                      {item.text}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      <span className="font-semibold text-slate-700">Reasoning: </span>
                      {item.explanation}
                    </p>
                  </div>

                  <div className="shrink-0 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => handleAction(`Acknowledged reasoning for: "${item.text.slice(0, 30)}..."`, missingItem.status)}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-colors"
                    >
                      Acknowledge
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MISSING INFORMATION DETECTOR */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <FileQuestion className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 font-display">
                Missing Information Detector
              </h3>
              <p className="text-xs text-slate-500">
                Identifies records cited in consultations that are absent from the document store
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 px-2.5 py-1 rounded-full border border-amber-200">
            Referenced but Missing
          </span>
        </div>

        {/* The Missing Item Card */}
        <div className="p-5 rounded-2xl border-2 border-amber-300 bg-amber-50/30 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-amber-800 font-semibold text-xs">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>⚠ Previous scan referenced in appointment notes</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm mt-1">
                {missingItem.title}
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {missingItem.details}
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg">
                Status: {missingItem.status}
              </span>
            </div>
          </div>

          {/* Explicit Ethical Guardrail Disclaimer */}
          <div className="p-2.5 rounded-xl bg-white border border-amber-200 text-[11px] text-slate-600 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Administrative Notice:</strong> CareFlow AI does not claim this document is clinically necessary. It only reports that the text in <em>{missingItem.referencedIn}</em> references a past scan that has not been uploaded.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => handleAction('Document request sent to patient portal and care coordinator', 'Requested')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Request Document</span>
            </button>

            <button
              type="button"
              onClick={() => handleAction('Document marked as available via external hospital archive', 'Marked as Available')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Mark as Available</span>
            </button>

            <button
              type="button"
              onClick={() => handleAction('Document reference dismissed from administrative queue', 'Ignored')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              Ignore
            </button>
          </div>
        </div>
      </div>

      {/* "WHAT CHANGED?" COMPARISON MODAL */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <GitCompare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base font-display">
                    Compare Previous Visit vs Current Record
                  </h3>
                  <p className="text-xs text-slate-500">
                    Highlights only documented administrative delta. Zero clinical speculation.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowCompareModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5 text-xs">
              {/* Previous Column */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="font-bold text-slate-800 text-sm pb-2 border-b border-slate-200">
                  {whatChangedData.previous.title}
                </div>
                {whatChangedData.previous.items.map((it, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="font-semibold text-slate-500 text-[11px] block">
                      {it.label}
                    </span>
                    <p className="text-slate-800 bg-white p-2 rounded-lg border border-slate-200">
                      {it.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Current Column */}
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-3">
                <div className="font-bold text-blue-900 text-sm pb-2 border-b border-blue-200 flex items-center justify-between">
                  <span>{whatChangedData.current.title}</span>
                  <span className="text-[10px] bg-blue-200/70 text-blue-800 px-2 py-0.5 rounded-full font-bold">
                    UPDATED
                  </span>
                </div>
                {whatChangedData.current.items.map((it, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="font-semibold text-blue-800 text-[11px] block">
                      {it.label}
                    </span>
                    <p className="text-slate-900 bg-white p-2 rounded-lg border border-blue-200 font-medium">
                      {it.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-100 text-[11px] text-slate-600 flex items-start gap-2">
              <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <span>
                <strong>System Safety Guardrail:</strong> Changes reflect factual document uploads and scheduling records. CareFlow AI never infers medical improvement or deterioration.
              </span>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setShowCompareModal(false)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
