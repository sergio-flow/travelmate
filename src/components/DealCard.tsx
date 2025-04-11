
import React from "react";
import { HeartIcon } from "./Icons";
import { useWishlist } from "@/contexts/WishlistContext";
import { Deal } from "@/types";
import { toast } from "sonner";

interface DealCardProps {
  deal: Deal;
  type: "flight" | "accommodation" | "package";
}

const DealCard = ({ deal, type }: DealCardProps) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(deal.id, type);

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(deal.id, type);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(deal, type);
      toast.success("Added to wishlist");
    }
  };

  // Helper function to render the correct details based on deal type
  const renderDealTypeInfo = () => {
    switch (type) {
      case "flight":
        return (
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-white/70 text-sm">Flight</p>
              <p className="text-white font-medium">{deal.from} - {deal.to}</p>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-sm">Duration</p>
              <p className="text-white">{deal.duration}</p>
            </div>
          </div>
        );
      case "accommodation":
        return (
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-white/70 text-sm">Accommodation</p>
              <p className="text-white font-medium">{deal.location}</p>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-sm">Rating</p>
              <p className="text-white">⭐ {deal.rating}/5</p>
            </div>
          </div>
        );
      case "package":
        return (
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-white/70 text-sm">Package</p>
              <p className="text-white font-medium">{deal.destination}</p>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-sm">Duration</p>
              <p className="text-white">{deal.nights} nights</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="deal-card relative">
      <button 
        className="wishlist-button" 
        onClick={handleWishlistToggle}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <HeartIcon 
          className="w-5 h-5" 
          fill={isWishlisted ? "currentColor" : "none"} 
        />
      </button>

      <img 
        src={deal.image} 
        alt={deal.title} 
        className="deal-card-image" 
      />

      <h3 className="text-lg font-semibold mb-1">{deal.title}</h3>
      
      {renderDealTypeInfo()}

      <div className="mt-auto pt-2">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-white/70 text-sm">Price</p>
            <p className="text-white text-xl font-bold">${deal.price}</p>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded-lg text-sm">
            View Deal
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealCard;
