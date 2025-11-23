'use client';

import { useState } from 'react';
import { formatDistanceToNow, format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { StatusBadge, PriorityBadge } from '@/components/shared/status-badge';
import {
  X,
  Send,
  Paperclip,
  MoreHorizontal,
  Clock,
  User,
  Building2,
  Mail,
  Phone,
  Globe,
  MessageSquare,
  Tag,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Smile,
  Bold,
  Italic,
  List,
  Link2,
  Code,
  AtSign,
  ChevronDown,
} from 'lucide-react';
import type { Ticket, Message } from '@/types';

interface TicketDetailProps {
  ticket: Ticket;
  onClose?: () => void;
}

// Mock messages for the ticket
const mockMessages: Message[] = [
  {
    id: 'm1',
    ticketId: '1',
    content: "Hi, I'm having trouble accessing my account after resetting my password. When I try to log in with the new password, it says 'Invalid credentials'. I've tried resetting it multiple times but the issue persists. Can you please help?",
    isInternal: false,
    author: {
      type: 'user',
      id: 'u1',
      name: 'John Smith',
      email: 'john.smith@example.com',
    },
    attachments: [],
    createdAt: '2024-11-22T09:30:00Z',
  },
  {
    id: 'm2',
    ticketId: '1',
    content: "Hello John, thank you for reaching out. I'm sorry to hear you're having trouble accessing your account. Let me look into this for you.\n\nCould you please confirm:\n1. Are you using the correct email address?\n2. Have you checked your spam folder for the password reset email?\n3. Are you copying and pasting the new password or typing it manually?",
    isInternal: false,
    author: {
      type: 'agent',
      id: 'a1',
      name: 'Sarah Johnson',
      email: 'sarah@support.com',
    },
    attachments: [],
    createdAt: '2024-11-22T10:15:00Z',
  },
  {
    id: 'm3',
    ticketId: '1',
    content: 'Customer account shows multiple failed login attempts in the last hour. Might be a caching issue on their end or a browser autofill problem.',
    isInternal: true,
    author: {
      type: 'agent',
      id: 'a1',
      name: 'Sarah Johnson',
      email: 'sarah@support.com',
    },
    attachments: [],
    createdAt: '2024-11-22T10:20:00Z',
  },
  {
    id: 'm4',
    ticketId: '1',
    content: "Yes, I'm using the correct email. I found the reset email in my inbox (not spam) and I've been typing the password manually. I even tried clearing my browser cache but still getting the same error.",
    isInternal: false,
    author: {
      type: 'user',
      id: 'u1',
      name: 'John Smith',
      email: 'john.smith@example.com',
    },
    attachments: [],
    createdAt: '2024-11-22T14:20:00Z',
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

export function TicketDetail({ ticket, onClose }: TicketDetailProps) {
  const [reply, setReply] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const [activeTab, setActiveTab] = useState('conversation');

  const handleSend = () => {
    if (!reply.trim()) return;
    console.log('Sending reply:', { content: reply, isInternal });
    setReply('');
  };

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b p-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-mono text-muted-foreground">
              #{ticket.number}
            </span>
            <StatusBadge status={ticket.status} />
            <PriorityBadge priority={ticket.priority} />
          </div>
          <h2 className="text-lg font-semibold truncate">{ticket.subject}</h2>
          <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              Created {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
            </span>
            <span>•</span>
            <span>{ticket.messageCount} messages</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit ticket</DropdownMenuItem>
              <DropdownMenuItem>Merge with...</DropdownMenuItem>
              <DropdownMenuItem>Print</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">Delete ticket</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="conversation"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Conversation
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                <Clock className="h-4 w-4 mr-2" />
                Activity
              </TabsTrigger>
            </TabsList>

            <TabsContent value="conversation" className="flex-1 flex flex-col m-0 overflow-hidden">
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {mockMessages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                  ))}
                </div>
              </ScrollArea>

              {/* Reply Box */}
              <div className="border-t p-4">
                <div className="rounded-lg border bg-card">
                  {/* Toolbar */}
                  <div className="flex items-center gap-1 border-b px-2 py-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Bold className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Bold</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Italic className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Italic</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <List className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>List</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Link2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Link</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Code className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Code</TooltipContent>
                    </Tooltip>
                    <Separator orientation="vertical" className="h-5 mx-1" />
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <AtSign className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Mention teammate</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Smile className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Emoji</TooltipContent>
                    </Tooltip>
                  </div>

                  {/* Text Area */}
                  <Textarea
                    placeholder={isInternal ? "Add an internal note..." : "Type your reply..."}
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    className="min-h-[100px] border-0 focus-visible:ring-0 resize-none"
                  />

                  {/* Actions */}
                  <div className="flex items-center justify-between border-t p-2">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Paperclip className="h-4 w-4" />
                        Attach
                      </Button>
                      <Button
                        variant={isInternal ? 'secondary' : 'ghost'}
                        size="sm"
                        className="gap-2"
                        onClick={() => setIsInternal(!isInternal)}
                      >
                        {isInternal ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        {isInternal ? 'Internal note' : 'Public reply'}
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-1">
                            Canned responses
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-64">
                          <DropdownMenuItem>Greeting - Standard</DropdownMenuItem>
                          <DropdownMenuItem>Password Reset Instructions</DropdownMenuItem>
                          <DropdownMenuItem>Request More Information</DropdownMenuItem>
                          <DropdownMenuItem>Issue Resolved - Closing</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Manage canned responses...</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button onClick={handleSend} disabled={!reply.trim()} className="gap-2">
                        <Send className="h-4 w-4" />
                        {isInternal ? 'Add Note' : 'Send Reply'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="flex-1 m-0 p-4 overflow-auto">
              <div className="space-y-4">
                {[
                  { action: 'Status changed to Open', user: 'System', time: '2 hours ago' },
                  { action: 'Assigned to Sarah Johnson', user: 'System', time: '2 hours ago' },
                  { action: 'Priority set to High', user: 'Sarah Johnson', time: '1 hour ago' },
                  { action: 'Tag added: urgent', user: 'Sarah Johnson', time: '1 hour ago' },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-muted-foreground/30" />
                    <div className="flex-1">
                      <p className="text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.user} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="w-80 border-l bg-muted/30 overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* Requester Info */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Requester</h3>
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={ticket.requester.avatarUrl} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {getInitials(ticket.requester.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{ticket.requester.name}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {ticket.requester.email}
                  </p>
                </div>
              </div>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{ticket.requester.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  <span>3 previous tickets</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Ticket Properties */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Properties</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground">Status</label>
                  <Select defaultValue={ticket.status}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground">Priority</label>
                  <Select defaultValue={ticket.priority}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground">Assignee</label>
                  <Select defaultValue={ticket.assignee?.id || 'unassigned'}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                      <SelectItem value="a1">Sarah Johnson</SelectItem>
                      <SelectItem value="a2">Alex Chen</SelectItem>
                      <SelectItem value="a3">Jordan Lee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground">Department</label>
                  <Select defaultValue={ticket.department?.id || ''}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="d1">Technical Support</SelectItem>
                      <SelectItem value="d2">Product Feedback</SelectItem>
                      <SelectItem value="d3">Billing</SelectItem>
                      <SelectItem value="d4">Customer Success</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Tags */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-1">
                {ticket.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive/10 hover:text-destructive"
                  >
                    {tag}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
                <Button variant="ghost" size="sm" className="h-6 text-xs">
                  <Tag className="h-3 w-3 mr-1" />
                  Add tag
                </Button>
              </div>
            </div>

            <Separator />

            {/* Timestamps */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Timestamps</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span>{format(new Date(ticket.createdAt), 'MMM d, yyyy h:mm a')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Updated</span>
                  <span>{format(new Date(ticket.updatedAt), 'MMM d, yyyy h:mm a')}</span>
                </div>
                {ticket.resolvedAt && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Resolved</span>
                    <span>{format(new Date(ticket.resolvedAt), 'MMM d, yyyy h:mm a')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isAgent = message.author.type === 'agent';
  const isInternal = message.isInternal;

  return (
    <div
      className={cn(
        'flex gap-3',
        isAgent && 'flex-row-reverse'
      )}
    >
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarImage src={message.author.avatarUrl} />
        <AvatarFallback
          className={cn(
            'text-xs',
            isAgent ? 'bg-primary/10 text-primary' : 'bg-muted'
          )}
        >
          {getInitials(message.author.name)}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          'flex-1 max-w-[80%]',
          isAgent && 'flex flex-col items-end'
        )}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium">{message.author.name}</span>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
          </span>
          {isInternal && (
            <Badge variant="outline" className="text-xs">
              <EyeOff className="h-3 w-3 mr-1" />
              Internal
            </Badge>
          )}
        </div>
        <div
          className={cn(
            'rounded-lg px-4 py-3 text-sm',
            isInternal
              ? 'bg-amber-500/10 border border-amber-500/20'
              : isAgent
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted'
          )}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </div>
  );
}
