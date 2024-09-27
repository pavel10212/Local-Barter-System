"use client";

import {FaUserCircle} from "react-icons/fa";
import {useEffect, useState} from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {usePathname} from "next/navigation";


const MyProfile = () => {
    const [user, setUser] = useState(null);
    const pathName = usePathname();

    useEffect(() => {
        const id = pathName.split("/").pop();
        findUserById(id);
    }, []);

    const findUserById = async (id) => {
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
        }
    }


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
            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <Card className="bg-gray-800 text-white shadow-xl rounded-lg overflow-hidden mb-8">
                    <CardHeader className="bg-gray-700 p-6">
                        <div className="flex items-center">
                            <FaUserCircle size={50} className="mr-4"/>
                            <div>
                                <CardTitle className="text-2xl font-semibold">
                                    {user?.firstName} {user?.lastName}
                                </CardTitle>
                                <CardDescription className="text-gray-400">
                                    {user?.email}
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                <Card className="bg-gray-800 text-white shadow-xl rounded-lg overflow-hidden">
                    <CardHeader className="bg-gray-700 p-6">
                        <CardTitle className="text-2xl font-semibold">
                            Trade History
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                            Your recent trading activities
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-gray-300">Title</TableHead>
                                    <TableHead className="text-gray-300">Date</TableHead>
                                    <TableHead className="text-gray-300">Status</TableHead>
                                    <TableHead className="text-gray-300">Outcome</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tradeHistory.map((trade) => (
                                    <TableRow key={trade.id} className="border-t border-gray-700">
                                        <TableCell>{trade.title}</TableCell>
                                        <TableCell>{trade.date}</TableCell>
                                        <TableCell>{trade.status}</TableCell>
                                        <TableCell
                                            className={`${
                                                trade.outcome === "Successful"
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                            }`}
                                        >
                                            {trade.outcome}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default MyProfile;
