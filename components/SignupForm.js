import React, { useState } from "react";
import Router from "next/router";
import cookie from "js-cookie";
import fetch from "isomorphic-unfetch";
import SuccessPopup from "./SuccessPopup";

const SignupForm = () => {
  const [errorHandle, setErrorHandle] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displaySuccess, setDisplaySuccess] = useState(false);

  const checkFields = () => {
    handle
      ? setErrorHandle(null)
      : setErrorHandle("Please fill in this field.");
    email ? setErrorEmail(null) : setErrorEmail("Please fill in this field.");
    password
      ? setErrorPassword(null)
      : setErrorPassword("Please fill in this field.");
    confirmPassword
      ? setErrorConfirmPassword(null)
      : setErrorConfirmPassword("Please fill in this field.");

    if (handle && email && password && confirmPassword) {
      return true;
    } else {
      return false;
    }
  };

  const handleLoginErrors = data => {
    if (data.handle) {
      setErrorHandle(data.handle);
    }
    if (data.email) {
      setErrorEmail(data.email);
    }
    if (data.password) {
      setErrorPassword(data.password);
    }
    if (data.confirmPassword) {
      setErrorConfirmPassword(data.confirmPassword);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (checkFields()) {
      setLoading(true);
      const server = process.env.API_ADDRESS;

      const res = await fetch(`${server}/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          handle,
          email,
          password,
          confirmPassword,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (!data.success) {
        handleLoginErrors(data);
      } else {
        setDisplaySuccess(true);
        cookie.set("token", data.token, { expires: 1 });
        console.log(cookie.get("token"));
        setTimeout(() => {
          Router.push("/");
        }, 3000);
      }
      console.log(data);
    }
  }

  return (
    <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
      <form onSubmit={handleSubmit}>
        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
          Sign Up
        </h2>
        <div className="relative mb-4">
          <label htmlFor="handle" className="leading-7 text-sm text-gray-600">
            Handle
          </label>
          <input
            type="text"
            id="handle"
            name="handle"
            className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            value={handle}
            onChange={e => setHandle(e.target.value)}
          />
          {errorHandle ? (
            <p className="text-xs text-red-500 mt-1">{errorHandle}</p>
          ) : null}
        </div>
        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {errorEmail ? (
            <p className="text-xs text-red-500 mt-1">{errorEmail}</p>
          ) : null}
        </div>
        <div className="relative mb-4">
          <label htmlFor="password" className="leading-7 text-sm text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {errorPassword ? (
            <p className="text-xs text-red-500 mt-1">{errorPassword}</p>
          ) : null}
        </div>
        <div className="relative mb-4">
          <label
            htmlFor="confirmPassword"
            className="leading-7 text-sm text-gray-600"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          {errorConfirmPassword ? (
            <p className="text-xs text-red-500 mt-1">{errorConfirmPassword}</p>
          ) : null}
        </div>
        <button
          type="submit"
          className={`mt-4 text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg w-full ${
            loading ? "cursor-not-allowed" : null
          }`}
        >
          {loading ? "Creating..." : "Create My Account"}
        </button>
        <p className="text-xs text-gray-500 mt-3">
          Your details will not be shared with anyone, or visible to other
          users.
        </p>
      </form>
      {displaySuccess ? <SuccessPopup /> : null}
    </div>
  );
};

export default SignupForm;
