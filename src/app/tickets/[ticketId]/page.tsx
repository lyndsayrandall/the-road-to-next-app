// Had to put this in to avoid issues created in the
// static dynamic section of the course.
export const instant = false;




import Link from "next/link";
import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { initialTickets } from "@/data";
import { TicketItem } from "@/features/ticket/components/ticket-item"
import { ticketsPath } from "@/paths";


type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;

  const ticket = initialTickets.find((ticket) => ticket.id === ticketId);

  if (!ticket) {
    return <Placeholder 
                label ="Ticket not found"
                button ={
                  <Button variant ="outline">
                    <Link href={ticketsPath()}>Go to Tickets</Link>
                  </Button>
                } />;
  }

  return (
    <div className = "flex justify-center animate-fade-from-left">
      <TicketItem ticket={ticket} isDetail={true} />
    </div>
  );
};

export default TicketPage;