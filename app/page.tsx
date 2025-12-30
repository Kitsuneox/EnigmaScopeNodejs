import Link from 'next/link'
import { Puzzle, Users, MessageSquare, Sparkles, TrendingUp, Search } from 'lucide-react'
import HuntCard from '@/components/HuntCard'
import { getFeaturedHunts, getForumStats } from '@/lib/supabase/queries'

export default async function Home() {
  const [featuredHunts, stats] = await Promise.all([
    getFeaturedHunts(),
    getForumStats(),
  ])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-extrabold mb-6 leading-tight">
              Résolvez les énigmes les plus fascinantes du monde
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Rejoignez une communauté passionnée de chercheurs de trésors et
              percez les mystères des plus grandes chasses au trésor
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Link href="/forum" className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
                Explorer le forum
              </Link>
              <Link href="/tools" className="px-6 py-3 border-2 border-white text-white font-medium rounded-md hover:bg-white hover:text-blue-600 transition-colors">
                Outils IA
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {stats.hunts}
              </div>
              <div className="text-sm text-gray-600">Chasses actives</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {stats.enigmas}
              </div>
              <div className="text-sm text-gray-600">Énigmes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {stats.threads}
              </div>
              <div className="text-sm text-gray-600">Discussions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {stats.posts}
              </div>
              <div className="text-sm text-gray-600">Messages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-1">
                {stats.users}
              </div>
              <div className="text-sm text-gray-600">Membres</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hunts */}
      {featuredHunts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Chasses au trésor populaires
              </h2>
              <Link
                href="/forum"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
              >
                <span>Voir toutes</span>
                <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredHunts.map((hunt) => (
                <HuntCard key={hunt.id} hunt={hunt} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Pourquoi rejoindre EnigmaScope ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Puzzle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Énigmes variées
              </h3>
              <p className="text-gray-600 text-sm">
                Des chasses au trésor légendaires aux nouvelles énigmes modernes
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Communauté active
              </h3>
              <p className="text-gray-600 text-sm">
                Échangez avec des passionnés du monde entier
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Outils IA
              </h3>
              <p className="text-gray-600 text-sm">
                Accédez à des outils d'analyse alimentés par l'IA
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Progression
              </h3>
              <p className="text-gray-600 text-sm">
                Suivez vos résolutions et gagnez en réputation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à commencer l'aventure ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez des milliers de chercheurs de trésors et percez les
            mystères ensemble
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-md hover:bg-gray-100 transition-colors"
          >
            Créer un compte gratuit
          </Link>
        </div>
      </section>
    </div>
  )
}
