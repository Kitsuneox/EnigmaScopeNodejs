import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import { getCurrentUser, getCurrentProfile } from '@/lib/supabase/queries'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EnigmaScope - Forum de chasses au trésor',
  description: 'Discutez et résolvez les énigmes des plus grandes chasses au trésor',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  const profile = user ? await getCurrentProfile() : null

  return (
    <html lang="fr">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <Header user={user} profile={profile} />
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
