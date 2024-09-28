"use client";

import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import TradeDialog from "@/components/my-trades/TradeDialog";
import TradeItem from "@/components/my-trades/TradeItem";
import CreateTradeDialog from "@/components/CreateTradeDialog/CreateTradeDialog";
import {Button} from "@/components/ui/button";
import {FaPlus} from "react-icons/fa";

const MyTrades = () => {
    const [selectedTrade, setSelectedTrade] = useState(null);
    const [incomingBarters, setIncomingBarters] = useState([]);
    const [myOffers, setMyOffers] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [items, setItems] = useState([]);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [newTrade, setNewTrade] = useState({
        itemId: "",
        itemSeeking: "",
        description: "",
    });
    const {data: session} = useSession();

    useEffect(() => {
        fetchOutgoingBarters();
        fetchIncomingBarters();
        fetchYourItems();
    }, []);

    const fetchOutgoingBarters = async () => {
        try {
            const response = await fetch("/api/my-offers");
            const data = await response.json();
            setMyOffers(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchIncomingBarters = async () => {
        try {
            const response = await fetch("/api/incoming-barters");
            const data = await response.json();
            setIncomingBarters(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchYourItems = async () => {
        try {
            const response = await fetch("/api/items", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    const handleTradeClick = (trade, isMyOffer) => {
        setSelectedTrade({...trade, isMyOffer});
    };

    const handleClose = () => setSelectedTrade(null);

    const handleCreateClick = () => {
        setIsCreateDialogOpen(true);
    };

    const handleCreateClose = () => {
        setIsCreateDialogOpen(false);
        setNewTrade({
            itemId: "",
            itemSeeking: "",
            description: "",
        });
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewTrade({
            ...newTrade,
            [name]: value,
        });
    };

    const handleBarterAction = async (offerId, action) => {
        try {
            const response = await fetch(
                `/api/manage-barter?offerId=${offerId}&action=${action}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                await fetchOutgoingBarters();
                await fetchIncomingBarters();
            } else {
                const errorData = await response.json();
                console.error(`Failed to ${action} barter:`, errorData.error);
            }
        } catch (error) {
            console.error(`Error ${action}ing barter:`, error);
        }
    };

    const handleAccept = (offerId) => handleBarterAction(offerId, "accept");
    const handleDecline = (offerId) => handleBarterAction(offerId, "decline");

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsCreating(true);
        try {
            const response = await fetch("/api/create-barter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTrade),
            });
            if (response.ok) {
                const barter = await response.json();
                setMyOffers((prevBarters) => [barter, ...prevBarters]);
                handleCreateClose();
                await fetchOutgoingBarters();
            } else {
                console.error("Failed to create barter");
            }
        } catch (error) {
            console.error("Error creating barter:", error);
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left side: Public Listings */}
                    <div className="w-full md:w-1/2 bg-gray-800 rounded-lg shadow-lg p-6">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-2xl font-bold text-blue-400">
                                Public Listings
                            </h2>
                            <Button
                                onClick={handleCreateClick}
                                className="bg-black text-white hover:bg-white hover:text-black"
                            >
                                <FaPlus className="mr-2"/>
                                Create
                            </Button>
                        </div>
                        <p className="text-gray-400 mb-4 pb-2 border-b border-gray-700">
                            Items you offered and got offered an item in return
                        </p>
                        <div className="space-y-4 mt-4">
                            {incomingBarters.map((trade) => (
                                <TradeItem
                                    key={trade.barterId}
                                    trade={trade}
                                    onClick={(trade) => handleTradeClick(trade, false)}
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
                            Items you offered for other people&apos;s items
                        </p>
                        <div className="space-y-4 mt-4">
                            {myOffers.map((offer) => (
                                <TradeItem
                                    key={offer.offerId}
                                    trade={offer}
                                    onClick={(trade) => handleTradeClick(trade, true)}
                                    isMyOffer={true}
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
                    handleAccept={handleAccept}
                    handleDecline={handleDecline}
                    isMyOffer={selectedTrade.isMyOffer}
                />
            )}

            <CreateTradeDialog
                isCreateDialogOpen={isCreateDialogOpen}
                handleCreateClose={handleCreateClose}
                newTrade={newTrade}
                handleInputChange={handleInputChange}
                handleFormSubmit={handleFormSubmit}
                items={items}
                isCreating={isCreating}
            />
        </div>
    );
};

export default MyTrades;
