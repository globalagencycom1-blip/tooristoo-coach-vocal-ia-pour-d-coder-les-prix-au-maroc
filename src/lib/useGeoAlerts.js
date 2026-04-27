import { useEffect, useRef } from 'react';

// Known high-risk tourist zones in Morocco (lat, lng, radius in meters, name)
const RISK_ZONES = [
  { name: 'Jemaa el-Fna', city: 'Marrakech', lat: 31.6258, lng: -7.9892, radius: 300, risk: 'high' },
  { name: 'Médina de Marrakech', city: 'Marrakech', lat: 31.6310, lng: -7.9875, radius: 600, risk: 'high' },
  { name: 'Souk Central Marrakech', city: 'Marrakech', lat: 31.6330, lng: -7.9855, radius: 250, risk: 'high' },
  { name: 'Médina de Fès (Bab Bou Jeloud)', city: 'Fès', lat: 34.0641, lng: -4.9786, radius: 500, risk: 'high' },
  { name: 'Tanneries de Fès', city: 'Fès', lat: 34.0658, lng: -4.9728, radius: 200, risk: 'high' },
  { name: 'Port de Tanger', city: 'Tanger', lat: 35.7906, lng: -5.8125, radius: 400, risk: 'medium' },
  { name: 'Médina de Chefchaouen', city: 'Chefchaouen', lat: 35.1715, lng: -5.2685, radius: 300, risk: 'medium' },
  { name: 'Corniche Agadir', city: 'Agadir', lat: 30.4156, lng: -9.5977, radius: 400, risk: 'medium' },
  { name: 'Aéroport Marrakech-Ménara', city: 'Marrakech', lat: 31.6069, lng: -8.0363, radius: 500, risk: 'high' },
  { name: 'Gare CTM Marrakech', city: 'Marrakech', lat: 31.6254, lng: -8.0089, radius: 200, risk: 'medium' },
];

function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function sendPushNotification(zone) {
  if (!('Notification' in window)) return;

  if (Notification.permission === 'default') {
    await Notification.requestPermission();
  }

  if (Notification.permission !== 'granted') return;

  const emoji = zone.risk === 'high' ? '🚨' : '⚠️';
  const riskLabel = zone.risk === 'high' ? 'RISQUE ÉLEVÉ' : 'Risque modéré';

  new Notification(`${emoji} NegoShield — Zone à risque !`, {
    body: `${riskLabel} : ${zone.name} (${zone.city}). Activez NegoShield avant toute transaction.`,
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    tag: `negoshield-zone-${zone.name}`,
    requireInteraction: zone.risk === 'high',
  });
}

export function useGeoAlerts(enabled = true) {
  const alertedZones = useRef(new Set());
  const watchId = useRef(null);

  useEffect(() => {
    if (!enabled || !('geolocation' in navigator)) return;

    const handlePosition = (position) => {
      const { latitude, longitude } = position.coords;

      for (const zone of RISK_ZONES) {
        const dist = getDistance(latitude, longitude, zone.lat, zone.lng);
        const key = zone.name;

        if (dist <= zone.radius && !alertedZones.current.has(key)) {
          alertedZones.current.add(key);
          sendPushNotification(zone);
          // Reset alert after 30 min so it can trigger again if user leaves and returns
          setTimeout(() => alertedZones.current.delete(key), 30 * 60 * 1000);
        }
      }
    };

    watchId.current = navigator.geolocation.watchPosition(
      handlePosition,
      () => {},
      { enableHighAccuracy: true, maximumAge: 30000, timeout: 10000 }
    );

    return () => {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
      }
    };
  }, [enabled]);

  const requestPermission = async () => {
    if (!('Notification' in window)) return 'not_supported';
    const result = await Notification.requestPermission();
    return result;
  };

  return { requestPermission };
}