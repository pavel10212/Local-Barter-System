import React from "react";
import Layout from "./layout";

const Homepage = () => {
  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-4xl font-bold text-white">
          Welcome to the Barter System
        </h1>
        <p className="text-lg text-gray-300 mt-4">
          This is a bartering app where you can exchange goods and services with
          others. Join our community to start trading items and services without
          the need for money. Discover a new way to get what you need while
          offering what you have.
        </p>
      </div>
    </Layout>
  );
};

export default Homepage;
