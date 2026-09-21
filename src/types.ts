/**
 * Types and Interfaces for the Mitsubishi Sales Manager Portal
 */

export interface SalesAgent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  activeLeads: number;
  capacity: number; // e.g. 10
  status: 'Available' | 'Busy' | 'Offline';
  revenue: number;
  winRate: number;
  csat: number;
}

export interface DocumentInfo {
  id: string;
  name: string;
  type: string;
  size: string;
  verified: boolean;
  symbol: string;
}

export interface Opportunity {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  vehicleModel: string;
  color: string;
  stage: 'New Lead' | 'Test Drive' | 'Quotation' | 'Booking Pending' | 'Won' | 'Revision Requested' | 'Rejected' | 'Discount Approval';
  source: 'Website Form' | 'Showroom Walk-in' | 'Facebook Ad' | 'Outbound Call' | 'Referral' | 'Corporate Fleet';
  agentId: string | null;
  agentName: string | null;
  dateCreated: string;
  financingType: string;
  documents: DocumentInfo[];
  notes: string;
  dmsRef: string | null;
  dmsStatus: 'Pending' | 'Submitted' | 'Failed' | 'Reconciled';
  revenue: number;
  managerNotes?: string;
  approvalStatus?: 'Approved' | 'Pending Review' | 'Revision Requested' | 'Rejected';
}

export interface AssignmentLog {
  id: string;
  time: string;
  leadId: string;
  customerName: string;
  agentName: string;
  agentAvatar: string;
  actionBy: string;
}

export interface SalesReportMetric {
  totalRevenue: number;
  avgDaysToClose: number;
  leadConversionRate: number;
  testDriveToBookRate: number;
}
