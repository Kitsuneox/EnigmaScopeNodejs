'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/supabase/queries'

export async function createPost(formData: FormData) {
  const supabase = await createClient()
  const user = await getCurrentUser()

  if (!user) {
    return { error: 'Vous devez être connecté pour poster' }
  }

  const threadId = formData.get('thread_id') as string
  const content = formData.get('content') as string
  const parentPostId = formData.get('parent_post_id') as string | null

  if (!content || content.length < 1) {
    return { error: 'Le contenu ne peut pas être vide' }
  }

  if (content.length > 10000) {
    return { error: 'Le contenu est trop long (max 10000 caractères)' }
  }

  // Vérifier que le thread n'est pas verrouillé
  const { data: thread } = await supabase
    .from('threads')
    .select('is_locked')
    .eq('id', threadId)
    .single()

  if (thread?.is_locked) {
    return { error: 'Ce thread est verrouillé' }
  }

  // Créer le post
  const { data: post, error } = await supabase
    .from('posts')
    .insert({
      thread_id: threadId,
      author_id: user.id,
      content,
      content_html: `<p>${content}</p>`, // À améliorer avec markdown
      parent_post_id: parentPostId || null,
    })
    .select()
    .single()

  if (error) {
    return { error: 'Erreur lors de la création du post' }
  }

  revalidatePath('/forum')
  return { success: true, postId: post.id }
}

export async function updatePost(postId: string, formData: FormData) {
  const supabase = await createClient()
  const user = await getCurrentUser()

  if (!user) {
    return { error: 'Vous devez être connecté' }
  }

  const content = formData.get('content') as string
  const editReason = formData.get('edit_reason') as string | null

  if (!content || content.length < 1) {
    return { error: 'Le contenu ne peut pas être vide' }
  }

  // Vérifier que l'utilisateur est l'auteur
  const { data: post } = await supabase
    .from('posts')
    .select('author_id, created_at')
    .eq('id', postId)
    .single()

  if (post?.author_id !== user.id) {
    // Vérifier si modérateur
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin' && profile?.role !== 'moderator') {
      return { error: 'Vous n\'avez pas la permission de modifier ce post' }
    }
  }

  // Vérifier le délai de 15 minutes pour les auteurs normaux
  if (post?.author_id === user.id) {
    const createdAt = new Date(post.created_at)
    const now = new Date()
    const diffMinutes = (now.getTime() - createdAt.getTime()) / 1000 / 60

    if (diffMinutes > 15) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profile?.role !== 'admin' && profile?.role !== 'moderator') {
        return { error: 'Vous ne pouvez plus modifier ce post (délai de 15 min dépassé)' }
      }
    }
  }

  // Mettre à jour le post
  const { error } = await supabase
    .from('posts')
    .update({
      content,
      content_html: `<p>${content}</p>`,
      edit_reason: editReason,
    })
    .eq('id', postId)

  if (error) {
    return { error: 'Erreur lors de la mise à jour du post' }
  }

  revalidatePath('/forum')
  return { success: true }
}

export async function deletePost(postId: string) {
  const supabase = await createClient()
  const user = await getCurrentUser()

  if (!user) {
    return { error: 'Vous devez être connecté' }
  }

  // Vérifier les permissions
  const { data: post } = await supabase
    .from('posts')
    .select('author_id, post_position, thread_id')
    .eq('id', postId)
    .single()

  if (!post) {
    return { error: 'Post non trouvé' }
  }

  // Ne pas permettre de supprimer le premier post
  if (post.post_position === 1) {
    return { error: 'Vous ne pouvez pas supprimer le premier message d\'un thread' }
  }

  if (post.author_id !== user.id) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin' && profile?.role !== 'moderator') {
      return { error: 'Vous n\'avez pas la permission de supprimer ce post' }
    }
  }

  // Soft delete
  const { error } = await supabase
    .from('posts')
    .update({ is_deleted: true })
    .eq('id', postId)

  if (error) {
    return { error: 'Erreur lors de la suppression du post' }
  }

  revalidatePath('/forum')
  return { success: true }
}

export async function togglePostReaction(postId: string, reaction: string) {
  const supabase = await createClient()
  const user = await getCurrentUser()

  if (!user) {
    return { error: 'Vous devez être connecté pour réagir' }
  }

  // Vérifier si la réaction existe déjà
  const { data: existing } = await supabase
    .from('post_reactions')
    .select('*')
    .eq('user_id', user.id)
    .eq('post_id', postId)
    .eq('reaction', reaction)
    .single()

  if (existing) {
    // Supprimer la réaction
    const { error } = await supabase
      .from('post_reactions')
      .delete()
      .eq('user_id', user.id)
      .eq('post_id', postId)
      .eq('reaction', reaction)

    if (error) {
      return { error: 'Erreur lors de la suppression de la réaction' }
    }

    revalidatePath('/forum')
    return { success: true, action: 'removed' }
  } else {
    // Ajouter la réaction
    const { error } = await supabase.from('post_reactions').insert({
      user_id: user.id,
      post_id: postId,
      reaction: reaction as any,
    })

    if (error) {
      return { error: 'Erreur lors de l\'ajout de la réaction' }
    }

    revalidatePath('/forum')
    return { success: true, action: 'added' }
  }
}
