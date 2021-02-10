import React from "react";
import cookie from "js-cookie";
import fetch from "isomorphic-unfetch";

const Item = ({ item, fetchItems }) => {
  const handleDelete = async () => {
    const server = process.env.API_ADDRESS;

    const res = await fetch(`${server}/api/items/${item.itemId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
      },
    });

    const data = await res.json();
    if (!data.success) {
      console.log(data);
    } else {
      console.log(data);
      fetchItems();
    }
  };
  return (
    <a className="flex justify-between items-center px-4 py-3 border-b hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-700 w-full">
      <p className="text-gray-600 dark:text-white text-sm mx-2">{item.body}</p>
      <button
        onClick={handleDelete}
        className="flex-none p-1 w-6 m-0 text-white text-xs rounded-full transition-colors duration-200 transform bg-purple-500 hover:bg-purple-600 focus:bg-purple-600 focus:outline-none"
      >
        X
      </button>
    </a>
  );
};

export default Item;
