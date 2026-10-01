export type Language = 'en' | 'hi' | 'mr';

export type NavItem =
  | 'dashboard'
  | 'timeline'
  | 'documents'
  | 'tasks'
  | 'appointments'
  | 'insights'
  | 'doctor-brief'
  | 'settings';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  dob: string;
  phone: string;
  email: string;
  medicalRecordNo: string;
  primaryPhysician: string;
  careTeam: string[];
}

export type TimelineStatus = 'verified' | 'confirmed' | 'requires_confirmation';

export interface TimelineEvent {
  id: string;
  date: string;
  displayDate: string;
  title: string;
  type: 'consultation' | 'prescription' | 'lab_report' | 'appointment' | 'follow_up';
  description: string;
  status: TimelineStatus;
  sourceDocId?: string;
  sourceDocName?: string;
  extractedFacts: { label: string; value: string; isVerified: boolean }[];
  relatedTasks: string[];
  evidenceQuote?: string;
  sourcePage?: number;
}

export interface DocumentItem {
  id: string;
  name: string;
  type: 'Prescription' | 'Lab Report' | 'Discharge Summary' | 'Appointment Note';
  uploadDate: string;
  size: string;
  status: 'analyzed' | 'processing' | 'pending';
  pages: number;
  extractedData: {
    patientName: string;
    documentType: string;
    date: string;
    facts: { label: string; value: string; verified: boolean; evidence: string; page: number }[];
  };
  mockContent: {
    hospitalHeader: string;
    doctorName: string;
    date: string;
    sections: { heading: string; lines: string[]; highlightText?: string }[];
  };
}

export interface CareTask {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  status: 'Needs Confirmation' | 'Confirmed' | 'Rejected';
  source: string;
  category: 'Scheduling' | 'Document' | 'Review' | 'Coordination';
  createdAt: string;
}

export interface AppointmentItem {
  id: string;
  date: string;
  time: string;
  type: string;
  doctor: string;
  department: string;
  status: 'Confirmed' | 'Needs Confirmation' | 'Pending Scheduling';
  notes: string;
  source: string;
}

export type ReasoningCategory = 'VERIFIED_FACT' | 'POSSIBLE_INFERENCE' | 'NEEDS_CONFIRMATION';

export interface FactReasoningItem {
  id: string;
  category: ReasoningCategory;
  text: string;
  explanation: string;
  source: string;
  badgeLabel: string;
}

export interface MissingDocumentItem {
  id: string;
  title: string;
  referencedIn: string;
  details: string;
  status: 'Document not found' | 'Requested' | 'Marked as Available' | 'Ignored';
  referencedDate: string;
}

export interface AgentActivity {
  id: string;
  agentName: string;
  action: string;
  timestamp: string;
  type: 'success' | 'warning' | 'info';
  icon: string;
}

export interface DoctorBriefData {
  patientName: string;
  patientId: string;
  age: number;
  gender: string;
  generatedDate: string;
  recentEvents: { date: string; title: string }[];
  documents: { name: string; verified: boolean }[];
  pendingItems: string[];
  recentChanges: string[];
  questionsRequiringConfirmation: string[];
}
