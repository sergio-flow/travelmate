
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockFlightDeals } from "@/data/mockDeals";
import moment from "moment";
import FlightItineraries from "./FligthCard";

interface Flight {
  id: number;
  created_at: string;
  outbound_duration: number;
  outbound_depart_city: string;
  outbound_depart_country: string;
  outbound_depart_airport: string
  outbound_depart_local_time: string;
  outbound_arrival_city: string;
  outbound_arrival_country: string;
  outbound_arrival_airport: string;
  outbound_arrival_local_time: string;
  inbound_duration: number;
  inbound_depart_city: string;
  inbound_depart_country: string;
  inbound_depart_airport: string;
  inbound_depart_local_time: string;
  inbound_arrival_city: string;
  inbound_arrival_country: string;
  inbound_arrival_airport: string;
  inbound_arrival_local_time: string;
  price_eur: number;
  outbound_carrier_code: string;
  inbound_carrier_code: string;
  outbound_carrier_name: string;
  inbound_carrier_name: string;
}

interface FlightSelectionProps {
  flights: Flight[];
  onSelectFlight: (flightId: string) => void;
  origin: string;
  participants: string;
}

function orderMonths(obj) {
  const ordered = {};
  const monthOrder = [
    "Aceasta luna",
    "Luna viitoare",
    "In 2 luni",
    "In 3 luni",
    "In 4 luni",
    "In 5 luni",
    "In 6 luni",
  ];
  for (const city in obj) {
    ordered[city] = {};
    for (const month of monthOrder) {
      if (obj[city][month]) {
        ordered[city][month] = obj[city][month];
      }
    }
  }
  return ordered;
}

function transformFlights(flights) {
  const now = new Date();
  const baseMonth = now.getMonth();
  const baseYear = now.getFullYear();

  const monthLabels = {
    0: "Aceasta luna",
    1: "Luna viitoare",
    2: "In 2 luni",
    3: "In 3 luni",
    4: "In 4 luni",
    5: "In 5 luni",
    6: "In 6 luni",
  };

  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Step 1: Build temp structure
  const temp = {};

  flights.forEach(flight => {
    const departCity = flight.outbound_depart_city;
    const arrivalCity = flight.outbound_arrival_city;
    const date = new Date(flight.outbound_depart_local_time);
    const flightMonth = date.getMonth();
    const flightYear = date.getFullYear();
    const dayName = weekdays[date.getDay()];

    if (!["MON", "TUE", "WED", "THU", "FRI"].includes(dayName)) return;

    const offset = (flightYear - baseYear) * 12 + (flightMonth - baseMonth);
    if (offset < 0 || offset > 3) return;

    const monthKey = monthLabels[offset];

    temp[departCity] ??= {};
    temp[departCity][monthKey] ??= {};
    temp[departCity][monthKey][dayName] ??= {};

    const existing = temp[departCity][monthKey][dayName][arrivalCity];

    if (!existing || flight.price_eur < existing.price_eur) {
      temp[departCity][monthKey][dayName][arrivalCity] = flight;
    }
  });

  // Step 2: Rebuild `result` with sorted arrival cities by price
  const result = {};

  for (const departCity in temp) {
    result[departCity] = {};

    for (const offset in monthLabels) {
      const monthKey = monthLabels[offset];
      if (!temp[departCity][monthKey]) continue;

      result[departCity][monthKey] = {};

      for (const dayName of ["MON", "TUE", "WED", "THU", "FRI"]) {
        if (!temp[departCity][monthKey][dayName]) continue;

        const arrivalMap = temp[departCity][monthKey][dayName];

        // Sort arrival cities by cheapest price
        const sortedArrivals = Object.entries(arrivalMap)
          .sort(([, a]: [string, Flight], [, b]: [string, Flight]) => new Date(a.outbound_depart_local_time).getTime() - new Date(b.outbound_depart_local_time).getTime());

        result[departCity][monthKey][dayName] = {};
        for (const [arrivalCity, flight] of sortedArrivals) {
          result[departCity][monthKey][dayName][arrivalCity] = flight;
        }
      }
    }
  }

  return result;
}




const carrierLogo = (airline: string) => {
  return `https://images.kiwi.com/airlines/64x64/${airline}.png?default=airline.png`;
}

