'use server';

import createSupabaseServerClient from '@/lib/supabase/server';

export async function signUpWithEmailAndPassword(data: {
  email: string;
  password: string;
  confirm: string;
}) {
  const supabase = await createSupabaseServerClient();
  const res = await supabase.auth.signUp({
    email: data.email,
    password: data.password
  });
  return JSON.stringify(res);
}

export async function signInWithEmailAndPassword(data: {
  email: string;
  password: string;
}) {
  const supabase = await createSupabaseServerClient();
  const res = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password
  });
  return JSON.stringify(res);
}
