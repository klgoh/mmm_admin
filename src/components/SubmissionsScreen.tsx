import React, { useState } from 'react';
import { 
  Download, 
  RefreshCw, 
  Search, 
  HelpCircle, 
  History, 
  Check, 
  AlertCircle,
  Clock,
  CheckCircle2,
  Lock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Opportunity } from '../types';

interface SubmissionsScreenProps {
  opportunities: Opportunity[];
  onRetrySubmission: (oppId: string, generatedDmsRef: string) => void;
  onForceSyncAll: () => void;
}

export default function SubmissionsScreen({
  opportunities,
  onRetrySubmission,
  onForceSyncAll
}: SubmissionsScreenProps) {
  
  // Search / filters states
  const [dmsSearch, setDmsSearch] = useState('');
  const [dmsFilter, setDmsFilter] = useState('All Statuses');
  const [isSyncing, setIsSyncing] = useState(false);
  const [processingOppId, setProcessingOppId] = useState<string | null>(null);

  // Filter out won/approved opportunities or general opportunities that map to DMS
  const dmsOpps = opportunities.filter(opp => {
    const matchesSearch = 
      opp.customerName.toLowerCase().includes(dmsSearch.toLowerCase()) ||
      opp.id.toLowerCase().includes(dmsSearch.toLowerCase()) ||
      (opp.agentName && opp.agentName.toLowerCase().includes(dmsSearch.toLowerCase()));
      
    const matchesStatus = 
      dmsFilter === 'All Statuses' || 
      opp.dmsStatus === dmsFilter;

    return matchesSearch && matchesStatus;
  });

  const getDmsStatusBadge = (status: string) => {
    switch (status) {
      case 'Failed':
        return 'bg-[#ffdad6] text-[#93000a] border border-[#ffb4aa]';
      case 'Pending':
        return 'bg-[#d6e3ff] text-[#00468c] border border-[#a9c7ff]';
      case 'Submitted':
        return 'bg-[#edeeef] text-[#636262] border border-[#e1e3e4]';
      case 'Reconciled':
        return 'bg-emerald-100 text-emerald-800 border border-emerald-300';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  const handleForceSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      onForceSyncAll();
      setIsSyncing(false);
      alert('Central Dealership Management System database refreshed. 4 reconciled slots logged!');
    }, 1500);
  };

  const handleRetry = (oppId: string) => {
    setProcessingOppId(oppId);
    setTimeout(() => {
      const generatedNo = `DMS-${Math.floor(1000 + Math.random() * 9000)}`;
      onRetrySubmission(oppId, generatedNo);
      setProcessingOppId(null);
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in text-left">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#191c1d]">DMS Submission Monitoring</h2>
          <p className="text-xs text-[#5f5e5e] mt-2">Track, dispatch, and sync real-time sales packets to central ERP databases.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => alert('DMS Audit trails downloaded successfully!')}
            className="flex items-center gap-1 px-4 py-2 bg-white border border-[#946e69] rounded hover:bg-[#f3f4f5] text-xs font-bold text-[#5f5e5e] transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" /> Export logs
          </button>
          
          <button 
            disabled={isSyncing}
            onClick={handleForceSync}
            className="flex items-center gap-1 px-4 py-2 bg-[#b7000c] text-white rounded font-bold text-xs hover:bg-[#b7000c]/90 transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} /> 
            {isSyncing ? 'Syncing...' : 'Force Sync'}
          </button>
        </div>
      </div>

      {/* Filters Form Panel */}
      <div className="bg-white p-4 rounded-xl border border-[#e7e8e9] shadow-sm flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-bold text-[#5f5e5e] uppercase tracking-wide mb-1.5">Dispatch Status</label>
          <select 
            value={dmsFilter}
            onChange={(e) => setDmsFilter(e.target.value)}
            className="w-full rounded border border-[#e1e3e4] bg-[#f8f9fa] py-2 px-3 text-xs focus:border-[#b7000c] outline-none text-[#191c1d] font-semibold cursor-pointer"
          >
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Submitted</option>
            <option>Failed</option>
            <option>Reconciled</option>
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-bold text-[#5f5e5e] uppercase tracking-wide mb-1.5">Ref Audit Range</label>
          <div className="flex items-center gap-2">
            <input 
              type="date" 
              defaultValue="2026-05-01"
              className="w-full rounded border border-[#e1e3e4] bg-[#f8f9fa] py-1.5 px-2.5 text-xs focus:border-[#b7000c] outline-none text-[#191c1d] font-medium"
            />
            <span className="text-[#5f5e5e] text-xs font-bold">-</span>
            <input 
              type="date" 
              defaultValue="2026-05-30"
              className="w-full rounded border border-[#e1e3e4] bg-[#f8f9fa] py-1.5 px-2.5 text-xs focus:border-[#b7000c] outline-none text-[#191c1d] font-medium"
            />
          </div>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-bold text-[#5f5e5e] uppercase tracking-wide mb-1.5">Search Keywords</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-[#5f5e5e]">
              <Search className="w-4 h-4" />
            </span>
            <input 
              type="text" 
              value={dmsSearch}
              onChange={(e) => setDmsSearch(e.target.value)}
              placeholder="Search Customer or Agent ID..."
              className="w-full pl-9 pr-3 py-2 border border-[#e1e3e4] bg-white rounded focus:outline-none focus:border-[#b7000c] text-xs font-medium text-[#191c1d]"
            />
          </div>
        </div>
      </div>

      {/* Database Grid representation */}
      <div className="bg-white rounded-xl border border-[#e7e8e9] shadow-sm overflow-hidden select-text">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f3f4f5] border-b border-[#e1e3e4]">
                <th className="py-3 px-4 text-xs font-extrabold text-[#5f5e5e] uppercase tracking-wider">Opportunity ID</th>
                <th className="py-3 px-4 text-xs font-extrabold text-[#5f5e5e] uppercase tracking-wider">Customer</th>
                <th className="py-3 px-4 text-xs font-extrabold text-[#5f5e5e] uppercase tracking-wider">Consultant</th>
                <th className="py-3 px-4 text-xs font-extrabold text-[#5f5e5e] uppercase tracking-wider">Created</th>
                <th className="py-3 px-4 text-xs font-extrabold text-[#5f5e5e] uppercase tracking-wider">DMS Ref Code</th>
                <th className="py-3 px-4 text-xs font-extrabold text-[#5f5e5e] uppercase tracking-wider">Registry Status</th>
                <th className="py-3 px-4 text-xs font-extrabold text-[#5f5e5e] uppercase tracking-wider text-right pr-6">Re-Dispatch</th>
              </tr>
            </thead>
            <tbody className="text-xs text-[#191c1d] divide-y divide-[#edeeef] font-mono font-medium">
              
              {dmsOpps.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#5f5e5e] font-sans font-medium text-xs">
                    No matching ERP submissions found in registry index. Recheck filters!
                  </td>
                </tr>
              ) : (
                dmsOpps.map((opp) => {
                  const isProcessing = processingOppId === opp.id;
                  return (
                    <tr key={opp.id} className="hover:bg-[#f3f4f5]/40 transition-colors group">
                      <td className="py-3.5 px-4 font-bold text-[#0059af] select-all">
                        {opp.id}
                      </td>
                      <td className="py-3.5 px-4 font-sans font-bold text-[#191c1d]">
                        {opp.customerName}
                      </td>
                      <td className="py-3.5 px-4 font-sans text-[#5f5e5e]">
                        {opp.agentName || 'Default Pool'}
                      </td>
                      <td className="py-3.5 px-4 text-[#5f5e5e]">
                        {opp.dateCreated}
                      </td>
                      <td className="py-3.5 px-4 text-[#191c1d] font-bold select-all">
                        {opp.dmsRef || '—'}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wide select-none ${getDmsStatusBadge(opp.dmsStatus)}`}>
                          {opp.dmsStatus === 'Failed' ? (
                            <AlertCircle className="w-3 h-3 text-[#ba1a1a]" />
                          ) : opp.dmsStatus === 'Pending' ? (
                            <Clock className="w-3 h-3 text-[#0059af]" />
                          ) : opp.dmsStatus === 'Reconciled' ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Check className="w-3 h-3 text-slate-500" />
                          )}
                          {opp.dmsStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right pr-6 font-sans">
                        <div className="flex items-center justify-end gap-2 text-[#5f5e5e]">
                          {opp.dmsStatus === 'Failed' ? (
                            <button 
                              disabled={isProcessing}
                              onClick={() => handleRetry(opp.id)}
                              className="text-white bg-[#0059af] hover:bg-[#0059af]/90 py-1 px-3.5 rounded font-bold text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                              title="Manual Re-transmit Packet Data"
                            >
                              <RefreshCw className={`w-3 h-3 ${isProcessing ? 'animate-spin' : ''}`} /> 
                              {isProcessing ? 'Transmitting...' : 'Retry'}
                            </button>
                          ) : opp.dmsStatus === 'Pending' ? (
                            <button 
                              disabled={isProcessing}
                              onClick={() => handleRetry(opp.id)}
                              className="text-[#0059af] hover:bg-[#d6e3ff]/30 py-1 px-2.5 rounded font-bold text-[11px] border border-[#a9c7ff] transition-colors flex items-center gap-1 cursor-pointer"
                              title="Synchronous manual dispatch"
                            >
                              <RefreshCw className={`w-3 h-3 ${isProcessing ? 'animate-spin' : ''}`} /> 
                              {isProcessing ? 'Syncing...' : 'Dispatch'}
                            </button>
                          ) : (
                            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-0.5 select-none" title="Transaction is locked">
                              <Lock className="w-3 h-3 text-emerald-600 shrink-0" /> Audited
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mock Pagination Bar */}
        <div className="bg-[#f8f9fa] px-4 py-3 border-t border-[#e1e3e4] flex items-center justify-between select-none">
          <span className="text-xs text-[#5f5e5e] font-medium">Showing 1 to {dmsOpps.length} of {dmsOpps.length} records</span>
          
          <div className="flex items-center gap-1">
            <button className="p-1 px-1.5 border hover:bg-neutral-100 rounded text-[#5f5e5e] disabled:opacity-40" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-7 h-7 bg-[#b7000c] text-white flex items-center justify-center rounded font-bold text-xs shadow-sm">1</button>
            <button className="p-1 px-1.5 border hover:bg-neutral-100 rounded text-[#5f5e5e] disabled:opacity-40" disabled>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
