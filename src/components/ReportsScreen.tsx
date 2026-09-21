import React, { useState } from 'react';
import { 
  Download, 
  Calendar, 
  TrendingUp, 
  ArrowUp, 
  AlertCircle, 
  Zap, 
  CheckCircle,
  HelpCircle,
  Award,
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
  BarChart3,
  DollarSign,
  Activity,
  Heart
} from 'lucide-react';
import { Opportunity, SalesAgent } from '../types';

interface ReportsScreenProps {
  opportunities: Opportunity[];
  agents: SalesAgent[];
}

export default function ReportsScreen({
  opportunities,
  agents
}: ReportsScreenProps) {
  
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [selectedRange, setSelectedRange] = useState('30');

  // Compute live revenue based on state. Base of 4.2M RM + Won opportunities
  const wonOpps = opportunities.filter(o => o.stage === 'Won');
  const customRevenue = wonOpps.reduce((acc, current) => acc + (current.revenue || 0), 0);
  const liveRevenueRM = 4.2 * 1000000 + customRevenue;

  // Compute model specific sales
  const tritonCountWon = 42 + wonOpps.filter(o => o.vehicleModel === 'Mitsubishi Triton Athlete').length;
  const xpanderCountWon = 68 + wonOpps.filter(o => o.vehicleModel === 'Mitsubishi Xpander Cross').length;
  // Xforce has base 25
  const outlanderCountWon = 15 + wonOpps.filter(o => o.vehicleModel === 'Mitsubishi Outlander').length;

  // Chart hover data nodes
  const chartPoints = [
    { week: 'Week 1', opps: 110, won: 32, rev: 'RM 1.1M' },
    { week: 'Week 2', opps: 145, won: 41, rev: 'RM 1.3M' },
    { week: 'Week 3', opps: 130, won: 48, rev: 'RM 1.5M' },
    { week: 'Week 4', opps: 168, won: 64, rev: 'RM 2.1M' },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in text-left">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#191c1d] leading-none">Sales Performance Reports</h2>
          <p className="text-xs text-[#5f5e5e] mt-2">Comprehensive real-time review of team metrics, inventory quotas, and pipeline volume metrics.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <select 
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
              className="appearance-none bg-white border border-[#e1e3e4] rounded text-xs font-bold text-[#191c1d] py-2 pl-3 pr-8 focus:border-[#b7000c] outline-none cursor-pointer shadow-sm"
            >
              <option value="30">Last 30 Days</option>
              <option value="90">Last Quarter</option>
              <option value="365">Year to Date</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-[#5f5e5e]">
              <Calendar className="w-3.5 h-3.5" />
            </div>
          </div>
          
          <button 
            onClick={() => alert('Corporate management report spreadsheet dispatched to email!')}
            className="flex items-[#5f5e5e] gap-1 bg-white border border-[#946e69] text-[#191c1d] py-2 px-3 rounded hover:bg-[#f3f4f5] font-bold text-xs shadow-sm cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Export Report
          </button>
        </div>
      </div>

      {/* Top metrics row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white rounded-lg border border-[#e1e3e4] p-4 shadow-sm hover:shadow transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <p className="text-[10px] font-extrabold text-[#5f5e5e] uppercase tracking-wider">Total Revenue</p>
            <div className="p-1 bg-[#edeeef] rounded text-[#0059af]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <h3 className="text-xl font-black text-[#191c1d]">RM {(liveRevenueRM / 1000000).toFixed(2)}M</h3>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-green-700 font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+12.5% vs last period</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-lg border border-[#e1e3e4] p-4 shadow-sm hover:shadow transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <p className="text-[10px] font-extrabold text-[#5f5e5e] uppercase tracking-wider">Avg Days to Close</p>
            <div className="p-1 bg-[#edeeef] rounded text-[#5f5e5e]">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <h3 className="text-xl font-bold text-[#191c1d]">18 Days</h3>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-[#b7000c] font-bold">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Dealer Target: 14 Days</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-lg border border-[#e1e3e4] p-4 shadow-sm hover:shadow transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <p className="text-[10px] font-extrabold text-[#5f5e5e] uppercase tracking-wider">Lead Conversion</p>
            <div className="p-1 bg-[#edeeef] rounded text-[#b7000c]">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <h3 className="text-xl font-bold text-[#191c1d]">24.8%</h3>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-green-700 font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+2.1% quarterly bounce</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-lg border border-[#e1e3e4] p-4 shadow-sm hover:shadow transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <p className="text-[10px] font-extrabold text-[#5f5e5e] uppercase tracking-wider">Test Drive to Book</p>
            <div className="p-1 bg-[#edeeef] rounded text-[#5f5e5e]">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <h3 className="text-xl font-bold text-[#191c1d]">42.1%</h3>
          </div>
          <div className="mt-2 text-[11px] text-[#5f5e5e] font-semibold">
            Steady week-over-week
          </div>
        </div>
      </div>

      {/* Main interactive charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 select-none">
        {/* Line graph line charts */}
        <div className="lg:col-span-2 bg-white border border-[#e1e3e4] rounded-lg p-5 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold text-sm text-[#191c1d]">Opportunities vs Sales Won</h3>
              <p className="text-[11px] text-[#5f5e5e]">Hover data points to inspect weekly revenue gains</p>
            </div>
          </div>

          {/* Interactive SVG graph area */}
          <div className="h-56 relative border-b border-l border-[#e1e3e4] flex items-end p-2">
            
            {/* Grid helper lines background */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
              <div className="border-t border-neutral-800 w-full"></div>
              <div className="border-t border-neutral-800 w-full"></div>
              <div className="border-t border-neutral-800 w-full"></div>
              <div className="border-t border-transparent w-full"></div>
            </div>

            {/* Simulated Line plot charts SVG */}
            <svg 
              className="w-full h-full pb-1" 
              viewBox="0 0 400 100" 
              preserveAspectRatio="none"
              style={{ overflow: 'visible' }}
            >
              {/* Opportunities Grey line */}
              <polyline 
                fill="none" 
                stroke="#c8c6c5" 
                strokeWidth="2.5" 
                points="20,80 120,60 220,55 320,30" 
              />
              {/* Opportunities Won Red line */}
              <polyline 
                fill="none" 
                stroke="#b7000c" 
                strokeWidth="3.5" 
                points="20,95 120,78 220,68 320,40" 
              />

              {/* Data circle overlays */}
              {chartPoints.map((pt, idx) => {
                const xVal = 20 + idx * 100;
                // Node Y coords manually calculated based on values
                const yOpps = idx === 0 ? 80 : idx === 1 ? 60 : idx === 2 ? 55 : 30;
                const yWon = idx === 0 ? 95 : idx === 1 ? 78 : idx === 2 ? 68 : 40;
                const active = hoverIndex === idx;

                return (
                  <g key={pt.week} className="cursor-pointer">
                    {/* Opportunities dot */}
                    <circle 
                      cx={xVal} 
                      cy={yOpps} 
                      r={active ? 5 : 3} 
                      fill="#5f5e5e" 
                      onMouseEnter={() => setHoverIndex(idx)}
                      onMouseLeave={() => setHoverIndex(null)}
                    />
                    {/* Sales won dot */}
                    <circle 
                      cx={xVal} 
                      cy={yWon} 
                      r={active ? 6 : 4} 
                      fill="#b7000c" 
                      onMouseEnter={() => setHoverIndex(idx)}
                      onMouseLeave={() => setHoverIndex(null)}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Interactive tooltip flyout box */}
            {hoverIndex !== null && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-neutral-900/95 text-white p-2.5 rounded shadow-lg text-[10px] space-y-1.5 select-all border border-neutral-700 font-sans z-15">
                <p className="font-extrabold uppercase text-[#ffdad5]">{chartPoints[hoverIndex].week} Audit</p>
                <p>📈 Active Leads Pool: <span className="font-bold">{chartPoints[hoverIndex].opps}</span></p>
                <p>🏆 Completed Car Sales: <span className="font-bold text-[#ffb4aa]">{chartPoints[hoverIndex].won} units</span></p>
                <p className="border-t pt-1 text-[#e1e3e4]">Matched Revenue: <span className="font-bold">{chartPoints[hoverIndex].rev}</span></p>
              </div>
            )}
          </div>

          {/* Graph labels */}
          <div className="flex justify-between text-[10px] text-[#5f5e5e] font-bold uppercase tracking-wider mt-3 px-1 md:px-4">
            <span>Week 1 Base</span>
            <span>Week 2 Range</span>
            <span>Week 3 Spike</span>
            <span>Current Week 4</span>
          </div>

          <div className="flex justify-center gap-4 mt-4 border-t pt-2 border-[#edeeef]">
            <div className="flex items-center gap-1 text-[11px] text-[#5f5e5e] font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#c8c6c5] block"></span>
              <span>Opportunities Added</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-[#191c1d] font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#b7000c] block"></span>
              <span>Completed Units (Won)</span>
            </div>
          </div>
        </div>

        {/* Sales by model progress ratios bar */}
        <div className="bg-white border border-[#e1e3e4] rounded-lg p-5 shadow-sm flex flex-col">
          <div className="mb-4">
            <h3 className="font-bold text-sm text-[#191c1d]">Units Sold by Model</h3>
            <p className="text-[11px] text-[#5f5e5e]">Real-time sales target tracking ratios</p>
          </div>

          <div className="flex-grow flex flex-col justify-around gap-4 py-2">
            {/* Triton */}
            <div className="space-y-1">
              <div className="flex justify-between items-baseline text-xs font-bold text-[#191c1d]">
                <span>Triton Athlete</span>
                <span className="text-[#5f5e5e] font-medium font-mono">{tritonCountWon} / 50 sold</span>
              </div>
              <div className="w-full bg-[#f3f4f5] h-2.5 rounded-full overflow-hidden">
                <div className="h-full bg-[#2b72cd] rounded-full transition-all duration-300" style={{ width: `${Math.min((tritonCountWon / 50) * 100, 100)}%` }}></div>
              </div>
            </div>

            {/* Xpander */}
            <div className="space-y-1">
              <div className="flex justify-between items-baseline text-xs font-bold text-[#191c1d]">
                <span>Xpander Cross</span>
                <span className="text-[#5f5e5e] font-medium font-mono">{xpanderCountWon} / 60 sold</span>
              </div>
              <div className="w-full bg-[#f3f4f5] h-2.5 rounded-full overflow-hidden">
                <div className="h-full bg-[#b7000c] rounded-full transition-all duration-300" style={{ width: `${Math.min((xpanderCountWon / 60) * 100, 100)}%` }}></div>
              </div>
            </div>

            {/* Outlander */}
            <div className="space-y-1">
              <div className="flex justify-between items-baseline text-xs font-bold text-[#191c1d]">
                <span>Outlander Flagship</span>
                <span className="text-[#5f5e5e] font-medium font-mono">{outlanderCountWon} / 20 sold</span>
              </div>
              <div className="w-full bg-[#f3f4f5] h-2.5 rounded-full overflow-hidden">
                <div className="h-full bg-slate-500 rounded-full transition-all duration-300" style={{ width: `${Math.min((outlanderCountWon / 20) * 100, 100)}%` }}></div>
              </div>
            </div>

            {/* Xforce mockup */}
            <div className="space-y-1">
              <div className="flex justify-between items-baseline text-xs font-bold text-[#191c1d]">
                <span>Xforce Urban</span>
                <span className="text-[#5f5e5e] font-medium font-mono">25 / 40 sold</span>
              </div>
              <div className="w-full bg-[#f3f4f5] h-2.5 rounded-full overflow-hidden">
                <div className="h-full bg-[#eed202] rounded-full transition-all" style={{ width: '62%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Table Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 select-text">
        
        {/* Team Leaderboard card (3 cols) */}
        <div className="lg:col-span-3 bg-white border border-[#e1e3e4] rounded-lg shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-[#e1e3e4] bg-[#f8f9fa] flex justify-between items-center select-none">
            <h3 className="text-xs font-extrabold text-[#191c1d] uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#b7000c]" /> Consultant Monthly Leaderboard
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-white border-b border-[#e1e3e4] text-[#5f5e5e] font-extrabold uppercase tracking-wide">
                  <th className="py-3 px-4">Sales Agent</th>
                  <th className="py-3 px-4">Units Won</th>
                  <th className="py-3 px-4">Volume (RM)</th>
                  <th className="py-3 px-4">Win Ratio</th>
                  <th className="py-3 px-4 pr-6">CSAT Rank</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edeeef] font-medium text-[#191c1d]">
                {agents.map((agent) => (
                  <tr key={agent.id} className="hover:bg-[#f3f4f5]/30 transition-colors">
                    <td className="py-3.5 px-4 flex items-center gap-3">
                      <div className="w-7 h-7 bg-[#f3f4f5] border rounded-full overflow-hidden">
                        <img src={agent.avatar} alt="Agent" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-[#191c1d]">{agent.name}</div>
                        <div className="text-[9px] text-[#5f5e5e] uppercase tracking-wider font-bold mt-0.5">{agent.role}</div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-neutral-800">{agent.id === 'SA-9921' ? (14 + wonOpps.length) : agent.activeLeads * 2} units</td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{(agent.revenue / 1000000).toFixed(1)}M</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 font-bold">
                        <span className="text-emerald-700">{agent.winRate}%</span>
                        <div className="w-10 bg-[#f3f4f5] h-1 rounded-full overflow-hidden hidden md:inline-block">
                          <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${agent.winRate}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 pr-6">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 font-extrabold text-[10px]">
                        ★ {agent.csat.toFixed(1)} / 5.0
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lead traffic sources (1 col) */}
        <div className="bg-white border border-[#e1e3e4] rounded-lg p-5 shadow-sm flex flex-col justify-between">
          <div className="select-none">
            <h3 className="font-bold text-sm text-[#191c1d] mb-1">Top Lead Sources</h3>
            <p className="text-[11px] text-[#5f5e5e]">Acquisition volume breakdown</p>
          </div>

          <div className="space-y-4 py-3">
            {/* Social */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center shrink-0">
                ★
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5 font-bold">
                  <span className="text-xs text-[#191c1d] truncate">Social Media</span>
                  <span className="text-xs">45%</span>
                </div>
                <p className="text-[10px] text-[#5f5e5e] font-semibold">High volume, med conversion</p>
              </div>
            </div>

            {/* Showroom */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center shrink-0">
                ⛩
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5 font-bold">
                  <span className="text-xs text-[#191c1d] truncate">Showroom Walk-in</span>
                  <span className="text-xs">30%</span>
                </div>
                <p className="text-[10px] text-[#5f5e5e] font-semibold">Low volume, high conversion</p>
              </div>
            </div>

            {/* Referrals */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 border rounded-full bg-rose-50 text-[#b7000c] flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4 fill-current" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5 font-bold">
                  <span className="text-xs text-[#191c1d] truncate">Referrals</span>
                  <span className="text-xs">25%</span>
                </div>
                <p className="text-[10px] text-green-700 font-bold">Highest Lifetime Value</p>
              </div>
            </div>
          </div>

          <button 
            type="button"
            onClick={() => alert('Accessing deep branch diagnostics channels...')}
            className="w-full text-center text-[#b7000c] hover:text-[#b7000c]/90 text-xs font-bold border-t pt-3 border-[#edeeef] cursor-pointer"
          >
            Access Branch Insights
          </button>
        </div>
      </div>

      <div className="text-center text-[11px] text-[#5f5e5e] font-medium py-3 border-t select-none">
        <p>Data last updated: Today, 08:45 AM MYT. Reports reflect verified transaction packets exclusively.</p>
      </div>
    </div>
  );
}
