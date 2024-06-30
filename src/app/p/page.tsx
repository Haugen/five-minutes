import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function ProfilePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/');
  }

  return (
    <div>
      <h2>Profile page</h2>

      <p>Email</p>
      <p>{user.email}</p>
    </div>
  );
}
