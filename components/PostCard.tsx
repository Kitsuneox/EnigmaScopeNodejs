'use client'

import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Heart, Lightbulb, Eye, Smile, Edit, Trash2, Flag } from 'lucide-react'
import { togglePostReaction, deletePost } from '@/app/actions/posts'

interface PostCardProps {
  post: {
    id: string
    content: string
    content_html: string | null
    author_username: string
    author_avatar_url: string | null
    author_role: string
    author_posts_count: number
    post_position: number
    is_edited: boolean
    edited_at: string | null
    reactions_count: number
    created_at: string
  }
  currentUserId?: string
  isAuthor: boolean
  isModerator: boolean
}

const roleColors = {
  admin: 'bg-red-100 text-red-800',
  moderator: 'bg-purple-100 text-purple-800',
  user: '',
}

const roleLabels = {
  admin: 'Admin',
  moderator: 'Modérateur',
  user: '',
}

export default function PostCard({ post, currentUserId, isAuthor, isModerator }: PostCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleReaction = async (reaction: string) => {
    if (!currentUserId) {
      alert('Vous devez être connecté pour réagir')
      return
    }
    await togglePostReaction(post.id, reaction)
  }

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return
    
    setIsDeleting(true)
    const result = await deletePost(post.id)
    
    if (result.error) {
      alert(result.error)
      setIsDeleting(false)
    }
  }

  return (
    <div
      id={`post-${post.id}`}
      className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
    >
      <div className="flex">
        {/* Sidebar avec avatar et stats */}
        <div className="w-32 bg-gray-50 p-4 border-r border-gray-200 flex flex-col items-center text-center">
          {/* Avatar */}
          {post.author_avatar_url ? (
            <img
              src={post.author_avatar_url}
              alt={post.author_username}
              className="w-16 h-16 rounded-full mb-2"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center mb-2">
              <span className="text-white text-xl font-medium">
                {post.author_username.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          {/* Username */}
          <div className="font-medium text-sm text-gray-900 mb-1">
            {post.author_username}
          </div>

          {/* Role badge */}
          {post.author_role !== 'user' && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full mb-2 ${
                roleColors[post.author_role as keyof typeof roleColors]
              }`}
            >
              {roleLabels[post.author_role as keyof typeof roleLabels]}
            </span>
          )}

          {/* Stats */}
          <div className="text-xs text-gray-500 mt-2">
            {post.author_posts_count} messages
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>
                {formatDistanceToNow(new Date(post.created_at), {
                  addSuffix: true,
                  locale: fr,
                })}
              </span>
              {post.is_edited && post.edited_at && (
                <>
                  <span>•</span>
                  <span className="text-xs italic">
                    modifié{' '}
                    {formatDistanceToNow(new Date(post.edited_at), {
                      addSuffix: true,
                      locale: fr,
                    })}
                  </span>
                </>
              )}
              <span>•</span>
              <span>#{post.post_position}</span>
            </div>

            {/* Actions */}
            {(isAuthor || isModerator) && (
              <div className="flex items-center space-x-2">
                {isAuthor && (
                  <button
                    className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-blue-600"
                    title="Modifier"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                )}
                {(isAuthor || isModerator) && post.post_position !== 1 && (
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-red-600 disabled:opacity-50"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-orange-600"
                  title="Signaler"
                >
                  <Flag className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Message content */}
          <div className="prose prose-sm max-w-none text-gray-900 mb-4">
            {post.content_html ? (
              <div dangerouslySetInnerHTML={{ __html: post.content_html }} />
            ) : (
              <p>{post.content}</p>
            )}
          </div>

          {/* Reactions */}
          <div className="flex items-center space-x-2 pt-3 border-t border-gray-100">
            <button
              onClick={() => handleReaction('like')}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-md hover:bg-red-50 text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              <Heart className="w-4 h-4" />
              <span>J'aime</span>
            </button>
            <button
              onClick={() => handleReaction('helpful')}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-md hover:bg-blue-50 text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Lightbulb className="w-4 h-4" />
              <span>Utile</span>
            </button>
            <button
              onClick={() => handleReaction('insightful')}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-md hover:bg-green-50 text-sm text-gray-600 hover:text-green-600 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Perspicace</span>
            </button>
            <button
              onClick={() => handleReaction('funny')}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-md hover:bg-yellow-50 text-sm text-gray-600 hover:text-yellow-600 transition-colors"
            >
              <Smile className="w-4 h-4" />
              <span>Drôle</span>
            </button>

            {post.reactions_count > 0 && (
              <div className="ml-auto text-sm text-gray-500">
                {post.reactions_count} réaction{post.reactions_count > 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
