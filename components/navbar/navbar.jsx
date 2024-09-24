import React from "react";
import Link from "next/link";
import Image from "next/image"; // Import the Image component from Next.js

const Navbar = () => {
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
          href="/"
          className="text-white hover:text-gray-300 transition duration-300"
        >
          Homepage
        </Link>
        <Link
          href="/my-trades"
          className="text-white hover:text-gray-300 transition duration-300"
        >
          My Trades
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link
          href="/profile"
          className="text-white hover:text-gray-300 transition duration-300"
        >
          Profile
        </Link>
        <button className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition duration-300">
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
