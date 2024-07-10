'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useFormState } from 'react-dom';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { todoFormSchema } from '@/lib/form-schemas';
import { onAddTodoAction } from '@/utils/form-actions';

export default function AddTodoForm() {
  const [state, formAction] = useFormState(onAddTodoAction, {});

  const form = useForm<z.infer<typeof todoFormSchema>>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      name: '',
    },
  });

  return (
    <>
      {state?.error !== '' && <div className="text-red-500">{state.error}</div>}
      <Form {...form}>
        <form
          className="space-y-8"
          action={formAction}
          onSubmit={(e) => {
            e.preventDefault();
            const formElement = e.target as HTMLFormElement;
            form.handleSubmit(() => formAction(new FormData(formElement)))(e);
          }}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>The name of your Todo</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add Todo</Button>
        </form>
      </Form>
      {state?.successMessage !== '' && (
        <div className="text-green-500">{state.successMessage}</div>
      )}
    </>
  );
}
