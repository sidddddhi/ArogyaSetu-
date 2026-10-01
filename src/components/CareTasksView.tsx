import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CareTask } from '../types';
import {
  CheckSquare,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Edit3,
  Plus,
  Filter,
  Sparkles,
  UserCheck,
  Check,
  Calendar
} from 'lucide-react';

interface CareTasksViewProps {
  tasks: CareTask[];
  onUpdateTaskStatus: (taskId: string, newStatus: CareTask['status']) => void;
  onAddTask: (task: CareTask) => void;
}

export const CareTasksView: React.FC<CareTasksViewProps> = ({
  tasks,
  onUpdateTaskStatus,
  onAddTask,
}) => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'All' | 'Needs Confirmation' | 'Confirmed' | 'Rejected'>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState<CareTask | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<CareTask['priority']>('Medium');
  const [newTaskDueDate, setNewTaskDueDate] = useState('15 Oct 2026');

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'All') return true;
    return t.status === filter;
  });

  const handleConfirmTask = (taskId: string, title: string) => {
    onUpdateTaskStatus(taskId, 'Confirmed');
    setToastMessage(`Task confirmed: "${title}"`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRejectTask = (taskId: string, title: string) => {
    onUpdateTaskStatus(taskId, 'Rejected');
    setToastMessage(`Task rejected: "${title}"`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const task: CareTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      description: 'Manually logged administrative task by care coordination coordinator.',
      priority: newTaskPriority,
      dueDate: newTaskDueDate,
      status: 'Confirmed',
      source: 'Care Coordinator',
      category: 'Coordination',
      createdAt: 'Just now',
    };

    onAddTask(task);
    setShowAddModal(false);
    setNewTaskTitle('');
    setToastMessage('New administrative care task created');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 border border-slate-700 animate-in slide-in-from-bottom-5 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Featured AI Task Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-blue-400/20">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-200 border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AI Task Agent Recommendation</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display">
              Follow-up appointment needs confirmation
            </h3>

            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              Based on the extracted physician instruction from <em>Lab_Report.pdf</em> ("Review after two weeks"), CareFlow suggests confirming the appointment slot for <strong>14 October 2026</strong>.
            </p>

            <div className="flex items-center gap-2 text-xs text-blue-200">
              <span className="font-semibold text-white">Status:</span>
              <span className="bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded-full font-bold border border-amber-400/30">
                Needs Human Confirmation
              </span>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => handleConfirmTask('task-1', 'Follow-up appointment confirmed')}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5 transition-all transform active:scale-98"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Confirm Task</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const target = tasks.find((t) => t.id === 'task-1');
                if (target) setEditingTask(target);
              }}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold border border-white/20 transition-all flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>

            <button
              type="button"
              onClick={() => handleRejectTask('task-1', 'Follow-up appointment task rejected')}
              className="px-4 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/40 rounded-xl text-xs font-semibold transition-all"
            >
              Reject
            </button>
          </div>
        </div>
      </div>

      {/* Task List Container */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-base text-slate-900 font-display">
              Care Coordination Tasks ({filteredTasks.length})
            </h3>
            <p className="text-xs text-slate-500">
              Active administrative duties assigned to the clinical care coordination team
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
          {(['All', 'Needs Confirmation', 'Confirmed', 'Rejected'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
                filter === st
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'All' ? `All Tasks (${tasks.length})` : st}
            </button>
          ))}
        </div>

        {/* Task Cards Grid */}
        <div className="space-y-3 pt-2">
          {filteredTasks.map((task) => {
            const isPending = task.status === 'Needs Confirmation';
            const isConfirmed = task.status === 'Confirmed';
            const isRejected = task.status === 'Rejected';

            return (
              <div
                key={task.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isPending
                    ? 'border-amber-300 bg-amber-50/20'
                    : isConfirmed
                    ? 'border-slate-200 bg-white hover:border-slate-300'
                    : 'border-slate-200 bg-slate-50/50 opacity-60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                          task.priority === 'High'
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : task.priority === 'Medium'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        {task.priority} Priority
                      </span>

                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isPending
                            ? 'bg-amber-100 text-amber-800'
                            : isConfirmed
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {task.status}
                      </span>

                      <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                        Source: {task.source}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      {isConfirmed && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                      <span>{task.title}</span>
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {task.description}
                    </p>

                    <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        Due: {task.dueDate}
                      </span>
                      <span>•</span>
                      <span>Category: {task.category}</span>
                    </div>
                  </div>

                  {/* Actions Right */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    {isPending ? (
                      <>
                        <button
                          type="button"
                          onClick={() => handleConfirmTask(task.id, task.title)}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1 transition-all"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Confirm</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingTask(task)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRejectTask(task.id, task.title)}
                          className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-xl text-xs font-semibold transition-all"
                        >
                          Reject
                        </button>
                      </>
                    ) : isConfirmed ? (
                      <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Actioned</span>
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">Rejected</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Task Modal */}
      {editingTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
            <h4 className="font-bold text-slate-900 text-base mb-3">Edit Administrative Task</h4>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Task Title</label>
                <input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Due Date</label>
                <input
                  type="text"
                  value={editingTask.dueDate}
                  onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200"
                />
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingTask(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  handleConfirmTask(editingTask.id, editingTask.title);
                  setEditingTask(null);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold"
              >
                Save &amp; Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
            <h4 className="font-bold text-slate-900 text-base mb-3">New Administrative Care Task</h4>
            <form onSubmit={handleCreateTask} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Task Description *</label>
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Schedule diagnostic follow-up scan"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Priority</label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as CareTask['priority'])}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Due Date</label>
                  <input
                    type="text"
                    value={newTaskDueDate}
                    onChange={(e) => setNewTaskDueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>
              </div>
              <div className="mt-5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
