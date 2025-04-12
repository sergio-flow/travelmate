
export interface Deal {
  id: string;
  title: string;
  price: number;
  image: string;
  
  // Flight deal specific properties
  from?: string;
  to?: string;
  duration?: string;
  airline?: string; // Added this property
  
  // Accommodation deal specific properties
  location?: string;
  rating?: number;
  name?: string; // Added this property
  
  // Package deal specific properties
  destination?: string;
  nights?: number;
}
