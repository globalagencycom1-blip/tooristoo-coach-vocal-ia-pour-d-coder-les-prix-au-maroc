// BASE DE CONNAISSANCES DES PRIX — Tooristoo
// Mise à jour: Avril 2026 — Sources: ONMT, recherche documentaire publique, plateformes officielles
// Mise à jour hebdomadaire automatique via les rapports de la communauté

import { base44 } from '@/api/base44Client';

export const PRICING_LAST_UPDATED = '2026-04-30';

export const PRICING_KNOWLEDGE_BASE = {
  Marrakech: {
    taxi: {
      description: 'Petit taxi intra-ville (compteur)',
      fair_price_min: 10,
      fair_price_max: 15,
      tourist_reasonable_min: 15,
      tourist_reasonable_max: 20,
      airport_min: 70,
      airport_max: 100,
      tips: 'Insister sur le compteur. Trajet aéroport: 70-100 DH officiel. Prix nuit majorés 50%.',
      vigilance_threshold: 40,
      updated: '2026-04-30'
    },
    grand_taxi: {
      description: 'Grand taxi longue distance',
      fair_price_min: 200,
      fair_price_max: 500,
      tourist_reasonable_min: 300,
      tourist_reasonable_max: 700,
      tips: 'Toujours négocier le prix avant le départ. Préférer CTM pour les longues distances.',
      vigilance_threshold: 800,
      updated: '2026-04-30'
    },
    riad: {
      description: 'Nuit dans un riad traditionnel (2 personnes)',
      fair_price_min: 300,
      fair_price_max: 600,
      tourist_reasonable_min: 400,
      tourist_reasonable_max: 900,
      luxury_min: 1000,
      luxury_max: 3000,
      tips: 'Réserver via booking.com pour comparer. Petit-déjeuner souvent inclus. Éviter les démarcheurs en rue.',
      vigilance_threshold: 1500,
      updated: '2026-04-30'
    },
    hotel: {
      description: 'Hôtel 3-4 étoiles (Guéliz/Hivernage)',
      fair_price_min: 350,
      fair_price_max: 700,
      tourist_reasonable_min: 500,
      tourist_reasonable_max: 1000,
      tips: 'Prix officiels sur booking.com. Ne pas payer sans réservation confirmée.',
      vigilance_threshold: 1200,
      updated: '2026-04-30'
    },
    restaurant: {
      description: 'Repas complet (entrée + plat + boisson)',
      fair_price_min: 60,
      fair_price_max: 120,
      tourist_reasonable_min: 90,
      tourist_reasonable_max: 180,
      gastronomic_min: 200,
      gastronomic_max: 400,
      tips: 'Éviter restaurants avec rabatteurs à Jemaa El Fna. Demander la carte avec prix avant de s\'asseoir.',
      vigilance_threshold: 300,
      updated: '2026-04-30'
    },
    guide: {
      description: 'Guide officiel certifié (demi-journée)',
      fair_price_min: 200,
      fair_price_max: 350,
      tourist_reasonable_min: 250,
      tourist_reasonable_max: 450,
      full_day_min: 400,
      full_day_max: 700,
      tips: 'Exiger la carte officielle du guide agréé ONMT. Ne jamais suivre un guide non sollicité.',
      vigilance_threshold: 800,
      updated: '2026-04-30'
    },
    excursion: {
      description: 'Excursion journée (Atlas, Ourika, Ouzoud)',
      fair_price_min: 250,
      fair_price_max: 450,
      tourist_reasonable_min: 350,
      tourist_reasonable_max: 600,
      desert_min: 500,
      desert_max: 900,
      tips: 'Vérifier si transport, repas et guide sont inclus. Agences référencées Marrakech Médina.',
      vigilance_threshold: 1000,
      updated: '2026-04-30'
    },
    shopping: {
      description: 'Artisanat (tapis, cuir, céramique)',
      fair_price_min: 50,
      fair_price_max: 500,
      tourist_reasonable_min: 80,
      tourist_reasonable_max: 700,
      tips: 'Négocier 30-50% sur le premier prix. Coopératives: prix fixes honnêtes. Safran: 50-100 DH/g certifié.',
      vigilance_threshold: 2000,
      updated: '2026-04-30'
    },
    spa: {
      description: 'Hammam/Massage traditionnel (1h30)',
      fair_price_min: 80,
      fair_price_max: 150,
      tourist_reasonable_min: 120,
      tourist_reasonable_max: 250,
      luxury_min: 300,
      luxury_max: 600,
      tips: 'Demander le prix complet avant. Pourboire 20-30 DH apprécié pour le kessala.',
      vigilance_threshold: 400,
      updated: '2026-04-30'
    },
    montgolfiere: {
      description: 'Vol en montgolfière (lever soleil)',
      fair_price_min: 1200,
      fair_price_max: 1800,
      tourist_reasonable_min: 1400,
      tourist_reasonable_max: 2000,
      tips: 'Prix tout compris (transport+champagne+certificat). Réserver directement chez l\'opérateur certifié.',
      vigilance_threshold: 2500,
      updated: '2026-04-30'
    },
    transport: {
      description: 'Bus CTM / Supratours (Marrakech-autres villes)',
      fair_price_min: 80,
      fair_price_max: 200,
      tourist_reasonable_min: 90,
      tourist_reasonable_max: 200,
      tips: 'Prix fixe officiel. Acheter en ligne ou à la gare. Pas de négociation.',
      vigilance_threshold: 250,
      updated: '2026-04-30'
    }
  },

  Fès: {
    taxi: {
      description: 'Petit taxi intra-ville',
      fair_price_min: 8,
      fair_price_max: 12,
      tourist_reasonable_min: 10,
      tourist_reasonable_max: 18,
      airport_min: 60,
      airport_max: 90,
      tips: 'Compteur obligatoire. Fès El Bali très labyrinthique, taxis utiles. Prix nuit +50%.',
      vigilance_threshold: 35,
      updated: '2026-04-30'
    },
    riad: {
      description: 'Nuit dans un riad médina',
      fair_price_min: 250,
      fair_price_max: 500,
      tourist_reasonable_min: 350,
      tourist_reasonable_max: 700,
      tips: 'Fès moins cher que Marrakech. Inclure petit-déjeuner dans la négociation.',
      vigilance_threshold: 1000,
      updated: '2026-04-30'
    },
    hotel: {
      description: 'Hôtel Ville Nouvelle',
      fair_price_min: 300,
      fair_price_max: 600,
      tourist_reasonable_min: 400,
      tourist_reasonable_max: 800,
      tips: 'Ville Nouvelle plus moderne et calme. Prix officiels sur les plateformes.',
      updated: '2026-04-30'
    },
    restaurant: {
      description: 'Repas traditionnel fassi',
      fair_price_min: 50,
      fair_price_max: 100,
      tourist_reasonable_min: 70,
      tourist_reasonable_max: 150,
      tips: 'La cuisine fassi est réputée. Petit restaurants locaux: excellents et 40-80 DH.',
      vigilance_threshold: 250,
      updated: '2026-04-30'
    },
    guide: {
      description: 'Guide officiel médina de Fès',
      fair_price_min: 150,
      fair_price_max: 300,
      tourist_reasonable_min: 200,
      tourist_reasonable_max: 400,
      tips: 'Guide INDISPENSABLE pour Fès El Bali. Carte officielle obligatoire. Vérifier l\'accréditation.',
      vigilance_threshold: 600,
      updated: '2026-04-30'
    },
    shopping: {
      description: 'Cuir, zellige, broderie fassi',
      fair_price_min: 100,
      fair_price_max: 800,
      tourist_reasonable_min: 150,
      tourist_reasonable_max: 1200,
      tips: 'Cuir de Fès: qualité réputée mondiale. Tanneries: acheter directement. Zellige: coopératives.',
      vigilance_threshold: 2000,
      updated: '2026-04-30'
    },
    excursion: {
      description: 'Excursion Volubilis + Meknès',
      fair_price_min: 350,
      fair_price_max: 600,
      tourist_reasonable_min: 450,
      tourist_reasonable_max: 800,
      tips: '1h de route. Inclure entrée Volubilis (70 DH). Repas sur place ~80 DH.',
      vigilance_threshold: 1000,
      updated: '2026-04-30'
    },
    spa: {
      description: 'Hammam traditionnel Fès',
      fair_price_min: 40,
      fair_price_max: 100,
      tourist_reasonable_min: 60,
      tourist_reasonable_max: 150,
      tips: 'Hammams populaires locaux: 15-30 DH. Hammams touristiques: 80-200 DH avec gommage.',
      updated: '2026-04-30'
    }
  },

  Chefchaouen: {
    taxi: {
      description: 'Trajet intra-ville (petite ville)',
      fair_price_min: 5,
      fair_price_max: 10,
      tourist_reasonable_min: 8,
      tourist_reasonable_max: 15,
      tips: 'Petite ville, tout est accessible à pied. Taxi vers la gare routière: 10-15 DH.',
      vigilance_threshold: 30,
      updated: '2026-04-30'
    },
    riad: {
      description: 'Nuit dans un riad bleu',
      fair_price_min: 180,
      fair_price_max: 380,
      tourist_reasonable_min: 250,
      tourist_reasonable_max: 500,
      tips: 'Destination moins chère. Petits riads familiaux très accueillants.',
      vigilance_threshold: 800,
      updated: '2026-04-30'
    },
    restaurant: {
      description: 'Repas (spécialités rifaines)',
      fair_price_min: 40,
      fair_price_max: 90,
      tourist_reasonable_min: 60,
      tourist_reasonable_max: 120,
      tips: 'Restaurants terrasses dans la médina bleue. Kefta, msemen, fromage local.',
      vigilance_threshold: 180,
      updated: '2026-04-30'
    },
    guide: {
      description: 'Guide randonnée Rif + médina',
      fair_price_min: 100,
      fair_price_max: 220,
      tourist_reasonable_min: 150,
      tourist_reasonable_max: 300,
      tips: 'Randonnées: Jbel El Kelaa, Cascades Ras El Ma. Guides locaux compétents.',
      updated: '2026-04-30'
    },
    excursion: {
      description: 'Randonnée demi-journée',
      fair_price_min: 120,
      fair_price_max: 250,
      tourist_reasonable_min: 180,
      tourist_reasonable_max: 350,
      tips: 'Forêt de cèdres, cascades. Inclure repas local dans la négociation.',
      updated: '2026-04-30'
    },
    shopping: {
      description: 'Artisanat (laine, cuir, épices)',
      fair_price_min: 30,
      fair_price_max: 300,
      tourist_reasonable_min: 50,
      tourist_reasonable_max: 450,
      tips: 'Tapis rifains de qualité. Fromage de chèvre local: 30-60 DH. Épices: prix fixes.',
      updated: '2026-04-30'
    }
  },

  Casablanca: {
    taxi: {
      description: 'Petit taxi intra-ville (compteur)',
      fair_price_min: 12,
      fair_price_max: 20,
      tourist_reasonable_min: 15,
      tourist_reasonable_max: 30,
      airport_min: 100,
      airport_max: 150,
      tips: 'Grands taxis aller/retour à négocier. Tramway: 7 DH fixe. Bus: 4 DH.',
      vigilance_threshold: 50,
      updated: '2026-04-30'
    },
    hotel: {
      description: 'Hôtel d\'affaires 3-4 étoiles',
      fair_price_min: 400,
      fair_price_max: 900,
      tourist_reasonable_min: 500,
      tourist_reasonable_max: 1200,
      tips: 'Capitale économique. Quartiers: Maarif, Corniche, CFC pour les affaires.',
      vigilance_threshold: 1500,
      updated: '2026-04-30'
    },
    restaurant: {
      description: 'Restaurant (ambiance moderne)',
      fair_price_min: 90,
      fair_price_max: 180,
      tourist_reasonable_min: 120,
      tourist_reasonable_max: 250,
      seafood_min: 150,
      seafood_max: 350,
      tips: 'Corniche: fruits de mer frais. Quartier Maarif: restaurants variés. Vérifier les prix avant de s\'asseoir.',
      vigilance_threshold: 400,
      updated: '2026-04-30'
    },
    guide: {
      description: 'Guide ville (Hassan II, Habous)',
      fair_price_min: 150,
      fair_price_max: 300,
      tourist_reasonable_min: 200,
      tourist_reasonable_max: 400,
      tips: 'Mosquée Hassan II: visite guidée officielle 120 DH. Quartier Habous intéressant.',
      updated: '2026-04-30'
    },
    transport: {
      description: 'Train ONCF (Casa-autres villes)',
      fair_price_min: 80,
      fair_price_max: 200,
      tourist_reasonable_min: 90,
      tourist_reasonable_max: 200,
      tips: 'Train Casa-Marrakech: 120-200 DH. Casa-Rabat: 40-80 DH. Réserver en ligne.',
      vigilance_threshold: 250,
      updated: '2026-04-30'
    },
    excursion: {
      description: 'Excursion côte Atlantique',
      fair_price_min: 200,
      fair_price_max: 400,
      tourist_reasonable_min: 300,
      tourist_reasonable_max: 500,
      tips: 'El Jadida et Azemmour à 1h. Asilah à 2h.',
      updated: '2026-04-30'
    }
  },

  Agadir: {
    taxi: {
      description: 'Petit taxi intra-ville',
      fair_price_min: 10,
      fair_price_max: 15,
      tourist_reasonable_min: 15,
      tourist_reasonable_max: 25,
      airport_min: 80,
      airport_max: 120,
      tips: 'Ville organisée et moderne. Compteur obligatoire. Comparer avec les transferts hôteliers.',
      vigilance_threshold: 50,
      updated: '2026-04-30'
    },
    hotel: {
      description: 'Hôtel balnéaire (bord de mer)',
      fair_price_min: 280,
      fair_price_max: 600,
      tourist_reasonable_min: 400,
      tourist_reasonable_max: 900,
      tips: 'Vaste offre hôtelière compétitive. Corniche bien aménagée. Comparer sur booking.com.',
      vigilance_threshold: 1200,
      updated: '2026-04-30'
    },
    restaurant: {
      description: 'Restaurant fruits de mer/poisson',
      fair_price_min: 70,
      fair_price_max: 140,
      tourist_reasonable_min: 100,
      tourist_reasonable_max: 200,
      tips: 'Port de pêche actif: poisson du jour. Marché municipal: poisson à 30-80 DH/kg.',
      vigilance_threshold: 300,
      updated: '2026-04-30'
    },
    excursion: {
      description: 'Excursion Souss + Arganiers',
      fair_price_min: 250,
      fair_price_max: 450,
      tourist_reasonable_min: 350,
      tourist_reasonable_max: 600,
      tips: 'Tiznit à 90km. Vallée du Souss. Huile d\'argan authentique en coopérative (60-120 DH/100ml).',
      vigilance_threshold: 800,
      updated: '2026-04-30'
    },
    shopping: {
      description: 'Souk artisanat + argan',
      fair_price_min: 30,
      fair_price_max: 400,
      tourist_reasonable_min: 50,
      tourist_reasonable_max: 600,
      tips: 'Souk El Had: vaste et animé. Argan bio coopérative: prix officiels. Bijoux berbères.',
      updated: '2026-04-30'
    },
    spa: {
      description: 'Thalasso / Hammam balnéaire',
      fair_price_min: 150,
      fair_price_max: 350,
      tourist_reasonable_min: 200,
      tourist_reasonable_max: 500,
      tips: 'Nombreux centres thalasso sur la Corniche. Tarifs affichés. Comparer plusieurs.',
      updated: '2026-04-30'
    },
    transport: {
      description: 'Bus CTM Agadir-Marrakech',
      fair_price_min: 100,
      fair_price_max: 150,
      tourist_reasonable_min: 110,
      tourist_reasonable_max: 150,
      tips: '3h30 de route. CTM fiable. Départs fréquents.',
      updated: '2026-04-30'
    }
  },

  Tanger: {
    taxi: {
      description: 'Petit taxi intra-ville',
      fair_price_min: 8,
      fair_price_max: 12,
      tourist_reasonable_min: 12,
      tourist_reasonable_max: 20,
      port_min: 30,
      port_max: 60,
      tips: 'Port international: rester vigilant à l\'arrivée du ferry. Négocier avant de monter.',
      vigilance_threshold: 40,
      updated: '2026-04-30'
    },
    hotel: {
      description: 'Hôtel (Médina / Ville Nouvelle)',
      fair_price_min: 200,
      fair_price_max: 500,
      tourist_reasonable_min: 300,
      tourist_reasonable_max: 700,
      tips: 'Hôtels Ville Nouvelle plus modernes. Médina: charme authentique mais plus basique.',
      vigilance_threshold: 900,
      updated: '2026-04-30'
    },
    restaurant: {
      description: 'Repas (fruits de mer, menthe)',
      fair_price_min: 60,
      fair_price_max: 120,
      tourist_reasonable_min: 80,
      tourist_reasonable_max: 170,
      tips: 'Pâtisseries marocaines excellentes. Thé à la menthe: 8-15 DH. Poisson du détroit.',
      vigilance_threshold: 250,
      updated: '2026-04-30'
    },
    guide: {
      description: 'Guide Kasbah + Médina Tanger',
      fair_price_min: 100,
      fair_price_max: 250,
      tourist_reasonable_min: 150,
      tourist_reasonable_max: 350,
      tips: 'Kasbah, Cap Spartel, Grottes d\'Hercule. Histoire riche Franco-hispanique.',
      updated: '2026-04-30'
    },
    excursion: {
      description: 'Excursion Asilah / Cap Spartel',
      fair_price_min: 200,
      fair_price_max: 400,
      tourist_reasonable_min: 280,
      tourist_reasonable_max: 500,
      tips: 'Asilah 45km: ville d\'art murale. Cap Spartel: vue détroit de Gibraltar.',
      updated: '2026-04-30'
    },
    shopping: {
      description: 'Artisanat médina Tanger',
      fair_price_min: 50,
      fair_price_max: 400,
      tourist_reasonable_min: 80,
      tourist_reasonable_max: 600,
      tips: 'Babouches, cuir, épices. Moins cher que Marrakech. Négocier 30-40%.',
      updated: '2026-04-30'
    }
  },

  Rabat: {
    taxi: {
      description: 'Petit taxi Rabat (Capitale)',
      fair_price_min: 10,
      fair_price_max: 15,
      tourist_reasonable_min: 15,
      tourist_reasonable_max: 22,
      airport_min: 80,
      airport_max: 120,
      tips: 'Tramway moderne (7 DH) très pratique. Capitale bien organisée. Compteur obligatoire.',
      vigilance_threshold: 40,
      updated: '2026-04-30'
    },
    hotel: {
      description: 'Hôtel Capitale 3-4 étoiles',
      fair_price_min: 300,
      fair_price_max: 700,
      tourist_reasonable_min: 400,
      tourist_reasonable_max: 900,
      tips: 'Agdal et Hassan pour les hôtels d\'affaires. Médina pour l\'authenticité.',
      updated: '2026-04-30'
    },
    restaurant: {
      description: 'Repas Rabat',
      fair_price_min: 70,
      fair_price_max: 150,
      tourist_reasonable_min: 90,
      tourist_reasonable_max: 200,
      tips: 'Quartier Hassan et Agdal: bons restaurants modernes. Médina: couscous authentique.',
      vigilance_threshold: 300,
      updated: '2026-04-30'
    },
    guide: {
      description: 'Guide Sites Royaux Rabat',
      fair_price_min: 120,
      fair_price_max: 280,
      tourist_reasonable_min: 150,
      tourist_reasonable_max: 380,
      tips: 'Tour Hassan, Mausolée Mohammed V, Kasbah Oudayas, Chellah. Journée complète ~400 DH.',
      updated: '2026-04-30'
    },
    excursion: {
      description: 'Excursion Salé + Chellah',
      fair_price_min: 150,
      fair_price_max: 300,
      tourist_reasonable_min: 200,
      tourist_reasonable_max: 400,
      tips: 'Salé en face de Rabat (Bou Regreg). Chellah: ruines romaines + cigognes.',
      updated: '2026-04-30'
    }
  },

  Ouarzazate: {
    taxi: {
      description: 'Taxi Ouarzazate (Ville du Cinéma)',
      fair_price_min: 8,
      fair_price_max: 12,
      tourist_reasonable_min: 12,
      tourist_reasonable_max: 20,
      tips: 'Petite ville. Grand taxis pour excursions: négocier ferme.',
      vigilance_threshold: 35,
      updated: '2026-04-30'
    },
    hotel: {
      description: 'Hôtel / Guesthouse Ouarzazate',
      fair_price_min: 180,
      fair_price_max: 400,
      tourist_reasonable_min: 280,
      tourist_reasonable_max: 600,
      tips: 'Porte du désert, prix très compétitifs. Belle offre de kasbahs reconverties.',
      updated: '2026-04-30'
    },
    restaurant: {
      description: 'Repas (tajine, couscous)',
      fair_price_min: 45,
      fair_price_max: 90,
      tourist_reasonable_min: 65,
      tourist_reasonable_max: 130,
      tips: 'Petite ville calme. Restaurants en terrasse avec vue Atlas.',
      vigilance_threshold: 180,
      updated: '2026-04-30'
    },
    excursion: {
      description: 'Excursion Vallée Dades/Gorges Todra',
      fair_price_min: 280,
      fair_price_max: 500,
      tourist_reasonable_min: 380,
      tourist_reasonable_max: 700,
      tips: 'Paysages spectaculaires. Aït Benhaddou (UNESCO): 30 min. Entrée: 20 DH.',
      vigilance_threshold: 900,
      updated: '2026-04-30'
    },
    guide: {
      description: 'Guide Studios Cinéma + Kasbah',
      fair_price_min: 80,
      fair_price_max: 200,
      tourist_reasonable_min: 120,
      tourist_reasonable_max: 300,
      tips: 'Studios Atlas: entrée 130 DH. Kasbah Taourirt: entrée 30 DH.',
      updated: '2026-04-30'
    },
    shopping: {
      description: 'Artisanat kasbahs (tapis, bijoux)',
      fair_price_min: 100,
      fair_price_max: 500,
      tourist_reasonable_min: 150,
      tourist_reasonable_max: 700,
      tips: 'Tapis berbères de qualité. Bijoux touaregs. Négocier 30-40%.',
      updated: '2026-04-30'
    }
  },

  Meknès: {
    taxi: {
      description: 'Taxi Meknès (Ville Impériale)',
      fair_price_min: 8,
      fair_price_max: 12,
      tourist_reasonable_min: 10,
      tourist_reasonable_max: 18,
      tips: 'Ville impériale moins touristique. Tarifs compétitifs. Compteur conseillé.',
      vigilance_threshold: 30,
      updated: '2026-04-30'
    },
    riad: {
      description: 'Nuit riad / maison d\'hôtes Meknès',
      fair_price_min: 180,
      fair_price_max: 380,
      tourist_reasonable_min: 250,
      tourist_reasonable_max: 550,
      tips: 'Moins cher que Fès et Marrakech pour qualité équivalente.',
      updated: '2026-04-30'
    },
    restaurant: {
      description: 'Repas Meknès (cuisine rifaine)',
      fair_price_min: 50,
      fair_price_max: 100,
      tourist_reasonable_min: 70,
      tourist_reasonable_max: 140,
      tips: 'Meknès connue pour ses olives et vins. Restaurant place Lahdim: vue sur porte Bab Mansour.',
      vigilance_threshold: 200,
      updated: '2026-04-30'
    },
    guide: {
      description: 'Guide Médina Impériale Meknès',
      fair_price_min: 120,
      fair_price_max: 260,
      tourist_reasonable_min: 150,
      tourist_reasonable_max: 360,
      tips: 'Bab El Mansour, Mausolée Moulay Ismail, Hri Souani. Médina plus facile que Fès.',
      updated: '2026-04-30'
    },
    excursion: {
      description: 'Visite Volubilis + Moulay Idriss',
      fair_price_min: 220,
      fair_price_max: 380,
      tourist_reasonable_min: 300,
      tourist_reasonable_max: 520,
      tips: 'Volubilis (UNESCO): 30 min, entrée 70 DH. Moulay Idriss: ville sainte, gratuit.',
      updated: '2026-04-30'
    }
  },

  Merzouga: {
    taxi: {
      description: 'Taxi/transfert Merzouga',
      fair_price_min: 5,
      fair_price_max: 10,
      tourist_reasonable_min: 10,
      tourist_reasonable_max: 20,
      tips: 'Village du désert. Grand taxi depuis Errachidia: 60-100 DH.',
      updated: '2026-04-30'
    },
    guesthouse: {
      description: 'Guesthouse / Riad Sahara',
      fair_price_min: 150,
      fair_price_max: 300,
      tourist_reasonable_min: 200,
      tourist_reasonable_max: 500,
      tips: 'Options simples (150 DH) ou luxe (500+ DH). Inclure demi-pension dans la négociation.',
      updated: '2026-04-30'
    },
    restaurant: {
      description: 'Repas Merzouga',
      fair_price_min: 35,
      fair_price_max: 80,
      tourist_reasonable_min: 50,
      tourist_reasonable_max: 120,
      tips: 'Choix limité. Tajine berbère: 50-80 DH. Couscous vendredi: spécialité.',
      updated: '2026-04-30'
    },
    excursion: {
      description: 'Excursion dunes Erg Chebbi (chameau+coucher soleil)',
      fair_price_min: 180,
      fair_price_max: 350,
      tourist_reasonable_min: 250,
      tourist_reasonable_max: 500,
      tips: 'Lever/coucher soleil: expérience sublime. 4x4: 300-500 DH. Chameau 1h: 150-200 DH.',
      vigilance_threshold: 700,
      updated: '2026-04-30'
    },
    bivouac: {
      description: 'Nuit en bivouac dans les dunes (tout compris)',
      fair_price_min: 200,
      fair_price_max: 400,
      tourist_reasonable_min: 300,
      tourist_reasonable_max: 600,
      tips: 'Inclure dîner berbère + musique gnaoua + petit-déjeuner. Comparer plusieurs camps.',
      vigilance_threshold: 800,
      updated: '2026-04-30'
    }
  },

  Dakhla: {
    taxi: {
      description: 'Taxi Dakhla (Sahara Atlantique)',
      fair_price_min: 10,
      fair_price_max: 15,
      tourist_reasonable_min: 15,
      tourist_reasonable_max: 25,
      tips: 'Ville s\'étendant sur une péninsule. Distances parfois grandes.',
      updated: '2026-04-30'
    },
    hotel: {
      description: 'Hôtel bord de lagon',
      fair_price_min: 280,
      fair_price_max: 600,
      tourist_reasonable_min: 380,
      tourist_reasonable_max: 800,
      tips: 'Destination kitesurfing en plein essor. Réserver à l\'avance en haute saison (nov-avr).',
      updated: '2026-04-30'
    },
    restaurant: {
      description: 'Restaurant fruits de mer (port actif)',
      fair_price_min: 70,
      fair_price_max: 140,
      tourist_reasonable_min: 100,
      tourist_reasonable_max: 200,
      tips: 'Port de pêche majeur. Homard, poulpe, daurade à prix imbattables directement au port.',
      updated: '2026-04-30'
    },
    excursion: {
      description: 'Lagon + Îles Gandaous + Stand-up paddle',
      fair_price_min: 220,
      fair_price_max: 420,
      tourist_reasonable_min: 320,
      tourist_reasonable_max: 580,
      tips: 'Eaux turquoise du lagon. Flamants roses. Organiser via hôtel ou camp kite.',
      updated: '2026-04-30'
    },
    activite: {
      description: 'Kitesurf leçon (2-3h)',
      fair_price_min: 250,
      fair_price_max: 450,
      tourist_reasonable_min: 300,
      tourist_reasonable_max: 550,
      tips: 'Spot classé parmi les meilleurs mondiaux. Plusieurs écoles certifiées IKO.',
      updated: '2026-04-30'
    }
  },

  'El Jadida': {
    taxi: {
      description: 'Taxi El Jadida (Côte Atlantique)',
      fair_price_min: 8,
      fair_price_max: 12,
      tourist_reasonable_min: 12,
      tourist_reasonable_max: 18,
      tips: 'Petite ville côtière. Distances courtes dans le centre.',
      updated: '2026-04-30'
    },
    hotel: {
      description: 'Hôtel côtier El Jadida',
      fair_price_min: 220,
      fair_price_max: 480,
      tourist_reasonable_min: 320,
      tourist_reasonable_max: 650,
      tips: 'Moins cher qu\'Agadir pour plage similaire. Citerne Portugaise (UNESCO) à visiter.',
      updated: '2026-04-30'
    },
    restaurant: {
      description: 'Restaurant fruits de mer / huîtres',
      fair_price_min: 60,
      fair_price_max: 120,
      tourist_reasonable_min: 80,
      tourist_reasonable_max: 160,
      tips: 'Huîtres de Oualidia: spécialité régionale, 50-100 DH la douzaine. Poisson frais port.',
      updated: '2026-04-30'
    },
    guide: {
      description: 'Guide Cité Portugaise UNESCO',
      fair_price_min: 80,
      fair_price_max: 180,
      tourist_reasonable_min: 120,
      tourist_reasonable_max: 260,
      tips: 'Citerne Portugaise: 10 DH entrée. Remparts et bastions historiques.',
      updated: '2026-04-30'
    }
  },

  Essaouira: {
    taxi: {
      description: 'Taxi Essaouira (Cité des Alizés)',
      fair_price_min: 10,
      fair_price_max: 15,
      tourist_reasonable_min: 15,
      tourist_reasonable_max: 22,
      tips: 'Petite ville pittoresque. Remparts accessibles à pied. Calèches: 50-80 DH/h.',
      updated: '2026-04-30'
    },
    hotel: {
      description: 'Hôtel / Riad Essaouira',
      fair_price_min: 270,
      fair_price_max: 550,
      tourist_reasonable_min: 380,
      tourist_reasonable_max: 750,
      tips: 'Ville du vent. Réserver à l\'avance pour Gnaoua Festival (juin). Prix doublent en festival.',
      updated: '2026-04-30'
    },
    restaurant: {
      description: 'Poisson grillé / fruits de mer port',
      fair_price_min: 70,
      fair_price_max: 130,
      tourist_reasonable_min: 90,
      tourist_reasonable_max: 180,
      tips: 'Port de pêche actif. Grillades sur le port: 60-100 DH repas complet. Excellent rapport qualité/prix.',
      vigilance_threshold: 280,
      updated: '2026-04-30'
    },
    guide: {
      description: 'Guide Médina + Remparts Essaouira',
      fair_price_min: 100,
      fair_price_max: 230,
      tourist_reasonable_min: 150,
      tourist_reasonable_max: 320,
      tips: 'Skala de la ville: vue mer gratuite. Médina UNESCO. Ville bohème et artistique.',
      updated: '2026-04-30'
    },
    shopping: {
      description: 'Bois de thuya + artisanat local',
      fair_price_min: 80,
      fair_price_max: 400,
      tourist_reasonable_min: 120,
      tourist_reasonable_max: 600,
      tips: 'Thuya: bois rare local sculpté. Coopératives de femmes argan: prix officiels.',
      updated: '2026-04-30'
    },
    excursion: {
      description: 'Excursion îles Purpuraires + plage',
      fair_price_min: 180,
      fair_price_max: 350,
      tourist_reasonable_min: 250,
      tourist_reasonable_max: 480,
      tips: 'Îles ornithologiques (balbuzards). Plage immense: windsurf et kite.',
      updated: '2026-04-30'
    }
  }
};

