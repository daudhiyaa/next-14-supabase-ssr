'use server';

import { unstable_noStore as noStore } from 'next/cache';
import createSupabaseServerClient from '../supabase/server';

export default async function readUserSession() {
  noStore();
  const supabase = await createSupabaseServerClient();
  return supabase.auth.getSession();
}
