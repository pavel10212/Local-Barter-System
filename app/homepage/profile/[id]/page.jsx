"use client";

import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import Image from "next/image";
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {UserCircle, Image as ImageIcon, ArrowLeftRight, List, Calendar, BarChart2, Tag, MapPin} from "lucide-react";
import LoadingWrapper from "@/components/LoadingWrapper/LoadingWrapper";

const MyProfile = () => {
    const [user, setUser] = useState(null);
    const [items, setItems] = useState([]);
    const [openBarters, setOpenBarters] = useState([]);
    const [closedBarters, setClosedBarters] = useState([]);
    const pathName = usePathname();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const id = pathName.split("/").pop();
        findUserById(id);
        fetchUserItems(id);
        fetchOpenBarters(id);
        fetchClosedBarters(id);
    }, [pathName]);

    const findUserById = async (id) => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/findUserById", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({id}),
            });
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error("Error fetching user:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUserItems = async (userId) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/findItemsById?userId=${userId}`);
            if (!response.ok) throw new Error("Failed to fetch items");
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error("Error fetching items:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchOpenBarters = async (userId) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/incoming-bartersById?userId=${userId}`);
            if (!response.ok) throw new Error("Failed to fetch open barters");
            const data = await response.json();
            setOpenBarters(data);
        } catch (error) {
            console.error("Error fetching open barters:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchClosedBarters = async (userId) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/closed-bartersById?userId=${userId}`);
            if (!response.ok) throw new Error("Failed to fetch closed barters");
            const data = await response.json();
            setClosedBarters(data);
        } catch (error) {
            console.error("Error fetching closed barters:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <LoadingWrapper/>

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
            <main className="container mx-auto px-4 py-12 max-w-6xl">
                <Card className="bg-gray-800 border-gray-700 shadow-xl mb-8">
                    <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8">
                        <div className="flex items-center">
                            <div
                                className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center mr-6">
                                <Image
                                    width={96}
                                    height={96}
                                    src={user?.profilePictureUrl || "/favicon.ico"}
                                    alt={user?.firstName || "Profile picture"}
                                    className="w-full h-full object-cover"
                                    unoptimized
                                />
                            </div>
                            <div>
                                <CardTitle className="text-3xl font-bold mb-2 text-white">
                                    {user?.firstName} {user?.lastName}
                                </CardTitle>
                                <CardDescription className="text-gray-200 text-lg">
                                    {user?.email}
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="flex items-center text-gray-300 mb-2">
                            <Calendar className="w-4 h-4 mr-2"/>
                            <span>Member since: {user?.joinDate || "January 2023"}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                            <BarChart2 className="w-4 h-4 mr-2"/>
                            <span>Total trades: {closedBarters.length}</span>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <Card className="bg-gray-800 border-gray-700 shadow-xl col-span-2">
                        <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 p-6">
                            <CardTitle className="text-2xl font-semibold flex items-center text-white">
                                <ImageIcon className="mr-2"/> User&apos;s Items
                            </CardTitle>
                            <CardDescription className="text-gray-200">
                                Items you have listed
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {items.map((item) => (
                                    <Card
                                        key={item.itemId}
                                        className="bg-gray-800 border-gray-700 hover:border-white transition-all duration-300"
                                    >
                                        <CardHeader className="p-4">
                                            <CardTitle className="text-lg text-white">{item.name}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-4">
                                            <div
                                                className="h-40 bg-gray-600 flex items-center justify-center mb-4 rounded-md overflow-hidden">
                                                    <Image
                                                        width={400}
                                                        height={400}
                                                        src={item.image || "/favicon.ico"}
                                                        alt={item.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                            </div>
                                            <div className="flex items-center text-gray-300 text-sm">
                                                <Tag className="w-4 h-4 mr-2"/>
                                                <span>{item.description}</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-800 border-gray-700 shadow-xl">
                        <CardHeader className="bg-gradient-to-r from-yellow-600 to-orange-600 p-6">
                            <CardTitle className="text-2xl font-semibold flex items-center text-white">
                                <ArrowLeftRight className="mr-2"/> Trade History
                            </CardTitle>
                            <CardDescription className="text-gray-200">
                                Your recent completed trades
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                {closedBarters.length > 0 ? (
                                    closedBarters.map((barter) => (
                                        <Card key={barter.barterId} className="bg-gray-700 border-gray-600">
                                            <CardHeader className="p-4">
                                                <CardTitle
                                                    className="text-lg font-semibold text-white">{barter.item.name}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-4">
                                                <div
                                                    className="text-gray-300 mb-1">Offered: {barter.item.description}</div>
                                                <div className="text-gray-300 mb-1">Sought: {barter.itemSeeking}</div>
                                                <div className="text-gray-300 mb-2">Offers
                                                    received: {barter.offers.length}</div>
                                                <Badge variant="secondary">Closed</Badge>
                                            </CardContent>
                                        </Card>
                                    ))
                                ) : (
                                    <p className="text-gray-400">No completed trades found.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="bg-gray-800 border-gray-700 shadow-xl mb-8">
                    <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                        <CardTitle className="text-2xl font-semibold flex items-center text-white">
                            <List className="mr-2"/> User&apos;s Open Listings
                        </CardTitle>
                        <CardDescription className="text-gray-200">
                            User&apos;s active barter listings
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        {openBarters.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {openBarters.map((barter) => (
                                    <Card
                                        key={barter.barterId}
                                        className="bg-gray-800 border-gray-700 hover:border-white transition-all duration-300"
                                    >
                                        <CardHeader className="p-4">
                                            <CardTitle className="text-lg text-white">{barter.item.name}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-4">
                                            <div
                                                className="h-40 bg-gray-600 flex items-center justify-center mb-4 rounded-md overflow-hidden">
                                                {barter.item.image ? (
                                                    <Image
                                                        width={400}
                                                        height={400}
                                                        src={barter.item.image}
                                                        alt={barter.item.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <ImageIcon className="w-12 h-12 text-gray-400"/>
                                                )}
                                            </div>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex items-center text-gray-300">
                                                    <Tag className="w-4 h-4 mr-2"/>
                                                    <span>{barter.item.description}</span>
                                                </div>
                                                <div className="flex items-center text-gray-300">
                                                    <ArrowLeftRight className="w-4 h-4 mr-2"/>
                                                    <span>Seeking: {barter.itemSeeking}</span>
                                                </div>
                                                <div className="flex items-center text-gray-300">
                                                    <MapPin className="w-4 h-4 mr-2"/>
                                                    <span>Description: {barter.description}</span>
                                                </div>
                                                <Badge variant="secondary">Offers: {barter.offers.length}</Badge>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400">No open listings found.</p>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default MyProfile;