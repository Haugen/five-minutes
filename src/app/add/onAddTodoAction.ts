'use server';
import { todoFormSchema } from '@/lib/form-schemas';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

type FormState = {
  message: string;
};

export async function onAddTodoAction(
  _: FormState,
  formData: FormData
): Promise<FormState> {
  const data = Object.fromEntries(formData);
  const parsed = todoFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: 'Invalid form data',
    };
  }

  const todoName = formData.get('name') as string;
  const supabase = createClient();

  const { error } = await supabase
    .from('todos')
    .insert({ name: todoName, active: true });

  console.log(error);

  if (error) {
    return {
      message: 'Could not add Todo',
    };
  }

  return redirect('/add');
}
