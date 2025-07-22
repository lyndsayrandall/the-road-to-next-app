"use server"


import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod/v4"; 
import { setCookieByKey } from "@/actions/cookies";
import { 
    ActionState, 
    fromErrorToActionState, 
    toActionState
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketPath,ticketsPath } from "@/paths";
import { toCent } from "@/utils/currency";

const upsertTicketSchema = z.object({
    title: z
        .string()
        .refine((val) => val.trim() !== "", {
            message: "All whitespaces are not allowed!"
        })
        .min(3, "Title minimum is 3 characters.")
        .max(255, "Title must be less than 255 characters"),
    content: z
        .string()
        .refine((val) => val.trim() !== "", {
            message: "All whitespaces are not allowed!"
        })
        .nonempty({message: "Content is required!"})
        .min(10, "Content requires a minimum of 10 characters")
        .max(1024, "Content must be less than 1024 characters"),
    deadline: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, {
            message: "Is required." }),
    bounty: z
        .coerce.number().positive(),

        
})

export const upsertTicket = async (
        id:string | undefined, 
        _actionState: ActionState ,
        formData : FormData
    ) =>{
        try {
            const data = upsertTicketSchema.parse({
                    title: formData.get("title") ,
                    content: formData.get("content") ,
                    deadline: formData.get("deadline") ,
                    bounty: formData.get("bounty")
                });

            const dbData ={
                ...data,
                bounty: toCent(data.bounty) // Convert to cents  
            }

            await prisma.ticket.upsert({
                where: {
                    id:id || "",
                },
                update: dbData,
                create: dbData,
            });
        } catch (error) {
            return fromErrorToActionState(error, formData);


        }

    revalidatePath(ticketsPath());

    if(id) {
        await setCookieByKey("toast", "Ticket Updated");
        redirect(ticketPath(id));
    }

    return(
        toActionState(
            "SUCCESS",
            "Ticket successfully created."      
        )

    );
}