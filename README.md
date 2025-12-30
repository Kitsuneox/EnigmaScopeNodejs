# EnigmaScope - Forum de Chasses au Trésor

Application Next.js 15 + Supabase pour un forum de discussion autour des chasses au trésor et énigmes.

## 🚀 Fonctionnalités

- ✅ **Authentification complète** (inscription, connexion, réinitialisation mot de passe)
- ✅ **Forum hiérarchique** : Chasses → Énigmes → Threads → Posts
- ✅ **Système de modération** (admin, modérateur, utilisateur)
- ✅ **Réactions aux posts** (J'aime, Utile, Perspicace, Drôle)
- ✅ **Recherche full-text** en français
- ✅ **Statistiques en temps réel**
- ✅ **RLS (Row Level Security)** pour la sécurité
- ✅ **Server Actions** pour les mutations
- ✅ **SSR (Server-Side Rendering)** pour le SEO

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn
- Un compte Supabase (gratuit)

## 🛠️ Installation

### 1. Cloner le projet

```bash
git clone https://github.com/votre-repo/enigmascope.git
cd enigmascope
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer Supabase

#### A. Créer un projet Supabase

1. Allez sur [https://supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Notez votre **Project URL** et **anon key**

#### B. Exécuter le schéma SQL

1. Dans votre projet Supabase, allez dans **SQL Editor**
2. Exécutez les fichiers SQL dans cet ordre :
   - `supabase-migration-safe.sql` (schéma complet)
   - `supabase-setup-admin.sql` (données de test + votre compte admin)

#### C. Générer les types TypeScript (optionnel)

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.types.ts
```

### 4. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine :

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 5. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

## 📁 Structure du projet

```
enigmascope-nextjs/
├── app/
│   ├── actions/          # Server Actions (mutations)
│   │   ├── auth.ts
│   │   ├── posts.ts
│   │   └── threads.ts
│   ├── forum/            # Pages du forum
│   │   └── page.tsx
│   ├── login/
│   ├── signup/
│   ├── layout.tsx        # Layout racine
│   ├── page.tsx          # Page d'accueil
│   └── globals.css
├── components/           # Composants réutilisables
│   ├── Header.tsx
│   ├── HuntCard.tsx
│   ├── ThreadList.tsx
│   └── PostCard.tsx
├── lib/
│   └── supabase/         # Client Supabase
│       ├── client.ts     # Client browser
│       ├── server.ts     # Client server
│       ├── queries.ts    # Fonctions helper
│       └── middleware.ts
├── types/
│   └── database.types.ts # Types TypeScript générés
├── middleware.ts         # Middleware Next.js
├── package.json
└── tsconfig.json
```

## 🎯 Utilisation

### Créer un compte admin

Le fichier `supabase-setup-admin.sql` crée automatiquement votre compte admin. Pour créer d'autres admins :

```sql
UPDATE profiles 
SET role = 'admin'
WHERE username = 'nom_utilisateur';
```

### Créer une chasse au trésor

1. Connectez-vous avec un compte admin
2. Allez sur `/forum`
3. Cliquez sur "Créer une chasse"
4. Remplissez les informations

### Créer des énigmes

1. Accédez à une chasse
2. Cliquez sur "Gérer les énigmes"
3. Ajoutez vos énigmes dans l'ordre souhaité

## 🔐 Sécurité

### Row Level Security (RLS)

Le schéma SQL inclut des policies RLS complètes :

- **Lecture publique** : threads et posts non supprimés
- **Écriture** : utilisateurs authentifiés non bannis
- **Modération** : admin et modérateurs ont tous les droits
- **Édition posts** : 15 min pour les auteurs, illimité pour mods

### Permissions

- **user** : Peut créer threads/posts, réagir
- **moderator** : Peut épingler, verrouiller, supprimer
- **admin** : Tous les droits + gestion chasses/énigmes

## 📊 Base de données

### Tables principales

- `profiles` - Profils utilisateurs
- `hunts` - Chasses au trésor
- `enigmas` - Énigmes
- `threads` - Fils de discussion
- `posts` - Messages
- `post_reactions` - Réactions
- `thread_subscriptions` - Abonnements
- `reports` - Signalements

### Triggers automatiques

- Auto-incrémentation des compteurs (posts_count, threads_count, etc.)
- Mise à jour automatique de `updated_at`
- Recherche full-text vectorielle
- Historique des éditions

## 🚀 Déploiement

### Vercel (recommandé)

1. Pushez votre code sur GitHub
2. Importez le projet sur [Vercel](https://vercel.com)
3. Ajoutez les variables d'environnement
4. Déployez !

### Variables d'environnement production

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
```

## 🎨 Personnalisation

### Couleurs

Modifiez les couleurs dans `app/globals.css` :

```css
:root {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
}
```

### Logo

Remplacez le logo dans `components/Header.tsx`

## 🐛 Debug

### Problèmes courants

**Erreur : "relation does not exist"**
→ Exécutez les migrations SQL dans l'ordre

**Erreur : "Invalid API key"**
→ Vérifiez vos variables d'environnement `.env.local`

**Types TypeScript incorrects**
→ Regénérez les types : `npm run types:generate`

## 📚 Documentation

- [Next.js 15](https://nextjs.org/docs)
- [Supabase](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contribution

Les contributions sont les bienvenues ! 

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

MIT

## 👤 Auteur

Adrien Miguet - EnigmaScope

## 🙏 Remerciements

- [Supabase](https://supabase.com) pour le backend
- [Vercel](https://vercel.com) pour l'hébergement
- [Lucide](https://lucide.dev) pour les icônes
