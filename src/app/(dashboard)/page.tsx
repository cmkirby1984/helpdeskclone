'use client';

import { Header } from '@/components/layout/header';
import { DashboardStats } from '@/components/dashboard/dashboard-stats';
import { RecentTickets } from '@/components/dashboard/recent-tickets';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { TeamActivity } from '@/components/dashboard/team-activity';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function DashboardPage() {
  return (
    <div className="flex h-full flex-col">
      <Header title="Dashboard" subtitle="Welcome back, Sarah" />
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Stats */}
          <DashboardStats />

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Recent Tickets - Takes 2 columns */}
            <div className="lg:col-span-2">
              <RecentTickets />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <QuickActions />
              <TeamActivity />
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
