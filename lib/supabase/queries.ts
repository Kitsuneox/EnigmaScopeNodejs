import { createClient } from '@/lib/supabase/server'
import { Database } from '@/types/database.types'

type Hunt = Database['public']['Tables']['hunts']['Row']
type Enigma = Database['public']['Tables']['enigmas']['Row']
type Thread = Database['public']['Tables']['threads']['Row']
type Post = Database['public']['Tables']['posts']['Row']
type Profile = Database['public']['Tables']['profiles']['Row']

// ============================================
// HUNTS (Chasses au trésor)
// ============================================

export async function getHunts() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('hunts')
    .select('*')
    .eq('is_active', true)
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Hunt[]
}

export async function getHuntBySlug(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('hunts')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) throw error
  return data as Hunt
}

export async function getFeaturedHunts() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('hunts')
    .select('*')
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(3)

  if (error) throw error
  return data as Hunt[]
}

// ============================================
// ENIGMAS (Énigmes)
// ============================================

export async function getEnigmasByHuntSlug(huntSlug: string) {
  const supabase = await createClient()
  
  // D'abord récupérer l'ID de la chasse
  const { data: hunt } = await supabase
    .from('hunts')
    .select('id')
    .eq('slug', huntSlug)
    .single()

  if (!hunt) throw new Error('Hunt not found')

  const { data, error } = await supabase
    .from('enigmas')
    .select('*')
    .eq('hunt_id', hunt.id)
    .eq('is_active', true)
    .order('order_index', { ascending: true })

  if (error) throw error
  return data as Enigma[]
}

export async function getEnigmaBySlug(huntSlug: string, enigmaSlug: string) {
  const supabase = await createClient()
  
  const { data: hunt } = await supabase
    .from('hunts')
    .select('id')
    .eq('slug', huntSlug)
    .single()

  if (!hunt) throw new Error('Hunt not found')

  const { data, error } = await supabase
    .from('enigmas')
    .select('*')
    .eq('hunt_id', hunt.id)
    .eq('slug', enigmaSlug)
    .eq('is_active', true)
    .single()

  if (error) throw error
  return data as Enigma
}

// ============================================
// THREADS (Fils de discussion)
// ============================================

export async function getThreadsByEnigmaId(enigmaId: string, limit = 20) {
  const supabase = await createClient()
  
  const { data, error } = await supabase.rpc('get_threads_paginated', {
    p_enigma_id: enigmaId,
    p_limit: limit,
    p_cursor: null,
  })

  if (error) throw error
  return data
}

export async function getThreadBySlug(
  huntSlug: string,
  enigmaSlug: string,
  threadSlug: string
) {
  const supabase = await createClient()
  
  // Récupérer l'énigme
  const { data: hunt } = await supabase
    .from('hunts')
    .select('id')
    .eq('slug', huntSlug)
    .single()

  if (!hunt) throw new Error('Hunt not found')

  const { data: enigma } = await supabase
    .from('enigmas')
    .select('id')
    .eq('hunt_id', hunt.id)
    .eq('slug', enigmaSlug)
    .single()

  if (!enigma) throw new Error('Enigma not found')

  // Récupérer le thread
  const { data, error } = await supabase
    .from('threads')
    .select(`
      *,
      author:profiles!threads_author_id_fkey(
        id,
        username,
        avatar_url,
        role
      )
    `)
    .eq('enigma_id', enigma.id)
    .eq('slug', threadSlug)
    .eq('is_deleted', false)
    .single()

  if (error) throw error
  return data
}

// ============================================
// POSTS (Messages)
// ============================================

export async function getPostsByThreadId(threadId: string, page = 1, limit = 20) {
  const supabase = await createClient()
  
  const { data, error } = await supabase.rpc('get_posts_paginated', {
    p_thread_id: threadId,
    p_page: page,
    p_limit: limit,
  })

  if (error) throw error
  return data
}

// ============================================
// USER / PROFILE
// ============================================

export async function getCurrentUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}

export async function getCurrentProfile() {
  const supabase = await createClient()
  const user = await getCurrentUser()

  if (!user) return null

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) return null
  return data as Profile
}

export async function isAdmin() {
  const profile = await getCurrentProfile()
  return profile?.role === 'admin' || profile?.role === 'moderator'
}

// ============================================
// SEARCH
// ============================================

export async function searchContent(query: string, limit = 20) {
  const supabase = await createClient()
  
  // Recherche dans les threads
  const { data: threads } = await supabase
    .from('threads')
    .select(`
      id,
      title,
      slug,
      enigma:enigmas!threads_enigma_id_fkey(
        slug,
        hunt:hunts!enigmas_hunt_id_fkey(slug)
      )
    `)
    .textSearch('search_vector', query, {
      type: 'websearch',
      config: 'french',
    })
    .eq('is_deleted', false)
    .limit(limit)

  return threads || []
}

// ============================================
// STATS
// ============================================

export async function getForumStats() {
  const supabase = await createClient()
  
  const [
    { count: huntsCount },
    { count: enigmasCount },
    { count: threadsCount },
    { count: postsCount },
    { count: usersCount },
  ] = await Promise.all([
    supabase.from('hunts').select('*', { count: 'exact', head: true }),
    supabase.from('enigmas').select('*', { count: 'exact', head: true }),
    supabase.from('threads').select('*', { count: 'exact', head: true }).eq('is_deleted', false),
    supabase.from('posts').select('*', { count: 'exact', head: true }).eq('is_deleted', false),
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
  ])

  return {
    hunts: huntsCount || 0,
    enigmas: enigmasCount || 0,
    threads: threadsCount || 0,
    posts: postsCount || 0,
    users: usersCount || 0,
  }
}
