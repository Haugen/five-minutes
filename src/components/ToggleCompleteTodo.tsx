'use client';
import { Toggle } from '@/components/ui/toggle';
import { onCompleteToggleTodo } from '@/utils/form-actions';
import { Check } from 'lucide-react';

export function ToggleCompleteTodo({
  id,
  completed,
}: {
  id: number;
  completed: boolean;
}) {
  const expandedOnCompleteToggleTodo = onCompleteToggleTodo.bind(
    null,
    completed,
    id
  );

  return (
    <Toggle
      pressed={completed}
      onPressedChange={async () => expandedOnCompleteToggleTodo()}
      aria-label="Toggle completed todo"
      className="h-24 w-24"
    >
      <Check width={48} height={48} />
    </Toggle>
  );
}
