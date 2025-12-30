import { Search, Plus } from 'lucide-react'
import Link from 'next/link'
import HuntCard from '@/components/HuntCard'
import { getHunts, getCurrentProfile } from '@/lib/supabase/queries'

export default async function ForumPage() {
  const [hunts, profile] = await Promise.all([
    getHunts(),
    getCurrentProfile(),
  ])

  const isAdmin = profile?.role === 'admin' || profile?.role === 'moderator'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Chasses au trésor
          </h1>
          <p className="text-gray-600">
            Explorez les énigmes et partagez vos découvertes
          </p>
        </div>

        {isAdmin && (
          <Link
            href="/admin/hunts/new"
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Créer une chasse</span>
          </Link>
        )}
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher une chasse au trésor..."
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Hunts Grid */}
      {hunts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-600 mb-4">Aucune chasse au trésor disponible</p>
          {isAdmin && (
            <Link href="/admin/hunts/new" className="btn-primary">
              Créer la première chasse
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hunts.map((hunt) => (
            <HuntCard key={hunt.id} hunt={hunt} />
          ))}
        </div>
      )}
    </div>
  )
}