const FlightSelection = ({ flights, onSelectFlight, origin, participants }: FlightSelectionProps) => {
  const [isExpanded, setIsExpanded] = React.useState("");
  const [departureCity, setDepartureCity] = useState('Cluj-Napoca');
  const [departureDay, setDepartureDay] = useState('THU');

  const transformed = transformFlights(flights)
  const ordered = orderMonths(transformed);

  const flightsByCity = {}
  flights.forEach((flight) => {
    const city = flight.outbound_depart_city;
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
    <div className="w-full max-w-lg mx-auto">
      <div className="mb-8 mt-20">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center">
          Destinatii sub &euro;100<br />pentru tur si retur
        </h2>
        {/* <p className="text-white/80">
          {participants} traveler
        </p> */}
        <div className="p-2 mt-8 max-w-md mx-auto">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative w-full md:w-auto flex-1">
              <select
                value={departureCity}
                onChange={(e) => setDepartureCity(e.target.value)}
                className="appearance-none w-full px-4 py-2 bg-white text-white bg-opacity-20 backdrop-blur-sm rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="Bucharest">Din Bucuresti</option>
                <option value="Iași">Din Iasi</option>
                <option value="Cluj-Napoca">Din Cluj</option>
                <option value="Chișinău">Din Chisinau</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div className="relative w-full md:w-auto flex-1">
              <select
                value={departureDay}
                onChange={(e) => setDepartureDay(e.target.value)}
                className="appearance-none w-full px-4 py-2 bg-white text-white bg-opacity-20 backdrop-blur-sm rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="MON">De luni pana duminica</option>
                <option value="TUE">De marti pana dum.</option>
                <option value="WED">De miercuri pana dum.</option>
                <option value="THU">De joi pana duminica</option>
                <option value="FRI">De vineri pana dum.</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ScrollArea className="pb-20 px-0 md:px-10">
        <div className="py-4">
          {Object.entries(ordered[departureCity]).map(([period, days]) => {
            if (!days[departureDay]) return null;
            return (
              <div key={`${departureCity}-${period}`} className="flex flex-col my-4 mb-20">
                <h3 className="text-sm font-bold uppercase text-center text-white mb-4">{period}</h3>
                {Object.entries(days[departureDay]).map(([city, flight]: [string, Flight]) => {
                  // const flight = day[departureDay];
                  const timeFrom = moment(flight.outbound_depart_local_time).format("ddd HH:mm");
                  const timeTo = moment(flight.inbound_arrival_local_time).format("ddd HH:mm");
                  // const duration = moment.duration(moment(flight.inbound_arrival_local_time).diff(moment(flight.outbound_depart_local_time)));
                  // const durationString = `${duration.hours()}h ${duration.minutes()}m`;
                  // const price = Math.ceil(flight.price_eur);
                  const price = Math.ceil(Math.ceil(flight.price_eur) / 10) * 10;
                  // outbound_duration is ms, transform to h m
                  const travelTime = moment.duration(flight.outbound_duration, "seconds");
                  const travelTimeString = `${travelTime.hours()}h ${travelTime.minutes()}m`;
                  const dateFrom = moment(flight.outbound_depart_local_time).format("D MMM");
                  const dateTo = moment(flight.inbound_arrival_local_time).format("D MMM");
                  return (
                    <div
                      key={`${city}-${period}`}
                      className="glass-card p-4 mb-4 flex flex-col md:flex-row gap-8 cursor-pointer hover:bg-white/20 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="itinerary-card mb-0"
                          onClick={() => {
                            setIsExpanded(isExpanded === city ? "" : city);
                          }}
                        >
                          <div className="itinerary-times">
                            <div>{dateFrom}</div>
                            {/* <div>&euro;{price}</div> */}
                            <div>{dateTo}</div>
                          </div>
                          <div className="itinerary-locations">
                            <div>{flight.outbound_depart_airport}</div>
                            <div>{flight.outbound_arrival_city}</div>
                            <div>{flight.outbound_depart_airport}</div>
                          </div>
                          <div className="flight-duration">
                            {/* <div className="plane-icon">✈</div> */}
                            <div className="flight-duration-line"></div>
                            <div>{travelTimeString}</div>
                          </div>
                          <div className="flight-dates">
                            <div className="text-center">&euro;{price}</div>
                          </div>
                        </div>

                        {isExpanded && isExpanded === city && (
                          <FlightItineraries flightData={[flight]} />
                        )}


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


                      {/* <div className="w-full md:w-1/4">
                      <img
                        src={`/cities/${city}.jpg`}
                        alt={flight.destination || ""}
                        className="h-32 w-full object-cover rounded-lg"
                      />
                    </div> */}
                    </div>
                  )
                })}
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
