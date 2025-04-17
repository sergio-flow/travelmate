
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
import { createClient } from "@supabase/supabase-js";
import CityVibes from "@/components/CityVibes";
import moment from "moment";

const supabase = createClient("https://xarsrdkfvyzajymlrtrs.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhcnNyZGtmdnl6YWp5bWxydHJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMTkxOTIsImV4cCI6MjA1OTY5NTE5Mn0._LdQZdhXGKvP6_ATQkoWzcRtz43tRzOQLo8DU4vWcGM");

const Index = () => {
  const [origin, setOrigin] = useState("Cluj");
  const [participants, setParticipants] = useState("Solo");
  const [currentStep, setCurrentStep] = useState("flights"); // flights, accommodations

  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);

  useEffect(() => {
    getFlights();
  }, []);

  async function getFlights() {
    const { data } = await supabase.from("flights").select()

    console.log("Fetched flights:", data);
    setFlights(data);
  }
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
      <CityVibes />

      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-4 z-10 flex justify-center items-center">
        {/* <div className="absolute left-4">
          <OriginSelector currentOrigin={origin} onOriginChange={handleOriginChange} />
        </div> */}

        <div className="flex items-center">
          <h1 className="text-white text-xs font-bold uppercase">Travel Mate</h1>
        </div>
      </header>

      <main className={`container px-6 pt-20 pb-10 z-10 w-full ${currentStep === "accommodations" ? "max-w-full" : ""}`}>
        {flights.length > 0 && (
          <FlightSelection
            flights={flights}
            onSelectFlight={handleSelectFlight}
            origin={origin}
            participants={participants}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
