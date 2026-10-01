import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Settings,
  ShieldCheck,
  Lock,
  Database,
  Bell,
  Cpu,
  CheckCircle2,
  RefreshCw,
  FileCheck
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { t } = useLanguage();
  const [requireConfirmationForAll, setRequireConfirmationForAll] = useState(true);
  const [fhirSyncEnabled, setFhirSyncEnabled] = useState(true);
  const [auditLogging, setAuditLogging] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleSave = () => {
    setToastMsg('System security & supervisory parameters updated successfully');
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 border border-slate-700 animate-in slide-in-from-bottom-5 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex items-center justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            <Settings className="w-3.5 h-3.5" />
            <span>System Governance &amp; Administration</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            CareFlow Safety Configuration
          </h2>
          <p className="text-xs text-slate-500">
            Enforce clinician supervision thresholds and electronic health record integration policies
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs"
        >
          Save Settings
        </button>
      </div>

      {/* Human-In-The-Loop Policies */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-base text-slate-900 font-display">
            Human-in-the-Loop Supervision Policies
          </h3>
        </div>

        <div className="space-y-3 text-xs">
          <label className="flex items-start justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
            <div>
              <span className="font-bold text-slate-900 block">
                Mandatory Human Sign-off for All Appointments &amp; Tasks
              </span>
              <span className="text-slate-500 text-[11px]">
                CareFlow will never book, reschedule, or finalize clinical encounters without explicit clinician or coordinator confirmation.
              </span>
            </div>
            <input
              type="checkbox"
              checked={requireConfirmationForAll}
              onChange={(e) => setRequireConfirmationForAll(e.target.checked)}
              className="mt-1 rounded text-blue-600 focus:ring-blue-500"
            />
          </label>

          <label className="flex items-start justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
            <div>
              <span className="font-bold text-slate-900 block">
                Cryptographic Audit Trail (21 CFR Part 11 / ABDM)
              </span>
              <span className="text-slate-500 text-[11px]">
                Maintain immutable timestamped logs of every document OCR extraction, confidence score, and human override.
              </span>
            </div>
            <input
              type="checkbox"
              checked={auditLogging}
              onChange={(e) => setAuditLogging(e.target.checked)}
              className="mt-1 rounded text-blue-600 focus:ring-blue-500"
            />
          </label>
        </div>
      </div>

      {/* EHR & Interoperability Connectors */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
          <Database className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-base text-slate-900 font-display">
            Interoperability &amp; EHR Connectors
          </h3>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 block">
                FHIR R4 DiagnosticReport &amp; CarePlan Mapping
              </span>
              <span className="text-slate-500 text-[11px]">
                Standardized HL7/FHIR resource export for Epic, Cerner, and ABDM hospital portals.
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
              CONNECTED
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 block">
                Local Zero-Retention Processing Enclave
              </span>
              <span className="text-slate-500 text-[11px]">
                All OCR text extraction occurs client-side in ephemeral in-memory sandboxes.
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
              ACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* Simulated Audit Trail Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-3">
        <h3 className="font-bold text-base text-slate-900 font-display">
          Recent Security &amp; Oversight Audit Log
        </h3>
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Actor</th>
                <th className="py-2.5 px-3">Event / Operation</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-2.5 px-3 font-mono text-slate-500">01-Oct 08:30</td>
                <td className="py-2.5 px-3 font-semibold text-slate-800">Dr. Vikram Mehta</td>
                <td className="py-2.5 px-3 text-slate-600">Reviewed 28 Sept Lab Diagnostic Summary</td>
                <td className="py-2.5 px-3 text-emerald-700 font-semibold">Approved</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono text-slate-500">01-Oct 08:15</td>
                <td className="py-2.5 px-3 font-semibold text-slate-800">CareFlow OCR Agent</td>
                <td className="py-2.5 px-3 text-slate-600">Parsed Metropolis Lab_Report.pdf</td>
                <td className="py-2.5 px-3 text-blue-700 font-semibold">Indexed</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono text-slate-500">30-Sep 16:20</td>
                <td className="py-2.5 px-3 font-semibold text-slate-800">Care Coordinator</td>
                <td className="py-2.5 px-3 text-slate-600">Requested missing ultrasound scan record</td>
                <td className="py-2.5 px-3 text-amber-700 font-semibold">Pending Patient</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
