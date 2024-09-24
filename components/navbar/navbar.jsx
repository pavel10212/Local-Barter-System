"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaSignOutAlt, FaUser, FaCog } from "react-icons/fa"; // Import necessary icons
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="w-full flex justify-between items-center p-4 bg-gray-800">
      <div className="flex items-center">
        <Image
          src="/barterlogo.png" // Replace with the path to your logo
          alt="Barter System Logo"
          width={50} // Adjust the width as needed
          height={50} // Adjust the height as needed
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
          href="/homepage/my-trades"
          className="text-white hover:text-gray-300 transition duration-300"
        >
          My Trades
        </Link>
      </div>
      <div className="relative flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-white hover:text-gray-300 transition duration-300">
              <FaUserCircle size={30} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white rounded-md shadow-lg">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/homepage/profile" className="flex items-center text-gray-800">
                <FaUser className="mr-2" /> Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/homepage/settings" className="flex items-center text-gray-800">
                <FaCog className="mr-2" /> Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="flex items-center text-gray-800">
              <FaSignOutAlt className="mr-2" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;