"use client";

import { Ticket } from "@prisma/client";
import clsx from "clsx";
import { LucideSquareArrowOutUpRight, LucideTrash } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
    Card, 
    CardContent,
    CardHeader, 
    CardTitle} from "@/components/ui/card";
import { ticketPath } from "@/paths";
import { TICKET_ICONS } from "../../constants";
import { deleteTicket } from "../actions/delete-ticket";


type TicketItemProps = {
  ticket: Ticket;
  isDetail?: boolean;
};

const TicketItem = ({ ticket, isDetail }: TicketItemProps) =>{
    

    const detailButton =(
            <Button variant="outline" size="icon" asChild>
                <Link href={ticketPath(ticket.id)} >
                    <LucideSquareArrowOutUpRight className= "h-4 w-4"/>
                </Link>
            </Button>
    );

    const deleteButton = (
        <form action= {deleteTicket.bind(null, ticket.id)}>
            <Button variant= "outline" size ="icon" >
                <LucideTrash className = "h-4 w-4" />
            </Button>
        </form>
    );
    return(
        <div className={clsx("w-full  flex gap-x-1",{
            "max-w-[420px]": !isDetail,
            "max-w-[580px]": isDetail,
        } )}>
            <Card
            key={ticket.id}
            className="w-full" >
                <CardHeader>
                <CardTitle className= "flex gap-x-2">
                    <span>{TICKET_ICONS[ticket.status]}</span>
                    <span className="truncate">{ticket.title}</span>
                </CardTitle>
                </CardHeader>
                <CardContent>
                <span className= {clsx(" whitespace-break-spaces",
                    {"line-clamp-3": !isDetail,})}>
                    {ticket.content}
                </span>
                </CardContent>
            </Card>
            <div className="flex flex-col gap-y-1">
                {isDetail ? deleteButton :  detailButton}
            </div>
        </div>
        
    )
}

export default TicketItem;