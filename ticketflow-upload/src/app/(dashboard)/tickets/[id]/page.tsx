'use client';

import { use } from 'react';
import { Header } from '@/components/layout/header';
import { TicketDetail } from '@/components/tickets/ticket-detail';
import { useTicketStore } from '@/store/tickets';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { tickets } = useTicketStore();
  const ticket = tickets.find((t) => t.id === id);

  if (!ticket) {
    return (
      <div className="flex h-full flex-col">
        <Header title="Ticket Not Found" />
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground">
            The ticket you're looking for doesn't exist or has been deleted.
          </p>
          <Link href="/tickets">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Tickets
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b px-4 py-2">
        <Link href="/tickets">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>
      <div className="flex-1 overflow-hidden">
        <TicketDetail ticket={ticket} />
      </div>
    </div>
  );
}
