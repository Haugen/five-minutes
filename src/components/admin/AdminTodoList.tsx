import { Tables } from '@/types/supabase';
import { createClient } from '@/utils/supabase/server';
import { User } from '@supabase/supabase-js';
import { SettingsMenu } from './SettingsMenu';

export default async function AdminTodoList({ user }: { user: User }) {
  const supabase = createClient();
  const todos = await supabase.from('todos').select('*').eq('user_id', user.id);

  return (
    <div className="mt-10">
      <h2>Active Todos</h2>
      {todos.data?.map((todo, i) => {
        if (!todo.active) {
          return null;
        }

        return <Todo todo={todo} key={i} />;
      })}

      <h2 className="mt-10">Archived Todos</h2>
      {todos.data?.map((todo, i) => {
        if (todo.active) {
          return null;
        }

        return <Todo todo={todo} key={i} />;
      })}
    </div>
  );
}

function Todo({ todo }: { todo: Tables<'todos'> }) {
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-none">
      <div>
        <h3 className="text-xl mb-2">{todo.name}</h3>
        <div className="flex gap-2 text-sm items-center">
          <span>
            Created at{' '}
            {new Intl.DateTimeFormat('en-US').format(new Date(todo.created_at))}
          </span>
          <span className="bg-green-100 px-2 py-1 rounded-sm">active</span>
        </div>
      </div>
      <div>
        <SettingsMenu todo={todo} />
      </div>
    </div>
  );
}
