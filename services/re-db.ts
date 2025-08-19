// services/re-db.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Listing } from '@/types/realestate';

const FAV_KEY = 're.favs.v1';

const img = (q: string) =>
  `https://images.unsplash.com/${q}?q=80&w=1600&auto=format&fit=crop`;

export const seedListings: Listing[] = [
  {
    id: 'l1',
    title: 'Modern 2BR in Södermalm',
    price: 7250000,
    beds: 2, baths: 1, areaSqm: 68, type: 'apartment', yearBuilt: 2016, isNew: true,
    images: [
      img('photo-1501183638710-841dd1904471'),
      img('photo-1505692794403-34d4982fbad4'),
      img('photo-1493809842364-78817add7ffb'),
    ],
    listedAt: Date.now() - 2 * 86400000,
    address: { line1: 'Kvarngatan 12', city: 'Stockholm', country: 'Sweden', lat: 59.315, lng: 18.068 },
    agent: { id: 'a1', name: 'Anna Berg', email: 'anna@example.com', phone: '+46 70 123 45 67' },
  },
  {
    id: 'l2',
    title: 'Sunny Studio near KTH',
    price: 2950000,
    beds: 0, baths: 1, areaSqm: 28, type: 'studio',
    images: [
      img('photo-1505691723518-36a5ac3b2b8f'),
      img('photo-1502672260266-1c1ef2d93688'),
      img('photo-1486304873000-235643847519'),
    ],
    listedAt: Date.now() - 6 * 86400000,
    address: { line1: 'Valhallavägen 101', city: 'Stockholm', country: 'Sweden', lat: 59.347, lng: 18.071 },
    agent: { id: 'a2', name: 'Markus Lind', email: 'markus@example.com' },
  },
  {
    id: 'l3',
    title: 'Family House in Bromma',
    price: 12250000,
    beds: 4, baths: 2, areaSqm: 150, type: 'house', yearBuilt: 1998,
    images: [
      img('photo-1568605114967-8130f3a36994'),
      img('photo-1484154218962-a197022b5858'),
      img('photo-1502672260266-1c1ef2d93688'),
    ],
    listedAt: Date.now() - 12 * 86400000,
    address: { line1: 'Alviksvägen 7', city: 'Stockholm', country: 'Sweden', lat: 59.331, lng: 17.985 },
    agent: { id: 'a3', name: 'Sara Holm', email: 'sara@example.com', phone: '+46 73 987 65 43' },
  },
  {
    id: 'l4',
    title: 'Townhouse in Nacka',
    price: 8450000,
    beds: 3, baths: 2, areaSqm: 112, type: 'townhouse', yearBuilt: 2009,
    images: [
      img('photo-1507089947368-19c1da9775ae'),
      img('photo-1465804575741-338df8554eaf'),
      img('photo-1512917774080-9991f1c4c750'),
    ],
    listedAt: Date.now() - 1 * 86400000,
    address: { line1: 'Skogalund 4', city: 'Nacka', country: 'Sweden', lat: 59.305, lng: 18.171 },
    agent: { id: 'a4', name: 'Elin Åker', email: 'elin@example.com' },
  },
];

export async function loadFavorites(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(FAV_KEY);
  return raw ? JSON.parse(raw) : [];
}
export async function saveFavorites(ids: string[]) {
  await AsyncStorage.setItem(FAV_KEY, JSON.stringify(ids));
}
