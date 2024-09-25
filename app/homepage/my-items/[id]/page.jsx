"use client";

import {useState, useEffect} from 'react';
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {FaPlus, FaEdit, FaTrash, FaImage} from "react-icons/fa";
import Image from 'next/image';
import {useSession} from "next-auth/react";

const MyItems = () => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [newItem, setNewItem] = useState({name: "", description: "", condition: "", image: null});
    const [previewImage, setPreviewImage] = useState(null);
    const [blob, setBlob] = useState(null);
    const {data: session} = useSession();
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    useEffect(() => {
        fetchAllItems();
    }, []);

    const fetchAllItems = async () => {
        try {
            const response = await fetch("/api/items");
            if (!response.ok) {
                throw new Error("Failed to fetch items");
            }
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const handleClose = () => {
        setSelectedItem(null);
    };

    const handleCreateClick = () => {
        setIsCreateDialogOpen(true);
    };

    const handleCreateClose = () => {
        setIsCreateDialogOpen(false);
        setNewItem({name: "", description: "", condition: "", image: null});
        setPreviewImage(null);
        setBlob(null);
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewItem((prevItem) => ({...prevItem, [name]: value}));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const filename = `${session?.user?.id}/${Date.now()}_${file.name}`;
                const response = await fetch(`/api/upload?filename=${filename}`, {
                    method: 'POST',
                    body: file,
                });

                const newBlob = await response.json();
                setBlob(newBlob);

                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewImage(reader.result);
                };
                reader.readAsDataURL(file);

                setNewItem((prevItem) => ({...prevItem, image: newBlob.url}));
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };


    const handleItemEdit = (item) => {
        handleClose();
        setSelectedItem(item);
        setNewItem({
            name: item.name,
            description: item.description,
            condition: item.condition,
            image: item.image
        });
        setPreviewImage(item.image);
        setIsEditDialogOpen(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            let updatedImage = newItem.image;
            if (blob && blob.url !== selectedItem.image) {
                updatedImage = blob.url;
            }
            const response = await fetch("/api/editItem", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: selectedItem.itemId,
                    name: newItem.name,
                    description: newItem.description,
                    image: updatedImage,
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to edit item");
            }
            const updatedItem = await response.json();
            setItems(items.map((item) => (item.itemId === selectedItem.itemId ? updatedItem : item)));
            setIsEditDialogOpen(false);
            setSelectedItem(null);
            setBlob(null);
            setPreviewImage(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleItemDelete = async (item) => {
        try {
            const response = await fetch("/api/deleteItem", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: item.itemId,
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to delete item");
            }
            await response.json();
            setItems(items.filter((i) => i.itemId !== item.itemId));
            handleClose();
        } catch (error) {
            console.error(error);
        }
    };


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/create-item", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newItem),
            });
            if (!response.ok) {
                throw new Error("Failed to create item");
            }
        } catch (error) {
            console.error(error);
        }
        const createdItem = {
            ...newItem,
            id: items.length + 1,
            image: blob ? blob.url : null
        };
        setItems([...items, createdItem]);
        handleCreateClose();
    };

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
            <header className="bg-gray-800 shadow-lg py-6">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold">My Items</h1>
                    <p className="text-gray-400 mt-2">Manage your items for barter</p>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Your Items</h2>
                    <Button onClick={handleCreateClick} className="bg-black text-white hover:bg-white hover:text-black">
                        <FaPlus className="mr-2"/>
                        Add Item
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <Card key={item.id}
                              className="bg-gray-700 text-white cursor-pointer hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                              onClick={() => handleItemClick(item)}>
                            <CardHeader>
                                <CardTitle>{item.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-48 bg-gray-600 flex items-center justify-center mb-4">
                                    {item.image ? (
                                        <Image width={400} height={400}
                                               src={item.image} alt={item.name} className="h-full w-full object-cover"/>
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

            {selectedItem && (
                <Dialog open={!!selectedItem} onOpenChange={handleClose}>
                    <DialogContent className="bg-gray-800 text-white">
                        <DialogTitle className="text-2xl font-bold mb-4">
                            {selectedItem.name}
                        </DialogTitle>
                        <div className="mb-4">
                            {selectedItem.image && (
                                <Image width={400} height={400}
                                       src={selectedItem.image} alt={selectedItem.name}
                                       className="w-full h-64 object-cover mb-4 rounded"/>
                            )}
                            <p className="text-gray-400">{selectedItem.description}</p>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <Button variant="outline" className="bg-blue-600 hover:bg-blue-500"
                                    onClick={() => handleItemEdit(selectedItem)}
                            >
                                <FaEdit className="mr-2"/>
                                Edit
                            </Button>
                            <Button variant="outline" className="bg-red-600 hover:bg-red-500"
                                    onClick={() => handleItemDelete(selectedItem)}>
                                <FaTrash className="mr-2"/>
                                Delete
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            <Dialog open={isCreateDialogOpen} onOpenChange={handleCreateClose}>
                <DialogContent className="bg-gray-800 text-white">
                    <DialogTitle className="text-2xl font-bold mb-6 text-center">Add New Item</DialogTitle>
                    <form onSubmit={handleFormSubmit} className="space-y-6">
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
                                placeholder="Enter item name"
                                className="bg-gray-700 text-white"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium mb-2">
                                Description
                            </label>
                            <Textarea
                                id="description"
                                name="description"
                                rows="4"
                                value={newItem.description}
                                onChange={handleInputChange}
                                required
                                placeholder="Describe your item"
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
                                onClick={() => document.getElementById('image').click()}
                                variant="outline"
                                className="w-full"
                            >
                                <FaImage className="mr-2"/>
                                {previewImage ? "Change Image" : "Upload Image"}
                            </Button>
                            {previewImage && (
                                <div className="mt-4">
                                    <Image width={400} height={400}
                                           src={previewImage} alt="Preview"
                                           className="w-full h-48 object-cover rounded"/>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end space-x-3">
                            <Button type="button" variant="outline" onClick={handleCreateClose}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                Add Item
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog open={isEditDialogOpen} onOpenChange={() => {
                setIsEditDialogOpen(false);
                setSelectedItem(null);
            }}>
                <DialogContent className="bg-gray-800 text-white">
                    <DialogTitle className="text-2xl font-bold mb-6 text-center">Edit Item</DialogTitle>
                    {selectedItem && (
                        <form onSubmit={handleEditSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="edit-name" className="block text-sm font-medium mb-2">
                                    Item Name
                                </label>
                                <Input
                                    id="edit-name"
                                    name="name"
                                    value={newItem.name}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter item name"
                                    className="bg-gray-700 text-white"
                                />
                            </div>
                            <div>
                                <label htmlFor="edit-description" className="block text-sm font-medium mb-2">
                                    Description
                                </label>
                                <Textarea
                                    id="edit-description"
                                    name="description"
                                    rows="4"
                                    value={newItem.description}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Describe your item"
                                    className="bg-gray-700 text-white"
                                />
                            </div>
                            <div>
                                <label htmlFor="edit-image" className="block text-sm font-medium mb-2">
                                    Item Image
                                </label>
                                <Input
                                    id="edit-image"
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                                <Button
                                    type="button"
                                    onClick={() => document.getElementById('edit-image').click()}
                                    variant="outline"
                                    className="w-full"
                                >
                                    <FaImage className="mr-2"/>
                                    {previewImage ? "Change Image" : "Upload Image"}
                                </Button>
                                {previewImage && (
                                    <div className="mt-4">
                                        <Image width={400} height={400}
                                               src={previewImage} alt="Preview"
                                               className="w-full h-48 object-cover rounded"/>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-end space-x-3">
                                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MyItems;