import Link from 'next/link'
import { Puzzle, Users, MessageSquare, TrendingUp } from 'lucide-react'

interface HuntCardProps {
  hunt: {
    slug: string
    name: string
    description: string | null
    icon: string | null
    color: string
    difficulty: string | null
    enigmas_count: number
    threads_count: number
    posts_count: number
    is_featured: boolean
  }
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  hard: 'bg-orange-100 text-orange-800',
  expert: 'bg-red-100 text-red-800',
}

const difficultyLabels = {
  easy: 'Facile',
  medium: 'Moyen',
  hard: 'Difficile',
  expert: 'Expert',
}

export default function HuntCard({ hunt }: HuntCardProps) {
  return (
    <Link href={`/forum/${hunt.slug}`}>
      <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 h-full">
        {/* Badge featured */}
        {hunt.is_featured && (
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              <TrendingUp className="w-3 h-3" />
              <span>Populaire</span>
            </span>
          </div>
        )}

        {/* Header avec couleur */}
        <div
          className="h-32 p-6 flex items-center justify-center"
          style={{ backgroundColor: hunt.color }}
        >
          {hunt.icon ? (
            <span className="text-6xl">{hunt.icon}</span>
          ) : (
            <Puzzle className="w-16 h-16 text-white opacity-80" />
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {hunt.name}
            </h3>
            {hunt.difficulty && (
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  difficultyColors[hunt.difficulty as keyof typeof difficultyColors]
                }`}
              >
                {difficultyLabels[hunt.difficulty as keyof typeof difficultyLabels]}
              </span>
            )}
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {hunt.description || 'Aucune description disponible'}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Puzzle className="w-4 h-4" />
              <span>{hunt.enigmas_count} énigmes</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageSquare className="w-4 h-4" />
              <span>{hunt.threads_count} discussions</span>
            </div>
          </div>

          <div className="mt-3 text-xs text-gray-400">
            {hunt.posts_count} messages
          </div>
        </div>

        {/* Hover effect */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 rounded-xl pointer-events-none transition-colors" />
      </div>
    </Link>
  )
}
