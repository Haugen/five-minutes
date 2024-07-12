'use client';
import { Toggle } from '@/components/ui/toggle';
import { createClient } from '@/utils/supabase/client';
import { Check } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';

const supabase = createClient();

const onToggle = async (
  pressed: boolean,
  id: number,
  setCompletedState: Dispatch<SetStateAction<boolean>>
) => {
  const { error } = await supabase
    .from('todos')
    .update({ completed: !pressed })
    .eq('id', id);

  if (!error) {
    setCompletedState(!pressed);
  }
};

export function ToggleCompleteTodo({
  id,
  completed,
}: {
  id: number;
  completed: boolean;
}) {
  const [completedState, setCompletedState] = useState<boolean>(completed);

  return (
    <Toggle
      pressed={completedState}
      onPressedChange={() => onToggle(completedState, id, setCompletedState)}
      aria-label="Toggle completed todo"
      className="h-24 w-24"
    >
      <Check width={48} height={48} />
    </Toggle>
  );
}
