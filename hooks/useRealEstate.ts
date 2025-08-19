// hooks/useRealEstate.ts
import { useCallback, useEffect, useMemo, useState } from 'react';
import * as Haptics from 'expo-haptics';
import { seedListings, loadFavorites, saveFavorites } from '@/services/re-db';
import type { Listing } from '@/types/realestate';

export type SortKey = 'relevance' | 'price_asc' | 'price_desc' | 'newest';
export type Filters = {
  minPrice?: number;
  maxPrice?: number;
  beds?: number; // minimum
  baths?: number; // minimum
  type?: Listing['type'] | 'any';
  onlyNew?: boolean;
  sort: SortKey;
};

const fmt = (n: number) => new Intl.NumberFormat('sv-SE').format(n);

export function useRealEstate() {
  const [all] = useState<Listing[]>(seedListings);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({ sort: 'relevance' });
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => { (async () => setFavorites(await loadFavorites()))(); }, []);

  const toggleFav = useCallback(async (id: string) => {
    setFavorites(prev => {
      const set = new Set(prev);
      set.has(id) ? set.delete(id) : set.add(id);
      const list = Array.from(set);
      saveFavorites(list).catch(() => {});
      try { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); } catch {}
      return list;
    });
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = all.filter(l => {
      const qMatch =
        !q ||
        l.title.toLowerCase().includes(q) ||
        l.address.line1.toLowerCase().includes(q) ||
        l.address.city.toLowerCase().includes(q);
      const priceOk =
        (filters.minPrice == null || l.price >= filters.minPrice) &&
        (filters.maxPrice == null || l.price <= filters.maxPrice!);
      const bedOk = (filters.beds == null) || l.beds >= filters.beds!;
      const bathOk = (filters.baths == null) || l.baths >= filters.baths!;
      const typeOk = (filters.type == null || filters.type === 'any') || l.type === filters.type;
      const newOk = !filters.onlyNew || !!l.isNew;
      return qMatch && priceOk && bedOk && bathOk && typeOk && newOk;
    });

    switch (filters.sort) {
      case 'price_asc': list.sort((a, b) => a.price - b.price); break;
      case 'price_desc': list.sort((a, b) => b.price - a.price); break;
      case 'newest': list.sort((a, b) => b.listedAt - a.listedAt); break;
      default: // relevance (simple: newest first when q present)
        if (q) list.sort((a, b) => b.listedAt - a.listedAt);
    }

    return list;
  }, [all, query, filters]);

  const saved = useMemo(() => all.filter(l => favorites.includes(l.id)), [all, favorites]);

  const kpis = useMemo(() => {
    const count = filtered.length;
    const newCount = filtered.filter(l => l.isNew).length;
    const avgPrice = count === 0 ? 0 : filtered.reduce((sum, l) => sum + l.price, 0) / count;
    return { 
      count, 
      newCount,
      avgPriceText: avgPrice ? `€ ${fmt(Math.round(avgPrice))}` : '—'
    };
  }, [filtered]);

  const byId = useCallback((id: string) => all.find(l => l.id === id), [all]);

  return {
    // data
    listings: filtered, saved, favorites, toggleFav, byId,
    // ui
    query, setQuery, filters, setFilters, kpis,
    // helpers
    fmt,
  };
}
