import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import Image from "next/image";
import {Trash2, Check, X, ArrowLeftRight} from "lucide-react";

const TradeDialog = ({
                         trade,
                         onClose,
                         handleAccept,
                         handleDeleteOffer,
                         handleDeleteListing,
                         handleDecline,
                         isMyOffer,
                     }) => {
    const renderItem = (item, title, showDeleteButton, offerId) => (
        <Card className="mt-4 bg-gray-800 border-gray-700 shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-100 flex items-center justify-between">
                    {title}
                    <Badge variant="secondary">{item?.status || trade.status}</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="w-full md:w-1/2 rounded-lg overflow-hidden">
                        <Image
                            width={400}
                            height={400}
                            src={item?.image || "/favicon.ico"}
                            alt={item?.name}
                            className="w-full h-auto object-contain"
                        />
                    </div>
                    <div className="flex-1 space-y-4">
                        <h4 className="font-semibold text-lg text-gray-200">{item?.name}</h4>
                        <p className="text-sm text-gray-400">{item?.description}</p>
                        {!isMyOffer && showDeleteButton && (
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white transition-colors"
                                onClick={() => handleDeleteListing(trade.barterId)}
                            >
                                <Trash2 className="w-4 h-4 mr-2"/>
                                Delete listing
                            </Button>
                        )}
                        {isMyOffer && showDeleteButton && (
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white transition-colors"
                                onClick={() => handleDeleteOffer(offerId)}
                            >
                                <Trash2 className="w-4 h-4 mr-2"/>
                                Delete offer
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[700px] bg-gray-900 text-gray-100 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-100 flex items-center">
                        <ArrowLeftRight className="mr-2"/>
                        Trade Details
                    </DialogTitle>
                </DialogHeader>

                {isMyOffer ? (
                    <>
                        {renderItem(trade.barter.item, "Item you want", false)}
                        {renderItem(trade.item, "Item you offer", true, trade.offerId)}
                    </>
                ) : (
                    <>
                        {renderItem(trade.item, "Your item", true)}
                        <Separator className="my-8 bg-gray-700"/>
                        <h2 className="text-xl font-semibold text-gray-200 mb-6">Offers:</h2>
                        {trade.offers.map((offer) => (
                            <Card key={offer.offerId} className="mt-6 bg-gray-800 border-gray-700 shadow-lg">
                                <CardHeader>
                                    <CardTitle
                                        className="text-xl font-semibold text-gray-100 flex items-center justify-between">
                                        Offer from {offer.offerOwner?.firstName}
                                        <Badge variant="secondary">{offer.status}</Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row items-start gap-6">
                                        <div className="w-full md:w-1/2 rounded-lg overflow-hidden">
                                            <Image
                                                width={400}
                                                height={400}
                                                src={offer.item?.image || "/favicon.ico"}
                                                alt={offer.item?.name}
                                                className="w-full h-auto object-contain"
                                            />
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <h3 className="font-semibold text-lg text-gray-200">{offer.item?.name}</h3>
                                            <p className="text-sm text-gray-400">{offer.item?.description}</p>
                                            <div className="flex gap-4">
                                                <Button
                                                    onClick={() => handleAccept(offer.offerId)}
                                                    className="bg-green-600 hover:bg-green-700 text-white flex-1 transition-colors"
                                                >
                                                    <Check className="w-4 h-4 mr-2"/>
                                                    Accept
                                                </Button>
                                                <Button
                                                    onClick={() => handleDecline(offer.offerId)}
                                                    className="bg-red-600 hover:bg-red-700 text-white flex-1 transition-colors"
                                                >
                                                    <X className="w-4 h-4 mr-2"/>
                                                    Decline
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default TradeDialog;