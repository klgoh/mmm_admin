import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  DollarSign, 
  CheckSquare, 
  UserPlus, 
  BarChart3, 
  Settings, 
  Search, 
  Bell, 
  HelpCircle, 
  Menu, 
  X, 
  Briefcase,
  ChevronDown,
  Info,
  Sliders,
  CheckCircle,
  FileCheck,
  Plus
} from 'lucide-react';
import { Opportunity, SalesAgent, AssignmentLog } from './types';
import { INITIAL_AGENTS, INITIAL_OPPORTUNITIES, INITIAL_ASSIGNMENT_LOGS } from './data';

// Component Screens
import DashboardScreen from './components/DashboardScreen';
import OpportunitiesScreen from './components/OpportunitiesScreen';
import ApprovalReviewScreen from './components/ApprovalReviewScreen';
import AssignmentsScreen from './components/AssignmentsScreen';
import SubmissionsScreen from './components/SubmissionsScreen';
import ReportsScreen from './components/ReportsScreen';

export default function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
  // Responsive Mobile Mobile Sidebar drawer
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Core global React state
  const [opportunities, setOpportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);
  const [agents, setAgents] = useState<SalesAgent[]>(INITIAL_AGENTS);
  const [assignmentLogs, setAssignmentLogs] = useState<AssignmentLog[]>(INITIAL_ASSIGNMENT_LOGS);

  // Selected Opportunity ID for deep Review Screen (Ahmad Razak)
  const [selectedApprovalId, setSelectedApprovalId] = useState<string | null>(null);

  // Quick State mutations handlers
  const handleAddOpportunity = (newOpp: Opportunity) => {
    setOpportunities(prev => [newOpp, ...prev]);
    alert(`Success: Opportunity ${newOpp.id} for ${newOpp.customerName} created in the database.`);
  };

  const handleSelectOpportunityForReview = (oppId: string) => {
    setSelectedApprovalId(oppId);
    setActiveTab('approvals');
  };

  const handleAssignLead = (oppId: string, agentId: string) => {
    // 1. Update opportunity agentId
    const assignedAgent = agents.find(a => a.id === agentId);
    if (!assignedAgent) return;

    setOpportunities(prev => prev.map(opp => {
      if (opp.id === oppId) {
        return {
          ...opp,
          agentId: agentId,
          agentName: assignedAgent.name,
          stage: 'Test Drive', // Move from New Lead to first milestone upon assignment
        };
      }
      return opp;
    }));

    // 2. Increment active leads for agent
    setAgents(prev => prev.map(a => {
      if (a.id === agentId) {
        return { ...a, activeLeads: Math.min(a.activeLeads + 1, a.capacity) };
      }
      return a;
    }));

    // 3. Append to assignment log ledger
    const newLog: AssignmentLog = {
      id: `log-${Date.now()}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      leadId: oppId,
      customerName: opportunities.find(o => o.id === oppId)?.customerName || 'Unknown',
      agentName: assignedAgent.name,
      agentAvatar: assignedAgent.avatar,
      actionBy: 'Manual (Manager Portal)'
    };
    setAssignmentLogs(prev => [newLog, ...prev]);

    alert(`Successfully Assigned Lead ${oppId} to ${assignedAgent.name}! Workload capacity updated.`);
  };

  const handleRetrySubmission = (oppId: string, generatedDmsRef: string) => {
    setOpportunities(prev => prev.map(opp => {
      if (opp.id === oppId) {
        return {
          ...opp,
          dmsStatus: 'Submitted',
          dmsRef: generatedDmsRef
        };
      }
      return opp;
    }));
    alert(`DMS Dispatch Transmit Confirmed: Ref ${generatedDmsRef} logged.`);
  };

  const handleForceSyncAll = () => {
    // Map pending items to reconciled, simulate connection
    setOpportunities(prev => prev.map(opp => {
      if (opp.dmsStatus === 'Pending') {
        const generatedNo = `DMS-${Math.floor(1000 + Math.random() * 9000)}`;
        return {
          ...opp,
          dmsStatus: 'Reconciled',
          dmsRef: generatedNo
        };
      }
      return opp;
    }));
  };

  const handleActionComplete = (oppId: string, action: 'Approve' | 'Revision' | 'Reject', managerNotes: string) => {
    setOpportunities(prev => prev.map(opp => {
      if (opp.id === oppId) {
        let finalStage = opp.stage;
        let approvalStatusVal: 'Approved' | 'Revision Requested' | 'Rejected' | undefined = undefined;
        let dmsStatusVal = opp.dmsStatus;

        if (action === 'Approve') {
          finalStage = 'Won';
          approvalStatusVal = 'Approved';
          dmsStatusVal = 'Pending'; // Triggers DMS queue pipeline
        } else if (action === 'Revision') {
          finalStage = opp.stage; // remains
          approvalStatusVal = 'Revision Requested';
        } else if (action === 'Reject') {
          finalStage = 'Rejected';
          approvalStatusVal = 'Rejected';
        }

        return {
          ...opp,
          stage: finalStage,
          approvalStatus: approvalStatusVal,
          managerNotes: managerNotes,
          dmsStatus: dmsStatusVal
        };
      }
      return opp;
    }));

    alert(`Review Complete: Action marked as "${action}". Record status logged. Returning to list.`);
    setSelectedApprovalId(null); // Return back to approvals list
  };

  // Switch renderer function per active Tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardScreen 
            opportunities={opportunities} 
            onNavigateToTab={(tab) => {
              setActiveTab(tab);
              setSelectedApprovalId(null);
            }} 
            onSelectOpportunityForReview={handleSelectOpportunityForReview}
          />
        );
      case 'opportunities':
        return (
          <OpportunitiesScreen 
            opportunities={opportunities} 
            agents={agents}
            onSelectOpportunityForReview={handleSelectOpportunityForReview}
            onNavigateToTab={(tab) => {
              setActiveTab(tab);
              setSelectedApprovalId(null);
            }}
            onAddOpportunity={handleAddOpportunity}
          />
        );
      case 'approvals':
        return (
          <ApprovalReviewScreen 
            opportunities={opportunities}
            agents={agents}
            selectedOppId={selectedApprovalId}
            onClearSelection={() => setSelectedApprovalId(null)}
            onSelectOpportunity={(oppId) => setSelectedApprovalId(oppId)}
            onActionComplete={handleActionComplete}
          />
        );
      case 'assignments':
        return (
          <AssignmentsScreen 
            opportunities={opportunities}
            agents={agents}
            assignmentLogs={assignmentLogs}
            onAssignLead={handleAssignLead}
          />
        );
      case 'submissions':
        return (
          <SubmissionsScreen 
            opportunities={opportunities}
            onRetrySubmission={handleRetrySubmission}
            onForceSyncAll={handleForceSyncAll}
          />
        );
      case 'reports':
        return (
          <ReportsScreen 
            opportunities={opportunities}
            agents={agents}
          />
        );
      case 'settings':
        return (
          <div className="bg-white border rounded-xl p-6 shadow-sm max-w-2xl text-left">
            <h3 className="text-lg font-bold text-[#191c1d] border-b pb-2 mb-4 flex items-center gap-1.5 font-sans">
              <Settings className="text-[#b7000c] w-5 h-5" /> Settings Config Portal
            </h3>
            
            <div className="space-y-5 text-sm text-[#191c1d]">
              <div>
                <span className="font-bold block mb-1">Corporate Sales Hub</span>
                <p className="text-xs text-[#5f5e5e] leading-relaxed">
                  Active connection established to: <strong className="text-neutral-800">Kuala Lumpur Regional Sales Office</strong>. Node synchronization is controlled via dealership security policies.
                </p>
              </div>

              <div>
                <span className="font-bold block mb-1">Central DMS Integration Engine</span>
                <div className="p-3 bg-[#f8f9fa] rounded border flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-[#b7000c]">● SYSTEM-ONLINE</span>
                    <p className="text-stone-500 mt-0.5">Secure TLS 1.3 Handshake active</p>
                  </div>
                  <span className="bg-[#b7000c]/10 text-[#b7000c] px-2 py-1 font-bold rounded">Live Registry</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <span className="font-bold block mb-2">User Profile Summary</span>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-200">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa6vqUScpRtiAdOJ2-xYi9CFx4sqovsfGywdsvRiYRUIkZEW1JzQoPsuz3P6d5NWM96FtTAxt8WJXoHsz2kzCCk87nkqOVRaei-7qT-lQILg0MfAIbEzOtsmB_iGe9lPLbqvqfh-zDZL-Z9u4UG7O7shQhstF3989sxeZyreqmyGhUuQ5NCSNAYGDSgRYU-qU3eGN4Ju7Hd6mMIsP-MTY0t-VICF5MrSxkV3oVvC5rOhN3fsa2FgyRk_LWAUr0ejND1NDHaPxMvCQz" 
                      alt="Manager Avatar"
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <p className="font-bold">General Sales Director</p>
                    <p className="text-xs text-[#5f5e5e]">ganyy.6823@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 text-xs text-[#5f5e5e] flex items-center gap-1">
                <Info className="w-4 h-4 text-[#0059af]" />
                <span>All telemetry metrics and CRM updates adhere to Mitsubishi Motors guidelines.</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Nav item list configs
  const NAV_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'opportunities', label: 'Opportunities', icon: DollarSign },
    { id: 'approvals', label: 'Approvals', icon: FileCheck, badge: opportunities.filter(o => o.approvalStatus === 'Pending Review').length },
    { id: 'assignments', label: 'Assignments', icon: UserPlus, badge: opportunities.filter(o => o.agentId === null).length },
    { id: 'submissions', label: 'DMS Submissions', icon: Briefcase },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#191c1d] flex w-screen font-sans select-none antialiased overflow-x-hidden">
      
      {/* SideNavBar Component - Desktop Only */}
      <aside className="hidden md:flex bg-white border-r border-[#e7e8e9] shadow-sm fixed left-0 top-0 h-full w-[240px] flex-col py-6 z-20 shrink-0">
        <div className="px-5 mb-8 text-left">
          {/* Authenticated Mitsubishi Brand Logo */}
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5utAC9ih9ECUX9VA8CRdRD_r_GaooZlbh09LxwchFwC_EhlxDDQw7TkB3gSvzLgksteJREEuYgEMGTttLI6Md0rSbEH4eGN-12yGeGGntaZuC92AeXLnT1s5enQIEg5HMOstf-A3rBJ_FyBdiJeiVa4NzviUDOG6TPgBeTvj7zbMwtt7fIrCYRuFnEKtGmgQ9Coknv3d_gftSZwxG_YayWI0zYbAR-3SDpxpvskJw-TQgC1k2pO8aiqhxLtlFS9NEsaI1LUujq2y8" 
            alt="Mitsubishi Motors" 
            className="h-10 w-auto object-contain mb-1.5"
          />
          <p className="text-[10px] font-extrabold uppercase text-[#5f5e5e] tracking-wider leading-none">Sales Manager Portal</p>
        </div>

        {/* New Sale Fast Action Button */}
        <div className="px-4 mb-6">
          <button 
            onClick={() => {
              setActiveTab('opportunities');
              alert(`Action triggered: Open Create Opportunity panel to input sales record.`);
            }}
            className="w-full bg-[#b7000c] text-white font-bold text-xs py-2.5 px-4 rounded flex items-center justify-center gap-1.5 hover:bg-[#b7000c]/90 transition-colors shadow-sm cursor-pointer select-none"
          >
            <Plus className="w-4 h-4" /> New Sale
          </button>
        </div>

        {/* Scrolling navigation rails */}
        <nav className="flex-1 flex flex-col gap-0.5 px-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSelectedApprovalId(null); // Reset deep pages
                }}
                className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded text-xs text-left transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-[#e2dfde] text-[#b7000c] font-black border-r-4 border-[#b7000c]' 
                    : 'text-[#5f5e5e] hover:bg-[#edeeef] font-bold'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <IconComponent className={`w-4 h-4 ${isActive ? 'text-[#b7000c]' : 'text-[#5f5e5e]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && item.badge > 0 ? (
                  <span className={`px-1.5 py-0.5 text-[9px] font-extrabold text-white bg-[#b7000c] rounded-full`}>
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Sidebar Slide Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden animate-fade-in">
          <div className="fixed inset-0 bg-black/60" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative bg-white w-64 max-w-sm h-full flex flex-col py-6 shadow-xl border-r border-[#e7e8e9] z-50">
            <div className="px-5 mb-6 flex justify-between items-center text-left">
              <div>
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5utAC9ih9ECUX9VA8CRdRD_r_GaooZlbh09LxwchFwC_EhlxDDQw7TkB3gSvzLgksteJREEuYgEMGTttLI6Md0rSbEH4eGN-12yGeGGntaZuC92AeXLnT1s5enQIEg5HMOstf-A3rBJ_FyBdiJeiVa4NzviUDOG6TPgBeTvj7zbMwtt7fIrCYRuFnEKtGmgQ9Coknv3d_gftSZwxG_YayWI0zYbAR-3SDpxpvskJw-TQgC1k2pO8aiqhxLtlFS9NEsaI1LUujq2y8" 
                  alt="Mitsubishi Motors" 
                  className="h-10 w-auto object-contain mb-1"
                />
                <p className="text-[9px] font-bold uppercase text-[#5f5e5e] tracking-wider leading-none">Sales Manager Portal</p>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-[#5f5e5e] hover:text-[#b7000c]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col gap-1 px-3 mt-4 text-left">
              {NAV_ITEMS.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSelectedApprovalId(null);
                      setIsMobileMenuOpen(false); // Close drawer
                    }}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded text-xs transition-colors cursor-pointer text-left ${
                      isActive 
                        ? 'bg-[#e2dfde] text-[#b7000c] font-black border-r-4 border-[#b7000c]' 
                        : 'text-[#5f5e5e] hover:bg-[#edeeef] font-bold'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <IconComponent className={`w-4 h-4 ${isActive ? 'text-[#b7000c]' : 'text-[#5f5e5e]'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && item.badge > 0 ? (
                      <span className="px-1.5 py-0.5 text-[9px] font-extrabold text-white bg-[#b7000c] rounded-full">
                        {item.badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content Outer Frame */}
      <div className="flex-1 md:ml-[240px] flex flex-col min-h-screen min-w-0">
        
        {/* TopNavBar Component */}
        <header className="bg-white border-b border-[#e7e8e9] h-16 flex justify-between items-center px-4 md:px-8 sticky top-0 z-10 shrink-0 select-none">
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Hamburger Toggle Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-[#5f5e5e] p-1.5 hover:text-[#b7000c] hover:bg-[#f3f4f5] rounded transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Quick Filter Search Input Box */}
            <div className="relative hidden md:block select-all">
              <span className="absolute left-3 top-2.5 text-[#5f5e5e]">
                <Search className="w-4 h-4" />
              </span>
              <input 
                onClick={() => {
                  if (activeTab !== 'opportunities' && activeTab !== 'submissions') {
                    setActiveTab('opportunities');
                  }
                }}
                className="pl-9 pr-4 py-1.5 rounded-full bg-[#f3f4f5] border-transparent hover:bg-[#edeeef] focus:bg-white focus:border-[#b7000c] focus:ring-1 focus:ring-[#b7000c] text-xs font-semibold w-72 h-9 outline-none transition-all placeholder:text-[#5f5e5e]" 
                placeholder="Search opportunities, agents, VINS..." 
                type="text" 
              />
            </div>

            <h2 className="md:hidden font-black text-xs text-[#b7000c] tracking-tight uppercase leading-none select-none">
              Sales Manager Portal
            </h2>
          </div>

          {/* User profile action rail */}
          <div className="flex items-center gap-4">
            <div className="flex gap-2.5 text-[#5f5e5e] items-center">
              <button 
                onClick={() => alert('No new notifications today. Dashboard cleared!')}
                className="p-1.5 hover:text-[#b7000c] hover:bg-[#f3f4f5] rounded-full transition-colors relative cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#b7000c] rounded-full"></span>
              </button>
              <button 
                onClick={() => alert(`Mitsubishi Motors Portal Helpdesk\nContact Support: support@mitsubishi-motors.com.my`)}
                className="p-1.5 hover:text-[#b7000c] hover:bg-[#f3f4f5] rounded-full transition-colors hidden sm:inline-block cursor-pointer"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>

            {/* User Profile Avatar block */}
            <div 
              onClick={() => setActiveTab('settings')}
              className="flex items-center gap-2 pl-2.5 border-l border-[#e7e8e9] cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#e1e3e4] shadow-sm shrink-0 bg-neutral-200">
                <img 
                  alt="Director Profile" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa6vqUScpRtiAdOJ2-xYi9CFx4sqovsfGywdsvRiYRUIkZEW1JzQoPsuz3P6d5NWM96FtTAxt8WJXoHsz2kzCCk87nkqOVRaei-7qT-lQILg0MfAIbEzOtsmB_iGe9lPLbqvqfh-zDZL-Z9u4UG7O7shQhstF3989sxeZyreqmyGhUuQ5NCSNAYGDSgRYU-qU3eGN4Ju7Hd6mMIsP-MTY0t-VICF5MrSxkV3oVvC5rOhN3fsa2FgyRk_LWAUr0ejND1NDHaPxMvCQz"
                />
              </div>
              <div className="hidden lg:flex flex-col text-left text-xs">
                <span className="font-bold text-[#191c1d] leading-none mb-0.5 group-hover:text-[#b7000c] transition-colors">General Sales Director</span>
                <span className="text-[10px] text-[#5f5e5e] leading-none">KL Region</span>
              </div>
              <ChevronDown className="w-3 h-3 text-[#5f5e5e] hidden lg:inline-block group-hover:translate-y-0.5 transition-transform" />
            </div>
          </div>
        </header>

        {/* Dashboard Dynamic Work Area Canvas */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-[#f8f9fa] max-w-7xl mx-auto w-full transition-all">
          {renderTabContent()}
        </main>
      </div>

    </div>
  );
}
