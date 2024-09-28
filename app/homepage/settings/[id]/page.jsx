"use client";

import {useEffect, useState} from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Save, User, Mail, MapPin, Phone, Image as ImageIcon, X, Camera} from "lucide-react";
import {toast} from "sonner"
import LoadingWrapper from "@/components/LoadingWrapper/LoadingWrapper";
import {useSession} from "next-auth/react";
import Image from "next/image";

const SettingsPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [blob, setBlob] = useState(null);
    const {data: session} = useSession();

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/user");
            const data = await response.json();
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setEmail(data.email);
            setAddress(data.address);
            setPhoneNumber(data.phoneNumber);
            setPreviewUrl(data.profilePictureUrl || "")
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            let profilePictureUrl = previewUrl;

            if (blob) {
                profilePictureUrl = blob.url;
            }

            const response = await fetch("/api/updateUser", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    address,
                    phoneNumber,
                    profilePictureUrl,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update profile');
            }

            const data = await response.json();
            toast.success("Profile updated successfully");
        } catch (error) {
            console.error(error);
            toast.error(error.message || "An error occurred while updating the profile");
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = async (e) => {
        setIsLoading(true);
        const file = e.target.files[0];
        if (file) {
            try {
                const filename = `${session?.user?.id}/${Date.now()}_${file.name}`;
                const response = await fetch(`/api/upload?filename=${filename}`, {
                    method: "POST",
                    body: file,
                });
                const newBlob = await response.json();
                setBlob(newBlob);
                setPreviewUrl(URL.createObjectURL(file));
                toast.success("Image uploaded successfully");
            } catch (error) {
                console.error("Error uploading image:", error);
                toast.error("Failed to upload image");
            } finally {
                setIsLoading(false);
            }
        }
    };

    if (isLoading) return <LoadingWrapper/>

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <Card className="bg-gray-800 border-gray-700 shadow-xl">
                    <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
                        <CardTitle className="text-2xl font-semibold text-white flex items-center">
                            <User className="mr-2"/>
                            Edit Profile
                        </CardTitle>
                        <CardDescription className="text-gray-200">
                            Update your personal information
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <Label htmlFor="profile-picture"
                                       className="text-gray-300 flex items-center text-lg font-semibold">
                                    <ImageIcon className="mr-2 h-5 w-5"/>
                                    Profile Picture
                                </Label>
                                <div className="flex flex-col items-center space-y-4">
                                    <div
                                        className="relative w-40 h-40 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
                                        {previewUrl ? (
                                            <Image
                                                src={previewUrl}
                                                alt="Profile Preview"
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        ) : (
                                            <User className="h-20 w-20 text-gray-400"/>
                                        )}
                                        <label htmlFor="profile-picture"
                                               className="absolute inset-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-300">
                                            <Camera className="h-8 w-8 text-white"/>
                                        </label>
                                    </div>
                                    <Input
                                        id="profile-picture"
                                        name="profile-picture"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    <div className="flex space-x-2">
                                        <Button
                                            type="button"
                                            onClick={() => document.getElementById("profile-picture").click()}
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                                        >
                                            {previewUrl ? "Change Photo" : "Upload Photo"}
                                        </Button>
                                        {previewUrl && (
                                            <Button
                                                type="button"
                                                onClick={() => {
                                                    setPreviewUrl("");
                                                    setBlob(null);
                                                }}
                                                className="bg-red-600 hover:bg-red-700 text-white"
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
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
                                        className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
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
                                        className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-300 flex items-center">
                                    <Mail className="mr-2 h-4 w-4"/>
                                    Email address
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address" className="text-gray-300 flex items-center">
                                    <MapPin className="mr-2 h-4 w-4"/>
                                    Address
                                </Label>
                                <Input
                                    id="address"
                                    name="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone-number" className="text-gray-300 flex items-center">
                                    <Phone className="mr-2 h-4 w-4"/>
                                    Phone Number
                                </Label>
                                <Input
                                    id="phone-number"
                                    name="phone-number"
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                />
                            </div>
                            <div className="flex justify-end mt-8">
                                <Button
                                    type="submit"
                                    className="bg-black text-white hover:bg-white hover:text-black transition duration-300"
                                >
                                    <Save className="mr-2 h-4 w-4"/>
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default SettingsPage;