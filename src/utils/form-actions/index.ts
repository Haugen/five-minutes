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

  const { data: addedTodo, error } = await supabase
    .from('todos')
    .insert({ name: todoName, active: true })
    .select('name');

  if (error && !addedTodo) {
    console.error('Error in onAddTodoAction:', error?.message);
    return {
      error: 'Could not add Todo',
    };
  }

  revalidatePath('/');

  return {
    successMessage: `Your Todo "${addedTodo[0].name}" was created!`,
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

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Error in onLoginAction:', error?.message);
    return {
      error: 'Could not authenticate',
      email: formData.get('email') as string,
    };
  }

  return redirect('/');
}

export const onDeleteTodo = async (todoId: number) => {
  const supabase = createClient();

  try {
    await supabase.from('todos').delete().eq('id', todoId);
    revalidatePath('/p');
  } catch (e) {
    console.error('Error in onDeleteTodo:', e);
  }
};

export const onActiveToggleTodo = async (active: boolean, todoId: number) => {
  const supabase = createClient();

  try {
    await supabase
      .from('todos')
      .update({ active: !active, completed: false })
      .eq('id', todoId);
    revalidatePath('/p');
  } catch (e) {
    console.error('Error in onActiveToggleTodo:', e);
  }
};

export const onCompleteToggleTodo = async (
  completed: boolean,
  todoId: number
) => {
  const supabase = createClient();

  try {
    await supabase
      .from('todos')
      .update({ completed: !completed })
      .eq('id', todoId);
    revalidatePath('/');
  } catch (e) {
    console.error('Error in onCompleteToggleTodo:', e);
  }
};
