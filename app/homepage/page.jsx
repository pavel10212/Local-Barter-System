"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FaExchangeAlt, FaUserCircle, FaPlus } from "react-icons/fa";

const Homepage = () => {
  const [selectedBarter, setSelectedBarter] = useState(null);
  const [isCounterOfferVisible, setIsCounterOfferVisible] = useState(false);
  const [counterOffer, setCounterOffer] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newTrade, setNewTrade] = useState({ title: "", seeking: "", description: "" });

  const loggedInUser = "Current User"; // Replace with actual logged-in user data

  const [barters, setBarters] = useState([
    {
      id: 1,
      title: "Lawn Mowing",
      seeking: "Home-cooked Meals",
      user: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1",
      description: "I will mow your lawn in exchange for home-cooked meals.",
      city: "Bangkok",
    },
    {
      id: 2,
      title: "Guitar Lessons",
      seeking: "Spanish Tutoring",
      user: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=2",
      description: "Offering guitar lessons for beginners in exchange for Spanish tutoring.",
      city: "Chiang Mai",
    },
    {
      id: 3,
      title: "Handmade Jewelry",
      seeking: "Graphic Design",
      user: "Alice Johnson",
      avatar: "https://i.pravatar.cc/150?img=3",
      description: "Handmade jewelry available for trade with graphic design services.",
      city: "Phuket",
    },
    {
      id: 4,
      title: "Car Repair",
      seeking: "Painting Services",
      user: "Bob Williams",
      avatar: "https://i.pravatar.cc/150?img=4",
      description: "I can repair your car in exchange for painting services.",
      city: "Pattaya",
    },
  ]);

  const handleBarterClick = (barter) => {
    setSelectedBarter(barter);
    setIsCounterOfferVisible(false);
  };

  const handleClose = () => {
    setSelectedBarter(null);
    setIsCounterOfferVisible(false);
  };

  const handleCounterOfferClick = () => {
    setIsCounterOfferVisible(!isCounterOfferVisible);
  };

  const handleCreateClick = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCreateClose = () => {
    setIsCreateDialogOpen(false);
    setNewTrade({ title: "", seeking: "", description: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrade((prevTrade) => ({ ...prevTrade, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newBarter = {
      ...newTrade,
      id: barters.length + 1,
      user: loggedInUser,
      avatar: "https://i.pravatar.cc/150?img=5", // Placeholder avatar
      city: "Bangkok", // Default city for new trades, replace as needed
    };
    setBarters((prevBarters) => [...prevBarters, newBarter]);
    handleCreateClose();
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
      <header className="bg-gray-800 shadow-lg py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Barter Exchange</h1>
          <p className="text-gray-400 mt-2">Trade skills and services in your community</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Available Barters</h2>
          <button
            className="flex items-center bg-black text-white py-2 px-4 rounded-full hover:bg-white hover:text-black transition duration-300"
            onClick={handleCreateClick}
          >
            <FaPlus className="mr-2" />
            Create
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {barters.map((barter) => (
            <div
              key={barter.id}
              className="bg-gray-700 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
              onClick={() => handleBarterClick(barter)}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img src={barter.avatar} alt={barter.user} className="w-10 h-10 rounded-full mr-3" />
                  <span className="font-medium">{barter.user}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{barter.title}</h3>
                <div className="flex items-center text-gray-400">
                  <FaExchangeAlt className="mr-2" />
                  <span>{barter.seeking}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selectedBarter && (
        <Dialog open={!!selectedBarter} onOpenChange={handleClose}>
          <DialogContent className="bg-gray-800 text-white">
            <DialogTitle className="text-2xl font-bold mb-4">{selectedBarter.title}</DialogTitle>
            <DialogDescription className="text-gray-400 mb-6">
              <div className="flex items-center">
                <FaUserCircle className="mr-2" />
                <span>{selectedBarter.user}</span>
              </div>
              <div className="mt-2">
                <span className="font-semibold">Seeking:</span> {selectedBarter.seeking}
              </div>
              <div className="mt-4">
                <span className="font-semibold">Description:</span> {selectedBarter.description}
              </div>
              <div className="mt-4">
                <span className="font-semibold">Location:</span> near {selectedBarter.city} area
              </div>
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
              <button
                className="px-4 py-2 rounded bg-yellow-600 hover:bg-yellow-500 transition duration-300"
                onClick={handleCounterOfferClick}
              >
                {isCounterOfferVisible ? "Cancel Counter" : "Counter Offer"}
              </button>
              <button className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 transition duration-300">
                Accept
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={isCreateDialogOpen} onOpenChange={handleCreateClose}>
        <DialogContent className="bg-gray-800 text-white">
          <DialogTitle className="text-2xl font-bold mb-4">Create New Trade</DialogTitle>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Offer
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                value={newTrade.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="seeking" className="block text-sm font-medium mb-2">
                Seeking
              </label>
              <input
                id="seeking"
                name="seeking"
                type="text"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                value={newTrade.seeking}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                value={newTrade.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-black text-white py-2 px-4 rounded-full hover:bg-white hover:text-black transition duration-300 mr-2"
              >
                Submit
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Homepage;