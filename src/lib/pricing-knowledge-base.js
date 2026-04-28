// Base de connaissances NegoShield AI - Prix justes et prix touristiques par ville et catégorie

export const PRICING_KNOWLEDGE_BASE = {
  Marrakech: {
    taxi: {
      description: 'Trajet intra-ville',
      fair_price_min: 10,
      fair_price_max: 15,
      tourist_reasonable_min: 15,
      tourist_reasonable_max: 20,
      tips: 'Utiliser le compteur si disponible, négocier avant le trajet'
    },
    riad: {
      description: 'Nuit dans un riad traditionnel',
      fair_price_min: 300,
      fair_price_max: 600,
      tourist_reasonable_min: 400,
      tourist_reasonable_max: 800,
      tips: 'Vérifier les avis, petit-déjeuner inclus ou pas'
    },
    restaurant: {
      description: 'Repas dans un restaurant touristique',
      fair_price_min: 80,
      fair_price_max: 150,
      tourist_reasonable_min: 100,
      tourist_reasonable_max: 200,
      tips: 'Les menus dans la médina sont plus chers'
    },
    guide: {
      description: 'Guide touristique pour la journée',
      fair_price_min: 200,
      fair_price_max: 400,
      tourist_reasonable_min: 250,
      tourist_reasonable_max: 500,
      tips: 'Clarifier les heures, repas inclus ou non'
    },
    excursion: {
      description: 'Excursion d\'une journée (Désert, Vallée, Cascades)',
      fair_price_min: 400,
      fair_price_max: 700,
      tourist_reasonable_min: 500,
      tourist_reasonable_max: 900,
      tips: 'Vérifier si transport, repas et guide sont inclus'
    },
    artisanat: {
      description: 'Tapis, cuir, céramique (pièce de qualité moyenne)',
      fair_price_min: 200,
      fair_price_max: 500,
      tourist_reasonable_min: 300,
      tourist_reasonable_max: 700,
      tips: 'Négocier minimum 20-30% dans les souks'
    },
    train: {
      description: 'Billet de train (Marrakech-Casablanca)',
      fair_price_min: 80,
      fair_price_max: 150,
      tourist_reasonable_min: 100,
      tourist_reasonable_max: 150,
      tips: 'Prix fixe à la gare, pas de négociation possible'
    },
    spa: {
      description: 'Hammam/Massage traditionnel (1h)',
      fair_price_min: 80,
      fair_price_max: 150,
      tourist_reasonable_min: 100,
      tourist_reasonable_max: 200,
      tips: 'Demander le prix total avant de commencer'
    }
  },
  
  Fès: {
    taxi: {
      description: 'Trajet intra-ville',
      fair_price_min: 8,
      fair_price_max: 12,
      tourist_reasonable_min: 12,
      tourist_reasonable_max: 18,
      tips: 'La ville est labyrinthique, les petits taxis sont meilleur marché'
    },
    riad: {
      description: 'Nuit dans un riad',
      fair_price_min: 250,
      fair_price_max: 500,
      tourist_reasonable_min: 350,
      tourist_reasonable_max: 700,
      tips: 'Fès est moins touristique que Marrakech, meilleur rapport qualité-prix'
    },
    restaurant: {
      description: 'Repas authentique',
      fair_price_min: 60,
      fair_price_max: 120,
      tourist_reasonable_min: 80,
      tourist_reasonable_max: 150,
      tips: 'Les petits restaurants locaux sont excellents et pas chers'
    },
    guide: {
      description: 'Guide pour la médina',
      fair_price_min: 150,
      fair_price_max: 300,
      tourist_reasonable_min: 200,
      tourist_reasonable_max: 400,
      tips: 'La médina est très complexe, un guide est fortement recommandé'
    },
    artisanat: {
      description: 'Tapis, cuir brut (Fès est célèbre pour le cuir)',
      fair_price_min: 300,
      fair_price_max: 800,
      tourist_reasonable_min: 400,
      tourist_reasonable_max: 1200,
      tips: 'Le cuir de Fès est de qualité réputée, les prix reflètent cela'
    },
    excursion: {
      description: 'Visite Volubilis + Meknès',
      fair_price_min: 350,
      fair_price_max: 600,
      tourist_reasonable_min: 450,
      tourist_reasonable_max: 800,
      tips: 'Environ 1h de route, inclure le carburant'
    }
  },
  
  Chefchaouen: {
    taxi: {
      description: 'Trajet intra-ville',
      fair_price_min: 5,
      fair_price_max: 10,
      tourist_reasonable_min: 8,
      tourist_reasonable_max: 15,
      tips: 'Petite ville, les distances sont courtes'
    },
    riad: {
      description: 'Nuit dans un riad',
      fair_price_min: 200,
      fair_price_max: 400,
      tourist_reasonable_min: 300,
      tourist_reasonable_max: 600,
      tips: 'Destination moins chère que Marrakech et Fès'
    },
    restaurant: {
      description: 'Repas',
      fair_price_min: 50,
      fair_price_max: 100,
      tourist_reasonable_min: 70,
      tourist_reasonable_max: 130,
      tips: 'Petit village touristique, prix raisonnables'
    },
    guide: {
      description: 'Guide local',
      fair_price_min: 100,
      fair_price_max: 250,
      tourist_reasonable_min: 150,
      tourist_reasonable_max: 350,
      tips: 'Excellentes randonnées autour de la ville'
    },
    excursion: {
      description: 'Randonnée (demi-journée)',
      fair_price_min: 150,
      fair_price_max: 300,
      tourist_reasonable_min: 200,
      tourist_reasonable_max: 400,
      tips: 'Les Rifains connaissent bien les sentiers'
    }
  },
  
  Casablanca: {
    taxi: {
      description: 'Trajet intra-ville',
      fair_price_min: 12,
      fair_price_max: 18,
      tourist_reasonable_min: 15,
      tourist_reasonable_max: 25,
      tips: 'Grande ville, les trajets peuvent être longs'
    },
    hotel: {
      description: 'Hôtel 3-4 étoiles',
      fair_price_min: 400,
      fair_price_max: 800,
      tourist_reasonable_min: 500,
      tourist_reasonable_max: 1000,
      tips: 'Moins touristique que Marrakech, plus moderne'
    },
    restaurant: {
      description: 'Repas restaurant',
      fair_price_min: 100,
      fair_price_max: 200,
      tourist_reasonable_min: 120,
      tourist_reasonable_max: 250,
      tips: 'Capitale économique, prix plus élevés'
    },
    train: {
      description: 'Billet de train (Casablanca-Marrakech)',
      fair_price_min: 120,
      fair_price_max: 200,
      tourist_reasonable_min: 150,
      tourist_reasonable_max: 200,
      tips: 'La gare est bien organisée, horaires réguliers'
    }
  },
  
  Agadir: {
    taxi: {
      description: 'Trajet intra-ville',
      fair_price_min: 10,
      fair_price_max: 15,
      tourist_reasonable_min: 15,
      tourist_reasonable_max: 20,
      tips: 'Ville côtière, plus moderne'
    },
    hotel: {
      description: 'Hôtel balnéaire',
      fair_price_min: 300,
      fair_price_max: 600,
      tourist_reasonable_min: 400,
      tourist_reasonable_max: 800,
      tips: 'Destination plage, prix compétitifs'
    },
    restaurant: {
      description: 'Fruits de mer',
      fair_price_min: 80,
      fair_price_max: 150,
      tourist_reasonable_min: 100,
      tourist_reasonable_max: 200,
      tips: 'Spécialité locale: poisson grillé frais'
    },
    excursion: {
      description: 'Excursion Vallée de l\'Argân + plage',
      fair_price_min: 300,
      fair_price_max: 500,
      tourist_reasonable_min: 400,
      tourist_reasonable_max: 650,
      tips: 'Huile d\'argan authentique à acheter'
    },
    bus: {
      description: 'Billet de bus (Agadir-Marrakech)',
      fair_price_min: 100,
      fair_price_max: 150,
      tourist_reasonable_min: 120,
      tourist_reasonable_max: 150,
      tips: 'CTM est la compagnie fiable'
    }
  },
  
  Tanger: {
    taxi: {
      description: 'Trajet intra-ville',
      fair_price_min: 8,
      fair_price_max: 12,
      tourist_reasonable_min: 12,
      tourist_reasonable_max: 18,
      tips: 'Port international, relativement organisé'
    },
    hotel: {
      description: 'Hôtel portuaire',
      fair_price_min: 250,
      fair_price_max: 500,
      tourist_reasonable_min: 350,
      tourist_reasonable_max: 700,
      tips: 'Porte vers l\'Europe, moins touristique que Marrakech'
    },
    restaurant: {
      description: 'Repas traditionnel',
      fair_price_min: 70,
      fair_price_max: 130,
      tourist_reasonable_min: 90,
      tourist_reasonable_max: 160,
      tips: 'Spécialités: fruits de mer, kefta, tajines'
    },
    guide: {
      description: 'Guide touristique',
      fair_price_min: 100,
      fair_price_max: 250,
      tourist_reasonable_min: 150,
      tourist_reasonable_max: 350,
      tips: 'Tanger a une histoire riche à découvrir'
    },
    artisanat: {
      description: 'Cuir, poterie, tissus',
      fair_price_min: 150,
      fair_price_max: 400,
      tourist_reasonable_min: 250,
      tourist_reasonable_max: 600,
      tips: 'Les souks sont moins chers que Marrakech'
    }
  },
  
  Rabat: {
    taxi: {
      description: 'Trajet intra-ville',
      fair_price_min: 10,
      fair_price_max: 15,
      tourist_reasonable_min: 15,
      tourist_reasonable_max: 20,
      tips: 'Capitale administrative, bien organisée'
    },
    hotel: {
      description: 'Hôtel 3-4 étoiles',
      fair_price_min: 350,
      fair_price_max: 700,
      tourist_reasonable_min: 450,
      tourist_reasonable_max: 900,
      tips: 'Moins touristique, plus calme'
    },
    restaurant: {
      description: 'Repas',
      fair_price_min: 80,
      fair_price_max: 150,
      tourist_reasonable_min: 100,
      tourist_reasonable_max: 180,
      tips: 'Capitale, prix moderés'
    },
    guide: {
      description: 'Guide (patrimoine)',
      fair_price_min: 120,
      fair_price_max: 300,
      tourist_reasonable_min: 150,
      tourist_reasonable_max: 400,
      tips: 'Médina et patrimoine à découvrir'
    }
  },

  Ouarzazate: {
    taxi: {
      description: 'Trajet intra-ville',
      fair_price_min: 8,
      fair_price_max: 12,
      tourist_reasonable_min: 12,
      tourist_reasonable_max: 18,
      tips: 'Ville du cinéma, distances modérées'
    },
    hotel: {
      description: 'Hôtel ou guesthouse',
      fair_price_min: 200,
      fair_price_max: 400,
      tourist_reasonable_min: 300,
      tourist_reasonable_max: 600,
      tips: 'Porte du désert, prix très compétitifs'
    },
    restaurant: {
      description: 'Repas',
      fair_price_min: 50,
      fair_price_max: 100,
      tourist_reasonable_min: 70,
      tourist_reasonable_max: 130,
      tips: 'Petite ville, prix raisonnables'
    },
    excursion: {
      description: 'Excursion Vallée du Dades/Todra',
      fair_price_min: 300,
      fair_price_max: 500,
      tourist_reasonable_min: 400,
      tourist_reasonable_max: 700,
      tips: 'Paysages spectaculaires, 1-2h de route'
    },
    guide: {
      description: 'Guide studios/village',
      fair_price_min: 80,
      fair_price_max: 200,
      tourist_reasonable_min: 120,
      tourist_reasonable_max: 300,
      tips: 'Studios de cinéma réputés à visiter'
    },
    artisanat: {
      description: 'Tapis, poterie, bijoux',
      fair_price_min: 150,
      fair_price_max: 400,
      tourist_reasonable_min: 250,
      tourist_reasonable_max: 600,
      tips: 'Artisanat local de qualité'
    }
  },

  Meknès: {
    taxi: {
      description: 'Trajet intra-ville',
      fair_price_min: 8,
      fair_price_max: 12,
      tourist_reasonable_min: 12,
      tourist_reasonable_max: 18,
      tips: 'Ville impériale bien organisée'
    },
    riad: {
      description: 'Nuit dans un riad',
      fair_price_min: 200,
      fair_price_max: 400,
      tourist_reasonable_min: 300,
      tourist_reasonable_max: 600,
      tips: 'Moins cher que Fès et Marrakech'
    },
    restaurant: {
      description: 'Repas',
      fair_price_min: 60,
      fair_price_max: 120,
      tourist_reasonable_min: 80,
      tourist_reasonable_max: 150,
      tips: 'Cuisine rifaine authentique'
    },
    guide: {
      description: 'Guide médina impériale',
      fair_price_min: 120,
      fair_price_max: 280,
      tourist_reasonable_min: 150,
      tourist_reasonable_max: 380,
      tips: 'Médina grande et complexe'
    },
    excursion: {
      description: 'Visite Volubilis + Moulay Idriss',
      fair_price_min: 250,
      fair_price_max: 400,
      tourist_reasonable_min: 350,
      tourist_reasonable_max: 550,
      tips: 'Ruines romaines à proximité'
    }
  },

  Merzouga: {
    taxi: {
      description: 'Trajet intra-village',
      fair_price_min: 5,
      fair_price_max: 10,
      tourist_reasonable_min: 10,
      tourist_reasonable_max: 15,
      tips: 'Petit village du désert'
    },
    guesthouse: {
      description: 'Nuit en guesthouse/riad',
      fair_price_min: 150,
      fair_price_max: 300,
      tourist_reasonable_min: 200,
      tourist_reasonable_max: 500,
      tips: 'Options simples ou luxe disponibles'
    },
    restaurant: {
      description: 'Repas',
      fair_price_min: 40,
      fair_price_max: 80,
      tourist_reasonable_min: 60,
      tourist_reasonable_max: 120,
      tips: 'Petit village, choix limités'
    },
    excursion: {
      description: 'Excursion dunes (chameau, 4x4)',
      fair_price_min: 200,
      fair_price_max: 400,
      tourist_reasonable_min: 300,
      tourist_reasonable_max: 600,
      tips: 'Erg Chebbi, lever/coucher de soleil spectaculaire'
    },
    bivouac: {
      description: 'Nuit en bivouac dans le désert',
      fair_price_min: 200,
      fair_price_max: 350,
      tourist_reasonable_min: 300,
      tourist_reasonable_max: 500,
      tips: 'Expérience authentique, repas inclus'
    }
  },

  Dakhla: {
    taxi: {
      description: 'Trajet intra-ville',
      fair_price_min: 10,
      fair_price_max: 15,
      tourist_reasonable_min: 15,
      tourist_reasonable_max: 20,
      tips: 'Ville côtière au sud, bien organisée'
    },
    hotel: {
      description: 'Hôtel bord de mer',
      fair_price_min: 300,
      fair_price_max: 600,
      tourist_reasonable_min: 400,
      tourist_reasonable_max: 800,
      tips: 'Destination kitesurfing, prix compétitifs'
    },
    restaurant: {
      description: 'Fruits de mer/poisson',
      fair_price_min: 80,
      fair_price_max: 150,
      tourist_reasonable_min: 100,
      tourist_reasonable_max: 200,
      tips: 'Port de pêche actif, poisson frais'
    },
    excursion: {
      description: 'Lagon/Îles Gandaous',
      fair_price_min: 250,
      fair_price_max: 450,
      tourist_reasonable_min: 350,
      tourist_reasonable_max: 600,
      tips: 'Paysages désertiques et maritimes'
    },
    activite: {
      description: 'Kitesurfing leçon (2h)',
      fair_price_min: 250,
      fair_price_max: 450,
      tourist_reasonable_min: 300,
      tourist_reasonable_max: 550,
      tips: 'Spot renommé mondialement'
    }
  },

  'El Jadida': {
    taxi: {
      description: 'Trajet intra-ville',
      fair_price_min: 8,
      fair_price_max: 12,
      tourist_reasonable_min: 12,
      tourist_reasonable_max: 18,
      tips: 'Petite ville côtière, bien organisée'
    },
    hotel: {
      description: 'Hôtel côtier',
      fair_price_min: 250,
      fair_price_max: 500,
      tourist_reasonable_min: 350,
      tourist_reasonable_max: 700,
      tips: 'Destination balnéaire moins chère que Agadir'
    },
    restaurant: {
      description: 'Repas fruits de mer',
      fair_price_min: 70,
      fair_price_max: 130,
      tourist_reasonable_min: 90,
      tourist_reasonable_max: 160,
      tips: 'Spécialité: huîtres et poisson'
    },
    guide: {
      description: 'Guide ville fortifiée',
      fair_price_min: 80,
      fair_price_max: 200,
      tourist_reasonable_min: 120,
      tourist_reasonable_max: 280,
      tips: 'Cité côtière historique'
    },
    excursion: {
      description: 'Plages/Cité portugaise',
      fair_price_min: 150,
      fair_price_max: 300,
      tourist_reasonable_min: 200,
      tourist_reasonable_max: 400,
      tips: 'Architecture historique'
    }
  },

  Essaouira: {
    taxi: {
      description: 'Trajet intra-ville',
      fair_price_min: 10,
      fair_price_max: 15,
      tourist_reasonable_min: 15,
      tourist_reasonable_max: 20,
      tips: 'Port touristique balnéaire'
    },
    hotel: {
      description: 'Hôtel côtier',
      fair_price_min: 300,
      fair_price_max: 600,
      tourist_reasonable_min: 400,
      tourist_reasonable_max: 800,
      tips: 'Destination plage, prix raisonnables'
    },
    restaurant: {
      description: 'Fruits de mer/poisson grillé',
      fair_price_min: 80,
      fair_price_max: 150,
      tourist_reasonable_min: 100,
      tourist_reasonable_max: 200,
      tips: 'Port de pêche actif, poisson excellent'
    },
    guide: {
      description: 'Guide médina/port',
      fair_price_min: 100,
      fair_price_max: 250,
      tourist_reasonable_min: 150,
      tourist_reasonable_max: 350,
      tips: 'Ville bohème, architecture unique'
    },
    excursion: {
      description: 'Visite Îles Purpuraires',
      fair_price_min: 200,
      fair_price_max: 400,
      tourist_reasonable_min: 300,
      tourist_reasonable_max: 500,
      tips: 'Réserve ornithologique'
    },
    artisanat: {
      description: 'Bois thuya, arganeraie',
      fair_price_min: 100,
      fair_price_max: 350,
      tourist_reasonable_min: 150,
      tourist_reasonable_max: 500,
      tips: 'Bois thuya rare et travaillé localement'
    }
  }
};

