import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import moment from "moment";

interface Flight {
  id: string;
  inbound_depart_city: string;
  inbound_departure: string;
  inbound_arrival: string;
  price_eur: number;
  outbound_duration: number;
  outbound_depart_city: string;
  destination?: string;
  outbound_depart_airport: string;
  outbound_arrival_city: string;
  outbound_arrival_airport?: string;
  inbound_arrival_local_time: string;
  outbound_depart_local_time: string;
}

interface FlightSelectionProps {
  flights: Flight[];
  onSelectFlight: (flightId: string) => void;
  origin: string;
  participants: string;
}

const carrierLogo = (airline: string) => {
  return `https://images.kiwi.com/airlines/64x64/${airline}.png?default=airline.png`;
};

const FlightSelection = ({ flights, onSelectFlight, origin, participants }: FlightSelectionProps) => {
  const [expandedCity, setExpandedCity] = useState<string | null>(null);

  const flightsByCity = {};
  flights.forEach((flight) => {
    const city = flight.inbound_depart_city;
    if (!flightsByCity[city]) {
      flightsByCity[city] = [];
    }
    flightsByCity[city].push(flight);
  });

  const sortedFlightsByCity = Object.keys(flightsByCity)
    .sort((a, b) => {
      return flightsByCity[a][0].price_eur - flightsByCity[b][0].price_eur;
    })
    .reduce((acc, key) => {
      acc[key] = flightsByCity[key];
      return acc;
    }, {});

  const toggleCityExpansion = (city: string) => {
    if (expandedCity === city) {
      setExpandedCity(null);
    } else {
      setExpandedCity(city);
    }
  };

  const formatDuration = (seconds) => {
    const duration = moment.duration(seconds, "seconds");
    return `${duration.hours()}h ${duration.minutes()}m`;
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white text-center">
          Cheapest city breaks from {origin}
          <br />
          in the next few weeks
        </h2>
      </div>
      <ScrollArea className="pt-5 pb-20 px-10">
        <div className="space-y-4">
          {Object.entries(sortedFlightsByCity).map(([city, cityFlights]) => {
            const flight = cityFlights[0] as Flight;
            const travelTime = moment.duration(flight.outbound_duration, "seconds");
            const travelTimeString = `${travelTime.hours()}h ${travelTime.minutes()}m`;
            const price = Math.ceil(Math.ceil(flight.price_eur) / 10) * 10;
            const isExpanded = expandedCity === city;

            return (
              <div key={city} className="glass-card overflow-hidden">
                <div
                  className="p-4 cursor-pointer hover:bg-white/20 transition-colors"
                  onClick={() => toggleCityExpansion(city)}
                >
                  <div className="itinerary-card">
                    <div className="itinerary-times flex justify-between">
                      <div>Mon-Fri</div>
                      <div>Sunday</div>
                    </div>
                    <div className="itinerary-locations flex justify-between">
                      <div>{flight.outbound_depart_airport}</div>
                      <div>{flight.outbound_arrival_city}</div>
                      <div>{flight.outbound_depart_airport}</div>
                    </div>
                    <div className="flight-duration flex items-center">
                      <div className="flight-duration-line h-px bg-white/30 flex-1"></div>
                      <div className="px-2">{travelTimeString}</div>
                      <div className="flight-duration-line h-px bg-white/30 flex-1"></div>
                    </div>
                    <div className="flight-dates mt-2 flex justify-between items-center">
                      <div>{(cityFlights as Flight[]).length} flights • &euro;{price}+</div>
                      <div className="text-sm">
                        {isExpanded ? "Click to hide details" : "Click to show all flights"}
                      </div>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-white/20 bg-white/5 backdrop-blur-md">
                    {(cityFlights as Flight[]).map((cityFlight) => {
                      const flightPrice = Math.ceil(Math.ceil(cityFlight.price_eur) / 10) * 10;
                      const outboundDuration = formatDuration(cityFlight.outbound_duration);
                      
                      return (
                        <div 
                          key={cityFlight.id} 
                          className="p-4 border-b border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                          onClick={() => onSelectFlight(cityFlight.id)}
                        >
                          <div className="mb-3 flex justify-between items-center">
                            <div className="text-sm font-medium text-white/70">
                              Flight #{cityFlight.id.slice(-4)}
                            </div>
                            <div className="text-lg font-bold">&euro;{flightPrice}</div>
                          </div>
                          
                          {/* Outbound flight */}
                          <div className="mb-4">
                            <div className="text-sm text-white/60 mb-1">Outbound</div>
                            <div className="flex justify-between items-center">
                              <div className="text-lg font-medium">
                                {moment(cityFlight.outbound_depart_local_time).format("HH:mm")}
                              </div>
                              <div className="text-lg font-medium">
                                {moment(cityFlight.outbound_depart_local_time)
                                  .add(cityFlight.outbound_duration, 'seconds')
                                  .format("HH:mm")}
                              </div>
                            </div>
                            <div className="flex items-center my-1">
                              <div className="text-sm">{cityFlight.outbound_depart_airport}</div>
                              <div className="mx-2 flex-1 flex items-center">
                                <div className="h-px bg-white/30 flex-1"></div>
                                <div className="mx-2 text-xs text-white/60">{outboundDuration}</div>
                                <div className="h-px bg-white/30 flex-1"></div>
                              </div>
                              <div className="text-sm">{cityFlight.outbound_arrival_airport || flight.outbound_arrival_city}</div>
                            </div>
                            <div className="flex justify-between text-xs text-white/60">
                              <div>
                                {moment(cityFlight.outbound_depart_local_time).format("D MMM")}
                              </div>
                              <div className="font-medium">Direct</div>
                              <div>
                                {moment(cityFlight.outbound_depart_local_time)
                                  .add(cityFlight.outbound_duration, 'seconds')
                                  .format("D MMM")}
                              </div>
                            </div>
                          </div>

                          {/* Inbound flight */}
                          <div>
                            <div className="text-sm text-white/60 mb-1">Inbound</div>
                            <div className="flex justify-between items-center">
                              <div className="text-lg font-medium">
                                {moment(cityFlight.inbound_departure).format("HH:mm")}
                              </div>
                              <div className="text-lg font-medium">
                                {moment(cityFlight.inbound_arrival).format("HH:mm")}
                                {moment(cityFlight.inbound_arrival).isAfter(moment(cityFlight.inbound_departure).add(1, 'days')) && 
                                  <span className="text-xs text-white/60 ml-1">+1</span>}
                              </div>
                            </div>
                            <div className="flex items-center my-1">
                              <div className="text-sm">{cityFlight.inbound_depart_city}</div>
                              <div className="mx-2 flex-1 flex items-center">
                                <div className="h-px bg-white/30 flex-1"></div>
                                <div className="mx-2 text-xs text-white/60">
                                  {formatDuration(moment.duration(moment(cityFlight.inbound_arrival).diff(moment(cityFlight.inbound_departure))).asSeconds())}
                                </div>
                                <div className="h-px bg-white/30 flex-1"></div>
                              </div>
                              <div className="text-sm">{cityFlight.outbound_depart_airport}</div>
                            </div>
                            <div className="flex justify-between text-xs text-white/60">
                              <div>
                                {moment(cityFlight.inbound_departure).format("D MMM")}
                              </div>
                              <div className="font-medium">
                                1 stop • Bologna
                              </div>
                              <div>
                                {moment(cityFlight.inbound_arrival).format("D MMM")}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-3 text-right">
                            <div className="text-xs text-white/60">2 seats left at this price</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
          {flights.length === 0 && (
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
