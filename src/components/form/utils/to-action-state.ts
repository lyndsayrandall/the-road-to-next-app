
import * as z from "zod/v4"


export type ActionState = {
    status?: "SUCCESS"| "ERROR";
    message:string;
    payload?: FormData;
    fieldErrors?: Record<string, string[] | undefined>;
    timestamp: number ;
};

export const EMPTY_ACTION_STATE: ActionState = {
    message: "",
    fieldErrors: {},
    timestamp: Date.now(),
};



export const fromErrorToActionState = (
    error: unknown, 
    formData: FormData
): ActionState  => {
    if (error instanceof z.ZodError) {
        // validation error
        console.log( error.flatten().fieldErrors)
        return{
            status: "ERROR",
            message: "",
            fieldErrors: error.flatten().fieldErrors,
            payload: formData,
            timestamp: Date.now(),
        };
    } else if (error instanceof Error) {
        // another type of error
        return {
            status: "ERROR",
            message: error.message,
            fieldErrors: {},
            payload: formData,
            timestamp: Date.now(),
        };  

    } else {
        // generic unnown error
        return { 
        status: "ERROR",
        message: "An Unknown error occured.",
        fieldErrors: {}, 
        payload: formData,
        timestamp: Date.now(), };
    }
};

export const toActionState= (
    status:ActionState["status"],
    message: string): ActionState =>{
    return({
        status,
        message,
        fieldErrors:{ },
        timestamp: Date.now(),
    });
};