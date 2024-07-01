import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/supabase';

let browserClient: ReturnType<typeof createBrowserClient<Database>>;

export const createClient = () => {
  if (browserClient) {
    return browserClient;
  }

  browserClient = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return browserClient;
};
