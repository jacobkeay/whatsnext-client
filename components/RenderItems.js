import React from "react";
import { useState, useEffect } from "react";
import cookie from "js-cookie";
import fetch from "isomorphic-unfetch";
import Item from "./Item";
import ItemInput from "./ItemInput";
import Router from "next/router";

const RenderItems = () => {
  const [items, setItems] = useState([]);
  const [activeInput, setActiveInput] = useState(false);
  const [newItem, setNewItem] = useState("");
  const handleClick = e => {
    e.preventDefault();
    setActiveInput(!activeInput);
  };

  const fetchItems = async () => {
    const server = process.env.API_ADDRESS;

    const res = await fetch(`${server}/api/items`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
      },
    });
    const data = await res.json();
    if (data.success) {
      setItems(data.data);
    } else {
      console.log(data.msg);
    }
    console.log(items);
  };

  useEffect(() => {
    if (!cookie.get("token")) {
      Router.push("/login");
    }
    fetchItems();
  }, []);

  return (
    <div className="flex flex-col items-center mt-10">
      <button
        onClick={handleClick}
        className={`mb-5 p-0 w-16 h-16 bg-purple-500 rounded-full hover:bg-purple-600 shadow-md mouse transition ease-in duration-200 focus:outline-none ${
          activeInput ? "text-white text-4xl" : null
        }`}
      >
        {!activeInput ? (
          <svg
            viewBox="0 0 20 20"
            enableBackground="new 0 0 20 20"
            className="w-6 h-6 inline-block"
          >
            <path
              fill="#FFFFFF"
              d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                  C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                  C15.952,9,16,9.447,16,10z"
            />
          </svg>
        ) : (
          "-"
        )}
      </button>
      {activeInput ? (
        <ItemInput
          fetchItems={fetchItems}
          newItem={newItem}
          setNewItem={setNewItem}
        />
      ) : null}
      <div className="mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-20">
        <div className="py-0">
          {items
            ? items.map(item => (
                <Item key={item.itemId} item={item} fetchItems={fetchItems} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default RenderItems;
