import { create } from 'zustand';
import type { Ticket, TicketFilters, TicketStats } from '@/types';

// Mock data for demonstration
const mockTickets: Ticket[] = [
  {
    id: '1',
    number: 1001,
    subject: 'Cannot access my account after password reset',
    status: 'open',
    priority: 'high',
    channel: 'email',
    requester: {
      id: 'u1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      createdAt: '2024-01-15T10:00:00Z',
    },
    assignee: {
      id: 'a1',
      name: 'Sarah Johnson',
      email: 'sarah@support.com',
      role: 'agent',
      departmentIds: ['d1'],
      teamIds: ['t1'],
      isOnline: true,
      createdAt: '2023-06-01T00:00:00Z',
    },
    department: {
      id: 'd1',
      name: 'Technical Support',
      color: '#3b82f6',
      agentCount: 5,
    },
    tags: ['account', 'password', 'urgent'],
    createdAt: '2024-11-22T09:30:00Z',
    updatedAt: '2024-11-22T14:20:00Z',
    lastMessageAt: '2024-11-22T14:20:00Z',
    messageCount: 4,
    isUnread: true,
  },
  {
    id: '2',
    number: 1002,
    subject: 'Feature request: Export reports to PDF',
    status: 'pending',
    priority: 'medium',
    channel: 'web',
    requester: {
      id: 'u2',
      name: 'Emily Davis',
      email: 'emily.d@company.org',
      createdAt: '2024-02-20T08:00:00Z',
    },
    department: {
      id: 'd2',
      name: 'Product Feedback',
      color: '#10b981',
      agentCount: 3,
    },
    tags: ['feature-request', 'reports'],
    createdAt: '2024-11-21T16:45:00Z',
    updatedAt: '2024-11-22T10:00:00Z',
    lastMessageAt: '2024-11-22T10:00:00Z',
    messageCount: 2,
    isUnread: false,
  },
  {
    id: '3',
    number: 1003,
    subject: 'Billing discrepancy on November invoice',
    status: 'open',
    priority: 'urgent',
    channel: 'phone',
    requester: {
      id: 'u3',
      name: 'Michael Brown',
      email: 'mbrown@enterprise.com',
      organizationId: 'org1',
      createdAt: '2023-11-10T12:00:00Z',
    },
    assignee: {
      id: 'a2',
      name: 'Alex Chen',
      email: 'alex@support.com',
      role: 'supervisor',
      departmentIds: ['d3'],
      teamIds: ['t1', 't2'],
      isOnline: true,
      createdAt: '2023-01-15T00:00:00Z',
    },
    department: {
      id: 'd3',
      name: 'Billing',
      color: '#f59e0b',
      agentCount: 4,
    },
    tags: ['billing', 'invoice', 'enterprise'],
    createdAt: '2024-11-22T11:00:00Z',
    updatedAt: '2024-11-22T15:30:00Z',
    lastMessageAt: '2024-11-22T15:30:00Z',
    messageCount: 6,
    isUnread: true,
  },
  {
    id: '4',
    number: 1004,
    subject: 'How to integrate API with our CRM system',
    status: 'resolved',
    priority: 'low',
    channel: 'chat',
    requester: {
      id: 'u4',
      name: 'Lisa Wang',
      email: 'lisa.wang@startup.io',
      createdAt: '2024-03-05T14:00:00Z',
    },
    assignee: {
      id: 'a1',
      name: 'Sarah Johnson',
      email: 'sarah@support.com',
      role: 'agent',
      departmentIds: ['d1'],
      teamIds: ['t1'],
      isOnline: true,
      createdAt: '2023-06-01T00:00:00Z',
    },
    department: {
      id: 'd1',
      name: 'Technical Support',
      color: '#3b82f6',
      agentCount: 5,
    },
    tags: ['api', 'integration', 'documentation'],
    createdAt: '2024-11-20T08:15:00Z',
    updatedAt: '2024-11-21T16:00:00Z',
    resolvedAt: '2024-11-21T16:00:00Z',
    lastMessageAt: '2024-11-21T16:00:00Z',
    messageCount: 8,
    isUnread: false,
  },
  {
    id: '5',
    number: 1005,
    subject: 'Application crashes when uploading large files',
    status: 'open',
    priority: 'high',
    channel: 'email',
    requester: {
      id: 'u5',
      name: 'David Kim',
      email: 'dkim@tech.co',
      createdAt: '2024-01-28T09:00:00Z',
    },
    department: {
      id: 'd1',
      name: 'Technical Support',
      color: '#3b82f6',
      agentCount: 5,
    },
    tags: ['bug', 'upload', 'crash'],
    createdAt: '2024-11-22T13:00:00Z',
    updatedAt: '2024-11-22T13:00:00Z',
    lastMessageAt: '2024-11-22T13:00:00Z',
    messageCount: 1,
    isUnread: true,
  },
  {
    id: '6',
    number: 1006,
    subject: 'Request for team training session',
    status: 'closed',
    priority: 'low',
    channel: 'web',
    requester: {
      id: 'u6',
      name: 'Amanda Foster',
      email: 'afoster@corp.net',
      organizationId: 'org2',
      createdAt: '2024-02-14T11:00:00Z',
    },
    assignee: {
      id: 'a3',
      name: 'Jordan Lee',
      email: 'jordan@support.com',
      role: 'agent',
      departmentIds: ['d4'],
      teamIds: ['t2'],
      isOnline: false,
      createdAt: '2023-09-20T00:00:00Z',
    },
    department: {
      id: 'd4',
      name: 'Customer Success',
      color: '#8b5cf6',
      agentCount: 6,
    },
    tags: ['training', 'onboarding'],
    createdAt: '2024-11-18T10:30:00Z',
    updatedAt: '2024-11-20T14:00:00Z',
    resolvedAt: '2024-11-20T14:00:00Z',
    lastMessageAt: '2024-11-20T14:00:00Z',
    messageCount: 5,
    isUnread: false,
  },
  {
    id: '7',
    number: 1007,
    subject: 'Two-factor authentication not working',
    status: 'pending',
    priority: 'high',
    channel: 'email',
    requester: {
      id: 'u7',
      name: 'Robert Taylor',
      email: 'rtaylor@secure.org',
      createdAt: '2024-04-10T15:00:00Z',
    },
    assignee: {
      id: 'a1',
      name: 'Sarah Johnson',
      email: 'sarah@support.com',
      role: 'agent',
      departmentIds: ['d1'],
      teamIds: ['t1'],
      isOnline: true,
      createdAt: '2023-06-01T00:00:00Z',
    },
    department: {
      id: 'd1',
      name: 'Technical Support',
      color: '#3b82f6',
      agentCount: 5,
    },
    tags: ['security', '2fa', 'authentication'],
    createdAt: '2024-11-22T08:00:00Z',
    updatedAt: '2024-11-22T12:45:00Z',
    lastMessageAt: '2024-11-22T12:45:00Z',
    messageCount: 3,
    isUnread: false,
  },
  {
    id: '8',
    number: 1008,
    subject: 'Subscription upgrade inquiry',
    status: 'open',
    priority: 'medium',
    channel: 'chat',
    requester: {
      id: 'u8',
      name: 'Jennifer Martinez',
      email: 'jmartinez@growth.com',
      organizationId: 'org3',
      createdAt: '2024-05-22T10:00:00Z',
    },
    department: {
      id: 'd3',
      name: 'Billing',
      color: '#f59e0b',
      agentCount: 4,
    },
    tags: ['subscription', 'upgrade', 'pricing'],
    createdAt: '2024-11-22T14:30:00Z',
    updatedAt: '2024-11-22T14:30:00Z',
    lastMessageAt: '2024-11-22T14:30:00Z',
    messageCount: 1,
    isUnread: true,
  },
];

