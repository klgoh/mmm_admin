import { SalesAgent, Opportunity, AssignmentLog } from './types';

export const INITIAL_AGENTS: SalesAgent[] = [
  {
    id: "SA-9921",
    name: "Sarah Lee",
    role: "Senior Consultant",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYH4kIb-pe98dzoNBICplt_GZMrdeUXlHmUPaesCJUu2NGFLy8-knexZbfFeyDbj0IK3t3f9gHrsa71-oF2xDw846X7nzMrXNMaP-_dKSB4B3ZUEbEMUvFAt5isrUbAzPeuwxKFAxQPDmVUioxvNIZ3TbVYSOJjvpb7smelZcceCwI6A6UzpnTq6cp5CXqIMkxjfI80YsHEB9jROZMzWt7HZX_n4ji_sjQe343zfXZLnc2uVUD3Y77fxsd5wAbZu_2SMcRQYLrFBPd",
    activeLeads: 4,
    capacity: 10,
    status: "Available",
    revenue: 1800000,
    winRate: 28,
    csat: 4.7
  },
  {
    id: "SA-9922",
    name: "Sarah Johnson",
    role: "Senior Consultant",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnQ8N5D7gGKDu_kGamN5SyFdkgUl0NSGduCYaDbBqyOhAOZq6z_NTjmb1D47jUN74Elas6NBbERjC_N0LYTzH0eo8p20xQ0aEJHelwLJvAdYg_fKWsWsCg4VTINq62g6pj4p2RvgIK7MaiaFhmMIB_jKVGB4Sa3xfyEOtX0wvrn4j3Rp_Uh_Ql8Th4oCQ_fzeO88z8VIoDDl7GMQm3Oaywo-casT8AbD6V3BGBsRIBnLcgdTHi0pO7nTISaLsODZDGVMZ9iHQucdGW",
    activeLeads: 4,
    capacity: 10,
    status: "Available",
    revenue: 1400000,
    winRate: 24,
    csat: 4.8
  },
  {
    id: "SA-9923",
    name: "Michael Chen",
    role: "Fleet Specialist",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyPhpmd6HB2NSXWuF0Q7qLdutLbZBZz5i_EQFoBCkHXZlRxqkI71HVYsiJvWUEqY2UjUp2xSGlGRjVuevpCWXs9p_tbX1BQMSIIOiE8LhWMhje_68NxrCTRQlwNDxoD14QYpZY7-QTlDLA8Y_nRTnRs5osjOZCmD_CzAwWyclpVQQq10SnR6d2EytNcjpQPYVcdFJa4L-owE1Xf9D_lScaO2Ey6iBEYvUvRFoRgOQ2tfPfkQpV6sLqwTPvU9UGRKbbXDBE1QWyriP0",
    activeLeads: 9,
    capacity: 10,
    status: "Busy",
    revenue: 2300000,
    winRate: 35,
    csat: 4.5
  },
  {
    id: "SA-9924",
    name: "Mike Ross",
    role: "Associate Consultant",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKm2f7F2JTa6mTh_kGuScpB9mKDuv6yF3WtVtO5PqQlGBo9oxGytKF6Snf1j8gyoFOFRrmWJVRkzatlCg_tPJt-jvy9TbR2fV8atsRHsax7yvETT82XQEsMmwrClGNBo-ukOywlGDEF6gZOMEJFM7Jogwz3_HHFG-r_IzPG22lKq6s3mH720xEHvtnByKQdrNJYcvgBRUYb-PxNSX2A3gIGXrRe9Tc7qSbMDMU96nVXtUqcm2uUEnCSlkTQRybxjltNhFaSU3Tu9Zz",
    activeLeads: 3,
    capacity: 10,
    status: "Available",
    revenue: 950000,
    winRate: 22,
    csat: 4.3
  },
  {
    id: "SA-9925",
    name: "Ahmad Zaki",
    role: "Senior Consultant",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-TM2swk52Ts3RRXJ9N_R41v4jACkl0ANJVfD0OLbsmGqm0dUUDF6X0rYkvKaRzS8bG4KOjLMn9VLIP4sW95TO6eePIW_w4x3LWg9eROaXuNcMA_EcagR9COFCzGSeRE1PwdcCPUrybiIqYyTMoivXXC1a5EZ7dcSBoklJewf5KndBX078_uxnbbbLHnrNhHeXYwT1GfT1IVdYk8eHPgtYVl2oDuAFGOh7fqObach7DXkZuTtiqJSbb2wIZz_uYXc-DXdK6X4lQpo4",
    activeLeads: 6,
    capacity: 10,
    status: "Available",
    revenue: 2100000,
    winRate: 32,
    csat: 4.9
  },
  {
    id: "SA-9926",
    name: "Ravi Kumar",
    role: "Junior Consultant",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJWMua1Eot1uIDyXWlMLFjvRRRpDopt3mUbOI_3tSCnGcAVmqVq3ol4Jk19FYtXYNYsWq0aiTQmKE5DzB0Q7qPrGsznlI5INZfQEVl4GR8XOzvoXns8ST7_R7WB1QWe7TZzFX-5dol6qARPkIsffQWFJTV_qgDkgSfBaGRp96SHJCg9VXXeOzpFUzWAWXHX5Ei3FWnFtWrIoAlRS3WQ6y8OejFTUhITWxxkwgnXMpy3M4-DFjk-_gTUg-C6ULTGg-UacZ0dK402e-6",
    activeLeads: 2,
    capacity: 10,
    status: "Available",
    revenue: 1100000,
    winRate: 18,
    csat: 4.1
  }
];

