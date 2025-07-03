

import { notFound } from "next/navigation";
import TicketItem from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";
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
    notFound();
  }
  return(
    <div className = "flex justify-center animate-fade-from-top">
      <TicketItem ticket={ticket} isDetail={true}/>
    </div>
  )
   
};
export default TicketPage;