const mockStats: TicketStats = {
  total: 156,
  open: 42,
  pending: 28,
  resolved: 67,
  closed: 19,
  avgResponseTime: 24,
  avgResolutionTime: 4.5,
};

interface TicketStore {
  tickets: Ticket[];
  selectedTicketId: string | null;
  filters: TicketFilters;
  stats: TicketStats;
  isLoading: boolean;

  // Actions
  setTickets: (tickets: Ticket[]) => void;
  selectTicket: (id: string | null) => void;
  setFilters: (filters: TicketFilters) => void;
  updateTicket: (id: string, updates: Partial<Ticket>) => void;
  fetchTickets: () => Promise<void>;
}

export const useTicketStore = create<TicketStore>((set, get) => ({
  tickets: mockTickets,
  selectedTicketId: null,
  filters: {},
  stats: mockStats,
  isLoading: false,

  setTickets: (tickets) => set({ tickets }),

  selectTicket: (id) => set({ selectedTicketId: id }),

  setFilters: (filters) => set({ filters }),

  updateTicket: (id, updates) => set((state) => ({
    tickets: state.tickets.map((ticket) =>
      ticket.id === id ? { ...ticket, ...updates } : ticket
    ),
  })),

  fetchTickets: async () => {
    set({ isLoading: true });
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    set({ tickets: mockTickets, isLoading: false });
  },
}));

// Selector for filtered tickets
export const useFilteredTickets = () => {
  const { tickets, filters } = useTicketStore();

  return tickets.filter((ticket) => {
    if (filters.status?.length && !filters.status.includes(ticket.status)) {
      return false;
    }
    if (filters.priority?.length && !filters.priority.includes(ticket.priority)) {
      return false;
    }
    if (filters.assigneeId && ticket.assignee?.id !== filters.assigneeId) {
      return false;
    }
    if (filters.departmentId && ticket.department?.id !== filters.departmentId) {
      return false;
    }
    if (filters.search) {
      const search = filters.search.toLowerCase();
      return (
        ticket.subject.toLowerCase().includes(search) ||
        ticket.requester.name.toLowerCase().includes(search) ||
        ticket.requester.email.toLowerCase().includes(search) ||
        ticket.number.toString().includes(search)
      );
    }
    return true;
  });
};
