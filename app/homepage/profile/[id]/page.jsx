"use client";

import { useEffect, useState } from "react";
import { FaUserCircle, FaImage, FaExchangeAlt, FaList } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [openBarters, setOpenBarters] = useState([]);
  const [closedBarters, setClosedBarters] = useState([]);
  const pathName = usePathname();

  useEffect(() => {
    const id = pathName.split("/").pop();
    findUserById(id);
    fetchUserItems(id);
    fetchOpenBarters(id);
    fetchClosedBarters(id);
  }, [pathName]);

  const findUserById = async (id) => {
    try {
      const response = await fetch("/api/findUserById", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchUserItems = async (userId) => {
    try {
      const response = await fetch(`/api/findItemsById?userId=${userId}`);
      if (!response.ok) throw new Error("Failed to fetch items");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const fetchOpenBarters = async (userId) => {
    try {
      const response = await fetch(`/api/incoming-bartersById?userId=${userId}&status=open`);
      if (!response.ok) throw new Error("Failed to fetch open barters");
      const data = await response.json();
      setOpenBarters(data);
    } catch (error) {
      console.error("Error fetching open barters:", error);
    }
  };

  const fetchClosedBarters = async (userId) => {
    try {
      const response = await fetch(`/api/closed-bartersById?userId=${userId}&status=CLOSED`);
      if (!response.ok) throw new Error("Failed to fetch closed barters");
      const data = await response.json();
      setClosedBarters(data);
    } catch (error) {
      console.error("Error fetching closed barters:", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <Card className="bg-gray-800 text-white shadow-xl rounded-lg overflow-hidden mb-8">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8">
            <div className="flex items-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mr-6">
                <FaUserCircle size={80} className="text-gray-800" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold mb-2">
                  {user?.firstName} {user?.lastName}
                </CardTitle>
                <CardDescription className="text-gray-200 text-lg">
                  {user?.email}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-300">
              Member since: {user?.joinDate || "January 2023"}
            </p>
            <p className="text-gray-300">
              Total trades: {closedBarters.length}
            </p>
          </CardContent>
        </Card>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <Card className="bg-gray-800 text-white shadow-xl rounded-lg overflow-hidden col-span-2">
            <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 p-6">
              <CardTitle className="text-2xl font-semibold flex items-center">
                <FaImage className="mr-2" /> User&apos;s Items
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
                    className="bg-gray-700 text-white cursor-pointer hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                  >
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="h-40 bg-gray-600 flex items-center justify-center mb-4 rounded-md overflow-hidden">
                        {item.image ? (
                          <Image
                            width={400}
                            height={400}
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <FaImage className="text-4xl text-gray-400" />
                        )}
                      </div>
                      <p className="text-gray-300 text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
  
          <Card className="bg-gray-800 text-white shadow-xl rounded-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-yellow-600 to-orange-600 p-6">
              <CardTitle className="text-2xl font-semibold flex items-center">
                <FaExchangeAlt className="mr-2" /> Trade History
              </CardTitle>
              <CardDescription className="text-gray-200">
                Your recent completed trades
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {closedBarters.length > 0 ? (
                  closedBarters.map((barter) => (
                    <Card key={barter.barterId} className="bg-gray-700 text-white shadow-md rounded-lg">
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg font-semibold">{barter.item.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="text-gray-300">Offered: {barter.item.description}</div>
                        <div className="text-gray-300">Sought: {barter.itemSeeking}</div>
                        <div className="text-gray-300">
                          Offers received: {barter.offers.length}
                        </div>
                        <div className="mt-2 font-semibold text-green-400">
                          Status: Closed
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p>No completed trades found.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
  
        <Card className="bg-gray-800 text-white shadow-xl rounded-lg overflow-hidden mb-8">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <CardTitle className="text-2xl font-semibold flex items-center">
              <FaList className="mr-2" /> User&apos;s Open Listings
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
                    className="bg-gray-700 text-white cursor-pointer hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                  >
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">{barter.item.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="h-40 bg-gray-600 flex items-center justify-center mb-4 rounded-md overflow-hidden">
                        {barter.item.image ? (
                          <Image
                            width={400}
                            height={400}
                            src={barter.item.image}
                            alt={barter.item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <FaImage className="text-4xl text-gray-400" />
                        )}
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{barter.item.description}</p>
                      <p className="text-gray-300 text-sm mb-2">Seeking: {barter.itemSeeking}</p>
                      <p className="text-gray-300 text-sm mb-2">Description: {barter.description}</p>
                      <p className="text-gray-300 text-sm">Offers: {barter.offers.length}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p>No open listings found.</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default MyProfile;