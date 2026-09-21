import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Hourglass, 
  ShieldCheck, 
  FileText, 
  Badge, 
  Receipt, 
  Check, 
  CheckCircle, 
  X, 
  Eye, 
  AlertCircle,
  MessageSquare,
  Bookmark
} from 'lucide-react';
import { Opportunity, SalesAgent } from '../types';

interface ApprovalReviewScreenProps {
  opportunities: Opportunity[];
  agents: SalesAgent[];
  selectedOppId: string | null;
  onClearSelection: () => void;
  onSelectOpportunity: (oppId: string | null) => void;
  onActionComplete: (oppId: string, action: 'Approve' | 'Revision' | 'Reject', managerNotes: string) => void;
}

export default function ApprovalReviewScreen({
  opportunities,
  agents,
  selectedOppId,
  onClearSelection,
  onSelectOpportunity,
  onActionComplete
}: ApprovalReviewScreenProps) {
  
  // Notes state inside review panel
  const [managerNotes, setManagerNotes] = useState('');
  // Lightbox State
  const [activeDocPreview, setActiveDocPreview] = useState<{ name: string; symbol: string } | null>(null);

  // Filter approvals list (opps with approvalStatus)
  const approvalOpps = opportunities.filter(o => o.approvalStatus !== undefined);

  // Find currently selected opportunity to review
  const selectedOpp = opportunities.find(o => o.id === selectedOppId);

  // Find agent info for selected opp
  const associatedAgent = selectedOpp 
    ? agents.find(a => a.id === selectedOpp.agentId) 
    : null;

  const handleAction = (action: 'Approve' | 'Revision' | 'Reject') => {
    if (!selectedOpp) return;
    
    if ((action === 'Revision' || action === 'Reject') && !managerNotes.trim()) {
      alert('Feedback is required inside Manager Notes when requesting revision or rejecting a deal.');
      return;
    }

    onActionComplete(selectedOpp.id, action, managerNotes);
    setManagerNotes('');
  };

  // If no specific approval is selected, show list of approval requests
  if (!selectedOpp) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold text-[#191c1d]">Approval Proposals</h2>
          <p className="text-sm text-[#5f5e5e] mt-2">Track internal deal review requests, waivers, and discounts.</p>
        </div>

        <div className="bg-white border border-[#e7e8e9] rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-[#e7e8e9] bg-[#f8f9fa] flex items-center justify-between">
            <h3 className="font-extrabold text-[11px] uppercase text-[#191c1d] tracking-wider">
              Pending Reviews ({approvalOpps.filter(o => o.approvalStatus === 'Pending Review').length})
            </h3>
          </div>

          <div className="divide-y divide-[#edeeef]">
            {approvalOpps.length === 0 ? (
              <div className="p-8 text-center text-[#5f5e5e] font-medium text-xs">
                Perfect! No pending approval proposals present in the pipeline.
              </div>
            ) : (
              approvalOpps.map((opp) => (
                <div key={opp.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-[#f3f4f5]/40 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-mono text-[13px] font-bold text-[#0059af] select-all">{opp.id}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        opp.approvalStatus === 'Pending Review' 
                          ? 'bg-[#ffdad6] text-[#93000a] animate-pulse' 
                          : opp.approvalStatus === 'Approved' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-[#ffdad6] text-[#ba1a1a]'
                      }`}>
                        {opp.approvalStatus}
                      </span>
                    </div>

                    <div className="text-sm font-bold text-[#191c1d]">{opp.customerName}</div>
                    <div className="text-xs text-[#5f5e5e] mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-semibold text-[#191c1d] bg-[#f3f4f5] px-1.5 py-0.5 rounded text-[10px]">
                        {opp.vehicleModel}
                      </span>
                      <span>Assigned: {opp.agentName || 'Unassigned'}</span>
                      <span>Date: {opp.dateCreated}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {opp.approvalStatus === 'Pending Review' ? (
                      <button 
                        onClick={() => onSelectOpportunity(opp.id)}
                        className="px-4 py-2 bg-[#b7000c] text-white font-extrabold text-xs rounded hover:bg-[#b7000c]/90 transition-colors shadow-sm select-none cursor-pointer"
                      >
                        Review Proposal
                      </button>
                    ) : (
                      <button 
                        onClick={() => {
                          alert(`Deal ${opp.id} was already marked as ${opp.approvalStatus}.\nNotes: ${opp.managerNotes || 'None'}`);
                        }}
                        className="px-4 py-2 border border-[#e1e3e4] text-[#5f5e5e] font-extrabold text-xs bg-white rounded hover:bg-[#f3f4f5] transition-colors select-none cursor-pointer"
                      >
                        Inspect Log
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  // DEEP LEVEL REVIEW PAGE FOR THE SELECTED OPPORTUNITY
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Back button & Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button 
            onClick={onClearSelection}
            className="text-xs font-bold text-[#5f5e5e] hover:text-[#b7000c] flex items-center gap-1.5 transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Approvals
          </button>
          
          <h2 className="text-2xl font-bold text-[#191c1d] flex items-baseline gap-2 leading-none">
            Approval Request: <span className="text-[#b7000c] font-black">{selectedOpp.id}</span>
          </h2>
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#f3f4f5] border border-[#e1e3e4] hover:bg-[#edeeef] text-xs font-bold text-[#191c1d] shadow-sm select-none">
            <Hourglass className="w-3.5 h-3.5 text-[#f57f17] animate-spin" />
            Pending Review
          </span>
        </div>
      </div>

      {/* Grid Layout of approval review */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Summary info and files (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Details Card */}
          <div className="bg-white border border-[#e1e3e4] rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-extrabold text-[#191c1d] border-b border-[#edeeef] pb-3 mb-4 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="text-[#0059af] w-5 h-5" /> Opportunity Specifications
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product details */}
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-[10px] font-extrabold text-[#5f5e5e] uppercase tracking-wider">Vehicle Model Ordered</p>
                  <p className="text-base font-bold text-[#191c1d] mt-1 flex items-center gap-2">
                    {selectedOpp.vehicleModel}
                    <span className="w-3.5 h-3.5 rounded-full border border-[#946e69] inline-block shadow-sm" style={{ backgroundColor: selectedOpp.color === 'White Diamond' ? '#ffffff' : selectedOpp.color === 'Jet Black' ? '#111111' : '#c8c6c5' }} title={selectedOpp.color}></span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[10px] font-extrabold text-[#5f5e5e] uppercase tracking-wider">Customer Name</span>
                    <span className="text-xs font-bold text-[#191c1d] mt-1 block">{selectedOpp.customerName}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-extrabold text-[#5f5e5e] uppercase tracking-wider">Contact Phone</span>
                    <span className="text-xs font-bold text-[#191c1d] mt-1 block font-mono select-all">{selectedOpp.customerPhone}</span>
                  </div>
                </div>

                <div>
                  <span className="block text-[10px] font-extrabold text-[#5f5e5e] uppercase tracking-wider">Financing Arrangement</span>
                  <span className="text-xs font-bold text-[#0059af] mt-1 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-[#0059af]" />
                    {selectedOpp.financingType}
                  </span>
                </div>
              </div>

              {/* Agent card */}
              <div className="bg-[#f8f9fa] rounded-lg p-4 border border-[#e1e3e4]">
                <p className="text-[10px] font-extrabold text-[#5f5e5e] uppercase tracking-wider mb-3">Sales Agent Information</p>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-[#e1e3e4] bg-[#edeeef]">
                    <img 
                      src={associatedAgent?.avatar} 
                      alt="Agent Avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#191c1d] leading-none mb-1">{selectedOpp.agentName}</p>
                    <p className="text-[10px] text-[#5f5e5e] font-mono leading-none">Consultant ID: {selectedOpp.agentId}</p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-[#191c1d]">
                  <div className="flex justify-between items-baseline border-b border-[#e1e3e4] pb-1.5">
                    <span className="text-[10px] text-[#5f5e5e] font-bold uppercase">Showroom Branch</span>
                    <span className="font-bold">KL Central</span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-[#e1e3e4] pb-1.5">
                    <span className="text-[10px] text-[#5f5e5e] font-bold uppercase">Supervision Hub</span>
                    <span className="font-bold">David Chen</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] text-[#5f5e5e] font-bold uppercase">Time Stamp</span>
                    <span className="font-semibold text-[#5f5e5e]">{selectedOpp.dateCreated} 14:30</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 p-3.5 bg-yellow-50 border border-yellow-200 text-xs text-yellow-800 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Agent Request Notes:</span>
                <p className="mt-1 leading-relaxed italic">"{selectedOpp.notes}"</p>
              </div>
            </div>
          </div>

          {/* Uploaded Documents Card */}
          <div className="bg-white border border-[#e1e3e4] rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-extrabold text-[#191c1d] border-b border-[#edeeef] pb-3 mb-4 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="text-[#0059af] w-5 h-5" /> Document Verification Packages
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {selectedOpp.documents.length === 0 ? (
                <div className="col-span-3 py-6 text-center text-[#5f5e5e] text-xs font-semibold">
                  No documents found on this opportunity model.
                </div>
              ) : (
                selectedOpp.documents.map((doc) => (
                  <div 
                    key={doc.id}
                    onClick={() => setActiveDocPreview({ name: doc.name, symbol: doc.symbol })}
                    className="group border border-[#e1e3e4] hover:border-[#b7000c] rounded overflow-hidden shadow-sm hover:shadow transition-all duration-200 cursor-pointer text-left"
                  >
                    {/* Visual pattern representation under PDF */}
                    <div className="h-28 bg-[#f8f9fa] group-hover:bg-[#f3f4f5] flex flex-col items-center justify-center relative transition-colors border-b border-[#e1e3e4]">
                      <div className="p-3.5 bg-white rounded-full shadow-sm text-[#0059af] group-hover:scale-110 transition-transform">
                        {doc.symbol === 'badge' ? (
                          <ShieldCheck className="w-6 h-6 text-[#2b72cd]" />
                        ) : doc.symbol === 'receipt_long' ? (
                          <Receipt className="w-6 h-6 text-[#2b72cd]" />
                        ) : (
                          <FileText className="w-6 h-6 text-[#2b72cd]" />
                        )}
                      </div>
                      
                      {doc.verified ? (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-[#e6f4ea] text-[#137333] rounded-full flex items-center justify-center border border-emerald-400 font-bold text-[10px]" title="DMS Verified">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-[#ffdad6] text-[#ba1a1a] rounded-full flex items-center justify-center border border-red-300 font-bold text-[10px]" title="Pending Review">
                          !
                        </div>
                      )}

                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                        <span className="bg-white/90 text-xs font-bold text-[#191c1d] px-2.5 py-1 rounded shadow-sm border border-[#e1e3e4] flex items-center gap-1 scale-95 group-hover:scale-100 transition-transform">
                          <Eye className="w-3.5 h-3.5" /> Inspect File
                        </span>
                      </div>
                    </div>

                    <div className="p-3 bg-white">
                      <p className="text-xs font-bold text-[#191c1d] truncate" title={doc.name}>
                        {doc.name}
                      </p>
                      <p className="text-[10px] text-[#5f5e5e] font-medium mt-1">{doc.type} • {doc.size}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right column: Action decision card */}
        <div className="lg:col-span-4 select-none">
          <div className="bg-white border border-[#e1e3e4] rounded-xl p-5 shadow-sm sticky top-6">
            <h3 className="text-sm font-extrabold text-[#191c1d] border-b border-[#edeeef] pb-3 mb-4 uppercase tracking-wider flex items-center gap-1">
              <Bookmark className="w-4.5 h-4.5 text-[#b7000c]" /> Review Decision
            </h3>

            <div className="mb-4">
              <label 
                htmlFor="notes" 
                className="block text-[11px] font-extrabold text-[#5f5e5e] uppercase tracking-wide mb-1 flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Manager Feedback Notes
              </label>
              <textarea 
                id="notes"
                rows={4}
                value={managerNotes}
                onChange={(e) => setManagerNotes(e.target.value)}
                placeholder="Required for Rejections or Revision Requests. Provide clear criteria to Sarah..."
                className="w-full text-xs border border-[#e1e3e4] rounded p-2.5 outline-none focus:border-[#b7000c] text-[#191c1d] font-medium bg-[#f8f9fa] placeholder:text-[#5f5e5e] leading-relaxed"
              />
            </div>

            <div className="flex flex-col gap-2.5 mt-5">
              {/* Approve Choice */}
              <button 
                onClick={() => handleAction('Approve')}
                className="w-full bg-[#b7000c] text-white font-bold text-xs py-3 rounded hover:bg-[#b7000c]/90 transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" /> Approve Deal & Dispatch
              </button>

              {/* Request Revision Choice */}
              <button 
                onClick={() => handleAction('Revision')}
                className="w-full bg-white text-[#b7000c] border border-[#b7000c] hover:bg-[#ffdad6]/20 font-bold text-xs py-3 rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Request Agent Revision
              </button>

              <div className="h-px bg-[#edeeef] my-2"></div>

              {/* Reject Choice */}
              <button 
                onClick={() => handleAction('Reject')}
                className="w-full bg-[#f8f9fa] text-[#ba1a1a] border border-[#ffdad6] hover:bg-[#ffdad6] font-bold text-xs py-3 rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Reject Order Submission
              </button>
            </div>

            <p className="text-[10px] text-[#5f5e5e] text-center mt-4">
              All manager logs are logged under User ganyy.6823@gmail.com.
            </p>
          </div>
        </div>
      </div>

      {/* Lighbox Document Preview Modal */}
      {activeDocPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 animate-fade-in">
          <div className="relative bg-white rounded-xl shadow-2xl border w-full max-w-2xl overflow-hidden flex flex-col max-h-[95vh] select-text">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-[#e1e3e4] bg-[#f8f9fa]">
              <div className="flex items-center gap-2">
                <FileText className="text-[#0059af] w-5 h-5 animate-bounce" />
                <div>
                  <h3 className="text-xs font-extrabold text-[#191c1d] uppercase tracking-wider">{activeDocPreview.name}</h3>
                  <p className="text-[10px] text-[#5f5e5e] font-bold font-mono">ENCRYPTED HIGH-SECURITY INTEGRITY CONTAINER</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveDocPreview(null)}
                className="text-[#5f5e5e] hover:text-[#b7000c] p-1.5 rounded-full hover:bg-[#edeeef] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Render Canvas */}
            <div className="flex-1 bg-[#d9dadb] p-6 overflow-y-auto flex items-center justify-center">
              <div className="bg-white border border-[#946e69]/40 rounded-lg shadow-lg w-full max-w-[500px] aspect-[1/1.42] p-8 relative overflow-hidden text-left text-neutral-800">
                
                {/* Mitsubishi Watermark watermark */}
                <div className="absolute inset-x-0 top-1/3 text-center pointer-events-none opacity-[0.03]">
                  <p className="text-8xl font-black capitalize select-none leading-none tracking-tight">MITSUBISHI</p>
                </div>

                {/* Doc Header */}
                <div className="flex justify-between items-start border-b-2 border-neutral-800 pb-4 mb-6">
                  <div>
                    <h4 className="font-extrabold text-[#b7000c] text-lg tracking-wide uppercase">Mitsubishi Motors Malaysia</h4>
                    <p className="text-[9px] text-[#5f5e5e]">KL CENTRAL HUB OFFICE • SECURE FILING ENGINE</p>
                  </div>
                  <div className="text-right text-[10px] text-[#5f5e5e] font-mono">
                    <p className="font-bold">DOC-REF: {selectedOpp.id}</p>
                    <p>DATE: {selectedOpp.dateCreated}</p>
                  </div>
                </div>

                {/* Doc Information Content */}
                <h5 className="text-xs font-bold uppercase border-b pb-1 mb-3 text-neutral-900 flex items-center justify-between">
                  <span>Document Type: {activeDocPreview.name.replace('.pdf', '')}</span>
                  <span className="text-[9px] bg-neutral-100 text-[#0059af] p-0.5 px-2 rounded-full border">Official File</span>
                </h5>

                <div className="space-y-3.5 text-[11px] leading-relaxed">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] text-neutral-500 font-bold uppercase">Customer Applicant</p>
                      <p className="font-bold text-neutral-900">{selectedOpp.customerName}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-neutral-500 font-bold uppercase">Assigned Sales Consultant</p>
                      <p className="font-bold text-neutral-900">{selectedOpp.agentName} ({selectedOpp.agentId})</p>
                    </div>
                  </div>

                  <div className="border-t pt-3 mt-3">
                    <p className="text-[10px] text-neutral-500 font-bold uppercase mb-1">Vehicle Specification Mapping</p>
                    <table className="w-full text-left border">
                      <tbody>
                        <tr className="bg-[#f8f9fa] border-b">
                          <td className="p-1 px-2 font-bold text-neutral-700">Model Series</td>
                          <td className="p-1 px-2 text-neutral-900">{selectedOpp.vehicleModel}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-1 px-2 font-bold text-neutral-700">Paint Finish</td>
                          <td className="p-1 px-2 text-neutral-900">{selectedOpp.color} Premium Gloss</td>
                        </tr>
                        <tr className="bg-[#f8f9fa]">
                          <td className="p-1 px-2 font-bold text-neutral-700">Price Baseline</td>
                          <td className="p-1 px-2 font-mono font-bold text-neutral-900">RM {selectedOpp.revenue?.toLocaleString()}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="border-t pt-3 mt-3">
                    <p className="text-[10px] text-neutral-500 font-bold uppercase mb-1">Financing Status & Sign-off Details</p>
                    <p className="text-neutral-700 leading-normal">
                      The applicant {selectedOpp.customerName} has signed the document agreeing to purchase state of the art vehicle {selectedOpp.vehicleModel} under financing configuration <span className="font-bold text-[#0059af]">{selectedOpp.financingType}</span>. Handover and registry are locked under central compliance audits.
                    </p>
                  </div>

                  {/* Signatures */}
                  <div className="grid grid-cols-2 gap-4 border-t pt-6 mt-6">
                    <div className="text-center">
                      <div className="h-10 border-b border-neutral-400 select-none flex items-center justify-center font-serif text-[#0059af] italic text-base">
                        Ahmad Razak
                      </div>
                      <p className="text-[9px] text-[#5f5e5e] font-bold mt-1 uppercase">Purchaser Signature</p>
                    </div>

                    <div className="text-center">
                      <div className="h-10 border-b border-neutral-400 select-none flex items-center justify-center font-serif text-neutral-600 italic text-base">
                        Sarah Lee
                      </div>
                      <p className="text-[9px] text-[#5f5e5e] font-bold mt-1 uppercase">Consultant Verification</p>
                    </div>
                  </div>
                </div>

                {/* Security footer bar */}
                <div className="absolute bottom-4 left-8 right-8 flex justify-between items-center text-[8px] text-neutral-400 font-mono border-t pt-2 select-none">
                  <span>MITSUBISHI REGISTRY SECURE CORE PORTAL</span>
                  <span>CONFIDENTIAL - FOR INTERNAL AUDITS ONLY</span>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t border-[#e1e3e4] bg-[#f8f9fa] flex justify-end gap-2">
              <button 
                onClick={() => setActiveDocPreview(null)}
                className="px-5 py-2 bg-neutral-800 hover:bg-[#191c1d] text-white font-bold text-xs rounded shadow-sm select-none cursor-pointer"
              >
                Clear Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
