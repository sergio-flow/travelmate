
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockFlightDeals } from "@/data/mockDeals";

interface FlightSelectionProps {
  onSelectFlight: (flightId: string) => void;
  searchParams: any;
}

const FlightSelection = ({ onSelectFlight, searchParams }: FlightSelectionProps) => {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Select your flight from {searchParams.origin || "Selected Origin"}
        </h2>
        <p className="text-white/80">
          {searchParams.participants || "Solo"} traveler
        </p>
      </div>

      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-4">
          {mockFlightDeals.map((flight) => (
            <div
              key={flight.id}
              className="glass-card p-4 flex flex-col md:flex-row gap-4 cursor-pointer hover:bg-white/20 transition-colors"
              onClick={() => onSelectFlight(flight.id)}
            >
              <div className="w-full md:w-1/4">
                <img 
                  src={flight.image} 
                  alt={flight.destination} 
                  className="h-32 w-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{flight.destination}</h3>
                  <span className="text-xl font-bold text-white">${flight.price}</span>
                </div>
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <span className="text-white/80">From: {searchParams.origin || "Selected Origin"}</span>
                  <span className="text-white/80">Duration: {Math.floor(Math.random() * 5) + 2}h {Math.floor(Math.random() * 60)}m</span>
                </div>
                <div className="flex flex-col md:flex-row justify-between">
                  <span className="text-white/80">Airline: {flight.airline}</span>
                  <span className="text-white/80">Direct Flight</span>
                </div>
                <button className="mt-3 bg-white/20 hover:bg-white/30 transition-colors text-white px-4 py-2 rounded-lg w-full md:w-auto">
                  Select This Flight
                </button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FlightSelection;
