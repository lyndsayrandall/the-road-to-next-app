// Had to put this in to avoid issues created in the
// static dynamic section of the course.
export const instant = false;




import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { initialTickets } from "@/data";
import { ticketsPath } from "@/paths";
import Link from "next/link";

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
    <div className = "animate-fade-from-left">
      <h2 className="text-lg">{ticket.title}</h2>
      <p className="text-sm">{ticket.content}</p>
    </div>
  );
};

export default TicketPage;