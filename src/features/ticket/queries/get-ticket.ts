

// import { initialTickets } from "@/data";
// import { Ticket } from "../types";




// export const getTicket = async (id:string): Promise<Ticket | null> =>{


//     await new Promise((resolve) => setTimeout(resolve,2000));

//     const maybeTicket = initialTickets.find((ticket) => ticket.id === id);

//     return new Promise((resolve) => {
//         resolve(maybeTicket || null);
//     });


// };

import { getDb } from "@/prisma/db"; // Adjust path to where getDb is exported

export const getTicket = async (id: number) => {

    const db = await getDb();

    const roleDb =  db.asServiceRole(); // Or db.asAnon() / db.asUser(jwt)
    return await roleDb.orm.public.Ticket.whereUnique({ id   }).first();
};