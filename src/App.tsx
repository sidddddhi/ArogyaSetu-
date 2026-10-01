import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { NavItem, DocumentItem, CareTask, TimelineEvent, MissingDocumentItem } from './types';
import {
  mockPatient,
  initialTimelineEvents,
  initialDocuments,
  initialCareTasks,
  initialAppointments,
  factReasoningItems,
  initialMissingDocument,
  initialAgentActivities,
  initialDoctorBrief,
} from './data/mockCareflowData';

import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { DashboardView } from './components/DashboardView';
import { PatientTimelineView } from './components/PatientTimelineView';
import { DocumentsView } from './components/DocumentsView';
import { CareTasksView } from './components/CareTasksView';
import { AppointmentsView } from './components/AppointmentsView';
import { FactReasoningPanel } from './components/FactReasoningPanel';
import { DoctorBriefView } from './components/DoctorBriefView';
import { SettingsView } from './components/SettingsView';
import { MultiAgentModal } from './components/MultiAgentModal';

function CareFlowMain() {
  const { t } = useLanguage();
  const [currentNav, setCurrentNav] = useState<NavItem>('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isPipelineModalOpen, setIsPipelineModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Patient & Coordination Data State
  const [patient, setPatient] = useState(mockPatient);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(initialTimelineEvents);
  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments);
  const [careTasks, setCareTasks] = useState<CareTask[]>(initialCareTasks);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [reasoningItems, setReasoningItems] = useState(factReasoningItems);
  const [missingItem, setMissingItem] = useState<MissingDocumentItem>(initialMissingDocument);
  const [agentActivities, setAgentActivities] = useState(initialAgentActivities);
  const [doctorBrief, setDoctorBrief] = useState(initialDoctorBrief);

  // Counters
  const pendingTasksCount = careTasks.filter((t) => t.status === 'Needs Confirmation').length;
  const unconfirmedCount = reasoningItems.filter((r) => r.category === 'NEEDS_CONFIRMATION').length;
  const upcomingAptsCount = appointments.length;

  // Handlers
  const handleUpdateTaskStatus = (taskId: string, newStatus: CareTask['status']) => {
    setCareTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );

    // If task-1 confirmed, update follow-up timeline event & appointment as well
    if (taskId === 'task-1' && newStatus === 'Confirmed') {
      setTimelineEvents((prev) =>
        prev.map((evt) =>
          evt.id === 'evt-5' ? { ...evt, status: 'confirmed' } : evt
        )
      );
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === 'apt-2' ? { ...apt, status: 'Confirmed' } : apt
        )
      );
    }
  };

  const handleAddTask = (newTask: CareTask) => {
    setCareTasks((prev) => [newTask, ...prev]);
    setAgentActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        agentName: 'Task Agent',
        action: `Queued administrative task: "${newTask.title.slice(0, 35)}..."`,
        timestamp: 'Just now',
        type: 'info',
        icon: 'CheckSquare',
      },
      ...prev,
    ]);
  };

  const handleAddDocument = (newDoc: DocumentItem) => {
    setDocuments((prev) => [newDoc, ...prev]);
    setAgentActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        agentName: 'Document Agent',
        action: `Ingested, parsed & extracted facts from ${newDoc.name}`,
        timestamp: 'Just now',
        type: 'success',
        icon: 'FileText',
      },
      ...prev,
    ]);
  };

  const handleConfirmAppointment = (aptId: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === aptId ? { ...a, status: 'Confirmed' } : a))
    );
  };

  const handleCancelAppointment = (aptId: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== aptId));
  };

  const handleUpdateMissingStatus = (status: MissingDocumentItem['status']) => {
    setMissingItem((prev) => ({ ...prev, status }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans selection:bg-blue-600 selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar
        currentNav={currentNav}
        onNavigate={setCurrentNav}
        pendingTasksCount={pendingTasksCount}
        unconfirmedCount={unconfirmedCount}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* TopBar Header */}
        <TopBar
          onOpenMobile={() => setIsMobileOpen(true)}
          onRunPipeline={() => setIsPipelineModalOpen(true)}
          patient={patient}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* View Routing */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentNav === 'dashboard' && (
            <DashboardView
              patient={patient}
              timelineEvents={timelineEvents}
              pendingTasksCount={pendingTasksCount}
              upcomingAptsCount={upcomingAptsCount}
              missingItem={missingItem}
              agentActivities={agentActivities}
              onNavigate={setCurrentNav}
              onOpenPipelineModal={() => setIsPipelineModalOpen(true)}
              onUpdateMissingStatus={handleUpdateMissingStatus}
              onTaskCreated={handleAddTask}
              onSelectTimelineEvent={(evt) => setCurrentNav('timeline')}
            />
          )}

          {currentNav === 'timeline' && (
            <PatientTimelineView
              events={timelineEvents}
              patient={patient}
              onOpenCompare={() => setCurrentNav('insights')}
            />
          )}

          {currentNav === 'documents' && (
            <DocumentsView
              documents={documents}
              onAddDocument={handleAddDocument}
            />
          )}

          {currentNav === 'tasks' && (
            <CareTasksView
              tasks={careTasks}
              onUpdateTaskStatus={handleUpdateTaskStatus}
              onAddTask={handleAddTask}
            />
          )}

          {currentNav === 'appointments' && (
            <AppointmentsView
              appointments={appointments}
              onConfirmAppointment={handleConfirmAppointment}
              onCancelAppointment={handleCancelAppointment}
            />
          )}

          {currentNav === 'insights' && (
            <FactReasoningPanel
              reasoningItems={reasoningItems}
              missingItem={missingItem}
              onUpdateMissingStatus={handleUpdateMissingStatus}
            />
          )}

          {currentNav === 'doctor-brief' && (
            <DoctorBriefView brief={doctorBrief} />
          )}

          {currentNav === 'settings' && (
            <SettingsView />
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 mt-auto py-6 px-6 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 font-display">CareFlow AI</span>
              <span>— From Patient Information to Coordinated Care</span>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span>Human-in-the-loop Protocol Active</span>
              <span>•</span>
              <span>No Medical Predictions or Diagnoses</span>
              <span>•</span>
              <span className="font-mono">HIPAA &amp; ABDM Ready</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Multi-Agent Orchestration Visualizer Modal */}
      <MultiAgentModal
        isOpen={isPipelineModalOpen}
        onClose={() => setIsPipelineModalOpen(false)}
        onPipelineComplete={() => {
          setAgentActivities((prev) => [
            {
              id: `act-${Date.now()}`,
              agentName: 'Orchestrator Agent',
              action: 'Completed full multi-agent synchronization across all 6 agents',
              timestamp: 'Just now',
              type: 'success',
              icon: 'Sparkles',
            },
            ...prev,
          ]);
        }}
      />
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <CareFlowMain />
    </LanguageProvider>
  );
}

export default App;
