'use client';

import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { StatusBadge, PriorityBadge } from '@/components/shared/status-badge';
import {
  Mail,
  Globe,
  MessageSquare,
  Phone,
  Plug,
  Paperclip,
  Clock,
} from 'lucide-react';
import type { Ticket } from '@/types';

interface TicketRowProps {
  ticket: Ticket;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  onClick?: (ticket: Ticket) => void;
}

const channelIcons: Record<string, React.ReactNode> = {
  email: <Mail className="h-3.5 w-3.5" />,
  web: <Globe className="h-3.5 w-3.5" />,
  chat: <MessageSquare className="h-3.5 w-3.5" />,
  phone: <Phone className="h-3.5 w-3.5" />,
  api: <Plug className="h-3.5 w-3.5" />,
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function TicketRow({ ticket, isSelected, onSelect, onClick }: TicketRowProps) {
  const timeAgo = formatDistanceToNow(new Date(ticket.lastMessageAt), {
    addSuffix: true,
  });

  return (
    <div
      className={cn(
        'group flex items-center gap-4 px-4 py-3 border-b transition-colors cursor-pointer',
        'hover:bg-muted/50',
        isSelected && 'bg-primary/5',
        ticket.isUnread && 'bg-primary/5'
      )}
      onClick={() => onClick?.(ticket)}
    >
      {/* Checkbox */}
      <div onClick={(e) => e.stopPropagation()}>
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onSelect?.(ticket.id)}
          className="opacity-0 group-hover:opacity-100 data-[state=checked]:opacity-100 transition-opacity"
        />
      </div>

      {/* Unread Indicator */}
      <div className="w-2">
        {ticket.isUnread && (
          <span className="block h-2 w-2 rounded-full bg-primary" />
        )}
      </div>

      {/* Avatar */}
      <Avatar className="h-9 w-9 shrink-0">
        <AvatarImage src={ticket.requester.avatarUrl} />
        <AvatarFallback className="text-xs bg-primary/10 text-primary">
          {getInitials(ticket.requester.name)}
        </AvatarFallback>
      </Avatar>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-xs font-mono text-muted-foreground">
            #{ticket.number}
          </span>
          <span
            className={cn(
              'font-medium truncate',
              ticket.isUnread && 'font-semibold'
            )}
          >
            {ticket.subject}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="truncate">{ticket.requester.name}</span>
          <span className="text-muted-foreground/50">•</span>
          <span className="truncate text-xs">{ticket.requester.email}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="hidden xl:flex items-center gap-1 shrink-0">
        {ticket.tags.slice(0, 2).map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="text-xs font-normal px-1.5 py-0"
          >
            {tag}
          </Badge>
        ))}
        {ticket.tags.length > 2 && (
          <Badge
            variant="secondary"
            className="text-xs font-normal px-1.5 py-0"
          >
            +{ticket.tags.length - 2}
          </Badge>
        )}
      </div>

      {/* Status & Priority */}
      <div className="hidden sm:flex items-center gap-2 shrink-0">
        <StatusBadge status={ticket.status} />
        <PriorityBadge priority={ticket.priority} />
      </div>

      {/* Assignee */}
      <div className="hidden lg:flex items-center shrink-0 w-32">
        {ticket.assignee ? (
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={ticket.assignee.avatarUrl} />
              <AvatarFallback className="text-[10px] bg-muted">
                {getInitials(ticket.assignee.name)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground truncate">
              {ticket.assignee.name.split(' ')[0]}
            </span>
          </div>
        ) : (
          <span className="text-sm text-muted-foreground italic">Unassigned</span>
        )}
      </div>

      {/* Channel & Meta */}
      <div className="flex items-center gap-3 text-muted-foreground shrink-0">
        <div
          className="text-muted-foreground/70"
          title={`Via ${ticket.channel}`}
        >
          {channelIcons[ticket.channel]}
        </div>
        <div className="flex items-center gap-1 text-xs" title="Messages">
          <MessageSquare className="h-3 w-3" />
          <span>{ticket.messageCount}</span>
        </div>
      </div>

      {/* Timestamp */}
      <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0 w-24 justify-end">
        <Clock className="h-3 w-3" />
        <span>{timeAgo}</span>
      </div>
    </div>
  );
}
