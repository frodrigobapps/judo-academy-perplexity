// lib/auth.js

import { createServerClient } from '@supabase/ssr'

export async function getUserAndProfile(req) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: req.cookies }
  )
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { user: null, profile: null }
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
  return { user, profile }
}

export async function isAdmin(req) {
  const { user, profile } = await getUserAndProfile(req)
  return profile?.role === 'admin'
}