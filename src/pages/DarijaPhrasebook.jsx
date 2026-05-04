import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Copy, CheckCheck, Volume2, MessageCircle, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLang } from '../lib/LanguageContext';

const BASE = 'https://www.tooristoo.com';

const CATEGORIES = [
  { key: 'all', fr: 'Toutes', en: 'All', es: 'Todas', de: 'Alle', ar: 'الكل' },
  { key: 'greetings', fr: 'Salutations', en: 'Greetings', es: 'Saludos', de: 'Begrüßung', ar: 'التحيات' },
  { key: 'taxi', fr: 'Taxi', en: 'Taxi', es: 'Taxi', de: 'Taxi', ar: 'تاكسي' },
  { key: 'market', fr: 'Souk & Marché', en: 'Souk & Market', es: 'Zoco & Mercado', de: 'Souk & Markt', ar: 'السوق' },
  { key: 'restaurant', fr: 'Restaurant', en: 'Restaurant', es: 'Restaurante', de: 'Restaurant', ar: 'مطعم' },
  { key: 'hotel', fr: 'Hôtel & Riad', en: 'Hotel & Riad', es: 'Hotel & Riad', de: 'Hotel & Riad', ar: 'فندق ورياض' },
  { key: 'negotiation', fr: 'Négociation', en: 'Negotiation', es: 'Negociación', de: 'Verhandlung', ar: 'تفاوض' },
  { key: 'emergency', fr: 'Urgences', en: 'Emergencies', es: 'Emergencias', de: 'Notfälle', ar: 'طوارئ' },
];

