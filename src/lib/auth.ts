// Supabase authentication helpers for Cloudflare Workers
// This integrates with the existing Cloudflare auth while adding Supabase support

import { createBrowserClient, createServerClient, type SupabaseClient } from "@supabase/ssr";
import { type Database } from "./_types/supabase";

// Create a browser Supabase client for the client-side
export function createBrowserClient() {
  return createBrowserClient<Database>(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_ANON_KEY!
  );
}

// Create a server Supabase client - for use in Server Components/API routes
export function createServerClient() {
  return createServerClient<Database>(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => {
          // In Cloudflare Workers, we need to handle cookies differently
          // This will be called with the request cookies from the framework
          return [];
        },
        setAll: () => {
          // No-op for client-side
        },
      },
    }
  );
}

// Get session from Supabase - works in both browser and server environments
export async function getSession() {
  const supabase = createBrowserClient();
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

// Log out - signs out from Supabase
export async function logout() {
  const supabase = createBrowserClient();
  await supabase.auth.signOut();
  return true;
}

// Authenticate user - checks if user is logged in
export async function authenticate() {
  const session = await getSession();
  return !!session;
}