import React from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaUserCircle, FaExchangeAlt } from "react-icons/fa";
import Image from "next/image";

const BarterDialog = ({
  selectedBarter,
  counterOfferItem,
  setCounterOfferItem,
  handleClose,
  handleOfferClick,
  items,
}) => (
  <Dialog open={!!selectedBarter} onOpenChange={handleClose}>
    <DialogContent className="bg-gray-900 text-white max-w-md mx-auto rounded-lg shadow-xl">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-center">
          {selectedBarter.itemOffered.name}
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <div className="flex items-center space-x-3 text-gray-300">
          <FaUserCircle className="text-xl" />
          <Link
            href={`/homepage/profile/${selectedBarter.barterOwner.userId}`}
            className="hover:text-blue-400 transition"
          >
            {selectedBarter.barterOwner.firstName}{" "}
            {selectedBarter.barterOwner.lastName}
          </Link>
        </div>
        <div className="bg-gray-800 p-4 rounded-md">
          <h3 className="font-semibold mb-2">Item Details</h3>
          <p>
            <span className="text-gray-400">Seeking:</span>{" "}
            {selectedBarter.itemSeeking}
          </p>
          <p>
            <span className="text-gray-400">Description:</span>{" "}
            {selectedBarter.itemOffered.description}
          </p>
          <p>
            <span className="text-gray-400">Status:</span>
            <span
              className={`ml-2 px-2 py-1 rounded text-xs ${
                selectedBarter.status === "OPEN"
                  ? "bg-green-600"
                  : "bg-yellow-600"
              }`}
            >
              {selectedBarter.status}
            </span>
          </p>
        </div>
        <div className="mt-4">
          <Image
            width={300}
            height={300}
            src={selectedBarter.itemOffered.image || "/favicon.ico"}
            alt="Item Image"
            className="w-full h-auto rounded-md object-cover"
          />
        </div>
        <div className="relative">
          <label
            htmlFor="counterOffer"
            className="block text-sm font-medium mb-2"
          >
            Your Item to Offer
          </label>
          <div className="flex items-center">
            <select
              id="item"
              name="item"
              value={counterOfferItem?.item}
              onChange={(e) =>
                setCounterOfferItem({
                  item: e.target.value,
                  barter: selectedBarter.barterId,
                })
              }
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              required
            >
              <option value="">Select an item to offer</option>
              {items.map((item) => (
                <option key={item.itemId} value={item.itemId}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            className="px-6 py-2 rounded bg-yellow-600 hover:bg-yellow-500 transition duration-300 flex items-center"
            onClick={handleOfferClick}
          >
            <FaExchangeAlt className="mr-2" />
            Offer Item
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

export default BarterDialog;