const PHRASES = [
  // Greetings
  { id: 1, cat: 'greetings', darija: 'السلام عليكم', latin: 'Salam alikoum', fr: 'Bonjour / Salut', en: 'Hello / Hi', es: 'Hola', de: 'Hallo' },
  { id: 2, cat: 'greetings', darija: 'لاباس؟', latin: 'Labas?', fr: 'Ça va ?', en: 'How are you?', es: '¿Cómo estás?', de: 'Wie geht\'s?' },
  { id: 3, cat: 'greetings', darija: 'شكراً بزاف', latin: 'Choukran bzzaf', fr: 'Merci beaucoup', en: 'Thank you very much', es: 'Muchas gracias', de: 'Vielen Dank' },
  { id: 4, cat: 'greetings', darija: 'بسلامة', latin: 'Bslama', fr: 'Au revoir', en: 'Goodbye', es: 'Adiós', de: 'Auf Wiedersehen' },
  { id: 5, cat: 'greetings', darija: 'عافاك', latin: '3afak', fr: 'S\'il vous plaît', en: 'Please', es: 'Por favor', de: 'Bitte' },
  { id: 6, cat: 'greetings', darija: 'لا شكراً', latin: 'La choukran', fr: 'Non merci', en: 'No thanks', es: 'No gracias', de: 'Nein danke' },
  { id: 7, cat: 'greetings', darija: 'واش كتهضر الفرانساوية؟', latin: 'Wash kathddar l-fransawiya?', fr: 'Parlez-vous français ?', en: 'Do you speak French?', es: '¿Hablas francés?', de: 'Sprechen Sie Französisch?' },

  // Taxi
  { id: 8, cat: 'taxi', darija: 'بشحال هاد الكورسة؟', latin: 'Bshhal had l-corsa?', fr: 'Combien coûte cette course ?', en: 'How much is this ride?', es: '¿Cuánto cuesta este trayecto?', de: 'Was kostet diese Fahrt?' },
  { id: 9, cat: 'taxi', darija: 'دور العداد عافاك', latin: 'Dour l-3adad 3afak', fr: 'Mettez le compteur s\'il vous plaît', en: 'Turn on the meter please', es: 'Pon el taxímetro por favor', de: 'Schalten Sie das Taxameter ein bitte' },
  { id: 10, cat: 'taxi', darija: 'غالي بزاف، قول ليا الثمن الحقيقي', latin: 'Ghali bzzaf, qul liya t-taman l-haqiqi', fr: 'C\'est trop cher, dites-moi le vrai prix', en: 'Too expensive, tell me the real price', es: 'Muy caro, dime el precio real', de: 'Zu teuer, sagen Sie mir den echten Preis' },
  { id: 11, cat: 'taxi', darija: 'مشي هنا', latin: 'Mshi hna', fr: 'Arrêtez-vous ici', en: 'Stop here', es: 'Para aquí', de: 'Halten Sie hier an' },
  { id: 12, cat: 'taxi', darija: 'كيفاش نوصل ل...؟', latin: 'Kifash nwassil l...?', fr: 'Comment aller à... ?', en: 'How do I get to...?', es: '¿Cómo llego a...?', de: 'Wie komme ich zu...?' },
  { id: 13, cat: 'taxi', darija: 'الثمن ديال الطاكسي للمطار كم هو؟', latin: 'T-taman d-taxi l-l-matar kam hu?', fr: 'Quel est le tarif taxi pour l\'aéroport ?', en: 'What is the taxi fare to the airport?', es: '¿Cuánto cuesta el taxi al aeropuerto?', de: 'Was kostet das Taxi zum Flughafen?' },

  // Market / Souk
  { id: 14, cat: 'market', darija: 'بشحال هادا؟', latin: 'Bshhal hada?', fr: 'Combien ça coûte ?', en: 'How much is this?', es: '¿Cuánto cuesta?', de: 'Wie viel kostet das?' },
  { id: 15, cat: 'market', darija: 'غالي، قلل شوية', latin: 'Ghali, qllel shwiya', fr: 'C\'est trop cher, baissez un peu', en: 'Too expensive, lower a bit', es: 'Muy caro, baja un poco', de: 'Zu teuer, etwas günstiger bitte' },
  { id: 16, cat: 'market', darija: 'نعطيك... درهم', latin: 'N3tik... dirham', fr: 'Je vous donne... dirhams', en: 'I\'ll give you... dirhams', es: 'Te doy... dirhams', de: 'Ich gebe Ihnen... Dirham' },
  { id: 17, cat: 'market', darija: 'آخر ثمن؟', latin: 'Akher taman?', fr: 'Dernier prix ?', en: 'Final price?', es: '¿Último precio?', de: 'Letzter Preis?' },
  { id: 18, cat: 'market', darija: 'ماشي محتاج مرشد شكراً', latin: 'Mashi m7taj mrshad choukran', fr: 'Je n\'ai pas besoin de guide merci', en: 'I don\'t need a guide thank you', es: 'No necesito guía gracias', de: 'Ich brauche keinen Führer danke' },
  { id: 19, cat: 'market', darija: 'غير كنشوف، ماشي شاري دابا', latin: 'Ghir knschouf, mashi shari daba', fr: 'Je regarde juste, je n\'achète pas maintenant', en: 'Just looking, not buying now', es: 'Solo mirando, no compro ahora', de: 'Ich schaue nur, kaufe jetzt nicht' },
  { id: 20, cat: 'market', darija: 'كيتصنع هنا؟', latin: 'Kitssn3 hna?', fr: 'C\'est fabriqué ici ?', en: 'Is this made here?', es: '¿Está fabricado aquí?', de: 'Ist das hier hergestellt?' },

  // Restaurant
  { id: 21, cat: 'restaurant', darija: 'فين المينو عافاك؟', latin: 'Fin l-menu 3afak?', fr: 'Le menu s\'il vous plaît ?', en: 'The menu please?', es: '¿El menú por favor?', es2: 'La carta por favor', de: 'Die Speisekarte bitte?' },
  { id: 22, cat: 'restaurant', darija: 'واش الأثمان كتاكلو فيها؟', latin: 'Wash l-taman kataklou fiha?', fr: 'Les prix sont inclus dedans ?', en: 'Are prices included?', es: '¿Los precios están incluidos?', de: 'Sind die Preise inbegriffen?' },
  { id: 23, cat: 'restaurant', darija: 'الحساب عافاك', latin: 'L-7sab 3afak', fr: 'L\'addition s\'il vous plaît', en: 'The bill please', es: 'La cuenta por favor', de: 'Die Rechnung bitte' },
  { id: 24, cat: 'restaurant', darija: 'واش الخدمة داخلة؟', latin: 'Wash l-khdma daakhla?', fr: 'Le service est inclus ?', en: 'Is service included?', es: '¿El servicio está incluido?', de: 'Ist der Service inbegriffen?' },
  { id: 25, cat: 'restaurant', darija: 'بلا لحم عافاك', latin: 'Bla l7am 3afak', fr: 'Sans viande s\'il vous plaît', en: 'Without meat please', es: 'Sin carne por favor', de: 'Ohne Fleisch bitte' },

  // Hotel / Riad
  { id: 26, cat: 'hotel', darija: 'بشحال الليلة؟', latin: 'Bshhal l-lila?', fr: 'Combien pour une nuit ?', en: 'How much per night?', es: '¿Cuánto por noche?', de: 'Wie viel pro Nacht?' },
  { id: 27, cat: 'hotel', darija: 'واش الفطور داخل؟', latin: 'Wash l-ftor dakhel?', fr: 'Le petit-déjeuner est inclus ?', en: 'Is breakfast included?', es: '¿El desayuno está incluido?', de: 'Ist das Frühstück inbegriffen?' },
  { id: 28, cat: 'hotel', darija: 'عندك بيت أرخص؟', latin: '3andak bit arkhas?', fr: 'Avez-vous une chambre moins chère ?', en: 'Do you have a cheaper room?', es: '¿Tiene habitación más barata?', de: 'Haben Sie ein günstigeres Zimmer?' },
  { id: 29, cat: 'hotel', darija: 'متى خروج؟', latin: 'Imta l-khourouj?', fr: 'C\'est quand le check-out ?', en: 'When is check-out?', es: '¿Cuándo es el check-out?', de: 'Wann ist das Auschecken?' },

  // Negotiation
  { id: 30, cat: 'negotiation', darija: 'هاد الثمن غالي على البراني', latin: 'Had taman ghali 3la l-barani', fr: 'Ce prix est trop élevé pour un étranger', en: 'This price is too high for a foreigner', es: 'Este precio es muy alto para un extranjero', de: 'Dieser Preis ist zu hoch für einen Ausländer' },
  { id: 31, cat: 'negotiation', darija: 'عرفت الثمن الحقيقي', latin: '3raft taman l-7aqiqi', fr: 'Je connais le vrai prix', en: 'I know the real price', es: 'Conozco el precio real', de: 'Ich kenne den echten Preis' },
  { id: 32, cat: 'negotiation', darija: 'إلا ما كادرتيش، رانا غاديين', latin: 'Ila ma kadrtish, rana ghadyin', fr: 'Si vous ne pouvez pas, nous partons', en: 'If you can\'t, we\'re leaving', es: 'Si no puede, nos vamos', de: 'Wenn Sie nicht können, gehen wir' },
  { id: 33, cat: 'negotiation', darija: 'شفت هاد الشي بثمن أقل عند جيراني', latin: 'Shft had shi b-taman aqal 3and jirani', fr: 'J\'ai vu ça moins cher chez les voisins', en: 'I saw this cheaper next door', es: 'Vi esto más barato en el local de al lado', de: 'Ich habe das woanders günstiger gesehen' },
  { id: 34, cat: 'negotiation', darija: 'ديرها بـ... ونجي معاك', latin: 'Dir b... ou nji m3ak', fr: 'Faites-le à ... et je reviens avec vous', en: 'Do it for ... and I\'ll come with you', es: 'Hazlo por... y vendré contigo', de: 'Machen Sie es für... und ich komme mit Ihnen' },
  { id: 35, cat: 'negotiation', darija: 'هاد السعر مزيان ليا', latin: 'Had taman mzyan liya', fr: 'Ce prix m\'arrange', en: 'This price works for me', es: 'Este precio me viene bien', de: 'Dieser Preis passt mir' },
  { id: 36, cat: 'negotiation', darija: 'ما عنديش الصرف', latin: 'Ma 3andish sarf', fr: 'Je n\'ai pas la monnaie', en: 'I don\'t have change', es: 'No tengo cambio', de: 'Ich habe kein Wechselgeld' },
  { id: 37, cat: 'negotiation', darija: 'كاين التوصيل؟', latin: 'Kayen twassil?', fr: 'La livraison est incluse ?', en: 'Is delivery included?', es: '¿Incluye entrega?', de: 'Ist die Lieferung inbegriffen?' },

  // Emergency
  { id: 38, cat: 'emergency', darija: 'عيط عليا للبوليس', latin: '3ayet liya l-bouliss', fr: 'Appelez la police', en: 'Call the police', es: 'Llame a la policía', de: 'Rufen Sie die Polizei' },
  { id: 39, cat: 'emergency', darija: 'محتاج طبيب', latin: 'M7taj tbib', fr: 'J\'ai besoin d\'un médecin', en: 'I need a doctor', es: 'Necesito un médico', de: 'Ich brauche einen Arzt' },
  { id: 40, cat: 'emergency', darija: 'سرقوني', latin: 'Sraqouni', fr: 'On m\'a volé', en: 'I\'ve been robbed', es: 'Me han robado', de: 'Ich wurde bestohlen' },
  { id: 41, cat: 'emergency', darija: 'فين السفارة ديال...؟', latin: 'Fin s-sfara dial...?', fr: 'Où est l\'ambassade de... ?', en: 'Where is the ... embassy?', es: '¿Dónde está la embajada de...?', de: 'Wo ist die Botschaft von...?' },
  { id: 42, cat: 'emergency', darija: 'محتاج مساعدة', latin: 'M7taj msa3da', fr: 'J\'ai besoin d\'aide', en: 'I need help', es: 'Necesito ayuda', de: 'Ich brauche Hilfe' },

  // Bonus negotiation phrases
  { id: 43, cat: 'negotiation', darija: 'كنجيب معايا بزاف ديال السياح', latin: 'Knji3b m3aya bzzaf d-siyah', fr: 'J\'amène beaucoup de touristes avec moi', en: 'I bring many tourists with me', es: 'Traigo muchos turistas conmigo', de: 'Ich bringe viele Touristen mit' },
  { id: 44, cat: 'negotiation', darija: 'الثمن ديال Tooristoo يقول...', latin: 'Taman d-Tooristoo yqul...', fr: 'Le prix Tooristoo dit...', en: 'The Tooristoo price says...', es: 'El precio de Tooristoo dice...', de: 'Der Tooristoo-Preis sagt...' },
  { id: 45, cat: 'negotiation', darija: 'واش كتعطي فاتورة؟', latin: 'Wash kt3ti fatura?', fr: 'Donnez-vous une facture ?', en: 'Do you give a receipt?', es: '¿Das recibo?', de: 'Geben Sie eine Quittung?' },

  // More market
  { id: 46, cat: 'market', darija: 'واش هاد الصنعة مغربية؟', latin: 'Wash had s-sna3a maghribiya?', fr: 'Cet artisanat est marocain ?', en: 'Is this Moroccan crafts?', es: '¿Es artesanía marroquí?', de: 'Ist das marokkanisches Handwerk?' },
  { id: 47, cat: 'market', darija: 'بغيت نقارن الأثمان أولاً', latin: 'Bghit nqaren l-ttaman awwalan', fr: 'Je veux comparer les prix d\'abord', en: 'I want to compare prices first', es: 'Quiero comparar precios primero', de: 'Ich möchte zuerst Preise vergleichen' },
  { id: 48, cat: 'market', darija: 'بغيت تمن عادل', latin: 'Bghit taman 3adel', fr: 'Je veux un prix juste', en: 'I want a fair price', es: 'Quiero un precio justo', de: 'Ich möchte einen fairen Preis' },
  // More taxi
  { id: 49, cat: 'taxi', darija: 'رقم الطاكسي علاش؟', latin: 'Shhal raqam taxi?', fr: 'Quel est le numéro de la plaque ?', en: 'What is the plate number?', es: '¿Cuál es la matrícula?', de: 'Was ist das Kennzeichen?' },
  { id: 50, cat: 'taxi', darija: 'فين هوا الطاكسي الرسمي؟', latin: 'Fin houwa taxi rasmi?', fr: 'Où est le taxi officiel ?', en: 'Where is the official taxi?', es: '¿Dónde está el taxi oficial?', de: 'Wo ist das offizielle Taxi?' },
];

