"use client";

import Link from "next/link";
import Image from "next/image";
import {signOut} from "next-auth/react";
import {useRouter} from "next/navigation";
import {FaUserCircle, FaSignOutAlt, FaUser, FaCog, FaClipboardList} from "react-icons/fa";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useSession} from "next-auth/react";

const Navbar = () => {
    const {data: session} = useSession();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut({redirect: false});
            router.push("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <nav className="w-full flex justify-between items-center p-4 bg-gray-800">
            <div className="flex items-center">
                <Image
                    src="/barterlogo.png"
                    alt="Barter System Logo"
                    width={50}
                    height={50}
                />
                <span className="text-2xl font-bold text-white ml-2">
                    Barter System
                </span>
            </div>
            <div className="flex space-x-4">
                <Link
                    href="/homepage"
                    className="text-white hover:text-gray-300 transition duration-300"
                >
                    Homepage
                </Link>
                <Link
                    href={`/homepage/my-trades/${session?.user?.id}`}
                    className="text-white hover:text-gray-300 transition duration-300"
                >
                    My Trades
                </Link>
            </div>
            <div className="relative flex items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="text-white hover:text-gray-300 transition duration-300 mr-4">
                            <FaUserCircle size={30}/>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white rounded-md shadow-lg w-56 p-2">
                        <DropdownMenuLabel className="text-lg font-semibold">
                            {session?.user?.name}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem asChild>
                            <Link href={`/homepage/profile/${session?.user?.id}`}
                                  className="flex items-center text-gray-800 py-2 px-4 hover:bg-gray-100">
                                <FaUser className="mr-3"/> Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={`/homepage/my-items/${session?.user?.id}`}
                                  className="flex items-center text-gray-800 py-2 px-4 hover:bg-gray-100">
                                <FaClipboardList className="mr-3"/> My items
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={`/homepage/settings/${session?.user?.id}`}
                                  className="flex items-center text-gray-800 py-2 px-4 hover:bg-gray-100">
                                <FaCog className="mr-3"/> Settings
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout}
                                          className="flex items-center text-gray-800 py-2 px-4 hover:bg-gray-100">
                            <FaSignOutAlt className="mr-3"/> Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
};

export default Navbar;