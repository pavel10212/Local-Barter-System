"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaUserCircle, FaExchangeAlt, FaPlus } from "react-icons/fa";
import Image from "next/image";
import { useSession } from "next-auth/react";

const BarterDialog = ({
  selectedBarter,
  offerItem,
  setOfferItem,
  handleClose,
  handleOfferClick,
  items,
}) => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <Dialog open={!!selectedBarter} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-900 text-white max-w-md mx-auto rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {selectedBarter.item.name}
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
              {selectedBarter.description}
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
              src={selectedBarter.item.image || "/favicon.ico"}
              alt="Item Image"
              className="w-full h-auto rounded-md object-cover"
            />
          </div>
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="offerItem" className="block text-sm font-medium">
                Your Item to Offer
              </label>
              <div className="flex items-center">
                <span className="text-sm text-gray-400 mr-2">
                  Don't have one?
                </span>
                <Button
                  className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-500 transition duration-300 flex items-center"
                  onClick={() =>
                    router.push(`/homepage/my-items/${session.user.id}`)
                  }
                >
                  <FaPlus className="mr-1" />
                  Add
                </Button>
              </div>
            </div>
            <div className="flex items-center">
              <select
                id="item"
                name="item"
                value={offerItem?.itemId || ""}
                onChange={(e) =>
                  setOfferItem({
                    itemId: e.target.value,
                    barterId: selectedBarter.barterId,
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
              Make Offer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BarterDialog;
