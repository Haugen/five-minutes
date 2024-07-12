'use client';
import { Button } from './ui/button';
import { onDeleteTodo } from '@/utils/form-actions';
import { useFormStatus } from 'react-dom';

type Props = {
  id: number;
};

export default function TodoListDeleteButton({ id }: Props) {
  return (
    <form action={onDeleteTodo}>
      <input type="hidden" name="todoId" value={id} />
      <DeleteButton />
    </form>
  );
}

// Example on useFormStatus. Component needs to be inside a form with a form action.
// Once done, we can use the formStatus to checks for things like "pending" state.
const DeleteButton = () => {
  const formStatus = useFormStatus();

  let text = 'Delete';
  if (formStatus.pending) {
    text = 'Pending';
  }
  return (
    <Button variant="destructive" type="submit">
      {text}
    </Button>
  );
};
