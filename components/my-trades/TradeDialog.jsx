import {Dialog, DialogContent, DialogTitle, DialogDescription} from "@/components/ui/dialog";
import TradeItemDetails from "./TradeItemDetails";

const TradeDialog = ({trade, onClose, onAccept, onDecline, session}) => (
    <Dialog open={!!trade} onOpenChange={onClose}>
        <DialogContent className="bg-gray-800 text-white max-w-3xl">
            <DialogTitle className="text-2xl font-bold mb-4">Trade Details</DialogTitle>
            <DialogDescription className="text-gray-400">
                <div className="grid grid-cols-2 gap-6">
                    <TradeItemDetails
                        title="Original Item"
                        item={trade.itemOffered}
                        owner={trade.barterOwner}
                    />
                    <TradeItemDetails
                        title="Counter Offered Item"
                        item={trade.counterOfferedItem}
                        owner={trade.counterOfferUser}
                        isCounterOffer
                    />
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                    {trade.status === "Counter-offered" && trade.counterOfferedItem && (
                        trade.counterOfferUser?.userId === session?.user?.id ? (
                            <>
                                <button
                                    className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 transition duration-300"
                                    onClick={onAccept}
                                >
                                    Accept
                                </button>
                                <button
                                    className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 transition duration-300"
                                    onClick={onDecline}
                                >
                                    Decline
                                </button>
                            </>
                        ) : (
                            <button
                                className="px-4 py-2 rounded bg-yellow-600 hover:bg-yellow-500 transition duration-300"
                            >
                                Make Counter Offer
                            </button>
                        )
                    )}
                </div>
            </DialogDescription>
        </DialogContent>
    </Dialog>
);

export default TradeDialog;