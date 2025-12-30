import Link from 'next/link'
import { MessageSquare, Eye, Pin, Lock } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'

interface ThreadListProps {
  threads: Array<{
    id: string
    title: string
    slug: string
    author_username: string
    author_avatar_url: string | null
    posts_count: number
    views: number
    is_pinned: boolean
    is_locked: boolean
    last_post_at: string
    last_post_by_username: string | null
    created_at: string
  }>
  huntSlug: string
  enigmaSlug: string
}

export default function ThreadList({ threads, huntSlug, enigmaSlug }: ThreadListProps) {
  if (threads.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600">Aucune discussion pour le moment</p>
        <p className="text-sm text-gray-500 mt-1">Soyez le premier à créer une discussion !</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {threads.map((thread) => (
        <Link
          key={thread.id}
          href={`/forum/${huntSlug}/${enigmaSlug}/${thread.slug}`}
          className="block"
        >
          <div className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all p-4">
            <div className="flex items-start space-x-4">
              {/* Avatar */}
              <div className="flex-shrink-0">
                {thread.author_avatar_url ? (
                  <img
                    src={thread.author_avatar_url}
                    alt={thread.author_username}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {thread.author_username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  {thread.is_pinned && (
                    <Pin className="w-4 h-4 text-yellow-600" />
                  )}
                  {thread.is_locked && (
                    <Lock className="w-4 h-4 text-gray-500" />
                  )}
                  <h3 className="text-base font-semibold text-gray-900 truncate group-hover:text-blue-600">
                    {thread.title}
                  </h3>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Par {thread.author_username}</span>
                  <span>•</span>
                  <span>
                    {formatDistanceToNow(new Date(thread.created_at), {
                      addSuffix: true,
                      locale: fr,
                    })}
                  </span>
                </div>

                {thread.last_post_by_username && (
                  <div className="mt-2 text-xs text-gray-400">
                    Dernière réponse par {thread.last_post_by_username}{' '}
                    {formatDistanceToNow(new Date(thread.last_post_at), {
                      addSuffix: true,
                      locale: fr,
                    })}
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="flex-shrink-0 text-right">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{thread.posts_count}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{thread.views}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
