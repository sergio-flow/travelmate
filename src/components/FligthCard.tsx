import React from 'react';
import moment from 'moment';

const FlightCard = ({ flight, onSelect }) => {
  // Format outbound times
  const outboundDepartTime = moment(flight.outbound_depart_local_time).format("HH:mm");
  const outboundArrivalTime = moment(flight.outbound_arrival_local_time).format("HH:mm");
  
  // Format inbound times
  const inboundDepartTime = moment(flight.inbound_depart_local_time).format("HH:mm");
  const inboundArrivalTime = moment(flight.inbound_arrival_local_time).format("HH:mm");
  
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
    <div className="w-full max-w-xl rounded-lg bg-white p-4 shadow-md mb-4">
      <div className="flex">
        {/* Main flight info section - 75% width */}
        <div className="w-3/4 pr-4">
          {/* Outbound Section */}
          <div className="border-b pb-4">
            <div className="mb-2">
              <span className="font-medium text-gray-600">Outbound</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{outboundDepartTime}</span>
                <span className="text-lg font-medium">{flight.outbound_depart_airport}</span>
              </div>

              <div className="mx-2 flex flex-grow flex-col items-center">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-600">{outboundTravelTimeString}</span>
                  <img 
                    src={carrierLogo(flight.outbound_carrier_name)} 
                    alt={flight.outbound_carrier_name} 
                    className="ml-2 h-4" 
                  />
                </div>
                <div className="mt-1 flex w-full items-center">
                  <div className="h-0.5 flex-grow bg-gray-300"></div>
                </div>
                <span className="mt-1 text-sm font-medium text-gray-600">Direct</span>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-2xl font-bold">{outboundArrivalTime}</span>
                <span className="text-lg font-medium">{flight.outbound_arrival_airport}</span>
              </div>
            </div>
          </div>

          {/* Inbound Section */}
          <div className="py-4">
            <div className="mb-2">
              <span className="font-medium text-gray-600">Inbound</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{inboundDepartTime}</span>
                <span className="text-lg font-medium">{flight.inbound_depart_airport}</span>
              </div>

              <div className="mx-2 flex flex-grow flex-col items-center">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-600">{inboundTravelTimeString}</span>
                  <img 
                    src={carrierLogo(flight.inbound_carrier_name)} 
                    alt={flight.inbound_carrier_name} 
                    className="ml-2 h-4" 
                  />
                </div>
                <div className="mt-1 flex w-full items-center">
                  <div className="h-0.5 flex-grow bg-gray-300"></div>
                </div>
                <span className="mt-1 text-sm font-medium text-gray-600">Direct</span>
              </div>

              <div className="flex flex-col items-end">
                <div className="flex items-center">
                  <span className="text-2xl font-bold">{inboundArrivalTime}</span>
                  {isInboundNextDay && <sup className="text-xs font-medium text-gray-500">+1</sup>}
                </div>
                <span className="text-lg font-medium">{flight.inbound_arrival_airport}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Price and Select button section - 25% width */}
        <div className="flex w-1/4 flex-col items-center justify-center border-l pl-4">
          <div className="mb-4 text-center">
            <span className="text-2xl font-bold">€{price}</span>
          </div>
          <button 
            className="w-full rounded bg-green-600 py-3 font-medium text-white transition hover:bg-green-700"
            onClick={() => onSelect(flight.id)}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

const FlightItineraries = ({ flightData, onSelectFlight }) => {
  return (
    <div className="space-y-4">
      {Object.values(flightData).map((flight) => (
        <FlightCard 
          key={flight.id} 
          flight={flight} 
          onSelect={onSelectFlight} 
        />
      ))}
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
