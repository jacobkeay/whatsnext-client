import React, { useState } from "react";
import cookie from "js-cookie";
import fetch from "isomorphic-unfetch";
import ErrorPopup from "./ErrorPopup";
import Router from "next/router";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);

  const checkFields = () => {
    email ? setErrorEmail(null) : setErrorEmail("Please fill in this field.");
    password
      ? setErrorPassword(null)
      : setErrorPassword("Please fill in this field.");

    if (email && password) {
      return true;
    } else {
      return false;
    }
  };

  async function emailSubmit(e) {
    e.preventDefault();
    if (checkFields()) {
      setLoading(true);
      const server = process.env.API_ADDRESS;

      const res = await fetch(`${server}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      setLoading(false);
      if (!data.success) {
        setLoginError(true);
      } else {
        cookie.set("token", data.token, { expires: 1 });
        console.log(cookie.get("token"));
        Router.push("/");
      }
      console.log(data);
    }
  }
  return (
    <div>
      <section className="mt-6 max-w-2xl p-6 mx-auto bg-white dark:bg-gray-800 rounded-md shadow-md">
        <h2 className="text-lg text-gray-700 dark:text-white font-semibold capitalize text-center">
          Log In
        </h2>

        <form
          onSubmit={emailSubmit}
          className="flex flex-col space-y-8 justify-center"
        >
          <div>
            <label
              className="text-gray-700 dark:text-gray-200"
              htmlFor="username"
            >
              Email Address
            </label>
            <input
              id="username"
              type="text"
              className="mt-2 w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              className="text-gray-700 dark:text-gray-200"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="mt-2 w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className={`bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 focus:outline-none focus:bg-purple-600 ${
                loading ? "cursor-not-allowed" : null
              }`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </section>
      {loginError ? <ErrorPopup /> : null}
    </div>
  );
};

export default LoginForm;
