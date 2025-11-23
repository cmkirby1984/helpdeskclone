'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { TicketList } from '@/components/tickets/ticket-list';
import { TicketDetail } from '@/components/tickets/ticket-detail';
import { useTicketStore } from '@/store/tickets';
import type { Ticket } from '@/types';

export default function TicketsPage() {
  const { tickets } = useTicketStore();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  const handleCloseDetail = () => {
    setSelectedTicket(null);
  };

  return (
    <div className="flex h-full flex-col">
      <Header
        title="Tickets"
        subtitle={`${tickets.length} total tickets`}
      />
      <div className="flex flex-1 overflow-hidden">
        {/* Ticket List */}
        <div className={`flex-1 overflow-hidden ${selectedTicket ? 'hidden lg:block lg:max-w-md xl:max-w-lg' : ''}`}>
          <TicketList onTicketClick={handleTicketClick} />
        </div>

        {/* Ticket Detail */}
        {selectedTicket && (
          <div className="flex-1 overflow-hidden border-l">
            <TicketDetail ticket={selectedTicket} onClose={handleCloseDetail} />
          </div>
        )}
      </div>
    </div>
  );
}
