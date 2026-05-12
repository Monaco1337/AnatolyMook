import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

const hasSupabase = Boolean(supabaseUrl && supabaseAnonKey);

function createMockSupabase(): SupabaseClient {
  const noSession = { data: { session: null }, error: null };
  const emptyData = { data: [], error: null };
  const emptySingle = { data: null, error: null };

  const chain: any = {};
  const chainMethods = [
    'select', 'insert', 'update', 'upsert', 'delete',
    'eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'like', 'ilike',
    'in', 'is', 'contains', 'match', 'or', 'not',
    'order', 'limit', 'range',
  ];
  for (const m of chainMethods) chain[m] = () => chain;
  chain.single = () => Promise.resolve(emptySingle);
  chain.maybeSingle = () => Promise.resolve(emptySingle);
  chain.then = (resolve: (v: { data: unknown[]; error: null }) => void) =>
    Promise.resolve(emptyData).then(resolve);
  chain.catch = (fn: (e: unknown) => void) => Promise.resolve(emptyData).catch(fn);

  const from = () => chain;

  const mockChannel: any = {
    on: () => mockChannel,
    subscribe: () => mockChannel,
    unsubscribe: () => Promise.resolve('ok'),
  };

  const mockStorageBucket: any = {
    upload: () => Promise.resolve({ data: null, error: { message: 'Supabase nicht konfiguriert' } }),
    download: () => Promise.resolve({ data: null, error: { message: 'Supabase nicht konfiguriert' } }),
    remove: () => Promise.resolve({ data: null, error: { message: 'Supabase nicht konfiguriert' } }),
    list: () => Promise.resolve({ data: [], error: null }),
    getPublicUrl: (p: string) => ({ data: { publicUrl: p } }),
    createSignedUrl: () => Promise.resolve({ data: null, error: { message: 'Supabase nicht konfiguriert' } }),
  };

  const mock = {
    auth: {
      getSession: () => Promise.resolve(noSession),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: () => {} } },
      }),
      signInWithPassword: () =>
        Promise.resolve({
          data: { session: null, user: null },
          error: { message: 'Supabase nicht konfiguriert' },
        }),
      signOut: () => Promise.resolve({ error: null }),
    },
    from,
    channel: () => mockChannel,
    removeChannel: () => Promise.resolve('ok'),
    removeAllChannels: () => Promise.resolve(['ok']),
    getChannels: () => [],
    storage: { from: () => mockStorageBucket },
    rpc: () => Promise.resolve({ data: null, error: null }),
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
