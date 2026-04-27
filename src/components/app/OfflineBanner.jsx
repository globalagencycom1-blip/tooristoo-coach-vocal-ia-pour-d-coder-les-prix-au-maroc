import React from 'react';
import { WifiOff, Wifi, RefreshCw, CloudOff } from 'lucide-react';

export default function OfflineBanner({ isOnline, isSyncing, pendingCount }) {
  if (isOnline && pendingCount === 0) return null;

  return (
    <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium mb-4 ${
      isOnline
        ? 'bg-shield-green/10 border border-shield-green/30 text-shield-green'
        : 'bg-yellow-500/10 border border-yellow-500/30 text-yellow-400'
    }`}>
      {isOnline ? (
        isSyncing ? (
          <RefreshCw className="w-3.5 h-3.5 animate-spin flex-shrink-0" />
        ) : (
          <Wifi className="w-3.5 h-3.5 flex-shrink-0" />
        )
      ) : (
        <WifiOff className="w-3.5 h-3.5 flex-shrink-0" />
      )}
      <span>
        {!isOnline
          ? `Mode hors-ligne — ${pendingCount > 0 ? `${pendingCount} négociation(s) en attente de sync` : 'données sauvegardées localement'}`
          : isSyncing
          ? `Synchronisation de ${pendingCount} négociation(s)…`
          : `${pendingCount} négociation(s) synchronisée(s) ✓`}
      </span>
      {!isOnline && (
        <div className="ml-auto flex items-center gap-1">
          <CloudOff className="w-3 h-3" />
        </div>
      )}
    </div>
  );
}