import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  return (
    <div>
      <h2>This is a protected route. You need to be logged in to get here</h2>
    </div>
  );
}
