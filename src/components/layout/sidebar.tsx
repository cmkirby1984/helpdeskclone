'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Inbox,
  LayoutDashboard,
  Users,
  Settings,
  HelpCircle,
  FolderOpen,
  BarChart3,
  MessageSquare,
  BookOpen,
  Zap,
  ChevronDown,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

const navigation = [
  {
    name: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    name: 'Tickets',
    href: '/tickets',
    icon: Inbox,
    badge: 12,
  },
  {
    name: 'Live Chat',
    href: '/chat',
    icon: MessageSquare,
    badge: 3,
  },
  {
    name: 'Customers',
    href: '/customers',
    icon: Users,
  },
  {
    name: 'Knowledge Base',
    href: '/kb',
    icon: BookOpen,
  },
  {
    name: 'Reports',
    href: '/reports',
    icon: BarChart3,
  },
];

const queues = [
  { name: 'My Tickets', count: 8, color: 'bg-blue-500' },
  { name: 'Unassigned', count: 15, color: 'bg-amber-500' },
  { name: 'High Priority', count: 4, color: 'bg-red-500' },
  { name: 'Pending Response', count: 6, color: 'bg-purple-500' },
];

const adminNav = [
  { name: 'Automations', href: '/admin/automations', icon: Zap },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
  { name: 'Help', href: '/help', icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-card">
      {/* Logo & Brand */}
      <div className="flex h-14 items-center gap-2 border-b px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
          T
        </div>
        <span className="text-lg font-semibold">Ticketflow</span>
      </div>

      {/* Search */}
      <div className="p-3">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 text-muted-foreground"
          size="sm"
        >
          <Search className="h-4 w-4" />
          <span>Search...</span>
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3">
        {/* Main Navigation */}
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-3',
                    isActive && 'bg-secondary'
                  )}
                  size="sm"
                >
                  <item.icon className="h-4 w-4" />
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className="ml-auto h-5 min-w-5 justify-center rounded-full bg-primary/10 text-primary text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>

        <Separator className="my-4" />

        {/* Queues */}
        <div className="space-y-1">
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Queues
            </span>
            <Button variant="ghost" size="icon" className="h-5 w-5">
              <FolderOpen className="h-3 w-3" />
            </Button>
          </div>
          {queues.map((queue) => (
            <Button
              key={queue.name}
              variant="ghost"
              className="w-full justify-start gap-3"
              size="sm"
            >
              <span className={cn('h-2 w-2 rounded-full', queue.color)} />
              <span className="flex-1 text-left">{queue.name}</span>
              <span className="text-xs text-muted-foreground">{queue.count}</span>
            </Button>
          ))}
        </div>

        <Separator className="my-4" />

        {/* Admin Navigation */}
        <nav className="space-y-1">
          {adminNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className="w-full justify-start gap-3"
                  size="sm"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Button>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* User Profile */}
      <div className="border-t p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 px-2"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/agent.jpg" />
                <AvatarFallback className="bg-primary/10 text-primary text-sm">
                  SJ
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium">Sarah Johnson</p>
                <p className="text-xs text-muted-foreground">Agent</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuItem>Keyboard shortcuts</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
