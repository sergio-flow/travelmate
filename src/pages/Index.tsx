
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import VideoBackground from "@/components/VideoBackground";
import AudioPlayer from "@/components/AudioPlayer";
import FlightSelection from "@/components/FlightSelection";
import AccommodationSelection from "@/components/AccommodationSelection";
import { mockFlightDeals } from "@/data/mockDeals";
import OriginSelector from "@/components/OriginSelector";

const Index = () => {
  const [origin, setOrigin] = useState("Cluj-Napoca");
  const [participants, setParticipants] = useState("Solo");
  const [currentStep, setCurrentStep] = useState("flights"); // flights, accommodations
  const [selectedFlight, setSelectedFlight] = useState<any>(null);
  
  const handleOriginChange = (newOrigin: string) => {
    setOrigin(newOrigin);
  };

  const handleSelectFlight = (flightId: string) => {
    const flight = mockFlightDeals.find(f => f.id === flightId);
    setSelectedFlight(flight);
    setCurrentStep("accommodations");
  };

  const handleNewSearch = () => {
    setCurrentStep("flights");
    setSelectedFlight(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <VideoBackground selectedDestination={selectedFlight?.destination} />
      <AudioPlayer />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-4 z-10 flex justify-center items-center">
        <div className="absolute left-4">
          <OriginSelector currentOrigin={origin} onOriginChange={handleOriginChange} />
        </div>
        
        <div className="flex items-center">
          <h1 className="text-white text-2xl font-bold">Travel Mate</h1>
        </div>
        
        <div className="absolute right-4">
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-white bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors">
                My Wishlist
              </button>
            </DialogTrigger>
            <DialogContent className="glass-card border-0 max-w-md">
              <DialogHeader>
                <DialogTitle className="text-white text-xl">Sign up to view your wishlist</DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <p className="text-white/80">
                  Sign up for free and create trips with your friends. You also get more trips, more radio stations, more custom backgrounds, and free travel guides.
                </p>
                <div className="space-y-4">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="glass-input w-full p-3" 
                  />
                  <button className="search-button w-full">
                    Sign up with Email
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/20"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-black/60 px-2 text-white/60">Or continue with</span>
                  </div>
                </div>
                <button className="w-full p-3 rounded-lg bg-white text-black font-medium flex justify-center items-center space-x-2">
                  Sign up with Google
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Main content */}
      <main className={`container px-6 pt-20 pb-10 z-10 w-full ${currentStep === "accommodations" ? "max-w-full" : ""}`}>
        {currentStep === "accommodations" ? (
          <div className="mb-6 flex items-center">
            <button 
              onClick={handleNewSearch} 
              className="text-white bg-white/10 px-3 py-1.5 text-sm rounded-full hover:bg-white/20 transition-colors"
            >
              Home
            </button>
          </div>
        ) : (
          <>
            <div className="mb-10 text-center">
              <h2 className="text-4xl font-bold text-white mb-4">Find Your Perfect Adventure</h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                Discover amazing destinations and create unforgettable memories with friends and family
              </p>
            </div>
          </>
        )}

        {currentStep === "flights" && (
          <>
            <FlightSelection 
              onSelectFlight={handleSelectFlight} 
              origin={origin}
              participants={participants}
            />
          </>
        )}

        {currentStep === "accommodations" && selectedFlight && (
          <AccommodationSelection 
            selectedFlight={selectedFlight} 
            searchParams={{ origin, participants }}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
