// types/ticket.ts

import type { Scalars } from "@prisma/orm-postgres/family-contract/types";
import type { Models } from "@/prisma/contract";

export type Ticket = Scalars<Models.public_Ticket>;
export type TicketStatus = Ticket["status"];