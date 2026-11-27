// Had to put this in to avoid issues created in the
// static dynamic section of the course.
export const instant = false;






import { notFound } from "next/navigation";
import { TicketItem } from "@/features/ticket/components/ticket-item"
import { getTicket } from "@/features/ticket/queries/get-ticket";



type TicketPageProps = {
  params: Promise<{
    ticketId: number;
  }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  if (!ticket) {
      notFound();
  }

  return (
    <div className = "flex justify-center animate-fade-from-left">
      <TicketItem ticket={ticket} isDetail={true} />
    </div>
  );
};

export default TicketPage;