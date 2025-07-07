"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

    export const createTicket = async (formData : FormData) =>{
        
        const data = {
            title: formData.get("title"),
            content: formData.get("content"),
        };
        console.log("Creating ticket with data:", data);

        await prisma.ticket.create({
           data:{
            title: formData.get("title") as string,
            content: formData.get("content") as string,
           } ,
        });

        revalidatePath(ticketsPath());

        
    };
