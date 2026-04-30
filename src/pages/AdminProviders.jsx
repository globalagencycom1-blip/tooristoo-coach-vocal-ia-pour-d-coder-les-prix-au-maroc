import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Shield, Plus, Edit2, Trash2, CheckCircle, XCircle, Search, RefreshCw, Upload, Save, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SEED_PROVIDERS } from '../lib/providers-seed';

const CATEGORIES = ['taxi','hotel','riad','restaurant','excursion','shopping','transport','guide','spa'];
const CITIES = ['Marrakech','Fès','Casablanca','Chefchaouen','Agadir','Tanger','Rabat','Meknès','Ouarzazate','Merzouga','Essaouira','Dakhla','El Jadida'];
const LANGS = ['fr','en','es','de','ar','darija'];

const EMPTY = {
  name:'', city:'Marrakech', category:'taxi', price:'',
  rating:4.5, phone:'', url:'', certified:true, active:true,
  desc_fr:'', desc_en:'', desc_es:'', desc_de:'', desc_ar:'', desc_darija:''
};

function ProviderForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || EMPTY);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="bg-shield-card border border-shield-green/30 rounded-2xl p-6 mb-6">
      <h3 className="text-white font-bold font-poppins text-lg mb-4">{initial?.id ? '✏️ Modifier' : '➕ Nouveau prestataire'}</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Nom *</label>
          <input value={form.name} onChange={e => set('name', e.target.value)} className="w-full bg-shield-dark border border-shield-border text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-shield-green" />
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Ville *</label>
          <select value={form.city} onChange={e => set('city', e.target.value)} className="w-full bg-shield-dark border border-shield-border text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-shield-green">
            {CITIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Catégorie *</label>
          <select value={form.category} onChange={e => set('category', e.target.value)} className="w-full bg-shield-dark border border-shield-border text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-shield-green">
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Prix officiel</label>
          <input value={form.price} onChange={e => set('price', e.target.value)} placeholder="ex: 120-150 MAD" className="w-full bg-shield-dark border border-shield-border text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-shield-green" />
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Note (0-5)</label>
          <input type="number" min="0" max="5" step="0.1" value={form.rating} onChange={e => set('rating', parseFloat(e.target.value))} className="w-full bg-shield-dark border border-shield-border text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-shield-green" />
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Téléphone</label>
          <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+212 6xx xxx xxx" className="w-full bg-shield-dark border border-shield-border text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-shield-green" />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs text-gray-400 mb-1 block">URL (Maps / Site)</label>
          <input value={form.url} onChange={e => set('url', e.target.value)} placeholder="https://maps.google.com/..." className="w-full bg-shield-dark border border-shield-border text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-shield-green" />
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.certified} onChange={e => set('certified', e.target.checked)} className="w-4 h-4 accent-green-500" />
            <span className="text-sm text-gray-300">Certifié</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.active} onChange={e => set('active', e.target.checked)} className="w-4 h-4 accent-green-500" />
            <span className="text-sm text-gray-300">Actif</span>
          </label>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs text-gray-400 mb-3 font-semibold uppercase tracking-wider">Descriptions multilingues</p>
        <div className="grid md:grid-cols-2 gap-3">
          {LANGS.map(l => (
            <div key={l}>
              <label className="text-xs text-gray-500 mb-1 block">🌐 {l.toUpperCase()}</label>
              <textarea value={form[`desc_${l}`]} onChange={e => set(`desc_${l}`, e.target.value)} rows={2} className="w-full bg-shield-dark border border-shield-border text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-shield-green resize-none" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button onClick={() => onSave(form)} className="flex items-center gap-2 px-5 py-2 bg-shield-green text-black font-bold rounded-xl hover:bg-green-400 text-sm transition-all">
          <Save className="w-4 h-4" /> Sauvegarder
        </button>
        <button onClick={onCancel} className="flex items-center gap-2 px-5 py-2 border border-shield-border text-gray-300 hover:text-white rounded-xl text-sm transition-all">
          <X className="w-4 h-4" /> Annuler
        </button>
      </div>
    </div>
  );
}

export default function AdminProviders() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [search, setSearch] = useState('');
  const [filterCity, setFilterCity] = useState('all');
  const [filterCat, setFilterCat] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    base44.auth.me().then(u => {
      if (u?.role === 'admin') {
        setIsAdmin(true);
        loadProviders();
      } else {
        setLoading(false);
      }
    }).catch(() => setLoading(false));
  }, []);

  const loadProviders = async () => {
    setLoading(true);
    const data = await base44.entities.Provider.list('-created_date', 500);
    setProviders(data);
    setLoading(false);
  };

  const handleSave = async (form) => {
    if (form.id) {
      await base44.entities.Provider.update(form.id, form);
    } else {
      await base44.entities.Provider.create(form);
    }
    setShowForm(false);
    setEditing(null);
    loadProviders();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer ce prestataire ?')) {
      await base44.entities.Provider.delete(id);
      loadProviders();
    }
  };

  const handleToggleActive = async (p) => {
    await base44.entities.Provider.update(p.id, { active: !p.active });
    loadProviders();
  };

  const handleSeed = async () => {
    if (!window.confirm(`Importer ${SEED_PROVIDERS.length} prestataires ? (Les existants ne seront pas supprimés)`)) return;
    setSeeding(true);
    const batch = [];
    for (const p of SEED_PROVIDERS) {
      batch.push(base44.entities.Provider.create(p));
    }
    await Promise.all(batch);
    await loadProviders();
    setSeeding(false);
    alert(`✅ ${SEED_PROVIDERS.length} prestataires importés avec succès !`);
  };

  const filtered = providers.filter(p => {
    const cityOk = filterCity === 'all' || p.city === filterCity;
    const catOk = filterCat === 'all' || p.category === filterCat;
    const searchOk = !search || p.name?.toLowerCase().includes(search.toLowerCase()) || p.city?.toLowerCase().includes(search.toLowerCase());
    return cityOk && catOk && searchOk;
  });

  if (!isAdmin && !loading) {
    return (
      <div className="min-h-screen bg-shield-dark flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-white font-bold text-2xl mb-2">Accès refusé</h2>
          <p className="text-gray-400">Cette page est réservée aux administrateurs.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-shield-dark">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 pt-28 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-poppins font-black text-3xl text-white">🏪 Gestion Prestataires</h1>
            <p className="text-gray-400 text-sm mt-1">{providers.length} prestataire(s) en base · {providers.filter(p => p.active).length} actifs</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button onClick={handleSeed} disabled={seeding} className="flex items-center gap-2 px-4 py-2 bg-shield-gold/10 border border-shield-gold/40 text-shield-gold font-bold rounded-xl hover:bg-shield-gold/20 text-sm transition-all disabled:opacity-50">
              <Upload className="w-4 h-4" />
              {seeding ? 'Import...' : `Importer données (${SEED_PROVIDERS.length})`}
            </button>
            <button onClick={() => { setEditing(null); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2 bg-shield-green text-black font-bold rounded-xl hover:bg-green-400 text-sm transition-all">
              <Plus className="w-4 h-4" /> Ajouter
            </button>
            <button onClick={loadProviders} className="flex items-center gap-2 px-3 py-2 border border-shield-border text-gray-300 hover:text-white rounded-xl text-sm transition-all">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <ProviderForm
            initial={editing}
            onSave={handleSave}
            onCancel={() => { setShowForm(false); setEditing(null); }}
          />
        )}

        {/* Filters */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher..." className="w-full bg-shield-card border border-shield-border text-white rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-shield-green" />
          </div>
          <select value={filterCity} onChange={e => setFilterCity(e.target.value)} className="bg-shield-card border border-shield-border text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-shield-green">
            <option value="all">Toutes les villes</option>
            {CITIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={filterCat} onChange={e => setFilterCat(e.target.value)} className="bg-shield-card border border-shield-border text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-shield-green">
            <option value="all">Toutes catégories</option>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {CATEGORIES.slice(0,4).map(cat => (
            <div key={cat} className="bg-shield-card border border-shield-border rounded-xl p-3 text-center">
              <p className="text-shield-green font-bold text-lg">{providers.filter(p => p.category === cat).length}</p>
              <p className="text-gray-500 text-xs capitalize">{cat}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-shield-border border-t-shield-green rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.length === 0 ? (
              <div className="text-center py-16 bg-shield-card border border-shield-border rounded-2xl">
                <Shield className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">Aucun prestataire trouvé</p>
              </div>
            ) : filtered.map(p => (
              <div key={p.id} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${p.active ? 'bg-shield-card border-shield-border hover:border-shield-green/30' : 'bg-shield-dark border-shield-border/50 opacity-60'}`}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-white text-sm">{p.name}</span>
                    {p.certified && <span className="text-xs px-2 py-0.5 bg-shield-green/10 text-shield-green border border-shield-green/30 rounded-full">✓ Certifié</span>}
                    {!p.active && <span className="text-xs px-2 py-0.5 bg-red-500/10 text-red-400 border border-red-500/30 rounded-full">Inactif</span>}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500">{p.city}</span>
                    <span className="text-xs text-gray-600">·</span>
                    <span className="text-xs text-gray-500 capitalize">{p.category}</span>
                    <span className="text-xs text-gray-600">·</span>
                    <span className="text-xs text-shield-green">{p.price}</span>
                    <span className="text-xs text-shield-gold">★ {p.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => handleToggleActive(p)} className="p-1.5 rounded-lg hover:bg-shield-border text-gray-400 hover:text-white transition-all" title={p.active ? 'Désactiver' : 'Activer'}>
                    {p.active ? <CheckCircle className="w-4 h-4 text-shield-green" /> : <XCircle className="w-4 h-4 text-red-400" />}
                  </button>
                  <button onClick={() => { setEditing(p); setShowForm(true); window.scrollTo(0,0); }} className="p-1.5 rounded-lg hover:bg-shield-border text-gray-400 hover:text-white transition-all">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer lang="fr" />
    </div>
  );
}