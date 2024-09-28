import Image from "next/image";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {ArrowLeftRight, MapPin, Clock, Tag} from "lucide-react";

const TradeItem = ({trade, onClick, isMyOffer}) => {
    const item = isMyOffer ? trade?.barter?.item : trade?.item;
    const owner = isMyOffer ? trade?.barter?.barterOwner : trade?.barterOwner;
    const status = trade.status;
    const itemSeeking = isMyOffer ? trade?.item?.name : trade?.itemSeeking;

    return (
        <Card
            className="bg-gray-800 border-gray-700 hover:border-white transition-all duration-300 cursor-pointer"
            onClick={() => onClick(trade)}
        >
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex items-center justify-between">
                    {isMyOffer ? `${trade?.item?.name} ⇄ ${item?.name}` : item?.name}
                    <Badge variant="secondary" className="ml-2">
                        {status}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-48 bg-gray-700 rounded-md flex items-center justify-center mb-4 overflow-hidden">
                    {isMyOffer ? (
                        <div className="flex w-full h-full">
                            <Image
                                width={500}
                                height={500}
                                src={trade.item.image || "/favicon.ico"}
                                alt={trade.item.name}
                                className="w-1/2 h-full object-cover"
                            />
                            <Image
                                width={500}
                                height={500}
                                src={item?.image || "/favicon.ico"}
                                alt={item?.name}
                                className="w-1/2 h-full object-cover"
                            />
                        </div>
                    ) : (
                        <Image
                            width={500}
                            height={500}
                            src={item?.image || "/favicon.ico"}
                            alt={item?.name}
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>
                <div className="space-y-2">
                    <div className="flex items-center text-gray-400 text-sm">
                        <Image
                            width={24}
                            height={24}
                            src={owner?.profilePictureUrl || "/favicon.ico"}
                            alt={owner?.firstName}
                            className="w-6 h-6 rounded-full mr-2"
                        />
                        <span>{owner?.firstName} {owner?.lastName}</span>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                        <Tag className="w-4 h-4 mr-2"/>
                        <span>{isMyOffer ? trade.item.description : item.description}</span>
                    </div>
                    {!isMyOffer && (
                        <div className="flex items-center text-gray-400 text-sm">
                            <ArrowLeftRight className="w-4 h-4 mr-2"/>
                            <span className="font-semibold">Seeking: </span>
                            <span className="ml-1">{itemSeeking}</span>
                        </div>
                    )}
                    <div className="flex items-center text-gray-400 text-sm">
                        <MapPin className="w-4 h-4 mr-2"/>
                        <span className="font-semibold">Address: </span>
                        <span className="ml-1">{owner?.address || "Not specified"}</span>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                        <Clock className="w-4 h-4 mr-2"/>
                        <span className="font-semibold">Status: </span>
                        <span className="ml-1">{status}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default TradeItem;