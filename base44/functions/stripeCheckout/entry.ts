import Stripe from 'npm:stripe@14';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

const PRICES = {
  voyageur: 'price_1TUAHNL7F4DvPq7SLuE3bgOs',
  voyageur_plus: 'price_1TUAJ8L7F4DvPq7SDTYw5byC',
};

Deno.serve(async (req) => {
  try {
    const { plan, success_url, cancel_url } = await req.json();

    const priceId = PRICES[plan];
    if (!priceId) {
      return Response.json({ error: 'Plan invalide' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: success_url || 'https://www.tooristoo.com/?payment=success',
      cancel_url: cancel_url || 'https://www.tooristoo.com/?payment=cancelled',
      metadata: {
        base44_app_id: Deno.env.get('BASE44_APP_ID'),
        plan,
      },
      subscription_data: {
        metadata: {
          base44_app_id: Deno.env.get('BASE44_APP_ID'),
          plan,
        },
      },
    });

    return Response.json({ url: session.url, session_id: session.id });
  } catch (error) {
    console.error('Stripe checkout error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});