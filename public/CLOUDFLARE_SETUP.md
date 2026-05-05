# Setup Cloudflare Worker pour Tooristoo SEO

## Pré-requis

- Domaine `tooristoo.com` géré par Cloudflare (DNS au minimum)
- Plan Cloudflare Workers Free (100 000 requêtes/jour) — suffisant pour démarrer
- Le fichier `public/cloudflare-worker.js` à jour avec votre repivot stratégique (vigilance tarifaire, pas anti-arnaque)

## Étape 1 — Créer le Worker via le dashboard Cloudflare

1. Aller sur https://dash.cloudflare.com
2. Sélectionner votre domaine `tooristoo.com`
3. Menu de gauche : **Workers & Pages** → **Create application** → **Create Worker**
4. Nommer le Worker : `tooristoo-seo`
5. Copier l'intégralité du contenu de `public/cloudflare-worker.js` dans l'éditeur en ligne
6. Cliquer sur **Save and Deploy**

## Étape 2 — Associer le Worker à votre domaine

1. Onglet **Triggers** du Worker que vous venez de créer
2. **Add Custom Domain** → entrer `tooristoo.com`
3. **Add Route** → entrer `tooristoo.com/*` (avec l'astérisque pour matcher toutes les pages)
4. Sauvegarder

## Étape 3 — Alternative : déploiement via Wrangler CLI (recommandé pour un workflow Git)

Si vous préférez versionner votre Worker dans Git plutôt que d'éditer en ligne :

**Créer `wrangler.toml` à la racine du projet** :

```toml
name = "tooristoo-seo"
main = "public/cloudflare-worker.js"
compatibility_date = "2024-09-01"

[[routes]]
pattern = "tooristoo.com/*"
zone_name = "tooristoo.com"
```

**Installation et déploiement** :

```bash
npm install -D wrangler
npx wrangler login
npx wrangler deploy
```

Note : **n'utilisez QU'UN SEUL** des deux workflows (dashboard OU wrangler), pas les deux en parallèle — sinon les versions divergent.

## Étape 4 — Vérification après déploiement

Tester depuis votre terminal :

```bash
# Vérifier que la route principale renvoie un 200 et un title spécifique
curl -s https://tooristoo.com/about | grep -i "<title>"
# Attendu : <title>À Propos de Tooristoo — Initiative née à Marrakech...</title>

# Vérifier les hreflang
curl -s https://tooristoo.com/about | grep -i "hreflang"
# Attendu : 6 lignes (fr, en, es, de, ar, x-default)

# Vérifier le redirect 301 sur les URLs en majuscules
curl -I https://tooristoo.com/About
# Attendu : HTTP/1.1 301 Moved Permanently
#           Location: https://tooristoo.com/about

# Tester la langue arabe (RTL)
curl -s https://tooristoo.com/about?lang=ar | grep "dir="
# Attendu : <html lang="ar" dir="rtl">

# Tester le darija
curl -s https://tooristoo.com/darija?lang=darija | grep -i "<title>"
```

## Ce que le Worker fait

- Réécrit `<title>` unique par route et langue
- Réécrit `<meta name="description">` unique par route et langue
- Réécrit `<meta property="og:title">` et `<meta property="og:description">` (Open Graph)
- Ajoute les balises `<link rel="alternate" hreflang="...">` vers les 6 langues
- Redirige 301 les URLs en majuscules vers leur version canonique en minuscules :
  - `/About` → `/about`
  - `/Providers` → `/providers`
  - `/FAQ` → `/faq`
  - `/Methodology` → `/methodology`
  - `/Charter` → `/charter`
  - `/Darija` → `/darija`
  - `/Blog` → `/blog`
  - `/Alerts` → `/alerts`
- Détecte la langue via le paramètre `?lang=fr|en|es|de|ar|darija`
- Définit `dir="rtl"` pour l'arabe et le darija

## Paramètres de langue supportés