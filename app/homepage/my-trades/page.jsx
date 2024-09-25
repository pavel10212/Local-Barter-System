"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FaExchangeAlt, FaUserCircle } from "react-icons/fa";
import Image from "next/image";

const MyTrades = () => {
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [isCounterOfferVisible, setIsCounterOfferVisible] = useState(false);
  const [counterOffer, setCounterOffer] = useState("");

  const incomingTrades = [
    {
      id: 1,
      title: "Trade: Book Exchange",
      user: "Emily Clark",
      avatar: "https://i.pravatar.cc/150?img=5",
      seeking: "New Books",
      status: "counter",
      address: "123 Main St, Bangkok, Thailand",
      counterOffer: "I can offer a rare edition of a classic novel.",
    },
    {
      id: 2,
      title: "Trade: Plant Swap",
      user: "Michael Brown",
      avatar: "https://i.pravatar.cc/150?img=6",
      seeking: "Rare Plants",
      status: "accepted",
      address: "456 Elm St, Chiang Mai, Thailand",
    },
  ];

  const outgoingTrades = [
    {
      id: 3,
      title: "Trade: Art Supplies for Craft Materials",
      user: "Sophia Turner",
      avatar: "https://i.pravatar.cc/150?img=7",
      seeking: "Craft Materials",
      status: "counter",
      counterOffer: "I can offer 10 packs of craft materials instead of 5.",
      address: "789 Oak St, Phuket, Thailand",
    },
    {
      id: 4,
      title: "Trade: Baking Goods for Fresh Produce",
      user: "Liam Johnson",
      avatar: "https://i.pravatar.cc/150?img=8",
      seeking: "Fresh Produce",
      status: "accepted",
      address: "101 Pine St, Pattaya, Thailand",
    },
  ];

  const handleTradeClick = (trade) => {
    setSelectedTrade(trade);
    setIsCounterOfferVisible(false);
  };

  const handleClose = () => {
    setSelectedTrade(null);
    setIsCounterOfferVisible(false);
  };

  const handleCounterOfferClick = () => {
    setIsCounterOfferVisible(!isCounterOfferVisible);
  };

  const handleAcceptCounterOffer = () => {
    // Logic to accept the counter offer
    alert("Counter offer accepted!");
    handleClose();
  };

  const handleDeclineCounterOffer = () => {
    // Logic to decline the counter offer
    alert("Counter offer declined!");
    handleClose();
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
      <header className="bg-gray-800 shadow-lg py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">My Trades</h1>
          <p className="text-gray-400 mt-2">Manage your trades and offers</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="publicListings">
          <TabsList className="mb-6">
            <TabsTrigger value="publicListings">Public Listings</TabsTrigger>
            <TabsTrigger value="myOffers">My Offers</TabsTrigger>
          </TabsList>

          <TabsContent value="publicListings">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {incomingTrades.map((trade) => (
                <div
                  key={trade.id}
                  className={`rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition duration-300 transform hover:-translate-y-1 ${
                    trade.status === "counter" ? "bg-yellow-500" : trade.status === "accepted" ? "bg-green-500" : "bg-gray-700"
                  }`}
                  onClick={() => handleTradeClick(trade)}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <Image src={trade.avatar} alt={trade.user} className="w-10 h-10 rounded-full mr-3" />
                      <span className="font-medium">{trade.user}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{trade.title}</h3>
                    <div className="flex items-center text-gray-400">
                      <FaExchangeAlt className="mr-2" />
                      <span>{trade.seeking}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="myOffers">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {outgoingTrades.map((trade) => (
                <div
                  key={trade.id}
                  className={`rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition duration-300 transform hover:-translate-y-1 ${
                    trade.status === "counter" ? "bg-yellow-500" : trade.status === "accepted" ? "bg-green-500" : "bg-gray-700"
                  }`}
                  onClick={() => handleTradeClick(trade)}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <Image src={trade.avatar} alt={trade.user} className="w-10 h-10 rounded-full mr-3" />
                      <span className="font-medium">{trade.user}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{trade.title}</h3>
                    <div className="flex items-center text-gray-400">
                      <FaExchangeAlt className="mr-2" />
                      <span>{trade.seeking}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {selectedTrade && (
        <Dialog open={!!selectedTrade} onOpenChange={handleClose}>
          <DialogContent className="bg-gray-800 text-white">
            <DialogTitle className="text-2xl font-bold mb-4">{selectedTrade.title}</DialogTitle>
            <DialogDescription className="text-gray-400 mb-6">
              <div className="flex items-center">
                <FaUserCircle className="mr-2" />
                <span>{selectedTrade.user}</span>
              </div>
              <div className="mt-2">
                <span className="font-semibold">Seeking:</span> {selectedTrade.seeking}
              </div>
              <div className="mt-4">
                <span className="font-semibold">Address:</span> {selectedTrade.address}
              </div>
              {selectedTrade.status === "counter" && selectedTrade.counterOffer && (
                <div className="mt-4">
                  <span className="font-semibold">Counter Offer:</span> {selectedTrade.counterOffer}
                </div>
              )}
            </DialogDescription>

            {isCounterOfferVisible && (
              <div className="mb-6">
                <label htmlFor="counterOffer" className="block text-sm font-medium mb-2">
                  Your Counter Offer
                </label>
                <input
                  id="counterOffer"
                  type="text"
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                  placeholder="Enter your counter offer"
                  value={counterOffer}
                  onChange={(e) => setCounterOffer(e.target.value)}
                />
              </div>
            )}

            <div className="flex justify-end space-x-4">
              {selectedTrade.status === "counter" && selectedTrade.counterOffer && selectedTrade.user === "Sophia Turner" && (
                <>
                  <button
                    className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 transition duration-300"
                    onClick={handleAcceptCounterOffer}
                  >
                    Accept
                  </button>
                  <button
                    className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 transition duration-300"
                    onClick={handleDeclineCounterOffer}
                  >
                    Decline
                  </button>
                </>
              )}
              {selectedTrade.status === "counter" && selectedTrade.counterOffer && selectedTrade.user !== "Sophia Turner" && (
                <button
                  className="px-4 py-2 rounded bg-yellow-600 hover:bg-yellow-500 transition duration-300"
                  onClick={handleCounterOfferClick}
                >
                  {isCounterOfferVisible ? "Cancel Counter" : "Counter Offer"}
                </button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default MyTrades;