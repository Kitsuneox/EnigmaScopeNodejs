'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/supabase/queries'

export async function createThread(formData: FormData) {
  const supabase = await createClient()
  const user = await getCurrentUser()

  if (!user) {
    return { error: 'Vous devez être connecté pour créer un thread' }
  }

  const enigmaId = formData.get('enigma_id') as string
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  if (!title || title.length < 5) {
    return { error: 'Le titre doit contenir au moins 5 caractères' }
  }

  if (!content || content.length < 1) {
    return { error: 'Le contenu ne peut pas être vide' }
  }

  // Générer un slug unique
  const { data: slugData, error: slugError } = await supabase.rpc(
    'generate_unique_slug',
    {
      base_text: title,
      table_name: 'threads',
    }
  )

  if (slugError) {
    return { error: 'Erreur lors de la génération du slug' }
  }

  // Créer le thread
  const { data: thread, error: threadError } = await supabase
    .from('threads')
    .insert({
      enigma_id: enigmaId,
      author_id: user.id,
      title,
      slug: slugData,
    })
    .select()
    .single()

  if (threadError) {
    return { error: 'Erreur lors de la création du thread' }
  }

  // Créer le premier post
  const { error: postError } = await supabase.from('posts').insert({
    thread_id: thread.id,
    author_id: user.id,
    content,
    content_html: `<p>${content}</p>`, // À améliorer avec un vrai parser markdown
  })

  if (postError) {
    // Supprimer le thread si le post échoue
    await supabase.from('threads').delete().eq('id', thread.id)
    return { error: 'Erreur lors de la création du premier message' }
  }

  revalidatePath('/forum')
  return { success: true, threadId: thread.id, slug: thread.slug }
}

export async function updateThread(threadId: string, formData: FormData) {
  const supabase = await createClient()
  const user = await getCurrentUser()

  if (!user) {
    return { error: 'Vous devez être connecté' }
  }

  // Vérifier que l'utilisateur est l'auteur ou un modérateur
  const { data: thread } = await supabase
    .from('threads')
    .select('author_id')
    .eq('id', threadId)
    .single()

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (
    thread?.author_id !== user.id &&
    profile?.role !== 'admin' &&
    profile?.role !== 'moderator'
  ) {
    return { error: 'Vous n\'avez pas la permission de modifier ce thread' }
  }

  const title = formData.get('title') as string
  const isPinned = formData.get('is_pinned') === 'true'
  const isLocked = formData.get('is_locked') === 'true'

  const { error } = await supabase
    .from('threads')
    .update({
      title,
      is_pinned: isPinned,
      is_locked: isLocked,
    })
    .eq('id', threadId)

  if (error) {
    return { error: 'Erreur lors de la mise à jour du thread' }
  }

  revalidatePath('/forum')
  return { success: true }
}

export async function deleteThread(threadId: string) {
  const supabase = await createClient()
  const user = await getCurrentUser()

  if (!user) {
    return { error: 'Vous devez être connecté' }
  }

  // Vérifier les permissions
  const { data: thread } = await supabase
    .from('threads')
    .select('author_id')
    .eq('id', threadId)
    .single()

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (
    thread?.author_id !== user.id &&
    profile?.role !== 'admin' &&
    profile?.role !== 'moderator'
  ) {
    return { error: 'Vous n\'avez pas la permission de supprimer ce thread' }
  }

  // Soft delete
  const { error } = await supabase
    .from('threads')
    .update({ is_deleted: true })
    .eq('id', threadId)

  if (error) {
    return { error: 'Erreur lors de la suppression du thread' }
  }

  revalidatePath('/forum')
  return { success: true }
}

export async function toggleThreadPin(threadId: string) {
  const supabase = await createClient()
  const user = await getCurrentUser()

  if (!user) {
    return { error: 'Vous devez être connecté' }
  }

  // Vérifier que l'utilisateur est modérateur/admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin' && profile?.role !== 'moderator') {
    return { error: 'Vous devez être modérateur pour épingler un thread' }
  }

  // Récupérer l'état actuel
  const { data: thread } = await supabase
    .from('threads')
    .select('is_pinned')
    .eq('id', threadId)
    .single()

  if (!thread) {
    return { error: 'Thread non trouvé' }
  }

  // Inverser l'état
  const { error } = await supabase
    .from('threads')
    .update({ is_pinned: !thread.is_pinned })
    .eq('id', threadId)

  if (error) {
    return { error: 'Erreur lors de l\'épinglage' }
  }

  revalidatePath('/forum')
  return { success: true, isPinned: !thread.is_pinned }
}

export async function toggleThreadLock(threadId: string) {
  const supabase = await createClient()
  const user = await getCurrentUser()

  if (!user) {
    return { error: 'Vous devez être connecté' }
  }

  // Vérifier que l'utilisateur est modérateur/admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin' && profile?.role !== 'moderator') {
    return { error: 'Vous devez être modérateur pour verrouiller un thread' }
  }

  // Récupérer l'état actuel
  const { data: thread } = await supabase
    .from('threads')
    .select('is_locked')
    .eq('id', threadId)
    .single()

  if (!thread) {
    return { error: 'Thread non trouvé' }
  }

  // Inverser l'état
  const { error } = await supabase
    .from('threads')
    .update({ is_locked: !thread.is_locked })
    .eq('id', threadId)

  if (error) {
    return { error: 'Erreur lors du verrouillage' }
  }

  revalidatePath('/forum')
  return { success: true, isLocked: !thread.is_locked }
}
