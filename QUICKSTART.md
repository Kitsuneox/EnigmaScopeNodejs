# 🚀 Guide de Démarrage Rapide - EnigmaScope

## Étape 1 : Installation (5 min)

```bash
cd enigmascope-nextjs
npm install
```

## Étape 2 : Configuration Supabase (10 min)

### A. Créer le projet Supabase

1. Allez sur https://supabase.com
2. Cliquez sur "New Project"
3. Nommez le projet "enigmascope"
4. Notez votre URL et clé anon

### B. Exécuter les migrations SQL

Dans Supabase SQL Editor, exécutez dans l'ordre :

**1. Migration Safe** (`supabase-migration-safe.sql`)
```sql
-- Copier tout le contenu du fichier
-- Cliquer sur "Run"
```

**2. Setup Admin** (`supabase-setup-admin.sql`)
```sql
-- Remplacer 'bd19ddbd-fb68-4aee-a2e2-95542bfd8acd' 
-- par votre User ID de Supabase Auth
-- Cliquer sur "Run"
```

Pour trouver votre User ID :
1. Supabase → Authentication → Users
2. Cliquez sur votre email
3. Copiez l'ID

### C. Variables d'environnement

Créez `.env.local` :

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Étape 3 : Lancer l'application (1 min)

```bash
npm run dev
```

Ouvrez http://localhost:3000

## Étape 4 : Premier test (5 min)

### A. S'inscrire

1. Allez sur http://localhost:3000/signup
2. Créez un compte avec :
   - Username : `test`
   - Email : `test@example.com`
   - Password : `12345678`

### B. Devenir admin

Dans Supabase SQL Editor :

```sql
UPDATE profiles 
SET role = 'admin'
WHERE username = 'test';
```

### C. Créer votre première chasse

1. Connectez-vous avec votre compte
2. Allez sur `/forum`
3. Cliquez "Créer une chasse"
4. Remplissez :
   - Nom : "Ma Première Chasse"
   - Description : "Une chasse de test"
   - Difficulté : "medium"

## Étape 5 : Données de test (déjà incluses !)

Si vous avez exécuté `supabase-setup-admin.sql`, vous avez déjà :
- ✅ 3 chasses au trésor
- ✅ 19 énigmes
- ✅ 3 discussions de test
- ✅ Votre compte admin

## ⚠️ Problèmes courants

### "Invalid API key"
→ Vérifiez votre `.env.local` et redémarrez `npm run dev`

### "relation does not exist"
→ Exécutez `supabase-migration-safe.sql`

### "Role admin does not exist"
→ Exécutez la commande UPDATE ci-dessus

### Types TypeScript incorrects
```bash
npm run types:generate
```

## 📝 Prochaines étapes

1. **Personnaliser** : Modifiez les couleurs dans `app/globals.css`
2. **Ajouter du contenu** : Créez vos chasses et énigmes
3. **Déployer** : Pushez sur Vercel

## 🎯 Fonctionnalités disponibles

✅ Authentification complète
✅ Création de chasses/énigmes (admin)
✅ Forums de discussion
✅ Réactions aux posts
✅ Modération (épingler, verrouiller, supprimer)
✅ Recherche full-text
✅ Statistiques temps réel

## 🤔 Besoin d'aide ?

Consultez le README.md complet pour plus de détails !
