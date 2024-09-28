"use client";

import {useState, useEffect} from "react";
import BarterCard from "@/components/BarterCard/BarterCard";
import BarterDialog from "@/components/BarterDialog/BarterDialog";
import CreateTradeDialog from "@/components/CreateTradeDialog/CreateTradeDialog";
import LoadingWrapper from "@/components/LoadingWrapper/LoadingWrapper";
import {useRouter} from "next/navigation";
import { useSession} from "next-auth/react";

const Homepage = () => {
    const [selectedBarter, setSelectedBarter] = useState(null);
    const [items, setItems] = useState([]);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [newTrade, setNewTrade] = useState({
        itemId: "",
        itemSeeking: "",
        description: "",
    });
    const [barters, setBarters] = useState([]);
    const [offerItem, setOfferItem] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        fetchBarters();
        fetchYourItems();
    }, []);

    const fetchBarters = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/barters");
            const data = await response.json();
            setBarters(data);
        } catch (error) {
            console.error("Error fetching barters:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchYourItems = async () => {
        setIsLoading(true);
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
        } finally {
            setIsLoading(false);
        }
    };

    const handleRerouteClick = () => {
        router.push(`homepage/my-items/${session.user.id}`)
    }

    const handleBarterClick = (barter) => {
        setSelectedBarter(barter);
    };

    const handleClose = () => {
        setSelectedBarter(null);
        setOfferItem(null);
    };

    const handleOfferClick = async () => {
        if (offerItem) {
            try {
                const response = await fetch("/api/offers", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(offerItem),
                });
                if (response.ok) {
                    const newOffer = await response.json();
                    setBarters(
                        barters.map((barter) => {
                            if (barter.barterId === newOffer.barterId) {
                                return {
                                    ...barter,
                                    offers: [...(barter.offers || []), newOffer],
                                };
                            }
                            return barter;
                        })
                    );
                    setOfferItem(null);
                    handleClose();
                }
            } catch (error) {
                console.error("Error creating offer:", error);
            }
        }
    };

    if (isLoading) return <LoadingWrapper />

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
            <main className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Available Barters</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {barters.map((barter) => (
                        <BarterCard
                            key={barter.barterId}
                            barter={barter}
                            onClick={handleBarterClick}
                        />
                    ))}
                </div>
            </main>
            {selectedBarter && (
                <BarterDialog
                    selectedBarter={selectedBarter}
                    offerItem={offerItem}
                    setOfferItem={setOfferItem}
                    handleClose={handleClose}
                    handleOfferClick={handleOfferClick}
                    items={items}
                    handleRerouteClick={handleRerouteClick}
                />
            )}
        </div>
    );
};

export default Homepage;