// Mots-clés interdits — toutes les langues supportées
// Tooristoo refuse toute analyse pour des services illégaux ou contraires à la loi marocaine
export const PROHIBITED_KEYWORDS = {
  fr: [
    'prostitution', 'escort', 'call girl', 'services sexuels', 'sexe tarifé',
    'fille facile', 'pute', 'travailleuse du sexe',
    'drogue', 'cannabis', 'cocaïne', 'hashish', 'haschich', 'kif', 'shit', 'beuh',
    'armes', 'explosif',
    'traite humain', 'traite humaine', 'passeur',
    'blanchiment', 'faux billet', 'contrefaçon', 'esclave',
    'corruption', 'pot-de-vin','escort girl', 'massage érotique', 'massage sensuel', 'massage avec finition',
    'plan cul', 'rdv tarifé', 'rdv discret', 'prestations adultes',
    'maison close', 'bordel', 'proxénétisme', 'proxénète',
    'stupéfiants', 'produits stupéfiants', 'dealer', 'deal', 'trafic de drogue',
    'ecstasy', 'mdma', 'lsd', 'amphétamine', 'crack',
    'kalachnikov', 'pistolet', 'fusil', 'munition', 'arme à feu',
    'trafic d’êtres humains', 'réseau de passeurs', 'migration clandestine',
    'fraude', 'escroquerie', 'arnaque', 'faux documents', 'faux papiers',
    'usurpation', 'usurpation d’identité',
    'corrompre', 'commission occulte', 'dessous-de-table'
  ],
  en: [
    'prostitution', 'escort', 'call girl', 'sex service', 'sexual service', 'sex worker',
    'prostitute', 'whore', 'hooker',
    'drug', 'cocaine', 'cannabis', 'hashish', 'weed', 'marijuana', 'heroin',
    'weapon', 'explosive',
    'human trafficking', 'smuggling',
    'money laundering', 'fake bill', 'counterfeit', 'slave',
    'bribe', 'bribery','adult services', 'erotic massage', 'sensual massage', 'happy ending',
    'paid sex', 'sex for money', 'brothel', 'pimp', 'pimping',
    'drug dealing', 'drug trafficking', 'dealer', 'ecstasy', 'mdma', 'lsd','amphetamine', 'crack cocaine',
    'gun', 'firearm', 'pistol', 'rifle', 'ammo', 'ammunition',
    'illegal immigration', 'people smuggler', 'smuggler network',
    'scam', 'fraud', 'identity theft', 'fake documents', 'forged documents',
    'kickback', 'under the table payment'
  ],
  es: [
    'prostitución', 'escort', 'servicios sexuales',
    'droga', 'cocaína', 'cannabis', 'hachís',
    'puta',
    'arma', 'explosivo',
    'tráfico humano', 'lavado dinero', 'billete falso', 'contrafacción',
    'soborno','servicios para adultos', 'masaje erótico', 'final feliz',
    'sexo pagado', 'burdel', 'proxeneta',
    'tráfico de drogas', 'traficante', 'éxtasis', 'mdma', 'lsd',
    'anfetamina', 'crack',
    'pistola', 'arma de fuego', 'munición',
    'inmigración ilegal', 'traficante de personas',
    'estafa', 'fraude', 'documentos falsos', 'robo de identidad',
    'pago ilegal', 'comisión ilegal'
  ],
  de: [
    'prostitution', 'escort', 'sexuelle dienstleistungen',
    'droge', 'kokain', 'cannabis', 'haschisch',
    'hure',
    'waffe', 'sprengstoff',
    'menschenhandel', 'geldwäsche', 'falschgeld', 'fälschung',
    'bestechung','erotische massage', 'happy end massage', 'bezahlter sex',
    'bordell', 'zuhälter',
    'drogenhandel', 'dealer', 'ecstasy', 'mdma', 'lsd',
    'amphetamin', 'crack',
    'schusswaffe', 'pistole', 'gewehr', 'munition',
    'illegale einwanderung', 'schleuser', 'schleusernetzwerk',
    'betrug', 'identitätsdiebstahl', 'gefälschte dokumente',
    'schmiergeld', 'illegale zahlung'
  ],
  ar: [
    'دعارة', 'بغاء', 'عاهرة', 'خدمات جنسية', 'مخدرات', 'كوكايين', 'حشيش', 'قنب', 'أسلحة', 'متفجرات', 'اتجار بالبشر', 'تهريب', 'غسيل أموال', 'تزوير', 'رقيق', 'رشوة', 'دعارة سرية', 'جنس مقابل المال', 'تدليك إيروتيكي', 'بيت دعارة', 'قواد','تجارة المخدرات', 'مروج مخدرات', 'إكستازي', 'إم دي إم إيه', 'إل إس دي','مسدس', 'بندقية', 'ذخيرة', 'سلاح ناري','هجرة غير شرعية', 'مهرب بشر','احتيال', 'نصب', 'سرقة هوية', 'وثائق مزورة','رشوة مالية', 'دفع غير قانوني'
  ],
  darija: [
    'بغاء', 'عاهرة', 'خدمات جنسية', 'مخدرات', 'كوكاين', 'حشيش', 'كيف', 'سلاح', 'تهريب', 'غسيل فلوس', 'تزوير', 'رشوة','دعارة سرية', 'جنس مقابل المال', 'تدليك إيروتيكي', 'بيت دعارة', 'قواد','تجارة المخدرات', 'مروج مخدرات', 'إكستازي', 'إم دي إم إيه', 'إل إس دي','مسدس', 'بندقية', 'ذخيرة', 'سلاح ناري','هجرة غير شرعية', 'مهرب بشر','احتيال', 'نصب', 'سرقة هوية', 'وثائق مزورة','رشوة مالية', 'دفع غير قانوني'
  ]
};

