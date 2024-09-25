"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/header/header";
import BarterCard from "@/components/barterCard/barterCard";
import BarterDialog from "@/components/barterDialog/barterDialog";
import CreateTradeDialog from "@/components/createTradeDialog/createTradeDialog";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";

const Homepage = () => {
  const [selectedBarter, setSelectedBarter] = useState(null);
  const [isCounterOfferVisible, setIsCounterOfferVisible] = useState(false);
  const [counterOffer, setCounterOffer] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newTrade, setNewTrade] = useState({
    name: "",
    itemSeeking: "",
    description: "",
    image: null,
  });
  const [barters, setBarters] = useState([]);

  useEffect(() => {
    fetchBarters();
  }, []);

  const fetchBarters = async () => {
    try {
      const response = await fetch("/api/barters");
      const data = await response.json();
      setBarters(data);
    } catch (error) {
      console.error("Error fetching barters:", error);
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
    setNewTrade({ name: "", itemSeeking: "", description: "", image: null });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrade((prevTrade) => ({ ...prevTrade, [name]: value }));
  };

  const handleImageChange = (e) => {
    setNewTrade((prevTrade) => ({ ...prevTrade, image: e.target.files[0] }));
  };

  const handleRemoveImage = () => {
    setNewTrade((prevTrade) => ({ ...prevTrade, image: null }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newTrade.name);
    formData.append("itemSeeking", newTrade.itemSeeking);
    formData.append("description", newTrade.description);
    if (newTrade.image) {
      formData.append("image", newTrade.image);
    }

    try {
      const response = await fetch("/api/create-item", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        await response.json();
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
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Available Barters</h2>
          <Button
            onClick={handleCreateClick}
            className="bg-black text-white hover:bg-white hover:text-black"
          >
            <FaPlus className="mr-2" />
            Create
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {barters.map((barter) => (
            <BarterCard
              key={barter.barterId}
              barter={barter}
              onClick={handleBarterClick}
            />
          ))}
        </div>
      </main>
      {selectedBarter && (
        <BarterDialog
          selectedBarter={selectedBarter}
          isCounterOfferVisible={isCounterOfferVisible}
          counterOffer={counterOffer}
          setCounterOffer={setCounterOffer}
          handleClose={handleClose}
          handleCounterOfferClick={handleCounterOfferClick}
          handleCancelCounterOfferClick={handleCancelCounterOfferClick}
        />
      )}
      <CreateTradeDialog
        isCreateDialogOpen={isCreateDialogOpen}
        handleCreateClose={handleCreateClose}
        newTrade={newTrade}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        handleRemoveImage={handleRemoveImage}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default Homepage;
