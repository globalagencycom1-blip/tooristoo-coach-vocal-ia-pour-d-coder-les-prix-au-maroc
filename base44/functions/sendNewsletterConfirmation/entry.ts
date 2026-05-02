import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const { email, lang = 'fr' } = body;

    if (!email || !email.includes('@')) {
      return Response.json({ error: 'Invalid email' }, { status: 400 });
    }

    const base44 = createClientFromRequest(req);

    // Save subscriber to database
    await base44.asServiceRole.entities.NewsletterSubscriber.create({
      email,
      lang,
      subscribed: true,
    });

    return Response.json({ success: true, message: 'Subscription confirmed' });
  } catch (error) {
    console.error('Newsletter error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});