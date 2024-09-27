import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import TradeItemDetails from "./TradeItemDetails";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const TradeDialog = ({
  trade,
  onClose,
  handleAccept,
  handleDecline,
  isMyOffer,
}) => {
  const [localTrade, setLocalTrade] = useState(trade);

  return (
    <Dialog open={!!localTrade} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 text-white max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogTitle className="text-2xl font-bold mb-4">
          Trade Details
        </DialogTitle>
        <DialogDescription className="text-gray-400 overflow-y-auto flex-grow">
          {isMyOffer ? (
            // Content for "My Offers" (right side)
            <div className="space-y-6">
              <TradeItemDetails
                title="Your Offered Item"
                item={localTrade.item}
                owner={localTrade.barterOwner}
              />
              <div>
                <h3 className="text-xl font-semibold mb-4">Item You Want</h3>
                <p>{localTrade.itemSeeking}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Description</h3>
                <p>{localTrade.description}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Barter Status</h3>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    localTrade.status === "ACCEPTED"
                      ? "bg-green-600"
                      : localTrade.status === "DECLINED"
                      ? "bg-red-600"
                      : "bg-yellow-600"
                  }`}
                >
                  {localTrade.status}
                </span>
              </div>
            </div>
          ) : (
            // Content for "Public Listings" (left side)
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <TradeItemDetails
                  title="Original Item"
                  item={localTrade.item}
                  owner={localTrade.barterOwner}
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Barter Status</h3>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    localTrade.status === "ACCEPTED"
                      ? "bg-green-600"
                      : localTrade.status === "DECLINED"
                      ? "bg-red-600"
                      : "bg-yellow-600"
                  }`}
                >
                  {localTrade.status}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Offers Received</h3>
                {localTrade.offers && localTrade.offers.length > 0 ? (
                  localTrade.offers.map((offer) => (
                    <div
                      key={offer.offerId}
                      className="bg-gray-700 p-4 rounded-lg mb-4"
                    >
                      <TradeItemDetails
                        title="Offered Item"
                        item={offer.item}
                        owner={offer.offerUser}
                        isCounterOffer
                      />
                      <div className="mt-4 flex justify-end space-x-4">
                        <Button
                          onClick={() => handleAccept(offer.offerId)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Accept
                        </Button>
                        <Button
                          onClick={() => handleDecline(offer.offerId)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Decline
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No offers received yet.</p>
                )}
              </div>
            </div>
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default TradeDialog;
