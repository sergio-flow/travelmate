import React, { useState } from 'react';
import moment from 'moment';

const FlightCard = ({ flight }) => {
  // Format outbound times
  const outboundDepartTime = moment(flight.outbound_depart_local_time).format("ddd ha");
  const outboundArrivalTime = moment(flight.outbound_arrival_local_time).format("ddd ha");

  // Format inbound times, Format Fri 6pm
  const inboundDepartTime = moment(flight.inbound_depart_local_time).format("ddd ha");
  const inboundArrivalTime = moment(flight.inbound_arrival_local_time).format("ddd ha");

  // Check if arrival is next day
  const isInboundNextDay = moment(flight.inbound_arrival_local_time).diff(moment(flight.inbound_depart_local_time), 'days') > 0;

  // Format durations
  const outboundTravelTime = moment.duration(flight.outbound_duration, "seconds");
  const outboundTravelTimeString = `${outboundTravelTime.hours()}h ${outboundTravelTime.minutes()}m`;

  const inboundTravelTime = moment.duration(flight.inbound_duration, "seconds");
  const inboundTravelTimeString = `${inboundTravelTime.hours()}h ${inboundTravelTime.minutes()}m`;

  // Format price (rounded up to nearest 10)
  const price = Math.ceil(Math.ceil(flight.price_eur) / 10) * 10;

  // Get carrier logo
  const carrierLogo = (airline) => {
    return `https://images.kiwi.com/airlines/64x64/${airline}.png?default=airline.png`;
  };

  return (
    <div className="w-full max-w-xl rounded-lg glass-card p-4 pb-0 pt-0 shadow-md text-white">
      <div className="flex">
        {/* Main flight info section - 75% width */}
        <div className="w-3/4 pr-4 pt-4">
          {/* Outbound Section */}
          <div className="">
            {/* <div className="mb-2">
              <span className="font-medium text-gray-600">Outbound</span>
            </div> */}

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-md font-bold">{outboundDepartTime}</span>
                <span className="text-lg font-medium">{flight.outbound_depart_airport}</span>
              </div>

              <div className="mx-2 flex flex-grow flex-col items-center">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-white/60">{outboundTravelTimeString}</span>
                  <img
                    src={carrierLogo(flight.outbound_carrier_code)}
                    alt={flight.outbound_carrier_name}
                    className="ml-2 h-4 rounded bg-white"
                  />
                </div>
                <div className="mt-1 flex w-full items-center">
                  <div className="h-0.5 flex-grow bg-gray-300"></div>
                </div>
                <span className="mt-1 text-sm font-medium text-white/60">Direct</span>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-md font-bold">{outboundArrivalTime}</span>
                <span className="text-lg font-medium">{flight.outbound_arrival_airport}</span>
              </div>
            </div>
          </div>

          {/* Inbound Section */}
          <div className="py-4">
            {/* <div className="mb-2">
              <span className="font-medium text-gray-600">Inbound</span>
            </div> */}

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-md font-bold">{inboundDepartTime}</span>
                <span className="text-lg font-medium">{flight.inbound_depart_airport}</span>
              </div>

              <div className="mx-2 flex flex-grow flex-col items-center">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-white/60">{inboundTravelTimeString}</span>
                  <img
                    src={carrierLogo(flight.inbound_carrier_code)}
                    alt={flight.inbound_carrier_name}
                    className="ml-2 h-4 rounded bg-white"
                  />
                </div>
                <div className="mt-1 flex w-full items-center">
                  <div className="h-0.5 flex-grow bg-gray-300"></div>
                </div>
                <span className="mt-1 text-sm font-medium text-white/60">Direct</span>
              </div>

              <div className="flex flex-col items-end">
                <div className="flex items-center">
                  <span className="text-md font-bold">{inboundArrivalTime}</span>
                  {isInboundNextDay && <sup className="text-xs font-medium text-gray-500">+1</sup>}
                </div>
                <span className="text-lg font-medium">{flight.inbound_arrival_airport}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Price and Select button section - 25% width */}
        <div className="flex w-1/4 flex-col items-center justify-center border-l border-white/40 pl-4">
          <div className="text-center">
            <span className="text-2xl font-bold">€{price}</span>
          </div>
          {/* <button 
            className="w-full rounded bg-green-600 py-3 font-medium text-white transition hover:bg-green-700"
            onClick={() => onSelect(flight.id)}
          >
            Select
          </button> */}
        </div>
      </div>
    </div>
  );
};

const FlightItineraries = ({ flightData }) => {
  const [visibleFlights, setVisibleFlights] = useState(2);
  const flights = Object.values(flightData);

  const handleLoadMore = () => {
    setVisibleFlights(prev => Math.min(prev + 3, flights.length));
  };

  const displayedFlights = flights.slice(0, visibleFlights);
  const hasMoreFlights = visibleFlights < flights.length;

  return (
    <div className="space-y-4 mt-4">
      {displayedFlights.map((flight, key) => (
        <FlightCard
          key={key}
          flight={flight}
        />
      ))}

      {/* {hasMoreFlights && (
        <div className="flex justify-center mt-4 mb-10">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 font-semibold text-white rounded hover:bg-white-100 transition-colors"
          >
            Load more
          </button>
        </div>
      )} */}
    </div>
  );
};

export default FlightItineraries;

// Example usage:
// const App = () => {
//   const flightData = {
//     "2": {
//       "id": 360,
//       // ... other flight data
//     }
//   };
//
//   const handleSelectFlight = (flightId) => {
//     console.log(`Selected flight with ID: ${flightId}`);
//   };
//
//   return (
//     <FlightItineraries 
//       flightData={flightData} 
//       onSelectFlight={handleSelectFlight} 
//     />
//   );
// };
