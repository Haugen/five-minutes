import { createClient } from '@/utils/supabase/server';
import TodoList from '@/components/TodoList';
import AddTodoDialog from '@/components/AddTodoDialog';

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <h1>Let's go!</h1>
      {user && (
        <div>
          <AddTodoDialog />
        </div>
      )}
      {user && <TodoList user={user} />}
    </div>
  );
}
