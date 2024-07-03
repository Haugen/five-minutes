'use server';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';

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