export const PROHIBITED_RESPONSE = {
  fr: 'Tooristoo n\'analyse pas les prix de transactions illégales ou contraires à la loi marocaine. Le service se concentre sur les services touristiques légaux : taxis, hébergements, restaurants, guides agréés, excursions, artisanat, spas. Pour toute urgence, composez le 19 (Police) ou le +212 524 38 46 01 (Police Touristique de Marrakech).',
  en: 'Tooristoo does not analyze prices for illegal transactions or activities contrary to Moroccan law. The service covers only legal tourism services: taxis, accommodation, restaurants, licensed guides, excursions, crafts, spas. For emergencies, dial 19 (Police) or +212 524 38 46 01 (Marrakech Tourist Police).',
  es: 'Tooristoo no analiza precios de transacciones ilegales o contrarias a la ley marroquí. El servicio cubre solo servicios turísticos legales: taxis, alojamiento, restaurantes, guías habilitados, excursiones, artesanía, spas. En emergencias, marca 19 (Policía) o +212 524 38 46 01 (Policía Turística de Marrakech).',
  de: 'Tooristoo analysiert keine Preise für illegale oder gegen marokkanisches Recht verstoßende Transaktionen. Der Dienst deckt nur legale Tourismusdienstleistungen ab: Taxis, Unterkünfte, Restaurants, lizenzierte Guides, Ausflüge, Kunsthandwerk, Spas. Im Notfall wählen Sie 19 (Polizei) oder +212 524 38 46 01 (Touristenpolizei Marrakesch).',
  ar: 'لا يقوم Tooristoo بتحليل أسعار المعاملات غير القانونية أو المخالفة للقانون المغربي. تغطي الخدمة فقط الخدمات السياحية القانونية: التاكسي، الإقامة، المطاعم، المرشدون المعتمدون، الرحلات، الحرف، السبا. في حالات الطوارئ، اتصل بـ 19 (الشرطة) أو +212 524 38 46 01 (شرطة السياحة بمراكش).',
  darija: 'Tooristoo ما كيحللش الأثمان ديال المعاملات غير القانونية أو لي ضد القانون المغربي. الخدمة كتغطي غير الخدمات السياحية القانونية: طاكسي، إقامة، مطاعم، مرشدين معتمدين، نزهات، حرف، سبا. فالطوارئ، عيط على 19 (البوليس) ولا +212 524 38 46 01 (بوليس السياحة فمراكش).'
};

