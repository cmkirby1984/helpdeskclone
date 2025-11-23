'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Plus,
  Users,
  FileText,
  Settings,
  MessageSquare,
  BarChart3,
  BookOpen,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

const actions = [
  {
    label: 'New Ticket',
    icon: Plus,
    href: '/tickets/new',
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  {
    label: 'Live Chat',
    icon: MessageSquare,
    href: '/chat',
    color: 'bg-green-500/10 text-green-600 dark:text-green-400',
  },
  {
    label: 'Customers',
    icon: Users,
    href: '/customers',
    color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  },
  {
    label: 'Knowledge Base',
    icon: BookOpen,
    href: '/kb',
    color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  },
  {
    label: 'Reports',
    icon: BarChart3,
    href: '/reports',
    color: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
  },
  {
    label: 'Automations',
    icon: Zap,
    href: '/admin/automations',
    color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {actions.map((action) => (
            <Link key={action.label} href={action.href}>
              <Button
                variant="outline"
                className="w-full h-auto flex-col gap-2 py-4 hover:bg-muted/50"
              >
                <div className={`rounded-lg p-2 ${action.color}`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium">{action.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
