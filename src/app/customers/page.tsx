'use client';

import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Plus, MoreHorizontal, Mail, Phone, Building2 } from 'lucide-react';

const customers = [
  { id: '1', name: 'John Smith', email: 'john.smith@example.com', phone: '+1 (555) 123-4567', organization: 'Acme Corp', tickets: 12, lastContact: '2024-11-22' },
  { id: '2', name: 'Emily Davis', email: 'emily.d@company.org', phone: '+1 (555) 234-5678', organization: null, tickets: 5, lastContact: '2024-11-21' },
  { id: '3', name: 'Michael Brown', email: 'mbrown@enterprise.com', phone: '+1 (555) 345-6789', organization: 'Enterprise Inc', tickets: 28, lastContact: '2024-11-22' },
  { id: '4', name: 'Lisa Wang', email: 'lisa.wang@startup.io', phone: '+1 (555) 456-7890', organization: 'Startup.io', tickets: 8, lastContact: '2024-11-20' },
  { id: '5', name: 'David Kim', email: 'dkim@tech.co', phone: '+1 (555) 567-8901', organization: 'Tech Co', tickets: 15, lastContact: '2024-11-22' },
  { id: '6', name: 'Amanda Foster', email: 'afoster@corp.net', phone: '+1 (555) 678-9012', organization: 'Corp Network', tickets: 3, lastContact: '2024-11-18' },
];

function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

export default function CustomersPage() {
  return (
    <div className="flex h-full flex-col">
      <Header title="Customers" subtitle="Manage your customer contacts" />
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between gap-4 p-4 border-b">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search customers..." className="pl-9 h-9" />
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Customer
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Customer</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead className="text-center">Tickets</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id} className="cursor-pointer">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {getInitials(customer.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {customer.organization ? (
                      <Badge variant="secondary" className="gap-1">
                        <Building2 className="h-3 w-3" />
                        {customer.organization}
                      </Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{customer.tickets}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {new Date(customer.lastContact).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>View Tickets</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}
