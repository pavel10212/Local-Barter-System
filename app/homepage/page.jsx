"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { FaExchangeAlt, FaUserCircle, FaPlus, FaTimes } from "react-icons/fa";

const Homepage = () => {
  const [selectedBarter, setSelectedBarter] = useState(null);
  const [isCounterOfferVisible, setIsCounterOfferVisible] = useState(false);
  const [counterOffer, setCounterOffer] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newTrade, setNewTrade] = useState({
    name: "",
    itemSeeking: "",
    description: "",
  });
  const [barters, setBarters] = useState([]);

  useEffect(() => {
    fetchBarters();
  }, []);

  const fetchBarters = async () => {
    try {
      const response = await fetch("/api/barters");
      const data = await response.json();
      setBarters(data.barters);
      return data.barters;
    } catch (error) {
      console.error("Error fetching barters:", error);
      return [];
    }
  };

  const handleBarterClick = (barter) => {
    setSelectedBarter(barter);
    setIsCounterOfferVisible(false);
  };

  const handleClose = () => {
    setSelectedBarter(null);
    setIsCounterOfferVisible(false);
  };

  const handleCounterOfferClick = () => {
    setIsCounterOfferVisible(true);
  };

  const handleCancelCounterOfferClick = () => {
    setIsCounterOfferVisible(false);
    setCounterOffer("");
  };

  const handleCreateClick = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCreateClose = () => {
    setIsCreateDialogOpen(false);
    setNewTrade({ name: "", itemSeeking: "", description: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrade((prevTrade) => ({ ...prevTrade, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/create-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTrade),
      });

      if (response.ok) {
        const createdItem = await response.json();
        const updatedBarters = await fetchBarters();
        setBarters(updatedBarters);
        handleCreateClose();
      } else {
        console.error("Failed to create item");
      }
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
      <header className="bg-gray-800 shadow-lg py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Barter Exchange</h1>
          <p className="text-gray-400 mt-2">
            Trade items and services in your community
          </p>
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
              key={barter.barterId}
              className="bg-gray-700 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
              onClick={() => handleBarterClick(barter)}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <FaUserCircle className="w-10 h-10 text-gray-400 mr-3" />
                  <span className="font-medium">
                    {barter.itemOwner.firstName} {barter.itemOwner.lastName}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {barter?.itemOffered?.name}
                </h3>
                <div className="flex items-center text-gray-400">
                  <FaExchangeAlt className="mr-2" />
                  <span>{barter.itemSeeking}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selectedBarter && (
        <Dialog open={!!selectedBarter} onOpenChange={handleClose}>
          <DialogContent className="bg-gray-800 text-white max-h-[80vh] overflow-y-auto">
            <DialogTitle className="text-2xl font-bold mb-4">
              {selectedBarter.itemOffered.name}
            </DialogTitle>
            <DialogDescription className="text-gray-400 mb-6">
              <div className="flex items-center">
                <FaUserCircle className="mr-2" />

                <span>
                  <Link
                    href={`/homepage/profile/${selectedBarter.itemOwner.userId}`}
                  >
                    {selectedBarter.itemOwner.firstName}{" "}
                    {selectedBarter.itemOwner.lastName}
                  </Link>
                </span>
              </div>
              <div className="mt-2">
                <span className="font-semibold">Seeking:</span>{" "}
                {selectedBarter.itemSeeking}
              </div>
              <div className="mt-4">
                <span className="font-semibold">Description:</span>{" "}
                {selectedBarter.itemOffered.description}
              </div>
              <div className="mt-4">
                <span className="font-semibold">Status:</span>{" "}
                {selectedBarter.status}
              </div>
              <div className="mt-4">
                <span className="font-semibold">Image:</span>
                <div className="mt-2">
                  <img
                    src={
                      selectedBarter.itemOffered.image ||
                      "https://via.placeholder.com/150"
                    }
                    alt="Item Image"
                    className="w-full h-auto rounded-md"
                  />
                </div>
              </div>
            </DialogDescription>
            {isCounterOfferVisible && (
              <div className="relative mb-6">
                <label
                  htmlFor="counterOffer"
                  className="block text-sm font-medium mb-2"
                >
                  Your Counter Offer
                </label>
                <div className="flex items-center">
                  <input
                    id="counterOffer"
                    type="text"
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white pr-10"
                    placeholder="Enter your counter offer"
                    value={counterOffer}
                    onChange={(e) => setCounterOffer(e.target.value)}
                  />
                  <FaTimes
                    className="absolute right-3 text-gray-400 cursor-pointer"
                    onClick={handleCancelCounterOfferClick}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                className="px-6 py-2 rounded bg-yellow-600 hover:bg-yellow-500 transition duration-300"
                onClick={handleCounterOfferClick}
              >
                {isCounterOfferVisible ? "Send Counter Offer" : "Counter Offer"}
              </button>
              <button className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 transition duration-300">
                Accept
              </button>
            </div>
            <div className="mt-4">
              <label
                htmlFor="myItems"
                className="block text-sm font-medium mb-2"
              >
                My Items
              </label>
              <select
                id="myItems"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                placeholder="my items"
              >
                <option value="" disabled selected>
                  my items
                </option>
                {/* Add options dynamically here */}
              </select>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={isCreateDialogOpen} onOpenChange={handleCreateClose}>
        <DialogContent className="bg-gray-800 text-white rounded-lg shadow-xl max-w-md w-full mx-auto">
          <DialogTitle className="text-2xl font-bold mb-6 text-center">
            Create New Trade
          </DialogTitle>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Item Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-white focus:border-transparent transition duration-300"
                value={newTrade.name}
                onChange={handleInputChange}
                required
                placeholder="What are you offering?"
              />
            </div>
            <div>
              <label
                htmlFor="itemSeeking"
                className="block text-sm font-medium mb-2"
              >
                Item Seeking
              </label>
              <input
                id="itemSeeking"
                name="itemSeeking"
                type="text"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-white focus:border-transparent transition duration-300"
                value={newTrade.itemSeeking}
                onChange={handleInputChange}
                required
                placeholder="What are you looking for?"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-white focus:border-transparent transition duration-300 resize-none"
                value={newTrade.description}
                onChange={handleInputChange}
                required
                placeholder="Provide more details about your item..."
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCreateClose}
                className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-black text-white py-2 px-4 rounded-md hover:bg-white hover:text-black transition duration-300"
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
