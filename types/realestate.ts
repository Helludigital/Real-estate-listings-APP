// types/realestate.ts
export type Address = {
  line1: string;
  city: string;
  state?: string;
  country: string;
  postalCode?: string;
  lat?: number;
  lng?: number;
};

export type Agent = {
  id: string;
  name: string;
  phone?: string;
  email?: string;
};

export type Listing = {
  id: string;
  title: string;                    // e.g., "Modern 2BR in Södermalm"
  price: number;                    // in EUR
  beds: number;
  baths: number;
  areaSqm: number;
  type: 'apartment' | 'house' | 'townhouse' | 'studio';
  yearBuilt?: number;
  images: string[];
  address: Address;
  agent: Agent;
  isNew?: boolean;
  listedAt: number;                 // epoch
};
