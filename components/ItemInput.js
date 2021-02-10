import React from "react";
import cookie from "js-cookie";
import fetch from "isomorphic-unfetch";

const ItemInput = props => {
  const handleSubmit = async e => {
    e.preventDefault();
    const server = process.env.API_ADDRESS;

    const res = await fetch(`${server}/api/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie.get("token")}`,
      },
      body: JSON.stringify({
        body: props.newItem,
      }),
    });

    const data = await res.json();
    if (!data.success) {
      console.log(data);
    } else {
      console.log(data);
      props.setNewItem("");
      props.fetchItems();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col overflow-hidden border rounded-lg dark:border-gray-600 lg:flex-row mb-5">
        <input
          className="px-6 py-3 text-gray-700 placeholder-gray-500 bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-300 focus:placeholder-transparent dark:focus:placeholder-transparent"
          type="text"
          name="item"
          placeholder="Enter your item here..."
          value={props.newItem}
          onChange={e => props.setNewItem(e.target.value)}
        />

        <button
          type="submit"
          className="px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-200 transform bg-purple-500 hover:bg-purple-600 focus:bg-purple-600 focus:outline-none"
        >
          +
        </button>
      </div>
    </form>
  );
};

export default ItemInput;
