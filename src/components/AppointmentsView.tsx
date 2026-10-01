import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AppointmentItem } from '../types';
import {
  Calendar,
  Clock,
  User,
  MapPin,
  CheckCircle2,
  AlertCircle,
  XCircle,
  CalendarCheck,
  ShieldAlert,
  Info,
  ChevronRight,
  Plus
} from 'lucide-react';

interface AppointmentsViewProps {
  appointments: AppointmentItem[];
  onConfirmAppointment: (id: string) => void;
  onCancelAppointment: (id: string) => void;
}

export const AppointmentsView: React.FC<AppointmentsViewProps> = ({
  appointments,
  onConfirmAppointment,
  onCancelAppointment,
}) => {
  const { t } = useLanguage();
  const [activeAppointment, setActiveAppointment] = useState<AppointmentItem | null>(null);
  const [modalAction, setModalAction] = useState<'Confirm' | 'Reschedule' | 'Cancel' | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState('16 Oct 2026');
  const [rescheduleTime, setRescheduleTime] = useState('02:30 PM');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleActionClick = (apt: AppointmentItem, action: 'Confirm' | 'Reschedule' | 'Cancel') => {
    setActiveAppointment(apt);
    setModalAction(action);
  };

  const handleExecuteModalAction = () => {
    if (!activeAppointment || !modalAction) return;

    if (modalAction === 'Confirm') {
      onConfirmAppointment(activeAppointment.id);
      setToastMsg(`Appointment on ${activeAppointment.date} confirmed with Dr. Mehta`);
    } else if (modalAction === 'Cancel') {
      onCancelAppointment(activeAppointment.id);
      setToastMsg(`Appointment on ${activeAppointment.date} cancelled`);
    } else if (modalAction === 'Reschedule') {
      onConfirmAppointment(activeAppointment.id);
      setToastMsg(`Rescheduled to ${rescheduleDate} at ${rescheduleTime}`);
    }

    setModalAction(null);
    setActiveAppointment(null);
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 border border-slate-700 animate-in slide-in-from-bottom-5 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Safety Policy Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Appointment Coordination Agent</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 font-display">
            Patient Scheduling &amp; Clinic Visits
          </h3>
          <p className="text-xs text-slate-500">
            CareFlow manages administrative calendars with mandatory clinician / patient confirmation
          </p>
        </div>

        {/* Safety Badge */}
        <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2 max-w-sm">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            <strong>Zero Auto-Booking:</strong> The AI proposes slots derived from document directives, but never modifies schedules without human approval.
          </span>
        </div>
      </div>

      {/* Appointments Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {appointments.map((apt) => {
          const isConfirmed = apt.status === 'Confirmed';
          const isNeedsConfirmation = apt.status === 'Needs Confirmation';

          return (
            <div
              key={apt.id}
              className={`rounded-3xl p-6 border transition-all flex flex-col justify-between ${
                isNeedsConfirmation
                  ? 'border-amber-300 bg-amber-50/20 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-display ${
                        isConfirmed
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase leading-none">
                        {apt.date.split(' ')[1]}
                      </span>
                      <span className="text-lg font-extrabold leading-none mt-0.5">
                        {apt.date.split(' ')[0]}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 text-base">
                        {apt.type}
                      </h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{apt.time} IST</span>
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      isConfirmed
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-100 text-amber-800 border-amber-300'
                    }`}
                  >
                    {apt.status}
                  </span>
                </div>

                <div className="my-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-semibold">{apt.doctor}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{apt.department}</span>
                  </div>

                  <p className="text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] leading-relaxed">
                    <span className="font-semibold text-slate-700">Notes: </span>
                    {apt.notes}
                  </p>

                  <div className="text-[10px] text-slate-400 font-mono">
                    Source: {apt.source}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                {isNeedsConfirmation ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleActionClick(apt, 'Confirm')}
                      className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Confirm Slot</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleActionClick(apt, 'Reschedule')}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                    >
                      Reschedule
                    </button>
                    <button
                      type="button"
                      onClick={() => handleActionClick(apt, 'Cancel')}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-xl text-xs font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <div className="w-full flex items-center justify-between">
                    <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirmed on Clinic Calendar</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleActionClick(apt, 'Reschedule')}
                      className="text-xs text-slate-500 hover:text-slate-900 font-semibold underline"
                    >
                      Change
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmation / Reschedule Modal */}
      {modalAction && activeAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
            <h4 className="font-bold text-slate-900 text-base mb-1">
              {modalAction} Appointment
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              Patient: Aarav Sharma • {activeAppointment.type}
            </p>

            {modalAction === 'Reschedule' ? (
              <div className="space-y-3 text-xs mb-5">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Select New Date</label>
                  <input
                    type="text"
                    value={rescheduleDate}
                    onChange={(e) => setRescheduleDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Select Time Slot</label>
                  <input
                    type="text"
                    value={rescheduleTime}
                    onChange={(e) => setRescheduleTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>
              </div>
            ) : modalAction === 'Cancel' ? (
              <div className="p-3 bg-red-50 text-red-800 rounded-xl text-xs mb-4">
                Are you sure you want to cancel the proposed appointment slot for <strong>{activeAppointment.date}</strong>?
              </div>
            ) : (
              <div className="p-3 bg-blue-50 text-blue-900 rounded-xl text-xs mb-4">
                You are confirming the appointment slot for <strong>{activeAppointment.date} at {activeAppointment.time}</strong> with Dr. Mehta.
              </div>
            )}

            <div className="flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setModalAction(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteModalAction}
                className={`px-4 py-2 text-white rounded-xl font-semibold ${
                  modalAction === 'Cancel' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Execute {modalAction}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
