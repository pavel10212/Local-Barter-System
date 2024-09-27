"use client";

import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
import TradeDialog from "@/components/my-trades/TradeDialog";
import TradeItem from "@/components/my-trades/TradeItem";

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
                                <TradeItem key={trade.barterId} trade={trade} onClick={handleTradeClick}/>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="myOffers">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {outgoingBarters.map((trade) => (
                                <TradeItem key={trade.barterId} trade={trade} onClick={handleTradeClick}/>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </main>

            {selectedTrade && (
                <TradeDialog
                    trade={selectedTrade}
                    onClose={handleClose}
                    onAccept={handleAcceptCounterOffer}
                    onDecline={handleDeclineCounterOffer}
                    session={session}
                />
            )}
        </div>
    );
};

export default MyTrades;