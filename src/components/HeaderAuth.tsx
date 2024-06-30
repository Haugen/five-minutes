import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { Button, buttonVariants } from '@/components/ui/button';

export default async function HeaderAuth() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    'use server';

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect('/');
  };

  return user ? (
    <div className="flex items-center gap-6">
      <Link href="/p">Profile</Link>
      <form action={signOut}>
        <Button variant="default">Logout</Button>
      </form>
    </div>
  ) : (
    <Link href="/login" className={buttonVariants({ variant: 'outline' })}>
      Login
    </Link>
  );
}
