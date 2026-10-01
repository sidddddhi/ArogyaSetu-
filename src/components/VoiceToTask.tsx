import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Mic,
  MicOff,
  Sparkles,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Volume2,
  ArrowRight,
  UserCheck,
  Check
} from 'lucide-react';
import { CareTask } from '../types';

interface VoiceToTaskProps {
  onTaskCreated: (task: CareTask) => void;
}

export const VoiceToTask: React.FC<VoiceToTaskProps> = ({ onTaskCreated }) => {
  const { t, lang } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [detectedResult, setDetectedResult] = useState<{
    suggestedTask: string;
    targetDate: string;
    action: string;
    originalInput: string;
    language: string;
  } | null>(null);
  const [confirmedMessage, setConfirmedMessage] = useState<string | null>(null);

  const sampleInputs = [
    {
      lang: 'English',
      text: 'My doctor asked me to come back next Friday.',
      task: 'Follow-up consultation appointment',
      date: 'Next Friday (Tentative - Needs Patient Confirmation)',
      action: 'Confirm and schedule follow-up slot with clinic reception',
    },
    {
      lang: 'हिन्दी (Hindi)',
      text: 'डॉक्टर ने अगले हफ्ते वापस आने को कहा है।',
      task: 'अनुवर्ती परामर्श नियुक्ति (Follow-up Appointment)',
      date: 'अगले सप्ताह (अस्पष्ट - रोगी से पुष्टि आवश्यक)',
      action: 'क्लीनिक कैलेंडर में उपयुक्त समय स्लॉट निर्धारित करें',
    },
    {
      lang: 'मराठी (Marathi)',
      text: 'डॉक्टरांनी पुढच्या शुक्रवारी पुन्हा यायला सांगितले आहे.',
      task: 'फॉलो-अप भेट समन्वय (Follow-up Coordination)',
      date: 'पुढील शुक्रवार (अंदाजे तारीख)',
      action: 'रुग्णालय रिसेप्शनवर भेटीची वेळ निश्चित करा',
    },
  ];

  const handleSelectSample = (sample: typeof sampleInputs[0]) => {
    setIsRecording(true);
    setTranscript('');
    setDetectedResult(null);

    // Simulate audio transcription
    setTimeout(() => {
      setTranscript(sample.text);
      setIsRecording(false);

      // AI parses voice
      setTimeout(() => {
        setDetectedResult({
          suggestedTask: sample.task,
          targetDate: sample.date,
          action: sample.action,
          originalInput: sample.text,
          language: sample.lang,
        });
      }, 600);
    }, 1500);
  };

  const handleStartCustomRecord = () => {
    handleSelectSample(sampleInputs[0]);
  };

  const handleConfirmTask = () => {
    if (!detectedResult) return;

    const newTask: CareTask = {
      id: `task-voice-${Date.now()}`,
      title: detectedResult.suggestedTask,
      description: `Dictated via Voice to Task: "${detectedResult.originalInput}" (${detectedResult.language})`,
      priority: 'High',
      dueDate: '16 Oct 2026',
      status: 'Confirmed',
      source: 'Voice Dictation (CareFlow NLP)',
      category: 'Scheduling',
      createdAt: 'Just now',
    };

    onTaskCreated(newTask);
    setConfirmedMessage(`Task "${detectedResult.suggestedTask}" confirmed and routed to care coordinator!`);
    setDetectedResult(null);
    setTranscript('');
    setTimeout(() => setConfirmedMessage(null), 4000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-5">
      {/* Toast */}
      {confirmedMessage && (
        <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 border border-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{confirmedMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 font-display">
              Voice to Administrative Task ("Tell CareFlow")
            </h3>
            <p className="text-xs text-slate-500">
              Dictate spoken doctor instructions in English, Hindi, or Marathi — parsed into structured coordination tasks
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleStartCustomRecord}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all transform active:scale-98 shadow-sm ${
            isRecording
              ? 'bg-red-600 text-white animate-pulse'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
          }`}
        >
          {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          <span>{isRecording ? 'Listening...' : '🎙 Tell CareFlow'}</span>
        </button>
      </div>

      {/* Waveform Animation during recording */}
      {isRecording && (
        <div className="p-4 bg-slate-900 text-white rounded-2xl flex flex-col items-center justify-center space-y-2">
          <div className="flex items-center gap-1.5 h-8">
            <span className="w-1 bg-blue-400 h-3 animate-bounce" />
            <span className="w-1 bg-indigo-400 h-6 animate-bounce" style={{ animationDelay: '0.1s' }} />
            <span className="w-1 bg-sky-400 h-8 animate-bounce" style={{ animationDelay: '0.2s' }} />
            <span className="w-1 bg-amber-400 h-5 animate-bounce" style={{ animationDelay: '0.15s' }} />
            <span className="w-1 bg-emerald-400 h-7 animate-bounce" style={{ animationDelay: '0.25s' }} />
            <span className="w-1 bg-blue-400 h-4 animate-bounce" style={{ animationDelay: '0.1s' }} />
          </div>
          <p className="text-xs text-slate-300 font-mono">
            Recording audio stream... Parsing speech into clinical coordination schema
          </p>
        </div>
      )}

      {/* Quick Dictation Presets */}
      <div>
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
          Try Multi-Lingual Sample Voice Presets:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {sampleInputs.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectSample(sample)}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-300 text-left transition-all group"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200 block w-fit mb-1.5 group-hover:border-blue-300">
                {sample.lang}
              </span>
              <p className="text-xs text-slate-800 font-medium italic">
                "{sample.text}"
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Transcript & Extracted Output Card */}
      {detectedResult && (
        <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/60 to-indigo-50/40 border-2 border-blue-300 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-blue-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="font-bold text-xs text-blue-900 uppercase tracking-wider">
                AI Detected Administrative Task
              </span>
            </div>
            <span className="text-[10px] bg-blue-200/60 text-blue-800 font-semibold px-2 py-0.5 rounded">
              Language: {detectedResult.language}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-white p-3 rounded-xl border border-blue-100">
              <span className="text-[11px] text-slate-400 block">Suggested Task</span>
              <span className="font-bold text-slate-900 mt-0.5 block">
                {detectedResult.suggestedTask}
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-blue-100">
              <span className="text-[11px] text-slate-400 block">Date / Timeframe</span>
              <span className="font-semibold text-amber-700 mt-0.5 block">
                {detectedResult.targetDate}
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-blue-100">
              <span className="text-[11px] text-slate-400 block">Recommended Action</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                {detectedResult.action}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="text-[11px] text-slate-500 italic">
              Original voice audio: "{detectedResult.originalInput}"
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleConfirmTask}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Confirm Task</span>
              </button>

              <button
                type="button"
                onClick={() => alert(`Opening task editor for: ${detectedResult.suggestedTask}`)}
                className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold border border-slate-200"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => alert(`Patient SMS notification triggered to verify preferred timing.`)}
                className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold border border-slate-200"
              >
                Ask Patient
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
