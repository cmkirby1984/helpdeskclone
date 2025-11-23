'use client';

import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatusBadge, PriorityBadge } from '@/components/shared/status-badge';
import { useTicketStore } from '@/store/tickets';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function RecentTickets() {
  const { tickets } = useTicketStore();
  const recentTickets = tickets.slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">Recent Tickets</CardTitle>
        <Link href="/tickets">
          <Button variant="ghost" size="sm" className="gap-1 text-xs">
            View all
            <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {recentTickets.map((ticket) => (
            <Link
              key={ticket.id}
              href={`/tickets/${ticket.id}`}
              className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
            >
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarImage src={ticket.requester.avatarUrl} />
                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                  {getInitials(ticket.requester.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground">
                    #{ticket.number}
                  </span>
                  <span className="font-medium truncate text-sm">
                    {ticket.subject}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                  <span>{ticket.requester.name}</span>
                  <span>•</span>
                  <span>
                    {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <StatusBadge status={ticket.status} className="text-xs" />
                <PriorityBadge priority={ticket.priority} className="text-xs hidden sm:flex" />
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
