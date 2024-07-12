import { createClient } from '@/utils/supabase/server';
import { User } from '@supabase/supabase-js';
import { ToggleCompleteTodo } from './ToggleCompleteTodo';

type Props = {
  user: User;
};

export default async function TodoList({ user }: Props) {
  const supabase = createClient();
  const todos = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true });

  return (
    <div className="mt-10">
      <h2>Todos</h2>
      {todos.data?.map((todo, i) => {
        return (
          <div
            key={i}
            className="flex items-center gap-4 py-3 border-b last:border-none"
          >
            <ToggleCompleteTodo id={todo.id} completed={todo.completed} />
            <h3 className="text-3xl">{todo.name}</h3>
          </div>
        );
      })}
    </div>
  );
}
