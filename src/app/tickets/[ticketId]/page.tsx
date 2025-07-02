
import Link from "next/link";
import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import TicketItem from "@/features/components/ticket-item";
import { getTicket } from "@/features/queries/get-ticket";
import { ticketsPath } from "@/paths";



type TicketPageProps ={
  params : Promise<{
    ticketId : string;
    icon?: React.ReactElement;
  }>;
};

const TicketPage = async({ params }:TicketPageProps) => {
  
  const ticket = await getTicket((await params).ticketId);

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