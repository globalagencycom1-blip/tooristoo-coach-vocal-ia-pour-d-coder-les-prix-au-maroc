# Questions critiques pour Base44

## 1. Redirects 301 côté serveur

**Question :** Est-ce que Base44 supporte les redirects 301 côté serveur (avant que le code React exécute) ?
- Par exemple : `/About` → `/about` avec un vrai HTTP 301

**Pourquoi :** Pour que les crawleurs et LLM voient le redirect avant d'exécuter React. Cloudflare Worker peut le faire à l'edge, mais c'est mieux côté serveur.

**Action alternative :** Utiliser le Cloudflare Worker fourni (implémente déjà les 301 à l'edge).

---

## 2. Support des redirects côté serveur (netlify.toml / vercel.json)

**Question :** Puis-je configurer les redirects dans un fichier `_redirects` ou similar ?
```
/About /about 301
/Providers /providers 301
/FAQ /faq 301
```

**Pourquoi :** Config déclarative plutôt que code.

---

## 3. Sitemap.xml dynamique

**Question :** Y a-t-il un générateur de sitemap automatique dans Base44 ?
- Idéalement un `/sitemap.xml` qui liste toutes les routes + langues
- Format : `https://tooristoo.com/about?lang=fr`, `https://tooristoo.com/about?lang=en`, etc.

**Action alternative :** Générer manuellement `public/sitemap.xml` (voir exemple ci-dessous)

---

## 4. Robots.txt

**Question :** Puis-je modifier `public/robots.txt` librement ?

**Nettoyage à faire :**
```
User-agent: *
Allow: /

Disallow: /admin/
Disallow: /profile/

Sitemap: https://tooristoo.com/sitemap.xml
```

Supprimer les anciennes règles bloquant `/Providers`, `/About`, `/FAQ` (majuscules).

---

## 5. Export des données

**Question critique :** Avez-vous une politique de portabilité des données ?
- Puis-je exporter toutes mes entités (Negotiation, UserProfile, Provider, ScamReport) en JSON/CSV ?
- Y a-t-il une API d'export ou un backup automatique ?
- Que se passe-t-il si je ferme mon compte ou si vous fermez le service ?

---

## 6. Contrats SLA

**Question :** Avez-vous un SLA de uptime et une garantie de continuité de service en cas de fermeture ?

---

# Outils fournis

## Cloudflare Worker
✅ Déjà créé et prêt à déployer  
✅ Réécrit les meta tags par route + langue  
✅ Ajoute les hreflang  
✅ Redirige 301 les URLs majuscules  

**Déploiement :** Voir `public/CLOUDFLARE_SETUP.md`

---

## Sitemap.xml proposé

Voir `public/sitemap-template.xml` pour un exemple.

---

# Résumé : Avant/Après

## AVANT (Problème)
```
GET /about → index.html (title générique) → Google voit "Tooristoo" pour TOUTES les pages
GET /About → 200 OK (vide) → Google voit double contenu
GET /faq?lang=fr → même title que /about
GET /darija?lang=ar → RTL/LTR pas géré correctement
```

## APRÈS (Avec Cloudflare Worker)
```
GET /about → HTTP 200 + title "À Propos de Tooristoo..." + meta desc unique + hreflang
GET /About → HTTP 301 → /about
GET /faq?lang=fr → title "FAQ Tooristoo..." + hreflang vers /faq?lang=en/es/de/ar
GET /darija?lang=ar → title "100 عبارة..." + dir="rtl" + hreflang vers autres langues
```

**Google, OpenAI, Perplexity** voient maintenant des pages **uniques** avec **contenu différencié** et **hreflang corrects**.
