import React, { useState } from 'react';
import { DocumentItem } from '../types';
import {
  FileText,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Search,
  Eye,
  Sparkles,
  Info,
  Maximize2,
  X,
  FileSearch,
  Check
} from 'lucide-react';

interface DocumentExtractorModalProps {
  document: DocumentItem | null;
  onClose: () => void;
  onHighlightEvidence?: (factLabel: string) => void;
}

export const DocumentExtractorModal: React.FC<DocumentExtractorModalProps> = ({
  document,
  onClose,
}) => {
  if (!document) return null;

  const [highlightedFact, setHighlightedFact] = useState<string | null>(
    document.extractedData.facts[0]?.label || null
  );
  const [evidenceSnippet, setEvidenceSnippet] = useState<string | null>(
    document.extractedData.facts[0]?.evidence || null
  );

  const handleShowEvidence = (fact: typeof document.extractedData.facts[0]) => {
    setHighlightedFact(fact.label);
    setEvidenceSnippet(fact.evidence);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-slate-900 font-display">
                  {document.name}
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Processed by OCR Agent
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Uploaded on {document.uploadDate} • Size: {document.size} • Pages: {document.pages}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Split-Screen Main Content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          {/* LEFT: Realistic Document Preview (Cols 7) */}
          <div className="lg:col-span-7 bg-slate-100/90 p-4 sm:p-6 overflow-y-auto flex flex-col items-center">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-lg border border-slate-300 p-6 sm:p-8 relative text-slate-800 font-sans text-xs">
              {/* Document watermark & stamp */}
              <div className="absolute top-6 right-6 opacity-30 pointer-events-none text-right">
                <div className="w-16 h-16 rounded-full border-2 border-slate-400 flex items-center justify-center text-[10px] font-bold text-slate-500 uppercase rotate-12">
                  CONFIDENTIAL
                </div>
              </div>

              {/* Document Header */}
              <div className="border-b-2 border-slate-900 pb-4 mb-5">
                <h4 className="font-black text-sm sm:text-base text-slate-900 tracking-wide">
                  {document.mockContent.hospitalHeader}
                </h4>
                <div className="flex justify-between items-center mt-1 text-[11px] text-slate-500 font-medium">
                  <span>Physician: {document.mockContent.doctorName}</span>
                  <span>Date: {document.mockContent.date}</span>
                </div>
              </div>

              {/* Document Sections */}
              <div className="space-y-4">
                {document.mockContent.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <h5 className="font-bold text-[11px] uppercase tracking-wider text-slate-500">
                      {sec.heading}
                    </h5>
                    <div className="space-y-1 bg-slate-50/70 p-3 rounded-lg border border-slate-100 font-mono text-[11px] text-slate-700">
                      {sec.lines.map((line, lIdx) => (
                        <p key={lIdx}>{line}</p>
                      ))}
                    </div>

                    {/* Highlighted Evidence Callout */}
                    {sec.highlightText && (
                      <div
                        className={`p-3 rounded-lg border transition-all mt-2 ${
                          highlightedFact
                            ? 'bg-amber-50 border-amber-300 shadow-sm ring-2 ring-amber-400/30'
                            : 'bg-blue-50/60 border-blue-200'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-800 mb-1">
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          <span>Extracted Ground-Truth Evidence (Page 1)</span>
                        </div>
                        <p className="text-xs font-semibold text-slate-900 bg-amber-200/50 p-1.5 rounded border border-amber-300/60">
                          "{sec.highlightText}"
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer Signature */}
              <div className="mt-8 pt-4 border-t border-slate-200 flex justify-between items-end text-[10px] text-slate-400">
                <div>
                  <p>Document SHA-256: 4f892a01...99ef</p>
                  <p>Electronically Verified via CareFlow OCR</p>
                </div>
                <div className="text-right">
                  <div className="font-serif italic text-slate-600 text-sm mb-0.5">
                    Dr. V. Mehta
                  </div>
                  <p className="border-t border-slate-300 pt-0.5 font-semibold text-slate-600">
                    Authorized Signatory
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: AI Extracted Information (Cols 5) */}
          <div className="lg:col-span-5 bg-white p-5 sm:p-6 overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h4 className="font-bold text-sm text-slate-900">
                  AI Extracted Information
                </h4>
              </div>
              <span className="text-[10px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                Schema v2.0
              </span>
            </div>

            {/* Basic metadata extracted */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Patient Name:</span>
                <span className="font-bold text-slate-900">{document.extractedData.patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Document Type:</span>
                <span className="font-semibold text-slate-900">{document.extractedData.documentType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Document Date:</span>
                <span className="font-mono text-slate-700">{document.extractedData.date}</span>
              </div>
            </div>

            {/* Extracted Facts List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                  Extracted Facts ({document.extractedData.facts.length})
                </h5>
                <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  100% Traceable
                </span>
              </div>

              {document.extractedData.facts.map((fact, fIdx) => {
                const isSelected = highlightedFact === fact.label;
                return (
                  <div
                    key={fIdx}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/40 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[11px] text-slate-500 font-medium block">
                          {fact.label}
                        </span>
                        <span className="font-bold text-xs text-slate-900 block mt-0.5">
                          {fact.value}
                        </span>
                      </div>

                      <div className="shrink-0">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          VERIFIED FACT
                        </span>
                      </div>
                    </div>

                    {/* Show Evidence Trigger Button */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                      <div className="text-[10px] text-slate-400 font-mono">
                        Source: {document.name} • P.{fact.page}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleShowEvidence(fact)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        <FileSearch className="w-3 h-3" />
                        <span>Show Evidence</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Currently Active Evidence Inspection Box */}
            {evidenceSnippet && (
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs space-y-1.5 animate-in fade-in">
                <div className="flex items-center justify-between text-amber-900 font-bold text-[11px]">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    Evidence Inspector
                  </span>
                  <span className="font-mono text-[10px]">Page 1 • Line 12</span>
                </div>
                <p className="text-slate-800 italic bg-white p-2.5 rounded-lg border border-amber-200/60 font-serif">
                  "{evidenceSnippet}"
                </p>
                <p className="text-[10px] text-amber-800">
                  Highlighted on the left document viewer. No inferences or extrapolations added.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <Info className="w-4 h-4 text-blue-600" />
            <span>Administrative care coordination fact extraction. Human-in-the-loop review mandatory.</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all"
          >
            Done Reviewing
          </button>
        </div>
      </div>
    </div>
  );
};
