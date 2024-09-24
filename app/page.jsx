import React from "react";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <header className="w-full flex justify-between items-center p-4 bg-gray-800">
        <div className="text-2xl font-bold text-white">Barter System</div>
        <div>
          <Link
            href="/login"
            className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 mr-2"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-300"
          >
            Sign Up
          </Link>
        </div>
      </header>
      <div className="flex flex-col items-center justify-start flex-grow text-center mt-12 p-4">
        <div className="max-w-2xl w-full bg-gray-800 p-8 rounded-lg shadow-xl">
          <h1 className="text-5xl font-extrabold text-white mb-6">
            Barter System
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            This is a bartering app where you can exchange goods and services
            with others. Join our community to start trading items and services
            without the need for money. Discover a new way to get what you need
            while offering what you have.
          </p>
          <Link
            href="/login"
            className="inline-block bg-blue-500 text-white py-3 px-6 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