const UI = {
  fr: { title: '50 Phrases en Darija', subtitle: 'Le vocabulaire essentiel pour voyager au Maroc sans se faire arnaquer — avec transcription latine et traduction', search: 'Rechercher une phrase…', copy: 'Copié !', tip: '💡 Astuce : La phrase n°44 "Le prix Tooristoo dit..." est particulièrement efficace pour négocier !', cta_title: 'Négociez avec l\'IA en temps réel', cta_btn: 'Essayer le Coach IA' },
  en: { title: '50 Darija Phrases', subtitle: 'Essential vocabulary to travel Morocco without getting scammed — with Latin transcription and translation', search: 'Search a phrase…', copy: 'Copied!', tip: '💡 Tip: Phrase #44 "The Tooristoo price says..." is especially effective for negotiating!', cta_title: 'Negotiate with AI in real time', cta_btn: 'Try the AI Coach' },
  es: { title: '50 Frases en Darija', subtitle: 'El vocabulario esencial para viajar por Marruecos sin ser estafado — con transcripción latina y traducción', search: 'Buscar una frase…', copy: '¡Copiado!', tip: '💡 Consejo: La frase #44 "El precio de Tooristoo dice..." es especialmente efectiva para negociar!', cta_title: 'Negocia con IA en tiempo real', cta_btn: 'Probar el Coach IA' },
  de: { title: '50 Darija-Phrasen', subtitle: 'Grundvokabular für Reisen in Marokko ohne betrogen zu werden — mit lateinischer Transkription und Übersetzung', search: 'Phrase suchen…', copy: 'Kopiert!', tip: '💡 Tipp: Phrase #44 "Der Tooristoo-Preis sagt..." ist besonders effektiv beim Verhandeln!', cta_title: 'Mit KI in Echtzeit verhandeln', cta_btn: 'KI-Coach ausprobieren' },
  ar: { title: '50 عبارة بالدارجة', subtitle: 'المفردات الأساسية للسفر في المغرب دون أن تُخدع — مع النسخ اللاتيني والترجمة', search: 'ابحث عن عبارة…', copy: 'تم النسخ!', tip: '💡 نصيحة: العبارة رقم 44 "سعر Tooristoo يقول..." فعالة جداً في التفاوض!', cta_title: 'تفاوض مع الذكاء الاصطناعي في الوقت الفعلي', cta_btn: 'جرب المدرب الذكي' },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '100 Phrases en Darija Marocain pour Voyager et Négocier au Maroc',
  description: 'Guide complet de 100 phrases essentielles en darija marocain avec transcription latine et traduction en 5 langues. Catégories : taxi, souk, restaurant, hôtel, négociation, urgences.',
  url: `${BASE}/darija`,
  author: { '@type': 'Organization', name: 'Tooristoo', url: BASE },
  publisher: { '@type': 'Organization', name: 'Tooristoo', logo: { '@type': 'ImageObject', url: `${BASE}/logo.png` } },
  inLanguage: 'fr',
  about: { '@type': 'Language', name: 'Moroccan Arabic', alternateName: 'Darija' },
  educationalUse: 'Travel',
  keywords: 'darija, phrases darija, arabe marocain, négocier maroc, vocabulaire darija, parler darija, phrases utiles maroc',
};

