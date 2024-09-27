"use client";

import React, {useState, useEffect} from "react";
import Header from "@/components/header/header";
import BarterCard from "@/components/barterCard/barterCard";
import BarterDialog from "@/components/barterDialog/barterDialog";
import CreateTradeDialog from "@/components/createTradeDialog/createTradeDialog";
import {Button} from "@/components/ui/button";
import {FaPlus} from "react-icons/fa";

const Homepage = () => {
    const [selectedBarter, setSelectedBarter] = useState(null);
    const [items, setItems] = useState([]);
    const [isCounterOfferVisible, setIsCounterOfferVisible] = useState(false);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [newTrade, setNewTrade] = useState({
        itemId: "",
        itemName: "",
        itemSeeking: "",
        description: "",
    });
    const [barters, setBarters] = useState([]);
    const [counterOfferItem, setCounterOfferItem] = useState(null);

    useEffect(() => {
        fetchBarters();
        fetchYourItems()
    }, []);


    const fetchBarters = async () => {
        try {
            const response = await fetch("/api/barters");
            const data = await response.json();
            setBarters(data);
        } catch (error) {
            console.error("Error fetching barters:", error);
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

    const handleBarterClick = (barter) => {
        setSelectedBarter(barter);
        setIsCounterOfferVisible(false);
    };

    const handleClose = () => {
        setSelectedBarter(null);
        setIsCounterOfferVisible(false);
    };

    const handleAcceptClick = async () => {
        const response = await fetch("api/accept-offer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedBarter)
        });
        if (response.ok) {
            const updatedBarter = await response.json();
            setBarters(barters.map(barter => {
                if (barter.barterId === updatedBarter.barterId) {
                    return updatedBarter;
                }
                return barter;
            }));
            setSelectedBarter(null);
        }
    }

    const handleCounterOfferClick = async () => {
        setIsCounterOfferVisible(true);
        if (isCounterOfferVisible) {
            const response = await fetch("api/counter-offer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(counterOfferItem)
            })
            if (response.ok) {
                const updatedBarter = await response.json();
                setBarters(barters.map(barter => {
                    if (barter.barterId === updatedBarter.barterId) {
                        return updatedBarter;
                    }
                    return barter;
                }));
                setIsCounterOfferVisible(false);
                setCounterOfferItem(null);
            }
        }
    };

    const handleCancelCounterOfferClick = () => {
        setIsCounterOfferVisible(false);
        setCounterOfferItem(null);
    };

    const handleCreateClick = () => {
        setIsCreateDialogOpen(true);
    };

    const handleCreateClose = () => {
        setIsCreateDialogOpen(false);
        setNewTrade({
            itemId: "",
            itemName: "",
            itemSeeking: "",
            description: "",
        });
    };


    const handleInputChange = (e, items) => {
        const {name, value} = e.target;
        if (name === "item") {
            const selectedItem = items.find(item => item.itemId === value);
            setNewTrade({
                ...newTrade,
                itemId: value,
                itemName: selectedItem ? selectedItem.name : "",
            });
        } else {
            setNewTrade({
                ...newTrade,
                [name]: value,
            });
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
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
                setBarters([...barters, barter])
                handleCreateClose();
            } else {
                console.error("Failed to create item");
            }
        } catch (error) {
            console.error("Error creating item:", error);
        }
    };

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
            <Header/>
            <main className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Available Barters</h2>
                    <Button
                        onClick={handleCreateClick}
                        className="bg-black text-white hover:bg-white hover:text-black"
                    >
                        <FaPlus className="mr-2"/>
                        Create
                    </Button>
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
                    isCounterOfferVisible={isCounterOfferVisible}
                    counterOfferItem={counterOfferItem}
                    setCounterOfferItem={setCounterOfferItem}
                    handleAcceptClick={handleAcceptClick}
                    handleClose={handleClose}
                    handleCounterOfferClick={handleCounterOfferClick}
                    handleCancelCounterOfferClick={handleCancelCounterOfferClick}
                    items={items}
                />
            )}
            <CreateTradeDialog
                isCreateDialogOpen={isCreateDialogOpen}
                handleCreateClose={handleCreateClose}
                newTrade={newTrade}
                handleInputChange={handleInputChange}
                handleFormSubmit={handleFormSubmit}
                items={items}
            />
        </div>
    );
};

export default Homepage;
