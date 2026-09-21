import React, { useState } from 'react';
import { 
  Users, 
  HelpCircle, 
  Download, 
  ArrowRight, 
  User, 
  Clock, 
  Inbox, 
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
  Award
} from 'lucide-react';
import { Opportunity, SalesAgent, AssignmentLog } from '../types';

interface AssignmentsScreenProps {
  opportunities: Opportunity[];
  agents: SalesAgent[];
  assignmentLogs: AssignmentLog[];
  onAssignLead: (oppId: string, agentId: string) => void;
}

export default function AssignmentsScreen({
  opportunities,
  agents,
  assignmentLogs,
  onAssignLead
}: AssignmentsScreenProps) {
  
  // Drag and drop tracking
  const [draggedOppId, setDraggedOppId] = useState<string | null>(null);
  const [dragOverAgentId, setDragOverAgentId] = useState<string | null>(null);

  // Click-to-assign tracking (alternative fallback / mobile-friendly)
  const [selectedOppId, setSelectedOppId] = useState<string | null>(null);

  // Filter Unassigned Leads
  const unassignedOpps = opportunities.filter(opp => opp.agentId === null);

  const handleDragStart = (oppId: string) => {
    setDraggedOppId(oppId);
  };

  const handleDragEnd = () => {
    setDraggedOppId(null);
    setDragOverAgentId(null);
  };

  const handleDragOver = (e: React.DragEvent, agentId: string) => {
    e.preventDefault();
    setDragOverAgentId(agentId);
  };

  const handleDragLeave = () => {
    setDragOverAgentId(null);
  };

  const handleDrop = (agentId: string) => {
    if (!draggedOppId) return;
    onAssignLead(draggedOppId, agentId);
    handleDragEnd();
  };

  const handleSelectOpp = (oppId: string) => {
    if (selectedOppId === oppId) {
      setSelectedOppId(null); // Deselect
    } else {
      setSelectedOppId(oppId);
    }
  };

  const handleSelectAgent = (agentId: string) => {
    if (!selectedOppId) return;
    onAssignLead(selectedOppId, agentId);
    setSelectedOppId(null); // Clear selection
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in text-left">
      {/* Header Info */}
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-[#191c1d]">Lead Assignment Matrix</h2>
        <p className="text-sm text-[#5f5e5e] mt-1">
          Drag and drop unassigned leads, or click a lead then select an agent to match workload demands with capacity.
        </p>
      </div>

      {/* Split view Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left column: Unassigned leads pool (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-xl border border-[#e7e8e9] shadow-sm overflow-hidden flex flex-col h-[520px]">
            {/* Header toolbar */}
            <div className="p-4 border-b border-[#e7e8e9] bg-[#f8f9fa] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Inbox className="w-5 h-5 text-[#b7000c]" />
                <h3 className="font-extrabold text-[11px] uppercase text-[#191c1d] tracking-wider">Unassigned Opportunities</h3>
                <span className="bg-[#ffdad6] text-[#93000a] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {unassignedOpps.length} Pending
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-[10px] text-[#5f5e5e] font-semibold bg-white px-2 py-1 border rounded hidden md:inline-block">
                  Draggable Active
                </span>
              </div>
            </div>

            {/* List pool element */}
            <div className="flex-1 overflow-y-auto p-3 bg-neutral-50 space-y-3">
              {unassignedOpps.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-[#5f5e5e] p-6 text-center">
                  <span className="text-3xl">🎉</span>
                  <p className="font-semibold text-xs mt-2 text-[#191c1d]">Assignment Pool Clear!</p>
                  <p className="text-[10px] text-neutral-400 mt-1 max-w-[280px]">
                    All incoming vehicle enquiries have been successfully assigned to active consultants.
                  </p>
                </div>
              ) : (
                unassignedOpps.map((opp) => {
                  const isSelected = selectedOppId === opp.id;
                  return (
                    <div 
                      key={opp.id}
                      draggable
                      onDragStart={() => handleDragStart(opp.id)}
                      onDragEnd={handleDragEnd}
                      onClick={() => handleSelectOpp(opp.id)}
                      className={`p-4 bg-white rounded-lg border shadow-sm cursor-grab active:cursor-grabbing hover:shadow transition-all duration-200 ${
                        isSelected 
                          ? 'border-[2px] border-[#b7000c] bg-[#fff7f6] ring-1 ring-[#b7000c]/20' 
                          : 'border-[#e7e8e9] hover:border-[#b7000c]/30'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1.5 select-none">
                        <span className="font-mono text-xs font-bold text-[#0059af] select-all">{opp.id}</span>
                        <span className="bg-[#f3f4f5] text-[#5f5e5e] font-bold text-[9px] px-2 py-0.5 rounded uppercase tracking-wider">
                          {opp.source}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-[#191c1d] group-hover:text-[#b7000c] transition-colors">
                        {opp.vehicleModel} Enquiry
                      </h4>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-medium text-[11px] text-[#5f5e5e] mt-2 border-t pt-2 border-[#edeeef] select-none">
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-[#5f5e5e]" /> 
                          {opp.customerName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#5f5e5e]" /> 
                          2 hrs ago
                        </span>
                        {isSelected && (
                          <span className="ml-auto text-[10px] font-bold text-[#b7000c] bg-[#ffdad6] px-1.5 py-0.5 rounded-full animate-pulse">
                            Clicked: Select Agent below to match!
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right column: Sales agents directory (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="flex justify-between items-center select-none">
            <h3 className="font-extrabold text-[11px] uppercase text-[#5f5e5e] tracking-wider">Agent Workload Directory</h3>
            <div className="flex items-center gap-1 text-[11px] text-[#5f5e5e] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 block"></span> Available Consultants
            </div>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[480px]">
            {agents.map((agent) => {
              // Calculate status classes
              const isDragOccupied = dragOverAgentId === agent.id;
              const hasCapacity = agent.activeLeads < agent.capacity;
              const capacityPct = Math.min((agent.activeLeads / agent.capacity) * 100, 100);
              
              // Load capacity colors
              let barColorClass = 'bg-[#b7000c]'; // warning/high load red
              if (agent.activeLeads <= 5) barColorClass = 'bg-emerald-600'; // good/low load
              else if (agent.activeLeads <= 8) barColorClass = 'bg-[#f59e0b]'; // moderate load

              return (
                <div 
                  key={agent.id}
                  onDragOver={(e) => handleDragOver(e, agent.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={() => handleDrop(agent.id)}
                  onClick={() => selectedOppId && handleSelectAgent(agent.id)}
                  className={`bg-white rounded-xl border p-4 shadow-sm relative overflow-hidden transition-all duration-300 select-none ${
                    isDragOccupied 
                      ? 'border-[#b7000c] border-[2px] bg-[#fff7f6] scale-[1.02]' 
                      : selectedOppId && hasCapacity
                      ? 'border-[#0059af] hover:bg-[#d6e3ff]/10 cursor-pointer hover:scale-[1.01]'
                      : 'border-[#e7e8e9]'
                  }`}
                >
                  {/* Visual Drop Overlay indicator */}
                  {isDragOccupied && (
                    <div className="absolute inset-0 bg-[#b7000c]/5 pointer-events-none"></div>
                  )}

                  <div className="flex items-start gap-4 relative z-10">
                    <div className="relative">
                      <div className="w-11 h-11 rounded-full bg-[#f3f4f5] overflow-hidden border-2 border-white shadow-sm">
                        <img 
                          src={agent.avatar} 
                          alt={agent.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#10b981] border-2 border-white rounded-full"></span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-bold text-sm text-[#191c1d] truncate">{agent.name}</h4>
                        <span className="bg-[#edeeef] text-[#191c1d] font-bold text-[10px] px-2 py-0.5 rounded-full font-mono">
                          {agent.activeLeads} / {agent.capacity} leads
                        </span>
                      </div>
                      <p className="text-[11px] text-[#5f5e5e] font-semibold leading-none mb-3">{agent.role}</p>

                      {/* Workload Progress Bar */}
                      <div className="w-full bg-[#f3f4f5] rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-300 ${barColorClass}`} 
                          style={{ width: `${capacityPct}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between text-[9px] text-[#5f5e5e] font-extrabold mt-1.5 uppercase tracking-wide">
                        <span>Utilization</span>
                        <span>{capacityPct}% Capacity</span>
                      </div>
                    </div>
                  </div>

                  {/* Visual CTAs for Drop / Select Action */}
                  {isDragOccupied && (
                    <div className="mt-3 pt-2.5 border-t border-[#e9bcb6] flex justify-center animate-pulse">
                      <span className="text-[11px] font-bold text-[#b7000c] flex items-center gap-1 uppercase tracking-wider">
                        <ArrowRight className="w-4 h-4" /> Release Drag to Assign Lead
                      </span>
                    </div>
                  )}

                  {!isDragOccupied && selectedOppId && hasCapacity && (
                    <div className="mt-3 pt-2 border-t border-[#d1e2f3] flex justify-center">
                      <span className="text-[10px] font-bold text-[#0059af] flex items-center gap-1 uppercase tracking-wide">
                        Click here to Assign Lead
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Logs Table (Bottom audit section) */}
      <div className="mt-4 select-text">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-[#b7000c] animate-pulse" />
          <h3 className="font-extrabold text-[11px] uppercase text-[#5f5e5e] tracking-wider">Recent Portal Assignments Audit</h3>
        </div>

        <div className="bg-white rounded-xl border border-[#e7e8e9] shadow-sm overflow-hidden mb-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f9fa] border-b border-[#e1e3e4] text-[11px] font-extrabold text-[#5f5e5e] uppercase tracking-wider">
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Lead ID</th>
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Match Assigned To</th>
                <th className="py-3 px-4">Routing Method</th>
              </tr>
            </thead>
            <tbody className="text-xs text-[#191c1d] divide-y divide-[#edeeef] bg-white font-medium">
              {assignmentLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#f3f4f5]/40 transition-colors">
                  <td className="py-3.5 px-4 text-[#5f5e5e]">{log.time}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#0059af]">{log.leadId}</td>
                  <td className="py-3.5 px-4 font-bold">{log.customerName}</td>
                  <td className="py-3.5 px-4 flex items-center gap-2">
                    <div className="w-5 h-5 bg-[#f3f4f5] rounded-full overflow-hidden border">
                      <img src={log.agentAvatar} alt={log.agentName} className="w-full h-full object-cover" />
                    </div>
                    <strong>{log.agentName}</strong>
                  </td>
                  <td className="py-3.5 px-4 text-[#5f5e5e] font-semibold">{log.actionBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
