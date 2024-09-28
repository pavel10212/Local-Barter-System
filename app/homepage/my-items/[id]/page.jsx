"use client";

import {useState, useEffect} from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Plus, Trash2, Image as ImageIcon, X} from "lucide-react";
import Image from "next/image";
import {useSession} from "next-auth/react";
import LoadingWrapper from "@/components/LoadingWrapper/LoadingWrapper";
import {toast} from "sonner"

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
        setLoading(true);
        try {
            const response = await fetch("/api/items");
            if (!response.ok) throw new Error("Failed to fetch items");
            setItems(await response.json());
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
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
        setLoading(true);
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
                toast.success("Image uploaded successfully");
            } catch (error) {
                console.error("Error uploading image:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
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
            toast.success("Item saved successfully");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleItemDelete = async (item) => {
        try {
            const response = await fetch(`/api/deleteItem?itemId=${item.itemId}`, {
                method: "DELETE",
            })
            if (!response.ok) throw new Error("Failed to delete item");
            setItems((prev) => prev.filter((i) => i.itemId !== item.itemId));
            handleDialogClose();
            toast.success("Item deleted successfully");
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <LoadingWrapper/>


    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
            <main className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">Your Items</h2>
                    <Button
                        onClick={() => handleDialogOpen()}
                        className="bg-black hover:bg-white hover:text-black"
                    >
                        <Plus className="mr-2 h-4 w-4"/>
                        Add Item
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <Card
                            key={item.id}
                            className="bg-gray-800 border-gray-700 hover:border-white transition-all duration-300 cursor-pointer"
                            onClick={() => handleDialogOpen(item)}
                        >
                            <CardHeader>
                                <CardTitle className="text-xl text-white font-semibold">
                                    {item.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div
                                    className="h-48 bg-gray-700 rounded-md flex items-center justify-center mb-4 overflow-hidden">
                                    {item.image ? (
                                        <Image
                                            width={400}
                                            height={400}
                                            src={item.image}
                                            alt={item.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <ImageIcon className="w-12 h-12 text-gray-500"/>
                                    )}
                                </div>
                                <p className="text-gray-400 line-clamp-2">{item.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>

            <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
                <DialogContent className="bg-gray-800 text-white border-gray-700">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                            {selectedItem ? "Edit Item" : "Add New Item"}
                        </DialogTitle>
                        <DialogDescription className="text-gray-400">
                            {selectedItem
                                ? "Update the details of your item."
                                : "Enter the details of your new item."}
                        </DialogDescription>
                    </DialogHeader>
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
                                placeholder="Enter item name"
                                className="bg-gray-700 border-gray-600 focus:border-white"
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
                                placeholder="Describe your item"
                                className="bg-gray-700 border-gray-600 focus:border-white"
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
                                className="w-full bg-gray-700 hover:bg-gray-600"
                            >
                                <ImageIcon className="mr-2 h-4 w-4"/>
                                {previewImage ? "Change Image" : "Upload Image"}
                            </Button>
                            {previewImage && (
                                <div className="mt-4 relative">
                                    <Image
                                        width={400}
                                        height={400}
                                        src={previewImage}
                                        alt="Preview"
                                        className="w-full h-48 object-cover rounded-md"
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => setPreviewImage(null)}
                                        className="absolute top-2 right-2 p-1 bg-gray-800 rounded-full"
                                    >
                                        <X className="h-4 w-4"/>
                                    </Button>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end space-x-3 mt-6">
                            <Button
                                type="button"
                                onClick={handleDialogClose}
                                variant="outline"
                                className="border-gray-600 text-black hover:bg-gray-300"
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                                {selectedItem ? "Save Changes" : "Add Item"}
                            </Button>
                            {selectedItem && (
                                <Button
                                    type="button"
                                    onClick={() => handleItemDelete(selectedItem)}
                                    variant="destructive"
                                >
                                    <Trash2 className="mr-2 h-4 w-4"/>
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