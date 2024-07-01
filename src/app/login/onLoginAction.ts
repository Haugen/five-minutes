'use server';
import { loginFormSchema } from '@/lib/form-schemas';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

type FormState = {
  message: string;
  email?: string;
};

export async function onLoginAction(
  _: FormState,
  formData: FormData
): Promise<FormState> {
  const data = Object.fromEntries(formData);
  const parsed = loginFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: 'Invalid form data',
      email: formData.get('email') as string,
    };
  }

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    return {
      message: 'Could not authenticate',
      email: formData.get('email') as string,
    };
  }

  return redirect('/');
}
