import React, { useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Correct import path
import { Textarea } from "@/components/ui/textarea"; // Correct import path
import { FaTimes } from "react-icons/fa";

const CreateTradeDialog = ({
  isCreateDialogOpen,
  handleCreateClose,
  newTrade,
  handleInputChange,
  handleImageChange,
  handleRemoveImage,
  handleFormSubmit,
}) => {
  const fileInputRef = useRef(null);

  return (
    <Dialog open={isCreateDialogOpen} onOpenChange={handleCreateClose}>
      <DialogContent className="bg-gray-800 text-white rounded-lg shadow-xl max-w-md w-full mx-auto">
        <DialogTitle className="text-2xl font-bold mb-6 text-center">
          Create New Trade
        </DialogTitle>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Item Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-white focus:border-transparent transition duration-300"
              value={newTrade.name}
              onChange={handleInputChange}
              required
              placeholder="What are you offering?"
            />
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
              placeholder="Provide more details about your item..."
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium mb-2">
              Image
            </label>
            <div className="relative">
              <Input
                id="image"
                name="image"
                type="file"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-white focus:border-transparent transition duration-300"
                onChange={handleImageChange}
                ref={fileInputRef}
              />
              {newTrade.image && (
                <div className="relative mt-2">
                  <img
                    src={URL.createObjectURL(newTrade.image)}
                    alt="Selected"
                    className="w-full h-auto rounded-md"
                  />
                  <FaTimes
                    className="absolute top-2 right-2 text-white bg-red-600 rounded-full p-1 cursor-pointer"
                    onClick={handleRemoveImage}
                  />
                </div>
              )}
            </div>
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
