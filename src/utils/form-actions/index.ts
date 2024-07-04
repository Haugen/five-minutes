'use server';
import { redirect } from 'next/navigation';
import { todoFormSchema, loginFormSchema } from '@/lib/form-schemas';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

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

export async function onLoginAction(
  _: FormState,
  formData: FormData
): Promise<FormState & { email?: string }> {
  const data = Object.fromEntries(formData);
  const parsed = loginFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      error: 'Invalid form data',
      email: formData.get('email') as string,
    };
  }

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();

  const { data: user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error?.message);
    return {
      error: 'Could not authenticate',
      email: formData.get('email') as string,
    };
  }

  console.log(user);

  return redirect('/');
}

export const onDeleteTodo = async (formData: FormData) => {
  const supabase = createClient();
  const todoId = formData.get('todoId') as string;

  try {
    await supabase.from('todos').delete().eq('id', todoId);
    revalidatePath('/');
  } catch (e) {
    console.error('Failed to delete todo in TodoList', e);
  }
};
