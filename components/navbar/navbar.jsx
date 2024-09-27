"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaSignOutAlt, FaUser, FaCog } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { data: session } = useSession();
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
    <nav className="w-full bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Image
              src="/barterlogo.png"
              alt="Barter System Logo"
              width={40}
              height={40}
              className="mr-3"
            />
            <span className="text-2xl font-bold text-white">Barter System</span>
          </div>
          <div className="flex space-x-4">
            <NavLink href="/homepage">Homepage</NavLink>
            <NavLink href={`/homepage/my-trades/${session?.user?.id}`}>
              My Trades
            </NavLink>
            <NavLink href={`/homepage/my-items/${session?.user?.id}`}>
              My Items
            </NavLink>
          </div>
          <div className="relative flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-white hover:text-gray-300 transition duration-300">
                  <FaUserCircle size={30} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white rounded-md shadow-lg w-56 p-2 mt-2">
                <DropdownMenuLabel className="text-lg font-semibold">
                  {session?.user?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href={`/homepage/profile/${session?.user?.id}`}
                    className="flex items-center text-gray-800 py-2 px-4 hover:bg-gray-100 rounded-md"
                  >
                    <FaUser className="mr-3" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href={`/homepage/settings/${session?.user?.id}`}
                    className="flex items-center text-gray-800 py-2 px-4 hover:bg-gray-100 rounded-md"
                  >
                    <FaCog className="mr-3" /> Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center text-gray-800 py-2 px-4 hover:bg-gray-100 rounded-md"
                >
                  <FaSignOutAlt className="mr-3" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children }) => (
  <Link
    href={href}
    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
  >
    {children}
  </Link>
);

export default Navbar;
