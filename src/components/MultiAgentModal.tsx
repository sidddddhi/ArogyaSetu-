import React, { useState, useEffect } from 'react';
import {
  FileText,
  ScanText,
  Calendar,
  CheckSquare,
  Clock,
  FileCheck2,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Play,
  RotateCcw,
  X,
  ArrowDown,
  Terminal,
  Activity
} from 'lucide-react';

interface MultiAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPipelineComplete?: () => void;
}

export const MultiAgentModal: React.FC<MultiAgentModalProps> = ({
  isOpen,
  onClose,
  onPipelineComplete,
}) => {
  if (!isOpen) return null;

  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [logs, setLogs] = useState<string[]>([
    'Initializing CareFlow Multi-Agent Orchestrator...',
    'Mounting Human-in-the-Loop Supervisory Guardrail...',
  ]);

  const agents = [
    {
      name: 'Document Agent',
      icon: FileText,
      color: 'blue',
      role: 'Ingests PDF/JPG/PNG records, computes cryptohash, executes OCR preprocessing.',
      output: '4 Documents verified & converted to normalized text stream.',
    },
    {
      name: 'Information Extraction Agent',
      icon: ScanText,
      color: 'indigo',
      role: 'Extracts lab values, doctor directives, dates, and medical codes without clinical extrapolation.',
      output: 'Extracted Hemoglobin 13.2 g/dL, Fasting Glucose 96, "Review after two weeks" directive.',
    },
    {
      name: 'Timeline Agent',
      icon: Calendar,
      color: 'teal',
      role: 'Aligns fragmented encounters into a chronological care journey with provenance links.',
      output: 'Synthesized 5 chronological milestones spanning 10 Sept to 14 Oct 2026.',
    },
    {
      name: 'Task Agent',
      icon: CheckSquare,
      color: 'amber',
      role: 'Translates physician directives into discrete administrative coordination tasks.',
      output: 'Created task: "Follow-up appointment needs confirmation" (Flagged for human approval).',
    },
    {
      name: 'Appointment Agent',
      icon: Clock,
      color: 'sky',
      role: 'Reconciles clinic scheduling availability with patient care timelines.',
      output: 'Synchronized confirmed 05 Oct appointment; staged tentative 14 Oct slot.',
    },
    {
      name: 'Summary Agent',
      icon: FileCheck2,
      color: 'emerald',
      role: 'Compiles pre-consultation doctor brief with pending items & questions for clinician review.',
      output: 'Doctor Brief updated for Dr. Mehta with 2 items requiring confirmation.',
    },
  ];

  useEffect(() => {
    if (!isRunning) return;

    if (activeStep < agents.length) {
      const timer = setTimeout(() => {
        const currentAgent = agents[activeStep];
        setLogs((prev) => [
          ...prev,
          `[${currentAgent.name}] ${currentAgent.output}`,
        ]);
        setActiveStep((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsRunning(false);
      setLogs((prev) => [
        ...prev,
        '✓ Multi-Agent Pipeline Completed. Human oversight verified.',
      ]);
      if (onPipelineComplete) onPipelineComplete();
    }
  }, [activeStep, isRunning]);

  const handleRerun = () => {
    setActiveStep(0);
    setIsRunning(true);
    setLogs([
      'Re-initializing CareFlow Multi-Agent Orchestrator...',
      'Mounting Human-in-the-Loop Supervisory Guardrail...',
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 agent-glow">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base font-display">
                  CareFlow Multi-Agent Pipeline Execution
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30">
                  Human-in-the-Loop Active
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Collaborative autonomous agents converting raw records into structured care workflows
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleRerun}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Re-Run</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Pipeline Stage Flow */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Horizontal Steps Navigator */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
            {agents.map((ag, idx) => {
              const Icon = ag.icon;
              const isPast = activeStep > idx;
              const isCurrent = activeStep === idx;

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-between ${
                    isCurrent
                      ? 'border-blue-500 bg-blue-50/70 shadow-md ring-2 ring-blue-400/20 scale-102'
                      : isPast
                      ? 'border-emerald-200 bg-emerald-50/40'
                      : 'border-slate-200 bg-slate-50/60 opacity-50'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center mb-1.5 transition-transform ${
                      isCurrent
                        ? 'bg-blue-600 text-white shadow-md'
                        : isPast
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>

                  <span className="font-bold text-[11px] text-slate-800 line-clamp-1">
                    {ag.name.replace(' Agent', '')}
                  </span>

                  <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 mt-1">
                    {isCurrent ? 'Running...' : isPast ? 'Completed' : `Step ${idx + 1}`}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Detailed Active Agent Breakdown */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
              Agent Collaboration Stream
            </h4>

            <div className="space-y-2.5">
              {agents.map((ag, idx) => {
                const Icon = ag.icon;
                const isPast = activeStep > idx;
                const isCurrent = activeStep === idx;

                if (!isPast && !isCurrent) return null;

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all animate-in fade-in duration-300 ${
                      isCurrent
                        ? 'border-blue-400 bg-blue-50/30'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            isCurrent
                              ? 'bg-blue-600 text-white animate-pulse'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-bold text-xs text-slate-900">{ag.name}</h5>
                            <span
                              className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                isCurrent
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {isCurrent ? 'Processing' : 'Verified'}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">{ag.role}</p>
                        </div>
                      </div>

                      <div className="text-right text-xs">
                        <span className="font-mono text-[11px] text-slate-700 font-semibold bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100 inline-block">
                          {ag.output}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live System Log Box */}
          <div className="rounded-2xl bg-slate-900 text-slate-200 p-4 font-mono text-xs space-y-1.5 shadow-inner">
            <div className="flex items-center justify-between text-slate-400 text-[10px] pb-1 border-b border-slate-800 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                Live Agent Execution Log
              </span>
              <span className="text-emerald-400 font-bold">● Active Sandbox</span>
            </div>

            <div className="max-h-36 overflow-y-auto space-y-1 pt-1 text-[11px]">
              {logs.map((log, idx) => (
                <p key={idx} className="leading-relaxed">
                  <span className="text-blue-400 select-none">&gt; </span>
                  {log}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Autonomous coordination guarded by human review at every juncture.</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
