import { createClient } from '@/utils/supabase/server';
import { User } from '@supabase/supabase-js';

type Props = {
  user: User;
};

export default async function TodoList({ user }: Props) {
  const supabase = createClient();

  const todos = await supabase.from('todos').select('*').eq('user_id', user.id);

  return (
    <div className="mt-10">
      <h2>Todos</h2>
      {todos.data?.map((todo) => {
        return <p>{todo.name}</p>;
      })}
    </div>
  );
}
