'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Inbox, Search, FileQuestion, Plus } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 text-center',
        className
      )}
    >
      <div className="rounded-full bg-muted p-4 mb-4">
        {icon || <Inbox className="h-8 w-8 text-muted-foreground" />}
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-4">
        {description}
      </p>
      {action && (
        <Button onClick={action.onClick} className="gap-2">
          <Plus className="h-4 w-4" />
          {action.label}
        </Button>
      )}
    </div>
  );
}

export function NoResults({ query }: { query?: string }) {
  return (
    <EmptyState
      icon={<Search className="h-8 w-8 text-muted-foreground" />}
      title="No results found"
      description={
        query
          ? `No tickets match "${query}". Try adjusting your search or filters.`
          : 'No tickets match your current filters. Try adjusting them.'
      }
    />
  );
}

export function NoTickets() {
  return (
    <EmptyState
      icon={<FileQuestion className="h-8 w-8 text-muted-foreground" />}
      title="No tickets yet"
      description="When customers submit tickets, they'll appear here. Create your first ticket to get started."
      action={{
        label: 'Create Ticket',
        onClick: () => console.log('Create ticket'),
      }}
    />
  );
}
