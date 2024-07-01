'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useFormState } from 'react-dom';
import { useRef } from 'react';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { todoFormSchema } from '@/lib/form-schemas';
import { onAddTodoAction } from './onAddTodoAction';

export default function AddTodoForm() {
  const [state, formAction] = useFormState(onAddTodoAction, {
    message: '',
  });

  const form = useForm<z.infer<typeof todoFormSchema>>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      name: '',
    },
  });

  return (
    <Form {...form}>
      {state && state?.message !== '' && (
        <div className="text-red-500">{state.message}</div>
      )}
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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>The name of your Todo</FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit">Add Todo</Button>
      </form>
    </Form>
  );
}
