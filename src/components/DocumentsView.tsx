import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DocumentItem } from '../types';
import {
  UploadCloud,
  FileText,
  Scan,
  CheckCircle2,
  Clock,
  Eye,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Plus,
  AlertCircle
} from 'lucide-react';
import { DocumentExtractorModal } from './DocumentExtractorModal';

interface DocumentsViewProps {
  documents: DocumentItem[];
  onAddDocument: (doc: DocumentItem) => void;
}

export const DocumentsView: React.FC<DocumentsViewProps> = ({ documents, onAddDocument }) => {
  const { t, lang } = useLanguage();
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);

  // Simulated AI Processing Pipeline State
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState<number>(0);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const processingSteps = [
    'Uploading Document',
    'OCR & Text Extraction',
    'Information & Entity Parsing',
    'Fact Verification & Grounding',
    'Timeline & Tasks Updated',
  ];

  const handleSimulateUpload = (fileName = 'New_Cardiology_Summary.pdf') => {
    setIsProcessing(true);
    setProcessingStage(0);

    const stepInterval = setInterval(() => {
      setProcessingStage((prev) => {
        if (prev < processingSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          setTimeout(() => {
            setIsProcessing(false);
            const newDoc: DocumentItem = {
              id: `doc-${Date.now()}`,
              name: fileName,
              type: 'Appointment Note',
              uploadDate: 'Just now',
              size: '640 KB',
              status: 'analyzed',
              pages: 1,
              extractedData: {
                patientName: 'Aarav Sharma',
                documentType: 'Clinical Note',
                date: '01 October 2026',
                facts: [
                  { label: 'Attending Specialty', value: 'Cardiology Review', verified: true, evidence: 'Evaluated by On-Duty Specialist', page: 1 },
                  { label: 'Follow-up Timeframe', value: 'Within 4 weeks', verified: true, evidence: 'Recommended routine follow-up within 4 weeks', page: 1 },
                ],
              },
              mockContent: {
                hospitalHeader: 'HEART & VASCULAR SPECIALTY CLINIC',
                doctorName: 'Dr. Anita Roy, MD',
                date: '01 October 2026',
                sections: [
                  {
                    heading: 'ASSESSMENT SUMMARY',
                    lines: ['Cardiovascular status stable.', 'Normotensive readings confirmed.'],
                    highlightText: 'Recommended routine administrative follow-up within 4 weeks.',
                  },
                ],
              },
            };
            onAddDocument(newDoc);
            setSuccessToast('Document successfully analyzed & indexed in patient timeline');
            setTimeout(() => setSuccessToast(null), 4000);
          }, 800);
          return prev;
        }
      });
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-500 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold">{successToast}</span>
        </div>
      )}

      {/* Upload Drag & Drop Area */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-dashed border-slate-200 hover:border-blue-400 transition-all text-center relative overflow-hidden group shadow-xs">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto group-hover:scale-105 transition-transform shadow-inner">
            <UploadCloud className="w-8 h-8 stroke-[1.75]" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              {t('uploadTitle')}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {t('uploadSubtitle')}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              disabled={isProcessing}
              onClick={() => handleSimulateUpload('Outpatient_Progress_Note.pdf')}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-600/20 flex items-center gap-2 transition-all transform active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>{t('uploadBtn')}</span>
            </button>

            <button
              type="button"
              disabled={isProcessing}
              onClick={() => handleSimulateUpload('Scanned_Clinical_Prescription.pdf')}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <Scan className="w-4 h-4 text-slate-500" />
              <span>{t('scanBtn')}</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-400">
            {t('dragDropText')}
          </p>
        </div>

        {/* Simulated AI Processing Overlay Animation */}
        {isProcessing && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 z-20 animate-in fade-in">
            <div className="max-w-md w-full space-y-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-600/30 agent-glow">
                <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: '4s' }} />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200">
                  AI Multi-Agent Pipeline Active
                </span>
                <h4 className="font-bold text-slate-900 text-base mt-1.5">
                  {processingSteps[processingStage]}...
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Step {processingStage + 1} of {processingSteps.length}
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                <div
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${((processingStage + 1) / processingSteps.length) * 100}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>Upload</span>
                <span>OCR</span>
                <span>Extract</span>
                <span>Verify</span>
                <span>Timeline</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Uploaded Documents List */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-base text-slate-900 font-display">
              Indexed Patient Records ({documents.length})
            </h3>
            <p className="text-xs text-slate-500">
              Fragmented medical papers converted into structured, verifiable facts
            </p>
          </div>
          <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Audit Trail Intact</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="p-5 rounded-2xl border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all bg-white flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-blue-50 text-slate-600 group-hover:text-blue-600 flex items-center justify-center transition-colors">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                        {doc.name}
                      </h4>
                      <span className="text-[11px] text-slate-400">
                        {doc.uploadDate} • {doc.size}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                    {doc.type}
                  </span>
                </div>

                {/* Key Extracted Preview */}
                <div className="mt-3.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                  <div className="text-[11px] text-slate-500 flex justify-between">
                    <span>Key Extracted Datum:</span>
                    <span className="font-semibold text-slate-800">
                      {doc.extractedData.facts[0]?.label}: {doc.extractedData.facts[0]?.value}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Analyzed &amp; Grounded</span>
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedDoc(doc)}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-semibold text-xs transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Split-Screen</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Split Screen Modal */}
      {selectedDoc && (
        <DocumentExtractorModal
          document={selectedDoc}
          onClose={() => setSelectedDoc(null)}
        />
      )}
    </div>
  );
};
