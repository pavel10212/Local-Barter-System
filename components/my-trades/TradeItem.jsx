import Image from "next/image";
import {FaExchangeAlt, FaMapMarkerAlt, FaClock, FaTag} from "react-icons/fa";

const TradeItem = ({trade, onClick}) => (
    <div
        className={`rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition duration-300 transform hover:-translate-y-1 ${
            trade.status === "counter" ? "bg-yellow-600" : trade.status === "accepted" ? "bg-green-600" : "bg-gray-700"
        }`}
        onClick={() => onClick(trade)}
    >
        <div className="relative">
            <Image
                width={200}
                height={150}
                src={trade.itemOffered?.image || "/favicon.ico"}
                alt={trade.itemOffered?.name}
                className="w-full h-48 object-cover"
            />
            <div className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded-full text-xs">
                {trade.status}
            </div>
        </div>
        <div className="p-4">
            <div className="flex items-center mb-2">
                <Image
                    width={40}
                    height={40}
                    src={trade.barterOwner?.profileImageId || "/favicon.ico"}
                    alt={trade.barterOwner?.firstName}
                    className="w-8 h-8 rounded-full mr-2"
                />
                <span className="font-medium text-sm">{trade.barterOwner?.firstName}</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">{trade.itemOffered?.name}</h3>
            <div className="flex items-center text-gray-300 text-sm mb-2">
                <FaTag className="mr-2"/>
                <span>{trade.itemOffered?.description}</span>
            </div>
            <div className="flex items-center text-gray-300 text-sm mb-2">
                <FaExchangeAlt className="mr-2"/>
                <span>Seeking: {trade.itemSeeking}</span>
            </div>
            <div className="flex items-center text-gray-300 text-sm mb-2">
                <FaMapMarkerAlt className="mr-2"/>
                <span>{trade.barterOwner?.address || "Address not specified"}</span>
            </div>
            <div className="flex items-center text-gray-300 text-sm">
                <FaClock className="mr-2"/>
                <span>Status: {trade.status}</span>
            </div>
        </div>
    </div>
);

export default TradeItem;