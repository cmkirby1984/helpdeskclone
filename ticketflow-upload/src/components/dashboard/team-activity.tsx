'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const teamMembers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Agent',
    status: 'online',
    activeTickets: 8,
    avatarUrl: null,
  },
  {
    id: '2',
    name: 'Alex Chen',
    role: 'Supervisor',
    status: 'online',
    activeTickets: 5,
    avatarUrl: null,
  },
  {
    id: '3',
    name: 'Jordan Lee',
    role: 'Agent',
    status: 'away',
    activeTickets: 3,
    avatarUrl: null,
  },
  {
    id: '4',
    name: 'Emma Wilson',
    role: 'Agent',
    status: 'offline',
    activeTickets: 0,
    avatarUrl: null,
  },
  {
    id: '5',
    name: 'Marcus Brown',
    role: 'Agent',
    status: 'online',
    activeTickets: 6,
    avatarUrl: null,
  },
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const statusColors: Record<string, string> = {
  online: 'bg-green-500',
  away: 'bg-amber-500',
  offline: 'bg-gray-400',
};

export function TeamActivity() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Team Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[280px]">
          <div className="divide-y">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-3 p-4"
              >
                <div className="relative">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={member.avatarUrl || undefined} />
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background ${
                      statusColors[member.status]
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  {member.activeTickets > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {member.activeTickets} tickets
                    </Badge>
                  )}
                  <Badge
                    variant="outline"
                    className={`text-xs capitalize ${
                      member.status === 'online'
                        ? 'border-green-500/30 text-green-600 dark:text-green-400'
                        : member.status === 'away'
                        ? 'border-amber-500/30 text-amber-600 dark:text-amber-400'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {member.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
