
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Penguins } from "@/components/Icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoBackground from "@/components/VideoBackground";
import AudioPlayer from "@/components/AudioPlayer";
import DealCard from "@/components/DealCard";
import { mockFlightDeals, mockAccommodationDeals, mockPackageDeals } from "@/data/mockDeals";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchParams } = location.state || { searchParams: {} };
  const [activeTab, setActiveTab] = useState("cheapest-deals");

  // In a real app, we would fetch data based on search params
  // For now, we'll just use the mock data

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      <VideoBackground />
      <AudioPlayer />

      {/* Header */}
      <header className="sticky top-0 left-0 w-full p-4 z-20 flex items-center bg-black/30 backdrop-blur-md">
        <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
          <Penguins className="w-8 h-8 text-white mr-2" />
          <h1 className="text-white text-xl font-bold">Travel Mate</h1>
        </div>
        <div className="ml-auto flex gap-4">
          <button
            onClick={() => navigate("/")}
            className="text-white bg-white/10 px-3 py-1.5 text-sm rounded-full hover:bg-white/20 transition-colors"
          >
            New Search
          </button>
          <button
            onClick={() => navigate("/wishlist")}
            className="text-white bg-white/10 px-3 py-1.5 text-sm rounded-full hover:bg-white/20 transition-colors"
          >
            My Wishlist
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="container px-4 py-8 z-10 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Travel deals from {searchParams.origin || "Selected Origin"}
          </h1>
          <p className="text-white/80">
            {searchParams.participants || "Solo"} &bull; {searchParams.period || "Any dates"}
          </p>
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
    </div>
  );
};

export default ResultsPage;