export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  // OPPS with "Pending Review" status
  {
    id: "OPP-2023-8924",
    customerName: "Mr. Ahmad Razak",
    customerPhone: "+60 12-345 6789",
    customerEmail: "ahmad.razak@email.com",
    vehicleModel: "Mitsubishi Triton Athlete",
    color: "White Diamond",
    stage: "Discount Approval",
    source: "Showroom Walk-in",
    agentId: "SA-9921",
    agentName: "Sarah Lee",
    dateCreated: "2026-05-24",
    financingType: "Hire Purchase - 9 Years",
    documents: [
      { id: "doc-1", name: "Customer_IC_Front_Back.pdf", type: "PDF", size: "1.2 MB", verified: true, symbol: "badge" },
      { id: "doc-2", name: "Signed_Booking_Form_V2.pdf", type: "PDF", size: "2.4 MB", verified: true, symbol: "description" },
      { id: "doc-3", name: "Vehicle_Order_Form.pdf", type: "PDF", size: "850 KB", verified: false, symbol: "receipt_long" }
    ],
    notes: "Customer requesting corporate fleet discount review of 5% for Triton Athlete.",
    dmsRef: null,
    dmsStatus: "Pending",
    revenue: 155000,
    approvalStatus: "Pending Review"
  },
  // Row 1 Opportunity (DMS failed)
  {
    id: "OPP-2023-8942",
    customerName: "Sarah Jenkins",
    customerPhone: "+60 17-642 9831",
    customerEmail: "sarah.jenkins@gmail.com",
    vehicleModel: "Mitsubishi Triton Athlete",
    color: "Jet Black",
    stage: "New Lead",
    source: "Website Form",
    agentId: "SA-9924",
    agentName: "Mike Ross",
    dateCreated: "2026-05-24",
    financingType: "Hire Purchase - 5 Years",
    documents: [
      { id: "doc-1", name: "Sarah_IC_Doc.pdf", type: "PDF", size: "1.1 MB", verified: true, symbol: "badge" },
      { id: "doc-2", name: "Booking_Signoff.pdf", type: "PDF", size: "1.8 MB", verified: true, symbol: "description" }
    ],
    notes: "Failed submission to central DMS due to network transmission error (Timeout code 504).",
    dmsRef: null,
    dmsStatus: "Failed",
    revenue: 155000,
    approvalStatus: "Approved"
  },
  // Row 2 Opportunity (DMS pending)
  {
    id: "OPP-2023-8945",
    customerName: "David Chen",
    customerPhone: "+60 11-4835 1192",
    customerEmail: "david_chen@techcorp.com",
    vehicleModel: "Mitsubishi Outlander",
    color: "Graphite Grey",
    stage: "Test Drive",
    source: "Showroom Walk-in",
    agentId: "SA-9923",
    agentName: "Michael Chen",
    dateCreated: "2026-05-24",
    financingType: "Bank Cashier Cheque",
    documents: [
      { id: "doc-1", name: "David_IC.pdf", type: "PDF", size: "900 KB", verified: true, symbol: "badge" }
    ],
    notes: "Fully processed bank payment. Ready for DMS registration.",
    dmsRef: null,
    dmsStatus: "Pending",
    revenue: 145000,
    approvalStatus: "Approved"
  },
  // Row 3 Opportunity (DMS submitted)
  {
    id: "OPP-2023-8930",
    customerName: "Elena Rodriguez",
    customerPhone: "+60 13-918 2451",
    customerEmail: "elena.r@rodco.com",
    vehicleModel: "Mitsubishi Xpander Cross",
    color: "Sterling Silver",
    stage: "Quotation",
    source: "Facebook Ad",
    agentId: "SA-9922",
    agentName: "Sarah Johnson",
    dateCreated: "2026-05-23",
    financingType: "Hire Purchase - 7 Years",
    documents: [
      { id: "doc-1", name: "Elena_IC.pdf", type: "PDF", size: "1.4 MB", verified: true, symbol: "badge" },
      { id: "doc-2", name: "Booking_Receipt.pdf", type: "PDF", size: "2.1 MB", verified: true, symbol: "description" }
    ],
    notes: "Submitted to DMS. Awaiting chassis and engine number reconciliation.",
    dmsRef: "DMS-9921",
    dmsStatus: "Submitted",
    revenue: 109000,
    approvalStatus: "Approved"
  },
  // Row 4 Opportunity (DMS reconciled)
  {
    id: "OPP-2023-8922",
    customerName: "James Wilson",
    customerPhone: "+60 16-291 8835",
    customerEmail: "james.wilson@corporate.com",
    vehicleModel: "Mitsubishi Outlander",
    color: "Red Metallic",
    stage: "Won",
    source: "Referral",
    agentId: "SA-9923",
    agentName: "Michael Chen",
    dateCreated: "2026-05-22",
    financingType: "Hire Purchase - 9 Years",
    documents: [
      { id: "doc-1", name: "James_IC.pdf", type: "PDF", size: "1.5 MB", verified: true, symbol: "badge" },
      { id: "doc-2", name: "James_Booking_Final.pdf", type: "PDF", size: "2.5 MB", verified: true, symbol: "description" }
    ],
    notes: "Final vehicle delivered. Successfully mapped and registered in DMS and Sales log.",
    dmsRef: "DMS-9855",
    dmsStatus: "Reconciled",
    revenue: 145000,
    approvalStatus: "Approved"
  },

  // Unassigned opportunities (For Tab 4 and table)
  {
    id: "OPP-2023-9482",
    customerName: "Ahmad Lim",
    customerPhone: "+60 12-990 1234",
    customerEmail: "ahmad.lim@outlook.com",
    vehicleModel: "Mitsubishi Triton Athlete",
    color: "White Diamond",
    stage: "New Lead",
    source: "Website Form",
    agentId: null,
    agentName: null,
    dateCreated: "2026-05-26",
    financingType: "Hire Purchase - 9 Years",
    documents: [],
    notes: "Enquired about Triton Athlete accessories package.",
    dmsRef: null,
    dmsStatus: "Pending",
    revenue: 155000
  },
  {
    id: "OPP-2023-9481",
    customerName: "Sarah Krishnan",
    customerPhone: "+60 14-884 5512",
    customerEmail: "sarah.krishnan@gmail.com",
    vehicleModel: "Mitsubishi Xpander Cross",
    color: "Jet Black",
    stage: "New Lead",
    source: "Showroom Walk-in",
    agentId: null,
    agentName: null,
    dateCreated: "2026-05-25",
    financingType: "Hire Purchase - 7 Years",
    documents: [],
    notes: "Needs scheduling of test drive for family of five.",
    dmsRef: null,
    dmsStatus: "Pending",
    revenue: 109000
  },
  {
    id: "OPP-2023-9460",
    customerName: "Wong Wei Ting",
    customerPhone: "+60 19-331 4455",
    customerEmail: "wong.wt@yahoo.com",
    vehicleModel: "Mitsubishi Outlander",
    color: "Sterling Silver",
    stage: "Quotation",
    source: "Facebook Ad",
    agentId: null,
    agentName: null,
    dateCreated: "2026-05-25",
    financingType: "Corporate Cash",
    documents: [],
    notes: "Needs standard corporate discount quotation for executive use.",
    dmsRef: null,
    dmsStatus: "Pending",
    revenue: 145000
  },
  {
    id: "OPP-2023-9488",
    customerName: "Mei Ling",
    customerPhone: "+60 17-331 9988",
    customerEmail: "meiling@yahoo.com",
    vehicleModel: "Mitsubishi Xpander Cross",
    color: "Sunrise Orange",
    stage: "New Lead",
    source: "Showroom Walk-in",
    agentId: null,
    agentName: null,
    dateCreated: "2026-05-26",
    financingType: "Hire Purchase - 9 Years",
    documents: [],
    notes: "Walked in with children. Interested in cabin space and safety features.",
    dmsRef: null,
    dmsStatus: "Pending",
    revenue: 109000
  },
  {
    id: "OPP-2023-9490",
    customerName: "Tech Solutions Sdn Bhd",
    customerPhone: "+60 3-7920 1888",
    customerEmail: "fleet@techsolutions.com",
    vehicleModel: "Mitsubishi Outlander",
    color: "Graphite Grey",
    stage: "New Lead",
    source: "Website Form",
    agentId: null,
    agentName: null,
    dateCreated: "2026-05-26",
    financingType: "Corporate Finance - 5 Years",
    documents: [],
    notes: "Corporate fleet inquiry for 3 units of Outlander standard trim.",
    dmsRef: null,
    dmsStatus: "Pending",
    revenue: 435000 // Cumulative fleet price
  }
];

