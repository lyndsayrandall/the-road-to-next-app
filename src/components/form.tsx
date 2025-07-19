import { toast } from "sonner";
import { useActionFeedBackHook } from "./form/hooks/use-action-feedback";
import { ActionState } from "./form/utils/to-action-state";


type FormProps = {
    action: (payload: FormData) => void;
    actionState: ActionState;
    children: React.ReactNode;
}

const Form = ({action , actionState, children}: FormProps) =>{

    useActionFeedBackHook(
    actionState ,{
        onSuccess: ( {actionState} ) =>{
            if(actionState.message){
                toast.success(actionState.message)      
            }
            
        },
        onError: ( {actionState} ) => {
            if(actionState.message){
                toast.error(actionState.message)
            }
        },
    }); 

    return(
        <form action={action} className="flex flex-col gap-y-2">
            {children}
        </form>     
    );
};

export { Form };
