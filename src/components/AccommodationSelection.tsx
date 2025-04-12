
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockAccommodationDeals } from "@/data/mockDeals";
import { Share2Icon, Copy, Mail, UserIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface AccommodationSelectionProps {
  selectedFlight: any;
  searchParams: any;
}

const AccommodationSelection = ({ selectedFlight, searchParams }: AccommodationSelectionProps) => {
  const { toast } = useToast();
  const [showInvite, setShowInvite] = useState(false);
  const [email, setEmail] = useState("");

  // Group accommodations by provider
  const bookingDeals = mockAccommodationDeals.slice(0, 3);
  const expediaDeals = mockAccommodationDeals.slice(3, 6);
  const airbnbDeals = mockAccommodationDeals.slice(6, 9);

  const handleCopyLink = () => {
    const tripLink = `${window.location.origin}?trip=${selectedFlight.id}`;
    navigator.clipboard.writeText(tripLink);
    toast({
      title: "Link copied!",
      description: "Trip link has been copied to clipboard",
    });
  };

  const handleInviteFriend = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Friend invited!",
        description: `Invitation sent to ${email}`,
      });
      setEmail("");
      setShowInvite(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-100px)]">
      <div className="mb-6">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Accommodations in {selectedFlight.destination}
            </h2>
            <p className="text-white/80">
              {searchParams.participants || "Solo"} traveler
            </p>
          </div>
        </div>

        <div className="glass-card p-4 mt-4 mb-6 max-w-xl">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/3">
              <img 
                src={selectedFlight.image} 
                alt={selectedFlight.destination} 
                className="h-32 w-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-2">
                <h3 className="text-xl font-bold text-white">{selectedFlight.destination}</h3>
                <span className="text-xl font-bold text-white">${selectedFlight.price}</span>
              </div>
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <span className="text-white/80">From: {searchParams.origin || "Selected Origin"}</span>
                <span className="text-white/80">Airline: {selectedFlight.airline}</span>
              </div>
              <div className="text-white/80">
                Your flight is selected and saved. Now choose your accommodation.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">All Available Accommodations</h3>
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4" style={{ minWidth: "max-content" }}>
              {bookingDeals.map((deal) => (
                <div key={deal.id} className="glass-card p-4 w-80">
                  <img 
                    src={deal.image} 
                    alt={deal.title} 
                    className="h-32 w-full object-cover rounded-lg mb-2"
                  />
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-lg font-bold text-white">{deal.title}</h4>
                    <span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded">Booking.com</span>
                  </div>
                  <div className="flex justify-between my-1">
                    <span className="text-white/80">{deal.rating}/5 ★</span>
                    <span className="font-bold text-white">${deal.price}/night</span>
                  </div>
                  <button className="mt-2 bg-white/20 hover:bg-white/30 transition-colors text-white px-4 py-2 rounded-lg w-full">
                    View Deal
                  </button>
                </div>
              ))}
              
              {expediaDeals.map((deal) => (
                <div key={deal.id} className="glass-card p-4 w-80">
                  <img 
                    src={deal.image} 
                    alt={deal.title} 
                    className="h-32 w-full object-cover rounded-lg mb-2"
                  />
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-lg font-bold text-white">{deal.title}</h4>
                    <span className="text-xs bg-yellow-600 text-white px-2 py-1 rounded">Expedia</span>
                  </div>
                  <div className="flex justify-between my-1">
                    <span className="text-white/80">{deal.rating}/5 ★</span>
                    <span className="font-bold text-white">${deal.price}/night</span>
                  </div>
                  <button className="mt-2 bg-white/20 hover:bg-white/30 transition-colors text-white px-4 py-2 rounded-lg w-full">
                    View Deal
                  </button>
                </div>
              ))}
              
              {airbnbDeals.map((deal) => (
                <div key={deal.id} className="glass-card p-4 w-80">
                  <img 
                    src={deal.image} 
                    alt={deal.title} 
                    className="h-32 w-full object-cover rounded-lg mb-2"
                  />
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-lg font-bold text-white">{deal.title}</h4>
                    <span className="text-xs bg-red-600 text-white px-2 py-1 rounded">Airbnb</span>
                  </div>
                  <div className="flex justify-between my-1">
                    <span className="text-white/80">{deal.rating}/5 ★</span>
                    <span className="font-bold text-white">${deal.price}/night</span>
                  </div>
                  <button className="mt-2 bg-white/20 hover:bg-white/30 transition-colors text-white px-4 py-2 rounded-lg w-full">
                    View Deal
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Participants Section */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-white mb-4">Participants</h3>
          <div className="glass-card p-4 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-3 rounded-full">
                <UserIcon className="text-white" size={24} />
              </div>
              <div>
                <p className="text-white font-medium">You</p>
                <p className="text-white/60 text-sm">Trip organizer</p>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button 
                onClick={handleCopyLink} 
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors text-white px-4 py-2 rounded-lg"
              >
                <Copy size={16} />
                <span>Copy Trip Link</span>
              </button>
              <button 
                onClick={() => setShowInvite(!showInvite)} 
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors text-white px-4 py-2 rounded-lg"
              >
                <Mail size={16} />
                <span>Invite Friends</span>
              </button>
            </div>

            {showInvite && (
              <form onSubmit={handleInviteFriend} className="mt-4 flex gap-3">
                <Input
                  type="email"
                  placeholder="Friend's email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass-input flex-1"
                />
                <button type="submit" className="search-button">
                  Send Invite
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccommodationSelection;
