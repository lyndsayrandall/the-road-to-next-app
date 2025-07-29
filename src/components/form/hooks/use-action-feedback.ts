

import { useEffect, useRef } from "react";
import { ActionState } from "../utils/to-action-state";

type OnArgs = {
    actionState: ActionState ; 
}

type UseActionFeedBackOptions = {
    onSuccess: (onArgs : OnArgs) => void;  
    onError: (onArgs: OnArgs) => void;
};

const useActionFeedBack = (
    actionState : ActionState,
    options : UseActionFeedBackOptions
) =>{

    const prevTimestamp = useRef(actionState.timestamp);
    const isUpdate = prevTimestamp.current !== actionState.timestamp;

    useEffect(() => {
        if (!isUpdate) return;

        if( actionState.status === "SUCCESS") {
            options.onSuccess?.( {actionState} );
        }
        if( actionState.status === "ERROR") {
            options.onError?.( {actionState} );
        };
        prevTimestamp.current = actionState.timestamp;
        
    },[isUpdate,actionState, options]);
};

export {useActionFeedBack};