export const INITIAL_ASSIGNMENT_LOGS: AssignmentLog[] = [
  {
    id: "log-1",
    time: "10:45 AM",
    leadId: "OPP-2023-9471",
    customerName: "Wong Wei",
    agentName: "Sarah Johnson",
    agentAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnQ8N5D7gGKDu_kGamN5SyFdkgUl0NSGduCYaDbBqyOhAOZq6z_NTjmb1D47jUN74Elas6NBbERjC_N0LYTzH0eo8p20xQ0aEJHelwLJvAdYg_fKWsWsCg4VTINq62g6pj4p2RvgIK7MaiaFhmMIB_jKVGB4Sa3xfyEOtX0wvrn4j3Rp_Uh_Ql8Th4oCQ_fzeO88z8VIoDDl7GMQm3Oaywo-casT8AbD6V3BGBsRIBnLcgdTHi0pO7nTISaLsODZDGVMZ9iHQucdGW",
    actionBy: "Auto-Rule (Website)"
  },
  {
    id: "log-2",
    time: "09:12 AM",
    leadId: "OPP-2023-9472",
    customerName: "Farah Nabila",
    agentName: "Michael Chen",
    agentAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyPhpmd6HB2NSXWuF0Q7qLdutLbZBZz5i_EQFoBCkHXZlRxqkI71HVYsiJvWUEqY2UjUp2xSGlGRjVuevpCWXs9p_tbX1BQMSIIOiE8LhWMhje_68NxrCTRQlwNDxoD14QYpZY7-QTlDLA8Y_nRTnRs5osjOZCmD_CzAwWyclpVQQq10SnR6d2EytNcjpQPYVcdFJa4L-owE1Xf9D_lScaO2Ey6iBEYvUvRFoRgOQ2tfPfkQpV6sLqwTPvU9UGRKbbXDBE1QWyriP0",
    actionBy: "Manual (Manager Portal)"
  }
];
