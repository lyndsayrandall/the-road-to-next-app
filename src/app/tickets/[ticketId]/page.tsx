import Link from "next/link";
import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { initialTickets } from "@/data";
import TicketItem from "@/features/components/ticket-item";
import { ticketsPath } from "@/paths";



type TicketPageProps ={
  params : Promise<{
    ticketId : string;
    icon?: React.ReactElement;
  }>;
};

const TicketPage = async({ params }:TicketPageProps) => {
  const{ticketId} = await params;
  const ticket = initialTickets.find((ticket) => ticket.id === ticketId) ;

  if(!ticket){
    return <Placeholder 
      label="Ticket not found."
      button ={
        <Button asChild variant="outline">
          <Link href= {ticketsPath()}>Go back to Tickets</Link>
        </Button>
        
      }/>
  }
  return(
    <div className = "flex justify-center animate-fade-from-top">
      <TicketItem ticket={ticket} isDetail={true}/>
    </div>
  )
   
};
export default TicketPage;