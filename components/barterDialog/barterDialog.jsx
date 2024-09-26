import React from "react";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {FaUserCircle, FaTimes, FaImage} from "react-icons/fa";
import Image from "next/image";

const BarterDialog = ({
                          selectedBarter,
                          isCounterOfferVisible,
                          counterOffer,
                          setCounterOffer,
                          handleClose,
                          handleCounterOfferClick,
                          handleCancelCounterOfferClick,
                      }) => (
    <Dialog open={!!selectedBarter} onOpenChange={handleClose}>
        <DialogContent className="bg-gray-800 text-white max-h-[80vh] overflow-y-auto">
            <DialogTitle className="text-2xl font-bold mb-4">
                {selectedBarter.itemOffered.name}
            </DialogTitle>
            <DialogDescription className="text-gray-400 mb-6">
                <div className="flex items-center">
                    <FaUserCircle className="mr-2"/>
                    <span>
            <Link href={`/homepage/profile/${selectedBarter.itemOwner.userId}`}>
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
                    <span className="font-semibold">Status:</span> {selectedBarter.status}
                </div>
                <div className="mt-4">
                    <span className="font-semibold">Image:</span>
                    <div className="mt-2">
                        <Image
                            width={150}
                            height={150}
                            src={selectedBarter.itemOffered.image || "/favicon.ico"}
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
        </DialogContent>
    </Dialog>
);

export default BarterDialog;
