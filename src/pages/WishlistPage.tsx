
import React from "react";
import { useNavigate } from "react-router-dom";
import { Penguins } from "@/components/Icons";
import { useWishlist } from "@/contexts/WishlistContext";
import VideoBackground from "@/components/VideoBackground";
import AudioPlayer from "@/components/AudioPlayer";
import DealCard from "@/components/DealCard";

const WishlistPage = () => {
  const navigate = useNavigate();
  const { wishlist } = useWishlist();

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      <VideoBackground />
      <AudioPlayer />

      {/* Header */}
      <header className="sticky top-0 left-0 w-full p-4 z-20 flex items-center bg-black/30 backdrop-blur-md">
        <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
          <Penguins className="w-8 h-8 text-white mr-2" />
          <h1 className="text-white text-xl font-bold">Travel Mate</h1>
        </div>
        <div className="ml-auto">
          <button
            onClick={() => navigate("/")}
            className="text-white bg-white/10 px-3 py-1.5 text-sm rounded-full hover:bg-white/20 transition-colors"
          >
            New Search
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="container px-4 py-8 z-10 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            My Wishlist
          </h1>
          <p className="text-white/80">
            Your saved travel deals
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <h3 className="text-xl font-semibold text-white mb-4">Your wishlist is empty</h3>
            <p className="text-white/80 mb-6">Save your favorite travel deals to view them later</p>
            <button 
              onClick={() => navigate("/")}
              className="search-button"
            >
              Discover Travel Deals
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map(item => (
              <DealCard 
                key={`${item.type}-${item.deal.id}`} 
                deal={item.deal} 
                type={item.type} 
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default WishlistPage;
