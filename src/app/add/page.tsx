import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import AddTodoForm from './AddTodoForm';

export default async function ProfilePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/');
  }

  return (
    <div className="sm:max-w-md mx-auto">
      <h1>Add new Todo</h1>
      <AddTodoForm />
    </div>
  );
}
