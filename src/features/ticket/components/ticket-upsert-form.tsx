"use client";

import { Ticket } from "@prisma/client";
import { useActionState} from "react";
import { Form } from "@/components/form";
import { FieldError } from "@/components/form/field-error";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fromCent } from "@/utils/currency";
import { upsertTicket } from "../actions/upsert-ticket";
import { DatePicker } from "@/components/date-picker";




type TicketUpsertFormProps = {
    ticket?: Ticket ;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {

    const[actionState,  action ] = useActionState(
        upsertTicket.bind(null,ticket?.id),
        EMPTY_ACTION_STATE
    );    
    
    return (
        <Form action ={action} actionState={actionState}>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" 
                   type="text" defaultValue = {
                    (actionState.payload?.get("title") as string) ?? ticket?.title
                }></Input>
            <FieldError actionState={actionState} name="title" />   

            <Label htmlFor="content">Content</Label>
            <Textarea id="content" name="content" 
                      defaultValue = {
                        (actionState.payload?.get("content") as string) ??ticket?.content
                }/>
            <FieldError actionState={actionState} name="content" />
            <SubmitButton label={ticket?"Edit" : "Create"} />
            
            <div className="flex gap-x-2 mb-10">
                <div className="w-1/2">
                    <Label htmlFor="deadline">Deadline</Label>
                    {/* <Input  id="deadline" 
                            name="deadline" 
                            type= "date"
                            defaultValue = {
                                (actionState.payload?.get("deadline") as string) ?? ticket?.deadline
                            }></Input> */}
                    <DatePicker 
                        id="deadline"
                        name="deadline"
                        defaultValue={
                            (actionState.payload?.get("deadline") as string) ?? 
                            ticket?.deadline
                        }
                             
                    />
                    <FieldError actionState={actionState} name="deadline" />
                </div> 
                <div  className="w-1/2">
                    <Label htmlFor="bounty">Bounty ($)</Label>
                    <Input id="bounty" name="bounty" 
                        type="number" 
                        step= "0.01"
                        min="0"
                        defaultValue = {
                            (actionState.payload?.get("bounty") as string) ?? 
                            (ticket?.bounty ? fromCent(ticket?.bounty) : "")
                        }></Input>
                    <FieldError actionState={actionState} name="bounty" /> 
                </div>
            </div>
        </Form>

    );
    
};

export {TicketUpsertForm} ;