import React from "react";
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";

const CreateTradeDialog = ({
                               isCreateDialogOpen,
                               handleCreateClose,
                               newTrade,
                               handleInputChange,
                               handleFormSubmit,
                               items,
                           }) => {
    return (
        <Dialog open={isCreateDialogOpen} onOpenChange={handleCreateClose}>
            <DialogContent className="bg-gray-800 text-white rounded-lg shadow-xl max-w-md w-full mx-auto">
                <DialogTitle className="text-2xl font-bold mb-6 text-center">
                    Create New Trade
                </DialogTitle>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="item" className="block text-sm font-medium mb-2">
                            Item Offering
                        </label>
                        <select
                            id="item"
                            name="item"
                            value={newTrade.item}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-white focus:border-transparent transition duration-300"
                            required
                        >
                            <option value="">Select an item to offer</option>
                            {items.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="itemSeeking"
                            className="block text-sm font-medium mb-2"
                        >
                            Item Seeking
                        </label>
                        <Input
                            id="itemSeeking"
                            name="itemSeeking"
                            type="text"
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-white focus:border-transparent transition duration-300"
                            value={newTrade.itemSeeking}
                            onChange={handleInputChange}
                            required
                            placeholder="What are you looking for?"
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
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-white focus:border-transparent transition duration-300 resize-none"
                            value={newTrade.description}
                            onChange={handleInputChange}
                            required
                            placeholder="Provide more details about your trade..."
                        />
                    </div>
                    <div className="flex justify-end space-x-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCreateClose}
                            className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-black text-white py-2 px-4 rounded-md hover:bg-white hover:text-black transition duration-300"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );

};

export default CreateTradeDialog;