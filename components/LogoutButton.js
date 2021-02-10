import React from "react";
import cookie from "js-cookie";
import Router from "next/router";

const LogoutButton = () => {
  async function handleClick() {
    console.log(cookie.get("token"));
    cookie.remove("token");
    Router.push("/login");
  }
  return (
    <button
      onClick={handleClick}
      className="mt-10 inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base text-gray-600"
    >
      <i className="fas fa-sign-out-alt"></i> Logout
    </button>
  );
};

export default LogoutButton;
