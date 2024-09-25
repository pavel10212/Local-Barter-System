"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FaExchangeAlt,
  FaUserCircle,
  FaPlus,
  FaTimes,
  FaImage,
} from "react-icons/fa";
import Image from "next/image";

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
  const fileInputRef = useRef(null);

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
    setNewTrade({ name: "", itemSeeking: "", description: "", image: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
            <Card
              key={barter.barterId}
              className="bg-gray-700 text-white cursor-pointer hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
              onClick={() => handleBarterClick(barter)}
            >
              <CardHeader>
                <CardTitle>{barter?.itemOffered?.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-gray-600 flex items-center justify-center mb-4">
<<<<<<< HEAD
                  {barter.itemOffered.image ? (
                    <Image
                      src={barter.itemOffered.image}
                      alt={barter?.itemOffered?.name}
                      className="h-full w-full object-cover"
                    />
=======
                  {item.image ? (
                    <Image width={400} height={400}
                     src={item.image} alt={item.name} className="h-full w-full object-cover" />
>>>>>>> 1eef8fd3a5e4676bc06534d7d44a168e2a8f4958
                  ) : (
                    <FaImage className="text-4xl text-gray-400" />
                  )}
                </div>
                <p className="text-gray-400 mb-2">
                  {barter.itemOffered.description}
                </p>
                <p className="text-sm">Seeking: {barter.itemSeeking}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {selectedBarter && (
        <Dialog open={!!selectedBarter} onOpenChange={handleClose}>
          <DialogContent className="bg-gray-800 text-white max-h-[80vh] overflow-y-auto">
            <DialogTitle className="text-2xl font-bold mb-4">
              {selectedBarter.itemOffered.name}
            </DialogTitle>
<<<<<<< HEAD
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
                  <Input
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

=======
            <div className="mb-4">
              {selectedItem.image && (
                <Image width={400} height={400} 
                 src={selectedItem.image} alt={selectedItem.name} className="w-full h-64 object-cover mb-4 rounded" />
              )}
              <p className="text-gray-400">{selectedItem.description}</p>
              <p className="mt-2">Condition: {selectedItem.condition}</p>
            </div>
>>>>>>> 1eef8fd3a5e4676bc06534d7d44a168e2a8f4958
            <div className="flex justify-end space-x-4">
              <Button
                className="px-6 py-2 rounded bg-yellow-600 hover:bg-yellow-500 transition duration-300"
                onClick={handleCounterOfferClick}
              >
                {isCounterOfferVisible ? "Send Counter Offer" : "Counter Offer"}
              </Button>
              <Button className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 transition duration-300">
                Accept
              </Button>
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
              <Input
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
              <Input
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
              <Textarea
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
            <div>
              <label htmlFor="image" className="block text-sm font-medium mb-2">
                Image
              </label>
<<<<<<< HEAD
              <div className="relative">
                <Input
                  id="image"
                  name="image"
                  type="file"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-white focus:border-transparent transition duration-300"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                />
                {newTrade.image && (
                  <div className="relative mt-2">
                    <img
                      src={URL.createObjectURL(newTrade.image)}
                      alt="Selected"
                      className="w-full h-auto rounded-md"
                    />
                    <FaTimes
                      className="absolute top-2 right-2 text-white bg-red-600 rounded-full p-1 cursor-pointer"
                      onClick={handleRemoveImage}
                    />
                  </div>
                )}
              </div>
=======
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <Button
                type="button"
                onClick={() => document.getElementById('image').click()}
                variant="outline"
                className="w-full"
              >
                <FaImage className="mr-2" />
                {previewImage ? "Change Image" : "Upload Image"}
              </Button>
              {previewImage && (
                <div className="mt-4">
                  <Image width={400} height={400}
                   src={previewImage} alt="Preview" className="w-full h-48 object-cover rounded" />
                </div>
              )}
>>>>>>> 1eef8fd3a5e4676bc06534d7d44a168e2a8f4958
            </div>
            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleCreateClose}
                className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-black text-white py-2 px-4 rounded-md hover:bg-white hover:text-black transition duration-300"
              >
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Homepage;
