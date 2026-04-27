import React, { useState, useEffect } from 'react';
import { Bell, BellOff, MapPin, X } from 'lucide-react';

export default function GeoAlertBanner({ onRequestPermission }) {
  const [permission, setPermission] = useState(
    'Notification' in window ? Notification.permission : 'not_supported'
  );
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('negoshield_geo_dismissed');
    if (saved) setDismissed(true);
  }, []);

  if (dismissed || permission === 'granted' || permission === 'not_supported') return null;

  const handleEnable = async () => {
    const result = await onRequestPermission();
    setPermission(result);
    if (result === 'denied') {
      localStorage.setItem('negoshield_geo_dismissed', '1');
      setDismissed(true);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('negoshield_geo_dismissed', '1');
    setDismissed(true);
  };

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-shield-gold/10 border border-shield-gold/30 rounded-xl mb-4">
      <MapPin className="w-4 h-4 text-shield-gold flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-shield-gold font-semibold">Alertes zones à risque</p>
        <p className="text-xs text-gray-400 mt-0.5">Activez les notifications pour être alerté dès que vous entrez dans une zone touristique à risque.</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={handleEnable}
          className="flex items-center gap-1 px-3 py-1.5 bg-shield-gold/20 border border-shield-gold/40 text-shield-gold text-xs font-bold rounded-lg hover:bg-shield-gold/30 transition-all"
        >
          <Bell className="w-3 h-3" />
          Activer
        </button>
        <button onClick={handleDismiss} className="text-gray-600 hover:text-gray-400">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}