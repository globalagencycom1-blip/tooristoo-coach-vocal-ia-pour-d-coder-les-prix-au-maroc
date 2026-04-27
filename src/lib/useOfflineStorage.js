/**
 * IndexedDB hook for NegoShield AI
 * - Saves negotiations locally when offline
 * - Auto-syncs pending records to server once back online
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { base44 } from '@/api/base44Client';

const DB_NAME = 'negoshield_db';
const DB_VERSION = 1;
const STORE_NEGOTIATIONS = 'negotiations';
const STORE_PENDING = 'pending_sync';

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NEGOTIATIONS)) {
        const store = db.createObjectStore(STORE_NEGOTIATIONS, { keyPath: 'local_id' });
        store.createIndex('created_at', 'created_at', { unique: false });
      }
      if (!db.objectStoreNames.contains(STORE_PENDING)) {
        db.createObjectStore(STORE_PENDING, { keyPath: 'local_id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function dbGet(db, storeName, query = 'all') {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const req = query === 'all' ? store.getAll() : store.get(query);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function dbPut(db, storeName, record) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const req = store.put(record);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function dbDelete(db, storeName, key) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const req = store.delete(key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export function useOfflineStorage() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const dbRef = useRef(null);

  // Init DB
  useEffect(() => {
    openDB().then(db => {
      dbRef.current = db;
      refreshPendingCount(db);
    });
  }, []);

  // Network listeners
  useEffect(() => {
    const goOnline = () => {
      setIsOnline(true);
      if (dbRef.current) syncPending(dbRef.current);
    };
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  const refreshPendingCount = async (db) => {
    const pending = await dbGet(db, STORE_PENDING);
    setPendingCount(pending.length);
  };

  const syncPending = useCallback(async (db) => {
    const pending = await dbGet(db, STORE_PENDING);
    if (pending.length === 0) return;

    setIsSyncing(true);
    const user = await base44.auth.me().catch(() => null);
    if (!user) { setIsSyncing(false); return; }

    for (const item of pending) {
      const { local_id, ...data } = item;
      const serverRecord = await base44.entities.Negotiation.create({
        user_email: user.email,
        ...data,
      }).catch(() => null);

      if (serverRecord) {
        // Update local record with server id
        await dbPut(db, STORE_NEGOTIATIONS, { ...item, server_id: serverRecord.id, synced: true });
        await dbDelete(db, STORE_PENDING, local_id);
      }
    }

    await refreshPendingCount(db);
    setIsSyncing(false);
  }, []);

  /**
   * Save a negotiation locally (always) and also try to push to server.
   * Returns the local record immediately.
   */
  const saveNegotiation = useCallback(async (data, userEmail, lang) => {
    const db = dbRef.current;
    const local_id = `local_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const record = {
      local_id,
      created_at: new Date().toISOString(),
      user_email: userEmail,
      language: lang,
      synced: false,
      ...data,
    };

    // Always save locally
    await dbPut(db, STORE_NEGOTIATIONS, record);

    if (navigator.onLine) {
      // Try server
      const serverRecord = await base44.entities.Negotiation.create({
        user_email: userEmail,
        ...data,
        language: lang,
      }).catch(() => null);

      if (serverRecord) {
        // Mark as synced
        await dbPut(db, STORE_NEGOTIATIONS, { ...record, server_id: serverRecord.id, synced: true });
        return { ...record, server_id: serverRecord.id, synced: true, id: serverRecord.id };
      }
    }

    // Offline: add to pending queue
    await dbPut(db, STORE_PENDING, record);
    await refreshPendingCount(db);
    return record;
  }, []);

  /**
   * Load all local negotiations (sorted newest first)
   */
  const loadLocalNegotiations = useCallback(async () => {
    const db = dbRef.current;
    if (!db) return [];
    const all = await dbGet(db, STORE_NEGOTIATIONS);
    return all.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, []);

  return {
    isOnline,
    isSyncing,
    pendingCount,
    saveNegotiation,
    loadLocalNegotiations,
  };
}