export function isProhibitedRequest(text, lang = 'fr') {
  const lowerText = text.toLowerCase();
  const allKeywords = [
    ...(PROHIBITED_KEYWORDS[lang] || []),
    ...PROHIBITED_KEYWORDS.fr,
    ...PROHIBITED_KEYWORDS.en
  ];
  return allKeywords.some(kw => lowerText.includes(kw.toLowerCase()));
}

export function getProhibitedResponse(lang = 'fr') {
  return PROHIBITED_RESPONSE[lang] || PROHIBITED_RESPONSE.fr;
}

export function getPricingInfo(city, category) {
  if (!PRICING_KNOWLEDGE_BASE[city]) return null;
  return PRICING_KNOWLEDGE_BASE[city][category] || null;
}

// Génère un prompt de prix factuel à injecter dans le contexte LLM
// Aligné avec la charte éditoriale Tooristoo : pas de "seuil d'arnaque", pas de "prix abusif".
// On présente des fourchettes de référence et un seuil de vigilance neutre.
export function formatPricingPrompt(city, category) {
  const info = getPricingInfo(city, category);
  if (!info) {
    return `Pour ${city} - ${category}: aucune donnée spécifique disponible. Utiliser les fourchettes de référence régionales du Maroc.`;
  }
  let prompt = `
Pour ${city} - ${category} (${info.description}) — Mise à jour: ${info.updated || PRICING_LAST_UPDATED}:
- Fourchette de référence locale: ${info.fair_price_min}-${info.fair_price_max} DH
- Fourchette raisonnable pour touriste: ${info.tourist_reasonable_min}-${info.tourist_reasonable_max} DH
${info.airport_min ? `- Transfert aéroport: ${info.airport_min}-${info.airport_max} DH` : ''}
${info.luxury_min ? `- Version premium: ${info.luxury_min}-${info.luxury_max} DH` : ''}
${info.vigilance_threshold ? `- Seuil de vigilance (écart significatif au-dessus de la fourchette si dépassé): ${info.vigilance_threshold} DH` : ''}
- Conseil pratique: ${info.tips}

CONSIGNE DE FORMULATION:
- Ne mentionne JAMAIS le mot "arnaque", "scam", "abus" ou "fraude" dans ton analyse.
- Présente l'écart de manière factuelle: "X DH au-dessus de la fourchette de référence" ou "écart par rapport à la fourchette habituelle".
- Si le prix demandé dépasse le seuil de vigilance, signale-le comme un "écart marqué" qui mérite la prudence du voyageur.
  `.trim();
  return prompt;
}

