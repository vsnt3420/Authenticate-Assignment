import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    localStorage.setItem("userEmail", email);
    navigate("/search");
  };

  return (
    <section className="bg-neutral-200">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-neutral-50">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-semibold leading-tight tracking-tight text-neutral-900 md:text-3xl">
              Watch Lists
            </h1>
            <form className=" space-y-4 md:space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-neutral-900">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-neutral-50 border border-neutral-300 text-neutral-900 rounded-lg block w-full p-2.5"
                  placeholder="name@company.com"
                  required=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                onClick={handleLogin}
                type="submit"
                className="w-full text-white bg-neutral-700 hover:bg-primary-900 font-semibold rounded-lg text-lg px-5 py-2.5 text-center"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
