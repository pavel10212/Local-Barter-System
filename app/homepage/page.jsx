"use client";

import React, { useState, useEffect } from "react";

import BarterCard from "@/components/BarterCard/BarterCard";
import BarterDialog from "@/components/BarterDialog/BarterDialog";
import CreateTradeDialog from "@/components/CreateTradeDialog/CreateTradeDialog";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";

const Homepage = () => {
  const [selectedBarter, setSelectedBarter] = useState(null);
  const [items, setItems] = useState([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newTrade, setNewTrade] = useState({
    itemId: "",
    itemSeeking: "",
    description: "",
  });
  const [barters, setBarters] = useState([]);
  const [offerItem, setOfferItem] = useState(null);

  useEffect(() => {
    fetchBarters();
    fetchYourItems();
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

  const fetchYourItems = async () => {
    try {
      const response = await fetch("/api/items", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleBarterClick = (barter) => {
    setSelectedBarter(barter);
  };

  const handleClose = () => {
    setSelectedBarter(null);
    setOfferItem(null);
  };

  const handleOfferClick = async () => {
    if (offerItem) {
      try {
        const response = await fetch("/api/offers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(offerItem),
        });
        if (response.ok) {
          const newOffer = await response.json();
          setBarters(
            barters.map((barter) => {
              if (barter.barterId === newOffer.barterId) {
                return {
                  ...barter,
                  offers: [...(barter.offers || []), newOffer],
                };
              }
              return barter;
            })
          );
          setOfferItem(null);
          handleClose();
        }
      } catch (error) {
        console.error("Error creating offer:", error);
      }
    }
  };

  const handleCreateClick = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCreateClose = () => {
    setIsCreateDialogOpen(false);
    setNewTrade({
      itemId: "",
      itemSeeking: "",
      description: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrade({
      ...newTrade,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/barters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTrade),
      });
      if (response.ok) {
        const barter = await response.json();
        setBarters([...barters, barter]);
        handleCreateClose();
      } else {
        console.error("Failed to create barter");
      }
    } catch (error) {
      console.error("Error creating barter:", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Available Barters</h2>
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
          offerItem={offerItem}
          setOfferItem={setOfferItem}
          handleClose={handleClose}
          handleOfferClick={handleOfferClick}
          items={items}
        />
      )}
      <CreateTradeDialog
        isCreateDialogOpen={isCreateDialogOpen}
        handleCreateClose={handleCreateClose}
        newTrade={newTrade}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
        items={items}
      />
    </div>
  );
};

export default Homepage;
