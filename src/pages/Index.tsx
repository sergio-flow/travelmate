
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Select } from "@/components/ui/select";
import VideoBackground from "@/components/VideoBackground";
import AudioPlayer from "@/components/AudioPlayer";
import SearchForm from "@/components/SearchForm";

const Index = () => {
  const navigate = useNavigate();
  
  const handleSearch = (searchParams: any) => {
    // Navigate to results page with search params
    navigate("/results", { state: { searchParams } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <VideoBackground />
      <AudioPlayer />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-4 z-10 flex items-center">
        <div className="flex items-center">
          <h1 className="text-white text-2xl font-bold">Travel Mate</h1>
        </div>
        <div className="ml-auto">
          <button 
            onClick={() => navigate("/wishlist")}
            className="text-white bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors"
          >
            My Wishlist
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="container px-6 z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg animate-pulse-slow">
          Best travel deals for the next 90 days
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <SearchForm onSearch={handleSearch} />
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
          <div className="category-card">
            <h3 className="text-xl font-bold mb-2">Cheapest Flights</h3>
            <p className="text-white/80">
              Find the most affordable flights from your local airport.
            </p>
          </div>
          
          <div className="category-card">
            <h3 className="text-xl font-bold mb-2">Best Accommodations</h3>
            <p className="text-white/80">
              Quality hotels and apartments at great prices.
            </p>
          </div>
          
          <div className="category-card">
            <h3 className="text-xl font-bold mb-2">Complete Packages</h3>
            <p className="text-white/80">
              All-inclusive travel deals with everything you need.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
