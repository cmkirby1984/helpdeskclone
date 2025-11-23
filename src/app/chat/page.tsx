'use client';

import { Header } from '@/components/layout/header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { MessageSquare, Circle, Send, Paperclip, Smile } from 'lucide-react';

const activeChats = [
  { id: 1, name: 'Alice Cooper', message: 'I need help with my order', time: '2m', unread: 2, status: 'active' },
  { id: 2, name: 'Bob Wilson', message: 'Thanks for your help!', time: '15m', unread: 0, status: 'active' },
  { id: 3, name: 'Carol Davis', message: 'Is anyone there?', time: '1h', unread: 1, status: 'waiting' },
];

export default function ChatPage() {
  return (
    <div className="flex h-full flex-col">
      <Header title="Live Chat" subtitle="3 active conversations" />
      <div className="flex flex-1 overflow-hidden">
        {/* Chat List */}
        <div className="w-80 border-r flex flex-col">
          <div className="p-4 border-b">
            <Input placeholder="Search conversations..." className="h-9" />
          </div>
          <ScrollArea className="flex-1">
            {activeChats.map((chat) => (
              <div
                key={chat.id}
                className="flex items-center gap-3 p-4 border-b hover:bg-muted/50 cursor-pointer"
              >
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {chat.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Circle
                    className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 fill-current ${
                      chat.status === 'active' ? 'text-green-500' : 'text-amber-500'
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{chat.name}</span>
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{chat.message}</p>
                </div>
                {chat.unread > 0 && (
                  <Badge className="h-5 w-5 justify-center rounded-full p-0 text-xs">
                    {chat.unread}
                  </Badge>
                )}
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center gap-3 p-4 border-b">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary/10 text-primary">AC</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium">Alice Cooper</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Circle className="h-2 w-2 fill-green-500 text-green-500" />
                Online
              </p>
            </div>
            <Button variant="outline" size="sm">Create Ticket</Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">AC</AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg px-4 py-2 max-w-[70%]">
                  <p className="text-sm">Hi, I need help with my recent order. The tracking shows it was delivered but I haven't received it.</p>
                  <span className="text-xs text-muted-foreground">2:30 PM</span>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <div className="bg-primary text-primary-foreground rounded-lg px-4 py-2 max-w-[70%]">
                  <p className="text-sm">Hello Alice! I'm sorry to hear about the delivery issue. Let me look into this for you. Could you please provide your order number?</p>
                  <span className="text-xs opacity-70">2:32 PM</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">AC</AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg px-4 py-2 max-w-[70%]">
                  <p className="text-sm">Sure, it's ORD-2024-78542</p>
                  <span className="text-xs text-muted-foreground">2:33 PM</span>
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input placeholder="Type a message..." className="flex-1" />
              <Button variant="ghost" size="icon">
                <Smile className="h-4 w-4" />
              </Button>
              <Button size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
