// components/DynamicHeader.js
"use client";

import { usePathname } from "next/navigation";

const headers = {
  "/homepage": "Welcome to Barter System",
  "/homepage/my-trades": "My Trades",
  "/homepage/my-items": "My Items",
  "/homepage/profile": "User Profile",
  "/homepage/settings": "Settings",
};

const DynamicHeader = () => {
  const pathname = usePathname();

  const getHeader = (path) => {
    if (headers[path]) return headers[path];
    for (const route in headers) {
      if (path.startsWith(route)) {
        return headers[route];
      }
    }
    return "Barter System";
  };

  const currentHeader = getHeader(pathname);

  return (
    <header className="bg-gradient-to-r from-custom-dark to-custom-light text-white py-8 px-6 shadow-lg">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-2">{currentHeader}</h1>
        <div className="w-16 h-1 bg-white mx-auto rounded-full"></div>
        <p className="mt-4 text-lg text-blue-100">
          Discover the power of bartering
        </p>
      </div>
    </header>
  );
};

export default DynamicHeader;
