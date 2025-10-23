// app/api/admin/files/route.js

import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase.storage.from('documents').list('', { limit: 100, sortBy: { column: 'created_at', order: 'desc' }})
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(req) {
  const { filename } = await req.json()
  const supabase = await createClient()
  const { error } = await supabase.storage.from('documents').remove([filename])
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}