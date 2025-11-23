'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Search,
  SlidersHorizontal,
  X,
  ArrowDownAZ,
  ArrowUpAZ,
  ChevronDown,
} from 'lucide-react';
import type { TicketStatus, TicketPriority } from '@/types';

interface TicketFiltersProps {
  onSearchChange: (value: string) => void;
  onStatusChange: (statuses: TicketStatus[]) => void;
  onPriorityChange: (priorities: TicketPriority[]) => void;
  activeFilters: number;
}

const statusOptions: { value: TicketStatus; label: string; color: string }[] = [
  { value: 'open', label: 'Open', color: 'bg-blue-500' },
  { value: 'pending', label: 'Pending', color: 'bg-amber-500' },
  { value: 'resolved', label: 'Resolved', color: 'bg-green-500' },
  { value: 'closed', label: 'Closed', color: 'bg-gray-500' },
];

const priorityOptions: { value: TicketPriority; label: string; color: string }[] = [
  { value: 'urgent', label: 'Urgent', color: 'bg-red-500' },
  { value: 'high', label: 'High', color: 'bg-orange-500' },
  { value: 'medium', label: 'Medium', color: 'bg-blue-500' },
  { value: 'low', label: 'Low', color: 'bg-slate-500' },
];

export function TicketFilters({
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  activeFilters,
}: TicketFiltersProps) {
  const [search, setSearch] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<TicketStatus[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<TicketPriority[]>([]);
  const [sortBy, setSortBy] = useState('newest');

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange(value);
  };

  const toggleStatus = (status: TicketStatus) => {
    const newStatuses = selectedStatuses.includes(status)
      ? selectedStatuses.filter((s) => s !== status)
      : [...selectedStatuses, status];
    setSelectedStatuses(newStatuses);
    onStatusChange(newStatuses);
  };

  const togglePriority = (priority: TicketPriority) => {
    const newPriorities = selectedPriorities.includes(priority)
      ? selectedPriorities.filter((p) => p !== priority)
      : [...selectedPriorities, priority];
    setSelectedPriorities(newPriorities);
    onPriorityChange(newPriorities);
  };

  const clearFilters = () => {
    setSelectedStatuses([]);
    setSelectedPriorities([]);
    onStatusChange([]);
    onPriorityChange([]);
  };

  return (
    <div className="flex flex-col gap-3 p-4 border-b bg-card">
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9 h-9"
          />
          {search && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => handleSearchChange('')}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Quick Status Filters */}
        <div className="hidden md:flex items-center gap-1">
          {statusOptions.map((status) => (
            <Button
              key={status.value}
              variant={selectedStatuses.includes(status.value) ? 'secondary' : 'ghost'}
              size="sm"
              className="gap-2 h-9"
              onClick={() => toggleStatus(status.value)}
            >
              <span className={cn('h-2 w-2 rounded-full', status.color)} />
              {status.label}
            </Button>
          ))}
        </div>

        {/* Advanced Filters */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 h-9">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilters > 0 && (
                <Badge className="h-5 w-5 p-0 justify-center rounded-full text-xs">
                  {activeFilters}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Filters</h4>
                {activeFilters > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-xs text-muted-foreground"
                    onClick={clearFilters}
                  >
                    Clear all
                  </Button>
                )}
              </div>

              <Separator />

              {/* Status Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Status</Label>
                <div className="grid grid-cols-2 gap-2">
                  {statusOptions.map((status) => (
                    <div
                      key={status.value}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`status-${status.value}`}
                        checked={selectedStatuses.includes(status.value)}
                        onCheckedChange={() => toggleStatus(status.value)}
                      />
                      <Label
                        htmlFor={`status-${status.value}`}
                        className="flex items-center gap-2 text-sm font-normal cursor-pointer"
                      >
                        <span className={cn('h-2 w-2 rounded-full', status.color)} />
                        {status.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Priority Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Priority</Label>
                <div className="grid grid-cols-2 gap-2">
                  {priorityOptions.map((priority) => (
                    <div
                      key={priority.value}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`priority-${priority.value}`}
                        checked={selectedPriorities.includes(priority.value)}
                        onCheckedChange={() => togglePriority(priority.value)}
                      />
                      <Label
                        htmlFor={`priority-${priority.value}`}
                        className="flex items-center gap-2 text-sm font-normal cursor-pointer"
                      >
                        <span className={cn('h-2 w-2 rounded-full', priority.color)} />
                        {priority.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Sort */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[140px] h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
            <SelectItem value="updated">Recently updated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters Display */}
      {(selectedStatuses.length > 0 || selectedPriorities.length > 0) && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {selectedStatuses.map((status) => {
            const option = statusOptions.find((s) => s.value === status);
            return (
              <Badge
                key={status}
                variant="secondary"
                className="gap-1 pr-1 cursor-pointer"
                onClick={() => toggleStatus(status)}
              >
                <span className={cn('h-1.5 w-1.5 rounded-full', option?.color)} />
                {option?.label}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            );
          })}
          {selectedPriorities.map((priority) => {
            const option = priorityOptions.find((p) => p.value === priority);
            return (
              <Badge
                key={priority}
                variant="secondary"
                className="gap-1 pr-1 cursor-pointer"
                onClick={() => togglePriority(priority)}
              >
                <span className={cn('h-1.5 w-1.5 rounded-full', option?.color)} />
                {option?.label}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
