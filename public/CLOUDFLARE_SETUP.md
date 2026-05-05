Supprimer les anciennes règles bloquant les URLs en majuscules (`Disallow: /Providers`, `Disallow: /About`, etc.) — elles sont maintenant gérées par les redirects 301 du Worker.

## Monitoring et limites

**Limite du plan Free** : 100 000 requêtes/jour. Au-delà, requêtes refusées ou plan payant requis (5 $/mois pour 10 millions/jour).

**Surveillance recommandée** :
- Tableau de bord Cloudflare → Workers → `tooristoo-seo` → onglet **Metrics** pour voir le nombre de requêtes
- Activer les **Alertes** Cloudflare pour être notifié à 80 % de la limite

**Logs en cas de problème** :
- Onglet **Logs** du Worker (real-time logs)
- Permet de voir si une route génère des erreurs 500

## Plan B — si le Worker plante en production

Le Worker doit être conçu avec un `try/catch` global qui retourne la réponse d'origine en cas d'erreur. Vérifiez que `cloudflare-worker.js` contient :

```javascript
addEventListener('fetch', event => {
  event.respondWith(
    handleRequest(event.request).catch(err => {
      console.error('Worker error:', err);
      return fetch(event.request); // fallback : laisse passer la requête originale
    })
  );
});
```

Si ce bloc n'est pas présent dans votre Worker actuel, la moindre erreur causera un écran blanc pour vos utilisateurs. À vérifier impérativement.

## Étapes suivantes après déploiement

1. **Soumettre le sitemap** : Google Search Console et Bing Webmaster Tools
2. **Vérifier le rendu** : `https://search.google.com/test/rich-results` avec une URL Tooristoo
3. **Tester les LLM** : demander à ChatGPT, Claude et Perplexity *"Que sait-on de Tooristoo ?"* dans 2-3 semaines pour voir si les pages ont été indexées
4. **Surveiller GSC** pendant 2-4 semaines : couverture des pages, performance par requête
5. **Itérer** sur les meta descriptions selon le CTR observé dans GSC