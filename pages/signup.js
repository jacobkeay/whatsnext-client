import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import ErrorPopup from "../components/ErrorPopup";
import SignupForm from "../components/SignupForm";

const Signup = () => {
  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-2 mx-auto flex flex-wrap items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium text-3xl text-gray-900">
              Peace of Mind.
            </h1>
            <p className="leading-relaxed mt-8">
              WhatsNext is a simple to-do app that helps you organise your tasks
              for more productivity. Try it now!
            </p>
            <p className="leading-relaxed mt-8">
              Already got an account?{" "}
              <Link href="/login">
                <a className="text-purple-500">Log in</a>
              </Link>
              .
            </p>
            <p className="leading-relaxed mt-8">
              Frontend made with{" "}
              <Link href="https://nextjs.org">
                <a target="_blank" className="text-purple-500">
                  Next.js
                </a>
              </Link>{" "}
              and{" "}
              <Link href="https://tailwindcss.com">
                <a target="_blank" className="text-purple-500">
                  Tailwind Css
                </a>
              </Link>
              ; Backend made with{" "}
              <Link href="https://nodejs.org">
                <a target="_blank" className="text-purple-500">
                  Node.js
                </a>
              </Link>
              ,{" "}
              <Link href="https://expressjs.com/">
                <a target="_blank" className="text-purple-500">
                  Express
                </a>
              </Link>
              , and{" "}
              <Link href="https://firebase.google.com">
                <a target="_blank" className="text-purple-500">
                  Firebase
                </a>
              </Link>
              .
            </p>
          </div>
          <SignupForm />
        </div>
      </section>
    </Layout>
  );
};

export default Signup;
