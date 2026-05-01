export const PRIVACY_TRANSLATIONS = {
  fr: {
    badge: "Politique de confidentialité — RGPD",
    title: "Protection de vos données",
    subtitle: "Conformément au Règlement (UE) 2016/679 (RGPD) et à la loi Informatique et Libertés",
    rgpd_banner_title: "Service conforme RGPD",
    rgpd_banner_desc: "Tooristoo traite des données vocales. Ce traitement fait l'objet de protections renforcées détaillées à la section 3. Aucun audio n'est stocké sur nos serveurs.",
    footer_updated: "Dernière mise à jour : Mai 2026 — Version 2.0",
    footer_rights: "Pour exercer vos droits :",
    footer_authority: "Autorité de contrôle :",
    sections: [
      {
        title: "1. Identité du responsable de traitement",
        content: `La présente politique de confidentialité s'applique au service Tooristoo, édité par HCEE, société basée en France.\n\n**Responsable de traitement :** HCEE — Azeddine M.\n**Adresse :** 10 rue du Colisée, 75008 Paris, France\n**Email DPO :** contact@tooristoo.com`
      },
      {
        title: "2. Données collectées et finalités",
        content: `Nous collectons les catégories de données suivantes :\n\n**a) Données de compte :** adresse email, nom complet, langue préférée. Base légale : exécution du contrat (Art. 6.1.b RGPD).\n\n**b) Données vocales et transcriptions :** lorsque vous utilisez le coach vocal, votre microphone capture votre voix. La reconnaissance vocale est traitée localement dans votre navigateur via l'API Web Speech. Seul le texte transcrit (jamais l'audio brut) est transmis à nos serveurs pour analyse IA. Base légale : consentement explicite (Art. 6.1.a RGPD).\n\n**c) Données de négociation :** catégorie de service, ville, prix demandé, analyse IA, résultat de la négociation. Base légale : exécution du contrat (Art. 6.1.b RGPD).\n\n**d) Données d'usage :** logs de connexion, adresse IP, type d'appareil, langue du navigateur. Base légale : intérêt légitime (Art. 6.1.f RGPD).\n\n**e) Signalements d'arnaques :** descriptions soumises volontairement. Base légale : consentement (Art. 6.1.a RGPD).`
      },
      {
        title: "3. Traitement des données vocales — protections renforcées",
        content: `Le traitement de données vocales fait l'objet de protections renforcées conformément aux lignes directrices du CEPD.\n\n**Ce que nous faisons :**\n• La reconnaissance vocale est effectuée localement dans votre navigateur (API Web Speech W3C)\n• Seul le texte transcrit est envoyé à notre infrastructure\n• Aucun fichier audio n'est stocké sur nos serveurs\n• Les transcriptions sont conservées uniquement le temps du traitement IA (moins de 60 secondes)\n\n**Ce que nous ne faisons pas :**\n• Nous ne stockons jamais d'enregistrements audio\n• Nous ne partageons pas vos transcriptions à des fins publicitaires\n• Nous n'effectuons pas de reconnaissance vocale biométrique\n\n**Droit de retrait :** vous pouvez révoquer l'accès au microphone à tout moment via les paramètres de votre navigateur.`
      },
      {
        title: "4. Transferts hors Union européenne",
        content: `Nos serveurs sont hébergés dans l'Union européenne. Certains sous-traitants peuvent traiter des données hors UE :\n\n• **Services IA :** fournisseurs soumis aux clauses contractuelles types (CCT) approuvées par la Commission européenne (Art. 46 RGPD).\n• **Infrastructure cloud :** hébergement certifié ISO 27001, avec DPA en place.\n\nAucun transfert n'est effectué sans garanties appropriées.`
      },
      {
        title: "5. Durées de conservation",
        content: `Nous appliquons le principe de minimisation des données (Art. 5.1.e RGPD) :\n\n• **Données de compte :** durée de l'abonnement + 3 ans après résiliation\n• **Données de négociation :** 24 mois, puis anonymisées\n• **Transcriptions textuelles :** < 60 secondes (traitement uniquement), résultat conservé 24 mois\n• **Logs de connexion :** 12 mois (exigence légale)\n• **Signalements d'arnaques :** 36 mois ou jusqu'à demande de suppression\n• **Suppression de compte :** effective sous 30 jours`
      },
      {
        title: "6. Partage des données",
        content: `Vos données ne sont jamais vendues. Elles peuvent être partagées uniquement avec :\n\n• **Sous-traitants techniques :** hébergement, emails transactionnels, analyse IA — liés par DPA conformes RGPD\n• **Autorités publiques :** uniquement sur réquisition judiciaire\n• **En cas de cession :** notification 30 jours avant tout transfert\n\nNous ne transmettons jamais vos données à des réseaux publicitaires ou data brokers.`
      },
      {
        title: "7. Vos droits RGPD",
        content: `Conformément au Règlement (UE) 2016/679, vous disposez des droits suivants :\n\n• **Droit d'accès (Art. 15) :** obtenir une copie de toutes vos données\n• **Droit de rectification (Art. 16) :** corriger des données inexactes\n• **Droit à l'effacement (Art. 17) :** demander la suppression ("droit à l'oubli")\n• **Droit à la limitation (Art. 18) :** suspendre le traitement sans suppression\n• **Droit à la portabilité (Art. 20) :** recevoir vos données en JSON/CSV\n• **Droit d'opposition (Art. 21) :** s'opposer au traitement fondé sur l'intérêt légitime\n• **Retrait du consentement :** à tout moment, sans effet rétroactif\n\n**Contact :** contact@tooristoo.com — Réponse sous 30 jours.\n\n**Réclamation CNIL :** www.cnil.fr — 3 Place de Fontenoy, 75007 Paris.`
      },
      {
        title: "8. Cookies et traceurs",
        content: `Nous utilisons des cookies conformément à la directive ePrivacy et aux recommandations CNIL 2020.\n\n**Cookies nécessaires (sans consentement) :**\n• Session d'authentification (durée : session)\n• Préférence de langue (durée : 12 mois)\n• Paramètres de consentement (durée : 13 mois max)\n\n**Cookies d'analyse (consentement requis) :**\n• Mesure d'audience anonymisée\n\n**Aucun cookie publicitaire** n'est utilisé sur Tooristoo.`
      },
      {
        title: "9. Sécurité des données",
        content: `Mesures techniques et organisationnelles conformes à l'Art. 32 RGPD :\n\n• Chiffrement TLS 1.3 en transit, AES-256 au repos\n• Accès aux données restreint par rôle (RBAC)\n• Authentification forte (MFA) pour les accès administrateurs\n• Tests de pénétration annuels\n• Notification de violation sous 72h à la CNIL (Art. 33 RGPD)\n• Registre des activités de traitement tenu à jour (Art. 30 RGPD)`
      },
      {
        title: "10. Contact et DPO",
        content: `**Email :** contact@tooristoo.com\n**Courrier :** HCEE — Protection des données, 10 rue du Colisée, 75008 Paris\n\nRéponse garantie sous 30 jours calendaires (Art. 12 RGPD).\n\n**Dernière mise à jour :** Mai 2026 — Version 2.0 — Conforme RGPD (UE) 2016/679`
      }
    ]
  },
  en: {
    badge: "Privacy Policy — GDPR",
    title: "Your data protection",
    subtitle: "In accordance with Regulation (EU) 2016/679 (GDPR) and French Data Protection Act",
    rgpd_banner_title: "GDPR Compliant Service",
    rgpd_banner_desc: "Tooristoo processes voice data. This processing is subject to enhanced protections detailed in section 3. No audio is stored on our servers.",
    footer_updated: "Last updated: May 2026 — Version 2.0",
    footer_rights: "To exercise your rights:",
    footer_authority: "Supervisory authority:",
    sections: [
      {
        title: "1. Data Controller Identity",
        content: `This privacy policy applies to the Tooristoo service, published by HCEE, a company based in France.\n\n**Data Controller:** HCEE — Azeddine M.\n**Address:** 10 rue du Colisée, 75008 Paris, France\n**DPO Email:** contact@tooristoo.com`
      },
      {
        title: "2. Data Collected and Purposes",
        content: `We collect the following categories of data:\n\n**a) Account data:** email address, full name, preferred language. Legal basis: contract performance (Art. 6.1.b GDPR).\n\n**b) Voice data and transcripts:** when using the voice coach, your microphone captures your voice. Speech recognition is processed locally in your browser via the Web Speech API. Only the transcribed text (never raw audio) is sent to our servers for AI analysis. Legal basis: explicit consent (Art. 6.1.a GDPR).\n\n**c) Negotiation data:** service category, city, requested price, AI analysis, negotiation result. Legal basis: contract performance (Art. 6.1.b GDPR).\n\n**d) Usage data:** connection logs, IP address, device type, browser language. Legal basis: legitimate interest (Art. 6.1.f GDPR).\n\n**e) Scam reports:** descriptions voluntarily submitted. Legal basis: consent (Art. 6.1.a GDPR).`
      },
      {
        title: "3. Voice Data Processing — Enhanced Protections",
        content: `Voice data processing is subject to enhanced protections in line with EDPB guidelines.\n\n**What we do:**\n• Speech recognition is performed locally in your browser (W3C Web Speech API)\n• Only the transcribed text is sent to our infrastructure\n• No audio files are stored on our servers\n• Transcripts are retained only during AI processing (less than 60 seconds)\n\n**What we don't do:**\n• We never store audio recordings\n• We do not share your transcripts for advertising purposes\n• We do not perform biometric voice recognition\n\n**Right to withdraw:** you can revoke microphone access at any time via your browser settings.`
      },
      {
        title: "4. Transfers Outside the European Union",
        content: `Our servers are hosted in the European Union. Some processors may process data outside the EU:\n\n• **AI Services:** providers subject to Standard Contractual Clauses (SCCs) approved by the European Commission (Art. 46 GDPR).\n• **Cloud infrastructure:** ISO 27001 certified hosting, with DPA in place.\n\nNo transfers are made without appropriate safeguards.`
      },
      {
        title: "5. Retention Periods",
        content: `We apply the data minimization principle (Art. 5.1.e GDPR):\n\n• **Account data:** duration of active subscription + 3 years after termination\n• **Negotiation data:** 24 months, then anonymized\n• **Text transcripts:** < 60 seconds (processing only), result kept 24 months\n• **Connection logs:** 12 months (legal requirement)\n• **Scam reports:** 36 months or until deletion request\n• **Account deletion:** effective within 30 days`
      },
      {
        title: "6. Data Sharing",
        content: `Your data is never sold. It may only be shared with:\n\n• **Technical processors:** hosting, transactional emails, AI analysis — bound by GDPR-compliant DPAs\n• **Public authorities:** only upon judicial request\n• **In case of business transfer:** 30-day notice before any data transfer\n\nWe never share your data with advertising networks or data brokers.`
      },
      {
        title: "7. Your GDPR Rights",
        content: `Under Regulation (EU) 2016/679, you have the following rights:\n\n• **Right of access (Art. 15):** obtain a copy of all your data\n• **Right to rectification (Art. 16):** correct inaccurate data\n• **Right to erasure (Art. 17):** request deletion ("right to be forgotten")\n• **Right to restriction (Art. 18):** suspend processing without deletion\n• **Right to portability (Art. 20):** receive your data in JSON/CSV format\n• **Right to object (Art. 21):** object to processing based on legitimate interest\n• **Withdrawal of consent:** at any time, without retroactive effect\n\n**Contact:** contact@tooristoo.com — Response within 30 days.\n\n**Supervisory Authority:** ICO (UK) or CNIL (France) — www.cnil.fr`
      },
      {
        title: "8. Cookies and Trackers",
        content: `We use cookies in accordance with the ePrivacy Directive and CNIL 2020 guidelines.\n\n**Strictly necessary cookies (no consent required):**\n• Authentication session (duration: session)\n• Language preference (duration: 12 months)\n• Consent settings (duration: max 13 months)\n\n**Analytics cookies (consent required):**\n• Anonymized audience measurement\n\n**No advertising cookies** are used on Tooristoo.`
      },
      {
        title: "9. Data Security",
        content: `Technical and organizational measures compliant with Art. 32 GDPR:\n\n• TLS 1.3 encryption in transit, AES-256 at rest\n• Role-based access control (RBAC)\n• Strong authentication (MFA) for admin access\n• Annual penetration testing\n• Breach notification within 72h to supervisory authority (Art. 33 GDPR)\n• Up-to-date records of processing activities (Art. 30 GDPR)`
      },
      {
        title: "10. Contact and DPO",
        content: `**Email:** contact@tooristoo.com\n**Mail:** HCEE — Data Protection, 10 rue du Colisée, 75008 Paris\n\nGuaranteed response within 30 calendar days (Art. 12 GDPR).\n\n**Last updated:** May 2026 — Version 2.0 — GDPR (EU) 2016/679 compliant`
      }
    ]
  },
  es: {
    badge: "Política de Privacidad — RGPD",
    title: "Protección de sus datos",
    subtitle: "De conformidad con el Reglamento (UE) 2016/679 (RGPD)",
    rgpd_banner_title: "Servicio conforme al RGPD",
    rgpd_banner_desc: "Tooristoo procesa datos de voz. Este tratamiento está sujeto a protecciones reforzadas detalladas en la sección 3. No se almacena ningún audio en nuestros servidores.",
    footer_updated: "Última actualización: Mayo 2026 — Versión 2.0",
    footer_rights: "Para ejercer sus derechos:",
    footer_authority: "Autoridad de control:",
    sections: [
      { title: "1. Responsable del tratamiento", content: `Esta política de privacidad se aplica al servicio Tooristoo, editado por HCEE, sociedad con sede en Francia.\n\n**Responsable:** HCEE — Azeddine M.\n**Dirección:** 10 rue du Colisée, 75008 París, Francia\n**Email DPO:** contact@tooristoo.com` },
      { title: "2. Datos recopilados y finalidades", content: `Recopilamos las siguientes categorías de datos:\n\n**a) Datos de cuenta:** dirección de correo electrónico, nombre completo, idioma preferido. Base legal: ejecución del contrato (Art. 6.1.b RGPD).\n\n**b) Datos de voz y transcripciones:** al usar el coach vocal, el micrófono captura su voz. El reconocimiento de voz se procesa localmente en su navegador mediante la API Web Speech. Solo el texto transcrito (nunca el audio bruto) se envía a nuestros servidores. Base legal: consentimiento explícito (Art. 6.1.a RGPD).\n\n**c) Datos de negociación:** categoría de servicio, ciudad, precio solicitado, análisis IA. Base legal: ejecución del contrato (Art. 6.1.b RGPD).\n\n**d) Datos de uso:** registros de conexión, dirección IP, tipo de dispositivo. Base legal: interés legítimo (Art. 6.1.f RGPD).\n\n**e) Reportes de estafas:** descripciones enviadas voluntariamente. Base legal: consentimiento (Art. 6.1.a RGPD).` },
      { title: "3. Tratamiento de datos de voz — protecciones reforzadas", content: `El tratamiento de datos de voz está sujeto a protecciones reforzadas.\n\n**Lo que hacemos:**\n• El reconocimiento de voz se realiza localmente en su navegador\n• Solo el texto transcrito se envía a nuestra infraestructura\n• Ningún archivo de audio se almacena en nuestros servidores\n• Las transcripciones se conservan solo durante el procesamiento IA (menos de 60 segundos)\n\n**Lo que no hacemos:**\n• No almacenamos grabaciones de audio\n• No compartimos sus transcripciones con fines publicitarios\n• No realizamos reconocimiento biométrico de voz\n\n**Derecho de retirada:** puede revocar el acceso al micrófono en cualquier momento desde la configuración de su navegador.` },
      { title: "4. Transferencias fuera de la UE", content: `Nuestros servidores están alojados en la Unión Europea. Algunos procesadores pueden tratar datos fuera de la UE con las garantías apropiadas (cláusulas contractuales tipo, Art. 46 RGPD).` },
      { title: "5. Plazos de conservación", content: `• **Datos de cuenta:** duración de la suscripción + 3 años tras la baja\n• **Datos de negociación:** 24 meses, luego anonimizados\n• **Transcripciones:** < 60 segundos (solo procesamiento)\n• **Registros de conexión:** 12 meses\n• **Reportes de estafas:** 36 meses\n• **Eliminación de cuenta:** efectiva en 30 días` },
      { title: "6. Compartición de datos", content: `Sus datos nunca se venden. Solo se pueden compartir con procesadores técnicos vinculados por DPA conformes al RGPD, autoridades públicas bajo requerimiento judicial, o en caso de cesión empresarial (con previo aviso de 30 días).` },
      { title: "7. Sus derechos RGPD", content: `• **Acceso (Art. 15):** obtener copia de todos sus datos\n• **Rectificación (Art. 16):** corregir datos inexactos\n• **Supresión (Art. 17):** solicitar eliminación ("derecho al olvido")\n• **Limitación (Art. 18):** suspender el tratamiento\n• **Portabilidad (Art. 20):** recibir sus datos en JSON/CSV\n• **Oposición (Art. 21):** oponerse al tratamiento por interés legítimo\n\n**Contacto:** contact@tooristoo.com — Respuesta en 30 días.\n\n**Autoridad de control:** AEPD — www.aepd.es` },
      { title: "8. Cookies", content: `**Cookies necesarias (sin consentimiento):**\n• Sesión de autenticación\n• Preferencia de idioma (12 meses)\n• Configuración de consentimiento (máx. 13 meses)\n\n**Cookies de análisis (consentimiento requerido):**\n• Medición anónima de audiencia\n\n**Sin cookies publicitarias** en Tooristoo.` },
      { title: "9. Seguridad", content: `• Cifrado TLS 1.3 en tránsito, AES-256 en reposo\n• Control de acceso por roles (RBAC)\n• Autenticación fuerte (MFA) para administradores\n• Pruebas de penetración anuales\n• Notificación de brechas en 72h (Art. 33 RGPD)` },
      { title: "10. Contacto", content: `**Email:** contact@tooristoo.com\n**Correo:** HCEE — Protección de datos, 10 rue du Colisée, 75008 París\n\nRespuesta garantizada en 30 días (Art. 12 RGPD).\n\n**Última actualización:** Mayo 2026 — Versión 2.0` }
    ]
  },
  de: {
    badge: "Datenschutzrichtlinie — DSGVO",
    title: "Schutz Ihrer Daten",
    subtitle: "Gemäß Verordnung (EU) 2016/679 (DSGVO)",
    rgpd_banner_title: "DSGVO-konformer Dienst",
    rgpd_banner_desc: "Tooristoo verarbeitet Sprachdaten. Diese Verarbeitung unterliegt verstärkten Schutzmaßnahmen (Abschnitt 3). Keine Audiodaten werden auf unseren Servern gespeichert.",
    footer_updated: "Zuletzt aktualisiert: Mai 2026 — Version 2.0",
    footer_rights: "Zur Ausübung Ihrer Rechte:",
    footer_authority: "Aufsichtsbehörde:",
    sections: [
      { title: "1. Verantwortlicher", content: `Diese Datenschutzrichtlinie gilt für den Dienst Tooristoo, herausgegeben von HCEE, einem Unternehmen mit Sitz in Frankreich.\n\n**Verantwortlicher:** HCEE — Azeddine M.\n**Adresse:** 10 rue du Colisée, 75008 Paris, Frankreich\n**DSB-E-Mail:** contact@tooristoo.com` },
      { title: "2. Erhobene Daten und Zwecke", content: `Wir erheben folgende Datenkategorien:\n\n**a) Kontodaten:** E-Mail-Adresse, vollständiger Name, bevorzugte Sprache. Rechtsgrundlage: Vertragserfüllung (Art. 6.1.b DSGVO).\n\n**b) Sprachdaten und Transkripte:** Bei der Nutzung des Sprachcoaches nimmt Ihr Mikrofon Ihre Stimme auf. Die Spracherkennung erfolgt lokal im Browser (Web Speech API). Nur der transkribierte Text (nie rohe Audiodaten) wird an unsere Server übertragen. Rechtsgrundlage: ausdrückliche Einwilligung (Art. 6.1.a DSGVO).\n\n**c) Verhandlungsdaten:** Servicekategorie, Stadt, angeforderter Preis, KI-Analyse. Rechtsgrundlage: Vertragserfüllung.\n\n**d) Nutzungsdaten:** Verbindungsprotokolle, IP-Adresse, Gerätetyp. Rechtsgrundlage: berechtigtes Interesse (Art. 6.1.f DSGVO).\n\n**e) Betrugsmeldungen:** freiwillig eingereichte Beschreibungen. Rechtsgrundlage: Einwilligung.` },
      { title: "3. Sprachdatenverarbeitung — verstärkte Schutzmaßnahmen", content: `**Was wir tun:**\n• Spracherkennung erfolgt lokal im Browser (W3C Web Speech API)\n• Nur der transkribierte Text wird gesendet\n• Keine Audiodateien werden auf unseren Servern gespeichert\n• Transkripte werden nur während der KI-Verarbeitung aufbewahrt (< 60 Sekunden)\n\n**Was wir nicht tun:**\n• Wir speichern keine Audioaufnahmen\n• Wir teilen keine Transkripte zu Werbezwecken\n• Wir führen keine biometrische Spracherkennung durch\n\n**Widerruf:** Sie können den Mikrofonzugang jederzeit über Ihre Browsereinstellungen widerrufen.` },
      { title: "4. Übermittlungen außerhalb der EU", content: `Unsere Server befinden sich in der EU. Einige Auftragsverarbeiter können Daten außerhalb der EU verarbeiten, vorbehaltlich geeigneter Garantien (Standardvertragsklauseln, Art. 46 DSGVO).` },
      { title: "5. Speicherfristen", content: `• **Kontodaten:** Abonnementdauer + 3 Jahre nach Kündigung\n• **Verhandlungsdaten:** 24 Monate, dann anonymisiert\n• **Texttranskripte:** < 60 Sekunden (nur Verarbeitung)\n• **Verbindungsprotokolle:** 12 Monate\n• **Betrugsmeldungen:** 36 Monate\n• **Kontolöschung:** wirksam innerhalb von 30 Tagen` },
      { title: "6. Datenweitergabe", content: `Ihre Daten werden niemals verkauft. Sie können nur weitergegeben werden an: technische Auftragsverarbeiter (DSGVO-konformer AV-Vertrag), Behörden auf richterliche Anordnung, oder im Falle einer Unternehmensübertragung (30 Tage vorherige Benachrichtigung).` },
      { title: "7. Ihre DSGVO-Rechte", content: `• **Auskunft (Art. 15):** Kopie aller Ihrer Daten\n• **Berichtigung (Art. 16):** Korrektur unrichtiger Daten\n• **Löschung (Art. 17):** "Recht auf Vergessenwerden"\n• **Einschränkung (Art. 18):** Verarbeitung aussetzen\n• **Datenübertragbarkeit (Art. 20):** Daten als JSON/CSV\n• **Widerspruch (Art. 21):** Gegen berechtigtes Interesse\n\n**Kontakt:** contact@tooristoo.com — Antwort innerhalb von 30 Tagen.\n\n**Aufsichtsbehörde:** BfDI — www.bfdi.bund.de` },
      { title: "8. Cookies", content: `**Notwendige Cookies (keine Einwilligung erforderlich):**\n• Authentifizierungssitzung\n• Sprachpräferenz (12 Monate)\n• Einwilligungseinstellungen (max. 13 Monate)\n\n**Analyse-Cookies (Einwilligung erforderlich):**\n• Anonymisierte Reichweitenmessung\n\n**Keine Werbe-Cookies** auf Tooristoo.` },
      { title: "9. Datensicherheit", content: `• TLS 1.3-Verschlüsselung im Transit, AES-256 im Ruhezustand\n• Rollenbasierte Zugriffskontrolle (RBAC)\n• Starke Authentifizierung (MFA) für Administratoren\n• Jährliche Penetrationstests\n• Meldung von Datenpannen innerhalb von 72h (Art. 33 DSGVO)` },
      { title: "10. Kontakt und DSB", content: `**E-Mail:** contact@tooristoo.com\n**Post:** HCEE — Datenschutz, 10 rue du Colisée, 75008 Paris\n\nAntwort garantiert innerhalb von 30 Kalendertagen (Art. 12 DSGVO).\n\n**Zuletzt aktualisiert:** Mai 2026 — Version 2.0` }
    ]
  },
  ar: {
    badge: "سياسة الخصوصية — RGPD",
    title: "حماية بياناتك",
    subtitle: "وفقاً للائحة (EU) 2016/679 (RGPD)",
    rgpd_banner_title: "خدمة متوافقة مع RGPD",
    rgpd_banner_desc: "Tooristoo تعالج البيانات الصوتية. هذه المعالجة خاضعة لحمايات مشددة مفصلة في القسم 3. لا يتم تخزين أي صوت على خوادمنا.",
    footer_updated: "آخر تحديث: مايو 2026 — الإصدار 2.0",
    footer_rights: "لممارسة حقوقك:",
    footer_authority: "هيئة الرقابة:",
    sections: [
      { title: "1. هوية المتحكم في البيانات", content: `تنطبق سياسة الخصوصية هذه على خدمة Tooristoo، التي تصدرها HCEE، شركة مقرها فرنسا.\n\n**المتحكم في البيانات:** HCEE — عزالدين م.\n**العنوان:** 10 rue du Colisée، 75008 باريس، فرنسا\n**البريد الإلكتروني لمسؤول حماية البيانات:** contact@tooristoo.com` },
      { title: "2. البيانات المجمعة والأغراض", content: `نجمع الفئات التالية من البيانات:\n\n**أ) بيانات الحساب:** عنوان البريد الإلكتروني، الاسم الكامل، اللغة المفضلة. الأساس القانوني: تنفيذ العقد (المادة 6.1.ب RGPD).\n\n**ب) البيانات الصوتية والنصوص:** عند استخدام المدرب الصوتي، يلتقط الميكروفون صوتك. يتم التعرف على الصوت محلياً في متصفحك عبر API Web Speech. فقط النص المنسوخ (وليس الصوت الخام) يُرسل إلى خوادمنا. الأساس القانوني: الموافقة الصريحة (المادة 6.1.أ RGPD).\n\n**ج) بيانات التفاوض:** فئة الخدمة، المدينة، السعر المطلوب، تحليل الذكاء الاصطناعي. الأساس القانوني: تنفيذ العقد.\n\n**د) بيانات الاستخدام:** سجلات الاتصال، عنوان IP، نوع الجهاز. الأساس القانوني: المصلحة المشروعة (المادة 6.1.و RGPD).\n\n**هـ) تقارير الاحتيال:** أوصاف مقدمة طوعاً. الأساس القانوني: الموافقة.` },
      { title: "3. معالجة البيانات الصوتية — حمايات مشددة", content: `**ما نفعله:**\n• يتم التعرف على الصوت محلياً في متصفحك\n• فقط النص المنسوخ يُرسل إلى بنيتنا التحتية\n• لا يتم تخزين أي ملفات صوتية على خوادمنا\n• يتم الاحتفاظ بالنصوص فقط أثناء معالجة الذكاء الاصطناعي (أقل من 60 ثانية)\n\n**ما لا نفعله:**\n• لا نخزن أي تسجيلات صوتية\n• لا نشارك نصوصك لأغراض إعلانية\n• لا نجري التعرف البيومتري على الصوت\n\n**حق السحب:** يمكنك إلغاء الوصول إلى الميكروفون في أي وقت من إعدادات متصفحك.` },
      { title: "4. النقل خارج الاتحاد الأوروبي", content: `خوادمنا مستضافة في الاتحاد الأوروبي. بعض المعالجين الفرعيين قد يعالجون البيانات خارج الاتحاد الأوروبي مع ضمانات مناسبة (بنود تعاقدية قياسية، المادة 46 RGPD).` },
      { title: "5. فترات الاحتفاظ", content: `• **بيانات الحساب:** مدة الاشتراك + 3 سنوات بعد الإنهاء\n• **بيانات التفاوض:** 24 شهراً، ثم تصبح مجهولة الهوية\n• **النصوص:** < 60 ثانية (المعالجة فقط)\n• **سجلات الاتصال:** 12 شهراً\n• **تقارير الاحتيال:** 36 شهراً\n• **حذف الحساب:** فعّال في غضون 30 يوماً` },
      { title: "6. مشاركة البيانات", content: `لا يتم بيع بياناتك أبداً. يمكن مشاركتها فقط مع: المعالجين التقنيين الملزمين باتفاقيات معالجة البيانات المتوافقة مع RGPD، السلطات العامة بموجب أمر قضائي، أو في حالة نقل الأعمال (إشعار 30 يوماً مسبقاً).` },
      { title: "7. حقوقك بموجب RGPD", content: `• **حق الوصول (المادة 15):** الحصول على نسخة من جميع بياناتك\n• **حق التصحيح (المادة 16):** تصحيح البيانات غير الدقيقة\n• **حق المحو (المادة 17):** طلب الحذف ("الحق في النسيان")\n• **حق التقييد (المادة 18):** تعليق المعالجة\n• **حق قابلية النقل (المادة 20):** الحصول على بياناتك بتنسيق JSON/CSV\n• **حق الاعتراض (المادة 21):** الاعتراض على المعالجة القائمة على المصلحة المشروعة\n\n**التواصل:** contact@tooristoo.com — رد في غضون 30 يوماً.\n\n**هيئة الرقابة:** CNIL — www.cnil.fr` },
      { title: "8. ملفات تعريف الارتباط", content: `**ملفات تعريف الارتباط الضرورية (بدون موافقة):**\n• جلسة المصادقة\n• تفضيل اللغة (12 شهراً)\n• إعدادات الموافقة (13 شهراً كحد أقصى)\n\n**ملفات تعريف الارتباط التحليلية (موافقة مطلوبة):**\n• قياس الجمهور المجهول\n\n**لا ملفات تعريف ارتباط إعلانية** على Tooristoo.` },
      { title: "9. أمان البيانات", content: `• تشفير TLS 1.3 أثناء النقل، AES-256 في حالة الراحة\n• التحكم في الوصول القائم على الأدوار (RBAC)\n• المصادقة القوية (MFA) للمسؤولين\n• اختبارات الاختراق السنوية\n• إخطار بالاختراق في غضون 72 ساعة (المادة 33 RGPD)` },
      { title: "10. التواصل ومسؤول حماية البيانات", content: `**البريد الإلكتروني:** contact@tooristoo.com\n**البريد:** HCEE — حماية البيانات، 10 rue du Colisée، 75008 باريس\n\nرد مضمون في غضون 30 يوماً تقويمياً (المادة 12 RGPD).\n\n**آخر تحديث:** مايو 2026 — الإصدار 2.0` }
    ]
  },
  darija: {
    badge: "سياسة الخصوصية — RGPD",
    title: "حماية البيانات ديالك",
    subtitle: "وفقاً للائحة الأوروبية RGPD 2016/679",
    rgpd_banner_title: "خدمة متوافقة مع RGPD",
    rgpd_banner_desc: "Tooristoo كتعالج البيانات الصوتية. هاد المعالجة خاضعة لحمايات مشددة مفصلة فالقسم 3. ما كيتخزنش أي صوت على السيرفيرات ديالنا.",
    footer_updated: "آخر تحديث: مايو 2026 — الإصدار 2.0",
    footer_rights: "باش تمارس الحقوق ديالك:",
    footer_authority: "هيئة الرقابة:",
    sections: [
      { title: "1. هوية المسؤول عن البيانات", content: `سياسة الخصوصية هاد تنطبق على خدمة Tooristoo، لي تصدرها HCEE، شركة مقرها فرنسا.\n\n**المسؤول:** HCEE — عزالدين م.\n**العنوان:** 10 rue du Colisée، 75008 باريس، فرنسا\n**البريد الإلكتروني:** contact@tooristoo.com` },
      { title: "2. البيانات لي كنجمعوها والأغراض", content: `كنجمعو الفئات التالية ديال البيانات:\n\n**أ) بيانات الحساب:** البريد الإلكتروني، الإسم الكامل، اللغة المفضلة. الأساس القانوني: تنفيذ العقد (المادة 6.1.ب RGPD).\n\n**ب) البيانات الصوتية والنصوص:** ملي كتستخدم الكوتش الصوتي، الميكروفون كيلتقط صوتك. التعرف على الصوت كيتم محلياً فمتصفحك. غير النص المنسوخ (مش الصوت الخام) كيتبعت للسيرفيرات ديالنا. الأساس القانوني: الموافقة الصريحة.\n\n**ج) بيانات التفاوض:** فئة الخدمة، المدينة، الثمن المطلوب، تحليل الذكاء الاصطناعي. الأساس القانوني: تنفيذ العقد.\n\n**د) بيانات الاستخدام:** سجلات الاتصال، عنوان IP، نوع الجهاز. الأساس القانوني: المصلحة المشروعة.\n\n**هـ) تقارير النصب:** أوصاف مقدمة طوعاً. الأساس القانوني: الموافقة.` },
      { title: "3. معالجة البيانات الصوتية — حمايات مشددة", content: `**شنو كنديرو:**\n• التعرف على الصوت كيتم محلياً فمتصفحك\n• غير النص المنسوخ كيتبعت للبنية التحتية ديالنا\n• ما كيتخزنش أي ملف صوتي على السيرفيرات ديالنا\n• النصوص كتتحفظ غير أثناء معالجة الذكاء الاصطناعي (أقل من 60 ثانية)\n\n**شنو ما كنديروش:**\n• ما كنخزنوش أي تسجيلات صوتية\n• ما كنشاركوش النصوص ديالك لأغراض إعلانية\n• ما كنجريوش التعرف البيومتري على الصوت\n\n**حق السحب:** يمكنك إلغاء الوصول للميكروفون فأي وقت من إعدادات المتصفح ديالك.` },
      { title: "4. النقل خارج الاتحاد الأوروبي", content: `السيرفيرات ديالنا مستضافة فالاتحاد الأوروبي. بعض المعالجين الفرعيين يمكن يعالجو البيانات خارج الاتحاد الأوروبي مع ضمانات مناسبة (بنود تعاقدية قياسية، المادة 46 RGPD).` },
      { title: "5. مدد الاحتفاظ", content: `• **بيانات الحساب:** مدة الاشتراك + 3 سنوات بعد الإنهاء\n• **بيانات التفاوض:** 24 شهر، ثم تصبح مجهولة\n• **النصوص:** < 60 ثانية (المعالجة فقط)\n• **سجلات الاتصال:** 12 شهر\n• **تقارير النصب:** 36 شهر\n• **حذف الحساب:** فعّال فـ 30 يوم` },
      { title: "6. مشاركة البيانات", content: `البيانات ديالك ما كتتباعش أبداً. يمكن تتشارك غير مع: المعالجين التقنيين الملزمين باتفاقيات RGPD، السلطات العامة بموجب أمر قضائي، أو فحالة نقل الأعمال (إشعار 30 يوم مسبقاً).` },
      { title: "7. الحقوق ديالك بموجب RGPD", content: `• **حق الوصول (المادة 15):** الحصول على نسخة من جميع البيانات ديالك\n• **حق التصحيح (المادة 16):** تصحيح البيانات غير الصحيحة\n• **حق المحو (المادة 17):** طلب الحذف\n• **حق التقييد (المادة 18):** تعليق المعالجة\n• **حق قابلية النقل (المادة 20):** البيانات ديالك بتنسيق JSON/CSV\n• **حق الاعتراض (المادة 21):** الاعتراض على المعالجة\n\n**التواصل:** contact@tooristoo.com — رد فـ 30 يوم.\n\n**هيئة الرقابة:** CNIL — www.cnil.fr` },
      { title: "8. الكوكيز", content: `**الكوكيز الضرورية (بلا موافقة):**\n• جلسة المصادقة\n• تفضيل اللغة (12 شهر)\n• إعدادات الموافقة (13 شهر كحد أقصى)\n\n**كوكيز التحليل (موافقة مطلوبة):**\n• قياس الجمهور المجهول\n\n**ما كاينش كوكيز إعلانية** على Tooristoo.` },
      { title: "9. أمان البيانات", content: `• تشفير TLS 1.3 أثناء النقل، AES-256 في حالة الراحة\n• التحكم في الوصول القائم على الأدوار (RBAC)\n• المصادقة القوية (MFA) للمسؤولين\n• اختبارات الاختراق السنوية\n• إخطار بالاختراق في غضون 72 ساعة` },
      { title: "10. التواصل", content: `**البريد الإلكتروني:** contact@tooristoo.com\n**البريد:** HCEE — حماية البيانات، 10 rue du Colisée، 75008 باريس\n\nرد مضمون فـ 30 يوم تقويمي.\n\n**آخر تحديث:** مايو 2026 — الإصدار 2.0` }
    ]
  }
};

export function getPrivacyT(lang = 'fr') {
  return PRIVACY_TRANSLATIONS[lang] || PRIVACY_TRANSLATIONS['fr'];
}