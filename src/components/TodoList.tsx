import { createClient } from '@/utils/supabase/server';
import { User } from '@supabase/supabase-js';
import { Button } from './ui/button';

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
        return (
          <div className="flex justify-between items-center py-3 border-b last:border-none">
            <h3 className="text-xl">{todo.name}</h3>
            <Button variant="destructive">Delete</Button>
          </div>
        );
      })}
    </div>
  );
}
