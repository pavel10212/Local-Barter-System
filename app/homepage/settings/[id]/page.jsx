"use client";

import {useEffect, useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

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
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/updateUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    address,
                    phoneNumber
                })
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
            <header className="bg-gray-800 shadow-lg py-6">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold">Settings</h1>
                    <p className="text-gray-400 mt-2">Manage your account settings</p>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 space-y-8">
                <Card className="bg-gray-800 text-white">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold">Edit Profile</CardTitle>
                        <CardDescription className="text-gray-400">Update your personal information</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="first-name" className="text-gray-300">First Name</Label>
                                    <Input id="first-name" name="first-name" value={firstName}
                                           onChange={e => setFirstName(e.target.value)}
                                           className="bg-gray-700 text-white border-gray-600"/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last-name" className="text-gray-300">Last Name</Label>
                                    <Input id="last-name" name="last-name" value={lastName}
                                           onChange={e => setLastName(e.target.value)}
                                           className="bg-gray-700 text-white border-gray-600"/>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-300">Email address</Label>
                                <Input id="email" name="email" type="email" value={email}
                                       onChange={e => setEmail(e.target.value)}
                                       className="bg-gray-700 text-white border-gray-600"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address" className="text-gray-300">Address</Label>
                                <Input id="address" name="address" value={address}
                                       onChange={e => setAddress(e.target.value)}
                                       className="bg-gray-700 text-white border-gray-600"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone-number" className="text-gray-300">Phone Number</Label>
                                <Input id="phone-number" name="phone-number" type="tel" value={phoneNumber}
                                       onChange={e => setPhoneNumber(e.target.value)}
                                       className="bg-gray-700 text-white border-gray-600"/>
                            </div>
                            <div className="flex justify-end mt-6">
                                <button
                                    type="submit"
                                    className="bg-white text-black py-2 px-6 rounded-full hover:bg-black hover:text-white transition duration-300"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <Card className="bg-gray-800 text-white">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold">Help and Support</CardTitle>
                        <CardDescription className="text-gray-400">Find answers to common questions or contact our
                            support team</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="faq" className="border-b border-gray-700">
                                <AccordionTrigger className="text-white hover:text-gray-300">Frequently Asked
                                    Questions</AccordionTrigger>
                                <AccordionContent className="text-gray-300">
                                    <ul className="list-disc list-inside space-y-2">
                                        <li>How do I change my password?</li>
                                        <li>How can I update my email address?</li>
                                        <li>What should I do if I forget my password?</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="contact" className="border-b border-gray-700">
                                <AccordionTrigger className="text-white hover:text-gray-300">Contact
                                    Support</AccordionTrigger>
                                <AccordionContent className="text-gray-300">
                                    <p>
                                        If you need further assistance, please contact our support team at{" "}
                                        <a href="mailto:support@example.com"
                                           className="text-indigo-400 hover:underline">
                                            support@example.com
                                        </a>
                                        .
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default SettingsPage;