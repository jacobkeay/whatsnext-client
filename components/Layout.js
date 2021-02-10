import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";

const Layout = props => {
  return (
    <div>
      <Head>
        <meta name="description" content="Simple to-do list app." />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.0.13/css/all.css"
          integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp"
          crossOrigin="anonymous"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {props.children}
    </div>
  );
};

export default Layout;
