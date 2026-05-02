import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const { email, lang = 'fr' } = body;

    if (!email || !email.includes('@')) {
      return Response.json({ error: 'Invalid email' }, { status: 400 });
    }

    const base44 = createClientFromRequest(req);

    const subjects = {
      fr: 'Bienvenue à la newsletter Tooristoo ✨',
      en: 'Welcome to Tooristoo Newsletter ✨',
      es: 'Bienvenido a la newsletter Tooristoo ✨',
      de: 'Willkommen zum Tooristoo Newsletter ✨',
      ar: 'أهلاً بك في نشرة Tooristoo ✨',
      darija: 'أهلاً بيك ف نيوزليتر Tooristoo ✨',
    };

    const bodies = {
      fr: `Merci de vous être abonné à Tooristoo Alert!\n\nVous recevrez chaque semaine:\n• Alertes abus de prix en temps réel\n• Prix du marché mis à jour\n• Phrases de négociation exclusives\n• Conseils de locaux\n\nBonne chance pour vos négociations! 🇲🇦`,
      en: `Thank you for subscribing to Tooristoo Alert!\n\nYou will receive weekly:\n• Real-time price abuse alerts\n• Updated market prices\n• Exclusive negotiation phrases\n• Local tips`,
      es: `¡Gracias por suscribirse a Tooristoo Alert!\n\nRecibirá cada semana:\n• Alertas de abuso de precio en tiempo real\n• Precios de mercado actualizados\n• Frases de negociación exclusivas\n• Consejos locales`,
      de: `Vielen Dank für Ihr Abonnement bei Tooristoo Alert!\n\nSie erhalten wöchentlich:\n• Echtzeit-Preismissbrauch-Warnungen\n• Aktualisierte Marktpreise\n• Exklusive Verhandlungsphrasen\n• Lokale Tipps`,
      ar: `شكراً لاشتراكك في تنبيهات Tooristoo!\n\nستتلقى أسبوعياً:\n• تنبيهات إساءة استخدام الأسعار الفورية\n• أسعار السوق المحدثة\n• عبارات تفاوض حصرية\n• نصائح محلية`,
      darija: `شكراً لتسجيلك ف Tooristoo Alert!\n\nغادي تقبل كل أسبوع:\n• تنبيهات الأثمان الغالية فوراً\n• أثمان السوق محدثة\n• جمل تفاوض حصرية\n• نصايح محلية`,
    };

    await base44.integrations.Core.SendEmail({
      to: email,
      subject: subjects[lang] || subjects.fr,
      body: bodies[lang] || bodies.fr,
    });

    return Response.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Newsletter error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});