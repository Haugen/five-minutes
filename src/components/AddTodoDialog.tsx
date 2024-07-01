import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { X } from 'react-feather';
import { Button } from './ui/button';
import AddTodoForm from './AddTodoForm';

export default async function AddTodoDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Add Todo</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold mb-0">Let's add a Todo</h2>
            <AlertDialogCancel className="rounded-full p-0 w-10 h-10">
              <X />
            </AlertDialogCancel>
          </div>
          <AlertDialogDescription>
            Name your new Todo below, and click "Add Todo". It'll automatically
            be included in your active Todos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AddTodoForm />
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
