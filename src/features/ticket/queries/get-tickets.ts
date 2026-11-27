

// import { initialTickets } from "@/data";
// import { Ticket } from "../types";

// export const getTickets = async ():Promise<Ticket[]> => {

//     await new Promise((resolve) => setTimeout(resolve, 8000));

//     return new Promise((resolve) => {

//         resolve(initialTickets);
//     });
// };


import { getDb } from "@/prisma/db"; // Adjust path to where getDb is exported

export const getTickets = async () => {
  const db = await getDb();

  const roleDb =  db.asServiceRole(); // Or db.asAnon() / db.asUser(jwt)

  return await roleDb.orm.public.Ticket
    .orderBy((t) => t.createdAt.desc())
    .all();
};