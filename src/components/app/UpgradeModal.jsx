import React, { useState } from 'react';
import { Shield, Zap, X, CheckCircle, Loader2 } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

const PLANS = [
  {
    id: 'voyageur',
    name: 'Voyageur',
    price: '9,99€',
    period: '/mois',
    color: 'border-shield-green',
    badge: 'Populaire',
    features: [
      'Analyses IA illimitées',
      'Stratégies avancées',
      'Accès prestataires certifiés',
      'Mode hors-ligne',
    ],
    priceId: 'price_test_voyageur', // Replace with real Stripe price ID
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '24,99€',
    period: '/mois',
    color: 'border-shield-gold',
    badge: 'Pro',
    features: [
      'Tout Voyageur inclus',
      'Rapports de voyage PDF',
      'Alertes géolocalisation premium',
      'Assistance prioritaire 24/7',
    ],
    priceId: 'price_test_pro', // Replace with real Stripe price ID
  },
];

export default function UpgradeModal({ onClose, analysesUsed = 0 }) {
  const [loading, setLoading] = useState(null);

  const handleCheckout = async (plan) => {
    setLoading(plan.id);
    // In test mode, show a demo message since we don't have a real backend
    setTimeout(() => {
      alert(`Mode test Stripe : Redirection vers le checkout pour le plan ${plan.name} (${plan.price}). Configurez vos price IDs Stripe réels dans le code pour activer le paiement.`);
      setLoading(null);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-shield-card border border-shield-border rounded-2xl w-full max-w-lg shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-shield-border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-shield-green" />
              <h2 className="font-poppins font-bold text-white text-lg">Limite atteinte</h2>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
            <span className="text-red-400 text-sm">
              🚫 Vous avez utilisé <strong>{analysesUsed}/3</strong> analyses gratuites ce mois-ci.
              Passez à un plan payant pour continuer.
            </span>
          </div>
        </div>

        {/* Plans */}
        <div className="p-6 grid grid-cols-2 gap-4">
          {PLANS.map(plan => (
            <div key={plan.id} className={`border ${plan.color} rounded-2xl p-5 flex flex-col`}>
              <div className="mb-1">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  plan.id === 'voyageur'
                    ? 'bg-shield-green/10 text-shield-green'
                    : 'bg-shield-gold/10 text-shield-gold'
                }`}>{plan.badge}</span>
              </div>
              <div className="font-poppins font-black text-white text-2xl mt-2">{plan.price}</div>
              <div className="text-gray-500 text-xs mb-4">{plan.period}</div>
              <ul className="space-y-2 mb-5 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                    <CheckCircle className="w-3.5 h-3.5 text-shield-green flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout(plan)}
                disabled={!!loading}
                className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  plan.id === 'voyageur'
                    ? 'bg-shield-green text-black hover:bg-green-400 btn-glow'
                    : 'bg-shield-gold/10 border border-shield-gold/40 text-shield-gold hover:bg-shield-gold/20'
                } disabled:opacity-50`}
              >
                {loading === plan.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <><Zap className="w-4 h-4" /> Choisir</>
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="px-6 pb-5 text-center">
          <p className="text-xs text-gray-600">Paiement sécurisé via Stripe · Annulation à tout moment</p>
        </div>
      </div>
    </div>
  );
}