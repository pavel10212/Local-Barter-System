"use client";

import React from "react";
import {FaUserCircle} from "react-icons/fa";
import {useSession} from "next-auth/react";

const MyProfile = () => {
    const {data: session} = useSession();
    const tradeHistory = [
        {
            id: 1,
            title: "Lawn Mowing for Home-cooked Meals",
            date: "2023-09-01",
            status: "Completed",
            outcome: "Successful",
        },
        {
            id: 2,
            title: "Guitar Lessons for Spanish Tutoring",
            date: "2023-08-15",
            status: "Completed",
            outcome: "Successful",
        },
        {
            id: 3,
            title: "Handmade Jewelry for Graphic Design",
            date: "2023-07-20",
            status: "Cancelled",
            outcome: "Unsuccessful",
        },
    ];

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
            <header className="bg-gray-800 shadow-lg py-6">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold">My Profile</h1>
                    <p className="text-gray-400 mt-2">View your profile and trade history</p>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="flex items-center mb-6">
                        <FaUserCircle size={50} className="mr-4"/>
                        <div>
                            <h2 className="text-2xl font-semibold">{session?.user?.name}</h2>
                            <p className="text-gray-400">{session?.user?.email}</p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-semibold mb-4">Trade History</h2>
                    <table className="w-full text-left">
                        <thead>
                        <tr>
                            <th className="py-2">Title</th>
                            <th className="py-2">Date</th>
                            <th className="py-2">Status</th>
                            <th className="py-2">Outcome</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tradeHistory.map((trade) => (
                            <tr key={trade.id} className="border-t border-gray-700">
                                <td className="py-2">{trade.title}</td>
                                <td className="py-2">{trade.date}</td>
                                <td className="py-2">{trade.status}</td>
                                <td
                                    className={`py-2 ${
                                        trade.outcome === "Successful" ? "text-green-500" : "text-red-500"
                                    }`}
                                >
                                    {trade.outcome}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default MyProfile;