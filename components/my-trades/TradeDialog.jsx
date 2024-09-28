import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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

  const renderItem = (item, title) => (
    <div className="mt-4">
      <p className="text-lg text-gray-300">{title}</p>
      <div className="flex flex-col md:flex-row items-center mt-4">
        <Image
          width={300}
          height={300}
          src={item?.image || "/favicon.ico"}
          alt={item?.name}
          className="object-cover rounded-md mr-6 mb-4 md:mb-0"
        />
        <div>
          <p className="font-semibold text-xl">{item?.name}</p>
          <p className="text-base text-gray-400">{item?.description}</p>
        </div>
      </div>
    </div>
  );

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] bg-gray-800 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Trade Details</DialogTitle>
        </DialogHeader>

        {isIncomingTrade ? (
          renderItem(trade.item, "Your item:")
        ) : (
          <>
            {renderItem(trade.item, "Item you want:")}
            {renderItem(trade.offers[0]?.item, "Item you offered:")}
          </>
        )}

        {isIncomingTrade && (
          <div className="mt-8">
            <p className="text-lg text-gray-300">Offers:</p>
            {trade.offers.map((offer) => (
              <div
                key={offer.offerId}
                className="mt-6 border-t border-gray-700 pt-4"
              >
                <div className="flex flex-col md:flex-row items-center">
                  <Image
                    width={300}
                    height={300}
                    src={offer.item?.image || "/favicon.ico"}
                    alt={offer.item?.name}
                    className="object-cover rounded-md mr-6 mb-4 md:mb-0"
                  />
                  <div>
                    <p className="font-semibold text-xl">{offer.item?.name}</p>
                    <p className="text-base text-gray-400">
                      {offer.item?.description}
                    </p>
                    <p className="text-base text-gray-400 mt-2">
                      Status: {offer.status}
                    </p>

                    <div className="mt-4">
                      <Button
                        onClick={() => handleAccept(offer.offerId)}
                        className="bg-green-500 hover:bg-green-600 text-white mr-4 px-6 py-2 text-lg"
                      >
                        Accept
                      </Button>
                      <Button
                        onClick={() => handleDecline(offer.offerId)}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 text-lg"
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
      </DialogContent>
    </Dialog>
  );
};

export default TradeDialog;
