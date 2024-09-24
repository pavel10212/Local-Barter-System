import React from "react";
import Layout from "./layout";

const Homepage = () => {
  const barters = [
    {
      id: 1,
      title: "Offering: Lawn Mowing, Seeking: Home-cooked Meals",
      user: "John Doe",
    },
    {
      id: 2,
      title: "Offering: Guitar Lessons, Seeking: Spanish Tutoring",
      user: "Jane Smith",
    },
    {
      id: 3,
      title: "Offering: Handmade Jewelry, Seeking: Graphic Design",
      user: "Alice Johnson",
    },
    {
      id: 4,
      title: "Offering: Car Repair, Seeking: Painting Services",
      user: "Bob Williams",
    },
  ];

  return (
    <div className="p-4 bg-gray-800 min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-8">
        Welcome to the Barter System
      </h1>

      <h2 className="text-2xl font-semibold text-white mb-4">
        Current Barters
      </h2>

      <ul className="space-y-4">
        {barters.map((barter) => (
          <li key={barter.id} className="bg-gray-700 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-white">{barter.title}</h3>
            <p className="text-gray-300 mt-2">Posted by: {barter.user}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Homepage;
