
// import { Suspense } from "react";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
// import { TicketList } from "@/features/components/ticket-list";


const TicketsPage = async () =>{

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title ="Tickets" description=" Displaying all Your tickets in one place"/>
      
      <Spinner />
      {/* <Suspense fallback = {<Spinner />}>
        <TicketList />
      </Suspense> */}

    </div>
  );
};
export default TicketsPage;