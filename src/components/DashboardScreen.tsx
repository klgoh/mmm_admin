import React from 'react';
import { 
  DollarSign, 
  CheckSquare, 
  FileText, 
  TrendingUp, 
  MoreVertical, 
  Calendar, 
  UserPlus, 
  AlertCircle 
} from 'lucide-react';
import { Opportunity } from '../types';

interface DashboardScreenProps {
  opportunities: Opportunity[];
  onNavigateToTab: (tab: string) => void;
  onSelectOpportunityForReview: (oppId: string) => void;
}

export default function DashboardScreen({ 
  opportunities, 
  onNavigateToTab,
  onSelectOpportunityForReview
}: DashboardScreenProps) {
  
  // Real-time computations from opportunities state
  const totalOppsCount = 1106 + opportunities.length; // Baseline + current state
  const pendingApprovalsOpps = opportunities.filter(o => o.approvalStatus === 'Pending Review');
  const pendingDmsCount = opportunities.filter(o => o.dmsStatus === 'Pending').length;
  
  // Pipeline counts
  const stageCounts = opportunities.reduce((acc, opp) => {
    const stage = opp.stage;
    if (stage === 'New Lead') acc.lead += 1;
    else if (stage === 'Test Drive' || stage === 'Quotation') acc.prospect += 1;
    else if (stage === 'Discount Approval') acc.hot += 1;
    else if (stage === 'Won') acc.won += 1;
    return acc;
  }, { lead: 250, prospect: 380, hot: 180, won: 120 });

  const totalStages = stageCounts.lead + stageCounts.prospect + stageCounts.hot + stageCounts.won;
  const leadPct = Math.round((stageCounts.lead / totalStages) * 100);
  const prospectPct = Math.round((stageCounts.prospect / totalStages) * 100);
  const hotPct = Math.round((stageCounts.hot / totalStages) * 100);
  const wonPct = Math.round((stageCounts.won / totalStages) * 100);

  // Unassigned opportunities to display
  const unassignedOpps = opportunities.filter(o => o.agentId === null).slice(0, 3);

  // Helper for name initials
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#191c1d]">Dashboard Overview</h2>
          <p className="text-sm text-[#5f5e5e] mt-1">Real-time performance metrics and pending actions.</p>
        </div>
        <div className="text-[#5f5e5e] text-xs font-semibold flex items-center gap-1 bg-[#edeeef] px-3 py-1.5 rounded-full">
          <Calendar className="w-3.5 h-3.5" />
          Last 30 Days
        </div>
      </div>

      {/* Bento Grid - Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white border border-[#e7e8e9] rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-start mb-3">
            <div className="w-10 h-10 rounded-full bg-[#b7000c]/10 flex items-center justify-center text-[#b7000c]">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="bg-[#d6e3ff] text-[#001b3d] text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3 text-[green]" /> +12%
            </span>
          </div>
          <p className="text-[13px] text-[#5f5e5e] font-medium leading-none mb-1">Total Opportunities</p>
          <h3 className="text-2xl font-bold text-[#b7000c]">{totalOppsCount.toLocaleString()}</h3>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border border-[#e7e8e9] rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer" onClick={() => onNavigateToTab('approvals')}>
          <div className="flex justify-between items-start mb-3">
            <div className="w-10 h-10 rounded-full bg-[#edeeef] flex items-center justify-center text-[#5f5e5e]">
              <CheckSquare className="w-5 h-5" />
            </div>
            <span className="bg-[#ffdad6] text-[#93000a] text-[11px] font-bold px-2 py-0.5 rounded-md animate-pulse">
              Requires Action
            </span>
          </div>
          <p className="text-[13px] text-[#5f5e5e] font-medium leading-none mb-1">Pending Approvals</p>
          <h3 className="text-2xl font-bold text-[#191c1d]">{pendingApprovalsOpps.length}</h3>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border border-[#e7e8e9] rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer" onClick={() => onNavigateToTab('submissions')}>
          <div className="flex justify-between items-start mb-3">
            <div className="w-10 h-10 rounded-full bg-[#edeeef] flex items-center justify-center text-[#5f5e5e]">
              <FileText className="w-5 h-5" />
            </div>
            <span className="bg-[#e1e3e4] text-[#5f5e5e] text-[11px] font-bold px-2 py-0.5 rounded-md">
              Standard
            </span>
          </div>
          <p className="text-[13px] text-[#5f5e5e] font-medium leading-none mb-1">DMS Submissions Pending</p>
          <h3 className="text-2xl font-bold text-[#191c1d]">{pendingDmsCount}</h3>
        </div>

        {/* Metric 4: Pipeline Health Mini */}
        <div className="bg-white border border-[#e7e8e9] rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
          <p className="text-[13px] text-[#5f5e5e] font-medium leading-none mb-3">Current Pipeline Health</p>
          <div className="flex h-3 w-full rounded-full overflow-hidden mb-2 bg-[#f3f4f5]">
            <div className="bg-[#e1e3e4]" style={{ width: `${leadPct}%` }} title={`Lead: ${leadPct}%`}></div>
            <div className="bg-[#c8c6c5]" style={{ width: `${prospectPct}%` }} title={`Prospect: ${prospectPct}%`}></div>
            <div className="bg-[#ffb4aa]" style={{ width: `${hotPct}%` }} title={`Hot Lead: ${hotPct}%`}></div>
            <div className="bg-[#b7000c]" style={{ width: `${wonPct}%` }} title={`Won: ${wonPct}%`}></div>
          </div>
          <div className="flex justify-between text-[10px] text-[#5f5e5e] font-bold">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-[#e1e3e4] rounded-full inline-block"></span> Opp ({leadPct}%)</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-[#c8c6c5] rounded-full inline-block"></span> Prosp ({prospectPct}%)</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-[#ffb4aa] rounded-full inline-block"></span> Hot ({hotPct}%)</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-[#b7000c] rounded-full inline-block"></span> Won ({wonPct}%)</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversion Funnel */}
        <div className="bg-white border border-[#e7e8e9] rounded-xl p-6 shadow-sm lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="text-lg font-bold text-[#191c1d]">Conversion Funnel</h3>
              <p className="text-xs text-[#5f5e5e]">Sales pipelines volume drop-offs</p>
            </div>
            <button className="text-[#5f5e5e] hover:text-[#b7000c] transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 flex flex-col gap-4 justify-center py-2">
            {/* Opportunity */}
            <div className="w-full flex items-center justify-between">
              <span className="w-24 md:w-32 text-right font-semibold text-xs text-[#5f5e5e] mr-4">Opportunity</span>
              <div className="relative h-8 bg-[#e1e3e4] hover:bg-[#d5d7d8] rounded-full flex-1 flex items-center px-4 transition-colors">
                <span className="font-bold text-xs text-[#191c1d] z-10">500 Leads Baseline</span>
                <div className="absolute right-4 text-[10px] font-bold text-[#5f5e5e] bg-white/60 px-2 py-0.5 rounded-full">100%</div>
              </div>
            </div>
            {/* Prospect */}
            <div className="w-full flex items-center justify-between">
              <span className="w-24 md:w-32 text-right font-semibold text-xs text-[#5f5e5e] mr-4">Prospect</span>
              <div className="group relative h-8 bg-[#c8c6c5] hover:bg-[#b8b6b5] rounded-full flex-1 ml-[10%] flex items-center px-4 transition-colors">
                <span className="font-bold text-xs text-[#191c1d] z-10">350 Advanced Leads</span>
                <div className="absolute right-4 text-[10px] font-bold text-[#5f5e5e] bg-white/60 px-2 py-0.5 rounded-full">70%</div>
              </div>
            </div>
            {/* Hot Prospect */}
            <div className="w-full flex items-center justify-between">
              <span className="w-24 md:w-32 text-right font-semibold text-xs text-[#5f5e5e] mr-4 text-[#930007]">Hot Prospect</span>
              <div className="group relative h-8 bg-[#ffb4aa] hover:bg-[#ffa095] rounded-full flex-1 ml-[20%] flex items-center px-4 transition-colors">
                <span className="font-bold text-xs text-[#410001] z-10">150 High-Priority</span>
                <div className="absolute right-4 text-[10px] font-bold text-[#930007] bg-white/60 px-2 py-0.5 rounded-full">30%</div>
              </div>
            </div>
            {/* Prospect Won */}
            <div className="w-full flex items-center justify-between">
              <span className="w-24 md:w-32 text-right font-bold text-xs text-[#b7000c] mr-4">Prospect Won</span>
              <div className="group relative h-8 bg-[#b7000c]/90 hover:bg-[#b7000c] rounded-full flex-1 ml-[30%] flex items-center px-4 transition-all duration-300">
                <span className="font-bold text-xs text-white z-10">85 Deliveries Confirmed</span>
                <div className="absolute right-4 text-[10px] font-bold text-[#b7000c] bg-white px-2 py-0.5 rounded-full">17%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stage Distribution */}
        <div className="bg-white border border-[#e7e8e9] rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#191c1d] mb-1">Stage Distribution</h3>
            <p className="text-xs text-[#5f5e5e]">Pipeline stage density matrix</p>
          </div>

          {/* Faux Donut Chart */}
          <div className="h-44 flex items-center justify-center relative my-4">
            <div className="w-36 h-36 rounded-full border-[14px] border-[#e1e3e4] relative flex items-center justify-center" 
                 style={{ 
                   borderRightColor: '#ffb4aa', 
                   borderBottomColor: '#b7000c', 
                   borderLeftColor: '#c8c6c5',
                   transform: 'rotate(25deg)'
                 }}>
              <div className="text-center" style={{ transform: 'rotate(-25deg)' }}>
                <span className="block text-2xl font-extrabold text-[#191c1d] leading-none">1,085</span>
                <span className="block text-[10px] font-bold text-[#5f5e5e] uppercase tracking-wider mt-1">Active Leads</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-[#5f5e5e]">
              <span className="w-2.5 h-2.5 bg-[#e1e3e4] rounded-full block"></span>
              <span>Opportunity (23%)</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#5f5e5e]">
              <span className="w-2.5 h-2.5 bg-[#c8c6c5] rounded-full block"></span>
              <span>Prospect (35%)</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#5f5e5e]">
              <span className="w-2.5 h-2.5 bg-[#ffb4aa] rounded-full block"></span>
              <span>Hot Prospect (17%)</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#5f5e5e]">
              <span className="w-2.5 h-2.5 bg-[#b7000c] rounded-full block"></span>
              <span>Won (25%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Unassigned Opportunities Table */}
      <div className="bg-white border border-[#e7e8e9] rounded-xl shadow-sm overflow-hidden mb-4">
        <div className="p-4 border-b border-[#e7e8e9] flex justify-between items-center bg-[#f8f9fa]">
          <h3 className="text-sm font-bold text-[#191c1d] flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-[#b7000c]" />
            Unassigned Opportunities ({unassignedOpps.length})
          </h3>
          <button 
            onClick={() => onNavigateToTab('assignments')} 
            className="text-xs text-[#b7000c] font-bold hover:underline"
          >
            View Workload Directory
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f3f4f5] border-b border-[#e7e8e9] text-[11px] font-extrabold text-[#5f5e5e] uppercase tracking-wider">
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Vehicle Model</th>
                <th className="py-3 px-4">Date Created</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs text-[#191c1d] divide-y divide-[#edeeef]">
              {unassignedOpps.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-[#5f5e5e]">
                    All opportunities have been assigned! Active channel cleared.
                  </td>
                </tr>
              ) : (
                unassignedOpps.map((opp) => (
                  <tr key={opp.id} className="hover:bg-[#f3f4f5]/60 transition-colors">
                    <td className="py-3.5 px-4 flex items-center gap-3 font-medium">
                      <div className="w-8 h-8 rounded-full bg-[#d6e3ff] text-[#001b3d] flex items-center justify-center font-bold text-[11px]">
                        {getInitials(opp.customerName)}
                      </div>
                      <div>
                        <div className="font-bold text-[#191c1d]">{opp.customerName}</div>
                        <div className="text-[10px] text-[#5f5e5e]">{opp.customerPhone}</div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="bg-[#edeeef] px-2 py-1 rounded text-[#191c1d] font-semibold text-[11px]">
                        {opp.vehicleModel}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#5f5e5e]">{opp.dateCreated}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button 
                        onClick={() => onNavigateToTab('assignments')} 
                        className="py-1 px-3 border border-[#946e69] hover:border-[#b7000c] hover:bg-[#b7000c] hover:text-white rounded text-[#5f5e5e] font-bold text-[11px] transition-all cursor-pointer"
                      >
                        Assign Agent
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
