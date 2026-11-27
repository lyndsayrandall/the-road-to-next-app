
import type {Route} from "next";

 

export const homePath = () : Route =>
    "/";

export const ticketsPath = () : Route =>
    "/tickets";

export const ticketPath = (ticketId: number) : Route =>
    `/tickets/${ticketId}`  as Route;// note the agave is used here as variable loaded