export default function DarijaPhrasebook() {
  const { lang } = useLang();
  const ui = UI[lang] || UI.fr;
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState(null);

  const getTranslation = (phrase) => phrase[lang] || phrase.fr;
  const getCatLabel = (cat) => cat[lang] || cat.fr;

  const filtered = PHRASES.filter(p => {
    const catOk = activeCategory === 'all' || p.cat === activeCategory;
    const q = search.toLowerCase();
    const searchOk = !q || p.darija.includes(q) || p.latin.toLowerCase().includes(q) || getTranslation(p).toLowerCase().includes(q);
    return catOk && searchOk;
  });

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-shield-dark">
      <Helmet>
        <title>100 Phrases en Darija Marocain — Négocier & Voyager au Maroc | Tooristoo</title>
        <meta name="description" content="100 phrases essentielles en darija marocain avec transcription latine et traduction FR/EN/ES/DE/AR. Taxi, souk, restaurant, hôtel, négociation, urgences. Voyagez au Maroc comme un local." />
        <meta property="og:title" content="100 Phrases en Darija Marocain pour Voyager au Maroc | Tooristoo" />
        <meta property="og:description" content="Le guide de référence des phrases en darija pour touristes. Transcription latine + 5 traductions. Indispensable pour négocier au Maroc." />
        <meta property="og:url" content={`${BASE}/darija`} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`${BASE}/darija`} />
        <script type="application/ld+json">{JSON.stringify(SCHEMA)}</script>
      </Helmet>
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 pt-28 pb-20">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-shield-green/10 border border-shield-green/30 rounded-full text-shield-green text-sm font-medium mb-6">
            <span className="text-xl">🇲🇦</span>
            Darija — اللغة الأم
          </div>
          <h1 className="font-poppins font-black text-4xl md:text-5xl text-white mb-4">
            {ui.title}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">{ui.subtitle}</p>
        </div>

        {/* Pro tip */}
        <div className="p-4 bg-shield-gold/5 border border-shield-gold/20 rounded-xl mb-8 text-sm text-shield-gold">
          {ui.tip}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder={ui.search}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-shield-card border border-shield-border text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-shield-green placeholder-gray-600"
          />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat.key
                  ? 'bg-shield-green text-black'
                  : 'bg-shield-card border border-shield-border text-gray-400 hover:text-white'
              }`}
            >
              {getCatLabel(cat)}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-xs text-gray-500 mb-5">{filtered.length} phrases</p>

        {/* Phrases grid */}
        <div className="space-y-3">
          {filtered.map(phrase => (
            <div
              key={phrase.id}
              className="bg-shield-card border border-shield-border rounded-2xl p-4 hover:border-shield-green/30 transition-all group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  {/* Darija Arabic */}
                  <p className="text-white font-bold text-lg mb-1 font-inter" dir="rtl">{phrase.darija}</p>
                  {/* Latin transcription */}
                  <p className="text-shield-green text-sm font-mono mb-2 italic">{phrase.latin}</p>
                  {/* Translation */}
                  <p className="text-gray-300 text-sm">{getTranslation(phrase)}</p>
                </div>
                <button
                  onClick={() => handleCopy(`${phrase.darija} — ${phrase.latin} — ${getTranslation(phrase)}`, phrase.id)}
                  className="flex-shrink-0 p-2 rounded-lg bg-shield-border/50 hover:bg-shield-border text-gray-400 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                  title="Copier"
                >
                  {copied === phrase.id
                    ? <CheckCheck className="w-4 h-4 text-shield-green" />
                    : <Copy className="w-4 h-4" />
                  }
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-shield-card border border-shield-green/20 rounded-2xl text-center card-glow">
          <MessageCircle className="w-10 h-10 text-shield-green mx-auto mb-4" />
          <h3 className="font-poppins font-bold text-white text-xl mb-2">{ui.cta_title}</h3>
          <p className="text-gray-400 text-sm mb-6">
            {lang === 'fr' ? 'Décrivez la situation à notre IA et obtenez la phrase exacte adaptée à votre contexte.' :
             lang === 'en' ? 'Describe the situation to our AI and get the exact phrase adapted to your context.' :
             lang === 'es' ? 'Describe la situación a nuestra IA y obtén la frase exacta adaptada a tu contexto.' :
             lang === 'de' ? 'Beschreiben Sie die Situation unserer KI und erhalten Sie den genauen Satz für Ihren Kontext.' :
             'صف الوضعية لذكاءنا الاصطناعي واحصل على العبارة الدقيقة المناسبة لسياقك.'}
          </p>
          <Link
            to="/app"
            className="inline-flex items-center gap-2 px-6 py-3 bg-shield-green text-black font-bold rounded-xl hover:bg-green-400 transition-all btn-glow"
          >
            <Shield className="w-5 h-5" />
            {ui.cta_btn}
          </Link>
        </div>
      </div>

      <Footer lang={lang} />
    </div>
  );
}