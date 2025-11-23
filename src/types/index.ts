// Core types for the ticketing system

export type TicketStatus = 'open' | 'pending' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketChannel = 'email' | 'web' | 'chat' | 'phone' | 'api';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  organizationId?: string;
  createdAt: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'admin' | 'supervisor' | 'agent';
  departmentIds: string[];
  teamIds: string[];
  isOnline: boolean;
  createdAt: string;
}

export interface Department {
  id: string;
  name: string;
  description?: string;
  color: string;
  agentCount: number;
}

export interface Team {
  id: string;
  name: string;
  memberCount: number;
}

export interface Ticket {
  id: string;
  number: number;
  subject: string;
  status: TicketStatus;
  priority: TicketPriority;
  channel: TicketChannel;
  requester: User;
  assignee?: Agent;
  department?: Department;
  team?: Team;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  lastMessageAt: string;
  messageCount: number;
  isUnread: boolean;
}

export interface Message {
  id: string;
  ticketId: string;
  content: string;
  contentHtml?: string;
  isInternal: boolean;
  author: {
    type: 'user' | 'agent' | 'system';
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
  };
  attachments: Attachment[];
  createdAt: string;
}

export interface Attachment {
  id: string;
  filename: string;
  mimeType: string;
  size: number;
  url: string;
}

export interface TicketFilters {
  status?: TicketStatus[];
  priority?: TicketPriority[];
  assigneeId?: string;
  departmentId?: string;
  search?: string;
  dateRange?: {
    from: string;
    to: string;
  };
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Stats for dashboard
export interface TicketStats {
  total: number;
  open: number;
  pending: number;
  resolved: number;
  closed: number;
  avgResponseTime: number; // in minutes
  avgResolutionTime: number; // in hours
}
