import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

const hasSupabase = Boolean(supabaseUrl && supabaseAnonKey);

function createMockSupabase(): SupabaseClient {
  const noSession = { data: { session: null }, error: null };
  const emptyData = { data: [], error: null };
  const emptySingle = { data: null, error: null };
  const chain = {
    select: () => chain,
    eq: () => chain,
    order: () => chain,
    limit: () => chain,
    maybeSingle: () => Promise.resolve(emptySingle),
    then: (resolve: (v: { data: unknown[]; error: null }) => void) => Promise.resolve(emptyData).then(resolve),
    catch: (fn: (e: unknown) => void) => Promise.resolve(emptyData).catch(fn),
  };
  const from = () => chain;
  const mock = {
    auth: {
      getSession: () => Promise.resolve(noSession),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: () => {} } },
      }),
      signInWithPassword: () => Promise.resolve({ data: { session: null, user: null }, error: { message: 'Supabase nicht konfiguriert' } }),
    },
    from,
  } as unknown as SupabaseClient;
  return mock;
}

export const supabase: SupabaseClient = hasSupabase
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : createMockSupabase();
