"use client";





import React, { 
  cloneElement,
  useActionState,
  useState
 } from "react";
import { Form } from "@/components/form/form";
import {
  AlertDialog,
  // AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  // AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { SubmitButton } from "./form/submit-button";
import { ActionState,EMPTY_ACTION_STATE } from "./form/utils/to-action-state";

type useConfirmDialogProps = {
  title?: string;
  description?: string;
  action: () => Promise<ActionState>;
  trigger: React.ReactElement<{ onClick?: React.MouseEventHandler }>;
};

const useConfirmDialog = ({
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. Make sure you understand the consequences.",
  action,
  trigger,
}: useConfirmDialogProps) => {

  const[isOpen, setIsOpen] = useState(false);
    

  const dialogTrigger = cloneElement(
    trigger,
    {
      onClick: (event: React.MouseEvent) => {
        console.log(event);
        setIsOpen((state) => !state);
      },
    }
  );

    const [actionState, formAction] = useActionState(action, EMPTY_ACTION_STATE);

  const handleSuccess = () => {
    setIsOpen(false);
  };

  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen} >
      
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* <AlertDialogAction asChild={true}> */}
           <Form
              action={formAction}
              actionState={actionState}
              onSuccess={handleSuccess}
            >
              <SubmitButton label="Confirm" />
            </Form>
          {/* </AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
  return (
    [dialogTrigger, dialog] 
  );
};

export { useConfirmDialog };