// BASE DE CONNAISSANCES DES PRIX — Tooristoo
// Mise à jour: Avril 2026 — Sources: ONMT, enquêtes terrain, plateformes officielles
// Mise à jour hebdomadaire automatique via les rapports de la communauté

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
      scam_threshold: 40,
      updated: '2026-04-30'
    },
    grand_taxi: {
      description: 'Grand taxi longue distance',
      fair_price_min: 200,
      fair_price_max: 500,
      tourist_reasonable_min: 300,
      tourist_reasonable_max: 700,
      tips: 'Toujours négocier le prix avant le départ. Préférer CTM pour les longues distances.',
      scam_threshold: 800,
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
      scam_threshold: 1500,
      updated: '2026-04-30'
    },
    hotel: {
      description: 'Hôtel 3-4 étoiles (Guéliz/Hivernage)',
      fair_price_min: 350,
      fair_price_max: 700,
      tourist_reasonable_min: 500,
      tourist_reasonable_max: 1000,
      tips: 'Prix officiels sur booking.com. Ne pas payer sans réservation confirmée.',
      scam_threshold: 1200,
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
      scam_threshold: 300,
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
      scam_threshold: 800,
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
      tips: 'Vérifier si transport, repas et guide sont inclus. Agences certifiées Marrakech Médina.',
      scam_threshold: 1000,
      updated: '2026-04-30'
    },
    shopping: {
      description: 'Artisanat (tapis, cuir, céramique)',
      fair_price_min: 50,
      fair_price_max: 500,
      tourist_reasonable_min: 80,
      tourist_reasonable_max: 700,
      tips: 'Négocier 30-50% sur le premier prix. Coopératives: prix fixes honnêtes. Safran: 50-100 DH/g certifié.',
      scam_threshold: 2000,
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
      scam_threshold: 400,
      updated: '2026-04-30'
    },
    montgolfiere: {
      description: 'Vol en montgolfière (lever soleil)',
      fair_price_min: 1200,
      fair_price_max: 1800,
      tourist_reasonable_min: 1400,
      tourist_reasonable_max: 2000,
      tips: 'Prix tout compris (transport+champagne+certificat). Réserver directement chez l\'opérateur certifié.',
      scam_threshold: 2500,
      updated: '2026-04-30'
    },
    transport: {
      description: 'Bus CTM / Supratours (Marrakech-autres villes)',
      fair_price_min: 80,
      fair_price_max: 200,
      tourist_reasonable_min: 90,
      tourist_reasonable_max: 200,
      tips: 'Prix fixe officiel. Acheter en ligne ou à la gare. Pas de négociation.',
      scam_threshold: 250,
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
      scam_threshold: 35,
      updated: '2026-04-30'
    },
    riad: {
      description: 'Nuit dans un riad médina',
      fair_price_min: 250,
      fair_price_max: 500,
      tourist_reasonable_min: 350,
      tourist_reasonable_max: 700,
      tips: 'Fès moins cher que Marrakech. Inclure petit-déjeuner dans la négociation.',
      scam_threshold: 1000,
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
      scam_threshold: 250,
      updated: '2026-04-30'
    },
    guide: {
      description: 'Guide officiel médina de Fès',
      fair_price_min: 150,
      fair_price_max: 300,
      tourist_reasonable_min: 200,
      tourist_reasonable_max: 400,
      tips: 'Guide INDISPENSABLE pour Fès El Bali. Carte officielle obligatoire. Éviter les faux guides.',
      scam_threshold: 600,
      updated: '2026-04-30'
    },
    shopping: {
      description: 'Cuir, zellige, broderie fassi',
      fair_price_min: 100,
      fair_price_max: 800,
      tourist_reasonable_min: 150,
      tourist_reasonable_max: 1200,
      tips: 'Cuir de Fès: qualité réputée mondiale. Tanneries: acheter directement. Zellige: coopératives.',
      scam_threshold: 2000,
      updated: '2026-04-30'
    },
    excursion: {
      description: 'Excursion Volubilis + Meknès',
      fair_price_min: 350,
      fair_price_max: 600,
      tourist_reasonable_min: 450,
      tourist_reasonable_max: 800,
      tips: '1h de route. Inclure entrée Volubilis (70 DH). Repas sur place ~80 DH.',
      scam_threshold: 1000,
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
      scam_threshold: 30,
      updated: '2026-04-30'
    },
    riad: {
      description: 'Nuit dans un riad bleu',
      fair_price_min: 180,
      fair_price_max: 380,
      tourist_reasonable_min: 250,
      tourist_reasonable_max: 500,
      tips: 'Destination moins chère. Petits riads familiaux très accueillants.',
      scam_threshold: 800,
      updated: '2026-04-30'
    },
    restaurant: {
      description: 'Repas (spécialités rifaines)',
      fair_price_min: 40,
      fair_price_max: 90,
      tourist_reasonable_min: 60,
      tourist_reasonable_max: 120,
      tips: 'Restaurants terrasses dans la médina bleue. Kefta, msemen, fromage local.',
      scam_threshold: 180,
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
      scam_threshold: 50,
      updated: '2026-04-30'
    },
    hotel: {
      description: 'Hôtel d\'affaires 3-4 étoiles',
      fair_price_min: 400,
      fair_price_max: 900,
      tourist_reasonable_min: 500,
      tourist_reasonable_max: 1200,
      tips: 'Capitale économique. Quartiers: Maarif, Corniche, CFC pour les affaires.',
      scam_threshold: 1500,
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
      tips: 'Corniche: fruits de mer frais. Quartier Maarif: restaurants variés. Éviter les terrasses touristiques surpayées.',
      scam_threshold: 400,
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
      scam_threshold: 250,
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
      tips: 'Ville organisée et moderne. Compteur obligatoire. Éviter les hôtels qui proposent leurs propres transferts surpayés.',
      scam_threshold: 50,
      updated: '2026-04-30'
    },
    hotel: {
      description: 'Hôtel balnéaire (bord de mer)',
      fair_price_min: 280,
      fair_price_max: 600,
      tourist_reasonable_min: 400,
      tourist_reasonable_max: 900,
      tips: 'Vaste offre hôtelière compétitive. Corniche bien aménagée. Comparer sur booking.com.',
      scam_threshold: 1200,
      updated: '2026-04-30'
    },
    restaurant: {
      description: 'Restaurant fruits de mer/poisson',
      fair_price_min: 70,
      fair_price_max: 140,
      tourist_reasonable_min: 100,
      tourist_reasonable_max: 200,
      tips: 'Port de pêche actif: poisson du jour. Marché municipal: poisson à 30-80 DH/kg.',
      scam_threshold: 300,
      updated: '2026-04-30'
    },
    excursion: {
      description: 'Excursion Souss + Arganiers',
      fair_price_min: 250,
      fair_price_max: 450,
      tourist_reasonable_min: 350,
      tourist_reasonable_max: 600,
      tips: 'Tiznit à 90km. Vallée du Souss. Huile d\'argan authentique en coopérative (60-120 DH/100ml).',
      scam_threshold: 800,
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
      tips: 'Port international: attention aux arnaques à l\'arrivée du ferry. Négocier avant.',
      scam_threshold: 40,
      updated: '2026-04-30'
    },
    hotel: {
      description: 'Hôtel (Médina / Ville Nouvelle)',
      fair_price_min: 200,
      fair_price_max: 500,
      tourist_reasonable_min: 300,
      tourist_reasonable_max: 700,
      tips: 'Hôtels Ville Nouvelle plus modernes. Médina: charme authentique mais plus basique.',
      scam_threshold: 900,
      updated: '2026-04-30'
    },
    restaurant: {
      description: 'Repas (fruits de mer, minthe)',
      fair_price_min: 60,
      fair_price_max: 120,
      tourist_reasonable_min: 80,
      tourist_reasonable_max: 170,
      tips: 'Pâtisseries marocaines excellentes. Thé à la menthe: 8-15 DH. Poisson du détroit.',
      scam_threshold: 250,
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
      scam_threshold: 40,
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
      scam_threshold: 300,
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
      scam_threshold: 35,
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
      scam_threshold: 180,
      updated: '2026-04-30'
    },
    excursion: {
      description: 'Excursion Vallée Dades/Gorges Todra',
      fair_price_min: 280,
      fair_price_max: 500,
      tourist_reasonable_min: 380,
      tourist_reasonable_max: 700,
      tips: 'Paysages spectaculaires. Aït Benhaddou (UNESCO): 30 min. Entrée: 20 DH.',
      scam_threshold: 900,
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
      scam_threshold: 30,
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
      scam_threshold: 200,
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
      scam_threshold: 700,
      updated: '2026-04-30'
    },
    bivouac: {
      description: 'Nuit en bivouac dans les dunes (tout compris)',
      fair_price_min: 200,
      fair_price_max: 400,
      tourist_reasonable_min: 300,
      tourist_reasonable_max: 600,
      tips: 'Inclure dîner berbère + musique gnaoua + petit-déjeuner. Comparer plusieurs camps.',
      scam_threshold: 800,
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
      scam_threshold: 280,
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
// Tooristoo refuse toute analyse pour des services illégaux ou contraires à l'éthique
export const PROHIBITED_KEYWORDS = {
  fr: ['prostitution', 'escort', 'call girl', 'services sexuels', 'drogue', 'cannabis', 'cocaïne', 'hashish', 'haschich', 'kif', 'fille facile', 'pute', 'travailleuse du sexe', 'sexe tarifé', 'armes', 'explosif', 'humain', 'passeur', 'blanchiment', 'faux billet', 'contrefaçon', 'traite', 'esclave'],
  en: ['prostitution', 'escort', 'call girl', 'sex service', 'sexual service', 'drug', 'cocaine', 'cannabis', 'hashish', 'weed', 'prostitute', 'whore', 'weapon', 'explosive', 'human trafficking', 'smuggling', 'money laundering', 'fake bill', 'counterfeit', 'slave'],
  es: ['prostitución', 'escort', 'servicios sexuales', 'droga', 'cocaína', 'cannabis', 'hachís', 'puta', 'arma', 'explosivo', 'tráfico humano', 'lavado dinero', 'billete falso', 'contrafacción'],
  de: ['prostitution', 'escort', 'sexuelle dienstleistungen', 'droge', 'kokain', 'cannabis', 'haschisch', 'hure', 'waffe', 'sprengstoff', 'menschenhandel', 'geldwäsche', 'falschgeld', 'fälschung'],
  ar: ['دعارة', 'بغاء', 'عاهرة', 'خدمات جنسية', 'مخدرات', 'كوكايين', 'حشيش', 'قنب', 'أسلحة', 'متفجرات', 'اتجار بالبشر', 'تهريب', 'غسيل أموال', 'تزوير', 'رقيق'],
  darija: ['بغاء', 'عاهرة', 'خدمات جنسية', 'مخدرات', 'كوكاين', 'حشيش', 'كيف', 'سلاح', 'تهريب', 'غسيل فلوس', 'تزوير']
};

export const PROHIBITED_RESPONSE = {
  fr: 'Tooristoo est spécialisée dans les négociations pour services touristiques légaux au Maroc. Je ne peux pas analyser ce type de demande.',
  en: 'Tooristoo specializes in negotiations for legal tourist services in Morocco. I cannot analyze this type of request.',
  es: 'Tooristoo está especializada en negociaciones para servicios turísticos legales en Marruecos. No puedo analizar este tipo de solicitud.',
  de: 'Tooristoo ist auf Verhandlungen für legale Tourismusdienstleistungen in Marokko spezialisiert. Ich kann diese Art von Anfrage nicht analysieren.',
  ar: 'Tooristoo متخصصة في التفاوض على الخدمات السياحية المشروعة في المغرب. لا يمكنني تحليل هذا النوع من الطلبات.',
  darija: 'Tooristoo متخصصة فالتفاوض على الخدمات السياحية المشروعة فالمغرب. ما يمكنيش نحلل هاد النوع من الطلبات.'
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

export function formatPricingPrompt(city, category) {
  const info = getPricingInfo(city, category);
  if (!info) {
    return `Pour ${city} - ${category}: aucune donnée spécifique disponible. Utiliser les prix de référence régionaux du Maroc.`;
  }
  let prompt = `
Pour ${city} - ${category} (${info.description}) — Mise à jour: ${info.updated || PRICING_LAST_UPDATED}:
- Prix juste local: ${info.fair_price_min}-${info.fair_price_max} DH
- Prix raisonnable pour touriste: ${info.tourist_reasonable_min}-${info.tourist_reasonable_max} DH
${info.airport_min ? `- Transfert aéroport: ${info.airport_min}-${info.airport_max} DH` : ''}
${info.luxury_min ? `- Version luxe: ${info.luxury_min}-${info.luxury_max} DH` : ''}
${info.scam_threshold ? `- Seuil d'arnaque (prix abusif si supérieur): ${info.scam_threshold} DH` : ''}
- Conseil expert: ${info.tips}
  `.trim();
  return prompt;
}

export function getAllCitiesPricingContext() {
  let context = `BASE DE CONNAISSANCES PRIX TOORISTOO — Mise à jour: ${PRICING_LAST_UPDATED}\n`;
  context += `POLITIQUE: Refuser toute analyse de service illégal, immoral ou contraire à la loi marocaine.\n\n`;
  for (const [city, categories] of Object.entries(PRICING_KNOWLEDGE_BASE)) {
    context += `${city}:\n`;
    for (const [category, info] of Object.entries(categories)) {
      context += `  - ${category} (${info.description}): ${info.fair_price_min}-${info.fair_price_max} DH (local), ${info.tourist_reasonable_min}-${info.tourist_reasonable_max} DH (touriste)${info.scam_threshold ? ` — ARNAQUE si >${ info.scam_threshold} DH` : ''}\n`;
    }
    context += '\n';
  }
  return context;
}