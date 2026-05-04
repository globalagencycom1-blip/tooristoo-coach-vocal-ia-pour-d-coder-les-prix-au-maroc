import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Mise à jour hebdomadaire de la base de connaissances des prix Tooristoo
// Analyse les négociations récentes pour détecter les tendances de prix

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    // Récupérer les négociations des 7 derniers jours
    const negotiations = await base44.asServiceRole.entities.Negotiation.list('-created_date', 200);
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentNegotiations = negotiations.filter(n => new Date(n.created_date) >= oneWeekAgo);

    if (recentNegotiations.length === 0) {
      return Response.json({ message: 'Aucune négociation récente à analyser', updated: false });
    }

    // Grouper par ville + catégorie pour calculer les tendances
    const priceData = {};
    for (const n of recentNegotiations) {
      if (!n.location || !n.category || !n.price_asked) continue;
      const key = `${n.location}_${n.category}`;
      if (!priceData[key]) {
        priceData[key] = {
          city: n.location,
          category: n.category,
          prices_asked: [],
          prices_negotiated: [],
          scam_count: 0,
          total: 0
        };
      }
      priceData[key].prices_asked.push(n.price_asked);
      if (n.price_negotiated) priceData[key].prices_negotiated.push(n.price_negotiated);
      if (n.scam_detected) priceData[key].scam_count++;
      priceData[key].total++;
    }

    // Analyser les tendances
    const trends = [];
    for (const [key, data] of Object.entries(priceData)) {
      if (data.total < 2) continue;
      const avgAsked = data.prices_asked.reduce((a, b) => a + b, 0) / data.prices_asked.length;
      const avgNegotiated = data.prices_negotiated.length > 0
        ? data.prices_negotiated.reduce((a, b) => a + b, 0) / data.prices_negotiated.length
        : null;
      const scamRate = data.scam_count / data.total;

      trends.push({
        city: data.city,
        category: data.category,
        avg_price_asked: Math.round(avgAsked),
        avg_price_negotiated: avgNegotiated ? Math.round(avgNegotiated) : null,
        scam_rate: Math.round(scamRate * 100),
        sample_size: data.total,
        alert: scamRate > 0.5 ? `⚠️ Taux de vigilance élevé (${Math.round(scamRate * 100)}%) pour ${data.category} à ${data.city}` : null
      });
    }

    // Générer un rapport d'analyse avec l'IA
    const reportPrompt = `Tu es l'analyste de prix de Tooristoo. Voici les données de négociation de la semaine passée au Maroc:

${trends.map(t => `- ${t.city} / ${t.category}: prix moyen demandé ${t.avg_price_asked} DH, prix négocié ${t.avg_price_negotiated || 'N/A'} DH, taux vigilance ${t.scam_rate}% (${t.sample_size} cas)`).join('\n')}

Génère un résumé hebdomadaire concis des tendances, alertes importantes, et recommandations pour mettre à jour notre base de prix. Format: JSON avec summary, alerts, price_recommendations.`;

    const aiReport = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: reportPrompt,
      response_json_schema: {
        type: 'object',
        properties: {
          summary: { type: 'string' },
          alerts: { type: 'array', items: { type: 'string' } },
          price_recommendations: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                city: { type: 'string' },
                category: { type: 'string' },
                recommended_min: { type: 'number' },
                recommended_max: { type: 'number' },
                reason: { type: 'string' }
              }
            }
          }
        }
      }
    });

    return Response.json({
      message: `Rapport hebdomadaire généré — ${new Date().toISOString().split('T')[0]}`,
      negotiations_analyzed: recentNegotiations.length,
      trends_detected: trends.length,
      scam_alerts: trends.filter(t => t.scam_rate > 50).map(t => t.alert).filter(Boolean),
      ai_report: aiReport,
      raw_trends: trends
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});