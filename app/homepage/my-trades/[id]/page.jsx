"use client";

import {useEffect, useState} from "react";
import {Dialog, DialogContent, DialogTitle, DialogDescription} from "@/components/ui/dialog";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
import {FaExchangeAlt, FaMapMarkerAlt, FaClock, FaTag} from "react-icons/fa";
import Image from "next/image";
import {useSession} from "next-auth/react";

const MyTrades = () => {
    const [selectedTrade, setSelectedTrade] = useState(null);
    const [incomingBarters, setIncomingBarters] = useState([]);
    const [outgoingBarters, setOutgoingBarters] = useState([]);
    const {data: session} = useSession();

    useEffect(() => {
        fetchOutgoingBarters();
        fetchIncomingBarters();
    }, []);

    const fetchIncomingBarters = async () => {
        try {
            const response = await fetch("/api/incoming-barters");
            const data = await response.json();
            setIncomingBarters(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchOutgoingBarters = async () => {
        try {
            const response = await fetch("/api/outgoing-barters");
            const data = await response.json();
            setOutgoingBarters(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleTradeClick = (trade) => setSelectedTrade(trade);
    const handleClose = () => setSelectedTrade(null);

    const handleAcceptCounterOffer = () => {
        alert("Counter offer accepted!");
        handleClose();
    };

    const handleDeclineCounterOffer = () => {
        alert("Counter offer declined!");
        handleClose();
    };

    const TradeItem = ({trade}) => (
        <div
            className={`rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition duration-300 transform hover:-translate-y-1 ${
                trade.status === "counter" ? "bg-yellow-600" : trade.status === "accepted" ? "bg-green-600" : "bg-gray-700"
            }`}
            onClick={() => handleTradeClick(trade)}
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

    const TradeDialog = ({trade, onClose}) => (
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
                                        onClick={handleAcceptCounterOffer}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 transition duration-300"
                                        onClick={handleDeclineCounterOffer}
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

    const TradeItemDetails = ({title, item, owner, isCounterOffer = false}) => (
        <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">{title}</h3>
            <Image
                width={200}
                height={200}
                src={item?.image || "/favicon.ico"}
                alt={item?.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="space-y-2">
                <p><span className="font-semibold">Item:</span> {item?.name}</p>
                <p><span className="font-semibold">Description:</span> {item?.description}</p>
                <p>
                    <span className="font-semibold">{isCounterOffer ? "Offered by" : "Owner"}:</span>
                    {owner?.firstName} {owner?.lastName}
                    {owner?.userId === session?.user?.id && " (You)"}
                </p>
            </div>
        </div>
    );

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
            <header className="bg-gray-800 shadow-lg py-6">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold">My Trades</h1>
                    <p className="text-gray-400 mt-2">Manage your trades and offers</p>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <Tabs defaultValue="publicListings">
                    <TabsList className="mb-6">
                        <TabsTrigger value="publicListings">Public Listings</TabsTrigger>
                        <TabsTrigger value="myOffers">My Offers</TabsTrigger>
                    </TabsList>

                    <TabsContent value="publicListings">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {incomingBarters.map((trade) => (
                                <TradeItem key={trade.barterId} trade={trade}/>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="myOffers">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {outgoingBarters.map((trade) => (
                                <TradeItem key={trade.barterId} trade={trade}/>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </main>

            {selectedTrade && <TradeDialog trade={selectedTrade} onClose={handleClose}/>}
        </div>
    );
};

export default MyTrades;