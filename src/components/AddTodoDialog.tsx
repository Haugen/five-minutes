import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import AddTodoForm from './AddTodoForm';

export default async function AddTodoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Let's add a Todo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Let's add a Todo</DialogTitle>
          <DialogDescription>
            Name your new Todo below, and click "Add Todo". It'll automatically
            be included in your active Todos.
          </DialogDescription>
        </DialogHeader>
        <AddTodoForm />
      </DialogContent>
    </Dialog>
  );
}
