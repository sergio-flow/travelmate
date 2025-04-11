
import { Deal } from '@/types';

export const mockFlightDeals: Deal[] = [
  {
    id: 'flight-1',
    title: 'Direct Flight to Rome',
    from: 'Bucharest',
    to: 'Rome',
    duration: '2h 15m',
    price: 99,
    image: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: 'flight-2',
    title: 'Paris Weekend Getaway',
    from: 'Cluj-Napoca',
    to: 'Paris',
    duration: '2h 45m',
    price: 129,
    image: 'https://images.unsplash.com/photo-1471623432079-b009d30b6729?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: 'flight-3',
    title: 'Barcelona Summer Escape',
    from: 'Bucharest',
    to: 'Barcelona',
    duration: '3h 10m',
    price: 119,
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: 'flight-4',
    title: 'Vienna City Break',
    from: 'Chisinau',
    to: 'Vienna',
    duration: '1h 45m',
    price: 89,
    image: 'https://images.unsplash.com/photo-1516550893885-498b67da269d?q=80&w=1472&auto=format&fit=crop'
  },
  {
    id: 'flight-5',
    title: 'Amsterdam Adventure',
    from: 'Cluj-Napoca',
    to: 'Amsterdam',
    duration: '2h 30m',
    price: 139,
    image: 'https://images.unsplash.com/photo-1605101100278-5d1deb2b6498?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: 'flight-6',
    title: 'London Express',
    from: 'Bucharest',
    to: 'London',
    duration: '3h 20m',
    price: 149,
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1470&auto=format&fit=crop'
  }
];

export const mockAccommodationDeals: Deal[] = [
  {
    id: 'accom-1',
    title: 'Luxury Suite in Paris',
    location: 'Paris, France',
    rating: 4.8,
    price: 189,
    image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28f8a?q=80&w=1421&auto=format&fit=crop'
  },
  {
    id: 'accom-2',
    title: 'Beachfront Villa in Barcelona',
    location: 'Barcelona, Spain',
    rating: 4.9,
    price: 229,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: 'accom-3',
    title: 'Cozy Apartment in Rome',
    location: 'Rome, Italy',
    rating: 4.6,
    price: 139,
    image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: 'accom-4',
    title: 'Historic Hotel in Vienna',
    location: 'Vienna, Austria',
    rating: 4.7,
    price: 159,
    image: 'https://images.unsplash.com/photo-1611048267451-e6ed903d689f?q=80&w=1472&auto=format&fit=crop'
  },
  {
    id: 'accom-5',
    title: 'Canal View Room in Amsterdam',
    location: 'Amsterdam, Netherlands',
    rating: 4.8,
    price: 179,
    image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?q=80&w=1472&auto=format&fit=crop'
  },
  {
    id: 'accom-6',
    title: 'Central Apartment in London',
    location: 'London, UK',
    rating: 4.5,
    price: 199,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1470&auto=format&fit=crop'
  }
];

export const mockPackageDeals: Deal[] = [
  {
    id: 'package-1',
    title: 'All-Inclusive Rome Getaway',
    destination: 'Rome, Italy',
    nights: 5,
    price: 499,
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1396&auto=format&fit=crop'
  },
  {
    id: 'package-2',
    title: 'Paris Luxury Weekend',
    destination: 'Paris, France',
    nights: 3,
    price: 599,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1473&auto=format&fit=crop'
  },
  {
    id: 'package-3',
    title: 'Barcelona Beach Week',
    destination: 'Barcelona, Spain',
    nights: 7,
    price: 799,
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: 'package-4',
    title: 'Vienna Cultural Experience',
    destination: 'Vienna, Austria',
    nights: 4,
    price: 449,
    image: 'https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: 'package-5',
    title: 'Amsterdam Adventure Package',
    destination: 'Amsterdam, Netherlands',
    nights: 5,
    price: 649,
    image: 'https://images.unsplash.com/photo-1584003564672-a54ab2c8c4ea?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: 'package-6',
    title: 'London Explorer Deal',
    destination: 'London, UK',
    nights: 6,
    price: 749,
    image: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=1471&auto=format&fit=crop'
  }
];
