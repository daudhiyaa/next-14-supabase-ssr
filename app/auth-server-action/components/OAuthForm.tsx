'use client';

import { Button } from '@/components/ui/button';
import { createBrowserClient } from '@supabase/ssr';
import React from 'react';

export default function OAuthForm() {
  const loginWithGithub = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${location.origin}/auth-server-action/callback` }
    });
    if (error) {
      console.error(error);
    }
  };

  return (
    <Button className='w-full' onClick={loginWithGithub}>
      Continue With Github
    </Button>
  );
}
