"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaSave } from "react-icons/fa"; // Make sure to import FaSave from react-icons

const SettingsPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const response = await fetch("/api/user");
      const data = await response.json();
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setAddress(data.address);
      setPhoneNumber(data.phoneNumber);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/updateUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          address,
          phoneNumber,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <Card className="bg-gray-800 text-white shadow-xl rounded-lg overflow-hidden">
          <CardHeader className="bg-gray-700 p-6">
            <CardTitle className="text-2xl font-semibold">
              Edit Profile
            </CardTitle>
            <CardDescription className="text-gray-400">
              Update your personal information
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first-name" className="text-gray-300">
                    First Name
                  </Label>
                  <Input
                    id="first-name"
                    name="first-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-gray-700 text-white border-gray-600 w-full max-w-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name" className="text-gray-300">
                    Last Name
                  </Label>
                  <Input
                    id="last-name"
                    name="last-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-gray-700 text-white border-gray-600 w-full max-w-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-700 text-white border-gray-600 w-full max-w-md"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-gray-300">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="bg-gray-700 text-white border-gray-600 w-full max-w-md"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone-number" className="text-gray-300">
                  Phone Number
                </Label>
                <Input
                  id="phone-number"
                  name="phone-number"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="bg-gray-700 text-white border-gray-600 w-full max-w-sm"
                />
              </div>
              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  className="bg-black text-white hover:bg-white hover:text-black transition duration-300 py-2 px-6 rounded-md flex items-center"
                >
                  <FaSave className="mr-2" />
                  Save Changes
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SettingsPage;
