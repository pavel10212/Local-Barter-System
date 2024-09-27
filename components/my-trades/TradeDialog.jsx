import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const TradeDialog = ({
  trade,
  onClose,
  session,
  handleAccept,
  handleDecline,
}) => {
  const isIncomingTrade = trade.barterOwner.userId === session.user.id;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Trade Details</DialogTitle>
        </DialogHeader>
        <div className="mt-2">
          <p className="text-sm text-gray-300">
            {isIncomingTrade ? "Your item:" : "Item you want:"}
          </p>
          <div className="flex items-center mt-2">
            <Image
              width={150}
              height={300}
              src={trade.item?.image || "/favicon.ico"}
              alt={trade.item?.name}
              className="w-15 h-15 object-cover rounded-md mr-4"
            />
            <div>
              <p className="font-semibold">{trade.item?.name}</p>
              <p className="text-sm text-gray-400">{trade.item?.description}</p>
            </div>
          </div>
        </div>

        {isIncomingTrade && (
          <div className="mt-4">
            <p className="text-sm text-gray-300">Offers:</p>
            {trade.offers.map((offer) => (
              <div
                key={offer.offerId}
                className="mt-2 border-t border-gray-700 pt-2"
              >
                <div className="flex items-center">
                  <Image
                    width={60}
                    height={60}
                    src={offer.item?.image || "/favicon.ico"}
                    alt={offer.item?.name}
                    className="w-15 h-15 object-cover rounded-md mr-4"
                  />
                  <div>
                    <p className="font-semibold">{offer.item?.name}</p>
                    <p className="text-sm text-gray-400">
                      {offer.item?.description}
                    </p>
                    <p className="text-sm text-gray-400">
                      Status: {offer.status}
                    </p>

                    <div className="mt-2">
                      <Button
                        onClick={() => handleAccept(offer.offerId)}
                        className="bg-green-500 hover:bg-green-600 text-white mr-2"
                      >
                        Accept
                      </Button>
                      <Button
                        onClick={() => handleDecline(offer.offerId)}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        Decline
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TradeDialog;
