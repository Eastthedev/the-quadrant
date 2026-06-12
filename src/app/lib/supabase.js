import { createClient } from '@supabase/supabase-js'

let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co'
if (supabaseUrl === 'your_supabase_project_url' || !supabaseUrl.startsWith('http')) {
  supabaseUrl = 'https://placeholder-project.supabase.co'
}
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

