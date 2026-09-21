import React, { useState } from 'react';
import { 
  Plus, 
  Download, 
  Search, 
  Filter, 
  Car, 
  Check, 
  UserPlus, 
  AlertTriangle, 
  CheckCircle,
  Eye,
  RefreshCw,
  X,
  FileSpreadsheet
} from 'lucide-react';
import { Opportunity, SalesAgent } from '../types';

interface OpportunitiesScreenProps {
  opportunities: Opportunity[];
  agents: SalesAgent[];
  onSelectOpportunityForReview: (oppId: string) => void;
  onNavigateToTab: (tab: string) => void;
  onAddOpportunity: (newOpp: Opportunity) => void;
}

export default function OpportunitiesScreen({ 
  opportunities, 
  agents,
  onSelectOpportunityForReview,
  onNavigateToTab,
  onAddOpportunity
}: OpportunitiesScreenProps) {
  
  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('All Stages');
  const [agentFilter, setAgentFilter] = useState('All Agents');
  
  // New Opportunity Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCustName, setNewCustName] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');
  const [newCustEmail, setNewCustEmail] = useState('');
  const [newVehicleModel, setNewVehicleModel] = useState('Mitsubishi Triton Athlete');
  const [newColor, setNewColor] = useState('White Diamond');
  const [newStage, setNewStage] = useState<'New Lead' | 'Test Drive' | 'Quotation' | 'Booking Pending' | 'Won'>('New Lead');
  const [newSource, setNewSource] = useState<'Website Form' | 'Showroom Walk-in' | 'Facebook Ad' | 'Outbound Call'>('Website Form');
  const [newAgentId, setNewAgentId] = useState('');
  const [newFinancing, setNewFinancing] = useState('Hire Purchase - 9 Years');
  const [newNotes, setNewNotes] = useState('');

  // Compute stats based on state
  const activePipelineCount = opportunities.filter(o => o.stage !== 'Won' && o.stage !== 'Rejected').length;
  const needsAssignmentCount = opportunities.filter(o => o.agentId === null).length;

  // Filter logic
  const filteredOpps = opportunities.filter(opp => {
    const matchesSearch = 
      opp.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.vehicleModel.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStage = 
      stageFilter === 'All Stages' || 
      opp.stage === stageFilter ||
      (stageFilter === 'Discount Approval' && opp.approvalStatus === 'Pending Review');

    const matchesAgent = 
      agentFilter === 'All Agents' || 
      (agentFilter === 'Unassigned' && opp.agentId === null) ||
      opp.agentId === agentFilter;

    return matchesSearch && matchesStage && matchesAgent;
  });

  const getStageBadgeClass = (opp: Opportunity) => {
    if (opp.approvalStatus === 'Pending Review') {
      return 'bg-[#ffdad6] text-[#93000a] border border-[#ffb4aa]';
    }
    switch (opp.stage) {
      case 'New Lead':
        return 'bg-[#ffdad6] text-[#93000a] border border-[#ffb4aa]';
      case 'Test Drive':
        return 'bg-[#d6e3ff] text-[#001b3d] border border-[#a9c7ff]';
      case 'Quotation':
        return 'bg-[#edeeef] text-[#5f5e5e] border border-[#e1e3e4]';
      case 'Booking Pending':
        return 'bg-[#fff8e1] text-[#f57f17] border border-[#ffe082]';
      case 'Won':
        return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      case 'Rejected':
        return 'bg-rose-100 text-rose-800 border border-rose-200';
      default:
        return 'bg-[#edeeef] text-[#191c1d] border border-[#e1e3e4]';
    }
  };

  const handleCreateOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName.trim()) {
      alert('Please fill in the customer name.');
      return;
    }

    const assignedAgent = agents.find(a => a.id === newAgentId);

    const generatedId = `OPP-2023-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOpp: Opportunity = {
      id: generatedId,
      customerName: newCustName,
      customerPhone: newCustPhone || '+60 12-000 0000',
      customerEmail: newCustEmail || 'customer@example.com',
      vehicleModel: newVehicleModel,
      color: newColor,
      stage: newStage,
      source: newSource,
      agentId: newAgentId || null,
      agentName: assignedAgent ? assignedAgent.name : null,
      dateCreated: new Date().toISOString().split('T')[0],
      financingType: newFinancing,
      documents: [
        { id: 'custom-doc', name: 'IC_Identification.pdf', type: 'PDF', size: '1.2 MB', verified: true, symbol: 'badge' }
      ],
      notes: newNotes,
      dmsRef: null,
      dmsStatus: 'Pending',
      revenue: newVehicleModel.includes('Triton') ? 155000 : newVehicleModel.includes('Outlander') ? 145000 : 109000,
      approvalStatus: newStage === 'New Lead' ? undefined : undefined
    };

    onAddOpportunity(newOpp);
    
    // Reset Form
    setNewCustName('');
    setNewCustPhone('');
    setNewCustEmail('');
    setNewVehicleModel('Mitsubishi Triton Athlete');
    setNewColor('White Diamond');
    setNewStage('New Lead');
    setNewSource('Website Form');
    setNewAgentId('');
    setNewFinancing('Hire Purchase - 9 Years');
    setNewNotes('');
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#191c1d] leading-none">Opportunity Management</h2>
          <p className="text-sm text-[#5f5e5e] mt-2">Track, assign, and advance the sales pipeline.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => alert('Opportunities exported to Excel/DMS CSV format successfully!')}
            className="px-4 py-2 bg-white border border-[#e9bcb6] text-[#191c1d] font-bold text-xs rounded hover:bg-[#f3f4f5] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" /> Export
          </button>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-[#b7000c] text-white font-bold text-xs rounded hover:bg-[#b7000c]/90 transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" /> New Opportunity
          </button>
        </div>
      </div>

      {/* KPI Stats Block */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white border border-[#e1e3e4] rounded-lg p-4 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="font-bold text-[11px] text-[#5f5e5e] uppercase tracking-wide">Active Pipeline</span>
            <div className="p-1 bg-[#d6e3ff] rounded text-[#001b3d]">
              <Car className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#191c1d]">{activePipelineCount}</div>
            <div className="text-[11px] text-[#2b72cd] flex items-center gap-1 mt-1 font-bold">
              <Check className="w-3.5 h-3.5" /> 12% vs last month
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border border-[#e1e3e4] rounded-lg p-4 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="font-bold text-[11px] text-[#5f5e5e] uppercase tracking-wide">Needs Assignment</span>
            <div className="p-1 bg-[#ffdad6] rounded text-[#93000a]">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#191c1d]">{needsAssignmentCount}</div>
            <div className="text-[11px] text-[#ba1a1a] flex items-center gap-1 mt-1 font-bold">
              Requires immediate action
            </div>
          </div>
        </div>

        {/* Filters Panel Span remaining */}
        <div className="md:col-span-2 bg-white border border-[#e1e3e4] rounded-lg p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-1.5 mb-2 font-bold text-[11px] text-[#191c1d]">
            <Filter className="w-4 h-4 text-[#5f5e5e]" /> Pipeline Filters
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            {/* Stage filter */}
            <div>
              <label className="block text-[10px] text-[#5f5e5e] font-bold mb-1">Stage</label>
              <select 
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="w-full text-xs bg-[#f8f9fa] border border-[#e1e3e4] rounded p-2 focus:border-[#b7000c] text-[#191c1d] outline-none cursor-pointer font-medium"
              >
                <option>All Stages</option>
                <option>New Lead</option>
                <option>Test Drive</option>
                <option>Quotation</option>
                <option>Booking Pending</option>
                <option>Discount Approval</option>
                <option>Won</option>
                <option>Rejected</option>
              </select>
            </div>
            {/* Agent filter */}
            <div>
              <label className="block text-[10px] text-[#5f5e5e] font-bold mb-1">Agent</label>
              <select 
                value={agentFilter}
                onChange={(e) => setAgentFilter(e.target.value)}
                className="w-full text-xs bg-[#f8f9fa] border border-[#e1e3e4] rounded p-2 focus:border-[#b7000c] text-[#191c1d] outline-none cursor-pointer font-medium"
              >
                <option>All Agents</option>
                <option>Unassigned</option>
                {agents.map(a => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table for Pipeline */}
      <div className="bg-white border border-[#e7e8e9] rounded-lg shadow-sm overflow-hidden flex flex-col">
        {/* Table Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-3 border-b border-[#e7e8e9] bg-[#f8f9fa]">
          <div className="relative w-full sm:max-w-md">
            <span className="absolute left-3 top-2.5 text-[#5f5e5e]">
              <Search className="w-4 h-4" />
            </span>
            <input 
              type="text" 
              placeholder="Search by ID, Customer name or Vehicle Model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 w-full bg-white border border-[#e1e3e4] hover:bg-[#f3f4f5] focus:outline-none focus:border-[#b7000c] rounded text-xs text-[#191c1d] font-medium"
            />
          </div>
          <div className="text-[11px] text-[#5f5e5e] font-semibold">
            Showing {filteredOpps.length} of {opportunities.length} Pipeline Records
          </div>
        </div>

        {/* Database Table Layout */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f3f4f5] border-b border-[#e1e3e4] text-[11px] font-extrabold text-[#5f5e5e] uppercase tracking-wider">
                <th className="py-3 px-4 w-24">ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Vehicle Model</th>
                <th className="py-3 px-4">Stage</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">Assigned Agent</th>
                <th className="py-3 px-4 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs text-[#191c1d] divide-y divide-[#edeeef] bg-white">
              {filteredOpps.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#5f5e5e] font-medium">
                    No active opportunities match the selected search or filters. Try resetting!
                  </td>
                </tr>
              ) : (
                filteredOpps.map((opp) => (
                  <tr key={opp.id} className="hover:bg-[#f3f4f5]/60 transition-colors group">
                    <td className="py-3 text-4 text-xs font-mono font-bold text-[#0059af] whitespace-nowrap px-4 select-all">
                      {opp.id}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#191c1d]">{opp.customerName}</div>
                      <div className="text-[10px] text-[#5f5e5e] font-medium">{opp.customerPhone}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 font-bold text-[#191c1d]">
                        <Car className="w-3.5 h-3.5 text-[#0059af]" />
                        {opp.vehicleModel}
                        <span className="text-[10px] font-medium text-[#5f5e5e]">({opp.color})</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${getStageBadgeClass(opp)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${opp.approvalStatus === 'Pending Review' ? 'bg-[#ba1a1a] animate-ping' : opp.stage === 'Won' ? 'bg-emerald-600' : 'bg-[#5f5e5e]'}`}></span>
                        {opp.approvalStatus === 'Pending Review' ? 'Discount Review' : opp.stage}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#5f5e5e] font-medium">
                      {opp.source}
                    </td>
                    <td className="py-3 px-4">
                      {opp.agentId ? (
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-[#f3f4f5] border overflow-hidden">
                            <img 
                              src={agents.find(a => a.id === opp.agentId)?.avatar} 
                              alt="agent" 
                              className="w-full h-full object-cover" 
                              onError={(e) => {
                                // Fallback
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          </div>
                          <span className="font-bold text-[#191c1d]">{opp.agentName}</span>
                        </div>
                      ) : (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded border border-dashed border-[#e9bcb6] text-[#5f5e5e] text-[10px] font-bold bg-[#f8f9fa]">
                          Unassigned
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right pr-6">
                      <div className="flex items-center justify-end gap-1.5">
                        {opp.approvalStatus === 'Pending Review' ? (
                          <button 
                            onClick={() => onSelectOpportunityForReview(opp.id)}
                            className="bg-[#b7000c] text-white px-3 py-1 rounded font-bold text-[11px] hover:bg-[#b7000c]/90 transition-colors shadow-sm select-none cursor-pointer"
                          >
                            Review
                          </button>
                        ) : opp.agentId === null ? (
                          <button 
                            onClick={() => onNavigateToTab('assignments')}
                            className="text-[#b7000c] border border-[#e9bcb6] hover:bg-[#b7000c] hover:text-white px-2.5 py-1 rounded font-bold text-[11px] transition-all cursor-pointer"
                          >
                            Assign
                          </button>
                        ) : (
                          <button 
                            onClick={() => alert(`Showing client records for ${opp.customerName}. Notes: ${opp.notes}`)}
                            className="text-[#5f5e5e] border border-[#e1e3e4] hover:border-[#b7000c] px-1.5 py-1 rounded transition-all cursor-pointer"
                            title="Quick View Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Opportunity Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
          <div className="relative bg-white rounded-xl shadow-xl border border-[#e1e3e4] w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-[#e1e3e4] bg-[#f8f9fa]">
              <h3 className="text-sm font-extrabold text-[#191c1d] uppercase tracking-wider flex items-center gap-1.5">
                <Car className="text-[#b7000c] w-5 h-5" /> Append New Lead / Sale Record
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-[#5f5e5e] hover:text-[#b7000c] p-1.5 rounded-full hover:bg-[#edeeef]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleCreateOpportunity} className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-[#5f5e5e] font-extrabold uppercase mb-1">Customer Full Name *</label>
                  <input 
                    type="text" 
                    required
                    value={newCustName}
                    onChange={(e) => setNewCustName(e.target.value)}
                    placeholder="e.g. Ahmad Razali"
                    className="w-full text-xs border border-[#e1e3e4] p-2.5 rounded focus:outline-none focus:border-[#b7000c] font-medium text-[#191c1d]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#5f5e5e] font-extrabold uppercase mb-1">Phone Contact</label>
                  <input 
                    type="text" 
                    value={newCustPhone}
                    onChange={(e) => setNewCustPhone(e.target.value)}
                    placeholder="e.g. +60 12-480 9182"
                    className="w-full text-xs border border-[#e1e3e4] p-2.5 rounded focus:outline-none focus:border-[#b7000c] font-medium text-[#191c1d]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-[#5f5e5e] font-extrabold uppercase mb-1">Email Address</label>
                  <input 
                    type="email" 
                    value={newCustEmail}
                    onChange={(e) => setNewCustEmail(e.target.value)}
                    placeholder="e.g. razali@gmail.com"
                    className="w-full text-xs border border-[#e1e3e4] p-2.5 rounded focus:outline-none focus:border-[#b7000c] font-medium text-[#191c1d]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#5f5e5e] font-extrabold uppercase mb-1">Financing Type</label>
                  <input 
                    type="text" 
                    value={newFinancing}
                    onChange={(e) => setNewFinancing(e.target.value)}
                    placeholder="e.g. Hire Purchase - 9 Years"
                    className="w-full text-xs border border-[#e1e3e4] p-2.5 rounded focus:outline-none focus:border-[#b7000c] font-medium text-[#191c1d]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-[#5f5e5e] font-extrabold uppercase mb-1">Vehicle Model</label>
                  <select 
                    value={newVehicleModel}
                    onChange={(e) => setNewVehicleModel(e.target.value)}
                    className="w-full text-xs border border-[#e1e3e4] p-2.5 rounded focus:outline-none focus:border-[#b7000c] bg-white font-medium text-[#191c1d] cursor-pointer"
                  >
                    <option>Mitsubishi Triton Athlete</option>
                    <option>Mitsubishi Xpander Cross</option>
                    <option>Mitsubishi Outlander</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-[#5f5e5e] font-extrabold uppercase mb-1">Body Paint Color</label>
                  <input 
                    type="text" 
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    placeholder="e.g. White Diamond"
                    className="w-full text-xs border border-[#e1e3e4] p-2.5 rounded focus:outline-none focus:border-[#b7000c] font-medium text-[#191c1d]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-[#5f5e5e] font-extrabold uppercase mb-1">Pipeline Entry Stage</label>
                  <select 
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value as any)}
                    className="w-full text-xs border border-[#e1e3e4] p-2.5 rounded focus:outline-none focus:border-[#b7000c] bg-white font-medium text-[#191c1d] cursor-pointer"
                  >
                    <option value="New Lead">New Lead (Standard)</option>
                    <option value="Test Drive">Test Drive booked</option>
                    <option value="Quotation">Quotation Sent</option>
                    <option value="Booking Pending">Booking Pending</option>
                    <option value="Won">Won (Deal Complete)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-[#5f5e5e] font-extrabold uppercase mb-1">Lead Traffic Channel Source</label>
                  <select 
                    value={newSource}
                    onChange={(e) => setNewSource(e.target.value as any)}
                    className="w-full text-xs border border-[#e1e3e4] p-2.5 rounded focus:outline-none focus:border-[#b7000c] bg-white font-medium text-[#191c1d] cursor-pointer"
                  >
                    <option>Website Form</option>
                    <option>Showroom Walk-in</option>
                    <option>Facebook Ad</option>
                    <option>Outbound Call</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[#5f5e5e] font-extrabold uppercase mb-1">Direct Assignment to Consultant</label>
                <select 
                  value={newAgentId}
                  onChange={(e) => setNewAgentId(e.target.value)}
                  className="w-full text-xs border border-[#e1e3e4] p-2.5 rounded focus:outline-none focus:border-[#b7000c] bg-white font-medium text-[#191c1d] cursor-pointer"
                >
                  <option value="">Leave Unassigned (Pool Lead)</option>
                  {agents.map(a => (
                    <option key={a.id} value={a.id}>{a.name} ({a.role} - Workload: {a.activeLeads})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-[#5f5e5e] font-extrabold uppercase mb-1">Special Internal Notes / Requests</label>
                <textarea 
                  rows={3}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Customer requested a free dashboard cam or is trad-in candidate."
                  className="w-full text-xs border border-[#e1e3e4] p-2.5 rounded focus:outline-none focus:border-[#b7000c] font-medium text-[#191c1d]"
                />
              </div>

              {/* Modal Footer Buttons */}
              <div className="flex justify-end gap-2 pt-3 border-t border-[#e1e3e4]">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-[#e1e3e4] hover:bg-[#f3f4f5] text-[#5f5e5e] font-bold text-xs rounded transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-[#b7000c] hover:bg-[#b7000c]/90 text-white font-bold text-xs rounded transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Submit Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
