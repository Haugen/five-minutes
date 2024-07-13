'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tables } from '@/types/supabase';
import { onActiveToggleTodo, onDeleteTodo } from '@/utils/form-actions';
import { Settings } from 'lucide-react';

export function SettingsMenu({ todo }: { todo: Tables<'todos'> }) {
  const expandedOnActiveToggleTodo = onActiveToggleTodo.bind(
    null,
    todo.active,
    todo.id
  );
  const expandedOnDeleteTodo = onDeleteTodo.bind(null, todo.id);
  const archiveText = todo.active ? 'Archive' : 'Activate';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Settings />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>
          <button onClick={async () => expandedOnActiveToggleTodo()}>
            {archiveText}
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button onClick={async () => expandedOnDeleteTodo()}>Delete</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