export function getPricingInfo(city, category) {
  if (!PRICING_KNOWLEDGE_BASE[city]) {
    return null;
  }
  return PRICING_KNOWLEDGE_BASE[city][category] || null;
}

export function formatPricingPrompt(city, category) {
  const info = getPricingInfo(city, category);
  if (!info) {
    return `Pour ${city} - ${category}: aucune donnée spécifique disponible. Utiliser des prix de référence régionaux.`;
  }
  return `
Pour ${city} - ${category} (${info.description}):
- Prix juste local: ${info.fair_price_min}-${info.fair_price_max} MAD
- Prix raisonnable pour touriste: ${info.tourist_reasonable_min}-${info.tourist_reasonable_max} MAD
- Conseil: ${info.tips}
  `.trim();
}

export function getAllCitiesPricingContext() {
  let context = 'BASE DE CONNAISSANCES ENEGOSHIELD AI:\n\n';
  for (const [city, categories] of Object.entries(PRICING_KNOWLEDGE_BASE)) {
    context += `${city}:\n`;
    for (const [category, info] of Object.entries(categories)) {
      context += `  - ${category} (${info.description}): ${info.fair_price_min}-${info.fair_price_max} MAD (juste), ${info.tourist_reasonable_min}-${info.tourist_reasonable_max} MAD (raisonnable)\n`;
    }
    context += '\n';
  }
  return context;
}