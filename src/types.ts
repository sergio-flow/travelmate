
export interface Deal {
  id: string;
  title: string;
  price: number;
  image: string;
  
  // Flight deal specific properties
  from?: string;
  to?: string;
  duration?: string;
  
  // Accommodation deal specific properties
  location?: string;
  rating?: number;
  
  // Package deal specific properties
  destination?: string;
  nights?: number;
}
