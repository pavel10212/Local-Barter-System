import React from 'react';

const MyTrades = () => {
  const trades = [
    {
      id: 1,
      title: "Trade: Book Exchange",
      user: "Emily Clark",
    },
    {
      id: 2,
      title: "Trade: Plant Swap",
      user: "Michael Brown",
    },
    {
      id: 3,
      title: "Trade: Art Supplies for Craft Materials",
      user: "Sophia Turner",
    },
    {
      id: 4,
      title: "Trade: Baking Goods for Fresh Produce",
      user: "Liam Johnson",
    },
  ];

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-8">
        My Trades
      </h1>

      <h2 className="text-2xl font-semibold text-white mb-4">
        Your Current Trades
      </h2>

      <ul className="space-y-4">
        {trades.map((trade) => (
          <li key={trade.id} className="bg-gray-700 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-white">{trade.title}</h3>
            <p className="text-gray-300 mt-2">Posted by: {trade.user}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyTrades;