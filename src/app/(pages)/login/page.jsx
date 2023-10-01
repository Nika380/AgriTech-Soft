"use client";
import React, { useState } from "react";
import Form from "../../../components/Form_Sign_Up";
import { inputs3 } from "../../../constants/constants";
import { API } from "../../../utils/API";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [user, setUser] = useState({
    password: "",
    email: "",
  });
  const router = useRouter();
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);
  const loginHandler = async (e) => {
    e.preventDefault();
    setloading(true);
    await API.post("/auth/login", user).then((res) => {
      router.push("/culture");
      localStorage.setItem("auth", "1");
    });
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center flex-col">
        {/* <Loader />; */}
      </div>
    );
  }
  return (
    <div
      style={{
        backgroundImage:
          "url(https://media.istockphoto.com/id/506164764/photo/tractor-spraying-soybean-field.jpg?s=612x612&w=0&k=20&c=h27yHr07QNSghYS20iwYBCGjZIa2HlXqrZDkM0ZsYEw=)",
      }}
      className="bg-cover bg-center h-[100vh] text-white object-contain flex justify-center items-center"
    >
      <div className="absolute flex items-center justify-center top-16">
        <div
          className="p-16 rounded shadow-md max-w-md w-full"
          style={{ backgroundColor: "rgba(51, 51, 51, 0.3)" }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-white">Sign In</h2>
          <form onSubmit={loginHandler}>
            {inputs3.map((input) => (
              <Form
                key={input.id}
                {...input}
                value={user[input.name]}
                onChange={handleChange}
              />
            ))}
            <span className="text-center pb-2 text-yellow-500 text-xs block">
              {error}
            </span>
            <button
              type="submit"
              className="w-full ransition-all duration-200 hover:text-black hover:bg-gray-300 cursor-pointer text-white outline-none font-bold rounded-0.2vw px-8 py-2.5 mr-4 bg-opacity-50 hover:bg-opacity-100 focus:ring-2 focus:ring-opacity-50 focus:ring-gray-300 border-2 border-white rounded-lg"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
