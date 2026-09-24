import type { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";

interface DeletePointDialogProps {
  /** The delete button that opens the dialog. */
  children: ReactNode;
  onConfirm: () => void;
}

/** Deleting cannot be undone, so both delete buttons (list and popup) ask first. */
export function DeletePointDialog({
  children,
  onConfirm,
}: DeletePointDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Видалити точку?</AlertDialogTitle>
          <AlertDialogDescription>
            Цю дію не можна скасувати.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Скасувати</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onConfirm}>
            Видалити
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
