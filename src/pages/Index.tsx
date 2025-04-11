
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Select } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoBackground from "@/components/VideoBackground";
import AudioPlayer from "@/components/AudioPlayer";
import SearchForm from "@/components/SearchForm";
import DealCard from "@/components/DealCard";
import { mockFlightDeals, mockAccommodationDeals, mockPackageDeals } from "@/data/mockDeals";

const Index = () => {
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);
  const [searchParams, setSearchParams] = useState<any>({});
  const [activeTab, setActiveTab] = useState("cheapest-deals");
  
  const handleSearch = (params: any) => {
    setSearchParams(params);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <VideoBackground />
      <AudioPlayer />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-4 z-10 flex items-center">
        <div className="flex items-center">
          <h1 className="text-white text-2xl font-bold">Travel Mate</h1>
        </div>
        <div className="ml-auto">
          <button 
            onClick={() => navigate("/wishlist")}
            className="text-white bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors"
          >
            My Wishlist
          </button>
        </div>
      </header>

      {/* Main content */}
      {!showResults ? (
        <main className="container px-6 z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg animate-pulse-slow">
            Best travel deals for the next 90 days
          </h1>
          
          <div className="max-w-4xl mx-auto">
            <SearchForm onSearch={handleSearch} />
          </div>

          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
            <div className="category-card">
              <h3 className="text-xl font-bold mb-2">Cheapest Flights</h3>
              <p className="text-white/80">
                Find the most affordable flights from your local airport.
              </p>
            </div>
            
            <div className="category-card">
              <h3 className="text-xl font-bold mb-2">Best Accommodations</h3>
              <p className="text-white/80">
                Quality hotels and apartments at great prices.
              </p>
            </div>
            
            <div className="category-card">
              <h3 className="text-xl font-bold mb-2">Complete Packages</h3>
              <p className="text-white/80">
                All-inclusive travel deals with everything you need.
              </p>
            </div>
          </div>
        </main>
      ) : (
        <main className="container px-4 py-20 z-10 flex-1 w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Travel deals from {searchParams.origin || "Selected Origin"}
            </h1>
            <p className="text-white/80">
              {searchParams.participants || "Solo"} &bull; {searchParams.period || "Any dates"}
            </p>
            <button 
              onClick={() => setShowResults(false)} 
              className="mt-4 text-white bg-white/10 px-3 py-1.5 text-sm rounded-full hover:bg-white/20 transition-colors"
            >
              New Search
            </button>
          </div>

          <Tabs defaultValue="cheapest-deals" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-8 bg-black/20 backdrop-blur-sm">
              <TabsTrigger value="cheapest-deals">Cheapest Deals</TabsTrigger>
              <TabsTrigger value="cheapest-flights">Cheapest Flights</TabsTrigger>
              <TabsTrigger value="cheapest-accommodation">Cheapest Accommodation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="cheapest-deals" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockPackageDeals.map(deal => (
                  <DealCard key={deal.id} deal={deal} type="package" />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="cheapest-flights" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockFlightDeals.map(deal => (
                  <DealCard key={deal.id} deal={deal} type="flight" />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="cheapest-accommodation" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockAccommodationDeals.map(deal => (
                  <DealCard key={deal.id} deal={deal} type="accommodation" />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      )}
    </div>
  );
};

export default Index;
