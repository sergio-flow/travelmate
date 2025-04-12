
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockFlightDeals } from "@/data/mockDeals";

interface FlightSelectionProps {
  onSelectFlight: (flightId: string) => void;
  origin: string;
  participants: string;
}

const FlightSelection = ({ onSelectFlight, origin, participants }: FlightSelectionProps) => {
  // Filter flights based on the selected origin
  const filteredFlights = mockFlightDeals.filter(
    flight => flight.to != "Vienna"
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-white text-center">
          Cheapest destinations from {origin} next week
        </h2>
        {/* <p className="text-white/80">
          {participants} traveler
        </p> */}
      </div>

      <ScrollArea className="pt-5 pb-20 px-10">
        <div className="space-y-4">
          {filteredFlights.map((flight) => (
            <div
              key={flight.id}
              className="glass-card p-4 flex flex-col md:flex-row gap-8 cursor-pointer hover:bg-white/20 transition-colors"
              onClick={() => onSelectFlight(flight.id)}
            >
              <div className="w-full md:w-1/4">
                <img
                  src={flight.image}
                  alt={flight.destination || ""}
                  className="h-32 w-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <div className="itinerary-card">
                  <div className="itinerary-times">
                    <div>Friday 1pm</div>
                    <div>&euro;{flight.price}</div>
                    <div>Sunday 8pm</div>
                  </div>
                  <div className="itinerary-locations">
                    <div>Cluj</div>
                    <div>{flight.destination}</div>
                  </div>
                  <div className="flight-duration">
                    <div className="plane-icon">✈</div>
                    <div className="flight-duration-line"></div>
                    <div>2h 15m</div>
                  </div>
                  <div className="flight-dates">
                    <div>23 Apr</div>
                    <div>27 Apr</div>
                  </div>
                </div>


                {/* <div className="flex justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{flight.destination}</h3>
                  <span className="text-xl font-bold text-white">${flight.price}</span>
                </div>
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <span className="text-white/80">From: {origin}</span>
                  <span className="text-white/80">Duration: {flight.duration}</span>
                </div>
                <div className="flex flex-col md:flex-row justify-between">
                  <span className="text-white/80">Airline: {flight.airline}</span>
                  <span className="text-white/80">Direct Flight</span>
                </div> */}

                {/* <button className="mt-3 bg-white/20 hover:bg-white/30 transition-colors text-white px-4 py-2 rounded-lg w-full md:w-auto">
                  View all flights
                </button> */}
              </div>
            </div>
          ))}

          {filteredFlights.length === 0 && (
            <div className="glass-card p-6 text-center">
              <p className="text-white text-lg">No flights available from {origin} at the moment.</p>
              <p className="text-white/70 mt-2">Please try selecting a different origin city.</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FlightSelection;
