import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaExchangeAlt, FaSearch, FaInfoCircle } from "react-icons/fa";

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
      <DialogContent className="bg-gray-900 text-white rounded-lg shadow-xl max-w-md w-full mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center">
            <FaExchangeAlt className="mr-2" />
            Create New Trade
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFormSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <label htmlFor="item" className="block text-sm font-medium">
              Item Offering
            </label>
            <select
              id="item"
              name="item"
              value={newTrade.itemId}
              onChange={(e) => handleInputChange(e, items)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              required
            >
              <option value="">Select an item to offer</option>
              {items.map((item) => (
                <option key={item.itemId} value={item.itemId}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="itemSeeking" className="block text-sm font-medium">
              Seeking Item
            </label>
            <div className="relative">
              <Input
                id="itemSeeking"
                name="itemSeeking"
                type="text"
                className="w-full pl-10 p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                value={newTrade.itemSeeking}
                onChange={handleInputChange}
                required
                placeholder="What are you looking for?"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <div className="relative">
              <Textarea
                id="description"
                name="description"
                rows="4"
                className="w-full pl-10 p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 resize-none"
                value={newTrade.description}
                onChange={handleInputChange}
                required
                placeholder="Provide more details about your trade..."
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
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
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition duration-300"
            >
              Create Trade
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTradeDialog;
