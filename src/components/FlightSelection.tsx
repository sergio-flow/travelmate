
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockFlightDeals } from "@/data/mockDeals";
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
}

interface FlightSelectionProps {
  flights: Flight[];
  onSelectFlight: (flightId: string) => void;
  origin: string;
  participants: string;
}

const carrierLogo = (airline: string) => {
  return `https://images.kiwi.com/airlines/64x64/${airline}.png?default=airline.png`;
}

const FlightSelection = ({ flights, onSelectFlight, origin, participants }: FlightSelectionProps) => {
  console.log("Flights:", flights);

  const flightsByCity = {}
  flights.forEach((flight) => {
    const city = flight.inbound_depart_city;
    if (!flightsByCity[city]) {
      flightsByCity[city] = [];
    }
    flightsByCity[city].push(flight);
  });

  // filter flightsByCity object order based on flights[0].price_eur
  Object.keys(flightsByCity).sort((a, b) => {
    return flightsByCity[a][0].price_eur - flightsByCity[b][0].price_eur;
  });

  const sortedFlightsByCity = Object.keys(flightsByCity).sort((a, b) => {
    return flightsByCity[a][0].price_eur - flightsByCity[b][0].price_eur;
  }).reduce((acc, key) => {
    acc[key] = flightsByCity[key];
    return acc;
  }, {});


  // console.log(Object.keys(flightsByCity))

  // console.log("flightsByCity", flightsByCity)

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-white text-center">
          Cheapest destinations from {origin}<br />next week
        </h2>
        {/* <p className="text-white/80">
          {participants} traveler
        </p> */}
      </div>

      <ScrollArea className="pt-5 pb-20 px-10">
        <div className="space-y-4">
          {Object.entries(sortedFlightsByCity).map(([city, flights]) => {
            const flight = flights[0];
            const timeFrom = moment(flight.outbound_depart_local_time).format("ddd HH:mm");
            const timeTo = moment(flight.inbound_arrival_local_time).format("ddd HH:mm");
            const duration = moment.duration(moment(flight.inbound_arrival).diff(moment(flight.inbound_departure)));
            const durationString = `${duration.hours()}h ${duration.minutes()}m`;
            // const price = Math.ceil(flight.price_eur);
            const price = Math.ceil(Math.ceil(flight.price_eur) / 10) * 10;
            // outbound_duration is ms, transform to h m
            const travelTime = moment.duration(flight.outbound_duration, "seconds");
            const travelTimeString = `${travelTime.hours()}h ${travelTime.minutes()}m`;
            const dateFrom = moment(flight.inbound_departure).format("DD MMM");
            const dateTo = moment(flight.inbound_arrival).format("DD MMM");
            return (
              <div
                key={flight.id}
                className="glass-card p-4 flex flex-col md:flex-row gap-8 cursor-pointer hover:bg-white/20 transition-colors"
                onClick={() => onSelectFlight(flight.id)}
              >
                <div className="w-full md:w-1/4">
                  <img
                    src={`/cities/${city}.jpg`}
                    alt={flight.destination || ""}
                    className="h-32 w-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <div className="itinerary-card">
                    <div className="itinerary-times">
                      <div>{timeFrom}</div>
                      {/* <div>&euro;{price}</div> */}
                      <div>{timeTo}</div>
                    </div>
                    <div className="itinerary-locations">
                      <div>{flight.outbound_depart_city}</div>
                      <div>{city}</div>
                    </div>
                    <div className="flight-duration">
                      <div className="plane-icon">✈</div>
                      <div className="flight-duration-line"></div>
                      <div>{travelTimeString}</div>
                    </div>
                    <div className="flight-dates">
                      <div>{(flights as []).length} flights • &euro;{price}+</div>
                      {/* <div>{dateTo}</div> */}
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
            )
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
