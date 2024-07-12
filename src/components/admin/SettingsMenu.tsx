import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Settings } from 'lucide-react';

export function SettingsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Settings />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Archive</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
