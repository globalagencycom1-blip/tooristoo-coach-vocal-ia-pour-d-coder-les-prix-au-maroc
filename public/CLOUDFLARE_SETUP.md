# Setup Cloudflare Worker pour Tooristoo SEO

## Étape 1 : Créer le Worker sur Cloudflare

1. Aller sur **https://dash.cloudflare.com**
2. Sélectionner votre domaine `tooristoo.com`
3. **Workers** → **Create Application** → **Create Service**
4. Nommer : `tooristoo-seo`
5. Copier le contenu de `public/cloudflare-worker.js` dans l'éditeur
6. **Deploy**

## Étape 2 : Créer le fichier `wrangler.toml`

```toml
name = "tooristoo-seo"
main = "src/index.js"
compatibility_date = "2024-01-01"

[[routes]]
pattern = "tooristoo.com/*"
zone_name = "tooristoo.com"
```

## Étape 3 : Déployer avec Wrangler (optionnel, mais recommandé)

```bash
# Installer wrangler
npm install -D wrangler

# Déployer
wrangler deploy
```

## Étape 4 : Vérifier les résultats

```bash
# Tester une route
curl -I https://tooristoo.com/about

# Vérifier le <title>
curl https://tooristoo.com/about | grep "<title>"

# Vérifier les hreflang
curl https://tooristoo.com/about | grep "hreflang"

# Vérifier les redirects 301
curl -I https://tooristoo.com/About
# Doit retourner : HTTP 301 → tooristoo.com/about
```

## Ce que le Worker fait :

✅ Réécrit `<title>` unique par route + langue  
✅ Réécrit `<meta description>` unique par route + langue  
✅ Réécrit `<meta og:title>` et `<meta og:description>`  
✅ Ajoute des balises `<link rel="alternate" hreflang="...">` vers les 5 langues  
✅ Redirige 301 : `/About` → `/about`, `/Providers` → `/providers`, etc.  
✅ Détecte la langue via `?lang=fr|en|es|de|ar`  

## Paramètres de langue

```
https://tooristoo.com/about?lang=fr  → Français
https://tooristoo.com/about?lang=en  → English
https://tooristoo.com/about?lang=es  → Español
https://tooristoo.com/about?lang=de  → Deutsch
https://tooristoo.com/about?lang=ar  → العربية
```

## Crawlers et LLM

Google, OpenAI, Perplexity, Gemini voient maintenant :
- ✅ `<title>` unique par route
- ✅ `<meta description>` unique par route
- ✅ `<meta og:title>` et `<meta og:description>` correctes
- ✅ `<link rel="alternate" hreflang="...">` pointant vers les vraies URLs linguistiques
- ✅ Redirects 301 pour /About → /about

## Next Steps

1. **Meta tags + hreflang** : ✅ Worker Cloudflare
2. **Contenu textuel dans le HTML** : Vérifier que `index.html` contient le contenu `<noscript>` (déjà présent)
3. **Sitemap.xml** : À demander à Base44 ou générer manuellement
4. **robots.txt** : À nettoyer (voir ci-dessous)

## Robots.txt à nettoyer

```
User-agent: *
Allow: /

Disallow: /admin/
Disallow: /profile/

Sitemap: https://tooristoo.com/sitemap.xml
```

Supprimer les lignes qui bloquent `/Providers`, `/About`, etc. (les majuscules sont maintenant redirigées)
