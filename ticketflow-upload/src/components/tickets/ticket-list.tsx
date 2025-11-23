'use client';

import { useState, useMemo } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { TicketRow } from './ticket-row';
import { TicketFilters } from './ticket-filters';
import { NoResults, NoTickets } from '@/components/shared/empty-state';
import { useTicketStore, useFilteredTickets } from '@/store/tickets';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ChevronDown,
  UserPlus,
  Tag,
  Trash2,
  Archive,
  MoreHorizontal,
} from 'lucide-react';
import type { Ticket, TicketStatus, TicketPriority } from '@/types';

interface TicketListProps {
  onTicketClick?: (ticket: Ticket) => void;
}

export function TicketList({ onTicketClick }: TicketListProps) {
  const { setFilters, filters } = useTicketStore();
  const tickets = useFilteredTickets();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleSearchChange = (search: string) => {
    setFilters({ ...filters, search: search || undefined });
  };

  const handleStatusChange = (statuses: TicketStatus[]) => {
    setFilters({ ...filters, status: statuses.length ? statuses : undefined });
  };

  const handlePriorityChange = (priorities: TicketPriority[]) => {
    setFilters({ ...filters, priority: priorities.length ? priorities : undefined });
  };

  const activeFilters = useMemo(() => {
    let count = 0;
    if (filters.status?.length) count++;
    if (filters.priority?.length) count++;
    if (filters.assigneeId) count++;
    if (filters.departmentId) count++;
    return count;
  }, [filters]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === tickets.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(tickets.map((t) => t.id)));
    }
  };

  const isAllSelected = tickets.length > 0 && selectedIds.size === tickets.length;
  const isSomeSelected = selectedIds.size > 0 && selectedIds.size < tickets.length;

  return (
    <div className="flex flex-col h-full">
      <TicketFilters
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onPriorityChange={handlePriorityChange}
        activeFilters={activeFilters}
      />

      {/* Bulk Actions Bar */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-3 px-4 py-2 bg-primary/5 border-b">
          <Checkbox
            checked={isAllSelected}
            ref={(el) => {
              if (el) {
                (el as unknown as HTMLInputElement).indeterminate = isSomeSelected;
              }
            }}
            onCheckedChange={toggleSelectAll}
          />
          <span className="text-sm font-medium">
            {selectedIds.size} selected
          </span>
          <div className="flex items-center gap-1 ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  Assign
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Assign to me
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Assign to team member...
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Unassign</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  Status
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Open</DropdownMenuItem>
                <DropdownMenuItem>Pending</DropdownMenuItem>
                <DropdownMenuItem>Resolved</DropdownMenuItem>
                <DropdownMenuItem>Closed</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="sm" className="gap-1">
              <Tag className="h-4 w-4" />
              Tag
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Archive className="h-4 w-4 mr-2" />
                  Archive
                </DropdownMenuItem>
                <DropdownMenuItem>Merge tickets</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}

      {/* Ticket List Header */}
      {tickets.length > 0 && selectedIds.size === 0 && (
        <div className="flex items-center gap-4 px-4 py-2 border-b bg-muted/30 text-xs text-muted-foreground font-medium">
          <div className="w-6">
            <Checkbox
              checked={isAllSelected}
              onCheckedChange={toggleSelectAll}
              className="opacity-50 hover:opacity-100"
            />
          </div>
          <div className="w-2" />
          <div className="w-9" />
          <div className="flex-1">Ticket</div>
          <div className="hidden xl:block w-32">Tags</div>
          <div className="hidden sm:block w-40">Status / Priority</div>
          <div className="hidden lg:block w-32">Assignee</div>
          <div className="w-16">Channel</div>
          <div className="w-24 text-right">Updated</div>
        </div>
      )}

      {/* Ticket List */}
      <ScrollArea className="flex-1">
        {tickets.length === 0 ? (
          filters.search ? (
            <NoResults query={filters.search} />
          ) : (
            <NoTickets />
          )
        ) : (
          <div>
            {tickets.map((ticket) => (
              <TicketRow
                key={ticket.id}
                ticket={ticket}
                isSelected={selectedIds.has(ticket.id)}
                onSelect={toggleSelect}
                onClick={onTicketClick}
              />
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Footer Stats */}
      {tickets.length > 0 && (
        <div className="flex items-center justify-between px-4 py-2 border-t bg-muted/30 text-xs text-muted-foreground">
          <span>
            Showing {tickets.length} ticket{tickets.length !== 1 ? 's' : ''}
          </span>
          <div className="flex items-center gap-4">
            <span>
              {tickets.filter((t) => t.isUnread).length} unread
            </span>
            <span>
              {tickets.filter((t) => t.status === 'open').length} open
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