export function getAllCitiesPricingContext() {
  let context = `BASE DE CONNAISSANCES PRIX TOORISTOO — Mise à jour: ${PRICING_LAST_UPDATED}\n`;
  context += `POLITIQUE: Refuser toute analyse de service illégal ou contraire à la loi marocaine.\n`;
  context += `VOCABULAIRE OBLIGATOIRE: utiliser "écart", "fourchette de référence", "seuil de vigilance".\n`;
  context += `VOCABULAIRE INTERDIT: "arnaque", "scam", "abus", "fraude", "tromperie".\n\n`;
  for (const [city, categories] of Object.entries(PRICING_KNOWLEDGE_BASE)) {
    context += `${city}:\n`;
    for (const [category, info] of Object.entries(categories)) {
      context += `  - ${category} (${info.description}): ${info.fair_price_min}-${info.fair_price_max} DH (local), ${info.tourist_reasonable_min}-${info.tourist_reasonable_max} DH (touriste)${info.vigilance_threshold ? ` — vigilance si >${info.vigilance_threshold} DH` : ''}\n`;
    }
    context += '\n';
  }
  return context;
}

// =========================================================================
// ============== AJOUTÉ — analyzeNegotiation (RAG pattern) ===============
// =========================================================================
// Fonction centrale qui orchestre toute l'analyse :
//   1. Lit la fourchette dans PRICING_KNOWLEDGE_BASE (en mémoire, gratuit)
//   2. Lit les prestataires dans Provider (filtre certified+active+rating>=4.0)
//   3. Appelle le LLM uniquement pour : analyse texte + stratégie + phrase darija
//   4. Valide et complète la réponse pour qu'elle soit toujours intégrale
//   5. Applique le filet anti-vocabulaire
//
// Avantages :
//   - Plus d'hallucination de prix ni de prestataires
//   - Coût LLM réduit (le LLM ne génère plus les chiffres)
//   - Réponses jamais incomplètes (validation stricte)
//   - Cohérence avec la Charte (certified=true, rating>=4.0)
// =========================================================================

