
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import VideoBackground from "@/components/VideoBackground";
import AudioPlayer from "@/components/AudioPlayer";
import FlightSelection from "@/components/FlightSelection";
import AccommodationSelection from "@/components/AccommodationSelection";
import { mockFlightDeals } from "@/data/mockDeals";
import OriginSelector from "@/components/OriginSelector";
import ToggleContent from "@/components/ToggleContent";

const Index = () => {
  const [origin, setOrigin] = useState("Cluj");
  const [participants, setParticipants] = useState("Solo");
  const [currentStep, setCurrentStep] = useState("flights"); // flights, accommodations
  interface FlightDeal {
    id: string;
    destination?: string;
    price: number;
    // Add other properties of a flight deal as needed
  }

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     document.body.classList.add('show-video');
  //   }, 3000);
  
  //   // Optional cleanup (in case component unmounts before timeout)
  //   return () => clearTimeout(timeoutId);
  // }, []);

  const [selectedFlight, setSelectedFlight] = useState<FlightDeal | null>(null);

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
      <ToggleContent />
      <AudioPlayer />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-4 z-10 flex justify-center items-center">
        {/* <div className="absolute left-4">
          <OriginSelector currentOrigin={origin} onOriginChange={handleOriginChange} />
        </div> */}

        <div className="flex items-center">
          <h1 className="text-white text-xs font-bold uppercase">Travel Mate</h1>
        </div>
      </header>

      {/* Main content */}
      <main className={`container px-6 pt-20 pb-10 z-10 w-full ${currentStep === "accommodations" ? "max-w-full" : ""}`}>
        <FlightSelection
          onSelectFlight={handleSelectFlight}
          origin={origin}
          participants={participants}
        />
      </main>
    </div>
  );
};

export default Index;
