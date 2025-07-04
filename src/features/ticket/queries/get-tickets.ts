
import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

export const getTickets = async () => {
  return await prisma.ticket.findMany({
    orderBy:{
      createdAt: "desc",
    }
  });
};


// export async function getTickets() {
//       try {
//         const userCount = await prisma.user.count(); // Replace 'user' with an existing table
//         return NextResponse.json({ message: `Database connected. User count: ${userCount}` });
//       } catch (error) {
//         console.error("Database connection error:", error);
//         return NextResponse.json({ error: "Failed to connect to database" }, { status: 500 });
//       }
//     }