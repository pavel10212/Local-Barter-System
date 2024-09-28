import Image from "next/image";
import {FaExchangeAlt, FaMapMarkerAlt, FaClock, FaTag} from "react-icons/fa";

const TradeItem = ({trade, onClick, isMyOffer}) => {
    const item = isMyOffer ? trade.barter.item : trade.item;
    const owner = isMyOffer ? trade.barter.barterOwner : trade.barterOwner;
    const status = trade.status;
    const itemSeeking = isMyOffer ? trade.item.name : trade.itemSeeking;

    return (
        <div
            className={`rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition duration-300 transform hover:-translate-y-1 ${
                status === "counter" ? "bg-yellow-600" : status === "accepted" ? "bg-green-600" : "bg-gray-700"
            }`}
            onClick={() => onClick(trade)}
        >
            <div className="relative">
                {isMyOffer ? (
                    <div className="flex h-48">
                        <Image
                            width={500}
                            height={500}
                            src={trade.item.image || "/favicon.ico"}
                            alt={trade.item.name}
                            className="object-cover"
                        />
                        <Image
                            width={500}
                            height={500}
                            src={item.image || "/favicon.ico"}
                            alt={item.name}
                            className="object-cover"
                        />
                    </div>
                ) : (
                    <Image
                        width={200}
                        height={150}
                        src={item.image || "/favicon.ico"}
                        alt={item.name}
                        className="w-full h-48 object-cover"
                    />
                )}
                <div className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded-full text-xs">
                    {status}
                </div>
            </div>
            <div className="p-4">
                <div className="flex items-center mb-2">
                    <Image
                        width={40}
                        height={40}
                        src={owner?.profileImageId || "/favicon.ico"}
                        alt={owner?.firstName}
                        className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="font-medium text-sm">{owner?.firstName} {owner?.lastName}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{isMyOffer ? `${trade.item.name} ⇄ ${item.name}` : item.name}</h3>
                <div className="flex items-center text-gray-300 text-sm mb-2">
                    <FaTag className="mr-2"/>
                    <span>{isMyOffer ? trade.item.description : item.description}</span>
                </div>
                {!isMyOffer && (
                    <div className="flex items-center text-gray-300 text-sm mb-2">
                        <FaExchangeAlt className="mr-2"/>
                        <span className="font-semibold">Seeking: </span>
                        {itemSeeking}
                    </div>
                )}
                <div className="flex items-center text-gray-300 text-sm mb-2">
                    <FaMapMarkerAlt className="mr-2"/>
                    <span className="font-semibold">Address: </span>
                    {owner?.address || "Address not specified"}
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                    <FaClock className="mr-2"/>
                    <span className="font-semibold">Status: </span> {status}
                </div>
            </div>
        </div>
    );
}

export default TradeItem;