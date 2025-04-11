
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Deal } from '@/types';

type DealType = 'flight' | 'accommodation' | 'package';

interface WishlistItem {
  deal: Deal;
  type: DealType;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (deal: Deal, type: DealType) => void;
  removeFromWishlist: (dealId: string, type: DealType) => void;
  isInWishlist: (dealId: string, type: DealType) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const addToWishlist = (deal: Deal, type: DealType) => {
    if (!isInWishlist(deal.id, type)) {
      setWishlist(prev => [...prev, { deal, type }]);
    }
  };

  const removeFromWishlist = (dealId: string, type: DealType) => {
    setWishlist(prev => 
      prev.filter(item => !(item.deal.id === dealId && item.type === type))
    );
  };

  const isInWishlist = (dealId: string, type: DealType): boolean => {
    return wishlist.some(item => item.deal.id === dealId && item.type === type);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider value={{ 
      wishlist, 
      addToWishlist, 
      removeFromWishlist, 
      isInWishlist,
      clearWishlist 
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