// ----- Filet anti-vocabulaire (multi-langues) ---------------------------
const VOCAB_REPLACEMENTS = {
  fr: [
    [/\barnaque?s?\b/gi, 'écart de prix'],
    [/\barnaqueurs?\b/gi, 'pratiquants de tarifs élevés'],
    [/\barnaquer\b/gi, 'pratiquer un tarif élevé'],
    [/\babusifs?\b/gi, 'au-dessus de la référence'],
    [/\babusives?\b/gi, 'au-dessus de la référence'],
    [/\babusivement\b/gi, 'au-dessus de la référence'],
    [/\babus\b/gi, 'écart'],
    [/\babuser\b/gi, 'pratiquer un écart'],
    [/\bfrauduleux\b/gi, 'au-dessus de la fourchette'],
    [/\btromper\b/gi, 'surfacturer'],
    [/\btromperie\b/gi, 'écart tarifaire'],
    [/seuil (d'|de l')?(arnaque|abus|fraude)( de \d+ ?(DH|MAD))?/gi, 'fourchette de référence'],
    [/considéré comme (une |un )?(arnaque|abus|fraude|abusif)/gi, 'au-dessus de la fourchette de référence'],
  ],
  en: [
    [/\bscams?\b/gi, 'price gap'],
    [/\bscammers?\b/gi, 'overpricers'],
    [/\bscamming\b/gi, 'overpricing'],
    [/\babusive\b/gi, 'above reference'],
    [/\babuse\b/gi, 'gap'],
    [/\bfraudulent\b/gi, 'above the range'],
    [/\bcheating\b/gi, 'overpricing'],
    [/(scam|abuse|fraud) threshold( of \d+ ?(DH|MAD))?/gi, 'reference range'],
  ],
  es: [
    [/\bestafas?\b/gi, 'diferencia de precio'],
    [/\bestafadores?\b/gi, 'que cobran de más'],
    [/\babusivos?\b/gi, 'por encima de la referencia'],
    [/\babusivas?\b/gi, 'por encima de la referencia'],
    [/\babuso\b/gi, 'diferencia'],
    [/\bfraude\b/gi, 'diferencia de precio'],
  ],
  de: [
    [/\bBetrug\b/gi, 'Preisabweichung'],
    [/\bbetrügerisch\b/gi, 'über der Referenz'],
    [/\bBetrüger\b/gi, 'Anbieter mit hohen Preisen'],
    [/\bmissbräuchlich\b/gi, 'über der Referenz'],
  ],
  ar: [
    [/احتيال/g, 'فرق سعري'],
    [/نصب/g, 'فرق سعري'],
    [/محتال/g, 'مزود بأسعار مرتفعة'],
    [/نصاب/g, 'مزود بأسعار مرتفعة'],
  ],
  darija: [
    [/احتيال/g, 'فرق فالثمن'],
    [/نصب/g, 'فرق فالثمن'],
    [/محتال/g, 'خادم بأثمان عالية'],
    [/نصاب/g, 'خادم بأثمان عالية'],
  ],
};

