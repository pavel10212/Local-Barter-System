"use client";

import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import TradeDialog from "@/components/my-trades/TradeDialog";
import TradeItem from "@/components/my-trades/TradeItem";
import IncomingTradeItem from "@/components/my-trades/IncomingTradeItem";

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

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left side: Public Listings */}
                    <div className="w-full md:w-1/2 bg-gray-800 rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold mb-2 text-blue-400">
                            Public Listings
                        </h2>
                        <p className="text-gray-400 mb-4 pb-2 border-b border-gray-700">
                            Items you offered and got offered an item in return
                        </p>
                        <div className="space-y-4 mt-4">
                            {incomingBarters.map((trade) => (
                                <IncomingTradeItem
                                    key={trade.barterId}
                                    trade={trade}
                                    onClick={handleTradeClick}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right side: My Offers */}
                    <div className="w-full md:w-1/2 bg-gray-800 rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold mb-2 text-green-400">
                            My Offers
                        </h2>
                        <p className="text-gray-400 mb-4 pb-2 border-b border-gray-700">
                            Items you want and offered an item in exchange
                        </p>
                        <div className="space-y-4 mt-4">
                            {outgoingBarters.map((trade) => (
                                <TradeItem
                                    key={trade.barterId}
                                    trade={trade}
                                    onClick={handleTradeClick}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {selectedTrade && (
                <TradeDialog
                    trade={selectedTrade}
                    onClose={handleClose}
                    session={session}
                />
            )}
        </div>
    );
};

export default MyTrades;