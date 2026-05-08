// BASE DE CONNAISSANCES DES PRIX — Tooristoo
// Mise à jour: Mai 2026 — Sources: ONMT, CTM, ONCF, Booking.com,
// Google Maps local guides, rapports communautaires Tooristoo, tarifs officiels 2026.

import { base44 } from '@/api/base44Client';

export const PRICING_LAST_UPDATED = '2026-05-08';

export const PRICING_KNOWLEDGE_BASE = {

  // ════════════════════════════════════════════════════════
  Marrakech: {
    taxi: {
      description: 'Petit taxi intra-ville (compteur obligatoire)',
      fair_price_min: 10,
      fair_price_max: 20,
      tourist_reasonable_min: 15,
      tourist_reasonable_max: 30,
      airport_min: 70,
      airport_max: 120,
      night_surcharge: '+50% après 20h',
      tips: 'Exiger le compteur systématiquement. Trajet aéroport Menara → Médina/Guéliz : 70–120 DH selon heure. Prix nuit majorés 50%. Éviter les taxis non agréés à la sortie de l\'aéroport.',
      vigilance_threshold: 150,
      updated: '2026-05-08',
    },
    grand_taxi: {
      description: 'Grand taxi longue distance ou excursion privée',
      fair_price_min: 250,
      fair_price_max: 600,
      tourist_reasonable_min: 350,
      tourist_reasonable_max: 800,
      tips: 'Négocier le prix AVANT de monter. Marrakech → Essaouira partagé : 80–120 DH/pers. En privatif : 300–500 DH. Préférer CTM pour longues distances.',
      vigilance_threshold: 1000,
      updated: '2026-05-08',
    },
    riad: {
      description: 'Nuit dans un riad traditionnel (chambre double, pdj inclus)',
      fair_price_min: 350,
      fair_price_max: 700,
      tourist_reasonable_min: 450,
      tourist_reasonable_max: 1000,
      luxury_min: 1200,
      luxury_max: 4000,
      tips: 'Réserver via Booking.com pour comparer. Petit-déjeuner généralement inclus. Éviter les rabatteurs en médina qui touchent des commissions.',
      vigilance_threshold: 1500,
      updated: '2026-05-08',
    },
    hotel: {
      description: 'Hôtel 3–4 étoiles (Guéliz / Hivernage)',
      fair_price_min: 400,
      fair_price_max: 800,
      tourist_reasonable_min: 500,
      tourist_reasonable_max: 1200,
      tips: 'Prix officiels affichés sur les plateformes. Quartier Guéliz plus moderne et calme.',
      vigilance_threshold: 1500,
      updated: '2026-05-08',
    },
    restaurant: {
      description: 'Repas complet (entrée + plat + boisson)',
      fair_price_min: 70,
      fair_price_max: 140,
      tourist_reasonable_min: 100,
      tourist_reasonable_max: 200,
      gastronomic_min: 250,
      gastronomic_max: 500,
      tips: 'Éviter les restaurants avec rabatteurs place Jemaa El Fna. Demander la carte avec prix avant de s\'asseoir. Restaurants locaux dans les ruelles : 50–80 DH repas complet.',
      vigilance_threshold: 350,
      updated: '2026-05-08',
    },
    guide: {
      description: 'Guide officiel agréé ONMT (demi-journée)',
      fair_price_min: 250,
      fair_price_max: 400,
      tourist_reasonable_min: 300,
      tourist_reasonable_max: 500,
      full_day_min: 450,
      full_day_max: 750,
      tips: 'Exiger la carte officielle de guide agréé ONMT. Ne jamais suivre un "guide" non sollicité dans la médina. Journée complète : 450–750 DH.',
      vigilance_threshold: 900,
      updated: '2026-05-08',
    },
    excursion: {
      description: 'Excursion journée (Atlas, Ourika, Ouzoud, Aït Benhaddou)',
      fair_price_min: 280,
      fair_price_max: 500,
      tourist_reasonable_min: 380,
      tourist_reasonable_max: 650,
      desert_min: 550,
      desert_max: 1000,
      tips: 'Vérifier si transport, repas et guide sont inclus. Cascades d\'Ouzoud : 280–400 DH/pers en groupe. En privé : 600–900 DH. Aït Benhaddou (UNESCO) : entrée 20 DH.',
      vigilance_threshold: 1200,
      updated: '2026-05-08',
    },
    shopping: {
      description: 'Artisanat souk (tapis, cuir, céramique, épices)',
      fair_price_min: 50,
      fair_price_max: 600,
      tourist_reasonable_min: 80,
      tourist_reasonable_max: 900,
      tips: 'Négocier 30–50% sur le premier prix. Coopératives : prix fixes honnêtes. Safran certifié : 50–100 DH/g. Méfiez-vous du "safran" à 10 DH/g (colorant).',
      vigilance_threshold: 2500,
      updated: '2026-05-08',
    },
    spa: {
      description: 'Hammam traditionnel + gommage (1h30)',
      fair_price_min: 100,
      fair_price_max: 180,
      tourist_reasonable_min: 140,
      tourist_reasonable_max: 280,
      luxury_min: 350,
      luxury_max: 700,
      tips: 'Demander le prix complet avant d\'entrer. Pourboire 20–30 DH apprécié pour le kessala. Hammams populaires locaux : 15–30 DH (sans massage).',
      vigilance_threshold: 500,
      updated: '2026-05-08',
    },
    montgolfiere: {
      description: 'Vol en montgolfière au lever du soleil (1h)',
      fair_price_min: 1300,
      fair_price_max: 1800,
      tourist_reasonable_min: 1500,
      tourist_reasonable_max: 2200,
      tips: 'Prix tout compris : transport hôtel A/R, vol 1h, champagne, certificat. Réserver directement chez opérateur certifié. Éviter les intermédiaires de la médina.',
      vigilance_threshold: 2800,
      updated: '2026-05-08',
    },
    transport: {
      description: 'Bus CTM / Supratours inter-villes',
      fair_price_min: 80,
      fair_price_max: 220,
      tourist_reasonable_min: 90,
      tourist_reasonable_max: 220,
      tips: 'Prix fixe officiel, pas de négociation. Marrakech → Casablanca : 120–150 DH. Marrakech → Agadir : 100–130 DH. Acheter en ligne ou à la gare.',
      vigilance_threshold: 280,
      updated: '2026-05-08',
    },
  },

  // ════════════════════════════════════════════════════════
  Fès: {
    taxi: {
      description: 'Petit taxi intra-ville (compteur)',
      fair_price_min: 8,
      fair_price_max: 15,
      tourist_reasonable_min: 12,
      tourist_reasonable_max: 20,
      airport_min: 60,
      airport_max: 100,
      night_surcharge: '+50% après 20h',
      tips: 'Compteur obligatoire. Fès El Bali très labyrinthique : taxis utiles aux portes. Aéroport Fès-Saïss → centre : 60–100 DH.',
      vigilance_threshold: 40,
      updated: '2026-05-08',
    },
    grand_taxi: {
      description: 'Grand taxi longue distance Fès',
      fair_price_min: 200,
      fair_price_max: 500,
      tourist_reasonable_min: 300,
      tourist_reasonable_max: 700,
      tips: 'Fès → Meknès partagé : 25–40 DH/pers. Fès → Chefchaouen : 80–120 DH/pers partagé.',
      vigilance_threshold: 900,
      updated: '2026-05-08',
    },
    riad: {
      description: 'Nuit dans un riad médina de Fès',
      fair_price_min: 280,
      fair_price_max: 550,
      tourist_reasonable_min: 380,
      tourist_reasonable_max: 750,
      tips: 'Fès légèrement moins cher que Marrakech. Inclure petit-déjeuner dans la négociation.',
      vigilance_threshold: 1100,
      updated: '2026-05-08',
    },
    hotel: {
      description: 'Hôtel Ville Nouvelle Fès',
      fair_price_min: 300,
      fair_price_max: 650,
      tourist_reasonable_min: 400,
      tourist_reasonable_max: 850,
      tips: 'Ville Nouvelle plus moderne et calme. Prix officiels sur les plateformes de réservation.',
      updated: '2026-05-08',
    },
    restaurant: {
      description: 'Repas traditionnel fassi',
      fair_price_min: 55,
      fair_price_max: 110,
      tourist_reasonable_min: 80,
      tourist_reasonable_max: 160,
      tips: 'La cuisine fassi est réputée parmi les meilleures du Maroc. Petits restaurants locaux : 40–80 DH. Bastions touristiques place Rcif : plus chers.',
      vigilance_threshold: 280,
      updated: '2026-05-08',
    },
    guide: {
      description: 'Guide officiel médina de Fès (INDISPENSABLE)',
      fair_price_min: 180,
      fair_price_max: 320,
      tourist_reasonable_min: 250,
      tourist_reasonable_max: 450,
      full_day_min: 400,
      full_day_max: 650,
      tips: 'Guide INDISPENSABLE pour Fès El Bali. Carte officielle ONMT obligatoire. Demi-journée : 180–320 DH.',
      vigilance_threshold: 700,
      updated: '2026-05-08',
    },
    excursion: {
      description: 'Excursion Volubilis + Moulay Idriss depuis Fès',
      fair_price_min: 380,
      fair_price_max: 650,
      tourist_reasonable_min: 480,
      tourist_reasonable_max: 850,
      tips: 'Volubilis (UNESCO) : entrée 70 DH. Moulay Idriss : ville sainte, accès gratuit. Transport + guide : 380–650 DH.',
      vigilance_threshold: 1100,
      updated: '2026-05-08',
    },
    shopping: {
      description: 'Cuir, zellige, broderie fassi',
      fair_price_min: 100,
      fair_price_max: 900,
      tourist_reasonable_min: 150,
      tourist_reasonable_max: 1300,
      tips: 'Cuir de Fès : qualité mondiale. Tanneries Chouara : acheter directement dans les boutiques attenantes. Zellige : coopératives artisanales. Négocier 30–40%.',
      vigilance_threshold: 2500,
      updated: '2026-05-08',
    },
    spa: {
      description: 'Hammam traditionnel Fès',
      fair_price_min: 50,
      fair_price_max: 120,
      tourist_reasonable_min: 80,
      tourist_reasonable_max: 180,
      tips: 'Hammams populaires locaux : 15–30 DH. Hammams touristiques avec gommage : 80–200 DH.',
      updated: '2026-05-08',
    },
    transport: {
      description: 'Train ONCF / Bus CTM Fès',
      fair_price_min: 80,
      fair_price_max: 200,
      tourist_reasonable_min: 90,
      tourist_reasonable_max: 200,
      tips: 'Fès → Casablanca train : 110–160 DH. Fès → Marrakech CTM : 160–200 DH.',
      updated: '2026-05-08',
    },
  },

  // ════════════════════════════════════════════════════════
  Chefchaouen: {
    taxi: {
      description: 'Taxi intra-ville (petite ville, tout accessible à pied)',
      fair_price_min: 5,
      fair_price_max: 12,
      tourist_reasonable_min: 10,
      tourist_reasonable_max: 18,
      tips: 'Petite ville : médina accessible à pied. Taxi vers gare routière : 10–15 DH. Grand taxi → Tétouan : 40–60 DH/pers partagé.',
      vigilance_threshold: 35,
      updated: '2026-05-08',
    },
    riad: {
      description: 'Nuit dans un riad bleu (chambre double)',
      fair_price_min: 200,
      fair_price_max: 420,
      tourist_reasonable_min: 280,
      tourist_reasonable_max: 550,
      tips: 'Destination moins chère que Marrakech. Petits riads familiaux très accueillants. Réserver à l\'avance en juillet–août.',
      vigilance_threshold: 850,
      updated: '2026-05-08',
    },
    hotel: {
      description: 'Hôtel standard Chefchaouen',
      fair_price_min: 180,
      fair_price_max: 380,
      tourist_reasonable_min: 250,
      tourist_reasonable_max: 500,
      tips: 'Offre limitée, réserver tôt. Plusieurs guesthouses de charme dans la médina bleue.',
      updated: '2026-05-08',
    },
    restaurant: {
      description: 'Repas (spécialités rifaines)',
      fair_price_min: 45,
      fair_price_max: 95,
      tourist_reasonable_min: 65,
      tourist_reasonable_max: 130,
      tips: 'Kefta, msemen, fromage de chèvre local, miel du Rif. Terrasses avec vue médina bleue. Prix très raisonnables.',
      vigilance_threshold: 200,
      updated: '2026-05-08',
    },
    guide: {
      description: 'Guide randonnée Rif + médina',
      fair_price_min: 120,
      fair_price_max: 250,
      tourist_reasonable_min: 180,
      tourist_reasonable_max: 350,
      tips: 'Randonnées : Jbel El Kelaa (2 027 m), Cascades Ras El Ma. Guides locaux compétents.',
      updated: '2026-05-08',
    },
    excursion: {
      description: 'Randonnée demi-journée / journée Rif',
      fair_price_min: 150,
      fair_price_max: 300,
      tourist_reasonable_min: 200,
      tourist_reasonable_max: 420,
      tips: 'Forêt de cèdres à 1h. Cascades Akchour : demi-journée. Inclure repas local dans la négociation.',
      updated: '2026-05-08',
    },
    shopping: {
      description: 'Artisanat (laine, cuir, épices du Rif)',
      fair_price_min: 30,
      fair_price_max: 350,
      tourist_reasonable_min: 50,
      tourist_reasonable_max: 500,
      tips: 'Tapis rifains de qualité. Fromage de chèvre : 30–60 DH. Négocier 20–30%.',
      updated: '2026-05-08',
    },
    transport: {
      description: 'Bus CTM Chefchaouen',
      fair_price_min: 60,
      fair_price_max: 150,
      tourist_reasonable_min: 70,
      tourist_reasonable_max: 150,
      tips: 'Chefchaouen → Fès : 80–120 DH. Chefchaouen → Tanger : 60–90 DH. CTM recommandé.',
      updated: '2026-05-08',
    },
  },

  // ════════════════════════════════════════════════════════
  Casablanca: {
    taxi: {
      description: 'Petit taxi intra-ville (compteur)',
      fair_price_min: 12,
      fair_price_max: 22,
      tourist_reasonable_min: 15,
      tourist_reasonable_max: 35,
      airport_min: 250,
      airport_max: 350,
      tips: 'Compteur obligatoire. Aéroport Mohammed V → centre : train ONCF 45 DH (recommandé) ou grand taxi 250–350 DH. Tramway : 7 DH fixe. Bus : 4 DH.',
      vigilance_threshold: 60,
      updated: '2026-05-08',
    },
    hotel: {
      description: 'Hôtel d\'affaires 3–4 étoiles',
      fair_price_min: 450,
      fair_price_max: 950,
      tourist_reasonable_min: 550,
      tourist_reasonable_max: 1300,
      tips: 'Capitale économique. Quartiers : Maarif, Corniche, CFC. Réserver en ligne.',
      vigilance_threshold: 1800,
      updated: '2026-05-08',
    },
    restaurant: {
      description: 'Restaurant (ambiance moderne / fruits de mer)',
      fair_price_min: 100,
      fair_price_max: 200,
      tourist_reasonable_min: 130,
      tourist_reasonable_max: 280,
      seafood_min: 180,
      seafood_max: 400,
      tips: 'Corniche : fruits de mer frais excellents. Quartier Maarif : restaurants variés. Vérifier la carte avant de s\'asseoir.',
      vigilance_threshold: 500,
      updated: '2026-05-08',
    },
    guide: {
      description: 'Guide ville (Mosquée Hassan II, Habous)',
      fair_price_min: 180,
      fair_price_max: 350,
      tourist_reasonable_min: 250,
      tourist_reasonable_max: 450,
      tips: 'Mosquée Hassan II : visite guidée officielle 120 DH (entrée incluse). Quartier Habous : intéressant.',
      updated: '2026-05-08',
    },
    excursion: {
      description: 'Excursion côte Atlantique (El Jadida, Azemmour)',
      fair_price_min: 250,
      fair_price_max: 450,
      tourist_reasonable_min: 350,
      tourist_reasonable_max: 600,
      tips: 'El Jadida (UNESCO) à 1h. Azemmour à 1h10. Asilah à 2h30.',
      updated: '2026-05-08',
    },
    transport: {
      description: 'Train ONCF Casa inter-villes',
      fair_price_min: 80,
      fair_price_max: 250,
      tourist_reasonable_min: 90,
      tourist_reasonable_max: 250,
      tips: 'Casa → Rabat : 40–80 DH. Casa → Marrakech : 130–200 DH. Casa → Fès : 110–160 DH. Réserver sur oncf.ma.',
      vigilance_threshold: 300,
      updated: '2026-05-08',
    },
    shopping: {
      description: 'Shopping moderne (Maarif, Morocco Mall)',
      fair_price_min: 100,
      fair_price_max: 1000,
      tourist_reasonable_min: 100,
      tourist_reasonable_max: 1000,
      tips: 'Prix fixes dans les centres commerciaux. Marché Derb Omar : textile en gros.',
      updated: '2026-05-08',
    },
  },

  // ════════════════════════════════════════════════════════
  Agadir: {
    taxi: {
      description: 'Petit taxi intra-ville (compteur)',
      fair_price_min: 10,
      fair_price_max: 18,
      tourist_reasonable_min: 15,
      tourist_reasonable_max: 28,
      airport_min: 80,
      airport_max: 150,
      tips: 'Ville moderne bien organisée. Compteur obligatoire. Aéroport Al Massira → centre : 80–150 DH.',
      vigilance_threshold: 60,
      updated: '2026-05-08',
    },
    hotel: {
      description: 'Hôtel balnéaire (bord de mer / Corniche)',
      fair_price_min: 300,
      fair_price_max: 650,
      tourist_reasonable_min: 420,
      tourist_reasonable_max: 950,
      tips: 'Haute saison (juillet–août) : prix majorés 30–50%. Comparer sur Booking.',
      vigilance_threshold: 1400,
      updated: '2026-05-08',
    },
    restaurant: {
      description: 'Restaurant fruits de mer / poisson frais',
      fair_price_min: 80,
      fair_price_max: 160,
      tourist_reasonable_min: 110,
      tourist_reasonable_max: 230,
      tips: 'Port de pêche actif. Poisson du jour : 30–80 DH/kg. Restaurants port : excellent rapport qualité/prix.',
      vigilance_threshold: 380,
      updated: '2026-05-08',
    },
    excursion: {
      description: 'Excursion Vallée du Souss + Arganiers + Tiznit',
      fair_price_min: 280,
      fair_price_max: 500,
      tourist_reasonable_min: 380,
      tourist_reasonable_max: 680,
      tips: 'Tiznit à 90 km : bijouterie berbère. Coopérative d\'argan : huile bio authentique 60–120 DH/100 ml.',
      vigilance_threshold: 900,
      updated: '2026-05-08',
    },
    shopping: {
      description: 'Souk El Had + artisanat + argan',
      fair_price_min: 30,
      fair_price_max: 500,
      tourist_reasonable_min: 50,
      tourist_reasonable_max: 700,
      tips: 'Souk El Had (dimanche) : le plus grand du Maroc. Argan bio en coopérative : prix officiels. Négocier 25–35%.',
      updated: '2026-05-08',
    },
    spa: {
      description: 'Thalasso / Hammam balnéaire Agadir',
      fair_price_min: 180,
      fair_price_max: 400,
      tourist_reasonable_min: 250,
      tourist_reasonable_max: 580,
      tips: 'Nombreux centres thalasso Corniche. Tarifs affichés, comparer plusieurs. Formule journée souvent plus avantageuse.',
      updated: '2026-05-08',
    },
    transport: {
      description: 'Bus CTM Agadir inter-villes',
      fair_price_min: 100,
      fair_price_max: 180,
      tourist_reasonable_min: 110,
      tourist_reasonable_max: 180,
      tips: 'Agadir → Marrakech : 100–130 DH, 3h30. Agadir → Casablanca : 160–200 DH, 6h.',
      updated: '2026-05-08',
    },
    guide: {
      description: 'Guide Agadir (Kasbah, Médina Polizzi)',
      fair_price_min: 150,
      fair_price_max: 280,
      tourist_reasonable_min: 200,
      tourist_reasonable_max: 380,
      tips: 'Kasbah d\'Agadir : vue panoramique. Médina Polizzi : artisanat. Demi-journée : 150–280 DH.',
      updated: '2026-05-08',
    },
  },

  // ════════════════════════════════════════════════════════
  Tanger: {
    taxi: {
      description: 'Petit taxi intra-ville',
      fair_price_min: 8,
      fair_price_max: 15,
      tourist_reasonable_min: 12,
      tourist_reasonable_max: 22,
      port_min: 30,
      port_max: 70,
      tips: 'Port international : rester vigilant à l\'arrivée du ferry. Négocier AVANT de monter. Port → médina : 30–50 DH. Port → Ville Nouvelle : 40–70 DH.',
      vigilance_threshold: 50,
      updated: '2026-05-08',
    },
    grand_taxi: {
      description: 'Grand taxi Tanger longue distance',
      fair_price_min: 80,
      fair_price_max: 300,
      tourist_reasonable_min: 120,
      tourist_reasonable_max: 400,
      tips: 'Tanger → Chefchaouen partagé : 60–90 DH/pers. Tanger → Tétouan : 25–40 DH/pers. TGV Tanger-Casa : 149–189 DH.',
      updated: '2026-05-08',
    },
    hotel: {
      description: 'Hôtel (Médina / Ville Nouvelle / bord mer)',
      fair_price_min: 220,
      fair_price_max: 550,
      tourist_reasonable_min: 320,
      tourist_reasonable_max: 750,
      tips: 'Hôtels Ville Nouvelle plus modernes. Quartier Malabata : hôtels balnéaires. TGV a dynamisé la ville, prix en hausse.',
      vigilance_threshold: 1000,
      updated: '2026-05-08',
    },
    restaurant: {
      description: 'Repas (fruits de mer, cuisine hispano-marocaine)',
      fair_price_min: 65,
      fair_price_max: 130,
      tourist_reasonable_min: 90,
      tourist_reasonable_max: 190,
      tips: 'Poisson du détroit de Gibraltar excellent. Thé à la menthe : 8–15 DH. Médina : cuisine traditionnelle moins chère.',
      vigilance_threshold: 300,
      updated: '2026-05-08',
    },
    guide: {
      description: 'Guide Kasbah + Médina + Cap Spartel',
      fair_price_min: 120,
      fair_price_max: 280,
      tourist_reasonable_min: 180,
      tourist_reasonable_max: 380,
      tips: 'Kasbah, Grottes d\'Hercule, Cap Spartel. Histoire franco-hispanique riche. Demi-journée médina : 120–250 DH.',
      updated: '2026-05-08',
    },
    excursion: {
      description: 'Excursion Asilah + Cap Spartel + Grottes Hercule',
      fair_price_min: 220,
      fair_price_max: 420,
      tourist_reasonable_min: 300,
      tourist_reasonable_max: 550,
      tips: 'Asilah 45 km : ville d\'art murale. Cap Spartel : confluence Atlantique/Méditerranée. Grottes Hercule : entrée 25 DH.',
      updated: '2026-05-08',
    },
    shopping: {
      description: 'Artisanat médina Tanger',
      fair_price_min: 50,
      fair_price_max: 500,
      tourist_reasonable_min: 80,
      tourist_reasonable_max: 700,
      tips: 'Babouches, cuir, épices. Légèrement moins cher que Marrakech. Négocier 25–40%.',
      updated: '2026-05-08',
    },
    transport: {
      description: 'TGV Al Boraq + CTM Tanger',
      fair_price_min: 90,
      fair_price_max: 260,
      tourist_reasonable_min: 100,
      tourist_reasonable_max: 260,
      tips: 'TGV Tanger → Casa : 149–189 DH, 2h10. CTM Tanger → Rabat : 120–150 DH. Ferry Tanger → Tarifa : 35–60 €.',
      updated: '2026-05-08',
    },
  },

  // ════════════════════════════════════════════════════════
  Rabat: {
    taxi: {
      description: 'Petit taxi Rabat (capitale administrative)',
      fair_price_min: 10,
      fair_price_max: 18,
      tourist_reasonable_min: 15,
      tourist_reasonable_max: 25,
      airport_min: 80,
      airport_max: 130,
      tips: 'Tramway moderne (7 DH) très pratique, couvre la plupart des sites. Compteur obligatoire. Capitale bien organisée.',
      vigilance_threshold: 45,
      updated: '2026-05-08',
    },
    hotel: {
      description: 'Hôtel 3–4 étoiles (Agdal / Hassan)',
      fair_price_min: 320,
      fair_price_max: 750,
      tourist_reasonable_min: 420,
      tourist_reasonable_max: 950,
      tips: 'Agdal et Hassan pour hôtels d\'affaires. Médina et Kasbah Oudayas pour l\'authenticité.',
      updated: '2026-05-08',
    },
    restaurant: {
      description: 'Repas Rabat (cuisine moderne + traditionnelle)',
      fair_price_min: 75,
      fair_price_max: 160,
      tourist_reasonable_min: 100,
      tourist_reasonable_max: 230,
      tips: 'Quartier Hassan et Agdal : bons restaurants modernes. Médina : couscous authentique 50–90 DH.',
      vigilance_threshold: 350,
      updated: '2026-05-08',
    },
    guide: {
      description: 'Guide Sites Royaux Rabat (demi-journée)',
      fair_price_min: 150,
      fair_price_max: 300,
      tourist_reasonable_min: 200,
      tourist_reasonable_max: 420,
      tips: 'Tour Hassan, Mausolée Mohammed V (gratuit), Kasbah Oudayas, Chellah (entrée 70 DH). Journée complète : 350–550 DH.',
      updated: '2026-05-08',
    },
    excursion: {
      description: 'Excursion Salé + Chellah + côte',
      fair_price_min: 180,
      fair_price_max: 350,
      tourist_reasonable_min: 250,
      tourist_reasonable_max: 480,
      tips: 'Salé en face de Rabat (Bou Regreg). Chellah : ruines romaines + cigognes. Plage de Témara à 15 km.',
      updated: '2026-05-08',
    },
    transport: {
      description: 'Train ONCF Rabat inter-villes',
      fair_price_min: 40,
      fair_price_max: 160,
      tourist_reasonable_min: 45,
      tourist_reasonable_max: 160,
      tips: 'Rabat → Casa : 40–80 DH, 1h. Rabat → Fès : 90–130 DH, 3h. Rabat → Tanger TGV : 130–160 DH.',
      updated: '2026-05-08',
    },
    shopping: {
      description: 'Artisanat Rabat (tapis, poterie, maroquinerie)',
      fair_price_min: 80,
      fair_price_max: 600,
      tourist_reasonable_min: 120,
      tourist_reasonable_max: 900,
      tips: 'Tapis de Rabat : renommée internationale. Ensemble artisanal officiel : prix fixes affichés.',
      updated: '2026-05-08',
    },
  },

  // ════════════════════════════════════════════════════════
  Ouarzazate: {
    taxi: {
      description: 'Taxi Ouarzazate (Ville du Cinéma)',
      fair_price_min: 8,
      fair_price_max: 15,
      tourist_reasonable_min: 12,
      tourist_reasonable_max: 22,
      tips: 'Petite ville tranquille. Grands taxis pour excursions : négocier ferme. Aéroport → centre : 40–70 DH.',
      vigilance_threshold: 40,
      updated: '2026-05-08',
    },
    hotel: {
      description: 'Hôtel / Kasbah guesthouse Ouarzazate',
      fair_price_min: 200,
      fair_price_max: 450,
      tourist_reasonable_min: 300,
      tourist_reasonable_max: 650,
      tips: 'Porte du désert, prix très compétitifs. Belle offre de kasbahs reconverties. Vue Atlas souvent incluse.',
      updated: '2026-05-08',
    },
    restaurant: {
      description: 'Repas (tajine, couscous, mrouzia)',
      fair_price_min: 50,
      fair_price_max: 100,
      tourist_reasonable_min: 70,
      tourist_reasonable_max: 150,
      tips: 'Restaurants en terrasse avec vue Atlas. Cuisine berbère authentique. Prix très raisonnables.',
      vigilance_threshold: 200,
      updated: '2026-05-08',
    },
    guide: {
      description: 'Guide Studios Cinéma + Kasbah Taourirt',
      fair_price_min: 100,
      fair_price_max: 220,
      tourist_reasonable_min: 150,
      tourist_reasonable_max: 320,
      tips: 'Studios Atlas : entrée 130 DH (Gladiator, Lawrence d\'Arabie). Kasbah Taourirt : entrée 30 DH.',
      updated: '2026-05-08',
    },
    excursion: {
      description: 'Excursion Vallée Dades / Gorges Todra / Aït Benhaddou',
      fair_price_min: 300,
      fair_price_max: 550,
      tourist_reasonable_min: 420,
      tourist_reasonable_max: 750,
      tips: 'Aït Benhaddou (UNESCO) : 30 min, entrée 20 DH. Gorges du Todra : 2h. En privatif : 420–750 DH/jour.',
      vigilance_threshold: 1000,
      updated: '2026-05-08',
    },
    shopping: {
      description: 'Artisanat kasbahs (tapis berbères, bijoux touaregs)',
      fair_price_min: 100,
      fair_price_max: 600,
      tourist_reasonable_min: 150,
      tourist_reasonable_max: 900,
      tips: 'Tapis berbères de qualité. Bijoux touaregs en argent. Rose de Dades séchée : 30–60 DH/100g. Négocier 30–40%.',
      updated: '2026-05-08',
    },
    transport: {
      description: 'Bus CTM Ouarzazate',
      fair_price_min: 80,
      fair_price_max: 200,
      tourist_reasonable_min: 90,
      tourist_reasonable_max: 200,
      tips: 'Ouarzazate → Marrakech : 80–110 DH, 4h (col Tizi n\'Tichka). Ouarzazate → Zagora : 60–80 DH.',
      updated: '2026-05-08',
    },
  },

  // ════════════════════════════════════════════════════════
  Meknès: {
    taxi: {
      description: 'Taxi Meknès (Ville Impériale moins touristique)',
      fair_price_min: 7,
      fair_price_max: 12,
      tourist_reasonable_min: 10,
      tourist_reasonable_max: 18,
      tips: 'Ville impériale moins touristique = moins de surfacturation. Meknès → Volubilis grand taxi : 15–25 DH/pers partagé.',
      vigilance_threshold: 32,
      updated: '2026-05-08',
    },
    riad: {
      description: 'Nuit riad / maison d\'hôtes Meknès',
      fair_price_min: 200,
      fair_price_max: 420,
      tourist_reasonable_min: 280,
      tourist_reasonable_max: 600,
      tips: 'Moins cher que Fès et Marrakech pour qualité équivalente. Bonne alternative.',
      updated: '2026-05-08',
    },
    restaurant: {
      description: 'Repas Meknès (olives, vins, cuisine rifaine)',
      fair_price_min: 50,
      fair_price_max: 110,
      tourist_reasonable_min: 70,
      tourist_reasonable_max: 160,
      tips: 'Meknès connue pour ses olives et vins (vignobles Guerrouane). Restaurant place Lahdim : vue Bab Mansour.',
      vigilance_threshold: 220,
      updated: '2026-05-08',
    },
    guide: {
      description: 'Guide Médina Impériale Meknès',
      fair_price_min: 150,
      fair_price_max: 280,
      tourist_reasonable_min: 200,
      tourist_reasonable_max: 400,
      tips: 'Bab El Mansour (plus belle porte du Maroc), Mausolée Moulay Ismail, Hri Souani. Médina plus accessible que Fès.',
      updated: '2026-05-08',
    },
    excursion: {
      description: 'Visite Volubilis (UNESCO) + Moulay Idriss',
      fair_price_min: 250,
      fair_price_max: 420,
      tourist_reasonable_min: 320,
      tourist_reasonable_max: 560,
      tips: 'Volubilis : ruines romaines, entrée 70 DH, 30 min de Meknès. Moulay Idriss : ville sainte, accès libre.',
      updated: '2026-05-08',
    },
    transport: {
      description: 'Train ONCF / Bus CTM Meknès',
      fair_price_min: 40,
      fair_price_max: 150,
      tourist_reasonable_min: 45,
      tourist_reasonable_max: 150,
      tips: 'Meknès → Fès : 30–50 DH, 45 min en train. Meknès → Casa : 90–130 DH.',
      updated: '2026-05-08',
    },
    shopping: {
      description: 'Artisanat Meknès (broderie, poterie, olives)',
      fair_price_min: 50,
      fair_price_max: 400,
      tourist_reasonable_min: 80,
      tourist_reasonable_max: 600,
      tips: 'Broderie de Meknès réputée. Olives marinées : 15–30 DH/kg. Prix plus bas que Marrakech.',
      updated: '2026-05-08',
    },
  },

  // ════════════════════════════════════════════════════════
  Merzouga: {
    taxi: {
      description: 'Taxi / transfert Merzouga (village désert)',
      fair_price_min: 5,
      fair_price_max: 15,
      tourist_reasonable_min: 10,
      tourist_reasonable_max: 25,
      tips: 'Village du désert. Grand taxi depuis Errachidia : 70–120 DH/pers. Depuis Rissani (15 km) : 30–50 DH.',
      updated: '2026-05-08',
    },
    guesthouse: {
      description: 'Guesthouse / Riad Sahara Merzouga',
      fair_price_min: 180,
      fair_price_max: 380,
      tourist_reasonable_min: 250,
      tourist_reasonable_max: 580,
      luxury_min: 600,
      luxury_max: 1500,
      tips: 'Options simples (180 DH) ou luxe avec piscine (700+ DH). Inclure demi-pension dans la négociation.',
      updated: '2026-05-08',
    },
    restaurant: {
      description: 'Repas Merzouga (cuisine berbère)',
      fair_price_min: 40,
      fair_price_max: 90,
      tourist_reasonable_min: 60,
      tourist_reasonable_max: 130,
      tips: 'Choix limité en dehors des hôtels. Tajine berbère : 50–90 DH. Couscous vendredi : spécialité.',
      updated: '2026-05-08',
    },
    excursion: {
      description: 'Excursion dunes Erg Chebbi (chameau + coucher soleil)',
      fair_price_min: 200,
      fair_price_max: 400,
      tourist_reasonable_min: 280,
      tourist_reasonable_max: 550,
      tips: 'Chameau 1h30 A/R : 150–250 DH/pers. 4x4 dans les dunes : 300–500 DH/véhicule. Lever/coucher soleil : expérience unique.',
      vigilance_threshold: 750,
      updated: '2026-05-08',
    },
    bivouac: {
      description: 'Nuit en bivouac dans les dunes (tout compris)',
      fair_price_min: 250,
      fair_price_max: 450,
      tourist_reasonable_min: 350,
      tourist_reasonable_max: 650,
      luxury_min: 700,
      luxury_max: 1800,
      tips: 'Inclure : dîner berbère + musique gnaoua + petit-déjeuner + nuit tente. Comparer plusieurs camps. Luxe avec lit : 700–1 800 DH/pers.',
      vigilance_threshold: 900,
      updated: '2026-05-08',
    },
    guide: {
      description: 'Guide désert Merzouga (4x4 + dunes)',
      fair_price_min: 300,
      fair_price_max: 600,
      tourist_reasonable_min: 400,
      tourist_reasonable_max: 800,
      tips: 'Journée 4x4 + guide : lacs Dayet Srji (flamants roses), villages nomades, sources. 400–800 DH/véhicule (4 pers max).',
      updated: '2026-05-08',
    },
  },

  // ════════════════════════════════════════════════════════
  Dakhla: {
    taxi: {
      description: 'Taxi Dakhla (Sahara Atlantique)',
      fair_price_min: 10,
      fair_price_max: 18,
      tourist_reasonable_min: 15,
      tourist_reasonable_max: 28,
      tips: 'Ville étendue sur une péninsule. Aéroport → centre : 40–70 DH.',
      updated: '2026-05-08',
    },
    hotel: {
      description: 'Hôtel / camp bord de lagon',
      fair_price_min: 300,
      fair_price_max: 650,
      tourist_reasonable_min: 420,
      tourist_reasonable_max: 900,
      tips: 'Destination kitesurfing en plein essor. Réserver à l\'avance en haute saison (novembre–avril). Camps kite souvent tout inclus.',
      updated: '2026-05-08',
    },
    restaurant: {
      description: 'Restaurant fruits de mer (port très actif)',
      fair_price_min: 70,
      fair_price_max: 150,
      tourist_reasonable_min: 100,
      tourist_reasonable_max: 220,
      tips: 'Port de pêche majeur. Homard, poulpe, daurade, crevettes à prix imbattables directement au port.',
      updated: '2026-05-08',
    },
    excursion: {
      description: 'Lagon + Îles Gandaous + SUP + sandboard',
      fair_price_min: 250,
      fair_price_max: 450,
      tourist_reasonable_min: 350,
      tourist_reasonable_max: 620,
      tips: 'Eaux turquoise du lagon. Flamants roses, dauphins. SUP : 150–250 DH/2h. Sandboard dunes : 100–180 DH.',
      updated: '2026-05-08',
    },
    activite: {
      description: 'Kitesurf leçon (2–3h) — spot mondial classé',
      fair_price_min: 280,
      fair_price_max: 500,
      tourist_reasonable_min: 350,
      tourist_reasonable_max: 620,
      tips: 'Spot classé parmi les 3 meilleurs mondiaux. Plusieurs écoles certifiées IKO. Forfait semaine : 1 200–2 000 DH.',
      updated: '2026-05-08',
    },
    spa: {
      description: 'Spa / massage Dakhla',
      fair_price_min: 150,
      fair_price_max: 350,
      tourist_reasonable_min: 200,
      tourist_reasonable_max: 450,
      tips: 'Offre spa en développement. Massages sportifs après sessions kite : 150–280 DH/h.',
      updated: '2026-05-08',
    },
    transport: {
      description: 'Bus CTM Dakhla (très longue distance)',
      fair_price_min: 200,
      fair_price_max: 350,
      tourist_reasonable_min: 220,
      tourist_reasonable_max: 350,
      tips: 'Dakhla → Agadir : ~1 200 km, 220–280 DH, 16–18h. Dakhla → Laâyoune : 180–220 DH. Vol RAM recommandé si budget disponible.',
      updated: '2026-05-08',
    },
  },

  // ════════════════════════════════════════════════════════
  'El Jadida': {
    taxi: {
      description: 'Taxi El Jadida (Côte Atlantique)',
      fair_price_min: 8,
      fair_price_max: 14,
      tourist_reasonable_min: 12,
      tourist_reasonable_max: 20,
      tips: 'Petite ville côtière agréable. Grand taxi El Jadida → Casablanca : 35–50 DH/pers partagé.',
      updated: '2026-05-08',
    },
    hotel: {
      description: 'Hôtel côtier El Jadida',
      fair_price_min: 240,
      fair_price_max: 520,
      tourist_reasonable_min: 330,
      tourist_reasonable_max: 700,
      tips: 'Alternative moins chère qu\'Agadir. Citerne Portugaise (UNESCO) à visiter absolument.',
      updated: '2026-05-08',
    },
    restaurant: {
      description: 'Restaurant fruits de mer / huîtres d\'Oualidia',
      fair_price_min: 65,
      fair_price_max: 130,
      tourist_reasonable_min: 90,
      tourist_reasonable_max: 180,
      tips: 'Huîtres de Oualidia (20 km) : spécialité régionale, 60–100 DH la douzaine. Poisson frais du port.',
      updated: '2026-05-08',
    },
    guide: {
      description: 'Guide Cité Portugaise UNESCO + remparts',
      fair_price_min: 100,
      fair_price_max: 200,
      tourist_reasonable_min: 150,
      tourist_reasonable_max: 290,
      tips: 'Citerne Portugaise : entrée 10 DH, chef-d\'œuvre architectural XVIème siècle. Demi-journée : 100–200 DH.',
      updated: '2026-05-08',
    },
    excursion: {
      description: 'Excursion Oualidia + côte atlantique',
      fair_price_min: 150,
      fair_price_max: 320,
      tourist_reasonable_min: 220,
      tourist_reasonable_max: 420,
      tips: 'Oualidia : lagune, huîtres, flamants roses. Azemmour (30 km) : ville blanche sur l\'Oum Er-Rbia.',
      updated: '2026-05-08',
    },
    transport: {
      description: 'Bus CTM El Jadida',
      fair_price_min: 40,
      fair_price_max: 100,
      tourist_reasonable_min: 50,
      tourist_reasonable_max: 100,
      tips: 'El Jadida → Casablanca : 40–60 DH, 1h30. El Jadida → Marrakech : 80–110 DH, 3h.',
      updated: '2026-05-08',
    },
  },

  // ════════════════════════════════════════════════════════
  Essaouira: {
    taxi: {
      description: 'Taxi Essaouira (Cité des Alizés)',
      fair_price_min: 10,
      fair_price_max: 18,
      tourist_reasonable_min: 15,
      tourist_reasonable_max: 25,
      tips: 'Petite ville pittoresque. Remparts et médina accessibles à pied. Calèches : 50–80 DH/h.',
      updated: '2026-05-08',
    },
    hotel: {
      description: 'Hôtel / Riad Essaouira',
      fair_price_min: 300,
      fair_price_max: 600,
      tourist_reasonable_min: 400,
      tourist_reasonable_max: 820,
      tips: 'Réserver très à l\'avance pour le Festival Gnaoua (juin) : prix triplent. Hors festival : tarifs raisonnables.',
      updated: '2026-05-08',
    },
    restaurant: {
      description: 'Poisson grillé / fruits de mer port',
      fair_price_min: 70,
      fair_price_max: 140,
      tourist_reasonable_min: 95,
      tourist_reasonable_max: 200,
      tips: 'Port de pêche actif. Grillades sur le port : repas complet 60–100 DH, excellent. Restaurants remparts : plus chers mais vue mer.',
      vigilance_threshold: 300,
      updated: '2026-05-08',
    },
    guide: {
      description: 'Guide Médina + Remparts Essaouira (UNESCO)',
      fair_price_min: 120,
      fair_price_max: 260,
      tourist_reasonable_min: 170,
      tourist_reasonable_max: 360,
      tips: 'Skala de la ville : vue mer gratuite. Médina UNESCO, ancienne Mogador portugaise. Demi-journée : 120–260 DH.',
      updated: '2026-05-08',
    },
    excursion: {
      description: 'Excursion plage + îles Purpuraires + forêt thuya',
      fair_price_min: 200,
      fair_price_max: 380,
      tourist_reasonable_min: 280,
      tourist_reasonable_max: 520,
      tips: 'Îles ornithologiques (balbuzards pêcheurs). Grande plage : windsurf et kite. Forêt de thuya : artisanat unique.',
      updated: '2026-05-08',
    },
    shopping: {
      description: 'Bois de thuya + artisanat local',
      fair_price_min: 80,
      fair_price_max: 500,
      tourist_reasonable_min: 120,
      tourist_reasonable_max: 750,
      tips: 'Thuya : bois précieux local sculpté. Coopératives de femmes argan : prix officiels affichés. Négocier 20–30% dans souks.',
      updated: '2026-05-08',
    },
    spa: {
      description: 'Hammam / spa Essaouira',
      fair_price_min: 80,
      fair_price_max: 180,
      tourist_reasonable_min: 120,
      tourist_reasonable_max: 260,
      tips: 'Plusieurs spas dans la médina. Hammam populaire : 20–40 DH. Avec soins argan : 150–300 DH.',
      updated: '2026-05-08',
    },
    transport: {
      description: 'Bus Essaouira (CTM / Supratours)',
      fair_price_min: 70,
      fair_price_max: 120,
      tourist_reasonable_min: 80,
      tourist_reasonable_max: 120,
      tips: 'Essaouira → Marrakech : 70–90 DH, 2h30. Essaouira → Agadir : 80–100 DH, 3h. Supratours recommandé.',
      updated: '2026-05-08',
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// MOTS-CLÉS INTERDITS — toutes les langues supportées
// Tooristoo refuse toute analyse pour des services illégaux ou contraires
// à la loi marocaine
// ─────────────────────────────────────────────────────────────────────────────
export const PROHIBITED_KEYWORDS = {
  fr: [
    'prostitution', 'escort', 'call girl', 'services sexuels', 'sexe tarifé',
    'fille facile', 'pute', 'travailleuse du sexe',
    'drogue', 'cannabis', 'cocaïne', 'hashish', 'haschich', 'kif', 'shit', 'beuh',
    'armes', 'explosif',
    'traite humain', 'traite humaine', 'passeur',
    'blanchiment', 'faux billet', 'contrefaçon', 'esclave',
    'corruption', 'pot-de-vin', 'escort girl', 'massage érotique', 'massage sensuel', 'massage avec finition',
    'plan cul', 'rdv tarifé', 'rdv discret', 'prestations adultes',
    'maison close', 'bordel', 'proxénétisme', 'proxénète',
    'stupéfiants', 'produits stupéfiants', 'dealer', 'deal', 'trafic de drogue',
    'ecstasy', 'mdma', 'lsd', 'amphétamine', 'crack',
    'kalachnikov', 'pistolet', 'fusil', 'munition', 'arme à feu',
    'trafic d\'êtres humains', 'réseau de passeurs', 'migration clandestine',
    'fraude', 'escroquerie', 'arnaque', 'faux documents', 'faux papiers',
    'usurpation', 'usurpation d\'identité',
    'corrompre', 'commission occulte', 'dessous-de-table'
  ],
  en: [
    'prostitution', 'escort', 'call girl', 'sex service', 'sexual service', 'sex worker',
    'prostitute', 'whore', 'hooker',
    'drug', 'cocaine', 'cannabis', 'hashish', 'weed', 'marijuana', 'heroin',
    'weapon', 'explosive',
    'human trafficking', 'smuggling',
    'money laundering', 'fake bill', 'counterfeit', 'slave',
    'bribe', 'bribery', 'adult services', 'erotic massage', 'sensual massage', 'happy ending',
    'paid sex', 'sex for money', 'brothel', 'pimp', 'pimping',
    'drug dealing', 'drug trafficking', 'dealer', 'ecstasy', 'mdma', 'lsd', 'amphetamine', 'crack cocaine',
    'gun', 'firearm', 'pistol', 'rifle', 'ammo', 'ammunition',
    'illegal immigration', 'people smuggler', 'smuggler network',
    'scam', 'fraud', 'identity theft', 'fake documents', 'forged documents',
    'kickback', 'under the table payment'
  ],
  es: [
    'prostitución', 'escort', 'servicios sexuales',
    'droga', 'cocaína', 'cannabis', 'hachís', 'puta',
    'arma', 'explosivo',
    'tráfico humano', 'lavado dinero', 'billete falso', 'contrafacción', 'soborno',
    'servicios para adultos', 'masaje erótico', 'final feliz',
    'sexo pagado', 'burdel', 'proxeneta',
    'tráfico de drogas', 'traficante', 'éxtasis', 'mdma', 'lsd', 'anfetamina', 'crack',
    'pistola', 'arma de fuego', 'munición',
    'inmigración ilegal', 'traficante de personas',
    'estafa', 'fraude', 'documentos falsos', 'robo de identidad',
    'pago ilegal', 'comisión ilegal'
  ],
  de: [
    'prostitution', 'escort', 'sexuelle dienstleistungen',
    'droge', 'kokain', 'cannabis', 'haschisch', 'hure',
    'waffe', 'sprengstoff',
    'menschenhandel', 'geldwäsche', 'falschgeld', 'fälschung', 'bestechung',
    'erotische massage', 'happy end massage', 'bezahlter sex',
    'bordell', 'zuhälter',
    'drogenhandel', 'dealer', 'ecstasy', 'mdma', 'lsd', 'amphetamin', 'crack',
    'schusswaffe', 'pistole', 'gewehr', 'munition',
    'illegale einwanderung', 'schleuser', 'schleusernetzwerk',
    'betrug', 'identitätsdiebstahl', 'gefälschte dokumente',
    'schmiergeld', 'illegale zahlung'
  ],
  ar: [
    'دعارة', 'بغاء', 'عاهرة', 'خدمات جنسية', 'مخدرات', 'كوكايين', 'حشيش', 'قنب',
    'أسلحة', 'متفجرات', 'اتجار بالبشر', 'تهريب', 'غسيل أموال', 'تزوير', 'رقيق', 'رشوة',
    'دعارة سرية', 'جنس مقابل المال', 'تدليك إيروتيكي', 'بيت دعارة', 'قواد',
    'تجارة المخدرات', 'مروج مخدرات', 'إكستازي', 'إم دي إم إيه', 'إل إس دي',
    'مسدس', 'بندقية', 'ذخيرة', 'سلاح ناري',
    'هجرة غير شرعية', 'مهرب بشر',
    'احتيال', 'نصب', 'سرقة هوية', 'وثائق مزورة', 'رشوة مالية', 'دفع غير قانوني'
  ],
  darija: [
    'بغاء', 'عاهرة', 'خدمات جنسية', 'مخدرات', 'كوكاين', 'حشيش', 'كيف', 'سلاح', 'تهريب',
    'غسيل فلوس', 'تزوير', 'رشوة',
    'دعارة سرية', 'جنس مقابل المال', 'تدليك إيروتيكي', 'بيت دعارة', 'قواد',
    'تجارة المخدرات', 'مروج مخدرات', 'إكستازي', 'إم دي إم إيه', 'إل إس دي',
    'مسدس', 'بندقية', 'ذخيرة', 'سلاح ناري',
    'هجرة غير شرعية', 'مهرب بشر',
    'احتيال', 'نصب', 'سرقة هوية', 'وثائق مزورة', 'رشوة مالية', 'دفع غير قانوني'
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
${info.vigilance_threshold ? `- Seuil de vigilance (écart significatif si dépassé): ${info.vigilance_threshold} DH` : ''}
- Conseil pratique: ${info.tips}

CONSIGNE DE FORMULATION:
- Ne mentionne JAMAIS le mot "arnaque", "scam", "abus" ou "fraude" dans ton analyse.
- Présente l'écart de manière factuelle: "X DH au-dessus de la fourchette de référence".
- Si le prix demandé dépasse le seuil de vigilance, signale-le comme un "écart marqué".
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

// ─────────────────────────────────────────────────────────────────────────────
// FILET ANTI-VOCABULAIRE (multi-langues)
// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// RÉCUPÉRATION PRESTATAIRES
// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// RÉPONSE DE REFUS
// ─────────────────────────────────────────────────────────────────────────────
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

const LANG_NAME = {
  fr: 'français',
  en: 'English',
  es: 'español',
  de: 'Deutsch',
  ar: 'العربية',
  darija: 'الدارجة المغربية',
};

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

// ─────────────────────────────────────────────────────────────────────────────
// FONCTION PRINCIPALE — analyzeNegotiation
// ─────────────────────────────────────────────────────────────────────────────
export async function analyzeNegotiation({ category, city, priceAsked, description, transcript, lang = 'fr' }) {
  const userText = `${category} ${description || ''} ${transcript || ''}`;
  if (isProhibitedRequest(userText, lang)) {
    return { ...buildRefusal(lang), category, location: city, price_asked: 0 };
  }

  const [pricing, providers] = await Promise.all([
    Promise.resolve(getPricingInfo(city, category)),
    fetchProviders(category, city),
  ]);

  const responseLang = LANG_NAME[lang] || LANG_NAME.fr;
  const userInput = transcript
    ? `Transcription de la conversation entendue : "${transcript}"`
    : `Description : "${description || '(aucune)'}"`;

  // ── Détection du sous-type (aéroport, nuit, luxe) pour affiner la fourchette ──
  const fullContext = `${description || ''} ${transcript || ''}`.toLowerCase();
  const isAirport = /a[eé]ro|airport|matar|مطار|menara|ménara|rak\b/.test(fullContext);
  const isNight   = /nuit|night|soir|minuit|noche|nacht|ليل/.test(fullContext);
  const isLuxury  = /luxe|luxury|premium|palace|palais/.test(fullContext);

  let pricingBlock;
  if (pricing) {
    // Choisit la fourchette la plus pertinente selon le contexte
    let refMin, refMax, refLabel;
    if (isAirport && pricing.airport_min) {
      refMin   = pricing.airport_min;
      refMax   = pricing.airport_max;
      refLabel = 'Transfert aéroport';
    } else if (isLuxury && pricing.luxury_min) {
      refMin   = pricing.luxury_min;
      refMax   = pricing.luxury_max;
      refLabel = 'Version premium / luxe';
    } else {
      refMin   = pricing.tourist_reasonable_min;
      refMax   = pricing.tourist_reasonable_max;
      refLabel = 'Fourchette raisonnable touriste';
    }

    // Seuil de vigilance adapté : 2× la borne haute de référence si pas défini
    const vigilance = pricing.vigilance_threshold || refMax * 2;

    // Majoration nuit si applicable
    const nightNote = isNight && pricing.night_surcharge
      ? `\n- Majoration nuit applicable : ${pricing.night_surcharge}`
      : '';

    pricingBlock = `
FOURCHETTE DE RÉFÉRENCE (depuis PricingKnowledge — données vérifiées) :
- Service : ${pricing.description}
- Fourchette locale de base : ${pricing.fair_price_min}–${pricing.fair_price_max} DH
- ${refLabel} : ${refMin}–${refMax} DH  ← UTILISE CETTE FOURCHETTE POUR TON ANALYSE
- Seuil de vigilance : ${vigilance} DH (écart marqué si dépassé)${nightNote}
- Conseil : ${pricing.tips}

IMPORTANT : Le contexte indique ${isAirport ? 'un trajet AÉROPORT' : isLuxury ? 'une prestation PREMIUM' : 'un trajet standard'}.
Utilise la fourchette "${refLabel}" (${refMin}–${refMax} DH) comme référence principale, PAS la fourchette de base.`;
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
   - Base-toi sur la fourchette indiquée comme référence principale dans les données ci-dessus
   - "low" si prix demandé ≤ borne haute de la fourchette de référence principale
   - "medium" si prix demandé entre borne haute et seuil de vigilance
   - "high" si prix demandé ≥ seuil de vigilance OU > 2× borne haute de référence
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
  "ai_analysis": "Tooristoo n'analyse pas les prix de transactions illégales ou contraires à la loi marocaine.",
  "strategy": "Pour toute urgence, composez le 19 (Police) ou le +212 524 38 46 01 (Police Touristique de Marrakech).",
  "recommended_phrase": "—",
  "recommended_phrase_darija": "—"
}

═══════════════════════════════════════════════════════════
RÈGLES IMPORTANTES :
═══════════════════════════════════════════════════════════

⛔ INTERDIT : ne pas proposer ni mentionner de prestataires. Tooristoo gère cela séparément.
⛔ INTERDIT : ne pas inventer de prix. Utiliser EXCLUSIVEMENT les chiffres ci-dessus.
⛔ VOCABULAIRE INTERDIT : "arnaque", "arnaquer", "arnaqueur", "scam", "scammer",
"abus", "abusif", "abusive", "tromperie", "fraude", "frauduleux",
"estafa", "Betrug", "betrügerisch", "احتيال", "نصب", "محتال", "نصاب".

✅ Utiliser : "écart par rapport à la fourchette de référence", "prix au-dessus de la fourchette", "tarif supérieur à la moyenne locale".
✅ TON : factuel, neutre, respectueux de la culture marocaine du marchandage.
✅ FORMAT : utiliser "DH" et jamais "MAD" dans les textes.`;

  let llmResult;
  try {
    llmResult = await base44.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: LLM_SCHEMA,
    });
  } catch (err) {
    console.error('LLM error:', err);
    return {
      refused: false,
      price_estimated_min: pricing ? pricing.fair_price_min : 0,
      price_estimated_max: pricing ? pricing.fair_price_max : 0,
      risk_level: 'medium',
      scam_detected: false,
      ai_analysis: lang === 'en'
        ? 'Analysis temporarily unavailable. Reference range shown above.'
        : 'Analyse temporairement indisponible. La fourchette de référence est affichée ci-dessus.',
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