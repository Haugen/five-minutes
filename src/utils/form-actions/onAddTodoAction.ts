'use server';
import { todoFormSchema } from '@/lib/form-schemas';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type FormState = {
  successMessage?: string;
  error?: string;
};

export async function onAddTodoAction(
  _: FormState,
  formData: FormData
): Promise<FormState> {
  const data = Object.fromEntries(formData);
  const parsed = todoFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      error: 'Invalid form data',
    };
  }

  const todoName = formData.get('name') as string;
  const supabase = createClient();

  const { error } = await supabase
    .from('todos')
    .insert({ name: todoName, active: true });

  if (error) {
    console.error(error);
    return {
      error: 'Could not add Todo',
    };
  }

  revalidatePath('/');

  return {
    successMessage: 'Your Todo was added!',
  };
}