function sanitizeText(text, lang = 'fr') {
  if (!text || typeof text !== 'string') return text;
  let cleaned = text;
  const rules = VOCAB_REPLACEMENTS[lang] || VOCAB_REPLACEMENTS.fr;
  rules.forEach(([pattern, replacement]) => {
    cleaned = cleaned.replace(pattern, replacement);
  });
  cleaned = cleaned.replace(/seuil (de |d')?\d+\s*(DH|MAD|درهم)/gi, 'fourchette de référence');
  cleaned = cleaned.replace(/limite (de |d')?\d+\s*(DH|MAD|درهم)/gi, 'fourchette de référence');
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  cleaned = cleaned.replace(/\(\s*\)/g, '');
  cleaned = cleaned.replace(/\s+,/g, ',');
  cleaned = cleaned.replace(/\s+\./g, '.');
  return cleaned;
}

// ----- Récupération des prestataires depuis la base Provider -----------
async function fetchProviders(category, city) {
  try {
    const all = await base44.entities.Provider.filter(
      { category, city, certified: true, active: true },
      '-rating',
      50
    );
    if (!all || all.length === 0) return [];
    return all.filter((p) => Number(p.rating) >= 4.0);
  } catch (err) {
    console.warn('Provider fetch error:', err);
    return [];
  }
}

// ----- Réponse de refus (transactions illégales) ------------------------
function buildRefusal(lang) {
  return {
    refused: true,
    price_estimated_min: 0,
    price_estimated_max: 0,
    risk_level: 'high',
    scam_detected: false,
    ai_analysis: getProhibitedResponse(lang),
    recommended_phrase: '—',
    recommended_phrase_darija: '—',
    strategy: getProhibitedResponse(lang),
    main_provider: null,
    other_providers_count: 0,
  };
}

// ----- Noms de langues pour les prompts ---------------------------------
const LANG_NAME = {
  fr: 'français',
  en: 'English',
  es: 'español',
  de: 'Deutsch',
  ar: 'العربية',
  darija: 'الدارجة المغربية',
};

// ----- Schéma JSON attendu par le LLM -----------------------------------
const LLM_SCHEMA = {
  type: 'object',
  properties: {
    risk_level: { type: 'string', enum: ['low', 'medium', 'high'] },
    ai_analysis: { type: 'string' },
    strategy: { type: 'string' },
    recommended_phrase: { type: 'string' },
    recommended_phrase_darija: { type: 'string' },
    refused: { type: 'boolean' },
  },
  required: ['risk_level', 'ai_analysis', 'strategy', 'recommended_phrase', 'recommended_phrase_darija'],
};

// =========================================================================
// FONCTION PRINCIPALE — analyzeNegotiation
// =========================================================================
// Inputs :
//   { category, city, priceAsked, description, transcript, lang }
// Output : objet enrichi pour AnalysisResult.jsx avec :
//   refused, price_estimated_min, price_estimated_max, risk_level,
//   ai_analysis, strategy, recommended_phrase, recommended_phrase_darija,
//   main_provider (objet complet ou null), other_providers_count (number)
// =========================================================================

export async function analyzeNegotiation({ category, city, priceAsked, description, transcript, lang = 'fr' }) {
  // 1) Pré-filtre côté client (drogues, prostitution, etc.)
  const userText = `${category} ${description || ''} ${transcript || ''}`;
  if (isProhibitedRequest(userText, lang)) {
    return {
      ...buildRefusal(lang),
      category,
      location: city,
      price_asked: 0,
    };
  }

  // 2) Lecture en parallèle : prix (mémoire, instantané) + prestataires (réseau)
  const [pricing, providers] = await Promise.all([
    Promise.resolve(getPricingInfo(city, category)),
    fetchProviders(category, city),
  ]);

  // 3) Construction du prompt LLM avec données injectées (RAG)
  const responseLang = LANG_NAME[lang] || LANG_NAME.fr;
  const userInput = transcript
    ? `Transcription de la conversation entendue : "${transcript}"`
    : `Description : "${description || '(aucune)'}"`;

  let pricingBlock;
  if (pricing) {
    pricingBlock = `
FOURCHETTE DE RÉFÉRENCE (depuis PricingKnowledge — données vérifiées) :
- ${pricing.description}
- Borne basse : ${pricing.fair_price_min} DH
- Borne haute : ${pricing.fair_price_max} DH
- Fourchette raisonnable touriste : ${pricing.tourist_reasonable_min}-${pricing.tourist_reasonable_max} DH${pricing.vigilance_threshold ? `
- Seuil de vigilance : ${pricing.vigilance_threshold} DH (écart marqué au-dessus)` : ''}${pricing.tips ? `
- Conseil : ${pricing.tips}` : ''}`;
  } else {
    pricingBlock = `
FOURCHETTE DE RÉFÉRENCE : non disponible pour cette catégorie + ville.
→ Estime prudemment à partir de tes connaissances générales du Maroc, en restant conservateur.`;
  }

  const prompt = `Tu es Tooristoo, expert en fourchettes de prix locales au Maroc. Tu aides les voyageurs à comprendre si un prix proposé est aligné avec les références locales et tu suggères une stratégie de négociation respectueuse.

═══════════════════════════════════════════════════════════
DONNÉES VÉRIFIÉES (utilise EXCLUSIVEMENT ces chiffres, n'invente rien) :
═══════════════════════════════════════════════════════════

Catégorie : ${category}
Ville     : ${city}
Prix demandé : ${priceAsked || 'non précisé'} DH
${userInput}
${pricingBlock}

═══════════════════════════════════════════════════════════
TON TRAVAIL — Génère UNIQUEMENT ces 5 champs en ${responseLang} :
═══════════════════════════════════════════════════════════

1. **risk_level** : "low" / "medium" / "high"
   - "low" si prix demandé ≤ borne haute touriste
   - "medium" si entre borne haute touriste et seuil de vigilance
   - "high" si prix demandé ≥ seuil de vigilance OU > 2× borne haute
2. **ai_analysis** : analyse pédagogique en 2-3 phrases, factuelle et neutre
3. **strategy** : stratégie de négociation respectueuse en 2-3 phrases
4. **recommended_phrase** : phrase EXACTE à dire au vendeur en ${responseLang}, courte et naturelle
5. **recommended_phrase_darija** : phrase EXACTE en darija marocaine ÉCRITE EN CARACTÈRES ARABES UNIQUEMENT (jamais en lettres latines). Exemple correct : "أنا غادي نعطيك 150 درهم، واش مقبول؟"

═══════════════════════════════════════════════════════════
GARDE-FOUS — REFUS NON NÉGOCIABLES :
═══════════════════════════════════════════════════════════
Si la situation concerne : drogues, prostitution, faux documents, contrebande, contrefaçons, animaux protégés, mineurs, ou corruption d'agents publics → renvoie :
{
  "refused": true,
  "risk_level": "high",
  "ai_analysis": "Tooristoo n'analyse pas les prix de transactions illégales ou contraires à la loi marocaine. Si vous êtes témoin d'une situation préoccupante, contactez la police locale.",
  "strategy": "Tooristoo se limite aux services touristiques légaux. Pour toute urgence, composez le 19 (Police) ou le +212 524 38 46 01 (Police Touristique de Marrakech).",
  "recommended_phrase": "—",
  "recommended_phrase_darija": "—"
}

═══════════════════════════════════════════════════════════
RÈGLES IMPORTANTES :
═══════════════════════════════════════════════════════════

⛔ INTERDIT : tu ne dois PAS proposer ni mentionner de prestataires (riads, taxis, restaurants, hôtels, guides). Tooristoo gère cela séparément à partir de sa base de données vérifiée. Tu ignores complètement ce sujet.

⛔ INTERDIT : tu ne dois PAS inventer de prix. Utilise EXCLUSIVEMENT les chiffres de la section "DONNÉES VÉRIFIÉES" ci-dessus.

⛔ INTERDICTIONS DE VOCABULAIRE (réponse REJETÉE si tu utilises ces mots) :
"arnaque", "arnaquer", "arnaqueur", "scam", "scammer", "scamming",
"abus", "abuser", "abusif", "abusive", "abusivement",
"tromperie", "tromper", "trompeur", "fraude", "frauder", "frauduleux",
"estafa", "estafador", "Betrug", "betrügerisch", "Betrüger",
"احتيال", "نصب", "محتال", "نصاب".

✅ À la place, utilise EXCLUSIVEMENT :
- "écart par rapport à la fourchette de référence"
- "prix au-dessus de la fourchette habituelle"
- "tarif supérieur à la moyenne locale"

✅ TON : factuel, neutre, respectueux de la culture marocaine du marchandage.
✅ FORMAT DH OBLIGATOIRE : utilise toujours "DH" et jamais "MAD" dans les textes.

EXEMPLE DE BON ai_analysis :
"Le prix demandé de 200 DH est nettement au-dessus de la fourchette de référence locale pour un transfert aéroport (70–100 DH). L'écart constaté est de 100 DH par rapport à la borne haute. Il est recommandé d'insister sur l'usage du compteur officiel ou de proposer un prix dans la fourchette de référence."`;

  // 4) Appel LLM (avec gestion d'erreur stricte)
  let llmResult;
  try {
    llmResult = await base44.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: LLM_SCHEMA,
    });
  } catch (err) {
    console.error('LLM error:', err);
    // Fallback : on renvoie au moins la fourchette + prestataire (sans analyse LLM)
    return {
      refused: false,
      price_estimated_min: pricing ? pricing.fair_price_min : 0,
      price_estimated_max: pricing ? pricing.fair_price_max : 0,
      risk_level: 'medium',
      scam_detected: false,
      ai_analysis: lang === 'en' ? 'Analysis temporarily unavailable. Reference range shown above.' : "Analyse temporairement indisponible. La fourchette de référence est affichée ci-dessus.",
      strategy: '—',
      recommended_phrase: '—',
      recommended_phrase_darija: '—',
      main_provider: providers.length > 0 ? providers[0] : null,
      other_providers_count: Math.max(0, providers.length - 1),
      category,
      location: city,
      price_asked: Number(priceAsked) || 0,
    };
  }

  // 5) Si le LLM refuse explicitement
  if (llmResult.refused === true) {
    return {
      ...buildRefusal(lang),
      ai_analysis: llmResult.ai_analysis || getProhibitedResponse(lang),
      strategy: llmResult.strategy || getProhibitedResponse(lang),
      category,
      location: city,
      price_asked: 0,
    };
  }

  // 6) Validation + complétion : la fourchette VIENT TOUJOURS de PRICING_KNOWLEDGE_BASE
  // Le LLM ne peut PAS écraser ces chiffres
  const priceMin = pricing ? pricing.fair_price_min : 0;
  const priceMax = pricing ? pricing.fair_price_max : 0;

  return {
    refused: false,
    price_estimated_min: priceMin,
    price_estimated_max: priceMax,
    risk_level: ['low', 'medium', 'high'].includes(llmResult.risk_level) ? llmResult.risk_level : 'medium',
    scam_detected: false,
    ai_analysis: sanitizeText(llmResult.ai_analysis || '—', lang),
    strategy: sanitizeText(llmResult.strategy || '—', lang),
    recommended_phrase: sanitizeText(llmResult.recommended_phrase || '—', lang),
    recommended_phrase_darija: llmResult.recommended_phrase_darija || '—',
    main_provider: providers.length > 0 ? providers[0] : null,
    other_providers_count: Math.max(0, providers.length - 1),
    category,
    location: city,
    price_asked: Number(priceAsked) || 0,
  };
}