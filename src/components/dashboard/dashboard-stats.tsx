'use client';

import { StatsCard } from '@/components/shared/stats-card';
import {
  Inbox,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useTicketStore } from '@/store/tickets';

export function DashboardStats() {
  const { stats } = useTicketStore();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Open Tickets"
        value={stats.open}
        description="Awaiting response"
        icon={<Inbox className="h-5 w-5" />}
        trend={{ value: 12, label: 'from last week' }}
      />
      <StatsCard
        title="Pending"
        value={stats.pending}
        description="Waiting on customer"
        icon={<Clock className="h-5 w-5" />}
        trend={{ value: -5, label: 'from last week' }}
      />
      <StatsCard
        title="Resolved Today"
        value={stats.resolved}
        description="Great progress!"
        icon={<CheckCircle2 className="h-5 w-5" />}
        trend={{ value: 23, label: 'from yesterday' }}
      />
      <StatsCard
        title="Avg. Response Time"
        value={`${stats.avgResponseTime}m`}
        description="First response"
        icon={<TrendingUp className="h-5 w-5" />}
        trend={{ value: -8, label: 'improvement' }}
      />
    </div>
  );
}
