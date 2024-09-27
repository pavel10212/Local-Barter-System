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
    const segments = path.split("/").filter(Boolean);

    for (let i = segments.length; i > 0; i--) {
      const partialPath = "/" + segments.slice(0, i).join("/");
      if (headers[partialPath]) {
        return headers[partialPath];
      }
    }
    return "Barter System";
  };

  const currentHeader = getHeader(pathname);
  const isHomepage = pathname === "/homepage";

  return (
    <header
      className={`bg-gradient-to-r from-custom-dark to-custom-light text-white px-6 shadow-lg transition-all duration-300 ${
        isHomepage ? "py-8" : "py-6"
      }`}
    >
      <div
        className={`max-w-4xl mx-auto text-center transition-all duration-300 ${
          isHomepage ? "space-y-4" : "space-y-2"
        }`}
      >
        <h1 className="text-4xl font-bold">{currentHeader}</h1>
        <div className="w-16 h-1 bg-white mx-auto rounded-full"></div>
        {isHomepage && (
          <p className="text-lg text-blue-100 mt-2">
            Discover the power of bartering
          </p>
        )}
      </div>
    </header>
  );
};

export default DynamicHeader;
