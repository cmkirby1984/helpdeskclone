'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { TicketStatus, TicketPriority } from '@/types';

interface StatusBadgeProps {
  status: TicketStatus;
  className?: string;
}

const statusConfig: Record<TicketStatus, { label: string; className: string }> = {
  open: {
    label: 'Open',
    className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  },
  pending: {
    label: 'Pending',
    className: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  },
  resolved: {
    label: 'Resolved',
    className: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  },
  closed: {
    label: 'Closed',
    className: 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge
      variant="outline"
      className={cn('font-medium', config.className, className)}
    >
      {config.label}
    </Badge>
  );
}

interface PriorityBadgeProps {
  priority: TicketPriority;
  className?: string;
}

const priorityConfig: Record<TicketPriority, { label: string; className: string }> = {
  low: {
    label: 'Low',
    className: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
  },
  medium: {
    label: 'Medium',
    className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  },
  high: {
    label: 'High',
    className: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
  },
  urgent: {
    label: 'Urgent',
    className: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
  },
};

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const config = priorityConfig[priority];
  return (
    <Badge
      variant="outline"
      className={cn('font-medium', config.className, className)}
    >
      {config.label}
    </Badge>
  );
}

interface ChannelBadgeProps {
  channel: string;
  className?: string;
}

const channelConfig: Record<string, { label: string; icon: string }> = {
  email: { label: 'Email', icon: '📧' },
  web: { label: 'Web', icon: '🌐' },
  chat: { label: 'Chat', icon: '💬' },
  phone: { label: 'Phone', icon: '📞' },
  api: { label: 'API', icon: '🔌' },
};

export function ChannelBadge({ channel, className }: ChannelBadgeProps) {
  const config = channelConfig[channel] || { label: channel, icon: '📝' };
  return (
    <Badge variant="outline" className={cn('font-normal', className)}>
      <span className="mr-1">{config.icon}</span>
      {config.label}
    </Badge>
  );
}
