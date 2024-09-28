"use client";

import {useState, useEffect} from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {FaPlus, FaEdit, FaTrash, FaImage} from "react-icons/fa";
import Image from "next/image";
import {useSession} from "next-auth/react";
import LoadingWrapper from "@/components/navbar/loadingwrapper/loadingwrapper";


const MyItems = () => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newItem, setNewItem] = useState({
        name: "",
        description: "",
        image: null,
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [blob, setBlob] = useState(null);
    const {data: session} = useSession();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAllItems();
    }, []);

    const fetchAllItems = async () => {
        try {
            const response = await fetch("/api/items");
            if (!response.ok) throw new Error("Failed to fetch items");
            setItems(await response.json());
        } catch (error) {
            console.error(error);
        }
    };

    const handleDialogOpen = (item = null) => {
        setSelectedItem(item);
        setNewItem(item ? {...item} : {name: "", description: "", image: null});
        setPreviewImage(item ? item.image : null);
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setSelectedItem(null);
        setNewItem({name: "", description: "", image: null});
        setPreviewImage(null);
        setBlob(null);
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewItem((prev) => ({...prev, [name]: value}));
    };

    const handleImageChange = async (e) => {
        setLoading(true)
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
                setPreviewImage(URL.createObjectURL(file));
                setNewItem((prev) => ({...prev, image: newBlob.url}));
            } catch (error) {
                console.error("Error uploading image:", error);
            }
            finally {
                setLoading(false)
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const url = selectedItem ? "/api/editItem" : "/api/create-item";
            const body = selectedItem
                ? {...newItem, id: selectedItem.itemId}
                : newItem;
            const response = await fetch(url, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body),
            });
            if (!response.ok)
                throw new Error(`Failed to ${selectedItem ? "edit" : "create"} item`);
            const updatedItem = await response.json();
            setItems((prev) =>
                selectedItem
                    ? prev.map((item) =>
                        item.itemId === selectedItem.itemId ? updatedItem : item
                    )
                    : [...prev, updatedItem]
            );
            handleDialogClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    };

    const handleItemDelete = async (item) => {
        try {
            const response = await fetch("/api/deleteItem", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id: item.itemId}),
            });
            if (!response.ok) throw new Error("Failed to delete item");
            setItems((prev) => prev.filter((i) => i.itemId !== item.itemId));
            handleDialogClose();
        } catch (error) {
            console.error(error);
        }
    };


    if (loading) return <LoadingWrapper/>

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
            <main className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Your Items</h2>
                    <Button
                        onClick={() => handleDialogOpen()}
                        className="bg-black text-white hover:bg-white hover:text-black"
                    >
                        <FaPlus className="mr-2"/>
                        Add Item
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <Card
                            key={item.id}
                            className="bg-gray-700 text-white cursor-pointer hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                            onClick={() => handleDialogOpen(item)}
                        >
                            <CardHeader>
                                <CardTitle>{item.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-48 bg-gray-600 flex items-center justify-center mb-4">
                                    {item.image ? (
                                        <Image
                                            width={400}
                                            height={400}
                                            src={item.image}
                                            alt={item.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <FaImage className="text-4xl text-gray-400"/>
                                    )}
                                </div>
                                <p className="text-gray-400 mb-2">{item.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>

            <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
                <DialogContent className="bg-gray-800 text-white">
                    <DialogTitle className="text-2xl font-bold mb-2 text-center">
                        {selectedItem ? "Edit Item" : "Add New Item"}
                    </DialogTitle>
                    <DialogDescription className="text-center text-gray-400 mb-6">
                        {selectedItem
                            ? "Update the details of your item."
                            : "Enter the details of your new item."}
                    </DialogDescription>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2">
                                Item Name
                            </label>
                            <Input
                                id="name"
                                name="name"
                                value={newItem.name}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter item name (e.g., Vintage Camera)"
                                className="bg-gray-700 text-white"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium mb-2"
                            >
                                Description
                            </label>
                            <Textarea
                                id="description"
                                name="description"
                                rows="4"
                                value={newItem.description}
                                onChange={handleInputChange}
                                required
                                placeholder="Describe your item (e.g., A well-maintained vintage camera from the 1960s, perfect for collectors or photography enthusiasts)"
                                className="bg-gray-700 text-white"
                            />
                        </div>
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium mb-2">
                                Item Image
                            </label>
                            <Input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <Button
                                type="button"
                                onClick={() => document.getElementById("image").click()}
                                className="w-full bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-200 py-2 rounded-md font-medium"
                            >
                                <FaImage className="inline-block mr-2"/>
                                {previewImage ? "Change Image" : "Upload Image"}
                            </Button>
                            {previewImage && (
                                <div className="mt-4">
                                    <Image
                                        width={400}
                                        height={400}
                                        src={previewImage}
                                        alt="Preview"
                                        className="w-full h-48 object-cover rounded"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end space-x-3 mt-6">
                            <Button
                                type="button"
                                onClick={handleDialogClose}
                                className="px-4 py-2 bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-200 rounded-md font-medium"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors duration-200 rounded-md font-medium"
                            >
                                {selectedItem ? "Save Changes" : "Add Item"}
                            </Button>
                            {selectedItem && (
                                <Button
                                    type="button"
                                    onClick={() => handleItemDelete(selectedItem)}
                                    className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 rounded-md font-medium"
                                >
                                    <FaTrash className="inline-block mr-2"/>
                                    Delete
                                </Button>
                            )}
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MyItems;
