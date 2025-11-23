'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import {
  Inbox,
  LayoutDashboard,
  Users,
  Settings,
  HelpCircle,
  BarChart3,
  MessageSquare,
  BookOpen,
  Zap,
  Plus,
  Search,
  Moon,
  Sun,
  Laptop,
  User,
  LogOut,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTicketStore } from '@/store/tickets';

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();
  const { tickets } = useTicketStore();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Quick Actions">
          <CommandItem
            onSelect={() => runCommand(() => router.push('/tickets/new'))}
          >
            <Plus className="mr-2 h-4 w-4" />
            <span>Create New Ticket</span>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/tickets'))}
          >
            <Search className="mr-2 h-4 w-4" />
            <span>Search Tickets</span>
            <CommandShortcut>⌘F</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Navigation">
          <CommandItem
            onSelect={() => runCommand(() => router.push('/'))}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/tickets'))}
          >
            <Inbox className="mr-2 h-4 w-4" />
            <span>Tickets</span>
            <CommandShortcut>{tickets.filter(t => t.isUnread).length} new</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/chat'))}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Live Chat</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/customers'))}
          >
            <Users className="mr-2 h-4 w-4" />
            <span>Customers</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/kb'))}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Knowledge Base</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/reports'))}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Reports</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Recent Tickets">
          {tickets.slice(0, 5).map((ticket) => (
            <CommandItem
              key={ticket.id}
              onSelect={() => runCommand(() => router.push(`/tickets/${ticket.id}`))}
            >
              <span className="font-mono text-muted-foreground mr-2">
                #{ticket.number}
              </span>
              <span className="truncate">{ticket.subject}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Theme">
          <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
            <Sun className="mr-2 h-4 w-4" />
            <span>Light Mode</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark Mode</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
            <Laptop className="mr-2 h-4 w-4" />
            <span>System Theme</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Account">
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile Settings</span>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Preferences</span>
          </CommandItem>
          <CommandItem>
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help & Support</span>
          </CommandItem>
          <CommandItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
