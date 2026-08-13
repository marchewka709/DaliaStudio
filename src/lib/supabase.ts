// Supabase client configuration for TanStack Start + Cloudflare Workers
// This provides both browser and server-side Supabase clients

import { createBrowserClient, createServerClient, type SupabaseClient } from "@supabase/ssr";
import { Database } from "./_types/supabase";

// Browser client - used on the client side
export const supabase = createBrowserClient<Database>(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

// Server client - used in Server Components and API routes
// In Cloudflare Workers environment, cookies need special handling
export function createServerClient() {
  return createServerClient<Database>(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => {
          // Return empty array for now - will be populated by the framework
          return [];
        },
        setAll: () => {
          // No-op - cookies handled by framework
        },
      },
    }
  );
}

// Simple session getter that works in both environments
export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

// Sign out user
export async function signOut() {
  await supabase.auth.signOut();
  return true;
}