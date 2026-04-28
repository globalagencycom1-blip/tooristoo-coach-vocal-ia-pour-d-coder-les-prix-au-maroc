import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

/**
 * Validates that a negotiation analysis request complies with Moroccan law
 * and ethical guidelines. Rejects any requests for illegal or harmful activities.
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { category, location, description, ai_analysis } = body;

    // List of prohibited activities that violate Moroccan law
    const prohibitedActivities = [
      'fraud',
      'scam',
      'counterfeit',
      'illegal',
      'stolen',
      'smuggling',
      'trafficking',
      'extortion',
      'bribery',
      'money laundering'
    ];

    // Check if any prohibited keywords are mentioned
    const checkText = `${category} ${location} ${description} ${ai_analysis}`.toLowerCase();
    const isProhibited = prohibitedActivities.some(activity => checkText.includes(activity));

    if (isProhibited) {
      return Response.json({
        compliant: false,
        message: 'Cette demande viole les conditions d\'utilisation. NegoShield AI ne doit être utilisé que pour des fins légales et conformes à la loi marocaine.',
        error: 'Non-compliant with legal requirements'
      }, { status: 403 });
    }

    return Response.json({
      compliant: true,
      message: 'Validation conforme - Analyse autorisée'
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});