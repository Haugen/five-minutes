import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import TodoList from '@/components/TodoList';

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <h1>Let's go!</h1>
      {user && <Link href="/add">Add a todo</Link>}
      {user && <TodoList user={user} />}
    </div>
  );
}
